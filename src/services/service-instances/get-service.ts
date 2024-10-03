import * as core from '@actions/core'
import { sdk } from '../../graphql/client'
import { GetServiceQuery, GetServiceQueryVariables } from '../../graphql/types'

export const getService = async ({
  id
}: GetServiceQueryVariables): Promise<GetServiceQuery> => {
  try {
    const result = await sdk.GetService({ id })
    return result
  } catch (error) {
    core.setFailed(
      `Failed to get service (id: ${id}): ${(error as Error).message}`
    )
    throw error
  }
}
