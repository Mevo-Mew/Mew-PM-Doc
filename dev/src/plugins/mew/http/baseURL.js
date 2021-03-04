// process.env.NODE_ENV
// development or production
// Mock http://127.0.0.1:4523/mock/367166
const baseURL_production  = 'http://rest.apizza.net/mock/d521484d6ddf73aaec540fa35506725a/'
// const baseURL_development = 'http://rest.apizza.net/mock/d521484d6ddf73aaec540fa35506725a/'
const baseURL_development = 'http://localhost:6950'

const baseURL = process.env.NODE_ENV === 'production' ? baseURL_production : baseURL_development

export default  baseURL