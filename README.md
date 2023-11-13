# Reservation System: Code Challenge Edition!

## Description
This project is a REST-ful API for a reservation system designed to manage appointments between providers and clients!

## Features

- Providers can submit their available times for appointments.
- Clients can view available appointment slots.
- Clients can reserve and confirm appointments.
- Unconfirmed appointments are expired after 30 minutes.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Jest for unit testing

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies: npm install
3. Start the server: npm start

## Usage

### API Endpoints

- POST /api/providers/schedule (Sets a provider's schedule)
- GET /api/appointments (Gets appointments)
- POST /api/reservations (Creates a reservation)
- POST /api/reservations/{id}/confirm (Confirms a reservation)
- POST http://localhost:3000/api/providers (Creates a provider)
