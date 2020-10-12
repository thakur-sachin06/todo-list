import React, { useEffect } from 'react';
import Checkbox from './CheckBox';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { useSelectedProjectValues, useProjectValues } from '../context';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import styled from 'styled-components';

const Tasks = () => {
  const { selectedProject } = useSelectedProjectValues();
  const { projects } = useProjectValues();
  const { tasks } = useTasks(selectedProject);
  let projectName = '';

  // if selected project is user created task

  if (projects.length && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
  }

  // if selected project is any of today, inbox and next 7. i.e not user created tasks
  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: TodoList`
  })

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={task.id}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
      {
        !tasks.length && <StyledText>No Task Found!</StyledText>
      }
    </div>
  );
};

const StyledText = styled.div`
  color: #db4c3f;
  font-size: 24px;
  margin-top: 40px;
  height: min-content;
  text-transform: uppercase;
`

export default Tasks;
