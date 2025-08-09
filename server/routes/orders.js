const express = require('express');
const Joi = require('joi');
const Order = require('../models/Order');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation schemas
const orderItemSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  qty: Joi.number().min(1).required(),
  image: Joi.string().optional()
});

const shippingAddressSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]{10,15}$/).required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.string().pattern(/^\d{6}$/).required()
});

const createOrderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1).required(),
  shippingAddress: shippingAddressSchema.required(),
  paymentMethod: Joi.string().valid('razorpay', 'cod', 'upi', 'card').required(),
  subtotal: Joi.number().min(0).required(),
  shippingCost: Joi.number().min(0).required(),
  total: Joi.number().min(0).required(),
  notes: Joi.string().optional()
});

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public (allows guest checkout)
router.post('/', async (req, res) => {
  try {
    // Validate input
    const { error } = createOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details[0].message
      });
    }

    const { items, shippingAddress, paymentMethod, subtotal, shippingCost, total, notes } = req.body;

    // Generate unique order ID
    const orderId = Order.generateOrderId();

    // Transform items to match order schema
    const orderItems = items.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
      image: item.image
    }));

    // Transform shipping address
    const orderShippingAddress = {
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
      email: shippingAddress.email,
      phoneNumber: shippingAddress.phone,
      street: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      pincode: shippingAddress.pincode,
      country: 'India'
    };

    // Create order
    const order = new Order({
      orderId,
      items: orderItems,
      shippingAddress: orderShippingAddress,
      subtotal,
      shippingCost,
      total: paymentMethod === 'cod' ? total + 25 : total, // Add COD charges
      paymentMethod,
      notes,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      orderStatus: 'pending'
    });

    // If user is authenticated, link the order
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId);
        if (user) {
          order.user = user._id;
          // Add order to user's order history
          user.orderHistory.push(order._id);
          await user.save();
        }
      } catch (tokenError) {
        // Continue as guest order if token is invalid
        console.log('Invalid token for order, proceeding as guest order');
      }
    }

    // Calculate estimated delivery
    order.estimatedDelivery = order.calculateEstimatedDelivery();

    // Set order status based on payment method
    if (paymentMethod === 'cod') {
      order.orderStatus = 'confirmed';
    }

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: order.orderId,
      estimatedDelivery: order.estimatedDelivery,
      total: order.total,
      order: {
        id: order._id,
        orderId: order.orderId,
        items: order.items,
        total: order.total,
        status: order.orderStatus,
        estimatedDelivery: order.estimatedDelivery,
        createdAt: order.createdAt
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      error: 'Order creation failed',
      message: 'Unable to place order. Please try again.'
    });
  }
});

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments({ user: req.userId });

    res.json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        hasNextPage: page < Math.ceil(totalOrders / limit),
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({
      error: 'Unable to fetch orders'
    });
  }
});

// @route   GET /api/orders/:orderId
// @desc    Get single order by order ID
// @access  Public (with order ID validation)
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId }).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        error: 'Order not found',
        message: 'No order found with this order ID'
      });
    }

    // If user is authenticated, verify they own this order
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ') && order.user) {
      try {
        const token = authHeader.substring(7);
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (order.user._id.toString() !== decoded.userId) {
          return res.status(403).json({
            error: 'Access denied',
            message: 'You are not authorized to view this order'
          });
        }
      } catch (tokenError) {
        return res.status(401).json({
          error: 'Invalid token'
        });
      }
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({
      error: 'Unable to fetch order'
    });
  }
});

// @route   PUT /api/orders/:orderId/status
// @desc    Update order status (admin only - simplified for demo)
// @access  Private
router.put('/:orderId/status', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, trackingNumber } = req.body;

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
        message: 'Please provide a valid order status'
      });
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    order.orderStatus = status;
    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: {
        orderId: order.orderId,
        status: order.orderStatus,
        trackingNumber: order.trackingNumber,
        updatedAt: order.updatedAt
      }
    });

  } catch (error) {
    console.error('Order status update error:', error);
    res.status(500).json({
      error: 'Unable to update order status'
    });
  }
});

module.exports = router;
