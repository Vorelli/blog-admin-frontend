export default async function UpdatePost(post) {
  return new Promise((resolve, reject) => {
    const newPost = { title: post.title, body: post.body, public: post.public };
    const token = localStorage.getItem('token');
    const body = JSON.stringify(newPost);
    if (!token) reject(new Error('Token not found.'));
    fetch('https://infinite-taiga-59787.herokuapp.com/backend/posts/' + post.message_id, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === 'Updated post successfully!') {
          resolve(response);
        } else reject(response);
      });
  });
}
