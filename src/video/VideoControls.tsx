import {
  VideoIcon,
  VideoSpeed,
  VideoTogFS,
  VideoVolume,
} from 'src/video/VideoComps';
import 'src/video/video.timeline.scss';

interface VideoControlsProps {
  id: number;
  play: boolean;
  prog: number;
  muted: boolean;
  progress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clock: string;
  toggleMuted: () => void;
  togglePlay: () => void;
  vol: number;
  volControl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  len: string;
  fs: boolean;
  toggleFullscreen: () => void;
  jump: (jump: number) => void;
}

export function VideoControls({
  id,
  play,
  togglePlay,
  prog,
  progress,
  clock,
  muted,
  toggleMuted,
  vol,
  volControl,
  len,
  fs,
  toggleFullscreen,
  jump,
}: VideoControlsProps) {
  return (
    <div
      className='video__controls-container video__show-controls'
      id={'controls-' + id}
    >
      <div className='video__controls-sub-cont' id={'sub-' + id}>
        <div className='video__progress'>
          <input
            type='range'
            min={0}
            max={100}
            value={prog}
            onChange={progress}
          />
        </div>
        <div className='video__controls'>
          <div className='video__controls-left'>
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
            <div className='video__volume'>
              <div className='video__mute' onClick={toggleMuted}>
                <VideoVolume muted={muted} vol={vol} />
              </div>
              <div className='video__volume-slider'>
                <input
                  type='range'
                  min={0}
                  max={100}
                  value={vol}
                  onChange={volControl}
                />
              </div>
            </div>
            <div>
              {clock}&nbsp;<strong>/</strong>&nbsp;{len}
            </div>
          </div>
          <div className='video__controls-right'>
            <VideoSpeed id={id} />
            <VideoTogFS fs={fs} toggleFullscreen={toggleFullscreen} />
          </div>
        </div>
      </div>
    </div>
  );
}
