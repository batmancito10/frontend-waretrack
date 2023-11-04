import axios from 'axios';

function requestApi(path, verb, data) {
  const token = localStorage.getItem('accessToken');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  switch (verb) {
    case 'GET':
      return axios
        .get(`${import.meta.env.VITE_API_ENDPOINT}/${path}/`, { headers })
        .then((res) => res.data)
        .catch((err) => console.log(err));

    case 'POST':
      return axios
        .post(`${import.meta.env.VITE_API_ENDPOINT}/${path}/`, data, {
          headers,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));

    case 'PATCH':
      return axios
        .patch(`${import.meta.env.VITE_API_ENDPOINT}/${path}/`, data, {
          headers,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));

    case 'DELETE':
      return axios
        .delete(`${import.meta.env.VITE_API_ENDPOINT}/${path}/`, { headers })
        .then((res) => res.data)
        .catch((err) => console.log(err));

    default:
      return axios
        .get(`${import.meta.env.VITE_API_ENDPOINT}/${path}/`, { headers })
        .then((res) => res.data)
        .catch((err) => console.log(err));
  }
}

export default requestApi;
