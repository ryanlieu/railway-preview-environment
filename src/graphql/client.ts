import * as core from '@actions/core'
import { GraphQLClient } from 'graphql-request'
import { RAILWAY_ENDPOINT } from '../config'
import { getSdk } from './types'

const RAILWAY_API_TOKEN = core.getInput('railway_api_token')

export const client = new GraphQLClient(RAILWAY_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${RAILWAY_API_TOKEN}`
  }
})

export const sdk = getSdk(client)
