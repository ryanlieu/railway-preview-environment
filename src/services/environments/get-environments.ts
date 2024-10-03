import * as core from '@actions/core'
import { sdk } from '../../graphql/client'
import {
  GetEnvironmentsQuery,
  GetEnvironmentsQueryVariables
} from '../../graphql/types'

export const getEnvironments = async ({
  projectId
}: GetEnvironmentsQueryVariables): Promise<GetEnvironmentsQuery> => {
  try {
    const result = await sdk.GetEnvironments({ projectId })
    return result
  } catch (error) {
    core.setFailed(`Failed to get environments: ${(error as Error).message}`)
    throw error
  }
}
