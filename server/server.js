
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { User, Agent, Template } = require('./models');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Bağlantısı
// Lütfen kendi MongoDB Connection String'inizi buraya girin. 
// Örn: 'mongodb+srv://user:pass@cluster0.mongodb.net/agentai?retryWrites=true&w=majority'
// Lokal çalışma için: 'mongodb://localhost:27017/agentai'
const MONGO_URI = 'mongodb://localhost:27017/agentai'; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB veritabanına bağlanıldı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// --- ROUTES ---

// 1. Auth: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, initials } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kayıtlı.' });
    }

    const newUser = new User({ name, email, password, initials });
    await newUser.save();
    
    // Frontend'in beklediği formatta ID dönüşümü (_id -> id)
    const userObj = newUser.toObject();
    userObj.id = userObj._id.toString();
    delete userObj._id;
    delete userObj.password;

    res.status(201).json(userObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Auth: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password }); // Basit kontrol, prod'da bcrypt kullanın
    
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const userObj = user.toObject();
    userObj.id = userObj._id.toString();
    delete userObj._id;
    delete userObj.password;

    res.json(userObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. User: Update
app.patch('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        
        // Plan güncelleniyorsa limitleri de güncelle
        if (updates.plan) {
             const newLimit = updates.plan === 'Profesyonel' ? 10000 : updates.plan === 'Kurumsal' ? Infinity : 2500;
             updates['usage.messages.limit'] = newLimit;
        }

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        
        const userObj = user.toObject();
        userObj.id = userObj._id.toString();
        delete userObj._id;
        delete userObj.password;
        
        res.json(userObj);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Agents: Get All (User'a göre)
app.get('/api/agents', async (req, res) => {
  try {
    const { userId } = req.query;
    const agents = await Agent.find({ userId });
    
    const formattedAgents = agents.map(a => {
        const obj = a.toObject();
        obj.id = obj._id.toString();
        delete obj._id;
        return obj;
    });
    
    res.json(formattedAgents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. Agents: Create
app.post('/api/agents', async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    await newAgent.save();
    
    const obj = newAgent.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    
    res.status(201).json(obj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 6. Agents: Update
app.put('/api/agents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAgent = await Agent.findByIdAndUpdate(id, req.body, { new: true });
    
    const obj = updatedAgent.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    
    res.json(obj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 7. Agents: Delete
app.delete('/api/agents/:id', async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Agent deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 8. Templates: Get All
app.get('/api/templates', async (req, res) => {
  try {
    const { userId } = req.query;
    const templates = await Template.find({ userId });
    res.json(templates); // Template yapısı basit olduğu için id dönüşümü opsiyonel
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 9. Templates: Create
app.post('/api/templates', async (req, res) => {
  try {
    const newTemplate = new Template(req.body);
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 10. Templates: Update
app.put('/api/templates/:originalName', async (req, res) => {
    try {
        const { originalName } = req.params;
        const { userId, ...updates } = req.body;
        
        // Find by name and userId
        const updated = await Template.findOneAndUpdate(
            { name: originalName, userId }, 
            updates, 
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 11. Templates: Delete
app.delete('/api/templates/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const { userId } = req.query;
        await Template.findOneAndDelete({ name, userId });
        res.json({ message: 'Template deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
