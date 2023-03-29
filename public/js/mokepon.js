const selecciondeataque = document.getElementById ("ataque")
const b_pet = document.getElementById("b_mascota")
const restart = document.getElementById("reinicio")
let b_fuego 
let b_agua 
let b_plant 

const selecciondemascota = document.getElementById ("mascota")
const breiniciar = document.getElementById ("reiniciar")

const spanp_pet = document.getElementById("p_pet")
const spane_pet = document.getElementById("e_pet")

const p_ph = document.getElementById("ph_player")
const e_ph = document.getElementById("ph_enemy")
const attack = document.getElementById("attack")
const enemy_attack = document.getElementById("enemy_attack")
const contenedorDeMokepones = document.getElementById("contenedorDeMokepones")
const contenedorDeAtaques =document.getElementById("contenedorDeAtaques")

const sectionMap = document.getElementById("watchMap")
const map = document.getElementById("map")
let lienzo = map.getContext("2d")

let mokepones = []
let botones = []
let opcionDeMokepones
let opciondeataques
let a_player = []
let a_enemy
let ataquej

let i_hipodoge 
let i_capipepo 
let i_ratigueya
let i_tucapalma
let i_pydos
let i_langostelvis

let p_pet
let playerId = null
let n_ataque
let e_mokepon
let ataques

let begin = 0
let ph_player = 0
let ph_enemy = 0
let cont = 0
let mapBackground = new Image() 
mapBackground.src = "./assets/mokemap.png"
//Estas dos son para llmar objetos
let mymokepon
let enemyMokepon
//Datos del canva
let mapHeight 
let mapWidth = window.innerWidth - 750
let widthMax = 800
if (mapWidth > widthMax) {
    mapWidth = widthMax - 20
}
mapHeight = mapWidth * 600/800
map.height = mapHeight
map.width = mapWidth

