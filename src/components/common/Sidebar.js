import React, { useState } from 'react';
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa';
import styled from 'styled-components';
import { useSelectedProjectValues } from '../../context';
import { AddProject } from '../AddProject';
import { Projects } from '../Projects';

const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValues();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);
  return (
    <div className="sidebar" data-test-id="sidebar">
      <ul className="sidebar__generic">
        <li data-testid="inbox" className={active === 'inbox' ? 'active' : undefined}
          onClick={() => {
            setSelectedProject('INBOX');
            setActive('inbox');
          }}>
          <StyledSpan>
            <FaInbox />
          </StyledSpan>
          Inbox
        </li>
        <li data-testid="today" className={active === 'today' ? 'active' : undefined}
          onClick={() => {
            setSelectedProject('TODAY');
            setActive('today');
          }}>
          <StyledSpan>
            <FaRegCalendar />
          </StyledSpan>
          Today
        </li>
        <li data-testid="next_7" className={active === 'next_7' ? 'active' : undefined}
          onClick={() => {
            setSelectedProject('NEXT_7');
            setActive('next_7');
          }}>
          <StyledSpan>
            <FaRegCalendarAlt />
          </StyledSpan>
          Next 7 days
        </li>
      </ul>

      <div className="sidebar__middle" onClick={() => setShowProjects(!showProjects)}>
        <span>
          <FaChevronDown className={!showProjects ? 'hidden-projects' : undefined} />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  );
};

const StyledSpan = styled.span`
  margin-right: 10px;
`;

export default Sidebar;
