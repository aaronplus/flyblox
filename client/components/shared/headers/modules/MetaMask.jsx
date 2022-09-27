import { useEffect } from 'react'
import useUser from '~/hooks/useUser'
import { notification } from 'antd'

const MetaMask = ({mobile}) => {
  const { updateUser } = useUser()
  const modalWarning = (type, message) => {
    notification[type]({
      message: message
    })
  }

  async function getAccount() {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    })
    const walletAddress = accounts[0]
    const response = await updateUser({ walletAddress })
    if (response.status == 'Success') {
      mobile?
      document.getElementById('wallet_div').innerText = 'Disconnect':
      document.getElementById('wallet_btn').innerText = 'Disconnect'
      if(!mobile) document.getElementById('wallet_btn').style['border'] = 'none'
    }
  }

  async function handleConnectWallet() {
    if (typeof window.ethereum == 'undefined') {

      mobile?
        document.getElementById('wallet_div').innerText ='Metamask is not installed': 
        document.getElementById('wallet_btn').innerText ='Metamask is not installed'
    } else {
      let text = mobile?document.getElementById('wallet_div').innerText:document.getElementById('wallet_btn').innerText
      if (text == 'Connect') {
        getAccount()
      } else if (text == 'Disconnect') {
        if (!window.ethereum?.selectedAddress) {
          modalWarning('warning', 'Disconnected')
        } else {
          modalWarning('warning', 'Disconnect It form Extension')
        }
      }
    }
  }
  useEffect(() => {
    if (!window.ethereum?.selectedAddress) {
      mobile?
        document.getElementById('wallet_div').innerText = 'Connect':
        document.getElementById('wallet_btn').innerText = 'Connect'
        if(!mobile) document.getElementById('wallet_btn').style['border'] =
          '2px solid #ffffff'
    } else {
      mobile?
        document.getElementById('wallet_div').innerText = 'Disconnect':
        document.getElementById('wallet_btn').innerText = 'Disconnect'
        if(!mobile) document.getElementById('wallet_btn').style['border'] = 'none'
    }
  }, [])
  return (
    <div>
    {
      mobile?
      <div id='wallet_div' onClick={handleConnectWallet}></div>
      :
      <button
        id='wallet_btn'
        className='ps-btn'
        onClick={handleConnectWallet}
      ></button>
    }
    </div>
  )
}

export default MetaMask
