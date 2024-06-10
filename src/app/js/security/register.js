const formRegister = document.querySelector('#frmRegister')
formRegister.addEventListener('submit', handlerSubmitForm)

async function handlerSubmitForm (e) {
  e.preventDefault()
  await register()
}

async function register () {
  const requestMessage = captureFields()
  const responseMessage = await sendMessage(requestMessage)

  sessionStorage.setItem('user', JSON.stringify(responseMessage))
  location.href = '/view/private/solicitante.html'
}

function captureFields () {
  const tipoIdentificacionId = document.querySelector('#sltTipoIdentificacionId').value
  const identificacion = document.querySelector('#iptIdentificacion').value
  const nombre = document.querySelector('#iptNombre').value
  const apellido = document.querySelector('#iptApellido').value
  const username = document.querySelector('#iptUsername').value
  const password = document.querySelector('#iptPassword').value

  return { tipoIdentificacionId, identificacion, nombre, apellido, username, password }
}

async function sendMessage (requestMessage) {
  const responseMessage = await fetch('/api/v1/security/register', {
    headers: { 'content-type': 'application/json' },
    method: 'post',
    body: JSON.stringify(requestMessage)
  }).then(r => r.json())

  return responseMessage
}
