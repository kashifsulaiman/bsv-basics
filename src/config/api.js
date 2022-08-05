import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.whatsonchain.com/v1/bsv/main/'
});

const taalInstance = axios.create({
  baseURL: 'https://api.taal.com/mapi/',
  headers: { 'Authorization': 'mainnet_0d6035cc7972c586d713f93cf48a0a3d' }
});

function getExchangeRates() {
  return instance.get('exchangerate')
}

function getWalletBalance(address) {
  return instance.get(`address/${address}/balance`)
}

function getTaalFeeQuote() {
  return taalInstance.get('feeQuote')
}

export {
  getExchangeRates,
  getWalletBalance,
  getTaalFeeQuote
}