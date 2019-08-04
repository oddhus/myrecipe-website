sessionStorage.clear()

const createUser = async (name, email, password, date) => {

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
                date
            })
        })

        if (rawResponse.status === 201){
            message1.textContent = 'Success!'
            location.replace('/user')
            return
        }

        data = await rawResponse.json()

        message1.textContent = `Error: ${data.message}`


    } catch (error) {
        message1.textContent = error
    }
    
}

const createUserEl = document.querySelector('#create-user')
const name = document.querySelector('#newname')
const mail = document.querySelector('#newmail')
const password = document.querySelector('#newpass')
const date = document.querySelector('#newdate')

createUserEl.addEventListener('submit', (e) => {
    e.preventDefault()
    createUser(name.value, mail.value, password.value, date.value)
    console.log(date.value)
    
})