import './icons.js';
import $ from './jquery-3.6.0.js'
import Swiper from './swiper.js'

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
            this.audio.src = this.songList[this.currentIndex].url
        })
    }

    bind(){
        const $playPauseToggle = $('.btn-play-pause');
       $(".btn-play-pause", this.root).click(
            ()=>{
                console.log("点击了")
                if($playPauseToggle.hasClass("pause")){
                    $playPauseToggle.removeClass("pause").addClass("playing")
                    $("use",$playPauseToggle).attr("xlink:href", "#icon-pause")
                    this.playSong()
                }else if($playPauseToggle.hasClass("playing")){
                     $playPauseToggle.removeClass("playing").addClass("pause")
                     $("use",$playPauseToggle).attr("xlink:href", "#icon-play")

                      this.audio.pause()
                }
                
            }
        )
        
        const $btnPre = $(".btn-pre", this.root)

        $btnPre.click(
            ()=>{
                this.playPrevSong();
            }
        )
        
        $('.btn-next', this.root).click(
            ()=>this.playNextSong()
        )
         //   $(".panels").click(()=> console.log("panel "))
			$('.panels').on('swipeleft', function(){
				console.log("左滑")
				$('.panels').removeClass('panel1').addClass('panel2')
			})
			$('.panels').on('swiperight', function(){
				console.log("右滑")
				$('.panels').removeClass('panel2').addClass('panel1')
			})



   }

   playPrevSong(){
       this.currentIndex = (this.songList.length + this.currentIndex - 1) % this.songList.length;
       this.audio.src = this.songList[this.currentIndex].url;
       this.audio.play()
       this.audio.oncanplaythrough = ()=>this.audio.play()
   }

   playNextSong(){
       this.currentIndex = (this.songList.length + this.currentIndex + 1) % this.songList.length;
       this.audio.src = this.songList[this.currentIndex].url;
       this.audio.play()
       this.audio.oncanplaythrough = ()=>this.audio.play()
       
   }
    playSong(){
        this.audio.src = this.songList[this.currentIndex].url
        this.audio.play();
    }
}

const app = new Player('#player')
app.playSong()