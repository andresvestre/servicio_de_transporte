const direction = JSON.parse(sessionStorage.getItem('direction'))
const distance = direction.routes[0].legs[0].distance.value
const time = direction.routes[0].legs[0].duration.value
const timeText = direction.routes[0].legs[0].duration.text

const UNITS_METERS = 0.84
const UNITS_TIME = 6.9

function calculateValue () {
  const cost = (distance * UNITS_METERS) + (time * UNITS_TIME)
  sessionStorage.setItem('cost', cost)
  return cost
}

async function getDriversActive () {
  const drivers = await fetch('/api/v1/transport/all-drivers').then(r => r.json())
  const template = document.querySelector('#tpeDriver')
  const wrapperDrivers = document.querySelector('.drivers')

  if (drivers?.length) {
    wrapperDrivers.innerHTML = '';
    drivers.map(driver => {
      const driverTemplate = bindDriver(template, driver)
      const driverElement = document.importNode(driverTemplate.content, true)
      wrapperDrivers.appendChild(driverElement)
    })

    assignEventsConfirm(wrapperDrivers)
  }
}

function bindDriver (template, driver) {
  const initial = driver.nombre[0].toUpperCase()
  const driverName = `${driver.nombre} ${driver.apellido}`

  template.content.querySelector('.driver-initial').textContent = initial
  template.content.querySelector('.driver-name').textContent = driverName
  template.content.querySelector('.driver-placa').textContent = driver.placa
  template.content.querySelector('.driver-time').textContent = `Duración: ${timeText}`
  template.content.querySelector('.driver-services').textContent = `${driver.cantidadServicios || 0} Servicios`
  template.content.querySelector('.driver-ranking').textContent = parseFloat(driver.calificacion).toFixed(2)
  template.content.querySelector('.driver-last-comment').textContent = driver.ultimoComentario || 'Sin comentarios'
  template.content.querySelector('.driver-cost').textContent = `\$ ${calculateValue().toFixed(2)}`
  template.content.querySelector('.form-button--submit').dataset.vehiculoId = driver.vehiculoId

  return template
}

function assignEventsConfirm (wrapperDrivers) {
  Array.from(wrapperDrivers.querySelectorAll('.form-button--submit'))
    .forEach(btnConfirmar => {
      btnConfirmar.addEventListener('click', handlerClickConfirmar)
    })
}

async function handlerClickConfirmar (e) {
  e.preventDefault()

  const viaje = JSON.parse(sessionStorage.getItem('viaje'))
  viaje.vehiculoId = parseInt(e.target.dataset.vehiculoId)
  const newVehicle = await saveTrip(viaje)
  sessionStorage.setItem('viaje', JSON.stringify(newVehicle))

  location.href = '/view/private/payment.html'
}

async function saveTrip (viaje) {
  const responseMessage = await fetch('/api/v1/transport/trip', {
    headers: { 'content-type': 'application/json' },
    method: 'post',
    body: JSON.stringify(viaje)
  }).then(r => r.json())

  return responseMessage
}

getDriversActive()