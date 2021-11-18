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
    console.log("KIKI", this._baseUrl, this._headers)

    console.log("fetch", `${this._baseUrl}users/me`)
    // https://nomoreparties.co/v1/cohort-30/users/me - тоже не проходит
    return fetch(`${this._baseUrl}users/me `, {
      method: 'GET',
      headers: {
        authorization: 'cd58889d-4007-40b0-abc9-c4f5ad470e2a',
        'Content-Type': 'application/json'
      },


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
        name: data.name,
        about: data.job
      })
    })
      .then((res) => {
        console.log(">>>>>", res, data)
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
      });
  };

  uploadNewCard(data) {
    console.log(data)
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


}