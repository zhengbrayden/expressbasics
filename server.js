const express = require('express')
const app = express();
const PORT = 1172

//TEMP DATABASE
const db = []

//SCHEDULER
function cron(ms, fn) {
    async function cb() {
        clearTimeout(timeout)
        await fn()
        timeout = setTimeout(cb, ms)
    }
    let timeout = setTimeout(cb, ms)
    return () => {}
}

function consoleDB(){
    console.log('DB = ', db)
}


cron(1000, consoleDB)
//middleware
app.use(express.json())
app.use(express.static('public'))
app.use(require('cors')())
app.use(mw)

function mw(req, res, next) {
    console.log('HIT THE MIDDLEWARE')
    const {id} = req.query
    console.log(id)
    if (id != 8) {
        return res.sendStatus(403)
    }

    next()
}
//GET POST PATCH PUT DELETE

app.delete('/', mw, (req, res) => {
    console.log('you have reached home and deleted')
    res.sendStatus(200)
})

app.post('/api', (req,res) => {
    const { information }  = req.body
    console.log(`the posted message was: ${information}`)
    db.push(information)
    console.log('DB:', db)
    res.status(201).json({'yourMessage': information})
})

app.put('/api', (req,res)=> {
    const {word, banana} = req.query
    console.log(word, banana)
    res.sendStatus(200)
})

app.delete('/delete/james/cool', (req,res) => {
    res.send(("didnnt make it"))
})

app.delete('/delete', (req, res) => {
    const {id, name} = req.params
    console.log('what do you want to delete', id)
    res.sendStatus(200)
})

app.listen(PORT, () => console.log(`server has started on port: ${PORT}`))