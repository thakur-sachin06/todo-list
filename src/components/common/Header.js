import React, { useState } from 'react';
import { FaPizzaSlice, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { AddTask } from '../AddTask';

const Header = () => {
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [showShouldMain, setShouldShowMain] = useState(false);
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="todolist-logo" />
        </div>
        <div className="settings">
          <ul>
            <li onClick={() => setShowQuickAddTask(true)} data-testid="quick-add-task">
              <StyledAdd />
            </li>
            <li>
              <StyledPizza />
            </li>
          </ul>
        </div>
      </nav>
      <AddTask
        showQuickAddTask={showQuickAddTask}
        showAddTaskMain={false}
        setShowQuickAddTask={setShowQuickAddTask}
        showShouldMain={showShouldMain}
      />
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
