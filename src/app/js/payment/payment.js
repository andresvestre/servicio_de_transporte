const formRegister = document.querySelector('#frmPayment')
formRegister.addEventListener('submit', handlerSubmitForm)

document.querySelector('#iptValorServicio').value = parseFloat(sessionStorage.getItem('cost'))


async function handlerSubmitForm (e) {
  e.preventDefault()
  await register()
}

async function register () {
  const requestMessage = await captureFields()
  const responseMessage = await createPayment(requestMessage)

  sessionStorage.setItem('payment', JSON.stringify(responseMessage))
  location.href = '/view/private/solicitante.html'
}

async function captureFields () {
  const numeroTarjeta = document.querySelector('#iptNumeroTarjeta').value
  const nombreTarjeta = document.querySelector('#iptNombreTarjeta').value
  const fechaVencimiento = document.querySelector('#iptFechaVencimiento').value
  const cvv = document.querySelector('#iptCvv').value
  const promocion = document.querySelector('#iptPromocion').value
  const calificacion = document.querySelector('#sltCalificacion').value
  const observaciones = document.querySelector('#iptObservaciones').value
  const viajeId = JSON.parse(sessionStorage.getItem('viaje')).id
  const valorTotal = parseFloat(sessionStorage.getItem('cost'))

  return {
    numeroTarjeta,
    nombreTarjeta,
    fechaVencimiento,
    cvv,
    promocion,
    calificacion,
    observaciones,
    viajeId,
    valorTotal,
  }
}

async function createPayment (requestMessage) {
  const responseMessage = await fetch('/api/v1/payment/payment', {
    headers: { 'content-type': 'application/json' },
    method: 'post',
    body: JSON.stringify(requestMessage)
  }).then(r => r.json())

  return responseMessage
}
