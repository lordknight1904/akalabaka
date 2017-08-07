import User from '../models/user';
import bcrypt from 'bcrypt';
import cuid from 'cuid';
import jwt from 'jsonwebtoken';
import fs from 'fs-extra';
import mongoose from 'mongoose';

function generateToken(user) {
  const u = {
    email: user.email,
    _id: user.id,
  };
  return jwt.sign(u, 'anskjbcja', {
    expiresIn: 60 * 60 * 0.5 // expires in 12 hours
  });
}
export function authUser (req, res) {
  const query = { email: req.body.userInfo.email };
  const update  = {
    token : req.body.userInfo.token,
    name: req.body.userInfo.name,
    imgUrl: req.body.userInfo.imgUrl,
    socialId: req.body.userInfo.socialId,
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  User.findOneAndUpdate(query, update, options, (error, user) => {
    if (error) res.json({user: {code: 'fail', error}});
    else {
      const response = {
        id: user._id,
        socialId: req.body.userInfo.socialId,
        email: req.body.userInfo.email,
        token : req.body.userInfo.token,
        name: req.body.userInfo.name,
        imgUrl: req.body.userInfo.imgUrl,

        about: user.about,
        gender: user.gender,
        yearOfBirth: user.yearOfBirth,
        nationality: user.nationality,

        likes: user.likes,
        follows: user.follows,

        isStudent: user.isStudent,
        reading: user.reading,
        writing: user.writing,
        listening: user.listening,
        speaking: user.speaking,

        address: user.address,
        fee: user.fee,
        isFee: user.isFee,

        avatarUrl: user.imgUrl ? user.imgUrl : '',
        bannerUrl: user.bannerUrl,

        teachingAbility: user.teachingAbility,
        jobHistory: user.jobHistory,

        chatHistory: user.chatHistory ? user.chatHistory : [],
      };
      res.json({user: {code: 'success', user: response }});
    }
  });
}
export function createUser (req, res) {
  const reqUser = req.body.user;
  if( reqUser.hasOwnProperty('email') && reqUser.hasOwnProperty('password') ){
    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash(reqUser.password, salt).then((password) => {
        const newUser = new User({
          email: reqUser.email,
          password: password,
          salt: salt,
          socialId: '',
        });
        newUser.save((err, user) => {
          if(err) res.json({user: {code: 'error', err}});
          else{
            res.json({user: {code: 'success', user}});
          }
        });
      });
    });
  } else {
    res.json({user: {code: 'error', err: 'missing inputs'}});
  }
}

export function login(req, res) {
  const reqUser = req.body.user ? req.body.user : '';
  if (reqUser.hasOwnProperty('email') && reqUser.email && reqUser.hasOwnProperty('password') && reqUser.password ) {
    User.findOne({ email: reqUser.email })
      .populate('chatHistory.members', ['_id', 'name', 'avatarUrl'])
      .exec((err, user) => {
      if (err) {
        res.json({ user: err });
      } else {
        if (user !== null) {
          bcrypt.compare(reqUser.password, user.password, (err2, result) => {
            if (err2) res.json({ user: {code: 'Wrong password', err: err2}});
            else {
              if (result) {
                const token = generateToken(user);
                const response = {
                  id: user._id,
                  email: user.email,
                  name: user.name,
                  imgUrl: user.imgUrl,
                  socialId: user.socialId,
                  token,
                  about: user.about,
                  gender: user.gender,
                  yearOfBirth: user.yearOfBirth,
                  nationality: user.nationality,

                  likes: user.likes,
                  follows: user.follows,

                  isStudent: user.isStudent,
                  reading: user.reading,
                  writing: user.writing,
                  listening: user.listening,
                  speaking: user.speaking,

                  address: user.address,
                  fee: user.fee,
                  isFee: user.isFee,

                  avatarUrl: user.avatarUrl,
                  bannerUrl: user.bannerUrl,

                  teachingAbility: user.teachingAbility,
                  jobHistory: user.jobHistory,

                  chatHistory: user.chatHistory ? user.chatHistory : [],
                };
                User.findOneAndUpdate({ email: reqUser.email }, { lastLogin: Date.now() }).exec((err3) => {
                  if (err3) {
                    res.json({ user: err3 });
                  } else {
                    res.json({ user: {code: 'success', user: response}});
                  }
                });
              } else {
                res.json({ user: { code: 'Wrong password' } });
              }
            }
          });
        } else {
          res.json({ user: { code: 'Invalid email' } });
        }
      }
    });
  }
}

