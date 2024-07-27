import mongoose from 'mongoose';

export type SocialMedia = {
  xid: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
};
const SocialMediaSchema = new mongoose.Schema({
  xid: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  youtube: {
    type: String,
    required: true,
  },
  tiktok: {
    type: String,
    required: true,
  },
});

const SocialMediaModel =
  mongoose.models?.SocialMedia ||
  mongoose.model('SocialMedia', SocialMediaSchema);

export default SocialMediaModel;
