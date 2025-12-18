import mongoose, { Document, Schema } from 'mongoose';
import next from 'next';

/**
 * Event Document Interface
 * Defines the structure of an Event in MongoDB
 */
export interface IEvent extends Document {
  slug: string;
  title: string;
  hook: string;
  image: string;
  overview: string;
  date: Date;
  startingTime: string; // HH:MM format
  endingTime: string;   // HH:MM format
  venue: string;
  mode: 'online' | 'in-person' | 'hybrid';
  about: string;
  audience?: mongoose.Types.ObjectId[]; // 1-M relationship with Audience
  agenda?: mongoose.Types.ObjectId[];   // 1-M relationship with Agenda
  status: 'draft' | 'published' | 'archived' | 'cancelled';
}

/**
 * Event Schema
 * Defines the structure and validation rules for Event documents
 */
const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    hook: {
      type: String,
      required: [true, 'Event hook is required'],
      trim: true,
      minlength: [5, 'Hook must be at least 5 characters long'],
      maxlength: [300, 'Hook cannot exceed 300 characters'],
    },
    image: {
      type: String,
      required: [true, 'Event image is required'],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Event overview is required'],
      trim: true,
      maxlength: [500, 'Overview cannot exceed 500 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
      validate: {
        validator: (value: Date) => value > new Date(),
        message: 'Event date must be in the future',
      },
    },
    startingTime: {
      type: String,
      required: [true, 'Event start time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM'],
    },
    endingTime: {
      type: String,
      required: [true, 'Event end time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM'],
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
      trim: true,
      maxlength: [300, 'Venue cannot exceed 300 characters'],
    },
    mode: {
      type: String,
      enum: {
        values: ['online', 'in-person', 'hybrid'],
        message: 'Event mode must be online, in-person, or hybrid',
      },
      required: [true, 'Event mode is required'],
    },
    about: {
      type: String,
      required: [true, 'Event description is required'],
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    audience: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Audience',
      },
    ],
    agenda: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Agenda',
      },
    ],
    status: {
      type: String,
      enum: {
        values: ['draft', 'published', 'archived', 'cancelled'],
        message: 'Event status must be draft, published, archived, or cancelled',
      },
      default: 'draft',
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

// Indexes for optimized queries
EventSchema.index({ slug: 1 });
EventSchema.index({ date: 1 });
EventSchema.index({ status: 1 });
EventSchema.index({ created_at: -1 });

EventSchema.pre('validate', function (this: IEvent) {
  if (!this.slug && this.title) {
    this.slug = generateSlug(this.title);
  }
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Event Model
 * Use this model to interact with Event documents in MongoDB
 */
const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
