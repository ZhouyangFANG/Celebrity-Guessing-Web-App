import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Scores from './Scores';

const url = 'https://hw3-mongo-backend.herokuapp.com';

const Players = [
  {
    id: '1', name: 'player1', points: 4, maxpoints: 5,
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
  .onGet(`${url}/players`)
  .reply(200, Players);
mockAdapter
  .onGet(`${url}/leaders/2`)
  .reply(200, Leaders);
mockAdapter
  .onGet(`${url}/leaders/1`)
  .reply(200, [
    {
      id: '2', name: 'player2', points: 6, maxpoints: 10,
    }
  ]);
mockAdapter
  .onPost()
  .reply(200, { id: 1, name: "John Smith" });
mockAdapter
  .onDelete()
  .reply(200);
mockAdapter
  .onPut()
  .reply(200);
beforeEach(() => {
  render(
    <Scores 
    name='player1'
    currentScore={3}
    setDeleted={jest.fn} 
    setLogin={jest.fn} 
    />
  )

});

afterEach(() => {
  cleanup();
});


describe('Get players', () => {

  test('component rendered', async () => {

    expect(screen.getByText('Show Scores')).toBeInTheDocument();
  });
  test('button click', async () => {
    const display = screen.getByText('Show Scores');
    await waitFor(() => fireEvent.click(display));
    expect(screen.getByText('Delete Account')).toBeInTheDocument();
    expect(screen.getByTestId('info')).toHaveTextContent('10');
    expect(screen.getByTestId('info')).toHaveTextContent('3');
  })
  test('delete account', async () => {
    const display = screen.getByText('Show Scores');
    await waitFor(() => fireEvent.click(display));
    const deleteMe = screen.getByText('Delete Account');
    await waitFor(() => fireEvent.click(deleteMe));

  })
})