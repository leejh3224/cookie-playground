const express = require('express')
const cors = require('cors')
const boolParser = require("express-query-boolean");

const app = express()

app.use(boolParser())
app.use(cors())

app.get('/cookie', (req, res) => {
    const { domain, path, maxAge, httpOnly, secure, sameSite } = req.query

    const cookieOptions = {}

    if (domain) {
        cookieOptions.domain = domain
    }
    if (path) {
        cookieOptions.path = path
    }
    if (maxAge) {
        cookieOptions.maxAge = maxAge
    }
    if (httpOnly) {
        cookieOptions.httpOnly = httpOnly
    }
    if (secure) {
        cookieOptions.secure = secure
    }
    if (sameSite) {
        cookieOptions.sameSite = sameSite
    }

    res.cookie('token', 'token', cookieOptions)
    return res.status(200).end()
})

const port = 8080

app.listen(port, () => {
    console.log(`listening on ${port}`)
})