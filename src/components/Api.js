export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };


  getUserInfo() {

    return fetch(`${this._baseUrl}users/me `, {
      method: 'GET',
      headers: this._headers,


    })
      .then((res) => {
        console.log(">>>> res", res)
        return this._checkServerResponse(res);
      })
  };

  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data['user-name'],
        about: data.job
      })
    })
      .then((res) => {
        console.log(">>>>>", res, data)
        return this._checkServerResponse(res);
      })
  };


  loadUserAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data
      })
    })
      .then((res) => {
        return this._checkServerResponse(res);
      })
  };






  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers,

    })
      .then((res) => {
        return this._checkServerResponse(res);
      })
  };

  uploadNewCard(data) {
    console.error(data)
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        return this._checkServerResponse(res);
      })
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._checkServerResponse(res);
      })
  };


  setLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => {
        return this._checkServerResponse(res);
      })
  };

  removeLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._checkServerResponse(res);
      })
  };



}