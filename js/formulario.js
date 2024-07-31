"use-strict";

document.addEventListener("DOMContentLoaded", () => {
    // Longitud del código captcha
    const CANT_CARACTERES = 6;

    // Se genera un captcha aleatorio y se almacena en 'captchaAleatorio'
    let captchaAleatorio = generarCaptcha(CANT_CARACTERES);

    // Se almacena la referencia de "#captcha-aleatorio" en la variable captchaSalida y se reemplaza su contenido con el número aleatorio obtenido
    const captchaSalida = document.querySelector("#captcha-aleatorio");
    captchaSalida.innerHTML = captchaAleatorio;

    // Se crea el nodo al elemento <p> donde se mostrará el resultado del captcha
    let resultado = document.querySelector("#resultado");

    // Se almacena la referencia del <button> con ID "btn-enviar" en la variable 'btn' y se le agrega un event listener
    let btnEnviarForm = document.querySelector("#form");
    btnEnviarForm.addEventListener("submit", enviarFormulario);

    // Botón refrescar captcha
    let btnRecargarCaptcha = document.querySelector("#recargar-captcha");
    btnRecargarCaptcha.addEventListener("click", recargarCaptcha);

    // Envía el formulario en caso que el captcha sea correcto
    function enviarFormulario(e) {
        e.preventDefault();

        // Se verifica el captcha ingresado y se almacena en la variable booleana 'captchaValido'
        let captchaValido = validarCaptcha(captchaAleatorio);

        // Si el captcha es válido se envía el formulario, sino se recarga el captcha
        if (captchaValido) {
            let formData = new FormData(form);

            // Se guardan los datos ingresados en variables
            let nombre = formData.get("nombre");
            let apellido = formData.get("apellido");
            let email = formData.get("email");
            let telefono = formData.get("telefono");
            let ciudad = formData.get("ciudad");
            let provincia = formData.get("provincia");
            let productosCatalogo = formData.get("productos-catalogo");
            let productosLocal = formData.get("productos-local");
            let mensaje = formData.get("mensaje");

            // Salida
            resultado.innerHTML = "Correcto. Enviando formulario...";
            console.log(nombre, apellido, email, telefono, ciudad, provincia, productosCatalogo, productosLocal, mensaje);
        } else {
            resultado.innerHTML = "Incorrecto. Volvé a intentarlo.";
            recargarCaptcha();
        }
    }

    // Genera un captcha aleatorio con una longitud de caracteres dada
    function generarCaptcha(longitud) {
        // String de donde se tomarán caracteres aleatorios
        let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // Inicialización de captcha vacío
        let captchaAleatorio = "";

        // Ciclo que irá concatenando un carácter aleatorio en cada iteración
        for (let i = 0; i < longitud; i++) {
            let indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            captchaAleatorio += caracteres.charAt(indiceAleatorio);
        }

        return captchaAleatorio;
    }

    // Recarga el captcha
    function recargarCaptcha() {
        captchaAleatorio = generarCaptcha(CANT_CARACTERES);
        captchaSalida.innerHTML = captchaAleatorio;
    }

    // Compara el captcha aleatorio con el ingresado por el usuario
    function validarCaptcha(codigoCaptcha) {
        // Se captura el input
        let input = document.querySelector("#captcha-input").value;

        // Se retorna el resultado de la comparación entre el input y el código captcha
        return input === codigoCaptcha;
    }
});
