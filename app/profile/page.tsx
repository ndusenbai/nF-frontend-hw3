'use client';
import { useEffect, useState } from 'react';
import API from '../api';

interface ProfileData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const res = await API.get<ProfileData>('/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Profile</h1>
      <img src={profile.image} alt={profile.firstName} />
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>Age:</strong> {profile.age}</p>
    </div>
  );
}
