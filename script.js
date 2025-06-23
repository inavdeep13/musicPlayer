let progress = document.getElementById("progress");
let song_audio = document.getElementById("song_audio");
let ctrlIcon = document.getElementById("ctrlIcon");

song_audio.onloadedmetadata = function(){
    progress.max = song_audio.duration;
    progress.value = song_audio.currentTime;
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
}

function resetSong() {
    song_audio.currentTime = 0;
    progress.value = 0;
}

["backward", "forward", "sync"].forEach(id => {
    document.getElementById(id).addEventListener("click", resetSong);
});
