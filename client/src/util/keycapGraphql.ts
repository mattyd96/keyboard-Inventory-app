import { gql } from "@apollo/client";

// get keycaps belonging to a user
export const FETCH_KEYCAPS_QUERY = gql`
  query getInventory {
    getInventory {
      id
      keycaps {
        id
        name
        manufacturer
        material
        kits {
          id
          name
          amount
        }
      }
    }
  }
`;

// add keycaps
export const ADD_KEYCAP_MUTATION = gql`
  mutation addKeycap(
    $name: String
    $manufacturer: String
    $material: String
    $kits: [String]
  ) {
    addKeycap(
      keycapinput: {
        name: $name
        manufacturer: $manufacturer
        material: $material
        kits: $kits
      }
    ) {
      id
      keycaps {
        id
        name
        manufacturer
        material
        kits {
          id
          name
          amount
        }
      }
    }
  }
`;

// delete keycap by ID
export const DELETE_KEYCAP_MUTATION = gql`
  mutation deleteKeycap($id: ID) {
    deleteKeycap(id: $id) {
      id
      keycaps {
        id
        name
        manufacturer
        material
        kits {
          id
          name
          amount
        }
      }
    }
  }
`;

// update a keycap by ID
export const UPDATE_KEYCAP_MUTATION = gql`
  mutation updateKeycap(
    $id: ID!
    $name: String
    $manufacturer: String
    $material: String
    $kits: [String]
  ) {
    updateKeycap(
      id: $id
      keycapinput: {
        name: $name
        manufacturer: $manufacturer
        material: $material
        kits: $kits
      }
    ) {
      id
      keycaps {
        id
        name
        manufacturer
        material
        kits {
          id
          name
          amount
        }
      }
    }
  }
`;