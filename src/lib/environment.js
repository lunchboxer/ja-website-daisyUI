const chooseEndpoint = () => {
  const environment = import.meta.env.VITE_ENV
  const development = import.meta.env.DEV
  const endpoint = development
    ? import.meta.env.VITE_DEV_ENDPOINT
    : environment === 'staging'
    ? import.meta.env.VITE_STAGING_ENDPOINT
    : import.meta.env.VITE_PRODUCTION_ENDPOINT
  return endpoint
}
export const variables = {
  endpoint: chooseEndpoint(),
}
