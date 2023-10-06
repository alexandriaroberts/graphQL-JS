const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User]
    favouriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheatres: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input createUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User]
    favouriteMovies: [Movie]
  }

  type Mutation {
    createUser(input: User!): User!
  }

  enum Nationality {
    GERMANY
    UK
  }
`;

module.exports = { typeDefs };
