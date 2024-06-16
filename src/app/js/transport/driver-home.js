const formRegister = document.querySelector('#frmVehiculo')
formRegister.addEventListener('submit', handlerSubmitForm)

async function handlerSubmitForm (e) {
  e.preventDefault()
  await register()
}

async function register () {
  const requestMessage = await captureFields()
  const responseMessage = await updateVehicle(requestMessage)

  sessionStorage.setItem('vehicle', JSON.stringify(responseMessage))
}

async function captureFields () {
  const user = JSON.parse(sessionStorage.getItem('user'))

  const conductorId = await getConductorId(user.id)
  const tipoVehiculoId = document.querySelector('#sltTipoVehiculoId').value
  const placa = document.querySelector('#iptPlaca').value
  const color = document.querySelector('#iptColor').value
  const modelo = document.querySelector('#iptModelo').value
  const asientos = document.querySelector('#iptAsientos').value

  const { latitud, longitud } = await captureGps()

  return { conductorId, tipoVehiculoId, placa, color, modelo, asientos, latitud, longitud }
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

async function updateVehicle (requestMessage) {
  const responseMessage = await fetch('/api/v1/transport/vehicle', {
    headers: { 'content-type': 'application/json' },
    method: 'post',
    body: JSON.stringify(requestMessage)
  }).then(r => r.json())

  return responseMessage
}

async function getConductorId (userId) {
  const conductor = await fetch(`/api/v1/security/conductor/${userId}`).then(r => r.json())
  return conductor.id
}