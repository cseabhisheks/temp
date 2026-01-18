const createModel = require('../mvc/model')

// Property model
const Property = createModel('property', {
    HName: String,
    HAddress: String,
    HPrice: Number,
    EBRate:Number,
})

// Room model
const room = createModel('room', {
    Property: { type: 'ObjectId', ref: 'property', required: true }, // Which property this room belongs to
    Status: { type: String, enum: ['vacant', 'occupied'], default: 'vacant' },
    RentAmount: Number,
    effectiveFrom: Date,
    Tenant: { type: 'ObjectId', ref: 'tenant', default: null } // Who is currently renting
})

// Tenant model
const tenant = createModel('tenant', {
    TName: String,
    TPhone: { type: Number, maxLength: 12 },
    Room: { type: 'ObjectId', ref: 'room' } 
})

// Rent bill model
const rentBill = createModel('rentBill', {
    Tenant: { type: 'ObjectId', ref: 'tenant', required: true },
    Month: { type: String, enum: ['january','february','march','april','may','june','july','august','september','october','november','december'], required: true },
    RentAmount: Number,
    Paid: { type: Boolean, default: false }
})

// Electricity bill model
const electricityBill = createModel('electricityBill', {
    Tenant: { type: 'ObjectId', ref: 'tenant', required: true },
    Month: { type: String, enum: ['january','february','march','april','may','june','july','august','september','october','november','december'], required: true },
    previousReading:Number,
    currentReading: Number,
    EBAmount:Number,
    Paid: { type: Boolean, default: false }
})

// Payment model
const payment = createModel('payment', {
    Tenant: { type: 'ObjectId', ref: 'tenant', required: true },
    amount: Number,
    paymentMethod: { type: String, enum: ['cash', 'upi', 'banktransfer', 'cheque'] },
    type: { type: String, enum: ['rentBill', 'electricityBill'] },
    Bill: { type: 'ObjectId', refPath: 'type' } // Dynamic ref to either rentBill or electricityBill
})

module.exports = { Property, room, tenant, rentBill, electricityBill, payment }
