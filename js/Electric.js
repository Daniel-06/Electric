 
 const k = 8987551787.368;
 
 class Electric
{
    
    static CoulombForce(q1,q2,distance) 
    {
      return (k * q1*q2)/distance**2;
    }


    static getCoulomb (indexParticle,particles)
    {   
        var particle = particles[indexParticle];
        var result = new Vector(0,0,0);

        for (let i = 0; i < particles.length; i++) {
            
            if (i === indexParticle) continue;   
            
            const p = particles[i]; 
            const distance = Vector.dist(particle.position,p.position).mag() // Distance from particle to p
            const distanceCubed = distance**3;

            result.x += (p.charge * (particle.position.x - p.position.x))/distanceCubed;
            result.y += (p.charge * (particle.position.y - p.position.y))/distanceCubed;
            result.z += (p.charge * (particle.position.z - p.position.z))/distanceCubed;
            
        }

        result.mult(k * particle.charge);
        return result;
    }

}


var Vector = function (x,y,z)
{
    this.x = x;
    this.y = y;
    this.z = z;
};

Vector.dist = function (v1,v2)
{
    var v = v1.copy();
    v.sub(v2);
    return v;
}

Vector.getAngle2D = function(v)
{
   return Math.atan(v.y/v.x) * 180/Math.PI;
}

Vector.prototype.mag = function()
{
    return Math.sqrt(this.x **2 + this.y**2 + this.z**2);
}

Vector.prototype.add = function(vector)
{
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
}

Vector.prototype.sub = function(vector)
{
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
}

Vector.prototype.copy = function()
{
    return new Vector(this.x,this.y,this.z);
}

Vector.prototype.mult = function(number)
{
    this.x *= number;
    this.y *= number;
    this.z *= number;
}

// Returns a string  in unit vector form (1i + 2j + 0k)
Vector.prototype.formatUnitVector = function(precision)
{
    let strVector = "(";
    
    let x = this.x;
    let y = this.y;
    let z = this.z;

    if (arguments.length> 0)
    {
        x = x.toFixed(precision);
        y = y.toFixed(precision);
        z = z.toFixed(precision);
    }

    
    precision = 2;

    if (this.x>=0)
    {
        strVector += x + "î ";
    }

    else
    {
        strVector+="−" + x*-1 + "î ";
    }




    if (this.y>=0)
    {
        strVector+="+ " + y + "ĵ ";
    }

    else
    {
        strVector+="− " + y*-1 + "ĵ ";
    }




    if (this.z>=0)
    {
        strVector += "+ " + z + "k̂";
    }

    else
    {
        strVector +="− " + z*-1 + "k̂";
    }


    strVector += ")";

    return strVector;
}




var Particle = function (x,y,z,charge) {
    
    this.position = new Vector(x,y,z);

    this.charge = charge;   
}

