const mongoose = require('mongoose')
const Plan = require('./plans.model')

const plan = {}
Plan.findOne({ isDefault: true }).then(data => plan.defaultPlan = data._doc)
.catch(err => console.log(err))

const getDefaultPlan = (plan) => {
    return plan.defaultPlan
}
const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        default: () => getDefaultPlan(plan)
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: null
    },
    history: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: 'Subscriptions'
})

module.exports = mongoose.model('Subscription', subscriptionSchema)
// module.exports.SubscriptionHistorySchema = SubscriptionHistorySchema