import { useState, useEffect } from 'react'
import * as bsv from 'bsv'
import CryptoJS from 'crypto-js'
import { QRCodeSVG } from 'qrcode.react'

function App() {
  const [privateKey, setPrivateKey] = useState()
  const [encKey, setEncKey] = useState()
  const [decKey, setDecKey] = useState()
  const [publicKey, setPublicKey] = useState()
  const [address, setAddress] = useState()

  useEffect(() => {
    generateKeys()
  }, [])

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

  return (
    <div>
      <h3>Private Key: {privateKey}</h3>
      <h3>Encrypted Key: {encKey}</h3>
      <h3>Decrypted Key: {decKey}</h3>
      <h3>Public Key: {publicKey}</h3>
      <h3>Address: {address}</h3>
      <QRCodeSVG value={`bitcoinsv: ${address}`} />
    </div>
  );
}

export default App;
