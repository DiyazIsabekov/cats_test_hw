import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './index.css';
import Post from './components/CustomPost';  // Используем другое название
import AddPost from './components/CustomAddPost';  // Используем другое название

function App() {
  const [customPosts, setCustomPosts] = useState([]);  // Используем другое имя для состояния
  const [customCatImage, setCustomCatImage] = useState('');  // Используем другое имя для состояния
  const [customUsedImages, setCustomUsedImages] = useState([]);  // Используем другое имя для состояния

  useEffect(() => {
    axios.get('https://cataas.com/cat')
      .then(({ data: newImage }) => {
        setCustomCatImage(newImage);
      })
      .catch(error => {
        console.error('Ошибка при загрузке изображения:', error);
      });
  }, []);

  const addCustomPost = (newPost, newImage) => {
    setCustomPosts(posts => [...posts, newPost]);
    setCustomCatImage(newImage);
    setCustomUsedImages(images => [...images, newImage]);
  };

  const editCustomPost = (postId, updatedPost) => {
    setCustomPosts(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  const deleteCustomPost = postId => {
    setCustomPosts(posts => posts.filter(post => post.id !== postId));
  };

  return (
    <div className="app">
      <h1>Cats API</h1>
      <AddPost
        onAddPost={addCustomPost}
        currentCatImage={customCatImage}
        setCurrentCatImage={setCustomCatImage}
        usedImages={customUsedImages}
      />
      <div className="posts">
        {customPosts.map(post => (
          <Post
            key={post.id}
            post={post}
            currentCatImage={post.image}
            description={post.description}
            onEditPost={editCustomPost}
            onDeletePost={deleteCustomPost}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
