import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';
import {queryDailyNewUser} from '../Services/NFBusinessAPI';

export function login(userName, password) {

  axios.post('http://127.0.0.1:5000/user/login', {
    user: userName,
    password: password
  }, {
    headers: {'Content-Type': 'application/json'}
  })
  .then(function (response) {
    console.log(response.data);
    
    {response.data.code === 0 && 
      window.store.setLoginState(true);
      queryDailyNewUser("2018::03::10");
    }
    
    //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  })
  .catch(function (error) {
    console.log(error);
  });
}