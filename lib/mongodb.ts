import mongoose, { Mongoose } from 'mongoose';

/**
 * MongoDB Connection Cache
 * Stores the mongoose instance to prevent multiple connections during development
 */
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const cached: MongooseConnection = {
  conn: null,
  promise: null,
};

/**
 * Connects to MongoDB using Mongoose
 * Implements connection caching to prevent multiple connections in development
 *
 * @returns Promise<Mongoose> - The mongoose instance
 * @throws Error if MONGODB_URI is not defined in environment variables
 */
async function connectDB(): Promise<Mongoose> {
  // If connection already exists, return it
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  // If connection promise is already in progress, wait for it
  if (cached.promise) {
    console.log('Waiting for MongoDB connection promise');
    return cached.promise;
  }

  // Validate environment variable
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error(
      'MONGODB_URI environment variable is not defined. Please add it to your .env file.'
    );
  }

  // Create new connection promise
  cached.promise = mongoose
    .connect(mongodbUri, {
      // Connection options for optimal performance and reliability
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      minPoolSize: 5,
    })
    .then((mongooseInstance) => {
      console.log('✓ MongoDB connected successfully');
      cached.conn = mongooseInstance;
      return mongooseInstance;
    })
    .catch((error) => {
      console.error('✗ MongoDB connection failed:', error.message);
      cached.promise = null; // Reset promise on error to allow retry
      throw error;
    });

  return cached.promise;
}

/**
 * Disconnects from MongoDB
 * Useful for cleanup in testing or graceful shutdowns
 *
 * @returns Promise<void>
 */
async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('MongoDB disconnected');
  }
}

export { connectDB, disconnectDB };
export default connectDB;
