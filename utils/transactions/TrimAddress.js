export const TrimAddress = (walletAddress, startLength) => 
(
  `${walletAddress.slice(2, startLength)}....${walletAddress.slice(walletAddress.length - 4)}`
)