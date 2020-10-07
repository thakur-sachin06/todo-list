import React from 'react';
import Checkbox from './CheckBox';
import { useTasks } from '../hooks/index';

const Tasks = () => {
  // 1 is selected project id
  const { tasks } = useTasks('1');
  let projectName = '';

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
    </div>
  );
};

export default Tasks;
