import { gql } from "@apollo/client";

// get inventory belonging to a user
export const FETCH_INVENTORY_FOR_BUILDS_QUERY = gql`
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
      cases {
        id
        name
        creator
        color
        layout
        caseMaterial
        hasWeight
        weightMaterial
        plates {
          id
          type
          used
        }
        weight
        weightUnits
        built
      }
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