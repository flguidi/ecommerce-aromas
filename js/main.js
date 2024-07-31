"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const iconoMenu = document.querySelector("#icono-menu");
    const opciones = document.querySelector("header ul.menu");

    iconoMenu.addEventListener("click", abrirCerrarMenu);
    
    function abrirCerrarMenu() {
        opciones.classList.toggle("mostrar");

        // Alternar imágenes de menú abierto/cerrado
        if (opciones.classList.contains("mostrar")) {
            iconoMenu.src = "img/iconos/menu-cerrar.svg";
        } else {
            iconoMenu.src = "img/iconos/menu-abrir.svg";
        }
    }
});    
