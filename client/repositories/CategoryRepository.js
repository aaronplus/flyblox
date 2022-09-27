import Repository, { Local, basePostUrl, serializeQuery, baseUrl } from "./Repository"
class PostRepository {
  constructor(callback) {
    this.callback = callback
  }

  async getCategories() {
    // const endPoint = `posts?${serializeQuery(payload)}`;
    const reponse = await Local.get(
      `${baseUrl}/api/category/getAll`
    )
      .then((response) => {
        if (response.data.categories.length > 0) {
          return response.data.categories
        } else {
          return null
        }
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getCategory(payload) {
    // const endPoint = `posts?${serializeQuery(payload)}`;
    const reponse = await Local.get(
      `${baseUrl}/api/category/getById/${payload}`
    )
      .then((response) => {
        if (response.data.category) {
          return response.data.category
        } else {
          return null
        }
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }
}

export default new PostRepository()
