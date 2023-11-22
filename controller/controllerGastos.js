export {
  sumaValores,tope,topeMaximo,aviso1
}
import { gastos } from "../model/modelGastos.js";
// INICIO DE SESION
const fechaActual = new Date();
const opcionesDeFormato = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesDeFormato);
let usuarioActual = "";
let usuariosRegistrados = [];
let usuarioInput;
let contrasenaInput;
let retorno;
let btnRegistrar = document.getElementById("btnRegistrar");
let sumaValores = 0;
btnRegistrar.addEventListener("click", registrar);
function registrar() {
  usuarioInput = document.getElementById("usuario");
  contrasenaInput = document.getElementById("contrasena");
  retorno = document.getElementById("retorno");

  let usuario = usuarioInput.value;
  let contrasena = contrasenaInput.value;

  let usuarioExistente = usuariosRegistrados.find((i) => i.usuario === usuario);
  if (usuario === "" || contrasena === "") {
    document.getElementById("retorno").innerText = "Por favor, completa todos los campos.";
    return;
  }
  if (!usuarioExistente) {
    usuariosRegistrados.push({ usuario, contrasena });
    retorno.innerText = "Registro Exitoso";
    console.log(usuariosRegistrados);
  } else {
    retorno.innerText = "Usuario ya existente";
  }
  usuarioInput.value = "";
  contrasenaInput.value = "";
}
let btnIniciar = document.getElementById("btnIniciar");
btnIniciar.addEventListener("click", iniciarSesion);
function iniciarSesion() {
  let usuario = usuarioInput.value;
  let contrasena = contrasenaInput.value;

  let usuarioRegistrado = usuariosRegistrados.find(
    (i) => i.usuario === usuario
  );

  if (usuarioRegistrado && usuarioRegistrado.contrasena === contrasena) {
    retorno.innerText = "Inicio Exitoso";


    usuarioActual = usuario;

    setTimeout(function () {
      document.getElementById("inicio").style.display = "none";
      document.getElementById("panel").style.display = "block";
    }, 1500);
  } else {
    retorno.innerText = "Acceso Incorrecto";
  }

  usuarioInput.value = "";
  contrasenaInput.value = "";
}

/// LISTAR
const listar = document.getElementById("listar");
listar.addEventListener("click", () => {

  document.getElementById("sectionBuscar").style.display = "block";
  document.querySelector(".barra").style.display = "flex"
  document.getElementById("sectionListar").style.display = "none";
  document.getElementById("sectionCrear").style.zIndex = "2";
});

document.getElementById("sectionListar").style.display = "none";
listar.addEventListener("click", () => {
  document.getElementById("sectionBuscar").style.zIndex = "3";
  document.getElementById("sectionListar").style.zIndex = "2";
  document.getElementById("sectionCrear").style.zIndex = "2";
  const listarNegocios = document.getElementById("negocios");
  const listarDiversión = document.getElementById("diversion");
  const listarTransporte = document.getElementById("transporte");
  const listarComida = document.getElementById("comida");
  const listarTodos = document.getElementById("todos");

  listarNegocios.addEventListener("click", () => {
    mostrarGastosPorCategoria("negocios");
  });

  listarDiversión.addEventListener("click", () => {
    mostrarGastosPorCategoria("diversion");
  });

  listarTransporte.addEventListener("click", () => {
    mostrarGastosPorCategoria("transporte");
  });

  listarComida.addEventListener("click", () => {
    mostrarGastosPorCategoria("comida");
  });

  listarTodos.addEventListener("click", () => {
    mostrarTodosLosGastos();
    
  });
});

function mostrarGastosPorCategoria(categoria) {
  const gastosFiltrados = gastos.filter((gasto) => gasto.categoria === categoria);
  mostrarGastos(gastosFiltrados);
}

function mostrarTodosLosGastos() {
  mostrarGastos(gastos);
  
}

