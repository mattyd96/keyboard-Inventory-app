import { gql } from "@apollo/client";


// get cases belonging to a user
export const FETCH_CASES = gql`
  query getCases( $username: String! ){
    getCases( username: $username ) {
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
`;