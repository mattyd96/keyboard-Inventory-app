import { gql } from "@apollo/client";

// get switches belonging to a user
export const FETCH_SWITCHES_QUERY = gql`
  query getInventory {
    getInventory {
      id
      switches {
        id
        name
        stock
        films
        lube
        springs {
          id
          name
          weight
          length
          lube
          amount
        }
        top
        bottom
        totalAmount
        availableAmount
      }
    }
  }
`;

// add switches
export const ADD_SWITCH_MUTATION = gql`
  mutation addSwitch(
    $name: String
    $stock: Boolean
    $films: String
    $springs: SpringInput
    $top: String
    $bottom: String
    $totalAmount: Int
    $availableAmount: Int
  ) {
    addSwitch(
      switchinput: {
        name: $name
        stock: $stock
        films: $films
        springs: $springs
        top: $top
        bottom: $bottom
        totalAmount: $totalAmount
        availableAmount: $availableAmount
      }
    ) {
      id
      switches {
        id
        name
        stock
        films
        lube
        springs {
          id
          name
          weight
          length
          lube
          amount
        }
        top
        bottom
        totalAmount
        availableAmount
      }
    }
  }
`;

// delete keycap by ID
export const DELETE_SWITCH_MUTATION = gql`
  mutation deleteSwitch($id: ID) {
    deleteSwitch(id: $id) {
      id
      switches {
        id
        name
        stock
        films
        lube
        springs {
          id
          name
          weight
          length
          lube
          amount
        }
        top
        bottom
        totalAmount
        availableAmount
      }
    }
  }
`;

// update a switch by ID
export const UPDATE_SWITCH_MUTATION = gql`
  mutation updateSwitch(
    $name: String
    $stock: Boolean
    $films: String
    $springs: SpringInput
    $top: String
    $bottom: String
    $totalAmount: Int
    $availableAmount: Int
  ) {
    updateSwitch(
      id: $id
      switchinput: {
        name: $name
        stock: $stock
        films: $films
        springs: $springs
        top: $top
        bottom: $bottom
        totalAmount: $totalAmount
        availableAmount: $availableAmount
      }
    ) {
      id
      switches {
        id
        name
        stock
        films
        lube
        springs {
          id
          name
          weight
          length
          lube
          amount
        }
        top
        bottom
        totalAmount
        availableAmount
      }
    }
  }
`;