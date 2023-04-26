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

const updateMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const deleteMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

export {
  getMembers, createMember, updateMember, deleteMember, getSingleMember,
};
