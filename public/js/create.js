sessionStorage.clear()

const createUser = async (name, email, password, age) => {

    const message1 = document.querySelector('#message-1')
    message1.textContent = 'Loading...'

    try {
        const rawResponse = await fetch('/users', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                age
            })
        })

        message1.textContent = 'Success!'
        location.replace('/user')


    } catch (error) {
        message1.textContent = 'Failed'
    }
    
}

const createUserEl = document.querySelector('#create-user')
const name = document.querySelector('#newname')
const mail = document.querySelector('#newmail')
const password = document.querySelector('#newpass')
const age = document.querySelector('#newage')

createUserEl.addEventListener('submit', (e) => {
    e.preventDefault()
    createUser(name.value, mail.value, password.value, age.value)
    
})