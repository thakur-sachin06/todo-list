/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Header from '../components/common/Header';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValues: jest.fn(() => ({
    selectedProject: 1,
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

const renderHeaderComponent = () => {
  return render(<Header />);
};

describe('<Checkbox/>', () => {
  describe('Success', () => {
    it('should renders the task checkbox', () => {
      const { queryByTestId } = renderHeaderComponent();
      expect(queryByTestId('header')).toBeTruthy();
      fireEvent.click(queryByTestId('quick-add-task'));
    });
  });
});
