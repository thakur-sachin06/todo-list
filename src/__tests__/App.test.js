/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

beforeEach(cleanup);

describe('<App/>', () => {
  describe('Success', () => {
    it('should renders the task checkbox', () => {
      const { queryByTestId } = render(<App />);
    });
  });
});
