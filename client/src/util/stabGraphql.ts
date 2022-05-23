import { gql } from "@apollo/client";

// get stabs belonging to a user
export const FETCH_STABS_QUERY = gql`
  query getInventory {
    getInventory {
      id
      stabs {
        id
        name
        wires {
          twoU
          sixU
          six25U
          sevenU
        }
        housings
        stems
      }
    }
  }
`;

// add stabs
export const ADD_STAB_MUTATION = gql`
  mutation addStab(
    $name: String
    $twoU: Int
    $sixU: Int
    $six25U: Int
    $sevenU: Int
    $housings: Int
    $stems: Int
  ) {
    addStab(
      stabinput: {
        name: $name
        twoU: $twoU
        sixU: $sixU
        six25U: $six25U
        sevenU: $sevenU
        housings: $housings
        stems: $stems
      }
    ) {
      id
      stabs {
        id
        name
        wires {
          twoU
          sixU
          six25U
          sevenU
        }
        housings
        stems
      }
    }
  }
`;

// delete stabs
export const DELETE_STAB_MUTATION = gql`
  mutation deleteStab($id: ID) {
    deleteStab(id: $id) {
      id
      stabs {
        id
        name
        wires {
          twoU
          sixU
          six25U
          sevenU
        }
        housings
        stems
      }
    }
  }
`;

// update a stab by ID
export const UPDATE_STAB_MUTATION = gql`
  mutation updateStab(
    $id: ID!
    $name: String
    $twoU: Int
    $sixU: Int
    $six25U: Int
    $sevenU: Int
    $housings: Int
    $stems: Int
  ) {
    updateStab(
      id: $id
      stabinput: {
        name: $name
        twoU: $twoU
        sixU: $sixU
        six25U: $six25U
        sevenU: $sevenU
        housings: $housings
        stems: $stems
      } 
    ) {
      id
      stabs {
        id
        name
        wires {
          twoU
          sixU
          six25U
          sevenU
        }
        housings
        stems
      }
    }
  }
`;