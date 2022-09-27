import { Local } from './Repository'
import { baseURL } from '~/endpoints'
const baseCartUrl = `${baseURL}/api/user`

class UserRepository {
  constructor(callback) {
    this.callback = callback
  }

  async getUser() {
    const endPoint = `getUser`
    const reponse = await Local.get(`${baseCartUrl}/${endPoint}`)
      .then((response) => {
        if (response.status === 200) {
          return {
            status: 'Success',
            message: response.data.message,
            user: response.data.user,
          }
        } else {
          console.log(response)
          return null
        }
      })
      .catch((error) => {
        if (error.response) {
          return { status: 'Failed', message: error.response.data.error }
        }
        return { status: 'Failed', message: 'An error occurred' }
      })
    return reponse
  }

  async updateUser(payload) {
    const endPoint = `updateAccount`
    const reponse = await Local.put(`${baseCartUrl}/${endPoint}`, payload)
      .then((response) => {
        if (response.status === 200) {
          return {
            status: 'Success',
            message: response.data.message,
            user: response.data.user,
          }
        } else {
          console.log(response)
          return null
        }
      })
      .catch((error) => {
        if (error.response) {
          return { status: 'Failed', message: error.response.data.error }
        }
        return { status: 'Failed', message: 'An error occurred' }
      })
    return reponse
  }

  async getAddresses() {
    const endPoint = `getAddresses`
    const reponse = await Local.get(`${baseCartUrl}/${endPoint}`)
      .then((response) => {
        if (response.status === 200) {
          return {
            status: 'Success',
            message: response.data.message,
            addresses: response.data.addresses,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          }
        } else {
          console.log(response)
          return null
        }
      })
      .catch((error) => {
        if (error.response) {
          return { status: 'Failed', message: error.response.data.error }
        }
        return { status: 'Failed', message: 'An error occurred' }
      })
    return reponse
  }

  async addAddress(payload) {
    const endPoint = `addAddress`
    const reponse = await Local.put(`${baseCartUrl}/${endPoint}`, payload)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          return { status: 'Success', message: response.data.message }
        } else {
          console.log(response)
          return null
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response) {
          return { status: 'Failed', message: error.response.data.error }
        }
        return { status: 'Failed', message: 'An error occurred' }
      })
    return reponse
  }
}

export default new UserRepository()
