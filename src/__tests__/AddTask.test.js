/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddTask } from '../components/AddTask';
import { useSelectedProjectValues } from '../context';

beforeEach(cleanup);

// mocking the firebase
jest.mock('../firebase.js', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve()),
      })),
    })),
  },
}));

jest.mock('../context', () => ({
  useSelectedProjectValues: jest.fn(() => ({
    selectedProject: 1,
  })),
  useProjectValues: jest.fn(() => ({ projects: [] })),
}));

const renderAddTask = () => {
  const setShowQuickAddTask = jest.fn();
  return render(
    <AddTask
      showAddTaskMain
      showShouldMain={false}
      showQuickAddTask
      setShowQuickAddTask={setShowQuickAddTask}
    />
  );
};

describe('<AddTask/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('renders the <AddTask/> component', () => {
      const { queryByTestId } = renderAddTask();
      expect(queryByTestId('add-task-comp')).toBeTruthy();
    });

    it('renders <AddTask/> quick overlay', () => {
      const { queryByTestId, getByText } = renderAddTask();
      expect(queryByTestId('quick-add-task')).toBeTruthy();
      expect(getByText('Quick Add Task')).toBeInTheDocument();
    });

    it('render <AddTask/> main component when clicked', () => {
      const { queryByTestId } = renderAddTask();
      expect(queryByTestId('add-task-comp')).toBeTruthy();
      const addTaskMain = queryByTestId('show-main-action');
      fireEvent.click(addTaskMain);
      const inputElt = queryByTestId('add-task__content');
      const addTaskButton = queryByTestId('add-task-button');
      expect(inputElt).toBeInTheDocument();
      expect(addTaskButton).toBeInTheDocument();
    });

    it('render <AddTask/> task date overlay when clicked', () => {
      const { queryByTestId } = renderAddTask();
      const dateIcon = queryByTestId('show-task-date-overlay');
      fireEvent.click(dateIcon);
    });

    it('hides the <AddTask/> main when click on cancel', () => {
      const { queryByTestId } = render(<AddTask showQuickAddTask={false} showAddTaskMain />);
      expect(queryByTestId('add-task-comp')).toBeTruthy();
      const addTaskMain = queryByTestId('show-main-action');
      expect(addTaskMain).toBeInTheDocument();
      fireEvent.click(addTaskMain);
      const cancel = queryByTestId('add-task-main__cancel');
      fireEvent.click(cancel);
      expect(queryByTestId('add-task__main')).toBeFalsy();
    });

    it('hides the <AddTask/> quick add task when click on cancel', () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId, getByText } = render(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      );

      expect(queryByTestId('quick-add-task')).toBeTruthy();
      expect(getByText('Quick Add Task')).toBeInTheDocument();
      fireEvent.click(queryByTestId('add-task-quick-cancel'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('renders <AddTask/> and adds a task to the inbox', () => {
      useSelectedProjectValues.mockImplementation(() => ({
        selectedProject: 'Inbox',
        setSelectedProject: jest.fn(),
      }));

      const { queryByTestId } = renderAddTask();
      const addTaskMain = queryByTestId('show-main-action');
      fireEvent.click(addTaskMain);
      expect(queryByTestId('add-task__main')).toBeTruthy();
      const inputElt = queryByTestId('add-task__content');
      const addTaskButton = queryByTestId('add-task-button');
      expect(inputElt).toBeInTheDocument();
      expect(addTaskButton).toBeInTheDocument();
      fireEvent.change(inputElt, {
        target: { value: 'I am a new task' },
      });

      expect(inputElt.value).toBe('I am a new task');
      fireEvent.click(addTaskButton);
    });

    it('renders <AddTask/> and adds a task to the today', () => {
      useSelectedProjectValues.mockImplementation(() => ({
        selectedProject: 'TODAY',
        setSelectedProject: jest.fn(),
      }));

      const { queryByTestId } = renderAddTask();
      const addTaskMain = queryByTestId('show-main-action');
      fireEvent.click(addTaskMain);
      expect(queryByTestId('add-task__main')).toBeTruthy();
      const inputElt = queryByTestId('add-task__content');
      const addTaskButton = queryByTestId('add-task-button');
      expect(inputElt).toBeInTheDocument();
      expect(addTaskButton).toBeInTheDocument();
      fireEvent.change(inputElt, {
        target: { value: 'I am a new task' },
      });

      expect(inputElt.value).toBe('I am a new task');
      fireEvent.click(addTaskButton);
    });

    it('renders <AddTask/> and adds a task to the next 7 days', () => {
      useSelectedProjectValues.mockImplementation(() => ({
        selectedProject: 'NEXT_7',
        setSelectedProject: jest.fn(),
      }));

      const { queryByTestId } = renderAddTask();
      const addTaskMain = queryByTestId('show-main-action');
      fireEvent.click(addTaskMain);
      expect(queryByTestId('add-task__main')).toBeTruthy();
      const inputElt = queryByTestId('add-task__content');
      const addTaskButton = queryByTestId('add-task-button');
      expect(inputElt).toBeInTheDocument();
      expect(addTaskButton).toBeInTheDocument();
      fireEvent.change(inputElt, {
        target: { value: 'I am a new task' },
      });

      expect(inputElt.value).toBe('I am a new task');
      fireEvent.click(addTaskButton);
    });

    it('render project overlay', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
      const addTaskMain = queryByTestId('show-main-action');
      fireEvent.click(addTaskMain);
      const projectOverlay = queryByTestId('show-project-overlay-icon');
      fireEvent.click(projectOverlay);
    });
  });
});
