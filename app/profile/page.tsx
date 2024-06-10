'use client';
import useAuth from '../hooks/useAuth';

export default function Profile() {
  const user = useAuth();

  if (!user) {
    return <div>Loading...</div>; // Пока пользователь не загружен, показываем загрузку
  }

  return (
    <div className="container">
      <h1>Profile</h1>
      <img src={user.image} alt={user.firstName} />
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
    </div>
  );
}
