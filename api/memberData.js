import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMembers = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createMember = (memberObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberObj),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const updateMember = (memberObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${memberObj.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberObj),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const deleteMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${firebaseKey}.json`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => resolve('Successfully Deleted'))
    .catch((error) => reject(error));
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${firebaseKey}.json`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

export {
  getMembers, createMember, updateMember, deleteMember, getSingleMember,
};
