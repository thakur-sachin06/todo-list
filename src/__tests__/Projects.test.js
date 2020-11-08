/* eslint-disable no-undef */

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Projects } from '../components/Projects';
import { useProjectValues } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValues: jest.fn(() => ({
    selectedProject: 1,
    setSelectedProject: jest.fn(),
  })),
  useProjectValues: jest.fn(() => ({
    projects: [
      {
        projectId: 2,
        name: 'New Project 1',
      },
      {
        projectId: 3,
        name: 'New Project 2',
      },
    ],
  })),
}));

const renderProjects = () => {
  return render(<Projects />);
};

describe('<Checkbox/>', () => {
  describe('Success', () => {
    it('should renders the projects and set active project on click', () => {
      const { queryAllByTestId } = renderProjects();
      const projects = queryAllByTestId('project-action');
      fireEvent.click(projects[0]);
    });

    it('should renders the projects and set active project on key down', () => {
      const { queryAllByTestId } = renderProjects();
      const projects = queryAllByTestId('project-action');
      fireEvent.keyDown(projects[0]);
    });
  });
});
