# Crypto Price Dashboard

This project is a full-stack application that collects and displays real-time price data for cryptocurrencies. It uses Next.js for the frontend, API routes for the backend, and MongoDB for data storage. The project also incorporates Redux for state management and Tailwind CSS for styling.

## Features

- Polls real-time data for 5 cryptocurrencies every few seconds from the CoinGecko API
- Stores the data in a MongoDB database
- Fetches and displays the most recent 20 data entries for a selected cryptocurrency in a dynamic table
- Allows users to change the cryptocurrency being displayed via a modal

## Tech Stack

- Next.js
- TypeScript
- Redux
- Tailwind CSS
- MongoDB
- Axios



## Getting Started

### Prerequisites

- Node.js ver 14+
- MongoDB

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/crypto-price-dashboard.git
cd crypto-price-dashboard
npm install
npm run dev
