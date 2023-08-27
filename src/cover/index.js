import $ from "jquery";
import style from "./index.module.less";
import videoUrl from "@/assets/movie.mp4";
import audioUrl from '@/assets/music.mp3';

function init() {
  const container = $("<div>").addClass(style.container).appendTo("#app");
  const vdo = $("<video>")
    .prop("src", videoUrl)
    .prop("autoplay", true)
    .prop("loop", true)
    .addClass(style.video)
    .appendTo(container);
  const ado = $("<audio>")
    .prop("src", audioUrl)
    .prop("autoplay", true)
    .prop("loop", true)
    .appendTo(container);

  $('<h1>').text('伟哥影院').addClass(style.title).appendTo(container);

  $(window).on('scroll',function(){
    const scrollTop = document.documentElement.scrollTop;
    const vHeight = document.documentElement.clientHeight;
    if(scrollTop >= vHeight){
      console.log('暂停');
      vdo[0].pause();
      ado[0].pause()
    }else{
      console.log('开始');
      vdo[0].play();
      ado[0].play();
    }

  })
}
init();
