import React, { useState } from 'react';
import { FaCalendarAlt, FaRegListAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { useSelectedProjectValues } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';

export const AddTask = ({
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask, // on nav bar
  setShowQuickAddTask
}) => {

  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(showShouldMain);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false); // to show list of project in which task needs to be added.
  const { selectedProject, setSelectedProject } = useSelectedProjectValues();

  const addTask = () => {
    setShowTaskDate(false);
    setShowMain('');
    setTask('');
    setProject('');
    setShowProjectOverlay(false);
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    return (task && projectId &&
      firebase.firestore().collection('tasks').add({
        archived: false,
        projectId,
        task,
        date: collatedDate || taskDate,
        userId: '1'
      })
        .then(() => {

          setSelectedProject(projectId);
        })
    )

  }

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {
        showAddTaskMain && (
          <div className="add-task__shallow" data-testid="show-main-action" onClick={() => setShowMain(!showMain)}>
            <span className="add-task__plus">+</span>
            <span className="add-task__text">Add Task</span>
          </div>
        )
      }
      {
        (showMain || showQuickAddTask) && (
          <div className="add-task__main" data-testid="add-task__main">
            {
              showQuickAddTask && (
                <>
                  <div data-testid="quick-add-task">
                    <h2 className="header">Quick Add Task</h2>
                    <span className="add-task__cancel-x"
                      data-testid="add-task-quick-cancel"
                      onClick={() => {
                        setShowMain(false);
                        setShowProjectOverlay(false);
                        setShowQuickAddTask(false);
                      }}>X</span>
                  </div>
                </>
              )}
            {
              showProjectOverlay && <ProjectOverlay
                setProject={setProject}
                setShowProjectOverlay={setShowProjectOverlay}
                showProjectOverlay={showProjectOverlay}
              />
            }

            {
              showTaskDate && <TaskDate
                showTaskDate={showTaskDate}
                setShowTaskDate={setShowTaskDate}
                setTaskDate={setTaskDate}
              />
            }
            <input type="text"
              className="add-task__content"
              data-testid="add-task__content"
              value={task}
              onChange={e => setTask(e.target.value)}
            />
            <button
              className="add-task__submit"
              data-testid="add-task"
              onClick={() => addTask()}
            >
              Add Task
            </button>
            {
              !showQuickAddTask && (
                <span
                  data-testid="add-task-main__cancel"
                  className="add-task__cancel"
                  onClick={() => {
                    setShowMain(false);
                    setProject(false);
                  }}>Cancel</span>
              )}

            <span
              className="add-task__project"
              data-testid="show-project-overlay"

            >
              <FaRegListAlt onClick={() => setShowProjectOverlay(!showProjectOverlay)} />
            </span>

            <span
              className="add-task__date"
              data-testid="show-task-date-overlay"
              onClick={() => setShowTaskDate(!showTaskDate)}
            >
              <FaCalendarAlt />
            </span>

          </div>
        )
      }
    </div>
  )
}