export function relogin(req, res) {
  if (req.headers.token && req.headers.token != 'undefined')
    jwt.verify(req.headers.token, 'anskjbcja', (err, token) => {
      if (err) {
        res.json({user: 'none'});
      } else {
        User.findOne({ _id: token._id })
          .populate('chatHistory.members', ['_id', 'name', 'avatarUrl'])
          .exec((err, user) => {
          if (err) {
            res.json({user: err});
          } else {
            if (user) {
              const token = generateToken(user);
              const response = {
                id: user._id,
                email: user.email,
                name: user.name,
                imgUrl: user.imgUrl,
                socialId: user.socialId,
                token,
                about: user.about,
                gender: user.gender,
                yearOfBirth: user.yearOfBirth,
                nationality: user.nationality,
                likes: user.likes,
                follows: user.follows,

                isFee: user.isFee,
                fee: user.fee,
                address: user.address,

                isStudent: user.isStudent,
                reading: user.reading,
                writing: user.writing,
                listening: user.listening,
                speaking: user.speaking,

                avatarUrl: user.avatarUrl,
                bannerUrl: user.bannerUrl,

                teachingAbility: user.teachingAbility,
                jobHistory: user.jobHistory,

                chatHistory: user.chatHistory ? user.chatHistory : [],
              };
              res.json({user: response});
            } else res.json({user: 'none'});
          }
        });
      }
    });
  else res.json({user: 'none'});
}
export function updateJob(req, res) {
  const jobHistory = req.body.jobHistory;
  if (jobHistory.hasOwnProperty('id') && jobHistory.id &&
    jobHistory.hasOwnProperty('job') && jobHistory.job &&
    jobHistory.hasOwnProperty('workPlace') && jobHistory.workPlace &&
    jobHistory.hasOwnProperty('from') && jobHistory.from &&
    jobHistory.hasOwnProperty('to') && jobHistory.to
  ) {
    User.findOneAndUpdate({ _id: jobHistory.id },
      { $push:
        { jobHistory: {
          job: jobHistory.job,
          workPlace: jobHistory.workPlace,
          from: jobHistory.from,
          to: jobHistory.to
        }
        }
      },
      {new: true}
    ).exec((err2, user) => {
      if (err2) res.json({ user: { code: 'unable' }});
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  }
}

export function updateAbout(req, res) {
  const reqAbout = req.body.about;
  if (reqAbout.hasOwnProperty('id') && reqAbout.id &&
    reqAbout.hasOwnProperty('about') && reqAbout.about
  ) {
    User.findOneAndUpdate({ _id: reqAbout.id },
      { about: reqAbout.about, },
      {new: true}
    ).exec((err2, user) => {
      if (err2) res.json({ user: { code: 'unable' }});
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  } else res.json({ user: { code: 'unable' }});
}
export function updateStudent(req, res) {
  const reqAbout = req.body.isStudent;
  if (reqAbout.hasOwnProperty('id') && reqAbout.id &&
    reqAbout.hasOwnProperty('isStudent')
  ) {
    User.findOneAndUpdate({ _id: reqAbout.id },
      { isStudent: reqAbout.isStudent, },
      { new: true, projection: { password: 0, salt: 0 } }
    ).exec((err2, user) => {
      if (err2){ res.json({ user: { code: 'unable' }});}
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  } else res.json({ user: { code: 'unable' }});
}
export function updateTeaching(req, res) {
  const reqAbout = req.body.teachingAbility;
  if (reqAbout.hasOwnProperty('id') && reqAbout.id &&
    reqAbout.hasOwnProperty('teachingAbility')
  ) {
    User.findOneAndUpdate({ _id: reqAbout.id },
      { teachingAbility: reqAbout.teachingAbility, },
      {new: true, projection: { password: 0, salt: 0 } }
    ).exec((err2, user) => {
      if (err2) res.json({ user: { code: 'unable' }});
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  } else res.json({ user: { code: 'unable' }});
}

export function updateName(req, res) {
  const reqName = req.body.name;
  if (reqName.hasOwnProperty('id') && reqName.id &&
    reqName.hasOwnProperty('name')
  ) {
    User.findOneAndUpdate({ _id: reqName.id },
      { name: reqName.name, },
      {new: true, projection: { password: 0, salt: 0 } }
    ).exec((err2, user) => {
      if (err2) res.json({ user: { code: 'unable' }});
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  } else res.json({ user: { code: 'unable' }});
}
export function updateNationality(req, res) {
  const reqNationality = req.body.nationality;
  if (reqNationality.hasOwnProperty('id') && reqNationality.id &&
    reqNationality.hasOwnProperty('nationality')
  ) {
    User.findOneAndUpdate({ _id: reqNationality.id },
      { nationality: reqNationality.nationality, },
      {new: true, projection: { password: 0, salt: 0 } }
    ).exec((err2, user) => {
      if (err2) res.json({ user: { code: 'unable' }});
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  } else res.json({ user: { code: 'unable' }});
}
export function updateGender(req, res) {
  const reqGender = req.body.gender;
  if (reqGender.hasOwnProperty('id') && reqGender.id &&
    reqGender.hasOwnProperty('gender')
  ) {
    User.findOneAndUpdate({ _id: reqGender.id },
      { gender: reqGender.gender, },
      {new: true, projection: { password: 0, salt: 0 } }
    ).exec((err2, user) => {
      if (err2) res.json({ user: { code: 'unable' }});
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  } else res.json({ user: { code: 'unable' }});
}
export function updateYearOfBirth(req, res) {
  const reqYearOfBirth = req.body.yearOfBirth;
  if (reqYearOfBirth.hasOwnProperty('id') && reqYearOfBirth.id &&
    reqYearOfBirth.hasOwnProperty('yearOfBirth')
  ) {
    User.findOneAndUpdate({ _id: reqYearOfBirth.id },
      { yearOfBirth: reqYearOfBirth.yearOfBirth, },
      {new: true, projection: { password: 0, salt: 0 } }
    ).exec((err2, user) => {
      if (err2) res.json({ user: { code: 'unable' }});
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  } else res.json({ user: { code: 'unable' }});
}
export function updateMarks(req, res) {
  const reqMarks = req.body.marks;
  if (reqMarks.hasOwnProperty('id') && reqMarks.id &&
    reqMarks.hasOwnProperty('reading') &&
    reqMarks.hasOwnProperty('listening') &&
    reqMarks.hasOwnProperty('writing') &&
    reqMarks.hasOwnProperty('speaking')
  ) {
    User.findOneAndUpdate({ _id: reqMarks.id },
      { reading: reqMarks.reading, listening: reqMarks.listening, writing: reqMarks.writing, speaking: reqMarks.speaking, },
      { new: true, projection: { password: 0, salt: 0 } }
    ).exec((err2, user) => {
      if (err2) res.json({ user: { code: 'unable', err: err2 }});
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  } else res.json({ user: { code: 'unable' }});
}

export function uploadAvatar(req, res) {
  const reqFile = req.body.file;
  if (reqFile.hasOwnProperty('base64image') && reqFile.base64image && reqFile.hasOwnProperty('id') && reqFile.id ) {
    const ext = reqFile.base64image.split(';')[0].match(/jpeg|png|gif/)[0];
    const data = reqFile.base64image.replace(/^data:image\/\w+;base64,/, "");
    const buf = new Buffer(data, 'base64');
    const imageName = reqFile.id + '_' + cuid();
    fs.writeFile('public/images/'+ imageName + "." + ext, buf, function(err) {
      if(err) res.json({ user: 'err' });
      else{
        User.findOneAndUpdate({ _id: reqFile.id }, { avatarUrl: `${imageName}.${ext}` }, { new: true }).exec((err, user) => {
          if (err) {
            res.json({ user: err });
          } else {
            res.json({ user: { code: 'success', user } });
          }
        });
      }
    });
  } else {
    res.json({ user: { err: 'Image Upload Error' }});
  }
}

export function uploadBanner(req, res) {
  const reqFile = req.body.file;
  if (reqFile.hasOwnProperty('base64image') && reqFile.base64image && reqFile.hasOwnProperty('id') && reqFile.id ) {
    const ext = reqFile.base64image.split(';')[0].match(/jpeg|png|gif/)[0];
    const data = reqFile.base64image.replace(/^data:image\/\w+;base64,/, "");
    const buf = new Buffer(data, 'base64');
    const imageName = reqFile.id + '_' + cuid();
    fs.writeFile('public/images/'+ imageName + "." + ext, buf, function(err) {
      if(err) res.json({ user: 'err' });
      else{
        User.findOneAndUpdate({ _id: reqFile.id }, { bannerUrl: `${imageName}.${ext}` }, { new: true }).exec((err, user) => {
          if (err) {
            res.json({ user: err });
          } else {
            res.json({ user: { code: 'success', user } });
          }
        });
      }
    });
  } else {
    res.json({ user: { err: 'Image Upload Error' }});
  }
}
export function updateAddress(req, res) {
  const reqAddress = req.body.address;
  if (reqAddress &&
    reqAddress.hasOwnProperty('id') && reqAddress.id &&
    reqAddress.hasOwnProperty('city') && reqAddress.city &&
    reqAddress.hasOwnProperty('district') && reqAddress.district
  ) {
    User.findOneAndUpdate({ _id: reqAddress.id },
      { 'address.city': reqAddress.city, 'address.district': reqAddress.district },
      { new: true, projection: { password: 0, salt: 0 } }
    ).exec((err2, user) => {
      if (err2) res.json({ user: { code: 'unable', err: err2 }});
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  } else res.json({ user: { code: 'unable' }});
}
export function updateFee(req, res) {
  const reqFee = req.body.fee;
  if (reqFee &&
    reqFee.hasOwnProperty('id') && reqFee.id &&
    reqFee.hasOwnProperty('isFee') &&
    reqFee.hasOwnProperty('fee')
  ) {
    User.findOneAndUpdate({ _id: reqFee.id },
      { fee: reqFee.fee, isFee: reqFee.isFee },
      { new: true, projection: { password: 0, salt: 0 } }
    ).exec((err2, user) => {
      if (err2) res.json({ user: { code: 'unable', err: err2 }});
      else {
        res.json({  user: { code: 'success', user }});
      }
    });
  } else res.json({ user: { code: 'unable' }});
}

export function search(req, res){
  const name = (req.query.name !== undefined && req.query.name !== '') ? new RegExp(`^${req.query.name}`, 'i') : new RegExp('.*', 'i');
  const city = (req.query.city !== undefined && req.query.city !== '') ? new RegExp(`^${req.query.city}`, 'i') : new RegExp('.*', 'i');
  const district = (req.query.district !== undefined && req.query.district !== '') ? new RegExp(`^${req.query.district}`, 'i') : new RegExp('.*', 'i');
  const fee = (req.query.fee !== undefined && req.query.fee !== '' && req.query.fee !== 'none') ? req.query.fee : 0;
  const page = (req.query.page !== undefined && req.query.page !== '' && req.query.page !== 'none') ? req.query.page : 1;
  const isFee = (fee > 0) ? false : 'every';
  User.aggregate([
    { $match:
      {
        'address.city': city,
        'address.district': district,
        name: name,
        fee: {$gte: Number(fee) * 1000},
        isFee: {$ne: isFee},
      },
    },
    {   $group:
      {
        _id: {
          _id: '$_id',
          name: '$name',
          about: '$about',
          address: '$address',
          imgUrl: '$imgUrl',
          avatarUrl: '$avatarUrl',
          likes: '$likes',
          follows: '$follows',
          reading: '$reading',
          speaking: '$speaking',
          writing: '$writing',
          listening: '$listening',
          count: '$count',
          point: { $sum: [ { "$size": "$likes" }, { "$size": "$follows" } ]}
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { point: 1 } },
    { $skip: Number(page - 1) * 10 },
    { $limit: 10 },
    {
      $group: {
        _id: null,
        count: { "$sum": 1 },
        users: { $push: "$_id" }
      }
    },
  ]).exec((err, user) => {
    if (err) res.json({ user: [] });
    else {
      res.json({user});
    }
  })
}
export function getChat(req, res) {
  res.json({ return: 'return' });
}
export function readMessage(req, res) {
  const reqRead = req.body.read;
  if (reqRead &&
    reqRead.hasOwnProperty('id') && reqRead.id &&
    reqRead.hasOwnProperty('cuid') && reqRead.cuid
  ) {
    User.findOne({ _id: reqRead.id})
      .populate('chatHistory.members', ['_id', 'name', 'avatarUrl'])
      .exec((err, user) => {
        if (err) res.json({ read: 'error' });
        else {
          const chatHistory = user.chatHistory.filter((his) => {
            return his.cuid === reqRead.cuid;
          })[0];
          for (let i = chatHistory.messages.length-1; i >= 0; i--) {
            if (chatHistory.messages[i].new) {
              chatHistory.messages[i].new = false;
            } else {
              break;
            }
          }
          user.save((err2, user) => {
            if (err2) res.json({ read: 'error' });
            else {
              res.json({ read: user.chatHistory.filter((his) => { return his.cuid === reqRead.cuid; })[0] });
            }
          });
        }
      });
  }
}
export function like(req, res) {
  const reqLike = req.body.like;
  if (reqLike &&
    reqLike.hasOwnProperty('id') && reqLike.id &&
    reqLike.hasOwnProperty('userId') && reqLike.userId
  ) {
    User.findOneAndUpdate({ _id: reqLike.userId }, { $addToSet : { likes: reqLike.id } }, { upsert: true, new: true }).exec((err, user) => {
      if (err) {
        res.json({ user: { code: 'err' }});
      } else {
        res.json({ user: { code: 'success', likes: user.likes }});
      }
    });
  }else {
    res.json({ user: { code: 'error', likes: 'Missing inputs' }});
  }
}
export function unlike(req, res) {
  const reqLike = req.body.like;
  if (reqLike &&
    reqLike.hasOwnProperty('id') && reqLike.id &&
    reqLike.hasOwnProperty('userId') && reqLike.userId
  ) {
    User.findOneAndUpdate({ _id: reqLike.userId }, { $pull : { likes: reqLike.id } }, { upsert: true, new: true }).exec((err, user) => {
      if (err) res.json({ user: { code: 'err' }});
      else {
        res.json({ user: { code: 'success', likes: user.likes }});
      }
    });
  }
}
export function follow(req, res) {
  const reqFollow = req.body.follow;
  if (reqFollow &&
    reqFollow.hasOwnProperty('id') && reqFollow.id &&
    reqFollow.hasOwnProperty('userId') && reqFollow.userId
  ) {
    User.findOneAndUpdate({ _id: reqFollow.userId }, { $addToSet : { follows: reqFollow.id } }, { upsert: true, new: true }).exec((err, user) => {
      if (err) res.json({ user: { code: 'err' }});
      else {
        res.json({ user: { code: 'success', follows: user.follows }});
      }
    });
  }
}
export function unfollow(req, res) {
  const reqFollow = req.body.follow;
  if (reqFollow &&
    reqFollow.hasOwnProperty('id') && reqFollow.id &&
    reqFollow.hasOwnProperty('userId') && reqFollow.userId
  ) {
    User.findOneAndUpdate({ _id: reqFollow.userId }, { $pull : { follows: reqFollow.id } }, { upsert: true, new: true }).exec((err, user) => {
      if (err) res.json({ user: { code: 'err' }});
      else {
        res.json({ user: { code: 'success', follows: user.follows }});
      }
    });
  }
}
export function getUser(req, res) {
  User.findOne(
    { _id: req.params.id },
    { _id: 1, email: 1, name: 1, imgUrl: 1, socialId: 1, about: 1, gender: 1, yearOfBirth: 1, nationality: 1, likes: 1, follows: 1,
      isStudent: 1, reading: 1, writing: 1, listening: 1, speaking: 1, address: 1, fee: 1, isFee: 1, avatarUrl: 1, bannerUrl: 1,
      teachingAbility: 1, jobHistory: 1, chatHistory: 1 },
  ).exec((err, user) => {
    if (err) { res.send({ user: 'error' }); }
    else {
      res.send({ user });
    }
  });
}
