import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularPeople } from '../../api/tmdb-api';

const PopularPeopleList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPopularPeople()
      .then((data) => {
        setPeople(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {people.map((person) => (
        <li key={person.id}>
          <Link to={`/person/people/${person.id}`}>{person.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PopularPeopleList;
