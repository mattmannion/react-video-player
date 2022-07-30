import { createRoot } from 'react-dom/client';
import { VideoPlayer } from 'src/video/VideoPlayer';
import 'src/scss/_main/main.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<Main />);

function Main() {
  return (
    <div>
      <div className='main'>
        <VideoPlayer src='/videos/lol.mp4' id={1} />
        <VideoPlayer src='/videos/MemeFeedBot.mp4' id={2} />
      </div>
    </div>
  );
}
