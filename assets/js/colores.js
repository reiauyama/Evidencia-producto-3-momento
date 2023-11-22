import {  sumaValores,tope,topeMaximo } from "../../controller/controllerGastos.js"

let btnCrear = document.getElementById('btnCrear')
btnCrear.addEventListener("click",()=>{
    const porcentajeGastos = (sumaValores / parseFloat(tope.value)) * 100
   if (porcentajeGastos >= 75) {
        topeMaximo.style.color = 'red';
    } else if (porcentajeGastos >= 50) {
        topeMaximo.style.color = 'yellow';
    } else if (porcentajeGastos >= 25) {
        topeMaximo.style.color = 'green';
    }else {
        topeMaximo.style.color = 'white';
    }
})
  

