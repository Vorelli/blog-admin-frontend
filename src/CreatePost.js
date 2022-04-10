export default async function CreatePost(postValues) {
  const token = localStorage.getItem('token');
  const newPost = { title: postValues.title, body: postValues.body, public: postValues.public };
  const body = JSON.stringify(newPost);
  if (!token) return new Promise.reject(new Error('Token not valid.'));
  const response = await fetch('https://infinite-taiga-59787.herokuapp.com/backend/posts', {
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body
  })
  const responseJSON = await response.json();
  return new Promise((resolve, reject) => {
    if (!responseJSON.errors) {
      resolve(responseJSON.post_id);
    } else {
      reject(responseJSON);
    }
  })
}