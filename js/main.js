
var particulas = [];
var prefijos = {};
var indexParticulaActual = -1;
var precisionFuerza = 2;

var operaciones = ['coulomb','campoElectrico','potencialElectrico','energiaPotencial'];
var estadoOperacion = 0;

// var particulasPrueba =[ new Particle(3,25,62,20),new Particle(52,100,20,5),new Particle(10,30,50,2)];

// var particulasPrueba =[ new Particle(0,0,0,0.0000025),new Particle(0,0.2,0,0.000002),
//     new Particle(0.3,0.2,0,0.0000075),new Particle(0.3,0,0,-0.0000015)];

// var particulasPrueba =[ new Particle(0,0,0,0.000003),new Particle(0,0.6,0,0.000005),
//     new Particle(0.8,0.6,0,0.000007),new Particle(0.8,0,0,-0.000004)];

var particulasPrueba = [new Particle(0,0,0,0.000003),new Particle(0,0.06,0,0.000002),
       new Particle(0.08,0.06,0,-0.000007),new Particle(0.08,0,0,0.000005)];

prefijos['tera'] = 1e12;
prefijos['giga'] = 1e9;
prefijos['mega'] = 1e6;
prefijos['kilo'] = 1e3;
prefijos['hecto'] = 1e2;
prefijos['deca'] = 1e1;
prefijos['none'] = 1;
prefijos['deci'] = 1e-1;
prefijos['centi'] = 1e-2;
prefijos['mili'] = 1e-3;
prefijos['micro'] = 1e-6;
prefijos['nano'] = 1e-9;
prefijos['pico'] = 1e-12;

var TextChanged = function (e)
{
    let input = this;
    
    if (input.value !== '' && !isNaN(input.value))
    {
        input.classList.remove("is-invalid"); 
        
    }

}

// Declare input and output DOM Elements

var headingParticulaActual = document.getElementById("particula-actual");

var headingResultado = document.getElementById("heading-vector-neto");

var headingMagnitud = document.getElementById("heading-magnitud");

var headingContenedorResultado = document.getElementById("titulo-operacion");

var selectPrefijo = document.getElementById("select-prefijo");

var tablaParticulas = document.getElementById("tabla-particulas");

var tbody = tablaParticulas.getElementsByTagName("tbody")[0];

var inputPrecision = document.getElementById("precision");

inputPrecision.addEventListener("input",function(){
   precisionFuerza = this.value;
});

var inputCarga = document.getElementById("carga");
    inputCarga.addEventListener("input",TextChanged);

var inputPosicionX = document.getElementById("posicion-x");
    inputPosicionX.addEventListener("input",TextChanged);

var inputPosicionY = document.getElementById("posicion-y");
    inputPosicionY.addEventListener("input",TextChanged);

var inputPosicionZ = document.getElementById("posicion-z");
    inputPosicionZ.addEventListener("input",TextChanged);   

var agregarParticulaInputs = [inputPosicionX,inputPosicionY,inputPosicionZ,inputCarga];

//Input herramientas

var inputOpcionOperacion = document.getElementById("opcion-electric");
    inputOpcionOperacion.addEventListener("change",(e) => cambiarEstado(inputOpcionOperacion.value));

var contenedorPunto = document.getElementById("contenedor-punto");

var inputPuntoX = document.getElementById("punto-x");
    inputPuntoX.addEventListener("input",TextChanged);

var inputPuntoY = document.getElementById("punto-y");
    inputPuntoY.addEventListener("input",TextChanged);

var inputPuntoZ = document.getElementById("punto-z");
    inputPuntoZ.addEventListener("input",TextChanged);

var puntoInputs = [inputPuntoX,inputPuntoY,inputPuntoZ];

function fuerzaCoulomb()
{
    if(indexParticulaActual<0) return;

    let fuerza = Electric.getCoulomb(indexParticulaActual,particulas);
    
    headingResultado.innerHTML = "<strong>F</strong> = " + fuerza.formatUnitVector(precisionFuerza) + " N";
    headingMagnitud.innerHTML = "|F| = " + fuerza.mag().toFixed(precisionFuerza) + " N" ;
}

