import { VideoHook } from 'src/video/VideoHook';
import { VideoControls } from 'src/video/VideoControls';
import 'src/video/video.scss';

interface VideoProps {
  src: string;
  id: number;
}

export function VideoPlayer({ src, id }: VideoProps) {
  const vh = VideoHook(id);
  const {
    videoRef,
    contRef,
    muted,
    timeUpdate,
    togglePlay,
    toggleFullscreen,
    loadMetaData,
  } = vh;

  return (
    <div className='video' id={'video-' + id} ref={contRef}>
      <video
        id={'video_player-' + id}
        className='video__player'
        controls={false}
        ref={videoRef}
        muted={muted}
        onTimeUpdate={timeUpdate}
        onLoadedMetadata={loadMetaData}
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
      >
        <source type='video/mp4' src={src} />
      </video>
      <VideoControls id={id} {...vh} />
    </div>
  );
}
