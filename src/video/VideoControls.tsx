import {
  VideoPlayJump,
  VideoSpeed,
  VideoTogFS,
  VideoVolume,
} from 'src/video/VideoComps';
import 'src/video/video.timeline.scss';
import { useEffect, useRef, useState } from 'react';

interface VideoControlsProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  contRef: React.MutableRefObject<HTMLDivElement>;
  tlRef: React.MutableRefObject<HTMLDivElement>;
  id: number;
  disable: boolean;
  play: boolean;
  tl: number;
  muted: boolean;
  timelineUpdate: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  toggleScrubbing: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
  clock: string;
  toggleMuted: () => void;
  togglePlay: () => Promise<void>;
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
  tlRef,
  id,
  disable,
  play,
  togglePlay,
  tl,
  timelineUpdate,
  toggleScrubbing,
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
  const [tlDisable, setTLDisable] = useState<boolean>(false);
  const vv = useRef({} as HTMLDivElement);

  useEffect(() => {
    const v = vv.current;

    function mo(e: MouseEvent) {
      setTLDisable(true);
    }
    v.addEventListener('mouseover', mo);

    function ml() {
      setTLDisable(false);
    }

    v.addEventListener('mouseleave', ml);

    return () => {
      v.removeEventListener('mouseover', mo);
      v.removeEventListener('mouseleave', ml);
    };
  }, [vv, disable, setDisable]);

  return (
    <div
      className='video__controls-container video__show-controls'
      id={'controls-' + id}
      onMouseDown={async () => {
        if (!disable) await togglePlay();
      }}
      onDoubleClick={() => {
        if (!disable) toggleFullscreen();
      }}
    >
      <div
        className='video__controls-sub-cont'
        id={'sub-' + id}
        onMouseMove={(e) => {
          if ((e.buttons & 1) === 1 && !tlDisable) timelineUpdate(e);
        }}
        onMouseUp={async (e) => {
          if ((e.buttons & 1) === 1 && !tlDisable) await toggleScrubbing(e);
        }}
      >
        <div
          className='video__timeline-container'
          id='timeline-container'
          ref={tlRef}
          onMouseMove={timelineUpdate}
          onMouseDown={toggleScrubbing}
        >
          <div className='video__timeline'>
            <div className='video__timeline-bubble' />
          </div>
        </div>
        <div className='video__controls'>
          <div className='video__controls-left'>
            <VideoPlayJump
              play={play}
              togglePlay={togglePlay}
              jump={jump}
              prog={tl}
            />
            <div className='video__volume' ref={vv}>
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
              tlRef={tlRef}
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
