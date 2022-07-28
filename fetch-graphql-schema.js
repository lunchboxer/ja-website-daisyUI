import fetch from 'node-fetch'
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql'
import fs from 'node:fs'
import path from 'node:path'
import 'dotenv/config'

const endpoint = process.env.VITE_DEV_ENDPOINT
const readableOutput = './schema.graphql'
const jsonOutput = './schema.json'

const readableOutputPath = path.resolve(readableOutput)
const jsonOutputPath = path.resolve(jsonOutput)

function fetchGraphQLSchema(url) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  })
    .then(response => {
      console.log('got introspection response from server')
      return response.json()
    })
    .then(schemaJSON => {
      const readableSchema = printSchema(buildClientSchema(schemaJSON.data))
      const jsonSchema = JSON.stringify(schemaJSON, undefined, 2)
      console.log(`Writing readable output to path ${readableOutputPath}`)
      fs.writeFileSync(readableOutputPath, readableSchema)
      console.log(`Writing json output to path ${jsonOutputPath}`)
      fs.writeFileSync(jsonOutputPath, jsonSchema)
      console.log('done. happy hacking!')
    })
}

console.log(`Fetching schema from ${endpoint}...`)

fetchGraphQLSchema(endpoint)
