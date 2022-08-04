import {
  VideoPlayJump,
  VideoSpeed,
  VideoTogFS,
  VideoVolume,
} from 'src/video/VideoComps';
import 'src/video/video.timeline.scss';

interface VideoControlsProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  contRef: React.MutableRefObject<HTMLDivElement>;
  id: number;
  disable: boolean;
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
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
}

export function VideoControls({
  videoRef,
  contRef,
  id,
  disable,
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
  setDisable,
}: VideoControlsProps) {
  return (
    <div
      className='video__controls-container video__show-controls'
      id={'controls-' + id}
      onClick={() => {
        if (!disable) togglePlay();
      }}
      onDoubleClick={() => {
        if (!disable) toggleFullscreen();
      }}
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
            <VideoPlayJump
              play={play}
              togglePlay={togglePlay}
              jump={jump}
              prog={prog}
            />
            <div className='video__volume'>
              <div className='video__volume-icon' onClick={toggleMuted}>
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
            <div className='video__clock'>
              {clock}&nbsp;<strong>/</strong>&nbsp;{len}
            </div>
          </div>
          <div className='video__controls-right'>
            <VideoSpeed
              videoRef={videoRef}
              contRef={contRef}
              id={id}
              setDisable={setDisable}
            />
            <VideoTogFS fs={fs} toggleFullscreen={toggleFullscreen} />
          </div>
        </div>
      </div>
    </div>
  );
}
