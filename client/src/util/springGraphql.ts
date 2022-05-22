import { gql } from "@apollo/client";

// get springs belonging to a user
export const FETCH_SPRINGS_QUERY = gql`
  query getInventory {
    getInventory {
      id
      springs {
        _id
        name
        weight
        length
        lube
        amount
      }
    }
  }
`;

// add springs
export const ADD_SPRING_MUTATION = gql`
  mutation addSpring(
    $name: String
    $weight: String
    $length: String
    $lube: String
    $amount: Int
  ) {
    addSpring(
      springinput: {
        name: $name
        weight: $weight
        length: $length
        lube: $lube
        amount: $amount
      }
    ) {
      id
      springs {
        _id
        name
        weight
        length
        lube
        amount
      }
    }
  }
`;

// delete springs
export const DELETE_SPRING_MUTATION = gql`
  mutation deleteSpring($id: ID) {
    deleteSpring(id: $id) {
      id
      springs {
        _id
        name
        weight
        length
        lube
        amount
      }
    }
  }
`;

export const UPDATE_SPRING_MUTATION = gql`
  mutation updateSpring(
    $id: ID!
    $name: String
    $weight: String
    $length: String
    $lube: String
    $amount: Int
  ) {
    updateSpring(
      id: $id
      springinput: {
        name: $name
        weight: $weight
        length: $length
        lube: $lube
        amount: $amount
      } 
    ) {
      id
      springs {
        _id
        name
        weight
        length
        lube
        amount
      }
    }
  }
`;