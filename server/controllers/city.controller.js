import City from '../models/city';

export function getCities(req, res) {
  City.find({}).exec((err, cities) => {
    if (err) res.json({ cities: [] });
    else {
      res.json({ cities });
    }
  })
}
export function createCity(req, res) {
  const reqCity = req.body.city;
  if (reqCity && reqCity.hasOwnProperty('value')) {
    const newCity = new City({
      value: reqCity.value,
    });
    newCity.save((err) => {
      if (err) res.json({ city: err });
      else {
        res.json({ city: 'success' });
      }
    })
  } else res.json({ city: 'missing inputs' });
}
