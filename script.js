// IMPORTED RELEVANT ELEMENTS
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const volume_slider = document.querySelector('.volume-slider');

const songs = ['Defeat', 'Desiderata', 'The Mind'];

// SONG INDEX (PLAYLIST POSITION)
let songIndex = 2;

// LOAD SONG ON PAGE LOAD
loadSong(songs[songIndex]);

// LOAD SELECTED SONG
function loadSong(song) {
  title.innerText = song;
  audio.src = `motivation/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// START SONG AND REPLACE PLAY BUTTON WITH PAUSE BUTTON
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// PAUSE SONG AND REPLACE PAUSE BUTTON WITH PLAY BUTTON
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// GO TO PREVIOUS SONG IN SONG ARRAY
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// GO TO NEXT SONG IN SONG ARRAY
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// UPDATE PROGRESS BAR AS SONG PLAYS
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// VOLUME SLIDER FUNCTIONALITY
function setVolume(){
    audio.volume = volume_slider.value / 100;
}

// MUTE VOLUME
function setVolumeMin() {
	audio.volume = 0;
	volume_slider.value = 0;
}

// MAXIMIZE VOLUME
function setVolumeMax() {
	audio.volume = 1;
	volume_slider.value = 100;
}

// SET PROGRESS BAR POSITION
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// MEASURE DURATION AND CURRENT TIME OF SONG
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// MEASURE MINUTES
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// MEASURE SECONDS
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// UPDATE CURRENT TIME ON WEBPAGE
	currTime.innerHTML = min +':'+ sec;

	// GET MINUTES DURATION
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// GET SECONDS DURATION
	
	get_sec_d (duration);

	// UPDATE DURATION ON WEBPAGE
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

// EVENT LISTENER FOR PLAY/PAUSE BUTTON
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// LISTENER FOR NEXT AND PREVIOUS SONG BUTTONS
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// LISTENER FOR UPDATE TIME AND SONG
audio.addEventListener('timeupdate', updateProgress);

// LISTENER FOR PROGRESS BAR CLICK
progressContainer.addEventListener('click', setProgress);

// LISTENER FOR SONG ENDING
audio.addEventListener('ended', nextSong);

// LISTENER FOR CURRENT TIME OF SONG
audio.addEventListener('timeupdate',DurTime);