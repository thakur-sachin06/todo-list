/* eslint-disable no-undef */

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ProjectOverlay } from '../components/ProjectOverlay';
import { useProjectValues } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValues: jest.fn(() => ({
    selectedProject: 1,
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

const renderProjectOverlay = () => {
  const setProject = jest.fn();
  return render(<ProjectOverlay setProject={setProject} />);
};

describe('<Checkbox/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Success', () => {
    it('should renders the project overlay', () => {
      const { queryByTestId, getByText } = renderProjectOverlay();
      expect(queryByTestId('project-overlay')).toBeTruthy();
      expect(getByText('New Project 1')).toBeInTheDocument();
      expect(getByText('Select Project')).toBeInTheDocument();
    });

    it('should set selected project when click on a project', () => {
      const { queryByTestId, queryAllByTestId } = renderProjectOverlay();
      expect(queryByTestId('project-overlay')).toBeTruthy();
      const projects = queryAllByTestId('projects-list');
      fireEvent.click(projects[0]);
    });

    it('does not render the project overlay with any projects', () => {
      useProjectValues.mockImplementation(() => ({
        projects: [],
      }));

      const { queryByTestId } = render(<ProjectOverlay showProjectOverlay />);
      expect(queryByTestId('project-overlay')).toBeTruthy();
      expect(queryByTestId('project-overlay-action')).toBeFalsy();
    });
  });
});
