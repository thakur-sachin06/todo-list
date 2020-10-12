import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectValues, useSelectedProjectValues } from '../context/index';
import { firebase } from '../firebase';
import styled from 'styled-components';

export const IndividualProject = ({ project }) => {

  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectValues();
  const { setSelectedProject } = useSelectedProjectValues();

  const deleteProject = docId => {
    firebase.firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]); // once a project is deleted we are changing the state so useProject hook will be called and all projects will be fetched again
        setSelectedProject('INBOX');
      })
  }

  return (
    <>
      <span className="sidebar__dot">&bull;</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span className="sidebar__project-delete" data-testid="delete-project">
        <FaTrashAlt onClick={() => setShowConfirm(!showConfirm)} color="#db4c3f" />
        {
          showConfirm && (
            <div className="project-delete-modal">
              <div className="project-delete-modal__inner">
                <p>Are you sure, you want to delete this project?</p>
                <StyledDiv>
                  <button className="delete-btn" type="button" onClick={() => deleteProject(project.docId)}>
                    Delete
                  </button>
                  <button className="cancel-btn" type="button" onClick={() => setShowConfirm(!showConfirm)}>
                    Cancel
                  </button>
                </StyledDiv>

              </div>
            </div>
          )
        }
      </span>
    </>
  )
}

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  transition: all .2s;
`;
