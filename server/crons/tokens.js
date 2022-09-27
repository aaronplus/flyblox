const https = require('https')
const Tokens = require('../models/Token')

const tokensCronJob = async () => {
  let tokens = await Tokens.find();
  let tokenString = [...tokens].map(t => t.symbol).join();
  await https
    .get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tokenString}&tsyms=USD&api_key=16006fcaf8387409a01a5c69f9712d349cf6297dde58cc7f220cb7317753fe0d`,
      resp => {
        let data = ''
        // A chunk of data has been received.
        resp.on('data', chunk => {
          data += chunk
        })

        // The whole response has been received. update the price.
        resp.on('end', () => {
          let parsedData = JSON.parse(data);
          tokens.forEach((token) => {
            if (parsedData[token.symbol]){
              let firstquery = { symbol: token.symbol }
              let firstvalue = {
                $set: { price: parsedData[token.symbol].USD }
              }

              Tokens.updateOne(firstquery, firstvalue, (_err, res) => {
                console.log('[Price updated for '+token.symbol+'] Completed!')
              })
            }
            
          })
          
          // let secondquery = { symbol: 'USDT' }
          // let secondvalue = {
          //   $set: { price: JSON.parse(data).USDT.USD }
          // }

          // Tokens.updateOne(firstquery, firstvalue, (_err, res) => {
          //   console.log('[Price updated] Completed!')
          // })
          // Tokens.updateOne(secondquery, secondvalue, (err, res) => {
          //   console.log('[Price updated] Completed!')
          // })
        })
      }
    )
    .on('error', err => {
      console.log('Error: ' + err.message)
    })
}

module.exports = tokensCronJob
