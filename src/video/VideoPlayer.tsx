import { useRef } from 'react';
import { useVideo } from 'src/video/useVideo';
import { VideoControls } from 'src/video/VideoControls';
import 'src/video/video.scss';

interface VideoProps {
  src: string;
  id: number;
}

export function VideoPlayer({ src, id }: VideoProps) {
  const videoRef = useRef({} as HTMLVideoElement);
  const contRef = useRef({} as HTMLDivElement);
  const tlRef = useRef({} as HTMLDivElement);

  const vh = useVideo(videoRef, contRef, tlRef, id);
  const { muted, timeUpdate, loadMetaData } = vh;

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
      >
        <source type='video/mp4' src={src} />
      </video>
      <VideoControls id={id} {...vh} />
    </div>
  );
}
