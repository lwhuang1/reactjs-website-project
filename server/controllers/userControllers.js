const bcrypt = require('bcrypt')
const User = require('../models/users')

// (POST) create a new user in mongoDB function
const createUser = async (req, res) => {
    try {// get information from requests to use
        const { firstName, lastName, email, password, phone, role } = req.body
        console.log('The data', firstName, lastName, email, password, phone, role)

        const existingUser = await User.findOne({ email })
        console.log('the existing user in q', existingUser)
        // check if user exists in the database
        if (existingUser) {
            console.log('user exists')
            res.status(400).json({ message: 'It seems you already have an account, please log in instead.' })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log('The hashed password:', hashedPassword, password)

        // create a new user
        const newUser = new User({
            first_name: firstName,
            last_name: lastName,
            email: email,
            passwoErd: hashedPassword,
            phone: phone,
            role: role,
        })

        console.log('Created the user')

        // save the new user to database
        const savedUser = await newUser.save()

        console.log('Saved the user.')

        // let the client know the request was successful and the resource was created
        res.status(201).json(savedUser)

        // res.json({ exists: !!savedUser })
    } catch (error) {
        // let the client know it failed the request due to malformed syntax or invalid params
        res.status(400).json({ error: error.message })
        console.log(error.message)
    }
}

// (GET) find user by id
const getUserById = async (req, res) => {
    try {
        // console.log('The request:', req)
        // get user ID
        const { id } = req.params

        console.log('The ID:', id)

        // find user in mongoDB database
        const user = await User.findById(id)

        console.log('The User:', user)

        // check if user does not exists after searching
        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// (GET) find user by email
const getUserByEmail = async (req, res) => {
    try {
        // get user email
        const { email } = req.query

        console.log('The server received the following email:', email)
        const query = { 
            email: email 
        }

        // find user by email in mongoDB database
        const user = await User.findOne({ email })

        // return if user, or email in other words, has been used
        console.log('The email is already in use:', !!user)
        res.json({ exists: !!user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// (PUT) update user's email in database by looking at id
const updateUserEmail = async (req, res) => {
    try {
        // get user ID
        const { id } = req.params
        const { email } = req.body

       // update the email in database
        const updatedUser = await User.findByIdAndUpdate(
            id, { email }, { new: true }
        )

        // check if user exists after searching
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' })
        }

        res.json(updatedUser)
    // else unable to process the request
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// (PUT) update user's password in database by looking at id
const updateUserPassword = async (req, res) => {
    try {
        // get user ID
        const { id } = req.params
        const { password } = req.body

        // update the password in database
        const updatedUser = await User.findByIdAndUpdate(
            id, { password }, { new: true }
        )

        // check if user exists after searching
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' })
        }

        res.json(updatedUser)
    // else unable to process the request
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// (DELETE) delete current user in database by id
const deleteUser = async (req, res) => {
    try {
        // get user ID
        const { id } = req.params

        // find user in the database by ID and delete it
        const deletedUser = await User.findbyIdAndDelete(id)

        // check if there was no user of that ID to delete
        if (!deletedUser) {
            return res.status(404).json({ error: 'User does not exist.' })
        }

        res.json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports  = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUserEmail,
    updateUserPassword,
    deleteUser,
}