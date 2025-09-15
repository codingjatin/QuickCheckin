// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
require('dotenv').config();

const superAdminRoutes = require('./routes/superAdmin');
const restaurantRoutes = require('./routes/restaurant');
const bookingRoutes = require('./routes/booking');
const sseRoutes = require('./routes/sse');

const app = express();

// --- DB ---
connectDB();

// --- Proxy awareness (needed behind App Runner/ELB for rate limits & IPs) ---
app.set('trust proxy', 1);

// --- Security ---
app.use(
  helmet({
    // Typical API defaults; loosen CSP only if you add HTML pages later
    contentSecurityPolicy: false, // APIs/SSE don’t need CSP; turn on if serving HTML
    crossOriginEmbedderPolicy: false,
  })
);

// --- CORS ---
const allowedOrigins = [
  'https://quickcheckin.vercel.app',
  'http://localhost:3000', // for local development
  // Add other origins as needed
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / curl
    const allowed = allowedOrigins.includes(origin);
    return allowed ? callback(null, true) : callback(new Error('CORS: Origin not allowed'));
  },
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 600,
};
app.use(cors(corsOptions));

// --- Rate limiting (env-driven) ---
const WINDOW_MS = Number(process.env.RATE_WINDOW_MS || 15 * 60 * 1000);
const MAX_REQ = Number(process.env.RATE_MAX || 100);
app.use(
  rateLimit({
    windowMs: WINDOW_MS,
    max: MAX_REQ,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// --- Parsers ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- Routes ---
app.use('/api/super-admin', superAdminRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api', bookingRoutes);
app.use('/api/sse', sseRoutes);

// --- Health checks ---
app.get('/health', (_req, res) => res.status(200).json({ message: 'OK' }));

// --- 404 ---
app.use('*', (_req, res) => res.status(404).json({ message: 'Route not found' }));

// --- Error handler ---
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Something went wrong!' });
});

module.exports = app;
