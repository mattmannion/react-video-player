import { useState, useEffect } from 'react';

export function useVideo(
  videoRef: React.MutableRefObject<HTMLVideoElement>,
  contRef: React.MutableRefObject<HTMLDivElement>,
  tlRef: React.MutableRefObject<HTMLDivElement>,
  id: number
) {
  const [play, setPlay] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(true);
  const [fs, setFS] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);

  const [len, setLen] = useState<string>('00:00');
  const [clock, setClock] = useState<string>('00:00');

  const [tl, setTL] = useState<number>(0);
  const [vol, setVol] = useState<number>(80);
  const [pvol, setPVol] = useState<number>(80);
  const [speed, setSpeed] = useState<number>(1);

  // event listeners
  useEffect(() => {
    if (muted) setVol(0);

    const v = document.getElementById('video-' + id)!;
    const c = document.getElementById('controls-' + id)!;
    const s = document.getElementById('sub-' + id)!;

    let timeout: NodeJS.Timeout;
    function mouseMove() {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        v.classList.add('video__hide-cursor');
        c.classList.add('video__hide-controls');
      }, 2000);

      v.classList.remove('video__hide-cursor');
      c.classList.remove('video__hide-controls');
      c.classList.remove('video__show-controls');
    }

    v.addEventListener('mousemove', mouseMove);

    function mouseOut() {
      c.classList.add('video__show-controls');
    }

    c.addEventListener('mouseout', mouseOut);

    function mouseOver() {
      c.classList.add('video__over-controls');
      if (!disable) setDisable(true);
    }

    s.addEventListener('mouseover', mouseOver);

    function mouseLeave() {
      c.classList.remove('video__over-controls');
      if (disable) setDisable(false);
    }

    s.addEventListener('mouseleave', mouseLeave);

    if (play) c.classList.add('video__over-controls');
    else if (!play) c.classList.remove('video__over-controls');

    return () => {
      v.removeEventListener('mousemove', mouseMove);
      c.removeEventListener('mouseout', mouseOut);
      s.removeEventListener('mousemove', mouseOver);
      s.removeEventListener('mouseleave', mouseLeave);
      clearTimeout(timeout);
    };
  }, [id, muted, disable, play, tl]);

  function toggleMuted() {
    setMuted((prev) => (prev = !prev));
    videoRef.current.muted = muted;

    if (!muted) {
      setPVol(vol);
      setVol(0);
    } else setVol(pvol);
  }

  function volControl(e: React.ChangeEvent<HTMLInputElement>) {
    videoRef.current.volume = Number(e.target.value) / 100;
    setVol(videoRef.current.volume * 100);
    if (vol > 0) setMuted(false);
  }

  async function togglePlay() {
    // restarts video at 100%
    if (tl === 1) {
      setTL(0);
      videoRef.current.currentTime = 0;

      await videoRef.current.play();

      return;
    }
    setPlay((prev) => (prev = !prev));
    if (play) await videoRef.current.play();
    else videoRef.current.pause();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      contRef.current.requestFullscreen();
      setFS(true);
    } else {
      document.exitFullscreen();
      setFS(false);
    }
  }

  function createTimer(time: number): string {
    if (!time) time = 0;
    let m = String(Math.round((time / 60) % 60)).padStart(2, '00');
    let s = String(Math.round(time % 60)).padStart(2, '00');
    return m + ':' + s;
  }

  function timeUpdate() {
    setTL(videoRef.current.currentTime / videoRef.current.duration);
    setClock(createTimer(videoRef.current.currentTime));

    tlRef.current.style.setProperty(
      '--progress-position',
      (videoRef.current.currentTime / videoRef.current.duration).toString()
    );
  }

  function timelineUpdate(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const r = tlRef.current.getBoundingClientRect();
    const p = Math.min(Math.max(0, e.clientX - r.x), r.width) / r.width;

    tlRef.current.style.setProperty('--preview-position', p.toString());

    if ((e.buttons & 1) === 1) {
      e.preventDefault();
      tlRef.current.style.setProperty('--progress-position', p.toString());
      videoRef.current.currentTime = p * videoRef.current.duration;
      setPlay(true);
      setDisable(true);
    }
  }

  async function toggleScrubbing(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const r = tlRef.current.getBoundingClientRect();
    const p = Math.min(Math.max(0, e.clientX - r.x), r.width) / r.width;

    tlRef.current.style.setProperty('--progress-position', p.toString());

    if ((e.buttons & 1) === 1) {
      videoRef.current.currentTime = p * videoRef.current.duration;
      videoRef.current.pause();
      setPlay(true);
      setDisable(true);
    } else {
      setDisable(true);
    }
  }

  function jump(jump: number) {
    videoRef.current.currentTime = videoRef.current.currentTime + jump;
    setTL((prev) => (prev = prev + jump));
  }

  function loadMetaData() {
    setLen(createTimer(videoRef.current.duration));
  }

  function changeSpeed(val: number) {
    setSpeed(val);
    videoRef.current.playbackRate = val;
  }

  return {
    videoRef,
    contRef,
    tlRef,
    disable,
    setDisable,
    muted,
    play,
    tl,
    clock,
    vol,
    len,
    setLen,
    togglePlay,
    toggleMuted,
    timeUpdate,
    timelineUpdate,
    toggleScrubbing,
    volControl,
    toggleFullscreen,
    loadMetaData,
    fs,
    jump,
    speed,
    changeSpeed,
  };
}