function campoElectrico()
{
    
    let pX = Number(inputPuntoX.value);
    let pY = Number(inputPuntoY.value);
    let pZ = Number(inputPuntoZ.value);

    let punto = new Vector(pX,pY,pZ);

    

    let campoElectrico = Electric.getElectricFfield(punto,particulas);
    headingResultado.innerHTML = "<strong>E</strong>= " +campoElectrico.formatUnitVector(precisionFuerza) + " N/C";
    headingMagnitud.innerHTML = "|E|= "+campoElectrico.mag().toString()+ " N/C";
}

function energiaPotencial()
{
    let energiaPotencial = Electric.PotentialEnergy(particulas);
    headingResultado.innerHTML = "Energia Potencial";
    headingMagnitud.innerHTML = "U = " + energiaPotencial.toString() + " J";
}

function potencialElectrico()
{   
    if (!ParametrosValidos(puntoInputs))
    {
        headingsResultadoPorDefecto();
        return;
    }

    let pX = Number(inputPuntoX.value);
    let pY = Number(inputPuntoY.value);
    let pZ = Number(inputPuntoZ.value);

    let punto = new Vector(pX,pY,pZ);

    let potencial = Electric.ElectricPotential(punto,particulas);
    headingResultado.innerHTML = "Potencial Eléctrico";
    headingMagnitud.innerHTML = "V = " + potencial.toString() + " V";
}

function ejecutarOperacion()
{
    switch(operaciones[estadoOperacion]) {
        case 'coulomb':
          fuerzaCoulomb();
          break;
        case 'campoElectrico':
          campoElectrico();
          break;
        case 'energiaPotencial':
          energiaPotencial()
          break;
        case 'potencialElectrico':
          potencialElectrico()
          break;
        default:
          
      }
}

$("#tabla-particulas").on('click','.clickable-row',
function(event){
    // indexParticulaActual = Number(this.firstChild.textContent) - 1;
    indexParticulaActual = Array.prototype.indexOf.call(tbody.children, this);
    
    let particula = particulas[indexParticulaActual];

    headingParticulaActual.innerHTML = "P" + String(indexParticulaActual+1) +
    "&nbsp;&nbsp;Posición:  " + `(${particula.position.x},${particula.position.y},${particula.position.z}) m` + 
    "&nbsp;&nbsp;Carga: " + particula.charge + " C" ;
    
    $(this).addClass('active').siblings().removeClass('active');

    
    if(operaciones[estadoOperacion] === 'coulomb')
    {
        fuerzaCoulomb();
    }
  
});

var btnEliminarParticula = document.getElementById("eliminar-particula-btn");
btnEliminarParticula.addEventListener("click",function()
{
    EliminarParticula(indexParticulaActual);
});

var btnCalcular = document.getElementById("calcular-btn");
btnCalcular.addEventListener("click",function()
{
    ejecutarOperacion();
});



for (let i = 0; i < particulasPrueba.length; i++) {
    const element = particulasPrueba[i];
    AgregarParticula(element);
}

//Returns true if there is a particle in particulas with the same position of particula
function mismaPosicion(particula) 
{

    for (let i = 0; i < particulas.length; i++) {
        const p = particulas[i];
        if (p.position.x === particula.position.x  && p.position.y === particula.position.y && p.position.z === particula.position.z )
        {
            return true;
        }
    }

    return false;
}

function getParticulaFromInput()
{
    if (!ParametrosValidos(agregarParticulaInputs))
    {
        return null;
    }


    let pX = Number(inputPosicionX.value);
    let pY = Number(inputPosicionY.value);
    let pZ = Number(inputPosicionZ.value);

    let prefijo = selectPrefijo.options[selectPrefijo.selectedIndex].value;
    let prefijoVal = prefijos[prefijo];

    let carga = Number(inputCarga.value) * prefijoVal;


    return new Particle(pX,pY,pZ,carga);

}

function ParametrosValidos(inputArray)
{
    let ParametrosValidos = true;

    for (let i = 0; i < inputArray.length; i++) 
    {
        
        const element = inputArray[i];
        
        if(element.value === '' || isNaN(element.value))
        {
            element.classList.add("is-invalid");
            element.value ="";
            ParametrosValidos = false;
        }
        
        
    }
  
    return ParametrosValidos;
}

