import "../index.css";
import { useState, useEffect } from "react";
import api from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); //popup Profile
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); //popup AddCards
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // popup Edit Avatar
  const [isDeletePopupImage, setIsDeletePopupImage] = useState(false); // popup Delete Card
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" }); // получаем полноразмерную картинку с подписью
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]); //подписываемся на CurrentUserContext, чтобы получить нужное значания контекста
  const [cardId, setCardId] = useState([]);

  useEffect(() => { //вытаскиваем информацию о пользователе
    setIsLoading(true);
    Promise.all([api.getPersonalInformation(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);


  const handleUpdateUser = (userInformation) => {// внешний обработчик отвечающий за сохранение введенной информации о пользователе на сервер
    setIsLoading(true);
    api
    .editPersonalProfile(userInformation)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (link) => {// внешний обработчик отвечающий за сохранение аватара пользователя на сервер
    setIsLoading(true);
    api
    .editAvatar(link)
      .then((userData) => {
        setCurrentUser(userData)
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  const handleCardLike = (likes, cardId, currentUserId) => {// внешний обработчик отвечающий за постановку/удаление лайка на/с сервер/а
    const isLiked = likes.some((card) => card._id === currentUserId);// Снова проверяем, есть ли уже лайк на этой карточке
    //я не поняла как делать обзщий запрос на сервер для двух методов в api
    if (isLiked) {//удаляем Лайк
      api
        .deleteLike(cardId)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === cardId ? newCard : c))
          );
        })
        .catch((error) => console.log(error));
    } else { //добавляем лайк
      api
        .addLike(cardId)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === cardId ? newCard : c))
          );
        })
        .catch((error) => console.log(error));
    }
  }

  const handleCardDelete = () => {// внешний обработчик отвечающий за удаление карточки с сервера
    setIsLoading(true);
    api.deleteCard(cardId._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id === cardId._id));
    })
    .then(() => closeAllPopups())
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));
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

  const handleDeleteCard = (card) => {
    setCardId(card);
    setIsDeletePopupImage(true);
  };

  const handleCardClick = ({ link, name }) => {
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <>
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onDeleteCard={handleDeleteCard} 
            onCardLike={handleCardLike}
            isLoading={isLoading}
          />
          <Footer />
        </>
        <>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <DeleteCardPopup
            isOpen={isDeletePopupImage}
            onDeleteCard={handleCardDelete}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;