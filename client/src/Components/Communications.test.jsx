import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as Communications from './Communications';

let mockAdapter;
beforeEach(async () => {
  mockAdapter = new MockAdapter(axios);
});
afterEach(() => {
  mockAdapter.reset();
});

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

// const player = {

//   playerName: 'eieiei',
//   currentScore: 8,
//   bestScore: 8,
// };

describe('Communicate with remote', () => {
  test('Get All Players', async () => {
    mockAdapter.onGet().reply(200, Players);
    const data = await Communications.RetrieveAll();
    expect(data).toEqual(Players);
  });
  test('Add One Players', async () => {
    mockAdapter.onPost().reply(200, { id: 1, name: "John Smith" });
    const obj = {};
    await Communications.Post(obj, jest.fn);
  });
  test('Update One Player', async () => {
    mockAdapter.onPut().reply(200);
    const obj = {};
    await Communications.Update(obj);
  });
  test('Delete One Player', async () => {
    mockAdapter.onDelete().reply(200);
    await Communications.Delete(1);
  });
  test('Get Five Leaders', async () => {
    mockAdapter.onGet().reply(200, Leaders);
    const data = await Communications.GetTop(2);
    expect(data).toEqual(Leaders);
  });
});
