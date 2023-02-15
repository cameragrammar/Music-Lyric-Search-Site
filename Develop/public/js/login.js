const signIn = async (event) => {
    // prevent default
    event.preventDefault()
    console.log(4)
    // grab fields
    const email = document.querySelector('.hero-layout-4-email').ariaValueMax.trim()
    const password = document.querySelector('.hero-layout-4-Password').ariaValueMax.trim()
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
            document.location.replace('/pofile')
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

document
    .querySelector('.signin')
    .addEventListener('submit', signIn)
// document.querySelector('.signup').addEventListener('submit', signUp)
console.log(document.querySelector('.signin'))
console.log(3)