const container  = document.querySelector('.container')
const resultado  = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {

    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e){
    e.preventDefault()

    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if( ciudad === '' || pais === ''){

        mensaje('Ingresa algo valido', 'error')

    } else {

        consultarAPI(ciudad,pais)
    }


}




function mensaje(mensaje,tipo) {

    const divMensaje = document.querySelector('.bg-red-100')

    if(!divMensaje){

        const divMensaje = document.createElement('div')
    if(tipo === 'error' ) {
        divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')
       
    } else {

        divMensaje.classList.add('verde')
    }

    divMensaje.innerHTML = `

    <strong class="font-bold"> Error! </strong>
    <span class="block">${mensaje} </span>
    
    
    `
    container.appendChild(divMensaje)

            setTimeout(() => {

                divMensaje.remove()
            },2000 )


    }


}

function consultarAPI(ciudad,pais) {

    const appID = '8bd07fa854fb33b0499d0528d1ee1b77'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID} `;

    Spinner();

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        limpiarHTML()
        if(datos.cod === "404"){
            mensaje('Ciudad no valida', 'error')
            return;

        }

        // imprime la resupuesta en el 
        mostrarClima(datos)
    })
}

function mostrarClima(datos){

    const {name, main: {temp,temp_max,temp_min}} = datos;

    const centigrados = parseInt(temp- 273.15) 

    const actual = document.createElement('p')

    actual.innerHTML = `
   <p class='text-7xl'>  ${name} </p> 
   <p> Temperatura Actual:  ${centigrados}&#8451</p> 
   <p class='text-xl'> Temperatura Maxima: ${parseInt (temp_max- 273.15)}&#8451</p> 
   <p class='text-xl' > Temperatura Minima: ${parseInt (temp_min- 273.15)}&#8451</p> 
   
    
    `;

    actual.classList.add('font-bold', 'text-3xl')

    const resultadoDiv = document.createElement('div')

    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(actual)

    resultado.appendChild(resultadoDiv)



}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner(){
    limpiarHTML()

    const divSpinner = document.createElement('div')
    divSpinner.classList.add('spinner')

    divSpinner.innerHTML = `

    
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
    
    
    `
    resultado.appendChild(divSpinner)
}