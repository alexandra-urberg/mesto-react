import "../index.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);//popup Profile
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);//popup AddCards
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);// popup Edit Avatar
  const [isDeletePopupImage, setIsDeletePopupImage] = useState(false);// popup Delete Card
  const [selectedCard, setSelectedCard] = useState(false);// получаем полноразмерную картинку с подписью
  /** const [isLoading, setIsLoading] = useState(false);**/

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
    setSelectedCard(false);
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
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          handleCloseByOverlay={handleCloseByOverlay}
          name="profile"
          title="Редактировать профиль"
          btn="Сохранить"
        >
          <label className="popup__label">
            <input
              type="text"
              minLength="2"
              maxLength="40"
              name="name"
              className="popup__input"
              placeholder="Жак-Ив Кусто"
              required
            />
            <span className="input-name-error input-error"></span>
          </label>
          <label className="popup__label">
            <input
              type="text"
              minLength="2"
              maxLength="200"
              name="about"
              className="popup__input"
              placeholder="Исследователь океана"
              required
            />
            <span className="input-job-error input-error"></span>
          </label>
        </PopupWithForm>
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
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          handleCloseByOverlay={handleCloseByOverlay}
          name="avatar"
          title="Обновить аватар"
          btn="Сохранить"
        >
          <label className="popup__label">
            <input
              type="url"
              name="avatar"
              className="popup__input"
              placeholder="Ссылка на фотографию"
              required
            />
            <span className="input-avatar-error input-error"></span>
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
  );
};

export default App;