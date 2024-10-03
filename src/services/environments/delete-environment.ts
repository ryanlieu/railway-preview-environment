import * as core from '@actions/core'
import { sdk } from '../../graphql/client'
import {
  DeleteEnvironmentMutation,
  DeleteEnvironmentMutationVariables
} from '../../graphql/types'

export const deleteEnvironment = async ({
  id
}: DeleteEnvironmentMutationVariables): Promise<DeleteEnvironmentMutation> => {
  try {
    const result = await sdk.DeleteEnvironment({ id })
    return result
  } catch (error) {
    core.setFailed(
      `Failed to delete environment (id: ${id}): ${(error as Error).message}`
    )
    throw error
  }
}
