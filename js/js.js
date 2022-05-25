let fetchcomics = 'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16'
let personajesfront = 'https://gateway.marvel.com:443/v1/public/characters?modifiedSince=20-08-2021&limit=6&ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16'
let fetchcomics3 = 'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16'
let guardar = 'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=d6b5cfc2f339e698ef1e149331ed4273&hash=b004e618cd225a9b3e0b713eb3c33e16'

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
    let persopadre = document.getElementsByClassName("algunosPersonajes")[0]
    
    const persosindex = async () =>{
        const resp = await fetch(personajesfront,{
        Method:'GET',
        Params:{
            "apikey": "d6b5cfc2f339e698ef1e149331ed4273",
            "ts": "1",
            "hash": "b004e618cd225a9b3e0b713eb3c33e16"   
        }

        })
        const info = await resp.json()
        console.log(info.data.results)

        persopadre.innerHTML = ''

    


        info.data.results.forEach(p => {
            
            let perso = document.createElement('div')
            perso.classList.add('personaje')
            perso.innerHTML+=`
                    <p id="nombre">${p.name}</p>
                    <img id="thumb" src=${p.thumbnail.path}.${p.thumbnail.extension} alt="">
                    <p id="corto">${!p.description?"<p id='corto'>Sin descripción</p>":`${p.description}` }</p>
                    <button id="vermas">Ver Más</button>
            `
     
        persopadre.appendChild(perso)

        });


    } 
    
    persosindex()
    /* console.log(data.data.results) */