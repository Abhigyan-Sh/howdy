# Installation
To run the chat application

1. **Clone the Repository:** Clone the chat application repository to your local machine using the following command:

```
git clone https://github.com/Abhigyan-Sh/howdy.git
```

2. **Navigate to the Project Directory:** Change your current directory to the root directory of the cloned repository:
```
cd howdy
```
3. **Install Dependencies:** Install the necessary dependencies required to run the application. Assuming you have Node.js installed, run:
```
yarn install
```
4. **Start the Application:** Start the chat application by running the following command:
```
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

8. Technology Stack used
   - Nextjs, Socket.io, tailwindcss, mongoose, eslint
