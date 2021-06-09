import './icons.js';
import $ from './jquery-3.6.0.js'

//console.log($);
//const $ = document.querySelector
class Player{
    constructor(node){
        this.root =typeof node === 'string'? $(node) : node;
        this.songList =[]
        this.currentIndex= 0;
        this.start()
        this.audio = new Audio();
        this.bind() 
    }

    start(){
        fetch('https://jirengu.github.io/data-mock/huawei-music/music-list.json')
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
            this.songList = data
        })
    }

    bind(){
        $(".btn-play-pause", this.root).click(
            ()=>{
                console.log("点击了")
                console.log(this)
                this.playSong()
                console.log(this.audio.src)
            }
        )
   }

    playSong(){
        this.audio.src = this.songList[this.currentIndex].url
        this.audio.play();
    }
}

const app = new Player('#player')
