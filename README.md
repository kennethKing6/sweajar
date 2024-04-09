# SuperFly SwearJar

## Project Overview

SuperFly Aerial has identified a gap in the market for a comprehensive solution that monitors and reports common office violations, such as profanity usage, forgetting to turn off mute, and tardiness to meetings. Our project aims to fill this void by developing an integrated app that facilitates the tracking of these critical stats.

These fouls can affect the productivity, communication, and morale of the team, and therefore need to be addressed. Our proposed solution would increase the awareness and accountability of the team members, and encourage them to avoid or reduce the office fouls. The solution would also be adaptable to different types of teams and workflows, as it would allow users to choose what they want to track and how they want to report it.

## Key Features

- Configurability: Users can easily create, edit, and delete teams, users, and categories to tailor the app to their specific needs.
- Multi-Tenant Functionality: The app supports multiple teams while ensuring data privacy and security between them.
- User-Friendly Dashboard: A visually appealing dashboard displays team statistics over customizable timeframes, allowing for easy monitoring of office behaviors.
- Violation Logging: Users can log violations with a simple interface, promoting transparency and accountability.
- Chart and Leaderboard Display: Statistics are presented through interactive charts and leaderboards, providing insights into team performance.
- Self-Serve/Open Access: The system is designed to be accessible to all users while safeguarding personal information and maintaining affordability.

## Technologies Used

- **Development**: The project was developed using modern web technologies and tested locally before being deployed to the GitHub repository.
- **Frontend**: React.js and Next.js were utilized for building the user interface, providing a responsive and interactive experience while maintaining a single codebase with both backend and frontend components. Material-UI (MUI) was used for UI design and components.
- **Backend**: Connecting to Firebase Database (NoSQL) for secure data storage and management. Firebase offers larger storage space compared to other free services.
- **Deployment**: The project is deployed using Netlify for hosting the application, providing seamless deployment and scalability. Git + GitHub were used for collaborative development and version control.
- **CI/CD**: GitHub Actions were implemented for continuous integration and continuous deployment (CI/CD), ensuring automated testing and deployment processes. Unit tests were utilized to maintain code quality and reliability.
- **Other Tools**: ChatGPT was utilized for generating default violation types. The Agile methodology was adopted for the software development process, promoting iterative and incremental development.

## <a href="https://firebase.google.com/docs/database/web/start">Firebase Realtime Database</a>

SwearJar database consists of four tables: Users, Teams, Violation Type, and Report.
The Users table stores information about employees, including their ID, first and last names, email, profile picture, and the teams they are associated with.
The Teams table contains details about different teams, including their ID, name, and team members.
The Violation Type table categorizes types of violations by ID, name, and a text description of the violation type.
The Report table logs instances of violations. Each record includes the report ID; IDs of the reporter and violator (employees); team ID and the specific type of violation; as well as a timestamp indicating when the violation was reported.

## Models ( Inside the project folder)

These models generally define the database structure and the data to be collected and stored in the database.
By following the path, it should indicate how that data is structured

## Installation

To install and set up the SuperFly SwearJar:

1. Install Node.js
2. Clone the SwearJar Link: https://github.com/kennethKing6/sweajar/
3. Open the project using the terminal with the following command: cd <cloned project directory>
4. Install dependencies using npm. (npm install)
5. Run the app locally or deploy it to your preferred hosting platform.

