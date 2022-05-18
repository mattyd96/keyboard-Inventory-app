import { gql } from "@apollo/client";

// get cases belonging to a user
export const FETCH_CASES_QUERY = gql`
  query getInventory {
    getInventory {
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