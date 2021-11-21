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
      }).catch(err => console.error(err))
  };

  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
      .then((res) => {
        console.log(">>>>>", res, data)
        return this._checkServerResponse(res);
      }).catch(err => console.error(err))
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
      }).catch(err => console.error(err))
  };






  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers,

    })
      .then((res) => {
        return this._checkServerResponse(res);
      }).catch(err => console.error(err))
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
      }).catch(err => console.error(err))
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._checkServerResponse(res);
      }).catch(err => console.error(err))
  };


  setLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => {
        return this._checkServerResponse(res);
      }).catch(err => console.error(err))
  };

  removeLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._checkServerResponse(res);
      }).catch(err => console.error(err))
  };



}