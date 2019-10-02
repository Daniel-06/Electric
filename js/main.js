
var particulas = [];
var prefijos = {};
var indexParticulaActual = -1;
var precisionFuerza = 2;

// var particulasPrueba =[ new Particle(3,25,62,20),new Particle(52,100,20,5),new Particle(10,30,50,2)];

var particulasPrueba =[ new Particle(0,0,0,0.0000025),new Particle(0,0.2,0,0.000002),
    new Particle(0.3,0.2,0,0.0000075),new Particle(0.3,0,0,-0.0000015)];

// var particulasPrueba =[ new Particle(0,0,0,0.000003),new Particle(0,0.6,0,0.000005),
//     new Particle(0.8,0.6,0,0.000007),new Particle(0.8,0,0,-0.000004)];

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

// Declare input and outpu DOM Elements

var headingParticulaActual = document.getElementById("particula-actual");

var headingResultado = document.getElementById("heading-fuerza-neta");

var headingMagnitudFuerza = document.getElementById("magnitud-coulomb");

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



$("#tabla-particulas").on('click','.clickable-row',
function(event){
    // indexParticulaActual = Number(this.firstChild.textContent) - 1;
    indexParticulaActual = Array.prototype.indexOf.call(tbody.children, this);
    let particula = particulas[indexParticulaActual];
    let fuerza = Electric.getCoulomb(indexParticulaActual,particulas);
    

    headingParticulaActual.innerHTML = "P" + String(indexParticulaActual+1) +
    "&nbsp;&nbsp;Posición:  " + `(${particula.position.x},${particula.position.y},${particula.position.z})` + 
    "&nbsp;&nbsp;Carga: " + particula.charge + " C" ;

    headingResultado.innerHTML = "Fuerza neta = " + fuerza.formatUnitVector(precisionFuerza) + " N";
    headingMagnitudFuerza.innerHTML = "F = " + fuerza.mag().toFixed(precisionFuerza) + " N" ;

    $(this).addClass('active').siblings().removeClass('active');
});

var btnEliminarParticula = document.getElementById("eliminar-particula-btn");
btnEliminarParticula.addEventListener("click",function()
{
    EliminarParticula(indexParticulaActual);
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
    if (!ParametrosValidos())
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

function ParametrosValidos()
{
    let ParametrosValidos = true;

    for (let i = 0; i < agregarParticulaInputs.length; i++) 
    {
        
        const element = agregarParticulaInputs[i];
        
        if(element.value === '' || isNaN(element.value))
        {
            element.classList.add("is-invalid");
            element.value ="";
            ParametrosValidos = false;
        }
        
        
    }
  
    return ParametrosValidos;
}

function LimparCampos()
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
        LimparCampos();
        return;   
    }

    particulas.push(particula);


    let row = document.createElement("tr");
    

    let tdNumero = document.createElement("td");
    tdNumero.textContent= particulas.length;

    let tdCarga = document.createElement("td");
    tdCarga.textContent = String(particula.charge) + " C";

    let tdPosicion = document.createElement("td");
    tdPosicion.textContent = `(${particula.position.x},${particula.position.y},${particula.position.z})`;


    row.appendChild(tdNumero);
    row.appendChild(tdCarga);
    row.appendChild(tdPosicion);

    row.classList.add('clickable-row');

    tbody.appendChild(row);

    LimparCampos();
}

function EliminarParticula(indiceParticula)
{
    
    if (tbody.children.length === 0 || indiceParticula < 0) return;
    particulas.splice(indiceParticula, 1);
    tbody.children[indiceParticula].remove();

    headingParticulaActual.textContent = "Seleccione una partícula";
    headingResultado.textContent = "Resultado"
    headingMagnitudFuerza.textContent = "Magnitud";
    indexParticulaActual = -1;

    ActualizarNumeracionParticulas(indiceParticula);
}

function EliminarListaParticulas()
{
    
    particulas = [];
    
    while (tbody.lastChild) {
        
        tbody.removeChild(tbody.lastChild);
      }

    headingParticulaActual.textContent = "Seleccione una partícula";
    headingResultado.textContent = "Resultado"
    headingMagnitudFuerza.textContent = "Magnitud";
    indexParticulaActual = -1;

    
}

function ActualizarNumeracionParticulas(indiceInicio)
{
    for (let i = indiceInicio; i < tbody.children.length; i++) {
        const row = tbody.children[i];
        row.children[0].textContent = i + 1;
    }
}

function redondearSalidas()
{

}
// function CalcularFuerza()
// {
    
//     let q1 = Number(document.getElementById("carga1").value);
//     let q2 = Number(document.getElementById("carga2").value);
//     let distancia = Number(document.getElementById("distancia").value);
    
//     txtResultado.value = Electric.CoulombForce(q1,q2,distancia).toFixed(2) + "N";
 
// }