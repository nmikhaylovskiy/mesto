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
        console.log("KIKI", this._baseUrl)

        console.log("fetch", `${this._baseUrl}users/me`)

        return fetch(`${this._baseUrl}users/me`, {
            method: 'GET',
            headers: this._headers,
            mode: 'no-cors',

        })
            .then((res) => {
                console.log(">>>> res", res)
                return this._checkServerResponse(res);
            })
    };








    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
            method: 'GET',
            headers: this._headers,
            mode: 'no-cors',

        })
            .then((res) => {
                return this._checkServerResponse(res);
            });
    };

}