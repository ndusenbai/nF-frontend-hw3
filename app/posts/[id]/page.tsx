import React from 'react';
import API from '../../api';
import styles from './PostDetail.module.css';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
}

interface Props {
    params: {
        id: string;
    };
}

const PostDetail = async ({ params }: Props) => {    
    const response = await API.get<Post>(`posts/${params.id}`);
    const post = response.data;
    
    return (
      <div className={styles.container}>
          <div className={styles.card}>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.body}>{post.body}</p>
              <p><strong>Автор:</strong> {post.userId}</p>
              <p><strong>Теги:</strong> {post.tags.join(', ')}</p>
              <div className={styles.reactions}>
                  <span><strong>Реакции:</strong></span>
                  <span className={styles.likes}>👍 {post.reactions.likes}</span>
                  <span className={styles.dislikes}>👎 {post.reactions.dislikes}</span>
              </div>
          </div>
      </div>
    );
};

export default PostDetail;
