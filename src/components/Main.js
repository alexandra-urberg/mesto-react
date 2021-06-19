import { useEffect, useState } from "react";
import api from "../utils/api.js";
import Card from "./Card.js";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onDeleteCard,
  onCardClick,
}) => {
  const [userName, setUserName] = useState("");//сюда будет записываться имя пользователя
  const [userDescription, setUserDescription] = useState("");//сюда будет записываться  информация о пользователе
  const [userAvatar, setUserAvatar] = useState("");//сюда будет записываться  информация об аватаре
  const [cards, setCards] = useState([]);//сюда будет записываться  информация о карточках

  useEffect(() => {//вытаскиваем информацию о пользователе и карточках 
    Promise.all([api.getPersonalInformation(), api.getInitialCards()])
      .then(([{ name, about, avatar }, cardData]) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
        setCards([...cardData]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="main">
      <section className="profile main__profile">
        <div
          className="profile__avatar-container profile__avatar"
          style={{ backgroundImage: `url(${userAvatar})` }}
        >
          <button
            onClick={onEditAvatar}
            className="profile__avatar-button"
            type="button"
          ></button>
        </div>
        <div className="profile__conteiner">
          <h1 className="profile__name">{userName}</h1>
          <button
            onClick={onEditProfile}
            className="profile__open-button"
            type="button"
          ></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          id="popup-image__open-button"
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section id="elements" className="elements">
        <ul id="template__container" className="elements__container">
          {cards.map(({ likes, _id, name, link, owner }) => {
            return (
              <Card
                likes={likes}
                key={_id}
                name={name}
                link={link}
                owner={owner}
                onDeleteCard={onDeleteCard}
                onCardClick={onCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;

