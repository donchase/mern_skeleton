authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
        // sessionStorage option: user auth state will only be remembered in the current window tab
        // sessionStorage.setItem('jwt', JSON.stringify(jwt))
        // localStorage option: user auth state will be remembered across tabs in a browser
        localStorage.setItem('jwt', JSON.stringify(jwt))
    }
    cb()
}

isAuthenticated() {
    if (typeof window == "undefined")
        return false

    // sessionStorage option
    /*
    if (sessionStorage.getItem('jwt')) {
        return JSON.parse(sessionStorage.getItem('jwt'))
    } else {
        return false
    }
    */

    // localStorage option
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}

clearJWT(cb) {
    if (typeof window !== "undefined") {
        // sessionStorage option
        // sessionStorage.removeItem('jwt')
        // localStorage option
        localStorage.removeItem('jwt')
    }
    cb()
    // Using the signout API call (next line) is optional since this is dependent on whether cookies are used as the credential storage mechanism.
    signout().then((data) => {
        document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
}

