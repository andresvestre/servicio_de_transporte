const formLogin = document.querySelector('#frmLogin')
formLogin.addEventListener('submit', handlerSubmitForm)

async function handlerSubmitForm (e) {
  e.preventDefault()
  await login()
}

async function login () {
  const requestMessage = captureFields()
  const responseMessage = await sendMessage(requestMessage)
  console.log(responseMessage);
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
