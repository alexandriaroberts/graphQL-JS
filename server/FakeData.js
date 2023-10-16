const UserList = [
  {
    id: 1,
    name: 'John',
    age: 20,
    nationality: 'UK',
    username: 'john123',
    friends: [
      {
        id: 1,
        name: 'Sam',
        age: 20,
        nationality: 'GERMANY',
        username: 'S123',
      },
    ],
  },
  {
    id: 2,
    name: 'Sam',
    age: 20,
    nationality: 'GERMANY',
    username: 'S123',
  },
];

const MovieList = [
  {
    id: 1,
    name: 'Red',
    yearOfPublication: 2000,
    isInTheatres: false,
  },
  {
    id: 2,
    name: 'Avengers',
    yearOfPublication: 2005,
    isInTheatres: true,
  },
];

module.exports = { UserList, MovieList };
