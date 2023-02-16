console.log(3)
const signInCall = async (event) => {
    // prevent default
    event.preventDefault()

    const formData = new FormData(this.signin)
    for (const pair of formData.entries()) {
        console.log(pair)
    }
    // grab fields
    const email = document.getElementById('email').value
    console.log(email)
    const password = document.getElementById('password').value
    // verify all fields are full
    if (email && password) {
        // POST response
        console.log('testing bitches')
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
        console.log('we made it')
    } else {
        window.alert('your missing email or password')
    }
}

// const signUp = async (event) => {
//     // prevent default
//     event.preventDefault()
//     // grab fields
//     const email = document.querySelector('.hero-layout-4-email').ariaValueMax.trim()
//     const password = document.querySelector('.hero-layout-4-Password').ariaValueMax.trim()
//     // verify all fields are full
//     if (email && password) {
//         // POST response
//         const respond = await fetch('/api/user', { // change to something else?
//             method: 'POST',
//             body: JSON.stringify({ email, password }),
//             headers: { 'Content-Type': 'application/json' },
//         })
//         // if ok doc.location.replace(somewhere)
//         if (respond.ok) {
//             document.location.replace('/pofile') // where do we want to send the user
//         } else {
//             alert(respond.statusText)
//         }
//         // else error
//     } else {
//         window.alert('your missing email or password')
//     }
// }

// document
//     .querySelector('.signin')
//     .addEventListener('submit', signInCall)

// document.querySelector('.signup').addEventListener('submit', signUp)

let form = document.getElementById('signin')
form.addEventListener('submit', signInCall)