(function() {
  'use strict';

  var regalo = document.getElementById('regalo');

  document.addEventListener('DOMContentLoaded', function() {

    var map = L.map('mapa').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();


    //Campo Pases
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var email = document.getElementById('email');
    
    //Campos pases
    var pase_dia = document.getElementById('pase_dia');
    var pase_dosdias = document.getElementById('pase_dosdias');
    var pase_completo = document.getElementById('pase_completo');
    
    //Botones y divs
    var calcular = document.getElementById('calcular');
    var errorDiv = document.getElementById('error');
    var botonRegistro = document.getElementById('btnRegistro');
    var lista_productos = document.getElementById('lista-productos');
    var suma = document.getElementById('suma-total');

    //Extras
    var etiquetas = document.getElementById('etiquetas');
    var camisas = document.getElementById('camisa_evento');

    calcular.addEventListener('click', calcularMontos);

    pase_dia.addEventListener('blur', mostrarDias);//Recuerda el úlitmo dato
    pase_dosdias.addEventListener('blur', mostrarDias);
    pase_completo.addEventListener('blur', mostrarDias);

    nombre.addEventListener('blur', validarCampos);
    apellido.addEventListener('blur', validarCampos);
    email.addEventListener('blur', validarCampos);
    email.addEventListener('blur', validarMail);

    function validarCampos() {
      if (this.value == '') {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = "*Este campo es obligatorio";
        this.style.border = '1px solid red';
      } else {
        this.style.border = '1px solid #cccccc';
        errorDiv.style.display = 'none';
      }
    }

    function validarMail() {
      if(this.value.indexOf("@") > -1){
        this.style.border = '1px solid #cccccc';
        errorDiv.style.display = 'none';
      } else {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = "*El correo no es válido";
        this.style.border = '1px solid red';
      }
    }

    function calcularMontos(event){
      event.preventDefault();
      if(regalo.value === '') {
        alert("Debes elegir un regalo");
        regalo.focus();
      } else {
        var boletosDia = parseInt(pase_dia.value, 10) || 0,
            boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
            boletoCompleto = parseInt(pase_completo.value, 10) || 0,
            cantCamisas = parseInt(camisas.value, 10) || 0,
            cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

        var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
        
        var listadoProductos = [];


        if (boletosDia >= 1) {
          listadoProductos.push(boletosDia + ' Pases por día');
        }
        if (boletos2Dias >= 1) {
          listadoProductos.push(boletos2Dias + ' Pases por 2 días');
        }
        if (boletoCompleto >= 1) {
          listadoProductos.push(boletoCompleto + ' Pases completo');
        }
        if (cantCamisas >= 1) {
          listadoProductos.push(cantCamisas + ' Camisas');
        }
        if (cantEtiquetas >= 1) {
          listadoProductos.push(cantEtiquetas + ' Etiquetas');
        }

        lista_productos.style.display = "block";
        lista_productos.innerHTML = '';
        for (var i = 0; i < listadoProductos.length; i++) {
          lista_productos.innerHTML += listadoProductos[i] + '</br>';
          
        }
        suma.innerHTML = "$ " + totalPagar.toFixed(2); //Dos centavos
        }
      }
      

      function mostrarDias(){
        var boletosDia = parseInt(pase_dia.value, 10) || 0,
            boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
            boletoCompleto = parseInt(pase_completo.value, 10);

        var diasElegidos = [];

        if (boletosDia > 0) {
          diasElegidos.push('viernes');
        }
        if (boletos2Dias > 0) {
          diasElegidos.push('viernes', 'sabado');
        }
        if (boletoCompleto > 0) {
          diasElegidos.push('viernes', 'sabado', 'domingo');
        }

        for (var i = 0; i < diasElegidos.length; i++) {
          document.getElementById(diasElegidos[i]).style.display = 'block';
          
        }

      }


  });
})();