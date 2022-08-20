import * as THREE from 'three'
import Experience from './Experience'
import Assets from './Assets'
import {EventEmitter} from 'events'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

export default class Resources extends EventEmitter{
    constructor(){
        super()
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.assets=Assets
        this.files={}
        this.loaded_files=0
        this.queue=this.assets.length
        this.setLoaders()
        this.loading()
    }
    setLoaders(){
        this.gltfLoader=new GLTFLoader()
        this.dracoLoader=new DRACOLoader()
        this.dracoLoader.setDecoderPath('/draco/')
        this.gltfLoader.setDRACOLoader(this.dracoLoader)
    }
    loading(){
        for(const asset of this.assets) {
            if(asset.name==='room_model'){
                this.loader=this.gltfLoader.load(asset.path,(file)=>{
                     this.loaded(asset,file)
                })
            }else if(asset.name==="video_texture"){
                this.video={}
                this.videoTexture={}
                this.video[asset.name]=document.createElement('video')
                this.video[asset.name].src=asset.path
                this.video[asset.name].muted=true
                this.video[asset.name].playsInline=true
                this.video[asset.name].autoplay=true
                this.video[asset.name].loop=true
                this.video[asset.name].play()
                this.videoTexture[asset.name]=new THREE.VideoTexture(
                   this.video[asset.name]
               )
               this.videoTexture[asset.name].flipy=true
               this.videoTexture[asset.name].minFilter=THREE.NearestFilter
               this.videoTexture[asset.name].mageFilter=THREE.NearestFilter
               this.videoTexture[asset.name].generateMipmaps=false
               this.videoTexture[asset.name].econding=THREE.sRGBEncoding
               this.loaded(asset,this.videoTexture[asset.name])
              

            }
        }
    }
    loaded(asset,file){
        this.loaded_files++
        this.files[asset.name]=file

        if(this.loaded_files===this.queue){
             this.emit('loaded',this.files)
        }
    }
   
}