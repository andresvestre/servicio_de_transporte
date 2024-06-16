const formRegister = document.querySelector('#frmSearchVehicle')
formRegister.addEventListener('submit', handlerSubmitForm)

const btnSolicitarServicio = document.querySelector('#btnSolicitarServicio')
btnSolicitarServicio.addEventListener('click', handlerClickSolicitarServicio)

async function handlerSubmitForm (e) {
  e.preventDefault()
}

async function initAutocomplete () {
  const coords = await captureGps();
  const origin = new google.maps.LatLng(coords.latitud, coords.longitud)
  const { Map } = await google.maps.importLibrary("maps");
  const { SearchBox } = await google.maps.importLibrary("places");

  const map = new Map(document.getElementById("map"), {
    center: { lat: coords.latitud, lng: coords.longitud },
    zoom: 13,
    mapTypeId: "roadmap",
    mapId: "DEMO_MAP_ID"
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("iptSearchVehicle");
  const searchBox = new SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input.parentNode.parentNode);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  const bounds = new google.maps.LatLngBounds();
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const coordDes = {
        latitud: place.geometry.location.lat(),
        longitud: place.geometry.location.lng()
      }
      addIconDestination(map, coordDes);

      const destination = new google.maps.LatLng(coordDes.latitud, coordDes.longitud)
      createDirection(map, origin, destination)

      bounds.extend(place.geometry.location);
    });

    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
  });

  const marker = await addIconUser(map, coords);
  bounds.extend(origin)
}

async function captureGps () {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(position => {
      resolve({
        latitud: position.coords.latitude,
        longitud: position.coords.longitude
      })
    })
  })
}

async function addIconUser (map, coords) {
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  const icon = document.createElement("div");
  icon.innerHTML = `<span class="material-symbols-outlined">emoji_people</span>`;

  const faPin = new PinElement({
    glyph: icon,
    glyphColor: "#ff8300",
    background: "#FFD514",
    borderColor: "#ff8300",
    scale: 1.5,
  });

  return new google.maps.marker.AdvancedMarkerElement({
    map,
    position: { lat: coords.latitud, lng: coords.longitud },
    content: faPin.element,
    title: "Tu estas aquí",
  })
}

async function addIconDestination (map, coords) {
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  const icon = document.createElement("div");
  icon.innerHTML = `<span class="material-symbols-outlined">home_pin</span>`;

  const faPin = new PinElement({
    glyph: icon,
    glyphColor: "#ff8300",
    background: "#FFD514",
    borderColor: "#ff8300",
    scale: 1.5,
  });

  return new google.maps.marker.AdvancedMarkerElement({
    map,
    position: { lat: coords.latitud, lng: coords.longitud },
    content: faPin.element,
    title: "Tu estas aquí",
  })
}

async function addRoute () {
  const { DirectionsService } = await google.maps.importLibrary("maps");
}

async function createDirection (map, origin, destination) {
  const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
  const directionsService = new google.maps.DirectionsService()

  directionsService
    .route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then(result => {
      sessionStorage.setItem('direction', JSON.stringify(result))
      directionsRenderer.setDirections(result);
    })
}

async function handlerClickSolicitarServicio (e) {
  e.preventDefault()

  const user = JSON.parse(sessionStorage.getItem('user'))

  const direction = JSON.parse(sessionStorage.getItem('direction'))
  const partidaLatitud = direction.routes[0].legs[0].start_location.lat
  const partidaLongitud = direction.routes[0].legs[0].start_location.lng
  const destinoLatitud = direction.routes[0].legs[0].end_location.lat
  const destinoLongitud = direction.routes[0].legs[0].end_location.lng
  const solicitanteId = await getSolicitanteId(user.id)

  const viaje = {
    solicitanteId,
    partidaLatitud,
    partidaLongitud,
    destinoLatitud,
    destinoLongitud,
  }

  sessionStorage.setItem('viaje', JSON.stringify(viaje))

  location.href = '/view/private/select-driver.html'
}

async function getSolicitanteId (userId) {
  const solicitante = await fetch(`/api/v1/security/solicitante/${userId}`).then(r => r.json())
  return solicitante.id
}

window.initAutocomplete = initAutocomplete