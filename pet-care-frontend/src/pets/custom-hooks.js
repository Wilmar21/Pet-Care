import { useQuery} from '@apollo/client'
import { ALL_PETS } from './graphql-queries'

export const usePets = () => {
    const result = useQuery(ALL_PETS/*, {pollInterval: 2000}*/)
    return result
  }