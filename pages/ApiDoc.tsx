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
                This guide provides a complete blueprint for building the backend API for the Find Sukoon admin panel using Node.js, Express, and MongoDB. Each section includes the API specification and a generative prompt you can use to create the backend code.
            </p>

            <ApiEndpointCard title="Database Schema Design (MongoDB)">
                <p>The foundation of the backend is a well-structured MongoDB database. We use a referenced data model, where documents in different collections are linked using `ObjectId`. This approach maintains data consistency and is well-suited for the relational nature of our entities.</p>
                
                <h3 className="text-xl font-semibold">Core Models & Relationships</h3>
                 <ul className="list-disc list-inside space-y-2">
                    <li><strong>User & Listener:</strong> The two primary actors in the system. They are distinct collections.</li>
                    <li><strong>Session:</strong> Connects one `User` and one `Listener`. This is a one-to-many relationship (a User can have many Sessions).</li>
                    <li><strong>Transaction:</strong> Belongs to a `User` and tracks all financial movements in their wallet.</li>
                    <li><strong>Feedback:</strong> Links a `User` to a `Listener` after a session, containing a rating and comment.</li>
                    <li><strong>Ticket:</strong> Belongs to a `User` and is used for support.</li>
                 </ul>

                <h3 className="text-xl font-semibold mt-4">Mongoose Schemas</h3>
                <p>Below are the recommended Mongoose schemas. They include types, validation, and default values.</p>
                
                <details className="space-y-4">
                    <summary className="font-semibold text-lg cursor-pointer">View Schemas</summary>
                    <div>
                        <h4 className="font-bold">Admin Schema</h4>
                        <CodeBlock language="javascript">{`const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});`}</CodeBlock>
                    </div>
                     <div>
                        <h4 className="font-bold">User Schema</h4>
                        <CodeBlock language="javascript">{`const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true }, // Indexed for fast lookups
    phone: { type: String },
    status: { type: String, enum: ['Active', 'Suspended', 'Deleted'], default: 'Active', index: true },
    wallet: { type: Number, default: 0 }, // Store currency in the smallest unit (e.g., cents)
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    address: { 
        street: String, 
        city: String, 
        state: String, 
        zip: String 
    }
}, { timestamps: true });`}</CodeBlock>
                    </div>
                     <div>
                        <h4 className="font-bold">Listener Schema</h4>
                        <CodeBlock language="javascript">{`const listenerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    status: { type: String, enum: ['Active', 'Pending', 'Blocked'], default: 'Pending', index: true },
    avgRating: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    rate: { type: Number, required: true }, // Rate per minute, in smallest currency unit
    bio: { type: String },
    expertise: { type: [String], index: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });`}</CodeBlock>
                    </div>
                    <div>
                        <h4 className="font-bold">Session Schema</h4>
                        <CodeBlock language="javascript">{`const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    listenerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listener', required: true, index: true },
    type: { type: String, enum: ['Chat', 'Call', 'Video'], required: true },
    status: { type: String, enum: ['Ongoing', 'Completed', 'Cancelled'], required: true, index: true },
    duration: { type: String }, // e.g., "15:30"
    cost: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date },
    transcript: [{
        senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
        senderModel: { type: String, enum: ['User', 'Listener'], required: true },
        message: { type: String },
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });`}</CodeBlock>
                    </div>
                    <div>
                        <h4 className="font-bold">Transaction Schema</h4>
                        <CodeBlock language="javascript">{`const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    // Denormalized fields for faster display in admin panel
    userOrListener: { type: String, required: true }, 
    type: { type: String, enum: ['Credit', 'Debit', 'Refund'], required: true, index: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ['Payment Gateway', 'Manual Adjustment', 'Session Fee'], required: true },
    status: { type: String, enum: ['Completed', 'Pending', 'Failed'], required: true, index: true },
    description: { type: String },
    date: { type: Date, default: Date.now }
}, { timestamps: true });`}</CodeBlock>
                    </div>
                </details>

                 <h3 className="text-xl font-semibold mt-6">Performance & Indexing</h3>
                 <p>Indexes are crucial for fast query performance, especially as the data grows. Ensure the following indexes are created on your MongoDB collections.</p>
                 <ul className="list-disc list-inside space-y-2">
                    <li><strong>Users:</strong> `email` (unique), `status`</li>
                    <li><strong>Listeners:</strong> `email` (unique), `status`, `expertise`</li>
                    <li><strong>Sessions:</strong> `userId`, `listenerId`, `status`</li>
                    <li><strong>Transactions:</strong> `userId`, `type`, `status`</li>
                 </ul>
            </ApiEndpointCard>
            
            <ApiEndpointCard title="1. Project Setup & Authentication">
                <p>Initialize a Node.js project with Express. The core of the application is secure authentication using JSON Web Tokens (JWT). All protected routes will use a middleware to verify this token.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                <ul className="list-disc list-inside">
                    <li><code>POST /api/auth/login</code>: Authenticates an admin and returns a JWT.</li>
                </ul>
                <PromptBlock>
{`Create a complete Node.js project setup using Express and Mongoose.

1.  **Project Structure**: Create folders for \`config\`, \`routes\`, \`controllers\`, \`middleware\`, and \`models\`.
2.  **Dependencies**: The \`package.json\` should include \`express\`, \`mongoose\`, \`jsonwebtoken\`, \`bcryptjs\`, \`cors\`, \`dotenv\`, and \`express-validator\`.
3.  **Database Connection**: Set up a MongoDB connection in a \`config/db.js\` file using Mongoose.
4.  **Admin Model**: Create the \`Admin\` model based on the detailed schema from the documentation. In a separate script, add a default admin with email "admin@findsukoon.com" and password "password" (hash the password with bcryptjs).
5.  **Auth Controller**: Create a controller with a \`login\` function. It should find the admin by email, compare the hashed password using bcryptjs, and if valid, generate a JWT signed with a secret from environment variables.
6.  **Auth Route**: Create a route \`POST /api/auth/login\` that points to the login controller function.
7.  **Auth Middleware**: Create a file \`middleware/auth.js\`. This middleware should read the JWT from the 'Authorization' header, verify it, and attach the decoded admin payload to the \`req\` object. If the token is invalid or missing, it should return a 401 error.`}
                </PromptBlock>
            </ApiEndpointCard>

            <ApiEndpointCard title="2. User & Listener Management API">
                <p>Endpoints for CRUD operations for both users and listeners. These are very similar in structure.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                <ul className="list-disc list-inside">
                    {/* FIX: The following list item was corrupted by a copy-paste error. */}
                    <li><code>GET /api/users</code> &amp; <code>GET /api/listeners</code>: Fetch lists with filtering (by status, date), sorting, and pagination.</li>
                    <li><code>GET /api/users/:id</code> &amp; <code>GET /api/listeners/:id</code>: Get details for a single user/listener, including related data like their sessions and transactions.</li>
                    <li><code>PUT /api/users/:id</code>: Update a user's status (e.g., 'Active', 'Suspended').</li>
                     <li><code>PUT /api/listeners/:id/approve</code>: Update listener status to 'Active'.</li>
                    <li><code>PUT /api/listeners/:id/block</code>: Update listener status to 'Blocked'.</li>
                </ul>
                 <PromptBlock>
{`Using Node.js, Express, and Mongoose, create the full set of API endpoints for managing Users and Listeners, based on the detailed database schema design. All routes must be protected by the JWT auth middleware.

1.  **User & Listener Models**: Create the Mongoose models for 'User' and 'Listener' as defined in the schema documentation. Ensure all specified indexes are created.
2.  **User Routes & Controller**:
    *   \`GET /api/users\`: Implement filtering by \`status\` and a date range for \`createdAt\`. Also add pagination and sorting.
    *   \`GET /api/users/:id\`: Return the user's profile. Use Mongoose's \`.populate()\` or separate queries to also find and return their associated sessions and transactions.
    *   \`PUT /api/users/:id\`: Update the user's status.
3.  **Listener Routes & Controller**:
    *   \`GET /api/listeners\`: Implement filtering by \`status\`, pagination, and sorting.
    *   \`GET /api/listeners/:id\`: Return the listener's profile. Also find their associated sessions and feedback.
    *   \`PUT /api/listeners/:id\`: Implement status changes, for example, changing 'Pending' to 'Active' or any status to 'Blocked'.`}
                </PromptBlock>
            </ApiEndpointCard>

            <ApiEndpointCard title="3. Wallet & Transactions API">
                <p>Endpoints for viewing transactions and performing manual wallet adjustments. Accuracy is critical.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                 <ul className="list-disc list-inside">
                    <li><code>GET /api/transactions</code>: Fetch transactions with filters for type, status, and date range.</li>
                    <li><code>POST /api/wallet/adjust</code>: Manually credit or debit a user's wallet. This must be an atomic operation.</li>
                </ul>
                <PromptBlock>
{`Create the API for handling wallet transactions in Node.js, Express, and Mongoose, based on the defined schemas. All routes must be protected by auth middleware.

1.  **Transaction Model**: Create the Mongoose model for 'Transaction' as specified in the schema design, including all indexes.
2.  **Transaction Controller**:
    *   \`GET /api/transactions\`: Create a function to fetch all transactions. It must support filtering by \`type\`, \`status\`, and search by \`userOrListener\` or transaction ID. Add pagination.
    *   \`POST /api/wallet/adjust\`: Create a function that receives \`userId\`, \`amount\`, \`type\` ('Credit' or 'Debit'), and \`reason\`. The function must perform two actions atomically (using a Mongoose session/transaction):
        a. Find the user by \`userId\` and update their \`wallet\` balance.
        b. Create a new document in the Transaction collection with the method 'Manual Adjustment' and the reason as the description.`}
                </PromptBlock>
            </ApiEndpointCard>
            
             <ApiEndpointCard title="4. Session Management API">
                <p>Endpoints for viewing session history and details, including chat transcripts.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                 <ul className="list-disc list-inside">
                    <li><code>GET /api/sessions</code>: Fetch all historical sessions with filtering.</li>
                    <li><code>GET /api/sessions/:id</code>: Get details for a single session, including its transcript.</li>
                    <li><code>GET /api/sessions/live</code>: Fetch all currently active sessions.</li>
                    <li><code>POST /api/sessions/:id/end</code>: Endpoint for admins to forcibly end a session.</li>
                </ul>
                <PromptBlock>
{`Build the API endpoints for session management in Node.js, Express, and Mongoose based on the defined Session schema. All routes must be protected.

1.  **Session Model**: Create the Mongoose model for 'Session' with all specified indexes.
2.  **Session Controller**:
    *   \`GET /api/sessions\`: Fetch historical sessions (status is 'Completed' or 'Cancelled'). Support pagination and filtering. Populate user and listener names.
    *   \`GET /api/sessions/live\`: Fetch all sessions where status is 'Ongoing'. Populate user and listener names.
    *   \`GET /api/sessions/:id\`: Fetch a single session by its ID.
    *   \`POST /api/sessions/:id/end\`: Forcibly end a session by updating its status to 'Completed' and setting the 'endedAt' timestamp. This should also trigger a WebSocket event (see next section).`}
                </PromptBlock>
            </ApiEndpointCard>
            
            <ApiEndpointCard title="5. Real-Time Updates with WebSockets">
                <p>Use Socket.io to push real-time updates to the admin panel, primarily for the Live Sessions page.</p>
                <h3 className="text-xl font-semibold">Socket Events</h3>
                <ul className="list-disc list-inside">
                    <li><strong>Server emits <code>'live_sessions_update'</code>:</strong> When a session's status changes, the server pushes the updated list of all live sessions to connected admins.</li>
                    <li><strong>Client emits <code>'force_end_session'</code>:</strong> When an admin ends a session, the client sends this event with the session ID.</li>
                </ul>
                 <PromptBlock>
{`Integrate Socket.io into the Node.js/Express application for real-time updates.

1.  **Setup**: Configure a Socket.io server to run alongside the Express app.
2.  **Connection**: Handle admin client connections.
3.  **Event Emitter Service**: Create a service or use an event emitter that can be accessed from other parts of the app (like the Session controller).
4.  **Integrate with Session Logic**:
    *   Whenever a new session starts (status becomes 'Ongoing'), emit a \`live_sessions_update\` event with the full, updated list of live sessions.
    *   Whenever a session ends (naturally or via the admin API), emit a \`live_sessions_update\` event.
5.  **Event Listener**:
    *   Create a listener for a client-side event named \`force_end_session\`. When this event is received with a \`sessionId\`, call the same logic that the \`POST /api/sessions/:id/end\` endpoint uses.`}
                 </PromptBlock>
            </ApiEndpointCard>
            
            <ApiEndpointCard title="6. Reports & Analytics API">
                <p>These endpoints will provide aggregated data for the dashboard charts. This requires efficient database queries.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                 <ul className="list-disc list-inside">
                    <li><code>GET /api/reports/summary</code>: Get the 5 main stats (total users, listeners, sessions, revenue, avg rating).</li>
                    <li><code>GET /api/reports/user-growth</code>: Get data for the user growth chart.</li>
                    <li><code>GET /api/reports/revenue-over-time</code>: Get data for the revenue chart.</li>
                </ul>
                <PromptBlock>
{`Create API endpoints for the Reports dashboard using Node.js, Express, and Mongoose. These endpoints will perform data aggregation.

1.  **Summary Endpoint (\`GET /api/reports/summary\`)**:
    *   Calculate total user count from the Users collection.
    *   Calculate total listener count from the Listeners collection.
    *   Calculate total session count from the Sessions collection.
    *   Calculate total revenue (sum of completed 'Credit' transactions in the last 30 days).
    *   Calculate the average rating from the Feedback collection.
    *   Return all five stats in a single JSON object.

2.  **Chart Endpoints**: Use the MongoDB Aggregation Pipeline for these.
    *   **User Growth (\`GET /api/reports/user-growth\`):** Group users by creation date (day or month) and return counts over time.
    *   **Revenue Over Time (\`GET /api/reports/revenue-over-time\`):** Group completed 'Credit' transactions by date and return the sum of amounts over time.
    *   **Top Listeners (\`GET /api/reports/top-listeners\`):** Group sessions by listener, calculate total earnings for each, sort descending, and return the top 5.
    *   **Session Volume (\`GET /api/reports/session-volume\`):** Group sessions by type ('Chat', 'Call', 'Video') for the last 7 days and return the counts for each type.
    *   **Payment Sources (\`GET /api/reports/payment-sources\`):** Group transactions by payment \`method\` and return the count for each.`}
                </PromptBlock>
            </ApiEndpointCard>
            
            <ApiEndpointCard title="7. Settings API">
                <p>Endpoints to fetch and save all platform configurations from the Settings page.</p>
                 <h3 className="text-xl font-semibold">API Routes</h3>
                 <ul className="list-disc list-inside">
                    <li><code>GET /api/settings</code>: Fetch the current settings object.</li>
                    <li><code>POST /api/settings</code>: Save/update the settings object.</li>
                </ul>
                <PromptBlock>
{`Create API endpoints to manage application settings.

1.  **Settings Model**: Create the Mongoose schema for 'Setting' as defined in the database design. It should store a single document containing all configurations.
2.  **Settings Controller**:
    *   \`GET /api/settings\`: Find and return the single settings document. If it doesn't exist, return a default object.
    *   \`POST /api/settings\`: Receive a settings object in the request body. Use \`findOneAndUpdate\` with \`upsert: true\` to update the single settings document in the database with the new values.`}
                </PromptBlock>
            </ApiEndpointCard>

        </div>
    );
};

export default ApiDoc;
