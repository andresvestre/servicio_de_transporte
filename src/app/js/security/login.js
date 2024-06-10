const formLogin = document.querySelector('#frmLogin')
formLogin.addEventListener('submit', handlerSubmitForm)

async function handlerSubmitForm (e) {
  e.preventDefault()
  await login()
}

async function login () {
  const requestMessage = captureFields()
  const responseMessage = await sendMessage(requestMessage)

  sessionStorage.setItem('user', JSON.stringify(responseMessage))

  let view = '';
  switch (responseMessage.rolId) {
    case 10:
      view = 'admin'
    case 20:
      view = 'solicitante'
      break
    case 30:
      view = 'driver'
      break
    case 40:
      view = 'agent'
      break
  }

  location.href = `/view/private/${view}.html`
}

function captureFields () {
  const username = document.querySelector('#iptUsername').value
  const password = document.querySelector('#iptPassword').value

  return { username, password }
}

async function sendMessage (requestMessage) {
  const responseMessage = await fetch('/api/v1/security/login', {
    headers: { 'content-type': 'application/json' },
    method: 'post',
    body: JSON.stringify(requestMessage)
  }).then(r => r.json())

  return responseMessage
}

