/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { useSelectedProjectValues } from '../context';
import Tasks from '../components/Tasks';

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

jest.mock('../context', () => ({
  useSelectedProjectValues: jest.fn(() => ({
    selectedProject: '1',
  })),
  useProjectValues: jest.fn(() => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott',
      },
      {
        name: '🚀 DAILY',
        projectId: '2',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'daily-office',
      },
      {
        name: '🎯 FUTURE',
        projectId: '3',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'wake-up',
      },
      {
        name: '📚 WORDS',
        projectId: '4',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'arcade-fire',
      },
      {
        name: '🎵 MUSIC',
        projectId: '5',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'bella-ciao',
      },
    ],
  })),
}));

jest.mock('../hooks', () => ({
  useTasks: () => ({
    tasks: [
      {
        id: 'mx2taaXpF38vYqMGbVtY',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task:
          'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
    ],
  }),
}));

const renderTasks = () => {
  const setProject = jest.fn();
  return render(<Tasks setProject={setProject} />);
};

describe('<Checkbox/>', () => {
  describe('Success', () => {
    it('should renders the task checkbox', () => {
      const { queryByTestId } = renderTasks();
      expect(queryByTestId('tasks')).toBeTruthy();
    });

    it('set project Today', () => {
      useSelectedProjectValues.mockImplementation(() => ({
        selectedProject: 'TODAY',
      }));
      const { queryByTestId } = renderTasks();
      expect(queryByTestId('tasks')).toBeTruthy();
    });
  });
});
