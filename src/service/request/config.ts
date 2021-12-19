let BASE_URL: string
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
}

export { BASE_URL, TIME_OUT }
