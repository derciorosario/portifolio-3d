import * as THREE from 'three'
import Experience from './Experience'
import {EventEmitter} from 'events'
export default class Sizes extends EventEmitter {
    constructor(){
    super()
    this.experience=new Experience()
    this.canvas=this.experience.canvas
    this.container=document.querySelector('.model-3d')
    this.width=this.container.clientWidth
    this.height=this.container.clientHeight
    this.aspect=this.width/this.height
    this.pixelRatio=window.devicePixelRatio
    
     
     window.addEventListener('resize',()=>{
        
        this.width=this.container.clientWidth
        this.height=this.container.clientHeight
        this.aspect=this.width/this.height
        this.pixelRatio=window.devicePixelRatio
        this.emit('resize')
       
       
     })
    
    }
 
 
}