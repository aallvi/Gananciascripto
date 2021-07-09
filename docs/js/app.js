const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {

    formulario.addEventListener('submit', cotizacion)
})


function cotizacion (e){
    e.preventDefault()

    

    const inversion = document.querySelector('#inversion').value
    const cripto = document.querySelector('#cripto').value
    const criptofinal = document.querySelector('#criptofinal').value

    if( isNaN(inversion)  || inversion === '' || isNaN(criptofinal) || criptofinal === ''  || isNaN(cripto) || cripto === ''){

        console.log('error')

        const divMensaje = document.createElement('div')
        divMensaje.classList.add('bg-red-200', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')
        divMensaje.textContent = 'Llena todos los campos'
        formulario.appendChild(divMensaje)

        setTimeout(() => {

          divMensaje.remove()

        }, 3000)
      



    } else {
        
        ganancia(inversion,cripto,criptofinal)

        
    }




}


function ganancia(compra,precioCripto,precioCriptoFinal){

    
    const multiplicador = precioCriptoFinal / precioCripto

    const montoFinal = compra * multiplicador
    const gananciasNetas =  (compra * multiplicador) - compra
    const variacionCapital = ((precioCriptoFinal / precioCripto) -1 )*100

    console.log(montoFinal)
    console.log(gananciasNetas)
    console.log(variacionCapital)


    const informacion = document.createElement('div')
        informacion.classList.add('bg-green-100', 'border-green-400', 'text-black-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')
        informacion.innerHTML = 
        `      
        <p>Ganancias Netas: $${gananciasNetas.toFixed(2)} </p> 

         <p> Variacion de Capital : ${variacionCapital.toFixed(2)}% </p> 

         <p> Monto Final : $${montoFinal.toFixed(2)} </p>  
        
        `
        
       while(resultado.firstChild){
           resultado.removeChild(resultado.firstChild)
       }

        resultado.appendChild(informacion)


         




}
