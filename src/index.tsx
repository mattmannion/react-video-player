import { createRoot } from 'react-dom/client';
import { VideoPlayer } from 'src/video/VideoPlayer';
import 'src/scss/_main/main.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<Main />);

function Main() {
  return (
    <div>
      <div className='main'>
        <VideoPlayer src='http://localhost:7890/api/videos/lol.mp4' id={1} />
      </div>
    </div>
  );
}
