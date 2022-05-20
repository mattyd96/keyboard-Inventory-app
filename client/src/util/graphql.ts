import { gql } from "@apollo/client";

// get cases belonging to a user
export const FETCH_CASES_QUERY = gql`
  query getInventory {
    getInventory {
      id
      cases {
        _id
        name
        creator
        color
        layout
        caseMaterial
        hasWeight
        weightMaterial
        plates {
          _id
          type
          used
        }
        weight
        built
      }
    }
  }
`;

export const DELETE_CASE_MUTATION = gql`
  mutation deleteCase($id: ID) {
    deleteCase(id: $id) {
      id
      cases {
        _id
        name
        creator
        color
        layout
        caseMaterial
        weightMaterial
        weight
        built
      }
    }
  }
`;