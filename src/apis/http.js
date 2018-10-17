import axios from 'axios'
import _ from 'lodash'
const Errors = {
  111004: 'redis key expired or not exist'
}

const responseError = error => {
  const errorCode = _.get(error, 'response.data.messageVars.[0]', -1)
  const status = _.get(error, 'response.status', -1)
  const statusText = _.get(error, 'response.statusText')
  const errorMsg = _.get(Errors, errorCode) || _.get(error, 'response.data.errorMessage')

  if (errorCode === '111004') {
    window.location.replace('/')
  }

  alert(`${status}: ${statusText}`)
  return {
    status,
    errorMsg,
    statusText,
    errorCode
  }
}

const http = axios.create({
  baseURL: 'innovation-charts/',
  timeout: 1000 * 120
})

http.interceptors.response.use(_ => _, responseError)

export default http
