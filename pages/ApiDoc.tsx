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

            <ApiEndpointCard title="Database Schema Design">
                <p>The foundation of the backend is a well-structured database. Below are two complete schema designs, one for MongoDB (NoSQL) and one for MySQL (SQL). Choose the one that best fits your technology stack.</p>

                <details className="mt-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                    <summary className="font-semibold text-lg cursor-pointer">View Schema for MongoDB (NoSQL)</summary>
                    <div className="mt-4 space-y-4">
                        <h3 className="text-xl font-semibold">Core Models & Relationships</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>User & Listener:</strong> The two primary actors in the system. They are distinct collections.</li>
                            <li><strong>Session:</strong> Connects one `User` and one `Listener`. This is a one-to-many relationship (a User can have many Sessions).</li>
                            <li><strong>Transaction:</strong> Belongs to a `User` and tracks all financial movements in their wallet.</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-4">Mongoose Schemas</h3>
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
    wallet: { type: Number, default: 0 }, // Store currency in the smallest unit (e.g., cents/paise)
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    address: { street: String, city: String, state: String, zip: String }
}, { timestamps: true });`}</CodeBlock>
                        </div>
                         <h3 className="text-xl font-semibold mt-6">Performance & Indexing</h3>
                         <p>Indexes are crucial for fast query performance. Ensure the following indexes are created on your MongoDB collections.</p>
                         <ul className="list-disc list-inside space-y-2">
                            <li><strong>Users:</strong> `email` (unique), `status`</li>
                            <li><strong>Listeners:</strong> `email` (unique), `status`, `expertise`</li>
                            <li><strong>Sessions:</strong> `userId`, `listenerId`, `status`</li>
                            <li><strong>Transactions:</strong> `userId`, `type`, `status`</li>
                         </ul>
                    </div>
                </details>
                
                <details className="mt-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                     <summary className="font-semibold text-lg cursor-pointer">View Schema for MySQL (SQL)</summary>
                      <div className="mt-4 space-y-4">
                        <h3 className="text-xl font-semibold">Core Tables & Relationships</h3>
                        <p>In MySQL, we use foreign keys to establish relationships between tables. This ensures data integrity.</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>`sessions` table has foreign keys to `users(id)` and `listeners(id)`.</li>
                            <li>`transactions` and `tickets` have a foreign key to `users(id)`.</li>
                            <li>A join table, `listener_expertise`, is used to manage the many-to-many relationship between listeners and their areas of expertise.</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-4">SQL `CREATE TABLE` Statements</h3>
                        
                        <div>
                            <h4 className="font-bold">Admins Table</h4>
                            <CodeBlock language="sql">{`CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`}</CodeBlock>
                        </div>

                        <div>
                            <h4 className="font-bold">Users Table</h4>
                            <CodeBlock language="sql">{`CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    status ENUM('Active', 'Suspended', 'Deleted') DEFAULT 'Active',
    wallet INT DEFAULT 0, -- Store as paise/cents to avoid floating point issues
    last_login DATETIME,
    address_street VARCHAR(255),
    address_city VARCHAR(100),
    address_state VARCHAR(100),
    address_zip VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_status (status),
    INDEX idx_user_email (email)
);`}</CodeBlock>
                        </div>
                        
                        <div>
                            <h4 className="font-bold">Listeners & Expertise Tables</h4>
                            <CodeBlock language="sql">{`CREATE TABLE listeners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('Active', 'Pending', 'Blocked') DEFAULT 'Pending',
    avg_rating DECIMAL(3, 2) DEFAULT 0.00,
    total_sessions INT DEFAULT 0,
    total_earnings INT DEFAULT 0, -- As paise/cents
    rate INT NOT NULL, -- Rate per minute in paise/cents
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_listener_status (status)
);

CREATE TABLE expertise (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE listener_expertise (
    listener_id INT,
    expertise_id INT,
    PRIMARY KEY (listener_id, expertise_id),
    FOREIGN KEY (listener_id) REFERENCES listeners(id) ON DELETE CASCADE,
    FOREIGN KEY (expertise_id) REFERENCES expertise(id) ON DELETE CASCADE
);`}</CodeBlock>
                        </div>

                        <div>
                            <h4 className="font-bold">Sessions Table</h4>
                            <CodeBlock language="sql">{`CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    listener_id INT NOT NULL,
    type ENUM('Chat', 'Call', 'Video') NOT NULL,
    status ENUM('Ongoing', 'Completed', 'Cancelled') NOT NULL,
    duration VARCHAR(50),
    cost INT DEFAULT 0,
    started_at DATETIME,
    ended_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (listener_id) REFERENCES listeners(id),
    INDEX idx_session_user (user_id),
    INDEX idx_session_listener (listener_id)
);`}</CodeBlock>
                        </div>
                        
                        <h3 className="text-xl font-semibold mt-6">Performance & Indexing</h3>
                        <p>Indexes are crucial for query performance. The `CREATE TABLE` statements above already include recommended indexes on foreign keys and frequently queried columns like `status` and `email`.</p>
                    </div>
                </details>
            </ApiEndpointCard>
            
            <ApiEndpointCard title="1. Project Setup & Authentication">
                <p>Initialize a Node.js project with Express. The core of the application is secure authentication using JSON Web Tokens (JWT). All protected routes will use a middleware to verify this token.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                <ul className="list-disc list-inside">
                    <li><code>POST /api/auth/login</code>: Authenticates an admin and returns a JWT.</li>
                </ul>
                <PromptBlock>
{`Create a complete Node.js project setup using Express.

