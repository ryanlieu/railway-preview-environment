import * as core from '@actions/core'
import { sdk } from '../../graphql/client'
import {
  DeploymentTriggerUpdateMutation,
  DeploymentTriggerUpdateMutationVariables
} from '../../graphql/types'

export const deploymentTriggerUpdate = async ({
  id,
  input
}: DeploymentTriggerUpdateMutationVariables): Promise<DeploymentTriggerUpdateMutation> => {
  try {
    const result = await sdk.DeploymentTriggerUpdate({ id, input })
    return result
  } catch (error) {
    core.setFailed(
      `Failed to update the deployment trigger (id: ${id}): ${(error as Error).message}`
    )
    throw error
  }
}
