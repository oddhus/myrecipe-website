const profileEl = document.querySelector('#profile')
const buttonEl = document.querySelector('#logout')


const initializeUserPage = async () => {

    try {
        const rawResponse = await fetch('/users/me', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8'
            }

        })

        const data = await rawResponse.json()
        profileEl.textContent = `Name: ${data.name}. Age: ${data.age}. Email: ${data.email}`

        const button = document.createElement("button")
        button.innerHTML = "Logout of all devices"
        buttonEl.appendChild(button)
        button.addEventListener('click', e => {
            console.log('before')
            fetch('/users/logoutAll', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json; charset=utf-8'
            }
            }).then(location.replace('/'))

        })



    } catch (error) {
        profileEl.textContent = `Please login`
    }
    
}

initializeUserPage()

