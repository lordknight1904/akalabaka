import District from '../models/district';
import mongoose from 'mongoose';

export function getDistricts(req, res) {
  if (req.params.city) {
    District.find({ city: mongoose.Types.ObjectId(req.params.city) }).exec((err, districts) => {
      if (err) res.json({ districts: [] });
      else {
        res.json({ districts });
      }
    })
  } else {
    res.json({ districts: [] });
  }
}

export function createDistrict(req, res) {
  const reqDistrict= req.body.district;
  if (reqDistrict &&
    reqDistrict.hasOwnProperty('value') &&
    reqDistrict.hasOwnProperty('city')
  ) {
    const newDistrict = new District({
      value: reqDistrict.value,
      city: mongoose.Types.ObjectId(reqDistrict.city),
    });
    newDistrict.save((err) => {
      if (err) res.json({ district: 'error' });
      else {
        res.json({ district: 'success' });
      }
    })
  } else res.json({ district: 'missing inputs' });
}
