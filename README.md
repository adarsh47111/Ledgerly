# **Ledgerly - Invoice Management System**

**Ledgerly** is an intuitive and automated invoice management system designed to streamline billing, improve accuracy, and optimize financial record-keeping. Whether you're a small business or a large enterprise, **Ledgerly** makes managing your invoices simpler and more efficient.

## Features

- 📜 **Automated Invoicing**: Generate invoices seamlessly with ease.
- ✅ **Data Validation**: Reduce manual errors with built-in validation checks.
- 📊 **Real-time Reporting**: Instant tracking and generation of financial reports.
- 🔄 **Smart Reconciliation**: Automate invoice and payment matching for faster processing.
- 💻 **User-friendly Interface**: A clean, intuitive interface for a smooth user experience.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/Ledgerly.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Ledgerly
   ```

3. **Install backend dependencies**:

   ```bash
   cd .\Server\
   npm install
   ```

4. **Install frontend dependencies**:

   ```bash
   cd .\Client\
   npm install
   ```

5. **Set up environment variables**:

   Create a `.env` file in both the **frontend** and **backend** directories.

   **Backend `.env` Example**:

   ```env
   # Database Configuration
   MONGO_URI=mongodb://your_mongo_uri_here

   # Authentication Configuration
   ACCESS_TOKEN_SECRET=your_access_token_secret_here
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

   # Server Configuration
   PORT=5000

   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   ```

6. **Run the application**:

   - Start the backend server:

     ```bash
     cd .\Server\
     npm start
     ```

   - Start the frontend development server:

     ```bash
     cd .\Client\
     npm start
     ```

## Technologies Used

- 🖥️ **Node.js**: Backend server and API management.
- 💾 **MongoDB**: Database for storing invoice data.
- ⚛️ **React**: Frontend framework for building a responsive UI.
- 🌐 **Express**: Web framework to handle requests and routing.
- 🔑 **JWT Authentication**: Secure authentication for user access.
- 🗣️ **Google OAuth**: Google login integration.

## Usage

- ✍️ **Create Invoices**: Input customer details, items, and prices to generate invoices.
- 💳 **Track Payments**: Update invoice statuses to reflect payments received.
- 📈 **Generate Reports**: View and download detailed financial reports.

## Contributing

We welcome contributions! If you'd like to help improve **Ledgerly**, feel free to fork the repository and submit a pull request with your proposed changes. We appreciate any enhancements, bug fixes, or feedback.
