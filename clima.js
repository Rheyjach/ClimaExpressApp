//Habilitar boton
document.getElementById("ciudad").addEventListener("input", function () {
    let boton=document.getElementById("boton")
    if (document.getElementById("ciudad").value.trim() !== '') {
        boton.disabled = false
    } else {
        boton.disabled = true
    }
})


// Funcion de conexion a la API
async function obtenerDatos() {
    try {
        let ciudad = document.getElementById("ciudad").value
        let informacion = document.getElementById("informacion")
        let obtenerInfo = await fetch(`https://api.weatherapi.com/v1/current.json?key=e78e436b53d9411a80910450250202&q=${ciudad.trim().toLowerCase()}&lang=es`)
        let respuesta = await obtenerInfo.json()
        let ciudadIngresada = respuesta.location.name
        let pais = respuesta.location.country
        let ultimaActualizacion = respuesta.current.last_updated
        let temperaturaCentigrados = respuesta.current.temp_c
        let temperaturafahrenheit = respuesta.current.temp_f
        let descripcionClima = respuesta.current.condition.text
        let icono = respuesta.current.condition.icon
        let humedad = respuesta.current.humidity
        let velocidadViento = respuesta.current.wind_kph
        //Eliminar datos anteriores
        informacion.replaceChildren()
        //Integracion de la respuesta al FrontEnd de la App
        if (ciudadIngresada && pais) {
            dato = document.createElement("p")
            dato.textContent = `${ciudadIngresada}/${pais}`
            informacion.appendChild(dato)
        }
        if (icono) {
            imagen = document.createElement("img")
            imagen.src = "http:" + icono
            informacion.append(imagen)
        }
        if (descripcionClima) {
            dato = document.createElement("p")
            dato.textContent = descripcionClima
            informacion.appendChild(dato)
        }
        if (ultimaActualizacion) {
            dato = document.createElement("p")
            dato.textContent = `Ultima actualizacion: ${ultimaActualizacion}`
            informacion.appendChild(dato)
        }
        if (typeof temperaturaCentigrados === "number") {
            dato = document.createElement("p")
            dato.textContent = `Temperatura Centigrados: ${temperaturaCentigrados} grados`
            informacion.appendChild(dato)
        }
        if (typeof temperaturafahrenheit === "number") {
            dato = document.createElement("p")
            dato.textContent = `Temperatura Fahrenheit: ${temperaturafahrenheit} grados`
            informacion.appendChild(dato)
        }
        if (humedad) {
            dato = document.createElement("p")
            dato.textContent = `Humedad: ${humedad}%`
            informacion.appendChild(dato)
        }
        if (velocidadViento) {
            dato = document.createElement("p")
            dato.textContent = `Velocidad del Viento: ${velocidadViento}/kph`
            informacion.appendChild(dato)
        }//Manejo de errores
    } catch (error) {
        alert(`${error} - Verifique la conexion a internet y que la ciudad ingresada sea valida`)

    }
}


