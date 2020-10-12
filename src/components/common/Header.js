import React from 'react';
import { FaPizzaSlice, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

const Header = () => {
  return (
    <header className="header" data-test-id="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="todolist-logo" />
        </div>
        <div className="settings">
          <ul>
            <li><StyledAdd /></li>
            <li>
              <StyledPizza />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const StyledPizza = styled(FaPizzaSlice)`
  display: inline;
  height: auto;
  width: 18px;
  margin-left: 10px;
  transform: translateX(-3%);
`;

const StyledAdd = styled(FaPlus)`
  display: inline;
  height: auto;
  width: 15px;
  transform: translateX(50%);
`;

export default Header;
