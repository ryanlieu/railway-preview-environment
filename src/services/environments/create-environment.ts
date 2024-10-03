import * as core from '@actions/core'
import { sdk } from '../../graphql/client'
import {
  CreateEnvironmentMutation,
  CreateEnvironmentMutationVariables
} from '../../graphql/types'

export const createEnvironment = async ({
  input
}: CreateEnvironmentMutationVariables): Promise<CreateEnvironmentMutation> => {
  try {
    core.info(
      `Creating environment based on source environment: ${input.name} ${input.sourceEnvironmentId && `(id: ${input.sourceEnvironmentId})`}`
    )
    const result = await sdk.CreateEnvironment({ input })
    return result
  } catch (error) {
    core.setFailed(`Failed to create environment: ${(error as Error).message}`)
    throw error
  }
}
