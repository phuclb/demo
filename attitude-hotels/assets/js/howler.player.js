/* HowlerJS */

// Path
const invisible = 'invisible';

// Elements
const howlerElements = ['track', 'timer', 'duration', 'playBtn', 'pauseBtn', 'prevBtn', 'nextBtn', 'playlistBtn', 'volumeBtn', 'bar', 'progress', 'skip', 'loading', 'playlist', 'list', 'volume', 'barEmpty', 'barFull', 'sliderBtn'];
howlerElements.forEach(function(element) {
  window[element] = document.getElementById(element);
});

/**
 * Player class containing the state of our playlist and where we are in it.
 * Includes all methods for playing, skipping, updating the display, etc.
 * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
 */
var Player = function(playlist) {
  this.playlist = playlist;
  this.index = 0;

  // Display the title of the first track.
  track.innerHTML = '1. ' + playlist[0].title;

  // Setup the playlist display.
  playlist.forEach(function(song) {
    var div = document.createElement('div');
    div.className = 'nux-howler-song';
    div.innerHTML = song.title;
    div.onclick = function() {
      player.skipTo(playlist.indexOf(song));
    };
    list.appendChild(div);
  });
};
Player.prototype = {
  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    var data = self.playlist[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.file],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: function() {
          // Display the duration.
          duration.innerHTML = self.formatTime(Math.round(sound.duration()));

          // Start updating the progress of the track.
          requestAnimationFrame(self.step.bind(self));

          // PlayPause
          playBtn.classList.add(invisible);
          pauseBtn.classList.remove(invisible);
        },
        onload: function() {
          loading.style.display = 'none';
        },
        onend: function() {
          self.skip('next');
        },
        onpause: function() {
        },
        onstop: function() {
        },
        onseek: function() {
          // Start updating the progress of the track.
          requestAnimationFrame(self.step.bind(self));
        }
      });
    }

    // Begin playing the sound.
    sound.play();

    // Update the track display.
    track.innerHTML = (index + 1) + '. ' + data.title;

    // PlayPause
    /*
    if (sound.state() === 'loaded') {
      playBtn.classList.add(invisible);
      pauseBtn.classList.remove(invisible);
    } else {
      loading.style.display = 'block';
      playBtn.classList.add(invisible);
      pauseBtn.classList.add(invisible);
    }
    */

    // Keep track of the index we are currently playing.
    self.index = index;
  },

  /**
   * Pause the currently playing track.
   */
  pause: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Pause the sound.
    sound.pause();

    // PlayPause
    playBtn.classList.remove(invisible);
    pauseBtn.classList.add(invisible);
  },

  /**
   * Skip to the next or previous track.
   * @param  {String} direction 'next' or 'prev'.
   */
  skip: function(direction) {
    var self = this;

    // Get the next track based on the direction of the track.
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

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  skipTo: function(index) {
    var self = this;

    // Stop the current track.
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }

    // Reset progress.
    progress.style.width = '0%';

    // Play the new track.
    self.play(index);
  },

  /**
   * Set the volume and update the volume slider display.
   * @param  {Number} val Volume between 0 and 1.
   */
  volume: function(val) {
    var self = this;

    // Update the global volume (affecting all Howls).
    Howler.volume(val);

    // Update the display on the slider.
    var barWidth = (val * 90) / 100;
    barFull.style.width = (barWidth * 100) + '%';
    sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
  },

  /**
   * Seek to a new position in the currently playing track.
   * @param  {Number} per Percentage through the song to skip.
   */
  seek: function(per) {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Convert the percent into a seek position.
    if (sound) {
      sound.seek(sound.duration() * per);
      if (!sound.playing()) {
        sound.play();

        // PlayPause
        playBtn.classList.add(invisible);
        pauseBtn.classList.remove(invisible);
      }
    }
  },

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  step: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Determine our current seek position.
    var seek = sound.seek() || 0;
    timer.innerHTML = self.formatTime(Math.round(seek));
    progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  },

  /**
   * Toggle the playlist display on/off.
   */
  togglePlaylist: function() {
    var self = this;
    playlist.style.display = (playlist.style.display === 'block') ? 'none' : 'block';
  },

  /**
   * Toggle the volume display on/off.
   */
  toggleVolume: function() {
    var self = this;
    volume.style.display = (volume.style.display === 'block') ? 'none' : 'block';
  },

  /**
   * Format the time from seconds to M:SS.
   * @param  {Number} secs Seconds to format.
   * @return {String}      Formatted time.
   */
  formatTime: function(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
};

// Setup our new audio player class and pass it the playlist.
var player = new Player([{
    title: 'Rave Digger',
    file: 'https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.mp3',
    howl: null
  }, {
    title: '80s Vibe',
    file: 'https://howlerjs.com/assets/howler.js/examples/player/audio/80s-vibe.mp3',
    howl: null
  }, {
    title: 'Running Out',
    file: 'https://howlerjs.com/assets/howler.js/examples/player/audio/running-out.mp3',
    howl: null
  }
]);

// Controls
playBtn.addEventListener('click', function() {
  player.play();
});
pauseBtn.addEventListener('click', function() {
  player.pause();
});
prevBtn.addEventListener('click', function() {
  player.skip('prev');
});
nextBtn.addEventListener('click', function() {
  player.skip('next');
});
skip.addEventListener('click', function(event) {
  const per = (event.clientX - this.getBoundingClientRect().left) / this.offsetWidth;
  player.seek(per);
});
playlist.addEventListener('click', function() {
  player.togglePlaylist();
});
playlistBtn.addEventListener('click', function() {
  player.togglePlaylist();
});
volume.addEventListener('click', function() {
  player.toggleVolume();
});
volumeBtn.addEventListener('click', function() {
  player.toggleVolume();
});

// Volume Slider
barEmpty.addEventListener('click', function(event) {
  var per = event.layerX / parseFloat(barEmpty.scrollWidth);
  player.volume(per);
});
sliderBtn.addEventListener('mousedown', function() {
  window.sliderDown = true;
});
sliderBtn.addEventListener('touchstart', function() {
  window.sliderDown = true;
});
volume.addEventListener('mouseup', function() {
  window.sliderDown = false;
});
volume.addEventListener('touchend', function() {
  window.sliderDown = false;
});

// Volume Move
var volumeMove = function(event) {
  if (window.sliderDown) {
    var x = event.clientX || event.touches[0].clientX;
    var startX = window.innerWidth * 0.05;
    var layerX = x - startX;
    var per = Math.min(1, Math.max(0, layerX / parseFloat(barEmpty.scrollWidth)));
    player.volume(per);
  }
};
volume.addEventListener('mousemove', volumeMove);
volume.addEventListener('touchmove', volumeMove);

// Volume Resize
var volumeResize = function() {
  var width = window.innerWidth;
  var height = window.innerHeight * 0.3;
  var sound = player.playlist[player.index].howl;
  if (sound) {
    var vol = sound.volume();
    var barWidth = (vol * 0.9);
    sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
  }
};
volumeResize();
window.addEventListener('resize', volumeResize);