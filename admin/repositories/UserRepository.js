import Repository, {
  Local,
  basePostUrl,
  serializeQuery,
  baseUrl,
} from "./Repository"

class UserRepository {
  constructor(callback) {
    this.callback = callback
  }

  async getUsers(title_contains) {
    const endPoint = `getUsers?${serializeQuery(title_contains)}`
    const reponse = await Local.get(baseUrl + endPoint)
      .then((response) => {
        return response
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getUsersCount() {
    const endPoint = 'getUsersCount'
    const reponse = await Local.get(baseUrl + endPoint)
      .then((response) => {
        return response
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }
}


export default new UserRepository()
