import { useRef } from 'react';
import 'src/video/video.select.scss';
import { VideoHook } from 'src/video/VideoHook';

interface VideoSpeedProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  contRef: React.MutableRefObject<HTMLDivElement>;
  id: number;
}

interface VideoOptionProps {
  title: string;
  val: number;
}

export function VideoSpeed({ videoRef, contRef, id }: VideoSpeedProps) {
  const d = useRef({} as HTMLDivElement);
  const { speed, changeSpeed } = VideoHook(videoRef, contRef, id);

  function VideoOption({ title, val }: VideoOptionProps) {
    return (
      <div className='video__select-option' onClick={() => changeSpeed(val)}>
        {title}
      </div>
    );
  }

  return (
    <div className='video__select'>
      <div
        className='video__select-current'
        onClick={() => d.current.classList.toggle('video__show-options')}
      >
        {speed.toPrecision(3).toString().slice(0, 4)}
      </div>
      <div className='video__select-options' ref={d}>
        <VideoOption title='0.25' val={0.25} />
        <VideoOption title='0.50' val={0.5} />
        <VideoOption title='0.75' val={0.75} />
        <VideoOption title='1.00' val={1} />
        <VideoOption title='1.25' val={1.25} />
        <VideoOption title='1.50' val={1.5} />
        <VideoOption title='1.75' val={1.75} />
        <VideoOption title='2.00' val={2} />
      </div>
    </div>
  );
}

const size = 24;

interface VideoIconProps {
  src: string;
  alt: string;
}

export function VideoIcon({ src, alt }: VideoIconProps) {
  return (
    <img
      className='video__icon'
      src={src}
      alt={alt}
      height={size}
      width={size}
    />
  );
}
interface VideoPlayJumpProps {
  play: boolean;
  togglePlay: () => void;
  jump: (jump: number) => void;
}

export function VideoPlayJump({ play, togglePlay, jump }: VideoPlayJumpProps) {
  return (
    <div className='video__play-jump'>
      <div onClick={() => jump(-15)}>
        <VideoIcon src='svg/backward.svg' alt='backward' />
      </div>
      <div onClick={() => jump(-5)}>
        <VideoIcon src='svg/small-backward.svg' alt='backward' />
      </div>
      <div onClick={togglePlay}>
        {play ? (
          <VideoIcon src='svg/play.svg' alt='play' />
        ) : (
          <VideoIcon src='svg/pause.svg' alt='pause' />
        )}
      </div>
      <div onClick={() => jump(5)}>
        <VideoIcon src='svg/small-forward.svg' alt='forward' />
      </div>
      <div onClick={() => jump(15)}>
        <VideoIcon src='svg/forward.svg' alt='forward' />
      </div>
    </div>
  );
}

interface VideoVolumeProps {
  muted: boolean;
  vol: number;
}

export function VideoVolume({ muted, vol }: VideoVolumeProps) {
  if (muted || vol === 0) return <VideoIcon src='svg/mute.svg' alt='muted' />;
  else if (vol > 66) return <VideoIcon src='svg/max-vol.svg' alt='max vol' />;
  else if (vol > 32) return <VideoIcon src='svg/mid-vol.svg' alt='mid vol' />;
  else if (vol < 34) return <VideoIcon src='svg/min-vol.svg' alt='min vol' />;
  else return <VideoIcon src='svg/mute.svg' alt='muted' />;
}

interface VideoTogFSProps {
  fs: boolean;
  toggleFullscreen: () => void;
}

export function VideoTogFS({ fs, toggleFullscreen }: VideoTogFSProps) {
  return (
    <div className='video__fullscreen' onClick={toggleFullscreen}>
      {!fs ? (
        <VideoIcon src='svg/fullscreen.svg' alt='fullscreen' />
      ) : (
        <VideoIcon src='svg/exit-fullscreen.svg' alt='exit-fullscreen' />
      )}
    </div>
  );
}
