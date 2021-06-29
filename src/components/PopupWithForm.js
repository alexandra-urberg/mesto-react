import React from "react";

const PopupWithForm = (props) => {
  return (
    <div
      id={`popup-${props.name}`}
      className={`popup ${props.isOpen ? "popup_is-opened" : null}`}
      onClick={props.handleCloseByOverlay}
    >
      <div className="popup__content">
        <button
          className="popup__close-button"
          type="button"
          onClick={(props.onClose, props.onClick)}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form-container"
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;