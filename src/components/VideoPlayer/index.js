import React from 'react';
import ReactPlayer from 'react-player/lazy';

const VideoPlayer = (props) => {
  const { url } = props;

  return (
    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
      <ReactPlayer
        url={url}
        width='100%'
        height='100%'
        controls
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
};

export default VideoPlayer;
