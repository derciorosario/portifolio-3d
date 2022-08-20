import * as THREE from 'three'
import Experience from './Experience'
export default class Renderer {
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.canvas=this.experience.canvas
        this.camera=this.experience.camera
        this.sizes=this.experience.sizes
        this.setRenderer()
      
    }

    setRenderer(){
        this.renderer=new THREE.WebGLRenderer({alpha:false,canvas:this.canvas,antialias:true})

        this.renderer.physicallyCorrectLights=true
        this.renderer.outputEncouding=THREE.sRGBEncoding
        this.renderer.toneMapping=THREE.CineonToneMapping
        this.renderer.toneMappingExposure=1
        this.renderer.shadowMap.enabled=true
        this.renderer.shadowMap.type=THREE.PCFSoftShadowMap


        this.renderer.setSize(this.sizes.width,this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixelRatio)
        
    }
    resize(){
        console.log(this.sizes.width)
        this.renderer.setSize(this.sizes.width,this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixelRatio)
    }
    update(){
        this.renderer.render(this.scene,this.camera.perspectiveCamera)
    }
}