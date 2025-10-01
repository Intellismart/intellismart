import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { Order } from '../../../models/Order';
import { Product } from '../../../models/Product';
import { verifyToken } from '../../../lib/auth-utils';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
//   apiVersion: '2023-10-16',
// });

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { items, paymentMethod, shippingAddress, billingAddress, notes } = await request.json();

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    // Validate items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        );
      }

      if (product.stockLevel < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        productSku: product.sku,
        quantity: item.quantity,
        price: product.price,
        tax: 0, // Calculate based on tax rules
      });

      // Reserve stock
      product.stockLevel -= item.quantity;
      await product.save();
    }

    // Calculate totals (simplified)
    const taxRate = 0.1; // 10% tax
    const tax = subtotal * taxRate;
    const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
    const total = subtotal + tax + shipping;

    // Create order
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newOrder = new Order({
      orderNumber,
      userId: decoded.userId,
      items: orderItems,
      totals: {
        subtotal,
        tax,
        shipping,
        discount: 0,
        total,
      },
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod,
      shippingAddress,
      billingAddress,
      notes,
    });

    await newOrder.save();

    // Process payment if not bank transfer
    if (paymentMethod === 'stripe') {
      // TODO: Re-enable Stripe when proper API version is configured
      // try {
      //   const paymentIntent = await stripe.paymentIntents.create({
      //     amount: Math.round(total * 100), // Stripe uses cents
      //     currency: 'usd',
      //     metadata: {
      //       orderId: newOrder._id.toString(),
      //       orderNumber: orderNumber,
      //     },
      //   });

      //   newOrder.paymentId = paymentIntent.id;
      //   await newOrder.save();

      //   return NextResponse.json({
      //     order: newOrder,
      //     clientSecret: paymentIntent.client_secret,
      //     message: 'Order created, payment required',
      //   });
      // } catch (stripeError) {
      //   console.error('Stripe payment error:', stripeError);
      //   return NextResponse.json(
      //     { error: 'Payment processing failed' },
      //     { status: 400 }
      //   );
      // }

      // For demo purposes, just mark as paid
      newOrder.paymentStatus = 'paid';
      await newOrder.save();
    }

    return NextResponse.json({
      order: newOrder,
      message: 'Order created successfully',
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = parseInt(searchParams.get('skip') || '0');

    const orders = await Order.find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('items.productId')
      .lean();

    const total = await Order.countDocuments({ userId: decoded.userId });

    return NextResponse.json({
      orders,
      total,
      hasMore: skip + limit < total,
    });

  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
