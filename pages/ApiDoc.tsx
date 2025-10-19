import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode; language?: string }> = ({ children, language = 'javascript' }) => (
    <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4 text-sm">
        <code className={`language-${language}`}>
            {children}
        </code>
    </pre>
);

const PromptBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <details className="mt-6">
        <summary className="cursor-pointer font-semibold text-primary-600 hover:text-primary-700">
            Show Generative Prompt for Backend API
        </summary>
        <blockquote className="mt-4 p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono">
            {children}
        </blockquote>
    </details>
);

const ApiEndpointCard: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
        <div className="text-gray-700 dark:text-gray-300 space-y-4">
            {children}
        </div>
    </div>
);


const ApiDoc: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Node.js API Documentation & Prompts</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
                This guide provides a complete blueprint for building the backend API for the Find Sukoon admin panel using Node.js, Express, and either MongoDB or MySQL. Each section includes the API specification and a generative prompt you can use to create the backend code.
            </p>

            <ApiEndpointCard title="1. Project Setup & Authentication">
                <p>Initialize a Node.js project with Express. The core of the application is secure authentication using JSON Web Tokens (JWT). All protected routes will use a middleware to verify this token.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                <ul className="list-disc list-inside">
                    <li><code>POST /api/auth/login</code>: Authenticates an admin and returns a JWT.</li>
                </ul>
                <PromptBlock>
{`Create a complete Node.js project setup using Express.

1.  **Project Structure**: Create folders for \`config\`, \`routes\`, \`controllers\`, \`middleware\`, and \`models\`.
2.  **Dependencies**: The \`package.json\` should include \`express\`, \`jsonwebtoken\`, \`bcryptjs\`, \`cors\`, \`dotenv\`, and \`express-validator\`. For the database, include either \`mongoose\` (for MongoDB) or \`sequelize\` and \`mysql2\` (for MySQL). For notifications, include \`firebase-admin\`.
3.  **Database Connection**: Set up the database connection in a \`config/db.js\` file.
4.  **Admin Model**: Create the \`Admin\` model based on the detailed schema from the documentation (either Mongoose or Sequelize). In a separate script, add a default admin with email "admin@findsukoon.com" and password "password" (hash the password with bcryptjs).
5.  **Auth Controller**: Create a controller with a \`login\` function. It should find the admin by email, compare the hashed password, and if valid, generate a JWT.
6.  **Auth Route**: Create a route \`POST /api/auth/login\` that points to the login controller function.
7.  **Auth Middleware**: Create a file \`middleware/auth.js\`. This middleware should read and verify the JWT from the 'Authorization' header.`}
                </PromptBlock>
            </ApiEndpointCard>

            <ApiEndpointCard title="2. Database Schema Design">
                <p>The foundation of the backend is a well-structured database. Below are two complete schema designs, one for MongoDB (NoSQL) and one for MySQL (SQL). Choose the one that best fits your technology stack.</p>

                <details className="mt-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                    <summary className="font-semibold text-lg cursor-pointer">View Schema for MongoDB (NoSQL)</summary>
                    <div className="mt-4 space-y-4">
                        <h3 className="text-xl font-semibold">Mongoose Schemas</h3>
                        <p>Note the addition of `fcmTokens` arrays to User and Listener schemas for push notifications.</p>

                        <CodeBlock language="javascript">{`// adminSchema.js
const adminSchema = new mongoose.Schema({ email: { type: String, required: true, unique: true }, password: { type: String, required: true } });

// userSchema.js
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: String,
    status: { type: String, enum: ['Active', 'Suspended', 'Deleted'], default: 'Active', index: true },
    wallet: { type: Number, default: 0 }, // Store as paise/cents
    fcmTokens: [String],
    lastLogin: Date,
}, { timestamps: true });

// listenerSchema.js
const listenerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: ['Active', 'Pending', 'Blocked'], default: 'Pending', index: true },
    rate: { type: Number, required: true }, // Per minute, in paise/cents
    bio: String,
    expertise: { type: [String], index: true },
    fcmTokens: [String],
}, { timestamps: true });

// sessionSchema.js
const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    listenerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listener', required: true, index: true },
    type: { type: String, enum: ['Chat', 'Call', 'Video'], required: true },
    status: { type: String, enum: ['Ongoing', 'Completed', 'Cancelled'], required: true, index: true },
    duration: String, // e.g., "15:32"
    cost: { type: Number, default: 0 },
    startedAt: { type: Date, required: true },
    endedAt: Date,
    transcript: [{ sender: String, message: String, timestamp: Date }],
}, { timestamps: true });

// transactionSchema.js
const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['Credit', 'Debit', 'Refund'], required: true, index: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Completed', 'Pending', 'Failed'], required: true, index: true },
    method: String, // e.g., 'Payment Gateway', 'Manual Adjustment'
    description: String,
}, { timestamps: true });

// feedbackSchema.js
const feedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listenerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listener', required: true },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
}, { timestamps: true });

// ticketSchema.js
const ticketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    subject: String,
    description: String,
    status: { type: String, enum: ['Open', 'Closed', 'In Progress'], default: 'Open', index: true },
    history: [{
        author: { type: String, enum: ['User', 'Admin'] },
        message: String,
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// settingSchema.js
const settingSchema = new mongoose.Schema({
    // A single document will store all settings
    platformName: String,
    supportEmail: String,
    defaultCallRate: Number,
    // ... all other settings fields
}, { capped: { size: 1024, max: 1 } }); // Capped collection to ensure only one settings doc
`}</CodeBlock>
                         <h3 className="text-xl font-semibold mt-6">Performance & Indexing</h3>
                         <p>Indexes are crucial for fast query performance. The schemas above already include recommended indexes on key fields like emails, statuses, and foreign keys (`userId`, `listenerId`).</p>
                    </div>
                </details>
                
                <details className="mt-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                     <summary className="font-semibold text-lg cursor-pointer">View Schema for MySQL (SQL)</summary>
                      <div className="mt-4 space-y-4">
                        <h3 className="text-xl font-semibold">SQL `CREATE TABLE` Statements</h3>
                        <p>Note the use of foreign keys for data integrity and join tables for many-to-many relationships.</p>
                        
                        <CodeBlock language="sql">{`
-- Admins Table
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    status ENUM('Active', 'Suspended', 'Deleted') DEFAULT 'Active',
    wallet INT DEFAULT 0, -- Store as paise/cents
    fcm_tokens JSON, -- Store as a JSON array of strings
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_status (status),
    INDEX idx_user_email (email)
);

-- Listeners, Expertise & Join Table
CREATE TABLE listeners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('Active', 'Pending', 'Blocked') DEFAULT 'Pending',
    rate INT NOT NULL, -- Rate per minute in paise/cents
    bio TEXT,
    fcm_tokens JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_listener_status (status)
);
CREATE TABLE expertise ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE );
CREATE TABLE listener_expertise (
    listener_id INT, expertise_id INT, PRIMARY KEY (listener_id, expertise_id),
    FOREIGN KEY (listener_id) REFERENCES listeners(id) ON DELETE CASCADE,
    FOREIGN KEY (expertise_id) REFERENCES expertise(id) ON DELETE CASCADE
);

-- Sessions Table
CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    listener_id INT NOT NULL,
    type ENUM('Chat', 'Call', 'Video') NOT NULL,
    status ENUM('Ongoing', 'Completed', 'Cancelled') NOT NULL,
    duration VARCHAR(50), cost INT DEFAULT 0, started_at DATETIME, ended_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (listener_id) REFERENCES listeners(id),
    INDEX idx_session_user (user_id),
    INDEX idx_session_listener (listener_id)
);

-- Transactions Table
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('Credit', 'Debit', 'Refund') NOT NULL,
    amount INT NOT NULL,
    status ENUM('Completed', 'Pending', 'Failed') NOT NULL,
    method VARCHAR(100), description TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_transaction_user (user_id)
);

-- Feedback Table
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    listener_id INT NOT NULL,
    session_id INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (listener_id) REFERENCES listeners(id),
    FOREIGN KEY (session_id) REFERENCES sessions(id)
);

-- Tickets & Replies Tables
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(255), description TEXT,
    status ENUM('Open', 'Closed', 'In Progress') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE ticket_replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    author ENUM('User', 'Admin') NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
);

-- Settings Table
CREATE TABLE settings (
    id INT PRIMARY KEY DEFAULT 1, -- Only one row
    platform_name VARCHAR(255),
    support_email VARCHAR(255),
    default_call_rate INT,
    -- ... all other settings fields
    CONSTRAINT single_row CHECK (id = 1)
);
`}</CodeBlock>
                        <h3 className="text-xl font-semibold mt-6">Performance & Indexing</h3>
                        <p>Indexes are crucial for query performance. The `CREATE TABLE` statements above already include recommended indexes on foreign keys and frequently queried columns like `status` and `email`.</p>
                    </div>
                </details>
            </ApiEndpointCard>
            
            <ApiEndpointCard title="3. User & Listener Management API">
                <p>Endpoints for CRUD operations for both users and listeners.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                <ul className="list-disc list-inside">
                    <li><code>GET /api/users</code> &amp; <code>GET /api/listeners</code>: Fetch lists with filtering (by status, date), sorting, and pagination.</li>
                    <li><code>GET /api/users/:id</code> &amp; <code>GET /api/listeners/:id</code>: Get details for a single user/listener, including related data.</li>
                    <li><code>PUT /api/users/:id/status</code>: Update a user's status.</li>
                    <li><code>PUT /api/listeners/:id/status</code>: Update listener status.</li>
                </ul>
                 <PromptBlock>
{`Using Node.js and Express, create the full set of API endpoints for managing Users and Listeners, based on the detailed database schema design. All routes must be protected by the JWT auth middleware.

**For MongoDB (Mongoose):**
1.  Create the Mongoose models for 'User' and 'Listener' as defined in the schema documentation, including indexes.
2.  For detail routes (\`GET /api/users/:id\`), use Mongoose's \`.populate()\` or separate queries to fetch associated sessions and transactions.

**For MySQL (Sequelize):**
1.  Define the Sequelize models for 'User', 'Listener', 'Expertise', and 'ListenerExpertise', including all associations (e.g., User hasMany Sessions, Listener belongsToMany Expertise).
2.  For detail routes (\`GET /api/users/:id\`), use Sequelize's \`include\` option to perform JOINs and fetch associated data in a single query.

**For Both:**
1.  Implement filtering by \`status\` and date range for list routes. Add pagination and sorting.
2.  Create controllers and routes for all specified endpoints.`}
                </PromptBlock>
            </ApiEndpointCard>

            <ApiEndpointCard title="4. Wallet & Transactions API">
                <p>Endpoints for viewing transactions and performing manual wallet adjustments.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                 <ul className="list-disc list-inside">
                    <li><code>GET /api/transactions</code>: Fetch transactions with filters for type, status, and date range.</li>
                    <li><code>POST /api/wallet/adjust</code>: Manually credit or debit a user's wallet. This must be a database transaction.</li>
                </ul>
                <PromptBlock>
{`Create the API for handling wallet transactions in Node.js, based on the defined schemas. All routes must be protected.

1.  **Transaction Model**: Create the model for 'Transaction' as specified (Mongoose or Sequelize).
2.  **Transaction Controller**:
    *   \`GET /api/transactions\`: Create a function to fetch all transactions. It must support filtering by \`type\`, \`status\`, and search by user name or ID. Add pagination.
    *   \`POST /api/wallet/adjust\`: This is a critical transaction. Use a database transaction (\`session\` in Mongoose, \`transaction\` in Sequelize) to ensure atomicity. The function must:
        a. Start a transaction.
        b. Find the user by \`userId\` and update their \`wallet\` balance.
        c. Create a new record in the Transaction table.
        d. Commit the transaction. If any step fails, roll it back.`}
                </PromptBlock>
            </ApiEndpointCard>
            
             <ApiEndpointCard title="5. Session Management API">
                <p>Endpoints for viewing session history and details, including chat transcripts.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                 <ul className="list-disc list-inside">
                    <li><code>GET /api/sessions</code>: Fetch all historical sessions.</li>
                    <li><code>GET /api/sessions/live</code>: Fetch all currently active sessions.</li>
                    <li><code>POST /api/sessions/:id/end</code>: Endpoint for admins to forcibly end a session.</li>
                </ul>
                <PromptBlock>
{`Build the API endpoints for session management in Node.js. All routes must be protected.

1.  **Session Model**: Create the Mongoose or Sequelize model for 'Session'.
2.  **Session Controller**:
    *   \`GET /api/sessions\`: Fetch historical sessions (status is 'Completed' or 'Cancelled'). Support pagination and filtering. Include user and listener names.
    *   \`GET /api/sessions/live\`: Fetch all sessions where status is 'Ongoing'. Include user and listener names.
    *   \`GET /api/sessions/:id\`: Fetch a single session by its ID.
    *   \`POST /api/sessions/:id/end\`: Forcibly end a session by updating its status to 'Completed' and setting the 'endedAt' timestamp.`}
                </PromptBlock>
            </ApiEndpointCard>

            <ApiEndpointCard title="6. Feedback Management API">
                <p>Endpoint to retrieve user feedback for monitoring and quality assurance.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                <ul className="list-disc list-inside">
                    <li><code>GET /api/feedback</code>: Fetch a list of all feedback, with user and listener details.</li>
                </ul>
                <PromptBlock>
{`Create the API for retrieving feedback in Node.js.

1. **Feedback Model**: Create the 'Feedback' model as specified.
2. **Feedback Controller**:
   - \`GET /api/feedback\`: Fetch all feedback entries. Use \`.populate()\` (Mongoose) or \`include\` (Sequelize) to include the names of the user and listener. Implement pagination.`}
                </PromptBlock>
            </ApiEndpointCard>

            <ApiEndpointCard title="7. Support Ticket Management API">
                <p>Endpoints for viewing and responding to user support tickets.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                <ul className="list-disc list-inside">
                    <li><code>GET /api/tickets</code>: Fetch all support tickets.</li>
                    <li><code>GET /api/tickets/:id</code>: Get a single ticket with its full conversation history.</li>
                    <li><code>POST /api/tickets/:id/reply</code>: Add an admin reply to a ticket.</li>
                </ul>
                <PromptBlock>
{`Build the support ticket API in Node.js.

1. **Ticket Models**: Create the 'Ticket' and 'TicketReply' models (or embedded history for Mongoose).
2. **Ticket Controller**:
   - \`GET /api/tickets\`: Fetch a paginated list of all tickets.
   - \`GET /api/tickets/:id\`: Fetch a single ticket and its full conversation history.
   - \`POST /api/tickets/:id/reply\`: Add a new reply to a ticket's history. Update the ticket's status if necessary.`}
                </PromptBlock>
            </ApiEndpointCard>

            <ApiEndpointCard title="8. Push Notifications API">
                <p>Endpoints to send custom notifications, manage automations, and view analytics. This will require the `firebase-admin` SDK.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                <ul className="list-disc list-inside">
                    <li><code>POST /api/notifications/send</code>: Send a custom, manually composed notification.</li>
                    <li><code>GET /api/notifications/automations</code>: Get the list of all automated notification rules.</li>
                    <li><code>PUT /api/notifications/automations/:id</code>: Update an automation rule (e.g., toggle active status).</li>
                </ul>
                <PromptBlock>
{`Build the Push Notifications API using Node.js and the Firebase Admin SDK.

1. **Setup**: Initialize the Firebase Admin SDK with your service account credentials.
2. **Notification Controller**:
   - \`POST /api/notifications/send\`: This function will receive a title, message, and target audience (e.g., 'allUsers', 'allListeners', or a custom segment).
     a. Fetch the FCM device tokens for the target audience from the database.
     b. Construct the FCM payload.
     c. Use \`admin.messaging().sendToDevice()\` to send the push notifications.
     d. Handle and log success/failure responses from FCM.
   - **(For Automatic Notifications)**: Create a separate module for triggers. For example, a function \`handleLowBalance(user)\` would be called from your wallet logic, which then constructs and sends a specific "Low Balance" notification to that user's FCM tokens.`}
                </PromptBlock>
            </ApiEndpointCard>

            <ApiEndpointCard title="9. Reports & Analytics API">
                <p>These endpoints will provide aggregated data for the dashboard charts. This requires efficient database queries.</p>
                 <PromptBlock>
{`Create API endpoints for the Reports dashboard using Node.js. These endpoints will perform data aggregation.

1.  **Summary Endpoint (\`GET /api/reports/summary\`)**:
    *   Calculate total counts for users, listeners, and sessions.
    *   Calculate total revenue (sum of completed 'Credit' transactions in the last 30 days).
    *   Calculate the average rating from the Feedback table.
    *   Return all five stats in a single JSON object.

2.  **Chart Endpoints**: 
    *   **For MongoDB**: Use the MongoDB Aggregation Pipeline ($group, $sum, $avg).
    *   **For MySQL**: Use Sequelize with aggregate functions like \`COUNT\`, \`SUM\`, and the \`GROUP BY\` clause.
    *   Implement all chart endpoints: User Growth, Revenue Over Time, Top Listeners, Session Volume, and Payment Sources.`}
                </PromptBlock>
            </ApiEndpointCard>
            
            <ApiEndpointCard title="10. Settings API">
                <p>Endpoints to fetch and save all platform configurations from the Settings page.</p>
                <PromptBlock>
{`Create API endpoints to manage application settings.

1.  **Settings Model**: Create a model/table for 'Setting' to store a single document/row containing all configurations.
2.  **Settings Controller**:
    *   \`GET /api/settings\`: Fetch the current settings.
    *   \`POST /api/settings\`: Save or update the settings.`}
                </PromptBlock>
            </ApiEndpointCard>
            
            <ApiEndpointCard title="11. Real-Time Updates with WebSockets">
                <p>Use Socket.io to push real-time updates to the admin panel, primarily for the Live Sessions and Monitoring pages.</p>
                 <PromptBlock>
{`Integrate Socket.io into the Node.js/Express application for real-time updates.

1.  **Setup**: Configure a Socket.io server to run alongside the Express app.
2.  **Integration with Session/User Logic**:
    *   Whenever a new session's status changes to 'Ongoing' or a user's status changes, emit a \`live_activity_update\` event.
    *   This event should contain the full, updated list of live sessions and key stats (e.g., number of online users/listeners).
    *   The frontend will listen for this single event and update all relevant components on the Live Dashboard.`}
                 </PromptBlock>
            </ApiEndpointCard>

        </div>
    );
};

export default ApiDoc;