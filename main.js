
//creo objetos
const Inmueble = function(item,nombre,marca,stock,precio,lugar,observacion){
this.item=item
this.nombre=nombre
this.marca=marca
this.stock=stock
this.precio=precio
this.lugar=lugar
this.observacion=observacion

}

const formModal = document.getElementById('modal-container');        
const closeFormButton = document.getElementById('cerrar-modal');
//Inventario inicial
let list = new Inmueble ("ID","Nombre","Marca","Stock","Precio","Lugar","Observación")
let bien1 = new Inmueble (0,"","","","","","")//item 0
let inventario = []
inventario.push(bien1)


if (inventario.length > 0) {
  // Intenta cargar datos desde el almacenamiento local
  const datos = localStorage.getItem("Inmueble");

  if (datos !== null && datos !== undefined) {
    // Si hay datos en localStorage, actualiza el inventario
    const bienesEnLocalStorage = JSON.parse(datos);
    inventario = bienesEnLocalStorage;
  }
}

//botones globales
const filtrarBtn = document.getElementById("filtrar");
filtrarBtn.addEventListener("click", () => {filtrarInventario();});

const agregarBtn = document.getElementById("agregar");
agregarBtn.addEventListener("click", () => {
  formModal.style.display = 'block';
  agregarProducto();
  
  });


const mostrarInventario = document.getElementById("mostrarinv");
mostrarInventario.addEventListener("click", () => {mostrarInv();});
/////////////////////////////////////////////////////////////////////////////////
function mostrarInv(){
//muestro el inventario en la tabla resultado
  const resultadoTable = document.getElementById('resultado');
  resultadoTable.innerHTML = '';
  const newRow = resultadoTable.insertRow();
  if(inventario.length === 1){// si no hay items solo estara el default
    alert('Ingrese nuevo producto');
    }  
 
 if(inventario.length > 0){
  for (let x in list) {
    const celda = newRow.insertCell();
    celda.textContent = list[x];
    
  }
      inventario.forEach((producto,index) => {
              
        if(producto.item > 0){//evito que se cree el item 0
      
      const row = resultadoTable.insertRow();
      const itemCell = row.insertCell(0);
      const nombreCell = row.insertCell(1);
      const marcaCell = row.insertCell(2);
      const stockCell = row.insertCell(3);
      const precioCell = row.insertCell(4);
      const lugarCell = row.insertCell(5);
      const observacionCell = row.insertCell(6);
      const eliminarCell = row.insertCell(7); 

      itemCell.textContent = producto.item;
      nombreCell.textContent = producto.nombre;
      marcaCell.textContent = producto.marca;
      stockCell.textContent = producto.stock;
      precioCell.textContent = producto.precio;
      lugarCell.textContent = producto.lugar;
      observacionCell.textContent = producto.observacion;
      
      const eliminarButton = document.createElement("button");
       eliminarButton.classList.add("elimBtn");
      const modificarButton = document.createElement("button");
      modificarButton.classList.add("modBtn");
      eliminarButton.textContent = "Eliminar";
      modificarButton.textContent = "Modificar";
      eliminarButton.addEventListener("click", () => {
           
          
      resultadoTable.deleteRow(row.rowIndex);            
      inventario.splice(index, 1);            
      localStorage.setItem("Inmueble", JSON.stringify(inventario));
      });
       modificarButton.addEventListener("click", () => {
          
      });
        eliminarCell.appendChild(eliminarButton);
        eliminarCell.appendChild(modificarButton);

        }    
    });
  }
}
/////////////////////////////////////////////

