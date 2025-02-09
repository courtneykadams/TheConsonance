# TheConsonance
By Courtney Adams and Sergio Chong

TheConsonance is an innovative web application that combines the power of AI with music theory to generate custom chord progressions and discover songs with similar musical patterns.

## Features

- **AI-Powered Chord Progression Generation**: Input your mood, genre, or any descriptive text to receive custom chord progressions using Google's Gemini AI
- **Song Discovery**: Find songs that use similar chord progressions
- **Modern Tech Stack**: Built with Next.js frontend and Express.js backend, both using TypeScript
- **Responsive Design**: Clean, modern interface that works across devices

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- CSS Modules for component styling
- React Router for navigation

### Backend
- Express.js with TypeScript
- Google Generative AI (Gemini)
- Environment variable configuration for secure API key management

## Project Structure

```
TheConsonance/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js app directory
│   │   │   ├── components/ # React components
│   │   │   ├── ChordPage/  # Chord generation page
│   │   │   ├── SongPage/   # Song discovery page
│   │   │   └── api/        # API routes
│   ├── public/             # Static assets
│   └── ...
│
└── backend/                # Express.js backend server
    ├── app.ts             # Main server file
    ├── controllers/       # Request handlers
    ├── models/           # Data models
    └── routes/           # API routes
```

## Getting Started

1. Clone the repository

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

4. Run the development servers:

   ```bash
   # Terminal 1 - Start the frontend (from frontend directory)
   cd frontend
   npm run dev
   # Frontend will be available at http://localhost:3000
   ```

   ```bash
   # Terminal 2 - Start the backend (from backend directory)
   cd backend
   npm run dev
   # Backend will be available at http://localhost:3000
   ```

   For production:
   ```bash
   # Build and start frontend
   cd frontend
   npm run build
   npm start

   # Build and start backend
   cd backend
   npm run build
   npm start
   ```

## Usage

1. Visit the homepage and click "Get Started"
2. Enter your preferences (mood, genre, or any descriptive text)
3. Receive an AI-generated chord progression
4. Explore songs that use similar chord progressions

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Submit a pull request with a description of your changes

## Challenges we ran into
The learning curve was massive as we were not the most familiar with typescript and express.js for the backend. Small amounts of experience with react, node.js, html, and AI.

## License

See the [LICENSE](LICENSE) file for details.
