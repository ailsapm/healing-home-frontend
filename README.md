# Healing Home Frontend

## Requirements

- Node.js v20.19.1  
- npm v10.8.2  
- Backend (Rails) must be running on `http://localhost:3000`

## Setup Instructions

1 **Download code**  
- In GitBash use cd command to navigate into downloaded project directory

2. **Install Dependencies**  
- In GitBash run the following to install all required packages:

  npm install

3. **Start the Development Server**
- In GitBash, start the frontend app on port 3001 by running:

  npm start

**Dependencies**
- react-router-dom is used for client-side routing and is already listed in package.json.
- All dependencies will be installed automatically when you run npm install.
- Note: Bootstrap is imported via CDN in public/index.html. No additional npm installation is 
  needed for Bootstrap.

**Test Login Info**
- The backend seeds.rb creates an admin user for testing. The login info is:
  Email: admin@example.com
  Password: password

**Notes:**
- You need to start the backend first, so that the frontend then defaults to 3001 - you will likely 
  be notified there is another application running on 3000 and asked would you like to run this app on another port. Hit Y for yes, then verify it is running on 3001. 
- Seed the backend
