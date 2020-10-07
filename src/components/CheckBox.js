/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { firebase } from '../firebase';

const Checkbox = ({ id }) => {
  // archiving tasks when checkbox is clicked.
  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({ archived: true });
  };

  return (
    <div className="checkbox-holder" data-testid="checkbox-action" onClick={() => archiveTask()}>
      <span className="checbox" />
    </div>
  );
};

export default Checkbox;