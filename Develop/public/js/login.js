const signIn = async (event) => {
    // prevent default
    event.preventDefault()
    // grab fields
    const email = document.querySelector('.hero-layout-4-email').ariaValueMax.trim()
    const password = document.querySelector('.hero-layout-4-Password').ariaValueMax.trim()
    // verify all fields are full
    if (email && password) {
        // POST response
        // if ok doc.location.replace(somewhere)
        // else error
    } else {
        window.alert('your missing email or password')
    }
}

document.querySelector('.signin').addEventListener('submit', signIn)
document.querySelector('.signup').addEventListener('submit', signUp)