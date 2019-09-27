 
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

Vector.getAngle = function(v)
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




var Particle = function (x,y,z,charge) {
    
    this.position = new Vector(x,y,z);

    this.charge = charge;   
}

