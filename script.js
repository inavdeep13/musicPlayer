let progress = document.getElementById("progress");
let song_audio = document.getElementById("song_audio");
let ctrlIcon = document.getElementById("ctrlIcon");
let currentTimeDuration = document.getElementById("current-time");
let totalTimeDuration = document.getElementById("total-time");

song_audio.onloadedmetadata = function(){
    progress.max = song_audio.duration;
    progress.value = song_audio.currentTime;
    totalTimeDuration.innerText = formatTime(song_audio.duration) || "00:00";
}

song_audio.ontimeupdate = () => {
    const currentTime = song_audio.currentTime;
    currentTimeDuration.innerText = formatTime(currentTime) ||  "00:00";
}

function playPause() {
    if(ctrlIcon.classList.contains("fa-pause")){
        song_audio.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }else {
        song_audio.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

if(song_audio.play()){
    setInterval(() => {
        progress.value = song_audio.currentTime;
    }, 500);
}

progress.onchange = function(){
    song_audio.play();
    song_audio.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    // progress.value = event.timeStamp
    // song_audio.play();
    
}

function resetSong() {
    song_audio.currentTime = 0;
    progress.value = 0;
}

["backward", "forward", "sync"].forEach(id => {
    document.getElementById(id).addEventListener("click", resetSong);
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

