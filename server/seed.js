const db = require('./db');

const PRODUCTS = [
    // Grains
    { name: "Sona Masoori Rice", category: "Grains", price: 55, image: "https://www.srisritattva.com/cdn/shop/articles/top-view-raw-rice-inside-plate-dark-desk.jpg?v=1707287123" },
    { name: "Basmati Rice (Premium)", category: "Grains", price: 120, image: "https://flourworks.in/wp-content/uploads/2023/06/1-12.jpeg" },
    { name: "Wheat (Lokwan)", category: "Grains", price: 40, image: "https://m.media-amazon.com/images/I/51RuxaU3jrL._SX300_SY300_QL70_FMwebp_.jpg" },
    { name: "Ashirvaad Atta", category: "Grains", price: 55, image: "https://www.quickpantry.in/cdn/shop/products/aashirvaad-whole-wheat-atta-5-kg-quick-pantry.jpg?v=1710537925&width=455" },
    { name: "Rava (Sooji)", category: "Grains", price: 45, image: "https://i0.wp.com/s3.ap-south-1.amazonaws.com/media.florafoods.in/wp-content/uploads/2021/09/24015438/Kesari-Rava-2-.jpg?fit=800%2C800&ssl=1" },
    { name: "Poha (Thick)", category: "Grains", price: 50, image: "https://5.imimg.com/data5/SELLER/Default/2024/5/416778581/JR/ZK/ZP/212628420/thick-poha-500x500.jpg" },

    // Pulses
    { name: "Tur Dal (Premium)", category: "Pulses", price: 160, image: "https://i0.wp.com/livelifewell.in/wp-content/uploads/2021/03/toordal-wellnest-livelifewell.jpg?fit=1000%2C1000&ssl=1" },
    { name: "Moong Dal", category: "Pulses", price: 110, image: "https://vibrantliving.in/cdn/shop/files/MoongDalSplitSkinless.jpg?v=1731059585&width=800" },
    { name: "Chana Dal", category: "Pulses", price: 90, image: "https://vibrantliving.in/cdn/shop/files/ChanaDalSplit.jpg?v=1731059251&width=800" },

    // Daily Needs & Oil
    { name: "Sugar", category: "Daily Needs", price: 42, image: "https://www.chinimandi.com/wp-content/uploads/2018/07/added-sugar-3.jpg" },
    { name: "Jaggery", category: "Daily Needs", price: 60, image: "https://s3.ap-south-1.amazonaws.com/media.florafoods.in/wp-content/uploads/2019/07/24015405/Kolhapur-bella-01-.png" },
    { name: "Tata Salt", category: "Daily Needs", price: 28, image: "https://m.media-amazon.com/images/I/614mm2hYHyL._SX679_.jpg" },
    { name: "Sunflower Oil", category: "Oil", price: 135, image: "https://5.imimg.com/data5/SELLER/Default/2024/3/403250734/KH/MF/LA/19877993/sunpure-sunflower-oil-1ltr-1000x1000.png" },
    { name: "Ghee", category: "Daily Needs", price: 600, image: "https://cdn.shopify.com/s/files/1/0586/8234/3501/files/cow_desi_ghee_image.webp?v=1742634983" },

    // Spices & Beverages
    { name: "Red Chilli Powder", category: "Spices", price: 350, image: "https://martmines.com/wp-content/uploads/2021/06/plain-chilli-powder-1.jpg" },
    { name: "Turmeric Powder", category: "Spices", price: 200, image: "https://dhanipurespices.com/wp-content/uploads/2022/10/Turmeric-Powder-and-Whole.jpeg" },
    { name: "Coriander Powder", category: "Spices", price: 200, image: "https://sryshayagroup.com/product-images/Dry%20Coriander%20Powder%20PRIME.png" },
    { name: "Jeera (Cumin)", category: "Spices", price: 600, image: "https://redrosemart.com/cdn/shop/files/cumin-jeera-seed-removebg-preview.png?v=1716042908&width=823" },
    { name: "Red Label Tea", category: "Beverages", price: 140, image: "https://cdn.shopaccino.com/edible-smart/products/brooke-bond---red-label-178585_l.jpg?v=651?param=1" },
    { name: "Bru Coffee", category: "Beverages", price: 90, image: "https://m.media-amazon.com/images/I/61Br6dM3+KL._SX679_PIbundle-12,TopRight,0,0_AA679SH20_.jpg" },

    // Snacks
    { name: "Parle-G Biscuit", category: "Snacks", price: 10, image: "https://m.media-amazon.com/images/I/91sfnxMxOnL._SX679_.jpg" },
    { name: "Good Day Biscuit", category: "Snacks", price: 20, image: "https://hbkirana.in/wp-content/uploads/2025/03/image_19_z4kx-rb_1920x.jpg" },
    { name: "Marie Gold Biscuit", category: "Snacks", price: 30, image: "https://frugivore-bucket.s3.amazonaws.com/media/package/img_one/2020-08-12/MARIEGOLD_250G.jpg" },
    { name: "Oreo Biscuit", category: "Snacks", price: 35, image: "https://images-cdn.ubuy.co.in/6941f6c8a6577a602f0c25c7-oreo-chocolate-sandwich-cookies-party.jpg" },
    { name: "Lays Chips", category: "Snacks", price: 20, image: "https://m.media-amazon.com/images/I/410Dc+IQHlL._SY300_SX300_QL70_FMwebp_.jpg" },
    { name: "Kurkure", category: "Snacks", price: 20, image: "https://m.media-amazon.com/images/I/51KheTEie2L._SY300_SX300_QL70_FMwebp_.jpg" },
    { name: "Maggi Noodles", category: "Snacks", price: 14, image: "https://supermarthk.net/wp-content/uploads/2024/08/maggi-in-hongkong-600x715.jpg" },
    { name: "Kissan Jam", category: "Snacks", price: 40, image: "https://m.media-amazon.com/images/I/41gqwyfW96L._SY300_SX300_QL70_FMwebp_.jpg" }
];

console.log('Seeding products...');
const insert = db.prepare('INSERT INTO products (name, category, price, image_url) VALUES (?, ?, ?, ?)');

const transaction = db.transaction((items) => {
    // Clear dependent tables first to avoid Foreign Key errors
    db.prepare('DELETE FROM order_items').run();
    db.prepare('DELETE FROM orders').run();
    db.prepare('DELETE FROM sqlite_sequence WHERE name=\'orders\'').run();
    db.prepare('DELETE FROM sqlite_sequence WHERE name=\'order_items\'').run();

    db.prepare('DELETE FROM products').run();
    db.prepare('DELETE FROM sqlite_sequence WHERE name=\'products\'').run();
    for (const item of items) {
        insert.run(item.name, item.category, item.price, item.image);
    }
});

try {
    transaction(PRODUCTS);
    console.log('Seeded successfully!');
} catch (err) {
    console.error('Error seeding:', err);
}
