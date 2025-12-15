import mongoose, { Document, Schema } from 'mongoose';

/**
 * Audience Document Interface
 * Defines the structure of an Audience in MongoDB
 * One Event can have many Audience entries (1-M relationship)
 */
export interface IAudience extends Document {
  category: string;
  description: string;
}

/**
 * Audience Schema
 * Stores audience categories/segments for events
 */
const AudienceSchema = new Schema<IAudience>(
  {
    category: {
      type: String,
      required: [true, 'Audience category is required'],
      trim: true,
      maxlength: [100, 'Category cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Audience description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
  },
);


/**
 * Audience Model
 * Use this model to manage audience categories for events
 */
const Audience = mongoose.models.Audience || mongoose.model<IAudience>('Audience', AudienceSchema);

export default Audience;
