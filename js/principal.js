import Jugador from "./jugador.js";

export default class Principal extends Phaser.Scene {
    constructor() {
      super("principal");
    }
    preload(){
        Jugador.preload(this);
        this.load.image('tiles','./assets/imagenes/RPG Nature Tileset.png');
        this.load.tilemapTiledJSON('map','./assets/imagenes/mapa.json');
        this.load.atlas('resources', 'assets/imagenes/recursos.png', 'assets/imagenes/recursos_atlas.json');
    }
    create(){
        const map = this.make.tilemap({key: 'map'});
        this.map = map;
        const tileset = map.addTilesetImage('RPG Nature Tileset','tiles',32,32,0,0);
        const suelo = map.createLayer('Tile Layer 1', tileset, 0, 0);
        const suelo1 = map.createLayer('Tile Layer 2', tileset, 0, 0);
        suelo.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(suelo);
        
        this.addRecursos();
        this.player = new Jugador({scene:this,x:100, y:100,texture:'mujer', frame:'townsfolk_f_idle_1'});
        this.player.inputKeys=this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
        });
    }
addRecursos(){
    const recursos=this.map.getObjectLayer('Resources');
    recursos.objects.forEach(recurso=>{
        let resItem=new Phaser.Physics.Matter.Sprite(this.matter.world,recurso.x,recurso.x,'resources',recurso.type);
        let yOrigin= recurso.properties.find(p=>p.name=='yOrigin').value;
        resItem.x +=resItem.width/2;
        resItem.y +=resItem.height/2;
        resItem.y = resItem.y + resItem.height*(yOrigin-0.5);
        const{Body,Bodies}=Phaser.Physics.Matter.Matter;
        var circuloCollider= Bodies.circle(resItem.x,resItem.y,12,{isSensor:false,label:'collider'});
        resItem.setExistingBody(circuloCollider);

        resItem.setStatic(true);
        resItem.setOrigin(0.5, yOrigin);
        this.add.existing(resItem);
    });
}

update(){
this.player.update();
}
}