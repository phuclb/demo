/* HowlerJS */

// Elements
const howlerElements = [
  'track', 'timer', 'duration',
  'playBtn', 'pauseBtn', 'prevBtn', 'nextBtn',
  'bar', 'progress', 'skip', 'loading', 'playlist', 'list'
];
howlerElements.forEach(element => window[element] = document.getElementById(element));
const howlerList = [{
  title: 'Rave Digger',
  file: 'https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.mp3',
  howl: null
}, {
  title: '80s Vibe',
  file: 'https://howlerjs.com/assets/howler.js/examples/player/audio/80s_vibe.mp3',
  howl: null
}, {
  title: 'Running Out',
  file: 'https://howlerjs.com/assets/howler.js/examples/player/audio/running_out.mp3',
  howl: null
}];
const howlerSong = 'nux-howler-song';
const howlerInvisible = 'invisible';
const howlerVolume = 0.75;
let howlerPlayer;

// Player
var Player = function(playlist) {
  this.index = 0;
  this.playlist = playlist;

  // Display the title of the first track
  track.innerHTML = '1. ' + playlist[0].title;

  // Setup the playlist
  playlist.forEach(song => {
    var div = document.createElement('div');
    div.className = howlerSong;
    div.innerHTML = song.title;
    div.addEventListener('click', () => howlerPlayer.skipTo(playlist.indexOf(song)));
    list.appendChild(div);
  });
};
Player.prototype = {
  // Play
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    var data = self.playlist[index];

    // If we already loaded this track, use the current one
    // Otherwise, setup and load a new Howl
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.file],
        html5: true,
        volume: howlerVolume,
        onplay: function() {
          // Display the duration
          duration.innerHTML = self.formatTime(Math.round(sound.duration()));

          // Start updating the progress of the track
          requestAnimationFrame(self.step.bind(self));

          // PlayPause
          playBtn.classList.add(howlerInvisible);
          pauseBtn.classList.remove(howlerInvisible);
        },
        onend: function() {
          // SkipTo Next
          self.skip('next');
        },
        onseek: function() {
          // Start updating the progress of the track
          requestAnimationFrame(self.step.bind(self));
        }
      });
    }

    // Begin playing the sound
    sound.play();

    // Update the track display
    track.innerHTML = (index + 1) + '. ' + data.title;

    // Keep track of the index we are currently playing
    self.index = index;
  },

  // Pause
  pause: function() {
    var self = this;

    // Get the Howl we want to manipulate
    var sound = self.playlist[self.index].howl;

    // Pause the sound
    sound.pause();

    // PlayPause
    playBtn.classList.remove(howlerInvisible);
    pauseBtn.classList.add(howlerInvisible);
  },

  // Skip
  skip: function(direction) {
    var self = this;

    // Get the next track based on the direction of the track
    var index = 0;
    if (direction === 'prev') {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }

    self.skipTo(index);
  },

  // SkipTo
  skipTo: function(index) {
    var self = this;

    // Stop the current track
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }

    // Reset progress
    progress.style.width = '0%';

    // Play the new track
    self.play(index);
  },

  // Volume
  volume: function(val) {
    var self = this;
    Howler.volume(val);
  },

  // Seek
  seek: function(percent) {
    var self = this;

    // Get the Howl we want to manipulate
    // Convert the percent into a seek position
    var sound = self.playlist[self.index].howl;
    if (sound) {
      sound.seek(sound.duration() * percent);
      if (!sound.playing()) {

        // Play
        sound.play();

        // PlayPause
        playBtn.classList.add(howlerInvisible);
        pauseBtn.classList.remove(howlerInvisible);
      }
    }
  },

  // Step
  step: function() {
    var self = this;

    // Get the Howl we want to manipulate
    var sound = self.playlist[self.index].howl;

    // Determine our current seek position
    var seek = sound.seek() || 0;
    timer.innerHTML = self.formatTime(Math.round(seek));
    progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

    // If the sound is still playing, continue stepping
    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  },

  // FormatTime
  formatTime: function(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
};

// Setup
if (howlerList) {
  howlerPlayer = new Player(howlerList);

  // Controls
  playBtn.addEventListener('click', () => {
    howlerPlayer.play();
  });
  pauseBtn.addEventListener('click', () => {
    howlerPlayer.pause();
  });
  prevBtn.addEventListener('click', () => {
    howlerPlayer.skip('prev');
  });
  nextBtn.addEventListener('click', () => {
    howlerPlayer.skip('next');
  });
  skip.addEventListener('click', (event) => {
    const percent = (event.clientX - event.target.getBoundingClientRect().left) / event.target.offsetWidth;
    howlerPlayer.seek(percent);
  });
}