1.  **Project Structure**: Create folders for \`config\`, \`routes\`, \`controllers\`, \`middleware\`, and \`models\`.
2.  **Dependencies**: The \`package.json\` should include \`express\`, \`jsonwebtoken\`, \`bcryptjs\`, \`cors\`, \`dotenv\`, and \`express-validator\`. For the database, include either \`mongoose\` (for MongoDB) or \`sequelize\` and \`mysql2\` (for MySQL).
3.  **Database Connection**: Set up the database connection in a \`config/db.js\` file.
4.  **Admin Model**: Create the \`Admin\` model based on the detailed schema from the documentation (either Mongoose or Sequelize). In a separate script, add a default admin with email "admin@findsukoon.com" and password "password" (hash the password with bcryptjs).
5.  **Auth Controller**: Create a controller with a \`login\` function. It should find the admin by email, compare the hashed password, and if valid, generate a JWT.
6.  **Auth Route**: Create a route \`POST /api/auth/login\` that points to the login controller function.
7.  **Auth Middleware**: Create a file \`middleware/auth.js\`. This middleware should read and verify the JWT from the 'Authorization' header.`}
                </PromptBlock>
            </ApiEndpointCard>

            <ApiEndpointCard title="2. User & Listener Management API">
                <p>Endpoints for CRUD operations for both users and listeners. These are very similar in structure.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                <ul className="list-disc list-inside">
                    <li><code>GET /api/users</code> &amp; <code>GET /api/listeners</code>: Fetch lists with filtering (by status, date), sorting, and pagination.</li>
                    <li><code>GET /api/users/:id</code> &amp; <code>GET /api/listeners/:id</code>: Get details for a single user/listener, including related data.</li>
                    <li><code>PUT /api/users/:id</code>: Update a user's status.</li>
                    <li><code>PUT /api/listeners/:id/approve</code>: Update listener status to 'Active'.</li>
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

            <ApiEndpointCard title="3. Wallet & Transactions API">
                <p>Endpoints for viewing transactions and performing manual wallet adjustments. Accuracy is critical.</p>
                <h3 className="text-xl font-semibold">API Routes</h3>
                 <ul className="list-disc list-inside">
                    <li><code>GET /api/transactions</code>: Fetch transactions with filters for type, status, and date range.</li>
                    <li><code>POST /api/wallet/adjust</code>: Manually credit or debit a user's wallet. This must be a database transaction.</li>
                </ul>
                <PromptBlock>
{`Create the API for handling wallet transactions in Node.js, based on the defined schemas. All routes must be protected.

1.  **Transaction Model**: Create the model for 'Transaction' as specified (Mongoose or Sequelize).
2.  **Transaction Controller**:
    *   \`GET /api/transactions\`: Create a function to fetch all transactions. It must support filtering by \`type\`, \`status\`, and search by \`userOrListener\` or ID. Add pagination.
    *   \`POST /api/wallet/adjust\`: This is a critical transaction. Use a database transaction (\`session\` in Mongoose, \`transaction\` in Sequelize) to ensure atomicity. The function must:
        a. Start a transaction.
        b. Find the user by \`userId\` and update their \`wallet\` balance.
        c. Create a new record in the Transaction table.
        d. Commit the transaction. If any step fails, roll it back.`}
                </PromptBlock>
            </ApiEndpointCard>
            
             <ApiEndpointCard title="4. Session Management API">
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
            
            <ApiEndpointCard title="5. Real-Time Updates with WebSockets">
                <p>Use Socket.io to push real-time updates to the admin panel, primarily for the Live Sessions page.</p>
                 <PromptBlock>
{`Integrate Socket.io into the Node.js/Express application for real-time updates.

1.  **Setup**: Configure a Socket.io server to run alongside the Express app.
2.  **Integration with Session Logic**:
    *   Whenever a new session's status changes to 'Ongoing', emit a \`live_sessions_update\` event with the full, updated list of live sessions.
    *   Whenever a session ends (naturally or via the admin API), emit another \`live_sessions_update\` event.`}
                 </PromptBlock>
            </ApiEndpointCard>
            
            <ApiEndpointCard title="6. Reports & Analytics API">
                <p>These endpoints will provide aggregated data for the dashboard charts. This requires efficient database queries.</p>
                 <PromptBlock>
{`Create API endpoints for the Reports dashboard using Node.js. These endpoints will perform data aggregation.

1.  **Summary Endpoint (\`GET /api/reports/summary\`)**:
    *   Calculate total counts for users, listeners, and sessions.
    *   Calculate total revenue (sum of completed 'Credit' transactions in the last 30 days).
    *   Calculate the average rating from the Feedback/Session table.
    *   Return all five stats in a single JSON object.

2.  **Chart Endpoints**: 
    *   **For MongoDB**: Use the MongoDB Aggregation Pipeline.
    *   **For MySQL**: Use Sequelize with aggregate functions like \`COUNT\`, \`SUM\`, and the \`GROUP BY\` clause.
    *   Implement all chart endpoints: User Growth, Revenue Over Time, Top Listeners, Session Volume, and Payment Sources.`}
                </PromptBlock>
            </ApiEndpointCard>
            
            <ApiEndpointCard title="7. Settings API">
                <p>Endpoints to fetch and save all platform configurations from the Settings page.</p>
                <PromptBlock>
{`Create API endpoints to manage application settings.

1.  **Settings Model**: Create a model/table for 'Setting' to store a single document/row containing all configurations.
2.  **Settings Controller**:
    *   \`GET /api/settings\`: Fetch the current settings.
    *   \`POST /api/settings\`: Save or update the settings.`}
                </PromptBlock>
            </ApiEndpointCard>

        </div>
    );
};

export default ApiDoc;