import mongoose, { Document, Schema } from 'mongoose';

/**
 * Booking Document Interface
 * Defines the structure of a Booking in MongoDB
 * One Event can have many Bookings (1-M relationship)
 */
export interface IBooking extends Document {
  event: mongoose.Types.ObjectId;
  email: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

/**
 * Booking Schema
 * Stores user bookings for events
 */
const BookingSchema = new Schema<IBooking>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event reference is required'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
      maxlength: [255, 'Email cannot exceed 255 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['confirmed', 'pending', 'cancelled'],
        message: 'Booking status must be confirmed, pending, or cancelled',
      },
      default: 'pending',
    },
    created_at: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Compound index to prevent duplicate bookings for the same event and email
BookingSchema.index({ event: 1, email: 1 }, { unique: true });

// Index for querying bookings by email
BookingSchema.index({ email: 1 });

// Index for sorting bookings by creation date
BookingSchema.index({ created_at: -1 });

// Middleware to update the updated_at timestamp on save
BookingSchema.pre('save', function (this: IBooking) {
  if (!this.isNew) {
    this.updated_at = new Date();
  }
});

/**
 * Booking Model
 * Use this model to manage event bookings
 */
const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
