import { collatedTasks } from '../constants/index.js';

export const collatedTasksExist = (selectedProject) => {
  collatedTasks.find((task) => task.key === selectedProject);
};
