# Installation
To run the chat application

1. **Clone the Repository:** Clone the chat application repository to your local machine using the following command:

```javascript
git clone https://github.com/Abhigyan-Sh/howdy.git
```

2. **Navigate to the Project Directory:** Change your current directory to the root directory of the cloned repository:
```javascript
cd howdy
```
3. **Install Dependencies:** Install the necessary dependencies required to run the application. Assuming you have Node.js installed, run:
```javascript
yarn install
```
4. **Start the Application:** Start the chat application by running the following command:
```javascript
npm run dev
```
**Access the Application:** Once the application is running, access it through your web browser at the specified address (e.g., http://localhost:3000).

## Features

1. Real-time Communication - Utilizes WebSocket

2. User Authentication and Authorization
   - Implements secure authentication mechanisms to verify user identities.
   - Ensures that only authorized users can access chats and data within the application.

3. Supports both One-to-One chat and group chats.

4. Message Sending and Retrieval
   - Allows users to send messages within chats.
   - Endpoints for fetching message history for a given chat.

5. User Search
   - Users can create new chats by finding new users via their usernames (as each user has their unique username), find existing ones, and chat with them in Real-time

6. Group Chat Administration
   - Administrators have been granted some special rights for administration purposes in groups. This includes, 
   - renaming Group Chat, adding and removing members from group chats, giving administrators control over to other members on admin's leaving from group.

7. Features
- create one-to-one chats or group chats.
- Admin can rename group, add or remove members, leave group.
- Also any member in group can leave chat any moment.
- Users can find other users by their usernames and initiate chat.
- Real-time conversation via socket.io
- Secured routes via authentication
- Users get to know if messages has been seen or not and if seen then by how what members
- Users get to know whether if someones on the other end typing a message
- Users receive notifications if they get a message so never missing on important conversations
- Send and Receive blockchain payments on Ethereum

8. Steps to reproduce smartContract interaction
### Understanding what we need to achieve: 
application needs `abi` and the `address` to which smartContract is deployed to on blockchain alongwith passing in a `signer`. So having these three i.e. `abi`, `address` and `signer` in our client code we will be able to interact with smartContract which has been deployed on blockchain and so both read and write changes on blockchain itself from frontend

>> smartContract address: `0x711fb24FF34582D12Ca9bf4904a8Ce0f9C8B8395` ethereum sepolia

### how to get abi, address, signer ?
**TO GET ABI**
```javascript
// to get abi, we will execute this command in root directory of hardhat project and this command compiles our solidity smartContract and places it inside our artifacts/contracts folder 
npx hardhat compile
```

or we can even get abi from ethers library as well but it would be not that faster as it generates the abi in run time and is thus slower and serves no purpose to do so
```javascript
const myContractFactory = await ethers.getContractFactory('Transfer') // i.e. contract name
const abi = myContractFactory.interface.format('json')
```

**TO GET ADDRESS/ TO DEPLOY SMART CONTRACT (and then make its address access to client code)**
- Add below code to deploy.js
```javascript
const myContractFactory = await ethers.getContractFactory('Transfer') // i.e. contract name
const myContract = await myContractFactory.deploy()

console.log(`Open transaction on etherscan, 
   https://sepolia.etherscan.io/address/${myContract.address}`)
```

alternatively we can also add a promise to it
```javascript
await transactionsContract.deployed()
/* and with this now we can write code for try{} and catch(){} block to 
know whether contract got deployed or not ! 
Its so because with above command we get to know state of deployment */
```
- now execute below command
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

9. Technology Stack used
   - Nextjs, Socket.io, tailwindcss, mongoose, Ethereum blockchain, hardhat, alchemy and blockchain explorer
