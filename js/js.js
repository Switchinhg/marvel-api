let fetchcomics = 'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16'
let personajestodos = 'https://gateway.marvel.com/v1/public/characters?limit=100ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16'
let guardar = 'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16'


function cambiarperso() {
    let num = Math.floor(Math.random() * 1561)
    let personajesfront = `https://gateway.marvel.com:443/v1/public/characters?&limit=1&offset=${num}&ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16`
    return personajesfront
}

/* Traido de HTMl */
let img = document.getElementById('img')
let nombre = document.getElementById('nombre')
let id = document.getElementById('id')
let desc = document.getElementById('descripcion')
let comics = document.getElementsByClassName("comics")[0]
let historias = document.getElementsByClassName("historias")[0]

//---------------------------

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


/* Agarra n personajes random y los guarda en localstorage */
let persopadre = document.getElementsByClassName("algunosPersonajes")[0]
const ntimes = (n) => {
    
    let persos = []

    for (let i = 0; i < n; i++) {
        const persosindex = async () => {
            const resp = await fetch(cambiarperso(), {
                Method: 'GET',
                Params: {
                    "apikey": "d6b5cfc2f339e698ef1e149331ed4273",
                    "ts": "1",
                    "hash": "b004e618cd225a9b3e0b713eb3c33e16"
                }
            })
            const info = await resp.json()
            persos.push(info.data.results[0])
            localStorage.setItem("personajesindex", JSON.stringify(persos));
        }
        persosindex()
    }
    cargarPersos()
}

ntimes(6)



/* Carga los personajes en el inicio y tambien en el modal */
function cargarPersos() {
    
    let a = JSON.parse(localStorage.getItem('personajesindex'))
    persopadre.innerHTML = ''

    a.forEach(p => {
        console.log("entre")
        p.thumbnail
        let perso = document.createElement('div')
        perso.classList.add('personaje')
        perso.innerHTML = `
                <p id="nombre">${p.name}</p>
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
            historias.innerHTML = ''
            p.stories.items.forEach(e => {
                historias.innerHTML += `<li>${e.name}</li><br>`
            })
        })
    });
}


/* cargarPersos() */



/* Modal */
let modal = document.getElementsByClassName("modal")[0]
modal.onclick = () => {
    modal.classList.toggle("modal-active")
}
let modalContainer = document.getElementsByClassName("content")[0]
modalContainer.addEventListener("click", (e) => {
    e.stopPropagation()
})