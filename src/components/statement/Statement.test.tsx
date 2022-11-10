
import * as React from 'react';
import {describe, expect, test} from '@jest/globals';
import Statement from './Statement';
import {screen} from '@testing-library/react';

import { buildInitalStatement, DEFAULT_COLS, DEFAULT_ROWS } from 'Store/statement/statement.utils';
import { renderWithContext } from '../../test.utils';

const initalStatement = buildInitalStatement();

/**
 * Note this just tests the default rendering. Ideally we'd add cases for different permutations
 */

describe('Table Cell Tests', () => {
    test('renders the inital statement', () => {
      renderWithContext(<Statement statement={initalStatement} />)
      // test the number of table rows are correct
      expect(screen.getAllByRole('row').length).toEqual(DEFAULT_ROWS);
      // test the number of cells are correct
      expect(screen.getAllByRole('cell').length).toEqual(DEFAULT_ROWS * DEFAULT_COLS);
    });
  });