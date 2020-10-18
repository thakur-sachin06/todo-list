import React, { useEffect } from 'react';
import Checkbox from './CheckBox';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { useSelectedProjectValues, useProjectValues } from '../context';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { AddTask } from './AddTask';

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
    // eslint-disable-next-line no-undef
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

      <AddTask />
    </div>
  );
};

export default Tasks;
