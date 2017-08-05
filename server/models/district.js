import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const districtSchema = new Schema({
  value: { type: 'String', required: true, unique: true },
  city : { type: Schema.Types.ObjectId, required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('District', districtSchema);
