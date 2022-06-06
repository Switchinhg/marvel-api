let fetchcomics = 'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16'
let personajestodos = 'https://gateway.marvel.com/v1/public/characters?limit=100ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16'
let guardar = 'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16'
/* inicio de offset para que se le pueda hacer offset a los personajes al apretar ver mas personajes */
let offset = 0
/* key de personajes */
let personajesKey = `https://gateway.marvel.com:443/v1/public/characters?limit=18&offset=${offset}&ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16`


/* Traido de HTMl */
let img = document.getElementById('img')
let nombre = document.getElementById('nombrem')
let id = document.getElementById('id')
let desc = document.getElementById('descripcion')
let comics = document.getElementsByClassName("comics")[0]
let historias = document.getElementsByClassName("historias")[0]
let persopadre = document.getElementsByClassName("personajes")[0]
/* Modal */
let modal = document.getElementsByClassName("modal")[0]
let modalContainer = document.getElementsByClassName("content")[0]
/* Boton de cargar mas */
let cargarmas = document.getElementById("cargarmas")
/* clase de cargar mas para borarla */
let cargarmasclase = document.getElementsByClassName("cargarmas")[0]

//---------------------------

    /* test */
/* fetch(fetchcomics,{
    Method:'GET',
    Params:{
        "apikey": "d6b5cfc2f339e698ef1e149331ed4273",
        "ts": "1",
        "hash": "b004e618cd225a9b3e0b713eb3c33e16"   
    },
    headers: {
        'Content-type':'application/json;charset=UTF-8'
    }
})
    .then(resp => resp.json())
    .then(data=>{
        console.log(data.data.results)
    }) */


/* agarra personajes de A-Z y los agrega al html */

const pedirPersonajes = async () => {
    const resp = await fetch(personajesKey, {
        Method: 'GET',
        Params: {
            "apikey": "d6b5cfc2f339e698ef1e149331ed4273",
            "ts": "1",
            "hash": "b004e618cd225a9b3e0b713eb3c33e16"
        }
    })
    /* respuesta de la api convertida a JSON */
    const info = await resp.json()
    /* JSON ya para trabajar */
    /* Si el array esta vacio pone el placeholder de personaje diciendo que no se encontro nada en la busqueda */
    if (info.data.results == 0) {
        let perso = document.createElement('div')

        perso.classList.add('personaje')
        perso.innerHTML = `
            <p id="nombre"> No encontrado </p>
            <img id="thumb" src="./imgs/placeholder.png" alt="">
            <p id="corto">Personaje no encontrado!</p>
    `
        persopadre.appendChild(perso)
    } else {
        /* Si no esta vacio el array va a poner todos lo personajes que encontró */
        info.data.results.forEach(p => {
                /* Crea un div y le pone la clase peronsaje y le pone adentro todos los atrbutos de personaje */
            let perso = document.createElement('div')
            perso.classList.add('personaje')
            perso.innerHTML = `
            <p id="nombre"> ${p.name} </p>
            <img id="thumb" src=${p.thumbnail.path}.${p.thumbnail.extension} alt="">
            <p id="corto">${!p.description?`<p id="corto">N° de comics: ${p.stories.available}</p>`:`${p.description}` }</p>
            <button id="vermas${p.id}" class="boton">Ver Más</button>
    `

            persopadre.appendChild(perso)

            let button = document.getElementById(`vermas${p.id}`)

            /* Al hacer click en el boton ver mas se abre el modal y muestra toda la info del perso */
            button.addEventListener('click', () => {
                modal.classList.toggle("modal-active")
                img.src = `${p.thumbnail.path}.${p.thumbnail.extension}`
                nombre.innerHTML = `<b>Nombre</b>: ${p.name}`

                id.innerHTML = `<b>ID</b>:${p.id}`

                desc.innerHTML = `${!p.description?`<p id="corto">Sin Descripción</p>`:`${p.description}` }`
                /* Muestra los comics */
                comics.innerHTML = ''
                p.comics.items.forEach(e => {
                    comics.innerHTML += `<li>${e.name}</li><br>`
                });
                /* Muestra las historias */
                historias.innerHTML = ''
                p.stories.items.forEach(e => {
                    historias.innerHTML += `<li>${e.name}</li><br>`
                })
            })
        });
    }
}

/* llama a pedir personaje sin patrón de busqueda */
pedirPersonajes()


/* Buscar personaje por nombre */
let buscador = document.getElementById("buscador")
let form = document.getElementById("buscarPersoForm")
/* Al enviar busqueda de personaje se detecta aca */
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let bv = buscador.value
    persopadre.innerHTML = ""
    personajesKey = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${bv}&ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16`
    cargarmasclase.innerHTML = ""
    buscador.value = ""
    pedirPersonajes()
})
/*  */
/* Limpiar busqueda */
let limpiarBusqueda = document.getElementById("limpiarBusqueda")
limpiarBusqueda.onclick= () =>{
    persopadre.innerHTML = ""
    personajesKey = `https://gateway.marvel.com:443/v1/public/characters?limit=18&offset=${offset}&ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16`
    console.log("ads")
    pedirPersonajes()
}

/* Cargar más personajes */
cargarmas.onclick = () => {
    offset += 18
    personajesKey = `https://gateway.marvel.com:443/v1/public/characters?limit=18&offset=${offset}&ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16`
    pedirPersonajes()

}
/* Modal */
modal.onclick = () => {
    modal.classList.toggle("modal-active")
}
modalContainer.addEventListener("click", (e) => {
    e.stopPropagation()
})