import "../index.css";
import { useState, useEffect } from "react";
import api from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); //popup Profile
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); //popup AddCards
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // popup Edit Avatar
  const [isDeletePopupImage, setIsDeletePopupImage] = useState(false); // popup Delete Card
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" }); // получаем полноразмерную картинку с подписью
  /** const [isLoading, setIsLoading] = useState(false);**/
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => { //вытаскиваем информацию о пользователе
    api
      .getPersonalInformation()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleUpdateUser = (userInformation) => {// внешний обработчик отвечающий за сохранение введенной информации о пользователе на сервер
    api
      .editPersonalProfile(userInformation)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => console.log(error))
      .finally(() => closeAllPopups());
  };

  const handleUpdateAvatar = (link) => {// внешний обработчик отвечающий за сохранение аватара пользователя на сервер
    api
      .editAvatar(link)
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch((error) => console.log(error))
      .finally(() => closeAllPopups());
  }

  //обработчики открытий попааов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCard = () => {
    setIsDeletePopupImage(true);
  };

  const handleCardClick = ({ link, name, isOpen }) => {
    setSelectedCard({
      isOpen: true,
      link,
      name,
    });
  };

  //обработчики закрытия попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupImage(false);
    setSelectedCard({ name: "", link: "" });
  };

  useEffect(() => {//обработчик закрытия попапов по нажатия на ESC
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });

  const handleCloseByOverlay = (evt) => { //рбработчик для закртия popup по кнопке и overlay
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closeAllPopups();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onDeleteCard={handleDeleteCard}
            onCardClick={handleCardClick}
          />
          <Footer />
        </>
        <>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            handleCloseByOverlay={handleCloseByOverlay}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
            handleCloseByOverlay={handleCloseByOverlay}
          />
          <PopupWithForm
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            handleCloseByOverlay={handleCloseByOverlay}
            name="image"
            title="Новое место"
            btn="Создать"
          >
            <label className="popup__label">
              <input
                type="text"
                minLength="2"
                maxLength="30"
                name="name"
                className="popup__input"
                placeholder="Название"
                required
              />
              <span className="popup__input-title-error input-error"></span>
            </label>
            <label className="popup__label">
              <input
                type="url"
                name="link"
                className="popup__input"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="popup__input-img-error input-error"></span>
            </label>
          </PopupWithForm>
          <PopupWithForm
            isOpen={isDeletePopupImage}
            onClose={closeAllPopups}
            handleCloseByOverlay={handleCloseByOverlay}
            name="card-delete"
            title="Вы уверены?"
            btn="Да"
          />
        </>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          handleCloseByOverlay={handleCloseByOverlay}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;