export default class UserInfo {
    constructor({ nameElement, captionElement, userAvatar }) {
        console.log(">>>>>", userAvatar)
        this._profileName = document.querySelector(nameElement)
        this._profileCaption = document.querySelector(captionElement)
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        const name = this._profileName.textContent
        const caption = this._profileCaption.textContent
        return { name, caption }
    }

    setUserInfo(name, about) {
        this._profileName.textContent = name
        this._profileCaption.textContent = about
    }
    setUserAvatar(userLink) {
        console.log("IN SET", userLink, this.userAvatar)
        this._userAvatar.src = userLink;
    };
}