
var particulas = [];
var prefijos = {};
var indexParticulaActual = -1;

// var particulasPrueba =[ new Particle(3,25,62,20),new Particle(52,100,20,5),new Particle(10,30,50,2)];
var particulasPrueba =[ new Particle(0,0,0,0.0000025),new Particle(0,0.2,0,0.000002),
    new Particle(0.3,0.2,0,0.0000075),new Particle(0.3,0,0,-0.0000015)];

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

var selectPrefijo = document.getElementById("select-prefijo");

var tablaParticulas = document.getElementById("tabla-particulas");

var tbody = tablaParticulas.getElementsByTagName("tbody")[0];

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
    indexParticulaActual = Number(this.firstChild.textContent) - 1;

    let particula = particulas[indexParticulaActual];
    var force = Electric.getCoulomb(indexParticulaActual,particulas);

    headingParticulaActual.innerHTML = "P" + String(indexParticulaActual+1) +
    "&nbsp;&nbsp;Posición:  " + `(${particula.position.x},${particula.position.y},${particula.position.z})` + 
    "&nbsp;&nbsp;Carga: " + particula.charge + " C" ;

    $(this).addClass('active').siblings().removeClass('active');
});



for (let i = 0; i < particulasPrueba.length; i++) {
    const element = particulasPrueba[i];
    AgregarParticula(element);
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


function CalcularFuerza()
{
    
    let q1 = Number(document.getElementById("carga1").value);
    let q2 = Number(document.getElementById("carga2").value);
    let distancia = Number(document.getElementById("distancia").value);
    
    txtResultado.value = Electric.CoulombForce(q1,q2,distancia).toFixed(2) + "N";
 

}