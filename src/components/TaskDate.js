import React, { useState } from 'react';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';
import moment from 'moment';

export const TaskDate = ({ setTaskDate, showTaskDate }) => {
  const [activeDate, setActiveDate] = useState('');

  return (
    showTaskDate && (
      <div className="task-date" data-testid="task-date-overlay">
        <ul className="task-date__list">
          <li>
            <div
              className={activeDate === 'Today' ? 'activeDate' : 'undefined'}
              onClick={() => {
                setTaskDate(moment().format('DD/MM/YYYY'));
                setActiveDate('Today');
              }}
              data-testid="task-date-today"
              tabIndex={0}
              aria-label="Select today as the task date"
              role="button"
            >
              <span>
                <FaSpaceShuttle />
              </span>
              <span>Today</span>
            </div>
          </li>
          <li>
            <div
              className={activeDate === 'Tomorrow' ? 'activeDate' : 'undefined'}
              onClick={() => {
                setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
                setActiveDate('Tomorrow');
              }}
              data-testid="task-date-tomorrow"
              role="button"
              tabIndex={0}
              aria-label="Select tomorrow as the task date"
            >
              <span>
                <FaSun />
              </span>
              <span>Tomorrow</span>
            </div>
          </li>
          <li>
            <div
              className={activeDate === 'Next_7' ? 'activeDate' : 'undefined'}
              onClick={() => {
                setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
                setActiveDate('Next_7');
              }}
              data-testid="task-date-next-week"
              aria-label="Select next week as the task date"
              tabIndex={0}
              role="button"
            >
              <span>
                <FaRegPaperPlane />
              </span>
              <span>Next week</span>
            </div>
          </li>
        </ul>
      </div>
    ))
}