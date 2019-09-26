 class Electric
{
     
    
    static CoulombForce(q1,q2,distance) 
    {
        const k = 8987551787.368;

        return (k * q1*q2)/distance**2;
    }

}

var Particle = function (x,y,z,charge) {
    
    this.x = x;
    this.y = y;
    this.z = z;

    this.charge = charge;   
}

Particle.prototype.dist = function(particle)
{
    let x = this.x - particle.x;
    let y = this.y - particle.y;
    let z = this.z - particle.z;

    return Math.sqrt(x**2 + y**2,z**2);
}