import { Schema, model } from 'mongoose';

const makerSchema = new Schema({
  name: String,
  log: String,
  tagline: String,
});

const Maker = model('Maker', makerSchema);
export default Maker;
