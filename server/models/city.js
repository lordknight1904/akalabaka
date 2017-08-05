import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const citySchema = new Schema({
  value: { type: 'String', required: true, unique: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('City', citySchema);
