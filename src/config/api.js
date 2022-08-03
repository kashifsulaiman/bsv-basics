import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.whatsonchain.com/v1/bsv/main/'
});

function getExchangeRates() {
  return instance.get('exchangerate')
}

function getWalletBalance(address) {
  return instance.get(`address/${address}/balance`)
}

export {
  getExchangeRates,
  getWalletBalance
}