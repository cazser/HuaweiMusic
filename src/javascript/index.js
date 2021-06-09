import './icons.js';
import $ from './jquery-3.6.0.js'

//console.log($);
const $$ = document.querySelector
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
                if($(".btn-play-pause").hasClass("pause")){
                    $(".btn-play-pause").removeClass("pause").addClass("play")
                    this.playSong()
                }else if($(".btn-play-pause").hasClass("play")){
                     $(".btn-play-pause").removeClass("play").addClass("pause")
                      this.audio.pause()
                }
                
            }
        )

        /*let self = this;
        this.root.querySelector('.btn-play-pause').onclick=function(){
            self.playSong();
        }*/
   }

    playSong(){
        this.audio.src = this.songList[this.currentIndex].url
        this.audio.play();
    }
}

const app = new Player('#player')
app.playSong()