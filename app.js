const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const PORT = 5000
const User = require("./models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET, MOGOURI } = require("./config/key")
const Todo = require("./models/todo")


mongoose.connect(MOGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongo db")
})
mongoose.connection.on("error", (err) => {
    console.log("error", err)
})

app.use(express.json())
app.use(cors())

// Middleware Start

const requireLogin = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "you must be loggedin" })
    }
    try {
        const { userId } = jwt.verify(authorization, JWT_SECRET)
        req.user = userId
        next()
    } catch (err) {
        return res.status(401).json({ error: "hello world" })

    }

}

app.get("/test", requireLogin, (req, res) => {
    res.json({ message: req.user })
})

// Middleware End

//  Sign Up Start 
app.post("/signup", async (req, res) => {
    const { email, password } = req.body
    try {

        if (!email || !password) {
            return res.status(422).json({ error: "Please Enter All Fields" })
        }
        const user = await User.findOne({ email })

        if (user) {
            return res.status(422).json({ error: "user already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        await new User({
            email,
            password: hashedPassword
        }).save()

        res.status(200).json({ message: "sign up success you can login now" })

    } catch (err) {
        console.log(err)
    }
})

//  Sign Up End 

// Sign In Start

app.post("/signin", async (req, res) => {
    const { email, password } = req.body
    try {

        if (!email || !password) {
            return res.status(422).json({ error: "Please Enter All Fields" })
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: "user does not exist " })
        }
        const doMatch = await bcrypt.compare(password, user.password)

        if (doMatch) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET)
            res.status(201).json({ token })
        }
        else {
            return res.status(401).json({ error: "email or password is invalid" })
        }

    } catch (err) {
        console.log(err)
    }
})

// Sign In End


// Todo Started 

// create todo

app.post("/createtodo", requireLogin, async (req, res) => {
    const data = await new Todo({
        todo: req.body.todo,
        todoBy: req.user
    }).save()
    res.status(201).json({ message: data })
})

// get all todo

app.get("/gettodo", requireLogin, async (req, res) => {
    const data = await Todo.find({
        todoBy: req.user
    })
    res.status(200).json({ message: data })
})

// remove Todo

app.delete("/remove/:id", requireLogin, async (req, res) => {
    const removedTodo = await Todo.findOneAndRemove({ _id: req.params.id })
    res.status(201).json({ message: removedTodo })
})


// Todo Ended 



if (process.env.NODE_ENV == "production") {
    const path = require('path')
    app.get("/", (req, res) => {
        app.use(express.static(path.resolve(__dirname, ('client', 'build'))))
        res.sendFile(path.resolve(__dirname, ('client', 'build', 'index.html')))
    })
}
app.listen(PORT, () => {
    console.log("server running on ", PORT)
})