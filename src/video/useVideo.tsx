import { useState, useEffect } from 'react';

export function useVideo(
  videoRef: React.MutableRefObject<HTMLVideoElement>,
  contRef: React.MutableRefObject<HTMLDivElement>,
  id: number
) {
  const [play, setPlay] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(true);
  const [fs, setFS] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);

  const [len, setLen] = useState<string>('00:00');
  const [clock, setClock] = useState<string>('00:00');

  const [prog, setProg] = useState<number>(0);
  const [vol, setVol] = useState<number>(80);
  const [pvol, setPVol] = useState<number>(80);
  const [speed, setSpeed] = useState<number>(1);

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
  }, [id, muted, disable, play]);

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

  function togglePlay() {
    // restarts video at 100%
    if (prog === 100) {
      setProg(0);
      videoRef.current.currentTime = 0;

      videoRef.current.play();

      return;
    }
    setPlay((prev) => (prev = !prev));
    if (play) videoRef.current.play();
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
    let time = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProg(time);
    setClock(createTimer(videoRef.current.currentTime));
  }

  function progress(e: React.ChangeEvent<HTMLInputElement>) {
    let time = Number(e.target.value);
    videoRef.current.currentTime = (videoRef.current.duration / 100) * time;
    setProg(time);
  }

  function jump(jump: number) {
    videoRef.current.currentTime = videoRef.current.currentTime + jump;
    setProg((prev) => (prev = prev + jump));
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
    disable,
    setDisable,
    muted,
    play,
    prog,
    clock,
    vol,
    len,
    setLen,
    togglePlay,
    toggleMuted,
    timeUpdate,
    progress,
    volControl,
    toggleFullscreen,
    loadMetaData,
    fs,
    jump,
    speed,
    changeSpeed,
  };
}
