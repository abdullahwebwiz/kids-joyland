'use client';
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Rating,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { Product } from '@/lib/models/ProductModel';
import useSWRMutation from 'swr/mutation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
const FeedbackDialog = ({
  productId,
  addReviewToParent,
}: {
  productId: any;
  addReviewToParent: any;
}) => {
  const { data: session }: any = useSession();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(session?.user.name);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/products/addReview`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      addReviewToParent({ name, comment, stars: rating });
      setOpen(false);
      toast.success('Product updated successfully');
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  const formSubmit = async (formData: any) => {
    await updateProduct(formData);
  };

  useEffect(() => {
    setValue('name', session?.user.name);
    // @ts-ignore
    setValue('pid', productId);
  }, [session, productId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (session) {
    return (
      <div>
        <Button variant='outlined' onClick={handleClickOpen}>
          Add Review
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Feedback</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(formSubmit)}>
              <TextField
                autoFocus
                margin='dense'
                label='Name'
                type='text'
                fullWidth
                variant='outlined'
                value={name}
                disabled
                onChange={(e) => {
                  setName(e.target.value);
                  setValue('name', e.target.value);
                }}
              />
              <TextField
                margin='dense'
                label='Comment'
                type='text'
                fullWidth
                variant='outlined'
                multiline
                rows={4}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  // @ts-ignore
                  setValue('comment', e.target.value);
                }}
                inputProps={{ maxLength: 100 }}
                helperText={`${comment.length}/${100}`}
              />

              <Rating
                name='simple-controlled'
                value={rating}
                onChange={(event, newValue: any) => {
                  setRating(newValue);
                  // @ts-ignore
                  setValue('stars', newValue);
                }}
                precision={0.5}
              />
              <DialogActions>
                <Button onClick={handleClose} color='primary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary'>
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return (
      <DialogActions>
        <Button color='primary'>
          <Link href={'/register'}>Sign Up</Link>
        </Button>
        <Button color='secondary'>
          <Link href={'/login'}>Log In</Link>
        </Button>
      </DialogActions>
    );
  }
};

export default FeedbackDialog;