class Mokepon {
    constructor(name, picture, hp, mapPic) {
        this.name = name
        this.picture = picture
        this.hp = hp
        this.ataques = []
        this.ancho = 40
        this.alto = 40        
        this.x = random(0, map.width - this.ancho)
        this.y = random(0, map.height - this.alto)
        this.mapPicture = new Image()
        this.mapPicture.src = mapPic
        this.speedx = 0
        this.speedy = 0
    }
    paintingMokepon() {
        lienzo.drawImage(
            this.mapPicture,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
}
let hipodoge = new Mokepon("Hipodoge" , "./assets/Hipodoge.png", 5, "./assets/hipodogeHead.png")
let capipepo = new Mokepon("Capipepo", "./assets/Capipepo.png", 5, "./assets/capipepoHead.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/Ratigueya.png", 5, "./assets/ratigueyaHead.png")
let langostelvis = new Mokepon("Langostelvis", "./assets/Langostelvis.png",5, "./assets/langostelvisHead.png")
let pydos = new Mokepon("Pydos", "./assets/Pydos.png",5, "./assets/pydosHead.png")
let tucapalma = new Mokepon("Tucapalma", "./assets/Tucapalma.png",5, "./assets/tucapalmaHead.png")

let hipodogeEnemigo = new Mokepon("Hipodoge" , "./assets/Hipodoge.png", 5, "./assets/hipodogeHead.png")
let capipepoEnemigo = new Mokepon("Capipepo", "./assets/Capipepo.png", 5, "./assets/capipepoHead.png")
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/Ratigueya.png", 5, "./assets/ratigueyaHead.png")
let langostelvisEnemigo = new Mokepon("Langostelvis", "./assets/Langostelvis.png", 5, "./assets/langostelvisHead.png")
let pydosEnemigo = new Mokepon("Pydos", "./assets/Pydos.png", 5, "./assets/pydosHead.png")
let tucapalmaEnemigo = new Mokepon("Tucapalma", "./assets/Tucapalma.png", 5, "./assets/tucapalmaHead.png")

hipodoge.ataques.push(
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🌱',id:'boton-tierra'},
)
capipepo.ataques.push(
    {nombre:'🌱',id:'boton-tierra'},
    {nombre:'🌱',id:'boton-tierra'},
    {nombre:'🌱',id:'boton-tierra'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🔥',id:'boton-fuego'},
)
ratigueya.ataques.push(
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🌱',id:'boton-tierra'},
)
langostelvis.ataques.push(
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🌱',id:'boton-tierra'},
)
pydos.ataques.push(
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🌱',id:'boton-tierra'},
)
tucapalma.ataques.push(
    {nombre:'🌱',id:'boton-tierra'},
    {nombre:'🌱',id:'boton-tierra'},
    {nombre:'🌱',id:'boton-tierra'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🔥',id:'boton-fuego'},
)
mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,pydos,tucapalma)
function start () {
    mokepones.forEach((Mokepon) =>{
        opcionDeMokepones =`
            <input type="radio" name="mascota" id=${Mokepon.name} />
            <label class="tarjetas" for=${Mokepon.name}>
                <p>${Mokepon.name}</p>
                <img src=${Mokepon.picture} alt=${Mokepon.name}>
            </label>
        `
        contenedorDeMokepones.innerHTML += opcionDeMokepones
        i_hipodoge = document.getElementById("Hipodoge")
        i_capipepo = document.getElementById("Capipepo")
        i_ratigueya = document.getElementById("Ratigueya")
        i_tucapalma = document.getElementById("Tucapalma")
        i_pydos = document.getElementById("Pydos")
        i_langostelvis = document.getElementById("Langostelvis")
    })
    selecciondeataque.style.display = "none"
    sectionMap.style.display = "none"
    b_pet.addEventListener ("click", f_s_playerpet)
    restart.addEventListener ("click", reiniciar)
    joinGame()
}
function joinGame(){
    fetch("http://localhost:8080/join")
    .then(function(res){
        if (res.ok) {
            res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    playerId = respuesta
                })
        }
    })
}   
function f_s_playerpet() {
    if (i_hipodoge.checked == true) {
         spanp_pet.innerHTML = i_hipodoge.id
         p_pet = i_hipodoge.id
         begin = 1
    }else if (i_capipepo.checked == true) {
         spanp_pet.innerHTML = i_capipepo.id
         p_pet = i_capipepo.id
         begin = 1
    }else if (i_ratigueya.checked == true) {
         spanp_pet.innerHTML = i_ratigueya.id
         p_pet = i_ratigueya.id
         begin = 1
    }else if (i_langostelvis.checked == true) {
        spanp_pet.innerHTML = i_langostelvis.id
        p_pet = i_langostelvis.id
        begin = 1
   }else if (i_pydos.checked == true) {
    spanp_pet.innerHTML = i_pydos.id
    p_pet = i_pydos.id
    begin = 1
}else if (i_tucapalma.checked == true) {
    spanp_pet.innerHTML = i_tucapalma.id
    p_pet = i_tucapalma.id
    begin = 1
}else {
        alert("Seleccione su mokepon para comenzar a luchar")
    }
    if (begin == 1){
        selecciondemascota.style.display = "none"
        breiniciar.style.display = "none"    
    }
    selectMokepon(p_pet)
    extract_atacck(p_pet)
    sectionMap.style.display = "flex"
    startMap()
}
function selectMokepon(p_pet){
    //esta función es para mandar la selección del mokepon al backend
    fetch(`http://localhost:8080/mokepon/${playerId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // el body debe ser una cadena de texto según el estándar de fetch
            mokepon: p_pet
        })
    })
}
function seleccionarmascotaenemigo(enemy){ 
    if (cont < 5){
        //El número debe empezar con 0 porque la posición del array se empieza a contar desde cero
        //El -1 va porque la última posición del array es su length -1
        //let pc = random(0,mokepones.length - 1) Esto estaba cuando se seleccionaba u nenemigo random
        spane_pet.innerHTML = enemy.name
        e_mokepon = enemy.name
    }
}
function random(min, max){
    return Math.floor ( Math.random () * (max - min + 1 ) + min)
} 
function extract_atacck(){
    //aiiua
    for (let i = 0; i < mokepones.length; i++) {
        if (p_pet === mokepones[i].name) {
            ataques = mokepones[i].ataques
        }
    }
    show_attacks(ataques)
}
function show_attacks(ataques){
    ataques.forEach((ataque) =>{
        opciondeataques =`
        <button id=${ataque.id} class="a_button BAtaque">${ataque.nombre}</button>
        `
// Renderizamos cada ataque del personaje
        contenedorDeAtaques.innerHTML += opciondeataques
    })
// Seleccionar botones luego de crearlos
    b_fuego = document.getElementById("boton-fuego")
    b_agua = document.getElementById("boton-agua")
    b_plant = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")
    secuencia ()
}
function secuencia(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) => {  
            if (e.target.textContent ==='🔥') {
                a_player.push("🔥")
                ataquej = "🔥"
                boton.style.background ="#112f58"
                boton.disabled = true
            }else if (e.target.textContent==='💧') {
                a_player.push("💧")
                ataquej = "💧"
                boton.style.background ="#112f58"
                boton.disabled = true
            }else{
                a_player.push("🌱")
                ataquej = "🌱"
                boton.style.background = "#112f58"
                boton.disabled = true
            } 
            ataque_enemigo ()
        })
    }) 
}
function ataque_enemigo (){
    if (cont < 5){
        //en e_mokepon ya accedí al nombre del objeto, ahora falta llamar a los ataques de este
        for (let i = 0; i < mokepones.length; i++) {
            if (e_mokepon === mokepones[i].name) {
                ataques = mokepones[i].ataques
            }
        }
        n_ataque = random(0,ataques.length - 1)
        a_enemy = ataques[n_ataque].nombre
        ataques.splice(n_ataque, 1)  
        createMessage()         
    }
}
function createMessage() {
    if ((ataquej == "🔥" && a_enemy == "🌱") || (ataquej == "🌱" && a_enemy == '💧') || (ataquej == "💧" && a_enemy == '🔥')) {
        ph_player++
        p_ph.innerHTML = ph_player
    }else if (ataquej == a_enemy) {}
    else {
        ph_enemy++
        e_ph.innerHTML = ph_enemy
    }
    let new_attack = document.createElement("p")
    let new_e_attack = document.createElement("p")
    new_attack.innerHTML = ataquej
    new_e_attack.innerHTML = a_enemy
    attack.appendChild(new_attack)
    enemy_attack.appendChild(new_e_attack)
    cont++
    if ( cont == 5 ) {
        final()
    }  
}
function final(){
    breiniciar.style.display = "flex"
    let final = document.getElementById("final_result")
    if (ph_player > ph_enemy) {
        final.innerHTML= "El ganador supremo es el usuario.🎉"
}   else if (ph_player < ph_enemy) {
        final.innerHTML = "El ganador supremo es la máquina.🤖"
    } else {
        final.innerHTML = "Empate XD"
    }
}
function reiniciar() {
    location.reload()
}
function startMap(){
    //Así se muestra sin necesidad de tocar el botón y así cambia de posición más rápidamente
    mymokepon = getObject()
    enemyMokepon = getEnemyObject()
    intervalo = setInterval(drawingCanvas, 50)
    window.addEventListener("keydown", tecla)
    window.addEventListener("keyup", stopMoving)

}
function drawingCanvas() {
    mymokepon.x = mymokepon.x + mymokepon.speedx
    mymokepon.y = mymokepon.y + mymokepon.speedy
    lienzo.clearRect(0,0,map.width,map.height)
    lienzo.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height
    )
    mymokepon.paintingMokepon()

    sendPosition(mymokepon.x, mymokepon.y)

    hipodogeEnemigo.paintingMokepon()
    capipepoEnemigo.paintingMokepon()
    ratigueyaEnemigo.paintingMokepon()
    langostelvisEnemigo.paintingMokepon()
    pydosEnemigo.paintingMokepon()
    tucapalmaEnemigo.paintingMokepon()
    if (mymokepon.speedx !== 0 || mymokepon.speedy !== 0){
        colision(hipodogeEnemigo)
        colision(capipepoEnemigo)
        colision(ratigueyaEnemigo)
        colision(langostelvisEnemigo)
        colision(pydosEnemigo)
        colision(tucapalmaEnemigo)
    }

}
function sendPosition(x, y) {
    fetch(`http://localhost:8080/mokepon/${playerId}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // el body debe ser una cadena de texto según el estándar de fetch
            x,
            y
        })
    }) 
    .then(function(res){
        if (res.ok) {
            res.json()
                .then(function({enemies}) {
                    console.log(enemies)
                })
        }
    })

}
function moverDerecha(){
    mymokepon.speedx = 5
}
function moverIzquierda() {
    mymokepon.speedx = -5
}
function moverArriba() {
    mymokepon.speedy = -5
}
function moverAbajo() {
    mymokepon.speedy = 5
}
function stopMoving(){
    mymokepon.speedx = 0
    mymokepon.speedy = 0
    drawingCanvas()
}
function tecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()                
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;        
        default:
            console.log(event.key)
            break;
    }
}
function getObject(){
    for (let i = 0; i < mokepones.length; i++) {
        if (p_pet === mokepones[i].name) {
            return mokepones[i]
        }
    }
}
function getEnemyObject(){
    for (let i = 0; i < mokepones.length; i++) {
        if (e_mokepon === mokepones[i].name) {
            return mokepones[i]
        }
    }
}
function colision(enemy){
    //Función para revisar las colisiones 
    const   arribaenemy = enemy.y
    const   abajoenemy = enemy.y + enemy.alto
    const   izquierdaenemy = enemy.x
    const   derechaenemy =enemy.x + enemy.ancho
    
    const   abajomascota = mymokepon.y + mymokepon.alto
    const   arribamascota = mymokepon.y 
    const   derechamascota = mymokepon.x + mymokepon.ancho
    const   izquierdamascota = mymokepon.x

    if(abajomascota < arribaenemy || arribamascota > abajoenemy || derechamascota < izquierdaenemy || izquierdamascota > derechaenemy){
        return
    }
    stopMoving()
    //La función siguiente detiene el intervalo para prevenir que se ejecute más de lo que se quiere
    clearInterval(intervalo)
    sectionMap.style.display = "none"
    selecciondeataque.style.display = "flex"    
    console.log("Colisión con " + enemy.name)
   seleccionarmascotaenemigo(enemy)
}
window.addEventListener ("load", start)