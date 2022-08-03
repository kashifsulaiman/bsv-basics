import { useState, useEffect } from 'react'
import * as bsv from 'bsv'
import CryptoJS from 'crypto-js'
import { QRCodeSVG } from 'qrcode.react'
import { getExchangeRates, getWalletBalance } from './config/api'

function App() {
  const [privateKey, setPrivateKey] = useState()
  const [encKey, setEncKey] = useState()
  const [decKey, setDecKey] = useState()
  const [publicKey, setPublicKey] = useState()
  const [address, setAddress] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [walletBalance, setWalletBalance] = useState()

  useEffect(() => {
    generateKeys()
    getAndSetExchangeRates()
  }, [])

  useEffect(() => {
    if (address) getAndSetWalletBalance()
  }, [address])

  const generateKeys = () => {
    const privateKey = bsv.PrivKey.fromRandom()
    const publicKey = bsv.PubKey.fromPrivKey(privateKey)
    const address = bsv.Address.fromPubKey(publicKey)

    const password = 'test-123'
    const ciphertext = CryptoJS.AES.encrypt(privateKey.toString(), password).toString()
    const bytes  = CryptoJS.AES.decrypt(ciphertext, password);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    setPrivateKey(privateKey.toString())
    setEncKey(ciphertext)
    setDecKey(originalText)
    setPublicKey(publicKey.toString())
    setAddress(address.toString())
  }

  const getAndSetExchangeRates = async () => {
    try {
      const rates = await getExchangeRates()
      setExchangeRate(rates.data)
    } catch (e) {
      console.log('Error: ', e)
    }
  }

  const getAndSetWalletBalance = async () => {
    try {
      const rates = await getWalletBalance(address)
      setWalletBalance(rates.data)
    } catch (e) {
      console.log('Error: ', e)
    }
  }

  const renderExchangeRate = () => {
    if (!exchangeRate) return
    const { currency, rate } = exchangeRate
    return `currency: ${currency}, rate: ${rate}`
  }

  const renderWalletBalance = () => {
    if (!walletBalance) return
    const { confirmed, unconfirmed } = walletBalance
    return `confirmed: ${confirmed}, unconfirmed: ${unconfirmed}`
  }

  return (
    <div>
      <h3>Private Key: {privateKey}</h3>
      <h3>Encrypted Key: {encKey}</h3>
      <h3>Decrypted Key: {decKey}</h3>
      <h3>Public Key: {publicKey}</h3>
      <h3>Address: {address}</h3>
      <QRCodeSVG value={`bitcoinsv: ${address}`} />
      <h3>Exchange Rate: {renderExchangeRate()}</h3>
      <h3>Wallet Balance: {renderWalletBalance()}</h3>
    </div>
  );
}

export default App;
