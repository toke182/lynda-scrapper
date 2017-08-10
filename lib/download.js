const ytdl = require('youtube-dl');
const path = require('path');
const fs = require('fs');

let size;
let pos;
let video;

const _onError = (err) => {
	console.log('error 2:', err);
}

const _onInfo = (info) => {
	size = info.size;
	console.log('Downloading: ');
	console.log(`Filename: ${info._filename}`);

    const output = path.join(__dirname + '/', info._filename);
    video.pipe(fs.createWriteStream(output));
};

const _onData = (chunk) => {
    pos += chunk.length;
    // `size` should not be 0 here.
    if (size) {
      let percent = (pos / size * 100).toFixed(2);
      process.stdout.cursorTo(0);
      process.stdout.clearLine(1);
      process.stdout.write(percent + '%');
    }
}

const _playlist = ({url, username, password}) => {
  if (!username || !password) {
  	throw 'No username or password';
  }
  
  size = pos = 0;

  video = ytdl(url, ['-u', username, '-p', password], { maxBuffer: Infinity });
  
  // counter++;
  video
  	.on('error', _onError)
  	.on('info', _onInfo)
  	.on('data', _onData)
 	.on('next', (nextUrl) => _playlist({url: nextUrl, username, password}));
}

module.exports = (downloadData) => {
	_playlist(downloadData);		
}