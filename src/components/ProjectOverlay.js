import React, { useState } from 'react';
import { useProjectValues } from '../context';

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay
}) => {
  const { projects } = useProjectValues([]);
  const [activeProject, setActiveProject] = useState('');
  const showProjectsList = () => {
    return (
      <>
        <div className="project-overlay" data-testid="project-overlay">
          <div className="project-overlay__select-project-text"> {projects.length ? ' Select Project' : 'No Projects'}</div>
          <ul className="project-overlay__list">
            {
              projects.map(project => {
                return (
                  <li
                    className={activeProject === project.projectId ? 'activeProject' : 'undefined'}
                    key={project.projectId}
                    onClick={() => {
                      setProject(project.projectId);
                      // setShowProjectOverlay(false);
                      setActiveProject(project.projectId)
                    }} >
                    {project.name}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </>
    )
  }

  return (
    <>
      {projects && showProjectsList()}
    </>
  )
}