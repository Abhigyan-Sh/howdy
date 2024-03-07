export const isValidEthereumAddress = (address) => {
  const regex = /^(0x)?[0-9a-fA-F]{40}$/
  
  // check for whether the address is a valid wallet address
  if (!regex.test(address)) {
    return false
  }
  // check whether the valid wallet address exists over sepolia testnet
  // const networkPrefix = address.substring(2, 4).toLowerCase()
  // return networkPrefix === '9f'
  return true
}