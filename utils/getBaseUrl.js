export const getBaseUrl = () => (
  process.env.ENVIRONMENT === 'production' 
  ? 'https://howdy-44c7beed0e87.herokuapp.com'
  : 'http://localhost:3000'
)