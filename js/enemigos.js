import Materia from "./materia.js";
export default class Enemigo extends Materia {
static preload(scene){
scene.load.atlas('enemies', 'assets/imagenes/enemigos.png', 'assets/imagenes/enemigos_atlas.json');
scene.load.animation('enemies_anim', 'assets/imagenes/enemigos_anim.json');
scene.load.audio('bear', 'assets/audio/bear.mp3');
scene.load.audio('wolf', 'assets/audio/wolf.mp3');
scene.load.audio('ent', 'assets/audio/ent.mp3');
}
constructor(data){
    let {scene,enemigo}=data;
    let drops= JSON.parse(enemigo.properties.find(p=>p.name=='drops').value);
    let health= enemigo.properties.find(p=>p.name=='health').value;
    super({scene, x:enemigo.x, y:enemigo.y, health, texture:'enemies', frame:`${enemigo.name}_idle_1`,drops, name:enemigo.name});

    
    const{Body,Bodies}=Phaser.Physics.Matter.Matter;
    var enemigoCollider= Bodies.circle(this.x,this.y,12,{isSensor:false,label:'enemigoCollider'});
    var enemigoSensor= Bodies.circle(this.x,this.y,80,{isSensor:true,label:'enemigoSensor'});
    const compoundBody=Body.create({
        parts:[enemigoCollider,enemigoSensor],
        frictionAir:0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.scene.matterCollision.addOnCollideStart({
        objectA:[enemigoSensor],
        callback:other=>{

            if(other.gameObjectB && other.gameObjectB.name=='player'){
                this.attacking= other.gameObjectB;
            }
        },
        context:this.scene,
    });
}
attack=(target)=>{
    if(target.dead||this.dead){
        clearInterval(this.attacktimer);
        return;
    }
    target.hit();
}

update(){
    if(this.dead)return;
    if(this.attacking){
        let direction=this.attacking.position.subtract(this.position);
        if(direction.length()>24){
            let v=direction.normalize();
            this.setVelocityX(direction.x);
            this.setVelocityY(direction.y);
            if(this.attacktimer){
                clearInterval(this.attacktimer);
                this.attacktimer=null;
            }
        }else{
            if(this.attacktimer==null){
                this.attacktimer= setInterval(this.attack,500,this.attacking);
            }
        }
    }
    this.setFlipX(this.velocity.x<0);
    if(Math.abs(this.velocity.x)>0.1||Math.abs(this.velocity.y)>0.1){
        this.anims.play(`${this.name}_walk`,true);
    } else {
        this.anims.play(`${this.name}_idle`,true);
    }   
}
}