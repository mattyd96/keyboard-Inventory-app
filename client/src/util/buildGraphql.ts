import { gql } from "@apollo/client";

// get all Builds
export const FETCH_BUILDS_QUERY = gql`
  mutation getBuilds {
    getBuilds {
      builds {
        id
        name
        description
        switchAmount {
          id
          amount
        }
        stabAmount {
          id
          housings
          stems
          sevenU
          sixU
          six25U
          twoU
        }
        case {
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
        images
      }
    }
  }
`;

// get Builds by ID
export const FETCH_USER_BUILDS_QUERY = gql`
  mutation getUserBuilds($id: ID) {
    getUserBuilds(id: $id) {
      builds {
        id
        name
        description
        switchAmount {
          id
          amount
        }
        stabAmount {
          id
          housings
          stems
          sevenU
          sixU
          six25U
          twoU
        }
        case {
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
        images
      }
    }
  }
`;

// get Builds by ID
export const ADD_BUILD_MUTATION = gql`
  mutation addBuild(
    $name: String
    $description: String
    $switchAmount: [switchAmountInput]
    $stabAmount: [stabAmountInput]
    $case: ID
    $switches: [ID]
    $keycaps: [ID]
    $images: [String]
    ) {
    addBuild(id: $id) {
      builds {
        id
        name
        description
        switchAmount {
          id
          amount
        }
        stabAmount {
          id
          housings
          stems
          sevenU
          sixU
          six25U
          twoU
        }
        case {
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
        images
      }
    }
  }
`;