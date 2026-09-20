const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    price: { type: Number, required: true }
  }],
  subtotal: { type: Number, default: 0 }
}, { timestamps: true });

// Pre-save hook to calculate subtotal automatically
cartSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);