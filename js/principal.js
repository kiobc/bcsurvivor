import Enemigo from "./enemigos.js";
import Jugador from "./jugador.js";
import Recursos from "./recursos.js";

export default class Principal extends Phaser.Scene {
    constructor() {
      super("principal");
      this.enemigo=[];
    }
    preload(){
        Jugador.preload(this);
        Enemigo.preload(this);
        Recursos.preload(this);
        this.load.image('tiles','./assets/imagenes/RPG Nature Tileset.png');
        this.load.tilemapTiledJSON('map','./assets/imagenes/mapa.json');
    }
    create(){
        const map = this.make.tilemap({key: 'map'});
        this.map = map;
        const tileset = map.addTilesetImage('RPG Nature Tileset','tiles',32,32,0,0);
        const suelo = map.createLayer('Tile Layer 1', tileset, 0, 0);
        const suelo1 = map.createLayer('Tile Layer 2', tileset, 0, 0);
        suelo.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(suelo);
        
        this.map.getObjectLayer('Resources').objects.forEach(recurso=>new Recursos({scene:this,recurso}));
        this.map.getObjectLayer('Enemies').objects.forEach(enemigo=> this.enemigo.push (new Enemigo({scene:this,enemigo})));

        this.player = new Jugador({scene:this,x:200, y:200,texture:'mujer', frame:'townsfolk_f_idle_1'});
        this.player.inputKeys=this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
        });
    }


update(){
    this.enemigo.forEach(enemigo=>enemigo.update());
this.player.update();
}
}