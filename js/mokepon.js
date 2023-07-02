const selecciondeataque = document.getElementById("ataque"); // Elemento HTML para seleccionar un ataque.
const b_pet = document.getElementById("b_mascota"); // Elemento HTML para seleccionar una mascota (botón de selección de mascota).
const restart = document.getElementById("reinicio"); // Elemento HTML para reiniciar el juego.

let b_fuego; // Variable para almacenar la selección de ataque de tipo fuego.
let b_agua; // Variable para almacenar la selección de ataque de tipo agua.
let b_plant; // Variable para almacenar la selección de ataque de tipo planta.

const selecciondemascota = document.getElementById("mascota"); // Elemento HTML para seleccionar una mascota.
const breiniciar = document.getElementById("reiniciar"); // Elemento HTML para reiniciar el juego.

const spanp_pet = document.getElementById("p_pet"); // Elemento HTML para mostrar el nombre de la mascota del jugador.
const spane_pet = document.getElementById("e_pet"); // Elemento HTML para mostrar el nombre de la mascota enemiga.

const p_ph = document.getElementById("ph_player"); // Elemento HTML para mostrar los puntos de salud (PH) del jugador.
const e_ph = document.getElementById("ph_enemy"); // Elemento HTML para mostrar los puntos de salud (PH) del enemigo.
const attack = document.getElementById("attack"); // Elemento HTML para realizar un ataque.
const enemy_attack = document.getElementById("enemy_attack"); // Elemento HTML para mostrar el ataque del enemigo.
const contenedorDeMokepones = document.getElementById("contenedorDeMokepones"); // Elemento HTML para contener los elementos de las mascotas.
const contenedorDeAtaques = document.getElementById("contenedorDeAtaques"); // Elemento HTML para contener los elementos de los ataques.

const sectionMap = document.getElementById("watchMap"); // Elemento HTML para mostrar el mapa del juego.
const map = document.getElementById("map"); // Elemento HTML del lienzo del mapa.
let lienzo = map.getContext("2d"); // Contexto 2D del lienzo del mapa.

let mokepones = []; // Arreglo para almacenar los datos de los mokepones.
let botones = []; // Arreglo para almacenar los elementos de los botones.
let opcionDeMokepones; // Opción seleccionada de mokepones.
let opciondeataques; // Opción seleccionada de ataques.
let a_player = []; // Arreglo para almacenar los ataques del jugador.
let a_enemy; // Ataque del enemigo.
let ataquej; // Ataque seleccionado.

let i_hipodoge; // Índice del mokepon "Hipodoge".
let i_capipepo; // Índice del mokepon "Capipepo".
let i_ratigueya; // Índice del mokepon "Ratigueya".
let i_tucapalma; // Índice del mokepon "Tucapalma".
let i_pydos; // Índice del mokepon "Pydos".
let i_langostelvis; // Índice del mokepon "Langostelvis".

let p_pet; // Nombre de la mascota del jugador.
let playerId = null; // ID del jugador.
let n_ataque; // Número de ataques.
let e_mokepon; // Mokepon enemigo.
let ataques; // Arreglo para almacenar los ataques.

let begin = 0; // Variable para indicar el inicio del juego.
let ph_player = 0; // Puntos de salud (PH) del jugador.
let ph_enemy = 0; // Puntos de salud (PH) del enemigo.
let cont = 0; // Contador.
let mapBackground = new Image(); // Imagen de fondo del mapa.
mapBackground.src = "./assets/mokemap.png"; // Ruta de la imagen de fondo del mapa.

let mymokepon; // Objeto de la mascota controlada por el jugador.
let enemyMokepon; // Objeto de la mascota enemiga.

let mapHeight; // Altura del mapa.
let mapWidth = window.innerWidth - 750; // Ancho del mapa.
let widthMax = 800; // Ancho máximo.
if (mapWidth > widthMax) {
    mapWidth = widthMax - 20; // Ajuste del ancho máximo.
}
mapHeight = mapWidth * 600/800; // Cálculo de la altura del mapa en relación al ancho.
map.height = mapHeight; // Asignación de la altura del mapa.
map.width = mapWidth; // Asignación del ancho del mapa.


