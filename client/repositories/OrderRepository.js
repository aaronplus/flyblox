import Repository, {
  Local,
  basePostUrl,
  serializeQuery,
  baseUrl,
} from './Repository'
const baseOrderUrl = `${baseUrl}/api/order`
import Web3 from 'web3'
import { MarketAbi } from './abi'
import { calculateAmount } from '~/utilities/ecomerce-helpers'
import { ethers } from 'ethers'
import moment from 'moment'

class OrderRepository {
  constructor(callback) {
    this.callback = callback
  }

  async Verify(payload) {
    let contractAddr = payload.token?.contract
    let contractAbi = payload.token?.abi
    let amount = calculateAmount(payload.orderItems, payload.token?.price)

    amount = amount.toFixed(18)
    let amountEther = ethers.utils.parseEther(amount.toString())

    const accounts = await window.ethereum.enable()
    const account = accounts[0]
    // const account = '0xDf032Bc4B9dC2782Bb09352007D4C57B75160B15'
    const web3 = new Web3(Web3.givenProvider)

    const SMARTContract = new web3.eth.Contract(contractAbi, contractAddr)

    const permission = await SMARTContract.methods
      .approve(contractAddr, amountEther)
      .send({ from: account })

    return permission
  }

  async Payment(payload) {
    console.log('payload', payload)
    let contractAddr = payload.token?.contract
    let amount = calculateAmount(payload.orderItems, payload.token?.price)
    amount = amount.toFixed(18)
    let amountEther = ethers.utils.parseEther(amount.toString())
    let seller_address = payload?.seller?.walletAddress

    const accounts = await window.ethereum.enable()
    const account = accounts[0]
    // const account = '0xDf032Bc4B9dC2782Bb09352007D4C57B75160B15'
    const web3 = new Web3(Web3.givenProvider)
    
    const bitylraContractAddress = payload?.contract?.address || '0x2A26d5f98759b2e60F5C087aa272883F8C0F5C17'
    const MarketContract = new web3.eth.Contract(
      MarketAbi,
      bitylraContractAddress
    )

    let MaxShippingDays = Math.max.apply(
      Math,
      payload.orderItems.map(function (item) {
        return item.product.shippingDays
      })
    )
    MaxShippingDays = MaxShippingDays + 1
    let date = new Date()
    date.setMinutes(date.getMinutes() + 10)
    date.setDate(date.getDate() + MaxShippingDays)
    let shippingDate = date.getTime()

    console.log('Data', seller_address, shippingDate, contractAddr, amountEther)
    // 500000000

    const result = await MarketContract.methods
      .createAndDeposit(seller_address, shippingDate, contractAddr, amountEther)
      .send({
        from: account,
      })
    console.log('result is', result)

    return result
  }

  async submitOrder(payload) {
    const reponse = await Local.post(baseUrl + `/api/order/add`, payload)
      .then((response) => {
        return response
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async releasePayment(orderId) {
    const web3 = new Web3(Web3.givenProvider)

    const bitylraContractAddress = '0x2A26d5f98759b2e60F5C087aa272883F8C0F5C17'
    const MarketContract = new web3.eth.Contract(
      MarketAbi,
      bitylraContractAddress
    )
    console.log('marketContract', MarketContract)
    console.log('orderId', orderId)
    const accounts = await web3.eth.getAccounts()
    const fromAddress = accounts[0]
    // console.log(` From address ---> ${fromAddress}`)
    const result = await MarketContract.methods
      .markCompleteAndreleaseFundsToSeller(orderId)
      .send({ from: fromAddress })
    console.log('result', result)
    return result
  }

  async claimPayment(orderId) {
    const web3 = new Web3(Web3.givenProvider)

    const bitylraContractAddress = '0x2A26d5f98759b2e60F5C087aa272883F8C0F5C17'
    const MarketContract = new web3.eth.Contract(
      MarketAbi,
      bitylraContractAddress
    )
    console.log('marketCOntract', MarketContract)
    console.log('orderId', orderId)
    const accounts = await web3.eth.getAccounts()
    const toAddress = accounts[0]
    // console.log(` From address ---> ${fromAddress}`)
    const result = await MarketContract.methods
      .claimFundsFromBuyer(orderId)
      .send({ to: toAddress })
    console.log('result', result)
    return result
  }

  async getSellerOrders() {
    const endPoint = `getSellerOrders`
    const reponse = await Local.get(`${baseOrderUrl}/${endPoint}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getUserOrders() {
    const endPoint = `getBuyerOrders`
    const reponse = await Local.get(`${baseOrderUrl}/${endPoint}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async changeOrderStatus(payload) {
    const endPoint = `changeStatus`
    const reponse = await Local.put(
      `${baseOrderUrl}/${endPoint}/${payload.productId}`,
      { action: payload.action, orderItemId: payload.orderItemId }
    )
      .then(async (response) => {
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getOrderFeedBack(payload, filter) {
    let endPoint
    if (filter == 'Seller') {
      endPoint = `getOrderFeedbackBySeller`
    } else {
      endPoint = `getOrderFeedbackByBuyer`
    }
    console.log('pay', payload)
    const reponse = await Local.post(`${baseOrderUrl}/${endPoint}`, payload)
      .then(async (response) => {
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async addOrderFeedBack(payload) {
    const endPoint = `addFeedback`
    const reponse = await Local.post(
      `${baseOrderUrl}/${endPoint}/${payload.orderId}`,
      payload
    )
      .then(async (response) => {
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async addTrackingNumber(payload) {
    const endPoint = `addTrackingNumber`
    const reponse = await Local.post(
      `${baseOrderUrl}/${endPoint}/${payload.orderId}`,
      payload
    )
      .then(async (response) => {
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async addOrderDispute(payload) {
    const endPoint = `addDispute`
    const reponse = await Local.post(
      `${baseOrderUrl}/${endPoint}/${payload.orderId}`,
      payload
    )
      .then(async (response) => {
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getDispute(payload) {
    const endPoint = `getOrderDispute`
    const reponse = await Local.post(`${baseOrderUrl}/${endPoint}`, payload)
      .then((response) => {
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async getDisputes() {
    const endPoint = `getOrderDisputes`
    const reponse = await Local.post(`${baseOrderUrl}/${endPoint}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async addDisputeMessage(payload) {
    const endPoint = `addDisputeMessage`
    const reponse = await Local.post(
      `${baseOrderUrl}/${endPoint}/${payload.id}`,
      payload
    )
      .then(async (response) => {
        return response
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
    return reponse
  }

  async closeDispute(payload) {
    const endPoint = `closeDispute`
    const reponse = await Local.put(
      `${baseOrderUrl}/${endPoint}/${payload.id}`,
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