## Usage

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about
[running tests] (https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes \. Once build is complete, a build folder is created which is your production environment code that needs not to be changed.
Your app is ready to be deployed!

See the section about
[deployment] (https://facebook.github.io/create-react-app/docs/deployment) for more information.

## File Structure

src/
Assets: contains appDimensions.js, colors.js, fonts.js, paddingSizes.js, sizes.js, width.js and image files

Components: contains components of the app

- AddSwearType.js - component responsible for adding user-defined violations.
- AddTeamMember.js - component responsible for adding new members to a team or removing team members.
- Button.js
- CreateNewTeam.js - component responsible for creating a new team.
- HomepageLeaderBoard.js - Leaderboard page.
- LeaderboardChart.js - component responsible for displaying Bar Charts in the Leaderboard but is CURRENTLY UNUSED.
- LeaderboardListItem.js - component responsible for displaying team member’s data as an item on a Leaderboard.
- NavBar.js - Navigation Bar component.
- ReportButton.js
- Signin.js - Sign in page.
- Signup.js - Sign up page.
- SortButton.js - component responsible for sorting team members by selected violation.
- TeamDetails.js - Team Details page.
- TeamViewer.js - Team Viewer page.
- UserDetails.js - Profile page.
- UserDetailsChart.js - component for Bar Chart on user’s Profile page.
- UsersList.js - component responsible for displaying team members when the user creates a new report.
- ViolationSelectList.js - New Report page.
- ViolationsLineChart.js - component for LineChart on user’s Profile page.
- Welcome.js - Welcome page.

Controllers:

- homePageLeaderBoardController.js
- reportViolationsController.js
- sortReportsByTimestampController.js
- userDetailsController.js

Model:

- AppState.js
- DefaultViolations.js: This file stores all the suggested violations
- Report.js: this file stores the path to the database and the logic for reporting a user in a team
- SignedInUser.js: Stores the state of the signed in user
- SwearType.js: Contains the logic and the path of how the sweartype is stored in the database and the type of data it is stored. Generally path indicates the path of where the data is stored in firebase
- Teams.js: This file contains all the logic of team management and the path is the path format that is used for storing team information in the database.
- User.js: This file contains user information and the path to store user information in the database as well

Shared: Configuration files

- FirebaseConfig.js
- firebaseAuth.js
- firebaseDatabase.js

App.css
App.js: Project entry point
Manifest.json: Chrome extension config file
page.js: The main page for SwearJar. Contains the entry point and the page logics.

## <a href="https://legacy.reactjs.org/docs/getting-started.html">React Tutorial</a>

## <a href="https://mui.com/">UI Library used for building ui components</a>

## Package.json

This file defines all the library we have used, our test configurations and our scripts

## Development Chrome Extension

<a href="https://www.youtube.com/watch?v=IV-CgmgJDBo">How to test a chrome extension</a>
To configure chrome extensions, the manifest.json file is used to set things like permissions, the name, the version and much more. To find out how you can further configure the extension check out the official documentation.

Join us in promoting professionalism and accountability in the workplace with the SuperFly SwearJar. Let's create a workspace where respect and productivity thrive, supported by innovative technology and collaborative teamwork.

## .ENV (Required file to be added)

create a .env file in the project root directory. This file stores the credentials to a firebase account credentials.

Download the firebase configuration file from firebase

### Step 1: Go to the Firebase Console

1. Open your web browser and navigate to the Firebase Console.
2. Sign in to your Google account if prompted.
3. Select your Firebase project or create a new one if you haven't already.

### Step 2: Download the Firebase Configuration File

1. In the Firebase Console, click on the gear icon next to "Project Overview" and select "Project settings".
2. Scroll down to the "Your apps" section and click on the Web icon (</> symbol).
3. In the modal that appears, give your app a nickname (e.g., "React App") and click "Register app".
4. After registering the app, you should see a code snippet with your Firebase configuration object.
5. Copy the entire configuration object, as you'll need it in the next step.

### Step 3: Create a .env File

1. In your React project's root directory, create a new file called .env.
2. Open the .env file in a text editor.

### Step 4: Create a .env File

1. In the .env file, paste the Firebase configuration object you copied earlier.
2. Replace the values of each key with the corresponding REACT*APP* prefix, like this:
   REACT_APP_FIREBASE_API_KEY="YOUR_API_KEY"
   REACT_APP_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
   REACT_APP_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
   REACT_APP_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
   REACT_APP_FIREBASE_APP_ID="YOUR_APP_ID"
   REACT_APP_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID"
   REACT_APP_FIREBASE_DATABASE_URL="YOUR_DATABASE_URL"

3. Replace the placeholders (YOUR_API_KEY, YOUR_AUTH_DOMAIN, etc.) with the actual values from the Firebase configuration object you copied earlier.

4. Make sure there are no spaces or quotes around the values.

5. Save the .env file.

6. Open the project in your terminal

7. Make sure Nodejs is installed on your computer. Run "npm install"

8. Run "npm start" to start the project and begin testing
