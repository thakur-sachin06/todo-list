import { useEffect, useState } from 'react';
import { firebase } from '../firebase';
import moment from 'moment';
import { collatedTasksExist } from '../helpers/index';

// custom Hook to get all tasks.

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase.firestore().collection('tasks').where('userId', '==', '1');

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      unsubscribe = unsubscribe.where('projectId', '==', selectedProject);
    } else if (selectedProject === 'TODAY') {
      unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY'));
    } else if (selectedProject === 'INBOX' || selectedProject === 0) {
      unsubscribe = unsubscribe.where('date', '==', '');
    }

    // unsubscribe =
    //   selectedProject && !collatedTasksExist(selectedProject)
    //     ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
    //     : selectedProject === 'TODAY'
    //     ? (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))
    //     : selectedProject === 'INBOX' || selectedProject === 0
    //     ? (unsubscribe = unsubscribe.where('date', '==', ''))
    //     : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      // getting next 7 days tasks.
      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
            (task) =>
              moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
              task.archived !== true
          )
          : newTasks.filter((task) => task.archived !== true)
      );

      //getting archived tasks
      setArchivedTasks(newTasks.filter((task) => task.archived === true));

      return () => unsubscribe();
    });
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

// custom hook to get the all the projects.

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', '1')
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        // setting state only when projects fetched from firebase different from current projects.
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);
  return { projects, setProjects };
};
