import mongoose from 'mongoose';

export interface ISubscription extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  planId: mongoose.Types.ObjectId;
  planName: string;
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  nextBillingDate: Date;
  cancelAt?: Date;
  cancelledAt?: Date;
  trialEnd?: Date;
  stripeSubscriptionId?: string;
  paypalSubscriptionId?: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new mongoose.Schema<ISubscription>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'past_due', 'unpaid', 'trialing'],
    default: 'active',
  },
  currentPeriodStart: {
    type: Date,
    required: true,
  },
  currentPeriodEnd: {
    type: Date,
    required: true,
  },
  nextBillingDate: {
    type: Date,
    required: true,
  },
  cancelAt: Date,
  cancelledAt: Date,
  trialEnd: Date,
  stripeSubscriptionId: String,
  paypalSubscriptionId: String,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  interval: {
    type: String,
    enum: ['month', 'year'],
    required: true,
  },
}, {
  timestamps: true,
});

export const Subscription = mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
