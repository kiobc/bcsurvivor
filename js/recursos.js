import Materia from "./materia.js";

export default class Recursos extends Materia {
    static preload(scene){
        scene.load.atlas('resources', 'assets/imagenes/recursos.png', 'assets/imagenes/recursos_atlas.json');
        scene.load.audio('tree', 'assets/audio/tree.mp3');
        scene.load.audio('rock', 'assets/audio/rock.mp3');
        scene.load.audio('bush', 'assets/audio/bush.mp3');
        scene.load.audio('pickup', 'assets/audio/pickup.mp3');
    }
    constructor(data){
        let {scene, recurso}=data;
        let drops= JSON.parse(recurso.properties.find(p=>p.name=='drops').value);
        let depth= recurso.properties.find(p=>p.name=='depth').value;
        super({scene, x:recurso.x, y:recurso.y, health:5, texture:'resources', frame:recurso.type, drops,depth, name:recurso.type});
        let yOrigin= recurso.properties.find(p=>p.name=='yOrigin').value;
        this.y = this.y + this.height*(yOrigin-0.5);
        const{Body,Bodies}=Phaser.Physics.Matter.Matter;
        var circuloCollider= Bodies.circle(this.x,this.y,12,{isSensor:false,label:'collider'});
        this.setExistingBody(circuloCollider);
        this.setStatic(true);
        this.setOrigin(0.5, yOrigin);

    }
    
}