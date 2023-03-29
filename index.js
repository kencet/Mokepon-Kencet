const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.static('public'))
app.use(cors())
//para trabajar con las peticones tipos post par recibir daots, se activan las peticiones que soporten json como parte de su cuerpo
app.use(express.json())
const players = []
class Player {
    constructor(id){
        this.id = id
    }
    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }   
    updatePosition(x, y){
        this.x = x
        this.y = y
    }
    asignarattacks(attacks){
        this.attacks = attacks
    }
}

class Mokepon {
	constructor(name) {
		this.name = name
	}
}

app.get('/join', (req, res) =>{
    const id = `${Math.floor(Math.random() * 10000)}`
    const player = new Player(id)
    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})
// el /: indica que es una variable tipo parametro (que viene en la url)
app.post("/mokepon/:playerId", (req, res) => {
    //req.params.playerId es para recibir la variable de la url
    const playerId = req.params.playerId || ""
    const name = req.body.mokepon || ""
    const mokepon = new Mokepon(name)
    const playerIndex = players.findIndex((player) => playerId === player.id)
	if (playerIndex >= 0) {
		players[playerIndex].asignarMokepon(mokepon)
	}
    console.log(players)
    console.log(playerId)
    res.end()
})

app.post("/mokepon/:playerId/position", (req, res) =>{
    const playerId = req.params.playerId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const playerIndex = players.findIndex((player) => playerId === player.id)
	if (playerIndex >= 0) {
		players[playerIndex].updatePosition(x, y)
	}
    //.filter funciona comparando el elemento con las variables de la lista y devolviendo un true o false según la comparación
    const enemies = players.filter((player) => playerId != player.id)  
    res.send({
        enemies
    })
    .getHeaderNames(function(res){
    })
})

app.post("/mokepon/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const attacks = req.body.attacks || []

    const playerIndex = players.findIndex((player) => playerId === player.id)
	if (playerIndex >= 0) {
		players[playerIndex].asignarattacks(attacks)
	}
    res.end()
})
    // la función find devuelve verdadero o falso dependiendo de si encuentra lo que está nucando en la lista

app.get("/mokepon/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const player = players.find((player) => player.id === playerId)
    res.send({
        attacks: player.attacks || []
    })
})
app.listen(8080, () => {
    console.log ("Server listening on")
})