function filtrarInventario(){ 
  //filtro inventario po nombre
  
  const input = document.getElementById('filtrarP').value;
  const palabraClave = input.trim().toUpperCase();
  const resultado = inventario.filter((producto) => producto.nombre.toUpperCase().includes(palabraClave));
console.log(resultado)

    const resultadoTable = document.getElementById('resultado');
    resultadoTable.innerHTML = ''; 
    const newRow = resultadoTable.insertRow();

    if (inventario.length > 0 ) {        
          if(input === ""){
          alert('Ingrese valor de busqueda');
          return
  }        
          for (let x in list) {
              const celda = newRow.insertCell();
              celda.textContent = list[x];
            }
              resultado.forEach((producto) => {
               
               if(producto.item > 0){
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
                }
              });
          } else {
            alert('No se encontraron coincidencias');
          }
      }

/////////////////////////////////////////////////////////////////////////

    function agregarProducto() {       
      
      
      let ultimoItem = inventario[inventario.length - 1].item 
      let itemInput = ultimoItem +1 

    closeFormButton.addEventListener('click', () => {
        formModal.style.display = 'none';
        form.remove();
    });

const form = document.createElement('form')
    form.innerHTML = 
    `
      <div><label for="nombre-input">Nombre:</label>
      <input id="nombre-input" type="text" required>
     </div> <br>
      <div><label for="marca-input">Marca:</label>
      <input id="marca-input" type="text" required></div>
      <br>
     <div> <label for="stock-input">Stock:</label>
      <input id="stock-input" type="number" step="1" required></div>
      <br>
     <div> <label for="precio-input">Precio:</label>
      <input id="precio-input" type="number" step="1" required></div>
      <br>
     <div> <label for="lugar-input">Lugar:</label>
      <input id="lugar-input" type="text" required></div>
      <br>
     <div>  <label for="observacion-input">Observación:</label>
      <textarea id="observacion-input" rows="2" style="resize: none;" required></textarea></div>
      <br>
     <button type="submit">Agregar</button>
      <button id="cancelar">Cancelar</button>
    `;
const div1 = document.querySelector(".modal-content")
    div1.appendChild(form)


        const cancelarBtn = document.getElementById("cancelar");
        cancelarBtn.addEventListener('click', function(event) {
         event.preventDefault
          //desactivo boton para evitar crear otro formulario
         /* agregarBtn.disabled = false;
          mostrarInventario.disabled=false*/
          formModal.style.display = 'none';
           form.remove();
      });

        form.addEventListener('submit', function (event) {
          event.preventDefault();
          
          const nombreInput = document.getElementById('nombre-input').value.trim();
          const marcaInput = document.getElementById('marca-input').value.trim();
          const precioInput = parseFloat(document.getElementById('precio-input').value);
          const stockInput = parseInt(document.getElementById('stock-input').value);
          const lugarInput = document.getElementById('lugar-input').value.trim();
          const observacionInput = document.getElementById('observacion-input').value.trim();
      
          if (isNaN(precioInput) || isNaN(stockInput) || stockInput <= 0  || precioInput <= 0 || nombreInput === ''|| marcaInput === ''|| lugarInput === ''|| observacionInput === '') { 
            alert('Por favor ingresa valores válidos.');
            return;
          }
      
          const producto = new Inmueble(itemInput,nombreInput,marcaInput, stockInput, precioInput, lugarInput,observacionInput); 
                
          if (inventario.some((elemento) => elemento.nombre === producto.nombre)) {
            alert('El producto ya existe en la lista.');
            return;
          }
      
          inventario.push(producto); 
          //pusheo y guardo en storage 
          localStorage.setItem("Inmueble", JSON.stringify(inventario));                
          alert(`Se ha agregado el producto "${producto.nombre}" a la lista.`)
                
          const resultadoTable = document.getElementById('resultado');
    resultadoTable.innerHTML = ''; 
          const newRow = resultadoTable.insertRow();
          console.table(inventario.length)
          if (inventario.length > 0 ) {        
              
                for (let x in list) {
                    const celda = newRow.insertCell();
                    celda.textContent = list[x];
                  }
                    inventario.forEach((producto) => {

                    
                      if(producto.item > 0){
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
                    
                 }  });
                } else {
                  alert('No se encontraron coincidencias');
                }
                formModal.style.display = 'none';
                form.remove();
        
      });             
        }

   