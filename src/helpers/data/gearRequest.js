import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/gear.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const gear = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          gear.push(res.data[key]);
        });
      }
      resolve(gear);
    })
    .catch(err => reject(err));
});

const deleteGear = gearId => axios.delete(`${firebaseUrl}/gear/${gearId}.json`);

const postGear = gear => axios.post(`${firebaseUrl}/gear.json`, gear);

export default {
  getRequest,
  deleteGear,
  postGear,
};
