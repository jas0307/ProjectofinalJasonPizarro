

const Inmueble = function(item,nombre,marca,stock,precio,lugar,observacion){
this.item=item
this.nombre=nombre
this.marca=marca
this.stock=stock
this.precio=precio
this.lugar=lugar
this.observacion=observacion

}
//Inventario inicial
let list = new Inmueble ("Item","Nombre","Marca","Stock","Precio","Lugar","Observación")
let bien1 = new Inmueble (0,"pc","acer",5,350000,"sala de computacion","sin observación")
let bien2 = new Inmueble (1,"pc","lenovo",4,450000,"sala de profesores","pc 2 sin pantalla")
let bien3 = new Inmueble (2,"escritorio","ikea",5,100000,"sala de computacion","sin observación")
let bien4 = new Inmueble (3,"escritorio","ikea",4,100000,"sala de profesores","2 con rayones")
let bien5 = new Inmueble (4,"laptop","hp",5,350000,"sala de computacion","1 pantalla quebrada")
let bien6 = new Inmueble (5,"libro matematicas","santillana",40,35000,"biblioteca","3 libros sin portada")
let bien7 = new Inmueble (6,"libro ciencias","editorial planeta",39,32000,"biblioteca","1 libro roto")

let inventario = [bien1,bien2,bien3,bien4,bien5,bien6,bien7]

const datos = localStorage.getItem("Inmueble");
console.log(datos)
if (datos) {
  // Convierte los datos en un array de objetos
  const bienesEnLocalStorage = JSON.parse(datos);
        // Agrega el bien al inventario
  
  inventario = bienesEnLocalStorage;
}

  
const filtrarBtn = document.getElementById("filtrar");
filtrarBtn.addEventListener("click", () => {filtrarInventario();});

const agregarBtn = document.getElementById("agregar");
agregarBtn.addEventListener("click", () => {agregarProducto();});



