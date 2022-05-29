import { gql } from "@apollo/client";

// get all Builds
export const FETCH_BUILDS_QUERY = gql`
  mutation getBuilds {
    getBuilds {
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
`;

// get single Build
export const FETCH_BUILD_QUERY = gql`
  query getBuild($id: ID) {
    getBuild(id: $id) {
      id
      name
      description
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
`;

// get Builds by ID
export const FETCH_USER_BUILDS_QUERY = gql`
  query getUserBuilds {
    getUserBuilds {
      id
      name
      description
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
`;

// add Build
export const ADD_BUILD_MUTATION = gql`
  mutation addBuild(
    $name: String
    $description: String
    $case: ID
    $switches: [SwitchBuildInput]
    $keycaps: [KeycapBuildInput]
    $stabs: [StabBuildInput]
    $images: [ImageBuildInput]
    ) {
    addBuild(
      buildInput: {
        name: $name
        description: $description
        case: $case
        switches: $switches
        keycaps: $keycaps
        stabs: $stabs
        images: $images
      }
    ) {
      id
      name
      description
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
`;

// update Build
export const UPDATE_BUILD_MUTATION = gql`
  mutation updateBuild(
    $id: ID!
    $name: String
    $description: String
    $case: ID
    $switches: [SwitchBuildInput]
    $keycaps: [KeycapBuildInput]
    $stabs: [StabBuildInput]
    $images: [ImageBuildInput]
    ) {
    updateBuild(
      id: $id
      buildInput: {
        name: $name
        description: $description
        case: $case
        switches: $switches
        keycaps: $keycaps
        stabs: $stabs
        images: $images
      }
    ) {
      id
      name
      description
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
`;

export const DELETE_BUILD_MUTATION = gql`
  mutation deleteBuild($id: ID) {
    deleteBuild(id: $id)
  }
`;