import * as THREE from 'three'
import Renderer from './Renderer'
import Sizes from './Sizes'
import Camera from './Camera';
import Time from './Time'
import Environment from './Environment'
import Resouces from './Resources'
import World from './World'

export default class Experience {
    constructor(canvas){
        if(Experience.instance){
                return Experience.instance
        }else{
            Experience.instance=this
        }
        this.canvas=canvas
        this.scene=new THREE.Scene()
        this.time=new Time()
        this.sizes=new Sizes()
        this.camera=new Camera()
        this.renderer=new Renderer()
        this.environment=new Environment()
        this.resources=new Resouces()
        this.world=new World()

        this.sizes.on('resize',()=>{
            this.resize()
        })
        this.time.on('update',()=>{
            this.update()
        })
       
      

    }
    resize(){
        this.camera.resize()
        this.renderer.resize()

    }
    update(){
        this.renderer.update()
        this.world.update()
    }
}