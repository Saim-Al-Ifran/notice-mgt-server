# 📢 Notice Management Server

A backend REST API for managing notices, built with **Express.js**, **TypeScript**, and **MongoDB**.  
This service allows creating, publishing, unpublishing, and viewing notices with proper status handling and pagination.


🔗 **API Documentation (Swagger):**  
https://notice-mgt-server.onrender.com/api-docs/

---

## 🚀 Features

- Create a notice
- Get all notices
  - Filter by status (`published` / `draft`)
  - Pagination support
- Update notice status (publish / unpublish)
- View a single notice (optional)
- MongoDB with Mongoose
- Swagger API documentation
- TypeScript support
- Production-ready folder structure

---
## Getting Started

### Prerequisites

- **Node.js**: Install the latest version of Node.js from [here](https://nodejs.org/).
- **npm**: Node.js package manager, comes with Node.js installation.

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Saim-Al-Ifran/notice-mgt-server.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd express-typescript-starter-kit
    ```

3. **Install the dependencies:**
    ```bash
    cd notice-mgt-server
    ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Server
PORT=3000

# MongoDB
MONGO_URI=mongodb://localhost:27017/mydatabase

 

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