class Mokepon {
    /* 
        crear y configurar un nuevo objeto Mokepon. Recibe cuatro parámetros: 
        "name" (nombre del Mokepon), "picture" (ruta de la imagen del Mokepon), 
        "hp" (puntos de vida del Mokepon) y 
        "mapPic" (ruta de la imagen del Mokepon en el mapa). 

        En el constructor, se asignan los valores pasados como argumentos a las propiedades correspondientes del objeto Mokepon. 
        Además, se inicializan otras propiedades como "ataques" (un array vacío), 
        "ancho" y "alto" (dimensiones del Mokepon en el mapa), 
        "x" y "y" (posición inicial del Mokepon en el mapa), 
        "mapPicture" (objeto Image con la imagen del Mokepon en el mapa) y 
        "speedx" y "speedy" (velocidades iniciales en las coordenadas x e y).
    */
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
    /* 
        Método "paintingMokepon()": Este método se utiliza para dibujar el Mokepon en el lienzo (canvas). 
        Utiliza el método "drawImage()" del objeto lienzo para dibujar la imagen del Mokepon en las coordenadas especificadas por las propiedades "x" y "y", 
        con las dimensiones especificadas por las propiedades "ancho" y "alto". 
        El método "paintingMokepon()" se llama para cada instancia de 
        Mokepon y se encarga de dibujar el Mokepon en su posición actual en el mapa.
    */
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
/* 
    La función "start" se utiliza para iniciar el juego. Se recorre el array "mokepones" y se genera una opción para cada Mokepon en el HTML. 
    Luego, se configuran los event listeners para los botones y se llama a la función "joinGame".
*/
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
}
/* 
    // La función "f_s_playerpet" se ejecuta cuando se hace clic en el botón de selección de Mokepon del jugador. 
    Verifica qué Mokepon ha sido seleccionado y realiza las acciones correspondientes, como ocultar elementos en la interfaz y llamar a otras funciones.

*/
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
    extract_atacck(p_pet)
    sectionMap.style.display = "flex"
    startMap()
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
/*
    La función "random" genera un número aleatorio dentro de un rango específico (min y max).
    Cada número corresponde a un mokepon
*/
function random(min, max){
    return Math.floor ( Math.random () * (max - min + 1 ) + min)
} 
/*
    La función "extract_atacck" busca en el array "mokepones" el Mokepon seleccionado por el jugador y guarda sus ataques en la variable "ataques".
*/
function extract_atacck(){
    for (let i = 0; i < mokepones.length; i++) {
        if (p_pet === mokepones[i].name) {
            ataques = mokepones[i].ataques
        }
    }
    show_attacks(ataques)
}
// La función "show_attacks" recorre el array de ataques recibido como argumento y genera botones HTML para cada ataque. 
// Luego, los muestra en el contenedor "contenedorDeAtaques". 
// Además, asigna los botones a las variables "b_fuego", "b_agua" y "b_plant" para su posterior uso, y asigna un event listener a cada botón llamando a la función "secuencia".

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
// La función "secuencia" asigna un event listener a cada botón almacenado en la variable "botones". 
// Cuando se hace clic en un botón, se verifica el texto del botón y se realizan acciones correspondientes, 
// como agregar un valor a la variable "a_player" y cambiar el estilo del botón. 
// Luego, llama a la función "ataque_enemigo".
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

// La función "ataque_enemigo" busca en el array "mokepones" el Mokepon del enemigo seleccionado y guarda sus ataques en la variable "ataques". 
// Luego, elige aleatoriamente un ataque de la lista y lo asigna a la variable "a_enemy". 
// A continuación, elimina el ataque seleccionado del array "ataques" y llama a la función "createMessage".
function ataque_enemigo (){
    if (cont < 5){
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
// La función "createMessage" realiza acciones en función de los ataques seleccionados por el jugador y el enemigo. 
// Si los ataques son de tipos diferentes, incrementa los puntos de vida del jugador o del enemigo según corresponda. 
// Luego, crea elementos HTML para mostrar los ataques seleccionados y actualiza los contadores. 
// Si se han realizado 5 ataques, llama a la función "final".

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

// La función "final" muestra el resultado final del juego. 
// Dependiendo de los puntos de vida del jugador y del enemigo, muestra un mensaje indicando quién es el ganador o si hay un empate.

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

// La función "startMap" se encarga de iniciar el mapa del juego. 
// Establece las funciones de dibujado y movimiento del Mokepon controlado por el jugador. 
// Además, agrega event listeners para las teclas de dirección y envía la posición del jugador al servidor.
function startMap(){
    //Así se muestra sin necesidad de tocar el botón y así cambia de posición más rápidamente
    mymokepon = getObject()
    enemyMokepon = getEnemyObject()
    intervalo = setInterval(drawingCanvas, 50)
    window.addEventListener("keydown", tecla)
    window.addEventListener("keyup", stopMoving)
}
// La función "drawingCanvas" se encarga de dibujar el mapa del juego y los Mokepon en sus respectivas posiciones. 
// Además, actualiza la posición del Mokepon controlado por el jugador y envía esta posición al servidor.
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

// Las funciones "moverDerecha", "moverIzquierda", "moverArriba" y "moverAbajo" 
// establecen la velocidad en el eje correspondiente para el Mokepon controlado por el jugador.
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

// La función "stopMoving" establece la velocidad en cero 
// para detener el movimiento del Mokepon controlado por el jugador 
// y llama a "drawingCanvas" para actualizar la posición.
function stopMoving(){
    mymokepon.speedx = 0
    mymokepon.speedy = 0
    drawingCanvas()
}

// La función "tecla" se encarga de manejar los eventos de teclado. 
// Dependiendo de la tecla presionada, llama a la función correspondiente para mover al Mokepon controlado por el jugador.
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

// La función "getObject" busca y devuelve el objeto Mokepon correspondiente al jugador seleccionado.
function getObject(){
    for (let i = 0; i < mokepones.length; i++) {
        if (p_pet === mokepones[i].name) {
            return mokepones[i]
        }
    }
}

// La función "getEnemyObject" busca y devuelve el objeto Mokepon correspondiente al enemigo seleccionado.
function getEnemyObject(){
    for (let i = 0; i < mokepones.length; i++) {
        if (e_mokepon === mokepones[i].name) {
            return mokepones[i]
        }
    }
}

// La función "colision" verifica si hay colisión entre el Mokepon controlado por el jugador y el Mokepon enemigo. 
// Si hay colisión, muestra un mensaje de colisión.
function colision(enemy){
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