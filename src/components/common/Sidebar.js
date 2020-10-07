import React from 'react';
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar" data-test-id="sidebar">
      <ul className="sidebar__generic">
        <li>
          <span>
            <FaInbox />
          </span>
          Inbox
        </li>
        <li>
          <span>
            <FaRegCalendar />
          </span>
          Today
        </li>
        <li>
          <span>
            <FaRegCalendarAlt />
          </span>
          Next 7 days
        </li>
      </ul>

      <div className="sidebar__middle">
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
        Add project component here!!
      </div>
    </div>
  );
};

export default Sidebar;
