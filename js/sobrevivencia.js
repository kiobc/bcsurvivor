import principal from "./principal.js";


const config ={
    width:512,
    height:512,
    backgroundColor:'#999999',
    type: Phaser.AUTO,
    parent:'sobrevivencia',
    scene:[principal],
    scale:{
        zoom:2,
    },
    physics:{
        default:'matter',
        matter:{
            debug:true,
            gravity:{y:0},
        }
    },
    plugins:{
        scene:[ 
            {
                plugin: PhaserMatterCollisionPlugin,
                key: "matterCollision",
                mapping: "matterCollision"
            }
           
        ]
    }

}

new Phaser.Game(config);