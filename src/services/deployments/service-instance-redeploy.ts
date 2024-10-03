import * as core from '@actions/core'
import { sdk } from '../../graphql/client'
import {
  ServiceInstanceRedeployMutation,
  ServiceInstanceRedeployMutationVariables
} from '../../graphql/types'

export const serviceInstanceRedeploy = async ({
  environmentId,
  serviceId
}: ServiceInstanceRedeployMutationVariables): Promise<ServiceInstanceRedeployMutation> => {
  console.log('Redeploying service...')
  console.log(`Environment ID: ${environmentId}`)
  console.log(`Service ID: ${serviceId}`)
  try {
    const result = await sdk.ServiceInstanceRedeploy({
      environmentId,
      serviceId
    })
    return result
  } catch (error) {
    core.setFailed(
      `Failed to redeploy the service instance (environment ID: ${environmentId}, service ID: ${serviceId}): ${(error as Error).message}`
    )
    throw error
  }
}
