export default class Jugador extends Phaser.Physics.Matter.Sprite {
    constructor(data){
        let {scene,x,y,texture,frame}=data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);
    }
static preload(scene){
    
    scene.load.atlas('mujer', 'assets/imagenes/mujer.png', 'assets/imagenes/mujer_atlas.json');
    scene.load.animation('mujer_anim', 'assets/imagenes/mujer_anim.json');
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
    }
}