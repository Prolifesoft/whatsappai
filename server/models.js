
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Not: Gerçek projede hashlenmeli (bcrypt)
  initials: String,
  plan: { type: String, default: 'Başlangıç' },
  usage: {
    messages: {
      sent: { type: Number, default: 0 },
      limit: { type: Number, default: 2500 }
    }
  },
  createdAt: { type: Date, default: Date.now }
});

// Agent Schema
const agentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  status: { type: String, default: 'inactive' },
  template: { type: String, default: 'Genel' },
  phone: String,
  systemPrompt: String,
  knowledgeBase: [{
    id: String,
    type: { type: String }, // text, pdf, sitemap
    title: String,
    content: String
  }],
  createdAt: { type: Date, default: Date.now }
});

// Template Schema
const templateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  isCustom: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Agent: mongoose.model('Agent', agentSchema),
  Template: mongoose.model('Template', templateSchema)
};
