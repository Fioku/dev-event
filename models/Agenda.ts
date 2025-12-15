import mongoose, { Document, Schema } from 'mongoose';

/**
 * Agenda Document Interface
 * Defines the structure of an Agenda item in MongoDB
 * One Event can have many Agenda entries (1-M relationship)
 */
export interface IAgenda extends Document {
  event: mongoose.Types.ObjectId;
  title: string;
  description: string;
  time: {
    from: string; // HH:MM format
    to: string;   // HH:MM format
  };
  speaker?: string;
  location?: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * Agenda Schema
 * Stores agenda items/schedule for events
 */
const AgendaSchema = new Schema<IAgenda>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event reference is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Agenda item title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Agenda item description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    time: {
      from: {
        type: String,
        required: [true, 'Start time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM'],
      },
      to: {
        type: String,
        required: [true, 'End time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM'],
      },
    },
    speaker: {
      type: String,
      trim: true,
      maxlength: [100, 'Speaker name cannot exceed 100 characters'],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
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

// Middleware to update the updated_at timestamp on save
AgendaSchema.pre('save', function (this: IAgenda) {
  if (!this.isNew) {
    this.updated_at = new Date();
  }
});

/**
 * Agenda Model
 * Use this model to manage event agenda items
 */
const Agenda = mongoose.models.Agenda || mongoose.model<IAgenda>('Agenda', AgendaSchema);

export default Agenda;
