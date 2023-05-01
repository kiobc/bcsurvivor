import SoltarItem from "./soltarItem.js";

export default class Recursos extends Phaser.Physics.Matter.Sprite {
    static preload(scene){
        scene.load.atlas('resources', 'assets/imagenes/recursos.png', 'assets/imagenes/recursos_atlas.json');
        scene.load.audio('tree', 'assets/audio/tree.mp3');
        scene.load.audio('rock', 'assets/audio/rock.mp3');
        scene.load.audio('bush', 'assets/audio/bush.mp3');
        scene.load.audio('pickup', 'assets/audio/pickup.mp3');
    }
    constructor(data){
        let {scene, recurso}=data;
        super(scene.matter.world,recurso.x,recurso.y,'resources',recurso.type);
        this.scene.add.existing(this);
        let yOrigin= recurso.properties.find(p=>p.name=='yOrigin').value;
        this.drops= JSON.parse(recurso.properties.find(p=>p.name=='drops').value);
        this.name=recurso.type;
        this.health=5;
        this.sound= this.scene.sound.add(this.name);
        this.x +=this.width/2;
        this.y +=this.height/2;
        this.y = this.y + this.height*(yOrigin-0.5);
        const{Body,Bodies}=Phaser.Physics.Matter.Matter;
        var circuloCollider= Bodies.circle(this.x,this.y,12,{isSensor:false,label:'collider'});
        this.setExistingBody(circuloCollider);
        this.setStatic(true);
        this.setOrigin(0.5, yOrigin);

    }
    get dead(){
        return this.health <= 0;
    }

    hit = ()=>{
        if(this.sound) this.sound.play();
        this.health--;
        console.log(`Hitting:${this.name} Health:${this.health}`);
        if(this.dead){
            this.drops.forEach(drop=> new SoltarItem({scene:this.scene, x:this.x, y:this.y, frame:drop}));
        }
    }
    
}