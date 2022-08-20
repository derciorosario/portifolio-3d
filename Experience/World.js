import * as THREE from 'three'
import Experience from './Experience'
import GSAP from 'gsap'
export default class World {
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.resources=this.experience.resources
        this.sizes=this.experience.sizes
        this.directionalLight=this.experience.environment.directionalLight

        this.lerp={
            current:0,
            target:0,
            ease:0.06
        }
        
        this.resources.on('loaded',(files)=>{
           this.room_scene=files.room_model.scene
           this.room_model=files.room_model
           this.videoTexure=files.video_texture
           this.setModel()
           
           this.removeLoader()
            
        })

    }
    removeLoader(){

        this.loadertimeline=new GSAP.timeline()
             
        this.loadertimeline.
        to('.loader .circle-container',{animation: "loader_done 1s  cubic-bezier(0.65,-0.04, 0.47, 0.66) forwards"}).
        to('.loader .circle-container .circle_1',{delay:1,duration:1,transform:'translate(-41px, -50%)'}).
        to('.loader .circle-container .circle_1',{duration:0.3,transform:'translate(-41px, -50%) scale(3.6,3.6)'}).
        to('.loader .text_2',{duration:1,opacity:1}).
        to('.loader .circle_1',{duration:0.2,transform:'translate(-41px, -50%) scale(50,50)'}).
        to('.loader .circle_1 .circle_2',{delay:0.5,duration:0.4,width:'100%',height:'100%',onComplete:()=>document.querySelector('canvas').classList.add('animate')}).
        to(this.room_scene.position,{
                 y:-0.24,
                 z:0,
                 duration:1.6,
                 delay:2,
                 onComplete:()=>{
                    this.onMousemove()
                    document.querySelector('.home').classList.add('show')
                    document.querySelector('canvas').className="show"
                    document.querySelector('.loader').style.display="none"

                 } 
        })
     
         
    }
    setModel(){
             this.scene.add(this.room_scene)
             this.room_scene.scale.set(0.08,0.08,0.08)
             this.room_scene.position.y=-0.29
             this.room_scene.position.z=0.75

             this.room_scene.children.forEach(child => {

                child.castShadow=true
                child.receiveShadow=true

                if(child instanceof THREE.Group){
                    child.children.forEach(groupchildren=>{
                        groupchildren.castShadow=true
                        groupchildren.receiveShadow=true
                    })
                }
               if(child.name==="tv-screen"){
                    child.material=new THREE.MeshBasicMaterial({
                        map:this.videoTexure
                    })
                   
               }

             });
              
    }
  
    onMousemove(){
        window.addEventListener('mousemove',(e)=>{

           if(!this.room_scene) return

           this.x=(e.clientX-this.sizes.width/2)  / this.sizes.width * 0.6
           this.lerp.target=this.x 
           
        })
    }

    
    update(){
        if(this.room_scene) this.room_scene.rotation.y=this.lerp.current
        this.lerp.current=GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        )
    }
}