function filtrarInventario(){ //funcion para filtrar
  

  const input = document.getElementById('filtrarP').value;
  const palabraClave = input.trim().toUpperCase();
  const resultado = inventario.filter((producto) => producto.nombre.toUpperCase().includes(palabraClave));
console.log(resultado)

    const resultadoTable = document.getElementById('resultado');
    resultadoTable.innerHTML = ''; // Elimina contenido previo de la tabla
    
    if (resultado.length > 0 ) {  //si hay algun resultado, creo el container
    const newRow = resultadoTable.insertRow();
        if(input === ""){
        alert('Ingrese valor de busqueda');
        return
}
        // Inserta celdas en la fila
        for (let x in list) {
            const celda = newRow.insertCell();
            celda.textContent = list[x];
          }
            resultado.forEach((producto) => {
            const row = resultadoTable.insertRow();
            const itemCell = row.insertCell(0);
            const nombreCell = row.insertCell(1);
            const marcaCell = row.insertCell(2);
            const stockCell = row.insertCell(3);
            const precioCell = row.insertCell(4);
            const lugarCell = row.insertCell(5);
            const observacionCell = row.insertCell(6);
            
            itemCell.textContent = producto.item;
            nombreCell.textContent = producto.nombre;
            marcaCell.textContent = producto.marca;
            stockCell.textContent = producto.stock;
            precioCell.textContent = producto.precio;
            lugarCell.textContent = producto.lugar;
            observacionCell.textContent = producto.observacion;
            
          });
        } else {
          alert('No se encontraron coincidencias');
        }
    }


    function agregarProducto() { 
      
      agregarBtn.disabled = true;//deshabilito boton de agregar

      let ultimoItem = inventario[inventario.length - 1].item 
      let itemInput = ultimoItem +1 //aumenta al siguiente item creado
        const form = document.createElement('form'); //creo un formulario inyectado desde js
        form.innerHTML = 
        `
          <label for="nombre-input">Nombre:</label>
          <input id="nombre-input" type="text" required>
          <label for="marca-input">Marca:</label>
          <input id="marca-input" type="text" required>
          <label for="stock-input">Stock:</label>
          <input id="stock-input" type="number" step="1" required>
          <label for="precio-input">Precio:</label>
          <input id="precio-input" type="number" step="1" required>
          <label for="lugar-input">Lugar:</label>
          <input id="lugar-input" type="text" required>
          <label for="observacion-input">Observación:</label>
          <input id="observacion-input" type="text" required>       
          <button type="submit">Agregar</button>
          <button id="cancelar">Cancelar</button>
        `;
        
        const div1 = document.querySelector("#div1"); //creo form dentro div1
        div1.appendChild(form);  //agrego la card nueva al div
       
        const cancelarBtn = document.getElementById("cancelar");
        cancelarBtn.addEventListener('click', function(event) {
         event.preventDefault
          // Habilita el botón "Agregar" nuevamente
          agregarBtn.disabled = false;
          // Elimina el formulario
          form.remove();
      });

        form.addEventListener('submit', function (event) { //el boton que envia, evalua si todo esta ok
          event.preventDefault();
          agregarBtn.disabled = false;

       
          
          // "id" refieren a los inyectados en el form de arriba 
          const nombreInput = document.getElementById('nombre-input').value.trim();
          const marcaInput = document.getElementById('marca-input').value.trim();
          const precioInput = parseFloat(document.getElementById('precio-input').value);
          const stockInput = parseInt(document.getElementById('stock-input').value);
          const lugarInput = document.getElementById('lugar-input').value.trim();
          const observacionInput = document.getElementById('observacion-input').value.trim();
      
          if (isNaN(precioInput) || isNaN(stockInput) || nombreInput === ''|| marcaInput === ''|| lugarInput === ''|| observacionInput === '') { //valido los input
            alert('Por favor ingresa valores válidos.');
            return;
          }
      
          const producto = new Inmueble(itemInput,nombreInput,marcaInput, stockInput, precioInput, lugarInput,observacionInput); //si esta ok, creo un producto nuevo
      
          //busco si hay un elemento existente que se llame igual al que cree
          if (inventario.some((elemento) => elemento.nombre === producto.nombre)) {
            alert('El producto ya existe en la lista.');
            return;
          }
      
          inventario.push(producto); //si no esta en la lista, lo pusheo
      
          //aca agrego el producto creado en el storage
          localStorage.setItem("Inmueble", JSON.stringify(inventario));
                
          alert(`Se ha agregado el producto "${producto.nombre}" a la lista.`);
      
          console.table(inventario); //lo muestro por consola
      
          //cuando creo y pusheo el producto nuevo, lo muestro en la pantalla creando una card nueva
          
          
          const resultadoTable = document.getElementById('resultado');
          resultadoTable.innerHTML = ''; // Elimina contenido previo de la tabla
          const newRow = resultadoTable.insertRow();
        // Inserta celdas en la fila
        for (let x in list) {
          const celda = newRow.insertCell();
          celda.textContent = list[x];
        }
            inventario.forEach((producto) => {
            const row = resultadoTable.insertRow();
            const itemCell = row.insertCell(0);
            const nombreCell = row.insertCell(1);
            const marcaCell = row.insertCell(2);
            const stockCell = row.insertCell(3);
            const precioCell = row.insertCell(4);
            const lugarCell = row.insertCell(5);
            const observacionCell = row.insertCell(6);
            
            itemCell.textContent = producto.item;
            nombreCell.textContent = producto.nombre;
            marcaCell.textContent = producto.marca;
            stockCell.textContent = producto.stock;
            precioCell.textContent = producto.precio;
            lugarCell.textContent = producto.lugar;
            observacionCell.textContent = producto.observacion;       
          });

          form.reset();
          form.remove();
        
      });
             
        }
    
 
       /*function localstorage(){
          const resultadoTable = document.getElementById('resultado');
          resultadoTable.innerHTML = ''; // Elimina contenido previo de la tabla
          const newRow = resultadoTable.insertRow();
        // Inserta celdas en la fila
        for (let x in list) {
          const celda = newRow.insertCell();
          celda.textContent = list[x];
        }
            datosAnalizados.forEach((producto) => {
            const row = resultadoTable.insertRow();
            const itemCell = row.insertCell(0);
            const nombreCell = row.insertCell(1);
            const marcaCell = row.insertCell(2);
            const stockCell = row.insertCell(3);
            const precioCell = row.insertCell(4);
            const lugarCell = row.insertCell(5);
            const observacionCell = row.insertCell(6);
            
            itemCell.textContent = producto.item;
            nombreCell.textContent = producto.nombre;
            marcaCell.textContent = producto.marca;
            stockCell.textContent = producto.stock;
            precioCell.textContent = producto.precio;
            lugarCell.textContent = producto.lugar;
            observacionCell.textContent = producto.observacion;       
          });
                
        }
          
        localstorage()*/




















