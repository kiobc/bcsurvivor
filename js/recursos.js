export default class Recursos extends Phaser.Physics.Matter.Sprite {
    static preload(scene){
        scene.load.atlas('resources', 'assets/imagenes/recursos.png', 'assets/imagenes/recursos_atlas.json');
    }
    constructor(data){
        let {scene, recurso}=data;
        super(scene.matter.world,recurso.x,recurso.y,'resources',recurso.type);
        this.scene.add.existing(this);
        let yOrigin= recurso.properties.find(p=>p.name=='yOrigin').value;
        this.name=recurso.type;
        this.x +=this.width/2;
        this.y +=this.height/2;
        this.y = this.y + this.height*(yOrigin-0.5);
        const{Body,Bodies}=Phaser.Physics.Matter.Matter;
        var circuloCollider= Bodies.circle(this.x,this.y,12,{isSensor:false,label:'collider'});
        this.setExistingBody(circuloCollider);
        this.setStatic(true);
        this.setOrigin(0.5, yOrigin);

    }
}