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
        weightUnits
        built
      }
    }
  }
`;

export const ADD_CASE_MUTATION = gql`
  mutation addCase(
    $name: String
    $creator: String
    $color: String
    $layout: String
    $caseMaterial: String
    $hasWeight: Boolean
    $weightMaterial: String
    $plates: [String]
    $weight: String
    $weightUnits: String
    $built: Boolean
  ) {
    addCase(
      caseinput: {
        name: $name
        creator: $creator
        color: $color
        layout: $layout
        caseMaterial: $caseMaterial
        hasWeight: $hasWeight
        weightMaterial: $weightMaterial
        plates: $plates
        weight: $weight
        weightUnits: $weightUnits
        built: $built
      }
    ) {
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
        weightUnits 
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

export const UPDATE_CASE_MUTATION = gql`
  mutation updateCase(
    $id: ID!
    $name: String
    $creator: String
    $color: String
    $layout: String
    $caseMaterial: String
    $hasWeight: Boolean
    $weightMaterial: String
    $plates: [String]
    $weight: String
    $weightUnits: String
    $built: Boolean
  ) {
    updateCase(
      id: $id
      caseinput: {
        name: $name
        creator: $creator
        color: $color
        layout: $layout
        caseMaterial: $caseMaterial
        hasWeight: $hasWeight
        weightMaterial: $weightMaterial
        plates: $plates
        weight: $weight
        weightUnits: $weightUnits
        built: $built
      } 
    ) {
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