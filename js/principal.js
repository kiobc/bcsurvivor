export default class Principal extends Phaser.Scene {
    constructor() {
      super('principal');
    }
    preload(){
        console.log("preload");
    }
    create(){
        console.log("create");
        this.player = this.matter.add.sprite(0, 0, 'player');
        this.keys=this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
        });
    }
    update(){
        console.log("update");
        const speed=3;
        let playerVelocity=new Phaser.Math.Vector2();
        if(this.keys.left.isDown){
            playerVelocity.x=-1;
        } else if(this.keys.right.isDown){
            playerVelocity.x=1;
        }
        if(this.keys.up.isDown){
            playerVelocity.y=-1;
        } else if(this.keys.down.isDown){
            playerVelocity.y=1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.player.setVelocity(playerVelocity.x,playerVelocity.y);
    }
}
