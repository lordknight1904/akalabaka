import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  socialId: { type: 'String', default: '' },
  email: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  salt: { type: 'String', default: '' },
  name: { type: 'String', default: 'unknown' },
  imgUrl: { type: 'String', default: '' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  lastLogin: { type: 'Date', default: Date.now, required: true },

  about: { type: 'String', default: '' },
  nationality: { type: 'String', default: '' },
  gender: { type: 'String', default: 'female' },
  yearOfBirth: { type: 'String', default: '' },

  address: {
    city: { type: 'String', default: '' },
    district: { type: 'String', default: '' },
  },
  isFee: {type: 'Boolean', default: false},
  fee: { type: 'number', default: 0 },


  isStudent: {type: 'Boolean', default: false},
  reading: { type: 'String', default: '4.5' },
  speaking: { type: 'String', default: '4.5' },
  writing: { type: 'String', default: '4.5' },
  listening: { type: 'String', default: '4.5' },

  avatarUrl: { type: 'String', default: 'default_avatar.png' },
  bannerUrl: { type: 'String', default: 'default_banner.png' },

  teachingAbility: {type: 'Boolean', default: false},
  jobHistory: [{
    job: { type: 'String', required: true },
    workPlace: { type: 'String', required: true },
    from: { type: 'String', required: true },
    to: { type: 'String', required: true },
  }],
  //ng like/follow no'
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  follows: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  chatHistory: [{
    cuid: { type: 'String', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{
      userSend: { type: 'String', required: true },
      message: { type: 'String', required: true },
      new: { type: 'Boolean', default: true },
    }, { _id : false }],
  }, { _id : false }]
});

export default mongoose.model('User', userSchema);