function LimpiarCampos()
{
    inputCarga.value = "";
    inputPosicionX.value = "";
    inputPosicionY.value = "";
    inputPosicionZ.value = "";
}

function AgregarParticula(particula)
{
    if(particula == null)
    {        
        return;
    }

    if (mismaPosicion(particula))
    {
        alert("Dos partículas no pueden poseer la misma posición.");
        LimpiarCampos();
        return;   
    }

    particulas.push(particula);


    let row = document.createElement("tr");
    

    let tdNumero = document.createElement("td");
    tdNumero.textContent= particulas.length;

    let tdCarga = document.createElement("td");
    tdCarga.textContent = String(particula.charge) + " C";

    let tdPosicion = document.createElement("td");
    tdPosicion.textContent = `(${particula.position.x},${particula.position.y},${particula.position.z}) m`;


    row.appendChild(tdNumero);
    row.appendChild(tdCarga);
    row.appendChild(tdPosicion);

    row.classList.add('clickable-row');

    tbody.appendChild(row);

    LimpiarCampos();
}

function EliminarParticula(indiceParticula)
{
    
    if (tbody.children.length === 0 || indiceParticula < 0 || indiceParticula >= particulas.length) 
    return;

    particulas.splice(indiceParticula, 1);
    tbody.children[indiceParticula].remove();

    indexParticulaActual = -1;

    headingsResultadoPorDefecto();

    ActualizarNumeracionParticulas(indiceParticula);
}

function headingsResultadoPorDefecto()
{
    headingParticulaActual.textContent = "Seleccione una partícula";
    headingResultado.textContent = "Resultado";
    headingMagnitud.textContent = "Magnitud";
}

function EliminarListaParticulas()
{

    if ( particulas.length == 0 || !confirm('¿Desea eliminar lista de particulas?')) {
        
        return;
    } 
    
    particulas = [];
    
    while (tbody.lastChild) {
        
        tbody.removeChild(tbody.lastChild);
      }

    headingsResultadoPorDefecto();
    indexParticulaActual = -1;

    
}

function ActualizarNumeracionParticulas(indiceInicio)
{
    for (let i = indiceInicio; i < tbody.children.length; i++) {
        const row = tbody.children[i];
        row.children[0].textContent = i + 1;
    }
}

function cambiarEstado(estado)
{
    let estadoIndice = operaciones.indexOf(estado);
    
  
    if (estadoIndice === estadoOperacion)
    {
         return;
    }
    
    headingParticulaActual.setAttribute("hidden","hidden");
    estadoOperacion = estadoIndice;
    
    headingsResultadoPorDefecto();
    deseleccionarParticula();
   


    if(estado === operaciones[1] || estado === operaciones[2])
    {
        camposPuntoVisible(true);

        if (estado === operaciones[1])
        {
            headingContenedorResultado.innerHTML = "Campo Eléctrico";
        }

        else
        {
            headingContenedorResultado.innerHTML = "Potencial Eléctrico";
        }
    }

    else
    {
        camposPuntoVisible(false);

        if (estado === operaciones[0])
        {
            headingContenedorResultado.innerHTML = "Fuerza de Coulomb";
            headingParticulaActual.removeAttribute("hidden");
            
        }

        else
        {
            headingContenedorResultado.innerHTML = "Energia Potencial";
        }
    }
}

function camposPuntoVisible(esVisible)
{
    if(esVisible)
    {
        contenedorPunto.removeAttribute("hidden");
    }

    else
    {
        contenedorPunto.setAttribute("hidden","hidden");
    }
}

function deseleccionarParticula()
{
    if(indexParticulaActual<0) return;

    // for (let i = 0; i < tbody.children.length; i++) {
    //     const tr = tbody.children[i];
       
    //     if(tr.classList.contains("active"))
    //     {   
    //         tr.classList.remove("active");
    //         break;
    //     }
    // }
    
    
    tbody.children[indexParticulaActual].classList.remove("active");
    indexParticulaActual = -1;
}

function redondearSalidas()
{
    //Codigo a implementar
}

