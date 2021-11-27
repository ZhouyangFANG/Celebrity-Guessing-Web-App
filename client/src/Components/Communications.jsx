import axios from 'axios';

const url = 'http://localhost:5000';

export async function RetrieveAll() {
  const res = await axios.get(`${url}/players`);
  // console.log(res.data);
  return res.data;
}

export async function Post(entry, setId) {
  const res = await axios.post(`${url}/player`, entry);
  setId(res.data.id);
}

// export async function Retrieve(name) {
//   try {
//     const res = await axios.get(`${url}/player/${name}`);
//     return res.data;
//   } catch (error) {
//     const res = name;
//     return res;
//   }
// }

export async function Update(id, entry) {
  axios.put(`${url}/player/${id}`, entry);
}

export async function Delete(id) {
  axios.delete(`${url}/player/${id}`);
}

export async function GetTop(n) {
  const res = await axios.get(`${url}/leaders/${n}`);
  return res.data;
}
