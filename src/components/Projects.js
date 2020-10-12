import React, { useState } from 'react';
import { useSelectedProjectValues, useProjectValues } from '../context'
import { IndividualProject } from './IndividualProject';

export const Projects = ({ activeValue = null }) => {

  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValues();
  const { projects } = useProjectValues();

  return (
    projects && projects.map(project => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action"
        role="button"
        className={
          active === project.projectId ? 'active sidebar__project' : 'sidebar__project'
        }
        onKeyDown={() => {
          setActive(project.projectId)
          setSelectedProject(project.projectId)
        }}
        onClick={() => {
          setActive(project.projectId)
          setSelectedProject(project.projectId)
        }}
      >
        <IndividualProject project={project} />
      </li>

    ))
  )
}
