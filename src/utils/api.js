class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
        this.addLike = this.addLike.bind(this);
        this.deleteLike = this.deleteLike.bind(this);
    }

    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject('We have found an error.' `Error: ${res.status}`);
    }

    getPersonalInformation() { //метод для вытаскивания информации с сервера о user/users
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    editPersonalProfile(data) { // метод для измения инфомуции о user и сохранении его на сервере
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._handleResponse);
    }

    editAvatar(link) { // метод для измения avatar оf user и сохранении его на сервере
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._handleResponse);
    }

    getInitialCards() { //метод достаюзий все карточки с фотографиями из сервера 
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    addNewCard(data) { // метод добаляющий новую карточку на сервер 
        return fetch (`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._handleResponse);
    }

    addLike(id) { // метод постановки лайка
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    deleteLike(id) { // метод удаления лайка 
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    deleteCard(id) { // метод уделения карточки с сервера
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse);
    }
}

const api = new Api ({
    url: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "7dfaf4c9-82d9-4096-b562-ec8631a23ab5",
    "Content-Type": "application/json",
  },
})

export default api;