import * as THREE from 'three'
import Experience from './Experience'
export default class Camera {
    constructor(){
    this.experience=new Experience()
    this.scene=this.experience.scene
    this.sizes=this.experience.sizes
    this.createPerspectiveCamera()
    

    }
    createPerspectiveCamera(){
        this.perspectiveCamera=new THREE.PerspectiveCamera(45,this.sizes.aspect,0.1,500)
        this.perspectiveCamera.position.z=0.6
    }
    resize(){
         this.perspectiveCamera.aspect=this.sizes.aspect
         this.perspectiveCamera.updateProjectionMatrix()
    }
}