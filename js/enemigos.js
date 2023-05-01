import Materia from "./materia.js";
export default class Enemigo extends Materia {
static preload(scene){
scene.load.atlas('enemies', 'assets/imagenes/enemigos.png', 'assets/imagenes/enemigos_atlas.json');
scene.load.animation('enemies_anim', 'assets/imagenes/enemigos_anim.json');
scene.load.audio('bear', 'assets/audio/bear.mp3');
scene.load.audio('wolf', 'assets/audio/wolf.mp3');
scene.load.audio('ent', 'assets/audio/ent.mp3');
}
constructor(data){
    let {scene,enemigo}=data;
    let drops= JSON.parse(enemigo.properties.find(p=>p.name=='drops').value);
    let health= enemigo.properties.find(p=>p.name=='health').value;
    super({scene, x:enemigo.x, y:enemigo.y, health, texture:'enemies', frame:`${enemigo.name}_idle_1`,drops, name:enemigo.name});
}
update(){
    console.log('enemigo update');
}
}