import Jugador from "./jugador.js";

export default class Principal extends Phaser.Scene {
    constructor() {
      super("principal");
    }
    preload(){
        Jugador.preload(this);
    }
    create(){
        console.log("create");
        this.player = new Jugador({scene:this,x:0, y:0,texture:'mujer', frame:'townsfolk_f_idle_1'});
        let textPlayer = new Jugador({scene:this,x:100, y:100,texture:'mujer', frame:'townsfolk_f_idle_1'});

        this.player.inputKeys=this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
        });
    }
update(){
this.player.update();
}
}
