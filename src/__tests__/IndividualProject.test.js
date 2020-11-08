/* eslint-disable no-undef */

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { IndividualProject } from '../components/IndividualProject';

beforeEach(cleanup);

// mocking the firebase
jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve('Never mock firebase, but I did!')),
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

const project = {
  projectId: 2,
  name: 'JS 100',
  docId: '123',
};

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

const renderProject = () => {
  return render(<IndividualProject project={project} />);
};

describe('<Checkbox/>', () => {
  describe('Success', () => {
    it('should renders the task checkbox', () => {
      const { getByText } = renderProject();
      expect(getByText('JS 100')).toBeTruthy();
    });

    it('should delete project', () => {
      const { queryByTestId, queryAllByRole } = renderProject();
      const deleteIcon = queryByTestId('delete-project-icon');
      fireEvent.click(deleteIcon);
      expect(queryByTestId('delete-modal')).toBeInTheDocument();
      const buttons = queryAllByRole('button');
      fireEvent.click(buttons[0]);
    });

    it('cancel delete modal', () => {
      const { queryByTestId, queryAllByRole } = renderProject();
      const deleteIcon = queryByTestId('delete-project-icon');
      fireEvent.click(deleteIcon);
      expect(queryByTestId('delete-modal')).toBeInTheDocument();
      const buttons = queryAllByRole('button');
      fireEvent.click(buttons[1]);
      expect(queryByTestId('delete-modal')).toBeFalsy();
    });
  });
});
