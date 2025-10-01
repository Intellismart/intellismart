import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  images: string[];
  attributes: Record<string, any>;
  subscriptionEligible: boolean;
  stockTracking: boolean;
  stockLevel: number;
  reservedStock: number;
  reorderPoint: number;
  taxClass: string;
  promo?: {
    type: 'percentage' | 'fixed';
    value: number;
    startDate?: Date;
    endDate?: Date;
  };
  status: 'active' | 'inactive' | 'draft';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  images: [String],
  attributes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  subscriptionEligible: {
    type: Boolean,
    default: false,
  },
  stockTracking: {
    type: Boolean,
    default: true,
  },
  stockLevel: {
    type: Number,
    default: 0,
    min: 0,
  },
  reservedStock: {
    type: Number,
    default: 0,
    min: 0,
  },
  reorderPoint: {
    type: Number,
    default: 10,
    min: 0,
  },
  taxClass: {
    type: String,
    default: 'standard',
  },
  promo: {
    type: {
      type: String,
      enum: ['percentage', 'fixed'],
    },
    value: Number,
    startDate: Date,
    endDate: Date,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
