"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Se obtienen referencias a elementos del DOM
    const entradaNombre = document.querySelector("#nombre");
    const entradaCapacidad = document.querySelector("#capacidad");
    const btnAgregar1 = document.querySelector("#btn-agregar-1");
    const btnAgregar3 = document.querySelector("#btn-agregar-3");
    const btnBorrarUltimo = document.querySelector("#btn-borrar-ultimo");
    const btnBorrarTodo = document.querySelector("#btn-borrar-todo");
    const btnComprar = document.querySelector("#btn-comprar");
    const spanTotal = document.querySelector("#total");
    const tabla = document.querySelector("#tabla-carrito");

    // Inventario
    const inventario = [
        {
            "productos": ["Air", "Baby Love", "Melón con ananá", "Men", "Wanna"],
            "categoria": "Perfuminas",
            "capacidades": ["250ml", "500ml"],
            "precios": [1100, 2000]
        }, 
        {
            "productos": ["Lima limón", "Mandarina + Té verde", "Mora + Frambuesa", "Papaya + Durazno", "Vainilla con azúcar"],
            "categoria": "Difusores",
            "capacidades": ["250ml", "500ml"],
            "precios": [3000, 4500]
        } 
    ];

    // Arreglo que contendrá un objeto JSON para cada producto (posee productos precargados)
    let carrito = [
        {
            "nombre": "Air",
            "categoria": "Perfuminas",
            "capacidad": "250ml",
            "precio": 1100
        },
        {
            "nombre": "Mandarina + Té verde",
            "categoria": "Difusores",
            "capacidad": "500ml",
            "precio": 4500            
        }
    ];

    // Se muestra la tabla precargada cuando se carga la página
    mostrarTabla(carrito);
    
    // Agrega un producto al arreglo
    btnAgregar1.addEventListener("click", (e) => {
        e.preventDefault();
        agregarProducto(1);
    });

    // Agrega tres productos iguales al arreglo
    btnAgregar3.addEventListener("click", (e) => {
        e.preventDefault();
        agregarProducto(3);
    });

    // Elimina el último producto del arreglo
    btnBorrarUltimo.addEventListener("click", (e) => {
        e.preventDefault();
        carrito.pop();
        mostrarTabla(carrito);
    });

    // Elimina todos los elementos de la tabla
    btnBorrarTodo.addEventListener("click", (e) => {
        e.preventDefault();
        carrito = [];
        mostrarTabla(carrito);
    });

    // Envía los datos de la tabla generados a través del formulario
    btnComprar.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Enviando datos de compra...");
    });

    // Agrega una cantidad dada de productos ingresados por el usuario
    function agregarProducto(cantidad) {
        let nombre, categoria, capacidad, precio;

        // Se obtienen el producto y la capacidad ingresados por el usuario
        nombre = entradaNombre.value;
        capacidad = entradaCapacidad.value;

        // Se verifica la categoría del producto
        let i = 0;
        while (i < inventario.length && !inventario[i].productos.includes(nombre)) {
            i++;
        }
        categoria = inventario[i].categoria;

        // Se consigue el precio del producto
        let j = 0;
        while (j < inventario[i].capacidades.length && !inventario[i].capacidades[j].includes(capacidad)) {
            j++;
        }
        
        precio = inventario[i].precios[j];

        // Si se encontraron los datos del producto...
        if (nombre && categoria && capacidad && precio) {
            // ...se crea un objeto JSON del producto nuevo
            let nuevoProducto = {
                "nombre": nombre,
                "categoria": categoria,
                "capacidad": capacidad,
                "precio": precio
            }
    
            // ... se agrega el producto N veces al arreglo (modelo)
            for (let i = 0; i < cantidad; i++) {
                carrito.push(nuevoProducto);
            }
    
            // Se muestra la tabla en el HTML (vista)
            mostrarTabla(carrito);
        }
    }

    // Se calcula el total y se muestra la tabla HTML (vista)
    function mostrarTabla(carrito) {
        let total = 0;

        // Se vacía la tabla HTML (vista)
        tabla.innerHTML = "";

        // Para cada producto se genera dinámicamente una nueva fila
        carrito.forEach(producto => {
            let datosFila = [producto.nombre, producto.categoria, producto.capacidad, producto.precio];
            agregarFilaTabla(tabla, datosFila, producto.categoria);

            // Se suma el precio del producto agregado al total
            total += producto.precio;
        });

        // Se muestra el total de la compra
        spanTotal.innerHTML = total;

        // Se imprime el arreglo de objetos en la consola
        console.table(carrito);
    }

    // Agrega dinámicamente una fila al DOM con los datos del producto agregado
    function agregarFilaTabla(tabla, datos, categoria) {
        let fila = document.createElement("tr");

        datos.forEach(dato => {
            let celda = document.createElement("td");
            celda.innerHTML = dato;
            fila.appendChild(celda);
        });

        if (categoria === "Perfuminas") {
            fila.classList.add("perfuminas");
        } else if (categoria === "Difusores") {
            fila.classList.add("difusores");
        }

        tabla.appendChild(fila);
    }
});
