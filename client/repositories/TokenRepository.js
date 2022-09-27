import { Local, baseUrl } from "./Repository"
const baseProductUrl = `${baseUrl}/api/token`


export const getProductPriceAccToTokens = async (payload) => {
  const endPoint = `convertUSD`
  const reponse = await Local.post(`${baseProductUrl}/${endPoint}`, payload)
    .then((response) => {
      if (response.status === 200) {
        console.log(response)
        return { status: "Success", message: response.data }
      } else {
        return null
      }
    })
    .catch((error) => {
      console.log(error)
      if (error.response) {
        return { status: "Failed", message: error.response.data.error }
      }
      return { status: "Failed", message: "An error occurred" }
    })
  return reponse
}

export const getTokens = async () => {
  const endPoint = `getAll`
  const reponse = await Local.get(`${baseProductUrl}/${endPoint}`)
    .then((response) => {
      // console.log(response)
      if (response.status === 200) {
        return { status: "Success", message: response.data, tokens: response.data.tokens }
      } else {
        return null
      }
    })
    .catch((error) => {
      console.log(error)
      if (error.response) {
        return { status: "Failed", message: error.response.data.error }
      }
      return { status: "Failed", message: "An error occurred" }
    })
  return reponse
}



