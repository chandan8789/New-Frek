import AsyncStorage from '@react-native-async-storage/async-storage';
import mobile_siteConfig from './mobile-site-config';

export async function postData(data, urlPath) {
  // console.log('hello 0');
  return new Promise((resolve, reject) => {
    fetch(mobile_siteConfig.BASE_URL + urlPath, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(json => {
        // console.log('hello 1');
        if (json.response) {
          // console.log('hello 2');
          return resolve(json.response);
        } else {
          // console.log('hello 3');
          return resolve(json);
        }
      })
      .catch(error => {
        console.log(`=== ERROR === ${urlPath}`, error);
        console.log('hello 4');
        reject(error);
      });
  });
}

export async function postDataWithToken(data, urlPath) {
  let token = await AsyncStorage.getItem(
    mobile_siteConfig.MOB_ACCESS_TOKEN_KEY,
  );
  return new Promise((resolve, reject) => {
    fetch(mobile_siteConfig.BASE_URL + urlPath, {
      method: 'POST',
      mode: 'cors',
      // cache: "no-cache",
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'localhost',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        console.log(`=== ERROR === ${urlPath}`, error);
        reject(error);
      });
  });
}

export async function getData(urlPath) {
  let accessTokenKey = await AsyncStorage.getItem(
    mobile_siteConfig.MOB_ACCESS_TOKEN_KEY,
  );
  return new Promise((resolve, reject) => {
    fetch(mobile_siteConfig.BASE_URL + urlPath, {
      method: 'GET',
      mode: 'cors',
      // cache: "no-cache",
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'localhost',
        authorization: 'Bearer ' + accessTokenKey,
      },
    })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => {
        console.log(`=== ERROR === ${urlPath}`, error);
        reject(error);
      });
  });
}

export async function getDataWithToken(data, urlPath) {
  let token = await AsyncStorage.getItem(
    mobile_siteConfig.MOB_ACCESS_TOKEN_KEY,
  );
  try {
    const res = await fetch(mobile_siteConfig.BASE_URL + urlPath, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'localhost',
        Authorization: 'Bearer ' + token,
      },
    });
    return await res;
  } catch (err) {
    console.log('failed to fetch');
  }
}

export async function patchData(data, urlPath) {
  try {
    const res = await fetch(mobile_siteConfig.BASE_URL + urlPath, {
      method: 'PATCH',
      mode: 'cors',
      // cache: "no-cache",
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:3000',
        authorization:
          'Bearer ' +
          AsyncStorage.getItem(mobile_siteConfig.MOB_ACCESS_TOKEN_KEY),
      },
      body: JSON.stringify(data),
    });
    return await res;
  } catch (err) {
    console.log('Error:: failed to fetch');
  }
}

export async function PutDataWithToken(data, urlPath) {
  //   console.log('=== PutDataWithToken URL ===', constants.BASE_URL + urlPath);
  console.log('=== PutDataWithToken REQUEST ===', data, typeof data);
  let token = await AsyncStorage.getItem(
    mobile_siteConfig.MOB_ACCESS_TOKEN_KEY,
  );

  console.log('token:::::::::7', token);

  return new Promise((resolve, reject) => {
    fetch(mobile_siteConfig.BASE_URL + urlPath, {
      method: 'PUT',
      mode: 'cors',
      // cache: 'no-cache',
      //   credentials: 'same-origin',
      headers: {
        // Accept: '/',
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: data,
      //   body: JSON.parse(JSON.stri ngify(data)),
    })
      .then(response => response.json())
      .then(json => {
        console.log('=== vv RESPONSE ===', json);
        resolve(json);
      })
      .catch(error => {
        console.log('=== ERROR ===', error);
        reject(error);
      });
  });
}
