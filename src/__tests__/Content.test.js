/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Content from '../components/common/Content';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValues: jest.fn(() => ({
    selectedProject: 2,
    setSelectedProject: jest.fn(),
  })),
  useProjectValues: jest.fn(() => ({
    setProjects: jest.fn(),
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

const renderContentComponent = () => {
  return render(<Content />);
};

describe('<Checkbox/>', () => {
  describe('Success', () => {
    it('should renders the task checkbox', () => {
      const { queryByTestId } = renderContentComponent();
      expect(queryByTestId('content')).toBeTruthy();
    });
  });
});
