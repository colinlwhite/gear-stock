import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/gear.json`)
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

export default { getRequest };
