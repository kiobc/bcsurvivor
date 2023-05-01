
export default class Jugador extends Phaser.Physics.Matter.Sprite {
    constructor(data){
        let {scene,x,y,texture,frame}=data;
        super(scene.matter.world,x,y,texture,frame);
        this.touching=[];
        this.scene.add.existing(this);
        //arma
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'items', 162);
        this.spriteWeapon.setScale(0.8);
        this.spriteWeapon.setOrigin(0.25, 0.75);
        this.scene.add.existing(this.spriteWeapon);

        const{Body,Bodies}=Phaser.Physics.Matter.Matter;
        var jugadorCollider= Bodies.circle(this.x,this.y,12,{isSensor:false,label:'jugadorCollider'});
        var jugadorSensor= Bodies.circle(this.x,this.y,24,{isSensor:true,label:'jugadorSensor'});
        const compoundBody=Body.create({
            parts:[jugadorCollider,jugadorSensor],
            frictionAir:0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
        this.CreateMiningCollisions(jugadorSensor);
        this.CreatePickupCollisions(jugadorCollider);
        this.scene.input.on('pointermove',pointer=>this.setFlipX(pointer.worldX < this.x));
    }
static preload(scene){
    
    scene.load.atlas('mujer', 'assets/imagenes/mujer.png', 'assets/imagenes/mujer_atlas.json');
    scene.load.animation('mujer_anim', 'assets/imagenes/mujer_anim.json');
    scene.load.spritesheet('items', 'assets/imagenes/items.png', { frameWidth: 32, frameHeight: 32 });
}

get velocity(){
    return this.body.velocity;
}

    update(){
        this.anims.play('mujer_idle',true);
        const speed=3;
        let playerVelocity=new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown){
            playerVelocity.x=-1;
        } else if(this.inputKeys.right.isDown){
            playerVelocity.x=1;
        }
        if(this.inputKeys.up.isDown){
            playerVelocity.y=-1;
        } else if(this.inputKeys.down.isDown){
            playerVelocity.y=1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x,playerVelocity.y);
        if(Math.abs(this.velocity.x)>0.1||Math.abs(this.velocity.y)>0.1){
            this.anims.play('mujer_walk',true);
        } else {
            this.anims.play('mujer_idle',true);
        }   
        this.spriteWeapon.setPosition(this.x, this.y);
        this.armaRotar();
        
    }
    armaRotar(){
        let pointer=this.scene.input.activePointer;
        if(pointer.isDown){
            this.armaRotacion +=6;
        }else{
            this.armaRotacion =0;
        }
        if(this.armaRotacion > 100){
            this.hacerCosas();
            this.armaRotacion=0;
        }
        if(this.flipX){
            this.spriteWeapon.setAngle(-this.armaRotacion - 90);
        }else{
            this.spriteWeapon.setAngle(this.armaRotacion);
        }
    }
    CreateMiningCollisions(jugadorSensor){
        this.scene.matterCollision.addOnCollideStart({
            objectA:[jugadorSensor],
            callback:other=>{
                if(other.bodyB.isSensor) return;
                this.touching.push(other.gameObjectB);
                console.log(this.touching.length,other.gameObjectB.name);
            },
            context:this.scene,
        });
        this.scene.matterCollision.addOnCollideEnd({
            objectA:[jugadorSensor],
            callback:other=>{
                this.touching=this.touching.filter(gameObject=>gameObject!=other.gameObjectB);
                console.log(this.touching.length);
            },
            context:this.scene,
        });
    }

    CreatePickupCollisions(jugadorCollider){
        this.scene.matterCollision.addOnCollideStart({
            objectA:[jugadorCollider],
            callback:other=>{
                if(other.gameObjectB && other.gameObjectB.pickup) other.gameObjectB.pickup();
            },
            context:this.scene,
        });
        this.scene.matterCollision.addOnCollideActive({
            objectA:[jugadorCollider],
            callback:other=>{
                if(other.gameObjectB && other.gameObjectB.pickup) other.gameObjectB.pickup();
            },
            context:this.scene,
        });

    }

    hacerCosas(){
        this.touching= this.touching.filter(gameObject => gameObject.hit && !gameObject.dead);
        this.touching.forEach(gameobject =>{
            gameobject.hit();
            if(gameobject.dead) gameobject.destroy();
        });
    }
}