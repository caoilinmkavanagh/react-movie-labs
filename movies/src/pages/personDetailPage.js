import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPersonDetails } from '../api/tmdb-api';

const PersonDetailPage = () => {
  const { id } = useParams(); 
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPersonDetails(id)
      .then((data) => {
        console.log(data);
        setPerson(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{person.name}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} />
      <p><strong>Biography:</strong> {person.biography}</p>
      <p><strong>Known For:</strong> {person.known_for_department}</p>
      <p><strong>Place of Birth:</strong> {person.place_of_birth}</p>
      <p><strong>Date of Birth:</strong> {person.birthday}</p>
    </div>
  );
};

export default PersonDetailPage;
