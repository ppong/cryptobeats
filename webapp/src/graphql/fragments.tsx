import { gql } from '@apollo/client';

export const CollectibleFragment = gql`
  fragment CollectibleFragment on Media {
    id
    creator {
      id
    }
    contentURI
    metadataURI
  }
`
