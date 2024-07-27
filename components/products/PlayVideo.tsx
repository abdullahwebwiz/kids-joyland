'use client';
import { Share2, Video } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
const PlayVideo = ({video}:any) => {
  return (
    <button
      className='w-half btn btn-primary mx-2'
      type='button'
      onClick={() => {
        Swal.fire({
          html: `
              <div style="max-width: 100%; max-height: 100%;">
                <iframe 
                  width="100%" 
                  height="315" 
                  src="https://www.youtube.com/embed/${video}?autoplay=1"
                  frameborder="0"
                  allowfullscreen
                  style="max-width: 100%; max-height: 100%;"
                ></iframe>
              </div>
            `,
          showCloseButton: true,
          showConfirmButton: false,
        });
      }}
    >
      <Video />
      Play Video
    </button>
  );
};
export default PlayVideo;
