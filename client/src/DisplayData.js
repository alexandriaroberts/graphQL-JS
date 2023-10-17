import React, { useState } from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
      yearOfPublication
      isInTheatres
    }
  }
`;

const GET_MOVIE_BYNAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState('');

  //Create user states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [nationality, setNationality] = useState('');

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BYNAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1>Data is loading</h1>;
  }

  if (error) {
    console.log(error);
  }

  if (movieError) {
    console.log(movieError);
  }

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Name..'
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Age..'
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Username..'
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Nationality..'
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name: name, username, age: 21, nationality },
              },
            });
          }}
        >
          Create User
        </button>
      </div>

      {data &&
        data.users.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}
      {movieData &&
        movieData.movies.map((movie) => {
          return <h1>{movie.name}</h1>;
        })}
      <div>
        <input
          type='text'
          placeholder='hello'
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchData && (
            <div>
              <h1>Movie Name: {movieSearchData.movie.name}</h1>
              <h1>Year: {movieSearchData.movie.yearOfPublication}</h1>
            </div>
          )}
          {movieError && <h1> There was an error fetching data</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
