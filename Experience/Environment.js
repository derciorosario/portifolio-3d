import * as THREE from 'three'
import Experience from './Experience'
export default class Environment {
    constructor(){
    this.experience=new Experience()
    this.scene=this.experience.scene
    this.createDirectionalLght()
    this.createAmbientLight()

    }
    createDirectionalLght(){
        this.directionalLight=new THREE.DirectionalLight('#fff',2)
        this.directionalLight.castShadow=true
        this.directionalLight.shadow.camera.far=1
        this.directionalLight.position.z=1
        this.directionalLight.position.y=3
        this.scene.add(this.directionalLight)

      

        
        
    }
    createAmbientLight(){
        this.ambientLight=new THREE.AmbientLight('#ffffff',3)
        this.scene.add(this.ambientLight)
    }
    
   
}