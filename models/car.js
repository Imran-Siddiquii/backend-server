import { Schema, model as _model } from 'mongoose';

const carSchema = new Schema({
  model: String,
  year: Number,
  maker: {
    type: Schema.Types.ObjectId,
    ref: 'Maker',
  },
});

const Car = _model('Car', carSchema);
export default Car;
