export default async function loadPost(post_id) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    if (!token) reject(new Error('Token not found.'));
    fetch('https://infinite-taiga-59787.herokuapp.com/backend/posts/' + post_id, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.post) resolve(response);
        else reject(response);
      });
  });
}
