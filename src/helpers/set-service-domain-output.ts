import * as core from '@actions/core'
import { CreateEnvironmentMutation } from '../graphql/types'
import { getService } from '../services/service-instances/get-service'

type SerServiceDomainOutput = {
  serviceInstances: CreateEnvironmentMutation['environmentCreate']['serviceInstances']
  ignoredServices: string[]
  apiServiceName?: string
}

export const setServiceDomainOutput = async ({
  serviceInstances,
  ignoredServices,
  apiServiceName
}: SerServiceDomainOutput): Promise<string[]> => {
  const servicesNeedRedeploy: string[] = []

  for (const serviceInstance of serviceInstances.edges) {
    const { domains, serviceId } = serviceInstance.node
    const { service } = await getService({ id: serviceId })
    const { name } = service

    if (!ignoredServices.includes(name)) {
      servicesNeedRedeploy.push(serviceId)
    }

    if (
      (apiServiceName && name === apiServiceName) ||
      name === 'app' ||
      name === 'backend' ||
      name === 'web'
    ) {
      const domain = domains.serviceDomains?.[0]?.domain
      console.log(`Service information:`)
      console.dir({ name, domain }, { depth: null })
      core.setOutput('service_domain', domain)
    }
  }

  return servicesNeedRedeploy
}
