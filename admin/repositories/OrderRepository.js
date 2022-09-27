import Repository, {
  Local,
  basePostUrl,
  serializeQuery,
  baseUrl,
} from './Repository'
import Web3 from 'web3'
import { MarketAbi } from './abi'

class OrderRepository {
  constructor(callback) {
    this.callback = callback
  }

  async getOrders(params) {
    const endPoint = 'orders'
    const reponse = await Local.get(
      baseUrl + endPoint + `?${serializeQuery(params)}`
    )
      .then((response) => {
        return response
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getSales() {
    const endPoint = 'getSales'
    const reponse = await Local.get(baseUrl + endPoint)
      .then((response) => {
        return response
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async releasePayment(orderId, wallerAddress) {
    console.log('Start Release', orderId, wallerAddress)
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    const adminwalletAddress = accounts[0]

    const bitylraContractAddress = '0x2a26d5f98759b2e60f5c087aa272883f8c0f5c17'
    const MarketContract = new web3.eth.Contract(
      MarketAbi,
      bitylraContractAddress
    )
    console.log('marketCOntract', MarketContract)
    console.log('orderId', orderId)
    // const accounts = await web3.eth.getAccounts()
    // console.log("accounts",accounts)
    const fromAddress = wallerAddress
    // console.log(` From address ---> ${fromAddress}`)
    const result = await MarketContract.methods
      .claimFundsFromBuyer(orderId)
      .send({ from: fromAddress })
    console.log('result', result)
    return result
  }

  async claimPayment(orderId, wallerAddress) {
    console.log('Start Claim')
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    const adminwalletAddress = accounts[0]

    const bitylraContractAddress = '0x2a26d5f98759b2e60f5c087aa272883f8c0f5c17'
    const MarketContract = new web3.eth.Contract(
      MarketAbi,
      bitylraContractAddress
    )
    console.log('marketCOntract', MarketContract)
    console.log('orderId', orderId)
    // const accounts = await web3.eth.getAccounts()
    const toAddress = wallerAddress
    // console.log(` From address ---> ${fromAddress}`)
    const result = await MarketContract.methods
      .claimFundsFromBuyer(orderId)
      .send({ to: toAddress })
    console.log('result', result)
    return result
  }

  async changeOrderStatus(payload) {
    const endPoint = `api/order/changeStatus`
    const reponse = await Local.put(
      `${process.env.baseURL}/${endPoint}/${payload.productId}`,
      { action: payload.action, orderItemId: payload.orderItemId }
    )
      .then(async (response) => {
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getDisputes() {
    const endPoint = `api/order/getOrderDisputesByAdmin`
    const reponse = await Local.get(`${process.env.baseURL}/${endPoint}`)
      .then((response) => {
        console.log('Res', response)
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async addDisputeMessage(payload) {
    const endPoint = `api/order/addDisputeMessage`
    const reponse = await Local.post(
      `${process.env.baseURL}/${endPoint}/${payload.id}`,
      payload
    )
      .then(async (response) => {
        return response
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async closeDispute(payload) {
    const endPoint = `api/order/closeDispute`
    const reponse = await Local.put(
      `${process.env.baseURL}/${endPoint}/${payload.id}`,
      { orderId: payload.orderId, orderItemId: payload.orderItemId }
    )
      .then(async (response) => {
        return response
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }
}

export default new OrderRepository()
