const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path')
const FileStore = require('session-file-store')(session)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: './Session' })
}))

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/login.html')
})

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        //credential validation logic here, if credential matches than we store data in session
        req.session.loggedIn = true;
        req.session.username = username
        console.log(req.body)
        return res.redirect('/index')
    } else {
        return res.send('Please Enter Username And Password!')
    }
})

app.get('/index', (req, res) => {
    if (req.session.loggedIn) {
        console.log('logged in')
        res.sendFile(__dirname + '/index.html')
    } else {
        console.log('not logged in')
        res.sendFile(__dirname + '/login.html')

    }
})

app.listen(8080, () => {
    console.log(`server listening on http://localhost:${8080}`)
})