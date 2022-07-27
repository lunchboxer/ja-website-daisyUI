import fetch from 'node-fetch'
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql'
import fs from 'node:fs'
import path from 'node:path'
import 'dotenv/config'

const endpoint = process.env.VITE_DEV_ENDPOINT
const output = './schema.graphql'

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
      const schema = printSchema(buildClientSchema(schemaJSON.data))
      // const schema = JSON.stringify(schemaJSON, undefined, 2)
      console.log(`Writing output to path ${outputPath}`)
      fs.writeFileSync(outputPath, schema)
    })
}

const outputPath = path.resolve(output)

console.log(`Fetching schema from ${endpoint}...`)

fetchGraphQLSchema(endpoint)
