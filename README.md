# Rental Ease

Rental Ease is a property rental platform that allows users to book properties if they are renters and create new property listings if they are hosts. The application provides a seamless experience for both renters and property owners, ensuring a smooth booking and listing process.

## Features

### For Renters:
- Browse available properties.
- View detailed property descriptions, locations, and pricing.
- Book properties for a specified duration.
- Secure payment integration (if applicable).

### For Hosts:
- Create new property listings with details such as title, location, description, and price per night.
- Manage property listings (edit or remove properties).
- View booking requests from renters.

### General:
- User authentication and authorization.
- Google Authentication for seamless sign-in.
- Responsive and user-friendly interface.
- Secure API communication.

## Tech Stack

### Frontend:
- React 19 (Vite.js)
- TypeScript
- Tailwind CSS
- Radix UI

### Backend:
- NestJS (API-based backend)
- SQL (Database)
- JWT Authentication
- Google OAuth for authentication
- Cloud Storage for image uploads

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (Latest LTS version)
- npm or yarn
- Git

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/YannickZahinda/rental-ease.git
   cd rental-ease
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and add necessary API keys, backend URLs, and Google OAuth credentials.

4. Start the development server:
   ```sh
   npm run dev
   ```

### Backend Setup
The backend repository is available here: [Rental Ease Backend](https://github.com/YannickZahinda/rental-book)
Follow the instructions in the backend repo's README to set up the API.

## Usage
- Sign up or log in using Google Authentication.
- If you are a **renter**, browse properties and make bookings.
- If you are a **host**, create and manage property listings.
- Enjoy a seamless rental experience!

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```sh
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Contact
For inquiries or collaboration, reach out to [Yannick Zahinda](https://github.com/YannickZahinda).

