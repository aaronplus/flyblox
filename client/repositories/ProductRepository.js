import Repository, {
  Local,
  baseUrl,
  serializeQuery
} from './Repository'
const baseProductUrl = `${baseUrl}/api/product`

class ProductRepository {
  async getRecords(params) {
    const reponse = await Repository.get(
      `${baseUrl}/api/products?${serializeQuery(params)}`
    )
      .then(response => {
        return response.data
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getProducts(params) {
    const endPoint = `getAll`
    const reponse = await Local.get(
      `${baseProductUrl}/${endPoint}`
      // `${baseUrl}/products?${serializeQuery(params)}`
    )
      .then(response => {
        if (
          response.data.products &&
          response.data.products.length > 0
        ) {
          return response.data.products
        } else {
          return null
        }
      })

      .catch(error => {
        console.log(JSON.stringify(error))
        return null
      })
    return reponse
  }

  async getProductsByPagination(params) {
    const endPoint = `getAllPaginated`
    const reponse = await Local.get(
      `${baseProductUrl}/${endPoint}?${serializeQuery(params)}`
      // `${baseUrl}/products?${serializeQuery(params)}`
    )
      .then(response => {
        if (
          response.data.products &&
          response.data.products.length > 0
        ) {
          return response.data.products
        } else {
          return null
        }
      })

      .catch(error => {
        console.log(JSON.stringify(error))
        return null
      })
    return reponse
  }

  async getBrands() {
    const reponse = await Repository.get(`${baseUrl}/api/brands`)
      .then(response => {
        return response.data
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getProductCategories() {
    const reponse = await Repository.get(
      `${baseUrl}/api/product-categories`
    )
      .then(response => {
        return response.data
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getTotalRecords() {
    const reponse = await Local.get(`${baseUrl}/api/product/total`)
      .then(response => {
        return response.data
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getProductsById(payload) {
    const reponse = await Local.get(
      `${baseUrl}/api/product/getById/${payload}`
    )
      // const reponse = await Repository.get(`${baseUrl}/products/${payload}`)
      .then(response => {
        return response.data
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getProductsByCategory(payload) {
    const reponse = await Local.get(
      `${baseUrl}/api/product/getByCategory/${payload}`
      // `${baseUrl}/product-categories?slug=${payload}`
    )
      .then(response => {
        if (response.data.products) {
          if (response.data.products.length > 0) {
            return response.data.products
          }
        } else {
          return null
        }
      })
      .catch(() => {
        return null
      })
    return reponse
  }

  async getProductsBySeller() {
    const endPoint = `getBySeller`
    const reponse = await Local.get(`${baseProductUrl}/${endPoint}`)
      .then(response => {
        if (response.data.products) {
          if (response.data.products.length > 0) {
            return response.data.products
          }
        } else {
          return null
        }
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getProductsByBrand(payload) {
    const reponse = await Repository.get(
      `${baseUrl}/api/brands?slug=${payload}`
    )
      .then(response => {
        if (response.data) {
          if (response.data.length > 0) {
            return response.data[0]
          }
        } else {
          return null
        }
      })
      .catch(() => {
        return null
      })
    return reponse
  }

  async getProductsByBrands(payload) {
    let query = ''
    payload.forEach(item => {
      if (query === '') {
        query = `id_in=${item}`
      } else {
        query = query + `&id_in=${item}`
      }
    })
    const reponse = await Repository.get(
      `${baseUrl}/api/brands?${query}`
    )
      .then(response => {
        return response.data
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getProductsByBrands(payload) {
    let query = ''
    payload.forEach(item => {
      if (query === '') {
        query = `id_in=${item}`
      } else {
        query = query + `&id_in=${item}`
      }
    })
    const reponse = await Repository.get(
      `${baseUrl}/api/sbrands?${query}`
    )
      .then(response => {
        return response.data
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getProductsByPriceRange(payload) {
    const reponse = await Repository.get(
      `${baseUrl}/api/products?${serializeQuery(payload)}`
    )
      .then(response => {
        return response.data
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getProductsByIds(payload) {
    const endPoint = `getByIds`
    const reponse = await Local.post(
      `${baseProductUrl}/${endPoint}`,
      payload
    )
      .then(response => {
        if (
          response.data.products &&
          response.data.products.length > 0
        ) {
          return response.data.products
        } else {
          return null
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error))
        return null
      })
    return reponse
  }

  async addProduct(payload) {
    const endPoint = `add`
    const reponse = await Local.post(
      `${baseProductUrl}/${endPoint}`,
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

  async editProduct(payload) {
    const endPoint = `update/${payload.id}`
    const reponse = await Local.put(
      `${baseProductUrl}/${endPoint}`,
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

  async statusChange(payload) {
    const endPoint = `statusChanged`
    const reponse = await Local.patch(
      `${baseProductUrl}/${endPoint}`,
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

  async updateImages(id, payload) {
    const endPoint = `updateImages/${id}`
    const reponse = await Local.patch(
      `${baseProductUrl}/${endPoint}`,
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
        console.log(error)
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

  async getProductReviews(payload) {
    const reponse = await Repository.get(
      `${baseUrl}/api/product/getReviews/${payload}`
    )
      .then(response => {
        return response.data
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getProductRating(payload) {
    const reponse = await Repository.get(
      `${baseUrl}/api/product/getRating/${payload}`
    )
      .then(response => {
        return response.data
      })
      .catch(error => ({ error: JSON.stringify(error) }))
    return reponse
  }


  async getLatestProduct() {
    const endPoint = `get-latest-product`
    const reponse = await Local.get(
      `${baseProductUrl}/${endPoint}`,
    )
      .then(response => {
        if (response.status === 200) {
          return response.data
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

export default new ProductRepository()
