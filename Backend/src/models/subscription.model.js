const mongoose = require('mongoose')

const SubscriptionHistorySchema = new mongoose.Schema({
    plan: {
        type: String,
        enum: ['student', 'pro', 'standard'],
        default: 'standard'
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
})

const subscriptionSchema = new mongoose.Schema({
    plan: {
        type: SubscriptionHistorySchema,
        default: () => new SubscriptionHistorySchema()
    },
    history: {
        type: [SubscriptionHistorySchema],
        default: []
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: 'Subscriptions'
})

module.exports = mongoose.model('Subscription', subscriptionSchema)