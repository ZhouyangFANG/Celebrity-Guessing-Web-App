import React from 'react';
import {
  render, screen, cleanup, waitFor, fireEvent,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import GetLeaders from './GetLeaders';

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
  
beforeEach( () => {
  render(
    <GetLeaders/>
  )

});

afterEach(() => {
  cleanup();
});


describe('Get leaders', () => {
  
  test('component rendered', async () => {
    // const listNode = await screen.getByTestId('2');
    // expect(screen.getByText('player2:10')).toBeInTheDocument();

    expect(screen.getByText('Retrieve and display top')).toBeInTheDocument();
    expect(screen.getByText('players')).toBeInTheDocument();
    expect(screen.getByText('Display Leaders')).toBeInTheDocument();
    // expect(screen.getByText('Stop display leaders')).toBeInTheDocument();

    
    // expect(screen.getByText('player1:5')).toBeInTheDocument();
  });
  test('button click', async () => {
    const display = screen.getByText('Display Leaders');
    await waitFor(() => fireEvent.click(display));
    expect(screen.getByText('player2:10')).toBeInTheDocument();

    // console.log(display);
    // expect(screen.getByText('Stop display leaders')).toBeInTheDocument();
    // // expect(screen.getByText('cicici')).toBeInTheDocument();
  })
})