'use client';
import { Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
const ShareUrl = () => {
  return (
    <button
      className='w-half btn btn-secondary mx-2'
      type='button'
      onClick={() => {
        navigator.clipboard.writeText(location.href);
        toast.success('Product Link Copied!');
      }}
    >
      <Share2 />
      Share
    </button>
  );
};
export default ShareUrl;