/*
let palabraClave = prompt("ingresa el inmueble que deseas buscar").trim().toUpperCase()
let resultado = inventario.filter((producto)=> producto.nombre.toUpperCase().includes(palabraClave))

if(resultado.length > 0){
    let mensaje = "Resultados de la búsqueda:\n"
    for (let i = 0; i < resultado.length; i++) {
      mensaje += ` Item: ${resultado[i].item}\n Nombre: ${resultado[i].nombre}\n Marca: ${resultado[i].marca}\n Stock: ${resultado[i].stock}\n Precio: ${resultado[i].precio}\n Lugar: ${resultado[i].lugar}\n Observacion: ${resultado[i].observacion}\n`;
       alert(mensaje);
    }
console.table(resultado)}
else{
alert("no se encontro ninguna coincidencia con "+ palabraClave)}

menu()
}

function agregarProducto(){//funcion para agregar nuevo producto

let ultimoItem = inventario[inventario.length - 1].item
let item = ultimoItem +1 //aumenta al siguiente item creado
let nombre = prompt ("ingresa nombre del inmueble").trim()
let marca = prompt ("ingresa la marca del inmueble").trim()
let stock = parseInt(prompt("ingresa cantidad"))
let precio = parseInt(prompt("ingresa precio del inmueble"))
let lugar = prompt ("ingresa en que lugar se encuentra").trim()
let observacion = prompt ("ingresa observacion").trim()

if(isNaN(precio)|| isNaN(stock)|| isNaN(item) || nombre ==="" || marca ===""|| lugar ===""|| observacion ===""){
alert("porfavor ingresa valores validos")
menu()
}
let producto = new Inmueble(item,nombre,marca,stock,precio,lugar,observacion);
inventario.push(producto)

let nprod = "Nuevo item creado: \n";
    nprod += ` Item: ${inventario[item].item}\n Nombre: ${inventario[item].nombre}\n Marca: ${inventario[item].marca}\n Stock: ${inventario[item].stock}\n Precio: ${inventario[item].precio}\n Lugar: ${inventario[item].lugar}\n Observacion: ${inventario[item].observacion}\n`;
     alert(nprod);
     console.table(inventario)
     menu()
}


function nuevoStock(){//funcion para agregar nuevo stock
    console.log("Inventario Actual")
    console.table(inventario)
    for (let i = 0; i < inventario.length; i++) {
        let obj = inventario[i];
        let mesj =
          "Item: " + obj.item + "\n" +
          "Nombre: " + obj.nombre + "\n" +
          "Marca: " + obj.marca + "\n" +
          "Stock: " + obj.stock + "\n" +
          "Precio: " + obj.precio + "\n" +
          "Lugar: " + obj.lugar + "\n" +
          "Observación: " + obj.observacion;
      
        alert("Información del objeto " + i + ":\n" + mesj);}
    let valor1 = parseInt(prompt("ingresa item "))
    let valor2 = parseInt(prompt("ingresa cantidad "))
    if(isNaN(valor1)|| isNaN(valor2)|| valor1 <= 0 ){
        alert("porfavor ingresa valores validos")
        menu()
        }
    
    let stock2 = inventario[valor1].stock
    let suma = stock2 + valor2
    if(suma > 0 ){        
        inventario[valor1].stock = suma
        console.log(suma)
        console.log("Nuevo Stock")
        let nprod = "Nuevo Stock: \n";
    nprod += ` Item: ${inventario[valor1].item}\n Nombre: ${inventario[valor1].nombre}\n Marca: ${inventario[valor1].marca}\n Stock: ${inventario[valor1].stock}\n Precio: ${inventario[valor1].precio}\n Lugar: ${inventario[valor1].lugar}\n Observacion: ${inventario[valor1].observacion}\n`;
     alert(nprod);
        console.table(inventario)}
     else{
            alert("No queda stock")
        }
    
        menu()
}

function nuevoPrecio(){//funcion para agregar nuevo precio a item anterior
    console.log("Inventario Actual")
    console.table(inventario)
    for (let i = 0; i < inventario.length; i++) {
        let obj = inventario[i];
        let mesj =
          "Item: " + obj.item + "\n" +
          "Nombre: " + obj.nombre + "\n" +
          "Marca: " + obj.marca + "\n" +
          "Stock: " + obj.stock + "\n" +
          "Precio: " + obj.precio + "\n" +
          "Lugar: " + obj.lugar + "\n" +
          "Observación: " + obj.observacion;
      
        alert("Información del objeto " + i + ":\n" + mesj);}
    let valor1 = parseInt(prompt("ingresa item "))
    let valor2 = parseInt(prompt("ingresa cantidad "))
    if(isNaN(valor1)|| isNaN(valor2)|| valor1 <= 0 || valor2 < 0){
        alert("porfavor ingresa valores validos")
        menu()
        }

    inventario[valor1].precio = valor2
    console.log(valor2)
    console.log("Nuevo precio")
    let nprod = "Nuevo precio: \n";
    nprod += ` Item: ${inventario[valor1].item}\n Nombre: ${inventario[valor1].nombre}\n Marca: ${inventario[valor1].marca}\n Stock: ${inventario[valor1].stock}\n Precio: ${inventario[valor1].precio}\n Lugar: ${inventario[valor1].lugar}\n Observacion: ${inventario[valor1].observacion}\n`;
     alert(nprod);
    console.table(inventario)
    menu()
}

function nuevaObservacion(){//funcion para agregar nueva informacion
    console.log("Inventario Actual")
    console.table(inventario)
    for (let i = 0; i < inventario.length; i++) {
        let obj = inventario[i];
        let mesj =
          "Item: " + obj.item + "\n" +
          "Nombre: " + obj.nombre + "\n" +
          "Marca: " + obj.marca + "\n" +
          "Stock: " + obj.stock + "\n" +
          "Precio: " + obj.precio + "\n" +
          "Lugar: " + obj.lugar + "\n" +
          "Observación: " + obj.observacion;
      
        alert("Información del objeto " + i + ":\n" + mesj);}
    let valor1 = parseInt(prompt("ingresa item "))
    let valor2 = prompt("ingresa nueva Observacion ")
    if(valor2 ==="" ){
        alert("porfavor ingresa datos validos")
        menu()
        }
 
    inventario[valor1].observacion = valor2
    console.log(valor2)
    console.log("Nueva Observacion")
    let nprod = "Nueva Observacion: \n";
    nprod += ` Item: ${inventario[valor1].item}\n Nombre: ${inventario[valor1].nombre}\n Marca: ${inventario[valor1].marca}\n Stock: ${inventario[valor1].stock}\n Precio: ${inventario[valor1].precio}\n Lugar: ${inventario[valor1].lugar}\n Observacion: ${inventario[valor1].observacion}\n`;
     alert(nprod);
    console.table(inventario)
    menu()
}
menu()*/