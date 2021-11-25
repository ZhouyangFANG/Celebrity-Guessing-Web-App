import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ScoresBoard from './ScoresBoard';

const url = 'https://hw3-mongo-backend.herokuapp.com';

const Players = [
  {
    id: '1', name: 'player1', points: 5, maxpoints: 5,
  },
  {
    id: '2', name: 'player2', points: 6, maxpoints: 10,
  }
];

const Leaders = [
  {
    id: '2', name: 'player2', points: 6, maxpoints: 10,
  },
  {
    id: '1', name: 'player1', points: 5, maxpoints: 5,
  }
];
const mockAdapter = new MockAdapter(axios);
mockAdapter
  .onGet(`${url}/leaders/2`)
  .reply(200, Leaders);

  mockAdapter
  .onGet(`${url}/leaders/1`)
  .reply(200, [{
    id: '2', name: 'player2', points: 6, maxpoints: 10,
  }]);
  mockAdapter.onPost().reply(200);

mockAdapter
.onGet(`${url}/players`)
  .reply(200, Players);

beforeEach(async () => {
  await waitFor(() => {
    render(<ScoresBoard  name={'User'}
      currentScore={4}
      setLogin={jest.fn}
      setDeleted={jest.fn} />);
  });
});

afterEach(() => {
  cleanup();
});

describe('show scores board', () => {
  
  test('component rendered', async () => {
    // const listNode = await screen.getByTestId('2');
    // expect(screen.getByText('player2:10')).toBeInTheDocument();

    expect(screen.getByText('Display all the players')).toBeInTheDocument();
    expect(screen.getByText('Retrieve and display top')).toBeInTheDocument();

    
    // expect(screen.getByText('player1:5')).toBeInTheDocument();
  });
})