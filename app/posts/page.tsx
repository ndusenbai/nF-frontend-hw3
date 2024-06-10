import React from 'react';
import API from '../api';
import Link from 'next/link';
import styles from './Posts.module.css';

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

const Posts = async() => {
    const response = await API.get<{ posts: Post[] }>('posts');
    const posts = response.data.posts;

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Посты</h1>
            {posts.map(post => (
                <div key={post.id} className={styles.post}>
                    <h2 className={styles.title}>{post.title}</h2>
                    <p><strong>Теги:</strong> {post.tags.join(', ')}</p>
                    <Link href={`posts/${post.id}`} className={styles.link}>Подробнее</Link>
                </div>
            ))}
        </div>
    )
} 

export default Posts;
