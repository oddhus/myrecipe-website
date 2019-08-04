sessionStorage.clear()

const loginUser = async (email, password) => {

    const message1 = document.querySelector('#message-1')
    message1.textContent = 'Loading...'

    try {
        const rawResponse = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        if (rawResponse.status === 400) {
            message1.textContent = 'The password or username is incorrect.'
        }

        if (rawResponse.status === 201) {
            location.replace('/myrecipes')
        }

    } catch (error) {
        message1.textContent = `Error: ${error}`
    }
    
}

const loginUserEl = document.querySelector('#login-user')
const username = document.querySelector('#username')
const password = document.querySelector('#password')

loginUserEl.addEventListener('submit', (e) => {
    e.preventDefault()
    loginUser(username.value,password.value)
    
})

