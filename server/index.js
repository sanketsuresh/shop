const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow all for ease of direct-upload deployments
app.use(express.json());

// Basic health check for deployment
app.get('/', (req, res) => {
    res.send('SP Kirani Store Server is Running');
});

// --- AUTH API ---

app.post('/api/auth/register', (req, res) => {
    const { name, mobile, password, address } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO users (name, mobile, password_hash, address) VALUES (?, ?, ?, ?)');
        const info = stmt.run(name, mobile, password, address);
        res.json({ id: info.lastInsertRowid, name, mobile, role: 'user' });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            res.status(400).json({ error: 'Mobile number already registered' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

app.post('/api/auth/login', (req, res) => {
    const { mobile, password } = req.body;
    try {
        const stmt = db.prepare('SELECT * FROM users WHERE mobile = ?');
        const user = stmt.get(mobile);

        // Simple admin check (hardcoded for demo security)
        if (mobile === '9972639290' && password === 'suresh') {
            return res.json({
                user: { id: 999, name: 'Samesh Basaragaon', mobile: '9972639290', role: 'admin' },
                token: 'admin-token'
            });
        }

        if (!user || user.password_hash !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({
            user: { id: user.id, name: user.name, mobile: user.mobile, role: user.role },
            token: 'mock-jwt-token-' + user.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- PRODUCT API ---

app.get('/api/products', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM products');
        const products = stmt.all();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/products/seed', (req, res) => {
    const products = req.body;
    const insert = db.prepare('INSERT INTO products (name, category, price, image_url) VALUES (?, ?, ?, ?)');
    const transaction = db.transaction((items) => {
        // Clear existing?
        db.prepare('DELETE FROM products').run();
        // Reset sequence (optional)
        db.prepare('DELETE FROM sqlite_sequence WHERE name="products"').run();

        for (const item of items) insert.run(item.name, item.category, item.price, item.image);
    });
    try {
        transaction(products);
        res.json({ success: true, count: products.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/admin/products/:id/stock', (req, res) => {
    const { is_available } = req.body;
    try {
        const stmt = db.prepare('UPDATE products SET is_available = ? WHERE id = ?');
        stmt.run(is_available ? 1 : 0, req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ORDER API ---

app.post('/api/orders', (req, res) => {
    const { user_id, items, total_amount } = req.body;

    try {
        const insertOrder = db.prepare('INSERT INTO orders (user_id, total_amount) VALUES (?, ?)');
        const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES (?, ?, ?, ?)');

        const transaction = db.transaction((orderItems) => {
            const info = insertOrder.run(user_id, total_amount);
            const orderId = info.lastInsertRowid;

            for (const item of orderItems) {
                insertItem.run(orderId, item.product_id, item.quantity, item.price);
            }
            return orderId;
        });

        const newOrderId = transaction(items);
        res.json({ success: true, orderId: newOrderId });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/orders/user/:userId', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC');
        const orders = stmt.all(req.params.userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/orders/:id', (req, res) => {
    try {
        const stmt = db.prepare('SELECT id, status, total_amount, created_at FROM orders WHERE id = ?');
        const order = stmt.get(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- ADMIN API ---

app.get('/api/admin/orders', (req, res) => {
    try {
        const stmt = db.prepare(`
            SELECT orders.*, users.name as user_name, users.mobile as user_mobile, users.address as user_address
            FROM orders 
            LEFT JOIN users ON orders.user_id = users.id 
            ORDER BY created_at DESC
        `);
        const orders = stmt.all();

        const ordersWithItems = orders.map(order => {
            const itemsStmt = db.prepare('SELECT order_items.*, products.name as product_name FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_id = ?');
            const items = itemsStmt.all(order.id);
            return { ...order, items };
        });

        res.json(ordersWithItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/api/admin/orders/:id/status', (req, res) => {
    const { status } = req.body;
    try {
        const stmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
        stmt.run(status, req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export the Express app for Vercel's serverless functions
module.exports = app;
