/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Sidebar from '../components/common/Sidebar';

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
  return render(<Sidebar />);
};

describe('<Checkbox/>', () => {
  describe('Success', () => {
    it('should renders sidebar and select Inbox ', () => {
      const { queryByTestId, getByText } = renderHeaderComponent();
      expect(queryByTestId('sidebar')).toBeTruthy();
      fireEvent.click(queryByTestId('inbox'));
      expect(getByText('Inbox')).toBeInTheDocument();
    });

    it('should renders sidebar and select Today projects', () => {
      const { queryByTestId, getByText } = renderHeaderComponent();
      expect(queryByTestId('sidebar')).toBeTruthy();
      fireEvent.click(queryByTestId('today'));
      expect(getByText('Today')).toBeInTheDocument();
    });

    it('should renders sidebar and select Next 7 days projects', () => {
      const { queryByTestId, getByText } = renderHeaderComponent();
      expect(queryByTestId('sidebar')).toBeTruthy();
      fireEvent.click(queryByTestId('next_7'));
      expect(getByText('Next 7 days')).toBeInTheDocument();
    });

    it('should hide projects ', () => {
      const { queryByTestId } = renderHeaderComponent();
      expect(queryByTestId('sidebar-middle')).toBeTruthy();
      fireEvent.click(queryByTestId('sidebar-middle'));
    });
  });
});
