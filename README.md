# 🛡️ She-Shield - Women Safety Platform

A comprehensive safety and healthcare platform designed for  women, providing emergency assistance, medical resources, and safety features.

## ✨ Features

- **🚨 SOS Emergency Button** - Quick access to emergency services
- **📞 Emergency Contacts** - Store and access important contacts
- **🚑 Ambulance Finder** - Locate nearby ambulances using Google Maps
- **📍 Safety Locations** - Find nearby hospitals, clinics, and safe spaces
- **📱 Location Sharing** - Share real-time location with trusted contacts
- **⏰ Safety Timer** - Check-in feature for added security
- **☎️ Fake Call Feature** - Emergency escape tool
- **🩺 Medical Profile** - Store medical history and emergency information
- **💡 Safety Tips** - Expert advice for pregnant women
- **🔍 Threat Recognition** - Safety awareness features
- **🌐 Multi-language Support** - Available in multiple languages

## 🚀 Tech Stack

### Frontend
- React 19.2
- Vite 7.2
- Tailwind CSS 4.1
- Lucide React Icons

### Backend
- Node.js
- Express.js
- CORS enabled
- Express Validator

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/pramendrascriet-sudo/she-shield.git
cd she-shield
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Setup environment variables**

Copy `.env.example` to `.env` and add your API keys:
```bash
cp .env.example .env
```

Edit `.env` and add:
```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

See [GOOGLE_API_SETUP.md](GOOGLE_API_SETUP.md) for detailed Google Maps API setup instructions.

## 🏃 Running Locally

### Development Mode

**Option 1: Run both services together (Windows)**
```bash
start-dev.bat
```

**Option 2: Run separately (Mac/Linux)**

In terminal 1 (Frontend):
```bash
npm run dev
```

In terminal 2 (Backend):
```bash
cd server
npm run dev
```

The frontend will run on `http://localhost:5173`  
The backend will run on `http://localhost:3000`

## 📁 Project Structure

```
she-shield/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── context/           # React context providers
│   ├── data/              # Mock data and translations
│   ├── services/          # API services
│   └── assets/            # Images and static files
├── server/                # Backend Node.js/Express API
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── data/              # Mock database
│   └── utils/             # Helper functions
├── public/                # Static assets
└── index.html             # Entry HTML file
```

## 🌐 Deployment

### Deploy on Render

**Backend Service:**
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

**Frontend Static Site:**
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

See deployment instructions for detailed steps.

## 📝 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
cd server
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- [@pramendrascriet-sudo](https://github.com/pramendrascriet-sudo)

## 🙏 Acknowledgments

- Built with React and Vite
- Icons by Lucide React
- Styling with Tailwind CSS
- Google Maps API for location services

---

Made with ❤️ for the safety and wellbeing of pregnant women
