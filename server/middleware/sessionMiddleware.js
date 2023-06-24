const crypto = require('crypto');
const session = require('express-session');
const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo')

// a function to generate a secret key
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex')
}

const configureSession = (app) => {
    const secretKey = generateSecretKey()

    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

    console.log('The Secret Key:', secretKey)

    // const options = {
    //     mongooseConnection: mongoose.connection,
    //     collection: 'sessions', // Optional: Specify the collection name for sessions
    // };

    app.use(session({
        secret: secretKey,
        cookie: { maxAge: oneDay },
        resave: false,
        saveUninitialized: true, // important for login system, otherwise it generates a new session ID everytime they make request to sever
        // store: MongoStore.create(options),
    }))

    console.log('finished creating session')

}

module.exports = configureSession;