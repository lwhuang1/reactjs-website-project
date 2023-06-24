const bcrypt = require('bcrypt')
const User = require('../models/users')
const session = require('express-session')

const loginUser = async (req, res) => {
    try {
        console.log('Attempting to login...')
        // get login credentials
        const { email, password } = req.body

        console.log('The session:', req.session)
        console.log(Object.keys(req))
        console.log('Session user', req.session.user)

        const user = await User.findOne({ email })

        // check if user exists in the database
        if (!user) {
            res.status(401).json({ error: 'Invalid Credentials' })
            return
        }

        // check if password matches the one in the database

        const isPasswordValid = await bcrypt.compare(password, user.password)
        // const isPasswordValid = password === user.password


        if (!isPasswordValid) {
            console.log('Password is invalid!')
            return res.status(401).json({ error: 'Invalid Credentials' })
            return
        }

        console.log("Password is valid!")

        req.session.user = {
            id: user._id.toString(),
            email: user.email,
            sessionID: req.sessionID,
        }
        
        console.log('The updated session after PW validation:', req.session)

        const sessionStore = req.sessionStore; // Assuming you have access to the request object

        const allSessions = sessionStore.sessions;
        console.log('The sessions:', allSessions);

        console.log('---------------------------------')

        res.status(200).json({ message: 'Login successful' })

        // res.redirect('/home')

    } catch (error) {
        console.log(error)

        res.status(500).json({ error: 'Server Error.' })
    }
}

const logoutUser = async (req, res) => {
    console.log('Attempting to logout...')
    console.log('The session before:', req.session)
    // destroy session to log out the user
    req.session.destroy((error) => {
        if (error) {
            console.log('The error', error)
            res.status(500).json({ error: 'Server error' })
        } else {
            console.log('The session after:', req.session)
            console.log('The sessions', req.sessionStore.sessions)
            res.status(200).json({ message: 'Logout successful' })
        }
    })

    // res.redirect('/home')
}

const isLoggedIn = async (req, res) => {
    // check if session exists 
    if (req.session.user) {
        return { loggedIn: true }
    }

    return { loggedIn: false }

}

const showSession = async(req, res) => {
    // show session
    console.log('The current session:', req.session)
    console.log(req)
    const data = { data: req.session, cookies: req.cookies }
    res.json(data)
}

module.exports = {
    loginUser,
    logoutUser,
    isLoggedIn,
    showSession,
}