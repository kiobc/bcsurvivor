import Jugador from "./jugador.js";

export default class Principal extends Phaser.Scene {
    constructor() {
      super("principal");
    }
    preload(){
        Jugador.preload(this);
        this.load.image('tiles','./assets/imagenes/RPG Nature Tileset.png');
        this.load.tilemapTiledJSON('map','./assets/imagenes/mapa.json');
    }
    create(){
        const map = this.make.tilemap({key:'map'});
        const tileset = map.addTilesetImage('RPG Nature Tileset','tiles',32,32,0,0);
        const suelo = map.createLayer('Tile Layer 1', tileset, 0, 0);

        this.player = new Jugador({scene:this,x:0, y:0,texture:'mujer', frame:'townsfolk_f_idle_1'});
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