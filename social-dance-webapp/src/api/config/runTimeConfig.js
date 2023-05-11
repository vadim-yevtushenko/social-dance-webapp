import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig()
export const { API_BASE_URL } = publicRuntimeConfig
