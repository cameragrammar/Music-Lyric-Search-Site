let form = document.querySelector('#userform')

const signInCall = async (event) => {
    // prevent default
    event.preventDefault()

    // grab fields
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    // verify all fields are full
    if (email && password) {
        // POST response
        const respond = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        // if ok doc.location.replace(somewhere)
        if (respond.ok) {
            document.location.replace('/profile')
        } else {
            alert(respond.statusText)
        }
        // else error
    } else {
        window.alert('your missing email or password')
    }
}

const register = async (event) => {
    // prevent default
    event.preventDefault()
    // grab fields
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    // verify all fields are full
    if (email && password) {
        // POST response
        const respond = await fetch('/api/user', { // change to something else?
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        // if ok doc.location.replace(somewhere)
        if (respond.ok) {
            document.location.replace('/profile') // where do we want to send the user
        } else {
            alert(respond.statusText)
        }
        // else error
    } else {
        window.alert('your missing email or password')
    }
}

// document
//     .querySelector('.signin')
//     .addEventListener('submit', signInCall)

// document.querySelector('.signup').addEventListener('submit', signUp)


// form.addEventListener('submit', signInCall)

// document
//     .querySelector('#userform')
//     .addEventListener('submit', signInCall);

