import * as core from '@actions/core'
import { serviceInstanceRedeploy } from '../services/deployments/service-instance-redeploy'

type RedeployAllServices = {
  environmentId: string
  serviceIds: string[]
}

export const redeployAllServices = async ({
  environmentId,
  serviceIds
}: RedeployAllServices): Promise<void> => {
  try {
    const redeployPromises = serviceIds.map(
      async serviceId =>
        await serviceInstanceRedeploy({ environmentId, serviceId })
    )

    await Promise.all(redeployPromises)
  } catch (error) {
    core.setFailed(
      `Failed to redeploy all services: ${(error as Error).message}`
    )
  }
}
