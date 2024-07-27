'use client';
import { useEffect, useState } from 'react';
import FeedbackDialog from './FormAlert';
import { Rating } from '@mui/material';

export const Review = ({
  reviews,
  productId,
}: {
  reviews: any;
  productId: any;
}) => {
  let [reviewsList, setReviewsList] = useState(reviews ? reviews : null);
  const addReviewToParent = (x: any) => {
    setReviewsList([...reviewsList, x]);
  };

  return (
    <>
      {' '}
      <div className='m-10'>
        {' '}
        <div className='flex flex-col gap-8 md:flex-row'>
          <div className='flex-1 text-4xl'>Reviews</div>
          <FeedbackDialog
            productId={productId}
            addReviewToParent={addReviewToParent}
          />
        </div>
        <div className='overflow-x-auto'>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Comment</th>
                <th>Stars</th>
              </tr>
            </thead>
            <tbody>
              {reviewsList.reverse().map((d: any, i: any) => (
                <tr key={i}>
                  <td>{d.name}</td>
                  <td>{d.comment}</td>
                  <td>
                    <Rating value={d.stars} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export const ReviewSkeleton = () => {
  return <div className='skeleton h-[304px] w-full rounded-lg lg:h-[236px]' />;
};