function mostrarGastos(gastosMostrados) {
  const divCards = document.querySelector(".divCards");
  divCards.innerHTML = "";

  if (gastosMostrados.length === 0) {
    divCards.innerHTML = "<p>No hay gastos para mostrar.</p>";
  } else {
    gastosMostrados.forEach((gasto) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<p>Valor: ${gasto.valor}</p>
                        <p>Categoría: ${gasto.categoria}</p>
                        <p>Descripción: ${gasto.descripcion}</p>
                        <p>Usuario: ${gasto.usuario}</p>
                        <p>Fecha creacion: ${gasto.fechaFormateada}</p>`;
      divCards.appendChild(card);
    });
  }
}



const listarTodos = document.getElementById("todos");
listarTodos.addEventListener("click", () => {
  mostrarTodosLosGastos();
  console.log("todos");
});


/// CREAR GASTOS
const Crear = document.getElementById("crear");
document.getElementById("crear").addEventListener("click", () => {
  document.getElementById("sectionBuscar").style.display = "none";
  document.querySelector(".barra").style.display = "none"
  document.getElementById("sectionCrear").style.zIndex = "3";
});

let valor;
let categoriaSeleccionada;
let descripcion;
let aviso1 = document.getElementById('aviso1')


function mostrarVentana() {
  
  console.log("aña")
  aviso1.innerText = "90% de los gastos alcanzados"
  console.log("aña")
  aviso1.style.fontSize = "55px"


  setTimeout(function () {
   
  }, 1500);
}

btnCrear.addEventListener("click", () => {
  if (!tope.value || parseFloat(tope.value) < 1000) {
      aviso1.innerText = "El tope mínimo debe ser de 1000";
      return;
  }
  if (isNaN(parseFloat(valorInput.value.trim())) || parseFloat(valorInput.value.trim()) < 1000) {
    aviso1.innerText = "El valor mínimo debe ser de 1000";
    return;
  }
  
 
  if (parseFloat(valorInput.value) < 1000) {
      aviso1.innerText = "El valor mínimo debe ser de 1000";
      return;
  }
  if (!categoriaSeleccionada) {
    aviso1.innerText = "selecciona una categoría";
    return;
  }

  gastos.push({ valor: parseFloat(valorInput.value), categoria: categoriaSeleccionada, descripcion, usuario: usuarioActual,fechaFormateada });
  console.log(gastos);

  sumaValores = gastos.reduce((total, gasto) => total + parseFloat(gasto.valor), 0);
  let nuevoTopeMaximo = parseFloat(tope.value) - sumaValores;
  nuevoTopeMaximo = nuevoTopeMaximo < 0 ? 0 : nuevoTopeMaximo;
   topeMaximo.innerText = nuevoTopeMaximo.toFixed(2);
   const porcentajeGastos = (sumaValores / parseFloat(tope.value)) * 100;

   if (porcentajeGastos >= 90) {
     mostrarVentana(); 
   }
 
  valorInput.value = "";
  categoria.value = "";
  descripcionInput.value = "";
});

  const crear = document.getElementById("crear");
  crear.addEventListener("click", () => {
    document.getElementById("sectionBuscar").style.zIndex = "2";
    document.getElementById("sectionListar").style.zIndex = "2";
    document.getElementById("sectionCrear").style.zIndex = "3";
    document.getElementById('barra').style.display = 'none'

    document.getElementById('creacion').style.backgroundColor = 'rgba(15,17,48,255);'
   
  
  });
  let tope = document.getElementById('tope')
  let topeMaximo = document.getElementById('topeMaximo')
  tope.addEventListener("input", function(){
    console.log(tope.value)
    topeMaximo.innerText = tope.value
  
  })

  
  const valorInput = document.getElementById("valor");
  const categoria = document.getElementById("categoria");
  const descripcionInput = document.getElementById("descripcion");

  categoria.addEventListener("change", function () {
    categoriaSeleccionada = categoria.value;
    
  });

  valorInput.addEventListener("input", function () {
    valor = valorInput.value;
  });

  descripcionInput.addEventListener("input", function () {
    descripcion = descripcionInput.value;
  });

  const btnCerrarSesion = document.getElementById("cerrar");
btnCerrarSesion.addEventListener("click", cerrarSesion);

function cerrarSesion() {
    
    document.getElementById("inicio").style.display = "block";
    document.getElementById("panel").style.display = "none";

    
    usuarioInput.value = "";
    contrasenaInput.value = "";
    retorno.innerText = ""
}