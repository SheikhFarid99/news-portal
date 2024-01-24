const authModel = require('../models/authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class authController {
    login = async (req, res) => {
        const { email, password } = req.body

        if (!email) {
            return res.status(404).json({ message: 'Please provide your email' })
        }
        if (!password) {
            return res.status(404).json({ message: 'Please provide your password' })
        }

        try {
            const user = await authModel.findOne({ email }).select('+password')
            if (user) {
                const match = await bcrypt.compare(password, user.password)
                if (match) {
                    const obj = {
                        id: user.id,
                        name: user.name,
                        category: user.category,
                        role: user.role
                    }
                    const token = await jwt.sign(obj, process.env.secret, {
                        expiresIn: process.env.exp_time
                    })
                    return res.status(200).json({ message: 'login success', token })
                } else {
                    return res.status(404).json({ message: 'invalid password' })
                }
            } else {
                return res.status(404).json({ message: 'user not found' })
            }
        } catch (error) {
            console.log(error)
        }

    }

    add_writer = async (req, res) => {

        const { name, category, email, password } = req.body

        if (!name) {
            return res.status(404).json({ message: "Please provide name" })
        }
        if (!email) {
            return res.status(404).json({ message: "Please provide email" })
        }
        if (email && !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            return res.status(404).json({ message: "Please provide valid email" })
        }
        if (!password) {
            return res.status(404).json({ message: "Please provide password" })
        }
        if (!category) {
            return res.status(404).json({ message: "Please provide category" })
        }

        try {
            const writer = await authModel.findOne({ email })
            if (writer) {
                return res.status(404).json({ message: "writer already exit" })
            } else {
                const new_writer = await authModel.create({
                    name: name.trim(),
                    email: email.trim(),
                    category: category.trim(),
                    role: 'writer',
                    image: "",
                    password: await bcrypt.hash(password.trim(), 10)
                })
                return res.status(201).json({ message: "writer add success", writer: new_writer })

            }
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}

module.exports = new authController()