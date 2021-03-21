import { gql } from '@apollo/client';
import { CollectibleFragment } from './fragments';

export const CollectionQuery = gql`
  query CollectionQuery($address: String!) {
    user(id: $address) {
      collection {
        ...CollectibleFragment
      }
    }
  }
  ${CollectibleFragment}
`
