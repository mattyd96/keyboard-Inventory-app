import { gql } from "@apollo/client";

// get stabs belonging to a user
export const FETCH_ARTISANS_QUERY = gql`
  query getInventory {
    getInventory {
      id
      artisans {
        id
        name
        maker
        sculpt
        colorway
        totalMade
        owned
      }
    }
  }
`;

// add stabs
export const ADD_ARTISAN_MUTATION = gql`
  mutation addArtisan(
    $name: String
    $maker: String
    $sculpt: String
    $colorway: String
    $totalMade: Int
    $owned: Int
  ) {
    addArtisan(
      artisaninput: {
        name: $name
        maker: $maker
        sculpt: $sculpt
        colorway: $colorway
        totalMade: $totalMade
        owned: $owned
      }
    ) {
      id
      artisans {
        id
        name
        maker
        sculpt
        colorway
        totalMade
        owned
      }
    }
  }
`;

// delete artisan by ID
export const DELETE_ARTISAN_MUTATION = gql`
  mutation deleteArtisan($id: ID) {
    deleteArtisan(id: $id) {
      id
      artisans {
        id
        name
        maker
        sculpt
        colorway
        totalMade
        owned
      }
    }
  }
`;

// update a stab by ID
export const UPDATE_ARTISAN_MUTATION = gql`
  mutation updateArtisan(
    $id: ID!
    $name: String
    $maker: String
    $sculpt: String
    $colorway: String
    $totalMade: Int
    $owned: Int
  ) {
    updateArtisan(
      id: $id
      artisaninput: {
        name: $name
        maker: $maker
        sculpt: $sculpt
        colorway: $colorway
        totalMade: $totalMade
        owned: $owned
      } 
    ) {
      id
      artisans {
        id
        name
        maker
        sculpt
        colorway
        totalMade
        owned
      }
    }
  }
`;