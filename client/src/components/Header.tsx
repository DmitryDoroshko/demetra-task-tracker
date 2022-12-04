import React, {MouseEventHandler} from 'react';

interface IHeaderProps {
  shouldShowAddForm: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function Header({shouldShowAddForm, onClick}: IHeaderProps) {
  const buttonClasses = `header__button button ${shouldShowAddForm ? "button--active" : "button--cancel"}`;
  const buttonText = shouldShowAddForm ? "Add" : "Close";

  return (
    <header className="header">
      <h1 className={"header__logo"}>Task Tracker</h1>
      <button className={buttonClasses} onClick={onClick}>{buttonText}</button>
    </header>
  );
}

export default Header;