//configure the library of musckit
document.addEventListener('musickitloaded', function() {
  // MusicKit global is now defined
  MusicKit.configure({
    developerToken: 'DEVELOPER-TOKEN',
    app: {
      name: 'My Cool Web App',
      build: '1978.4.1'
    }
  });
});
//Embedding MusicKit JS in Your Webpage 
<script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"></script>

let music = MusicKit.getInstance();

// This is called with or without authorization: 
music.player.play();


// This ensures user authorization before calling play():
music.authorize().then(function() {
  music.player.play();
});

// You can wrap any method to ensure authorization before calling:
music.authorize().then(function() {
  music.api.library.albums.then(function(cloudAlbums) {
    // user's cloudAlbums
  });
});

// https://developer.apple.com/videos/play/wwdc2022/10148/
// source link

