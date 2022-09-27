import Repository, {
  Local,
  basePostUrl,
  serializeQuery,
  baseUrl
} from './Repository'
import { setCategory } from '~/store/category/action'
class PostRepository {
  constructor(callback) {
    this.callback = callback
  }

  async getCategories(title_contains) {
    let query = 'title_contains='
    if (title_contains) {
      query = serializeQuery(title_contains)
    }
    const response = await Local.get(
      `${baseUrl}category/getAll?${query}`
    )
      .then(response => {
        if (response.data.categories.length > 0) {
          return response.data.categories
        } else {
          return null
        }
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return response
  }

  async getCategory(payload) {
    const reponse = await Local.get(`${baseUrl}category/${payload}`)
      .then(response => {
        console.log('response', response)
        if (response.data.category) {
          return response.data.category
        } else {
          return null
        }
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async addCategory(payload) {
    const reponse = await Local.post(
      `${baseUrl}category/add`,
      payload
    )
      .then(response => {
        if (response.status === 200) {
          return { status: 'Success', message: response.data.message }
        } else {
          return null
        }
      })
      .catch(error => {
        if (error.response) {
          return {
            status: 'Failed',
            message: error.response.data.error
          }
        }
        return { status: 'Failed', message: 'An error occurred' }
      })
    return reponse
  }

  async removeCategory(payload) {
    const reponse = await Local.delete(
      `${baseUrl}category/${payload}`
    )
      .then(response => {
        if (response.status === 200) {
          this.getCategories()
          return { status: 'Success', message: response.data.message }
        } else {
          return null
        }
      })
      .catch(error => {
        if (error.response) {
          return {
            status: 'Failed',
            message: error.response.data.error
          }
        }
        return { status: 'Failed', message: 'An error occurred' }
      })
    return reponse
  }

  async editCategory(payload) {
    let id
    if (payload instanceof FormData) {
      console.log('yes')
      for (var pair of payload.entries()) {
        if (pair[0] === 'id') {
          id = pair[1]
        }
      }
    } else {
      console.log('payload', payload)
      id = payload.id
    }

    console.log('ASdasda', id)
    const reponse = await Local.put(
      `${baseUrl}category/${id}`,
      payload
    )
      .then(response => {
        if (response.status === 200) {
          return { status: 'Success', message: response.data.message }
        } else {
          return null
        }
      })
      .catch(error => {
        if (error.response) {
          return {
            status: 'Failed',
            message: error.response.data.error
          }
        }
        return { status: 'Failed', message: 'An error occurred' }
      })
    return reponse
  }
}

export default new PostRepository()
