
var particulas = [];
var prefijos = {};

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
    console.log(!isNaN(input.value));
    
    if (input.value !== '' && !isNaN(input.value))
    {
        input.classList.remove("is-invalid"); 
        
    }

}

// Declare input and outpu DOM Elements

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

function AgregarParticula()
{
    

    let pX = Number(inputPosicionX.value);
    let pY = Number(inputPosicionY.value);
    let pZ = Number(inputPosicionZ.value);

    let prefijo = selectPrefijo.options[selectPrefijo.selectedIndex].value;
    let prefijoVal = prefijos[prefijo];


    
    let carga = inputCarga.value * prefijoVal;
    
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

    if(!ParametrosValidos)
    {
        return;
    }


    let particula = new Particle(pX,pY,pZ,carga);
    
    particulas.push(particula);


    let row = document.createElement("tr");
    

    let tdNumero = document.createElement("td");
    tdNumero.textContent= particulas.length;

    let tdCarga = document.createElement("td");
    tdCarga.textContent = carga + " C";

    let tdPosicion = document.createElement("td");
    tdPosicion.textContent = `(${pX},${pY},${pZ})`;


    row.appendChild(tdNumero);
    row.appendChild(tdCarga);
    row.appendChild(tdPosicion);

    tbody.appendChild(row);
}


function CalcularFuerza()
{
    
    let q1 = Number(document.getElementById("carga1").value);
    let q2 = Number(document.getElementById("carga2").value);
    let distancia = Number(document.getElementById("distancia").value);
    
    txtResultado.value = Electric.CoulombForce(q1,q2,distancia).toFixed(2) + "N";
 

}