// ============ DATA STORES ============
let racers = [];
let spectators = [];
let vendors = [];
let allProducts = [];
let allOrders = [];
let allComments = [];

// Load from localStorage
function loadData() {
  const savedRacers = localStorage.getItem('admin_racers');
  const savedSpectators = localStorage.getItem('admin_spectators');
  const savedVendors = localStorage.getItem('admin_vendors');
  const savedProducts = localStorage.getItem('admin_products');
  const savedOrders = localStorage.getItem('admin_orders');
  const savedComments = localStorage.getItem('admin_comments');
  
  racers = savedRacers ? JSON.parse(savedRacers) : getDefaultRacers();
  spectators = savedSpectators ? JSON.parse(savedSpectators) : getDefaultSpectators();
  vendors = savedVendors ? JSON.parse(savedVendors) : getDefaultVendors();
  allProducts = savedProducts ? JSON.parse(savedProducts) : getDefaultProducts();
  allOrders = savedOrders ? JSON.parse(savedOrders) : getDefaultOrders();
  allComments = savedComments ? JSON.parse(savedComments) : getDefaultComments();
  
  saveAll();
  renderAll();
}

function getDefaultRacers() {
  return [
    { id: 'r1', name: 'Max Verstappen', email: 'max@redbull.com', team: 'Red Bull Racing', wins: 60, joined: '2024-01-15' },
    { id: 'r2', name: 'Lewis Hamilton', email: 'lewis@mercedes.com', team: 'Mercedes', wins: 103, joined: '2024-01-10' },
    { id: 'r3', name: 'Charles Leclerc', email: 'charles@ferrari.com', team: 'Ferrari', wins: 8, joined: '2024-02-01' }
  ];
}

function getDefaultSpectators() {
  return [
    { id: 's1', name: 'John Kamau', email: 'john@email.com', phone: '0712345678', orders: 3, joined: '2024-01-20' },
    { id: 's2', name: 'Mary Wanjiku', email: 'mary@email.com', phone: '0723456789', orders: 1, joined: '2024-02-05' },
    { id: 's3', name: 'Peter Omondi', email: 'peter@email.com', phone: '0734567890', orders: 5, joined: '2024-01-25' }
  ];
}

function getDefaultVendors() {
  return [
    { id: 'v1', name: "Mike's Auto Gear", owner: 'Mike Mwangi', email: 'mike@autogear.com', phone: '0711122233', category: 'Gear', joined: '2024-01-10', productCount: 3, revenue: 125000 },
    { id: 'v2', name: 'Mama Njeri Foods', owner: 'Njeri Wanjiku', email: 'njeri@foods.com', phone: '0722233344', category: 'Food', joined: '2024-01-15', productCount: 5, revenue: 89000 }
  ];
}

function getDefaultProducts() {
  return [
    { id: 'prod1', vendorId: 'v1', vendorName: "Mike's Auto Gear", name: 'Sparco Racing Gloves', desc: 'FIA-approved fire-resistant', price: 8500, stock: 15, category: 'Gear', image: 'https://picsum.photos/seed/gloves/400/300' },
    { id: 'prod2', vendorId: 'v1', vendorName: "Mike's Auto Gear", name: 'Racing Helmet', desc: 'Carbon fiber shell', price: 45000, stock: 8, category: 'Gear', image: 'https://picsum.photos/seed/helmet/400/300' },
    { id: 'prod3', vendorId: 'v2', vendorName: 'Mama Njeri Foods', name: 'Gourmet Burger', desc: 'Double patty with cheese', price: 1200, stock: 50, category: 'Food', image: 'https://picsum.photos/seed/burger/400/300' }
  ];
}

function getDefaultOrders() {
  return [
    { id: 'ord1', customerName: 'John Kamau', customerEmail: 'john@email.com', productId: 'prod3', productName: 'Gourmet Burger', quantity: 2, total: 2400, status: 'delivered', date: '2025-01-15', vendorId: 'v2' },
    { id: 'ord2', customerName: 'Mary Wanjiku', customerEmail: 'mary@email.com', productId: 'prod1', productName: 'Sparco Racing Gloves', quantity: 1, total: 8500, status: 'shipped', date: '2025-01-18', vendorId: 'v1' }
  ];
}

function getDefaultComments() {
  return [
    { id: 'c1', productId: 'prod1', productName: 'Sparco Racing Gloves', customerName: 'John Kamau', comment: 'Do these come in size XL?', timestamp: '2025-01-14 10:30', reply: 'Yes, we have XL in stock!', repliedAt: '2025-01-14 14:20', vendorId: 'v1', status: 'approved' },
    { id: 'c2', productId: 'prod3', productName: 'Gourmet Burger', customerName: 'Mary Wanjiku', comment: 'Is this halal?', timestamp: '2025-01-15 09:15', reply: null, repliedAt: null, vendorId: 'v2', status: 'pending' }
  ];
}

function saveAll() {
  localStorage.setItem('admin_racers', JSON.stringify(racers));
  localStorage.setItem('admin_spectators', JSON.stringify(spectators));
  localStorage.setItem('admin_vendors', JSON.stringify(vendors));
  localStorage.setItem('admin_products', JSON.stringify(allProducts));
  localStorage.setItem('admin_orders', JSON.stringify(allOrders));
  localStorage.setItem('admin_comments', JSON.stringify(allComments));
}

// ============ RENDER FUNCTIONS ============
function renderAll() {
  renderStats();
  renderRacers();
  renderSpectators();
  renderVendors();
  renderProducts();
  renderComments();
  renderOrders();
}

function renderStats() {
  const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0);
  const statsHtml = `
    <div class="stat-card"><div class="text-2xl font-bold text-red-500">${racers.length}</div><div class="text-xs text-neutral-500 mt-1">Total Racers</div></div>
    <div class="stat-card"><div class="text-2xl font-bold text-red-500">${spectators.length}</div><div class="text-xs text-neutral-500 mt-1">Total Spectators</div></div>
    <div class="stat-card"><div class="text-2xl font-bold text-red-500">${vendors.length}</div><div class="text-xs text-neutral-500 mt-1">Active Vendors</div></div>
    <div class="stat-card"><div class="text-2xl font-bold text-red-500">${allProducts.length}</div><div class="text-xs text-neutral-500 mt-1">Total Products</div></div>
    <div class="stat-card"><div class="text-2xl font-bold text-red-500">KES ${totalRevenue.toLocaleString()}</div><div class="text-xs text-neutral-500 mt-1">Platform Revenue</div></div>
  `;
  document.getElementById('statsGrid').innerHTML = statsHtml;
}

function renderRacers() {
  const tbody = document.getElementById('racersTable');
  tbody.innerHTML = racers.map(r => `
    <tr class="border-b border-neutral-800/50 hover:bg-neutral-900/50">
      <td class="p-4 font-medium">${escapeHtml(r.name)}</td><td class="p-4 text-neutral-400">${escapeHtml(r.email)}</td><td class="p-4">${escapeHtml(r.team)}</td><td class="p-4 text-red-400 font-semibold">${r.wins}</td><td class="p-4 text-neutral-500 text-sm">${r.joined}</td>
      <td class="p-4"><div class="flex gap-2"><button onclick="editRacer('${r.id}')" class="px-3 py-1 bg-neutral-800 rounded-lg text-xs hover:bg-neutral-700">Edit</button><button onclick="deleteRacer('${r.id}')" class="px-3 py-1 bg-red-600/20 text-red-500 rounded-lg text-xs hover:bg-red-600/30">Delete</button></div></td>
    </tr>
  `).join('');
}

function renderSpectators() {
  const tbody = document.getElementById('spectatorsTable');
  tbody.innerHTML = spectators.map(s => `
    <tr class="border-b border-neutral-800/50 hover:bg-neutral-900/50">
      <td class="p-4 font-medium">${escapeHtml(s.name)}</td><td class="p-4 text-neutral-400">${escapeHtml(s.email)}</td><td class="p-4">${s.phone}</td><td class="p-4 text-red-400 font-semibold">${s.orders}</td><td class="p-4 text-neutral-500 text-sm">${s.joined}</td>
      <td class="p-4"><div class="flex gap-2"><button onclick="editSpectator('${s.id}')" class="px-3 py-1 bg-neutral-800 rounded-lg text-xs hover:bg-neutral-700">Edit</button><button onclick="deleteSpectator('${s.id}')" class="px-3 py-1 bg-red-600/20 text-red-500 rounded-lg text-xs hover:bg-red-600/30">Delete</button></div></td>
    </tr>
  `).join('');
}

function renderVendors() {
  const grid = document.getElementById('vendorsGrid');
  grid.innerHTML = vendors.map(v => `
    <div class="bg-[#141414] border border-neutral-800 rounded-xl p-5 card-hover">
      <div class="flex justify-between items-start mb-3"><div><h3 class="font-bold text-lg">${escapeHtml(v.name)}</h3><p class="text-sm text-neutral-400">${escapeHtml(v.owner)}</p></div><span class="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-xs">${v.category}</span></div>
      <div class="space-y-2 text-sm mb-4"><p class="flex items-center gap-2"><i data-lucide="mail" class="w-3.5 h-3.5 text-neutral-500"></i>${escapeHtml(v.email)}</p><p class="flex items-center gap-2"><i data-lucide="phone" class="w-3.5 h-3.5 text-neutral-500"></i>${v.phone}</p></div>
      <div class="flex justify-between items-center pt-3 border-t border-neutral-800"><div><span class="text-xs text-neutral-500">Products: ${v.productCount}</span><span class="text-xs text-neutral-500 ml-3">Revenue: KES ${v.revenue.toLocaleString()}</span></div>
      <div class="flex gap-2"><button onclick="editVendor('${v.id}')" class="px-3 py-1.5 bg-neutral-800 rounded-lg text-sm hover:bg-neutral-700">Edit</button><button onclick="deleteVendor('${v.id}')" class="px-3 py-1.5 bg-red-600/20 text-red-500 rounded-lg text-sm hover:bg-red-600/30">Delete</button><button onclick="viewVendorProducts('${v.id}')" class="px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30">Products</button></div></div>
    </div>
  `).join('');
  if(typeof lucide !== 'undefined') lucide.createIcons();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = allProducts.map(p => `
    <div class="bg-[#141414] border border-neutral-800 rounded-xl overflow-hidden card-hover">
      <div class="h-36 overflow-hidden"><img src="${p.image}" class="w-full h-full object-cover" onerror="this.src='https://picsum.photos/seed/default/400/300'"></div>
      <div class="p-4"><div class="flex justify-between items-start mb-2"><h3 class="font-bold">${escapeHtml(p.name)}</h3><span class="text-xs px-2 py-1 bg-neutral-800 rounded-full">${p.category}</span></div><p class="text-xs text-neutral-400 mb-2">by ${escapeHtml(p.vendorName)}</p><p class="text-sm text-neutral-400 mb-2 line-clamp-2">${escapeHtml(p.desc)}</p><div class="flex justify-between items-center"><span class="text-xl font-bold text-red-500">KES ${p.price.toLocaleString()}</span><span class="text-xs text-neutral-500">Stock: ${p.stock}</span></div>
      <div class="flex gap-2 mt-3"><button onclick="editGlobalProduct('${p.id}')" class="flex-1 py-2 bg-neutral-800 rounded-lg text-sm hover:bg-neutral-700">Edit</button><button onclick="deleteGlobalProduct('${p.id}')" class="flex-1 py-2 bg-red-600/20 text-red-500 rounded-lg text-sm hover:bg-red-600/30">Delete</button></div></div>
    </div>
  `).join('');
}

function renderComments() {
  const grid = document.getElementById('commentsGrid');
  grid.innerHTML = allComments.map(c => `
    <div class="bg-[#141414] border border-neutral-800 rounded-xl p-5">
      <div class="flex justify-between items-start mb-3"><div><p class="font-semibold">${escapeHtml(c.customerName)}</p><p class="text-xs text-neutral-500">on ${escapeHtml(c.productName)} · ${c.timestamp}</p></div><span class="px-2 py-1 rounded-full text-xs ${c.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}">${c.status}</span></div>
      <p class="text-neutral-300 mb-4">${escapeHtml(c.comment)}</p>
      ${c.reply ? `<div class="bg-neutral-900 rounded-lg p-3 border-l-2 border-red-500"><p class="text-xs text-neutral-500 mb-1">Vendor Reply:</p><p class="text-sm">${escapeHtml(c.reply)}</p></div>` : `<div class="flex gap-2"><button onclick="approveComment('${c.id}')" class="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg text-sm hover:bg-green-600/30">Approve</button><button onclick="deleteComment('${c.id}')" class="px-4 py-2 bg-red-600/20 text-red-500 rounded-lg text-sm hover:bg-red-600/30">Delete</button></div>`}
    </div>
  `).join('');
}

function renderOrders() {
  const grid = document.getElementById('ordersGrid');
  grid.innerHTML = allOrders.map(o => `
    <div class="bg-[#141414] border border-neutral-800 rounded-xl p-5">
      <div class="flex flex-wrap justify-between items-start gap-3 mb-3"><div><p class="text-xs text-neutral-500">Order #${o.id}</p><p class="font-semibold">${escapeHtml(o.productName)}</p><p class="text-sm text-neutral-400">${escapeHtml(o.customerName)} · ${o.customerEmail}</p></div>
      <div class="text-right"><span class="text-lg font-bold text-red-500">KES ${o.total.toLocaleString()}</span><p class="text-xs text-neutral-500">Qty: ${o.quantity} · ${o.date}</p></div></div>
      <div class="flex justify-between items-center mt-3 pt-3 border-t border-neutral-800"><span class="px-3 py-1 rounded-full text-xs font-semibold ${o.status === 'pending' ? 'bg-orange-500/20 text-orange-400' : o.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}">${o.status.toUpperCase()}</span><span class="text-xs text-neutral-500">Vendor: ${escapeHtml(o.vendorId === 'v1' ? "Mike's Auto Gear" : "Mama Njeri Foods")}</span></div>
    </div>
  `).join('');
}

// ============ CRUD OPERATIONS ============
function openUserModal(type, user = null) {
  document.getElementById('userType').value = type;
  document.getElementById('userModalTitle').innerText = type === 'racer' ? (user ? 'Edit Racer' : 'Add Racer') : (user ? 'Edit Spectator' : 'Add Spectator');
  document.getElementById('editingUserId').value = user ? user.id : '';
  document.getElementById('userName').value = user ? user.name : '';
  document.getElementById('userEmail').value = user ? user.email : '';
  document.getElementById('userPhone').value = user ? (user.phone || '') : '';
  document.getElementById('userTeam').value = user && type === 'racer' ? (user.team || '') : '';
  document.getElementById('userWins').value = user && type === 'racer' ? (user.wins || 0) : '';
  document.getElementById('userPassword').value = '';
  document.getElementById('racerFields').style.display = type === 'racer' ? 'block' : 'none';
  document.getElementById('userModal').classList.add('open');
}

function closeUserModal() { document.getElementById('userModal').classList.remove('open'); }

function saveUser() {
  const type = document.getElementById('userType').value;
  const id = document.getElementById('editingUserId').value;
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const team = document.getElementById('userTeam').value.trim();
  const wins = parseInt(document.getElementById('userWins').value) || 0;
  
  if(!name || !email) { showToast('Please fill required fields'); return; }
  
  if(type === 'racer') {
    if(id) {
      const index = racers.findIndex(r => r.id === id);
      if(index !== -1) racers[index] = { ...racers[index], name, email, team, wins };
    } else {
      const newId = 'r' + Date.now();
      racers.push({ id: newId, name, email, team, wins, joined: new Date().toISOString().split('T')[0] });
    }
  } else {
    if(id) {
      const index = spectators.findIndex(s => s.id === id);
      if(index !== -1) spectators[index] = { ...spectators[index], name, email, phone };
    } else {
      const newId = 's' + Date.now();
      spectators.push({ id: newId, name, email, phone, orders: 0, joined: new Date().toISOString().split('T')[0] });
    }
  }
  saveAll(); renderAll(); closeUserModal(); showToast('User saved');
}

function deleteRacer(id) { if(confirm('Delete this racer?')) { racers = racers.filter(r => r.id !== id); saveAll(); renderAll(); showToast('Racer deleted'); } }
function deleteSpectator(id) { if(confirm('Delete this spectator?')) { spectators = spectators.filter(s => s.id !== id); saveAll(); renderAll(); showToast('Spectator deleted'); } }
function editRacer(id) { const user = racers.find(r => r.id === id); if(user) openUserModal('racer', user); }
function editSpectator(id) { const user = spectators.find(s => s.id === id); if(user) openUserModal('spectator', user); }

// Vendor CRUD
function openVendorModal(vendor = null) {
  document.getElementById('vendorModalTitle').innerText = vendor ? 'Edit Vendor' : 'Add Vendor';
  document.getElementById('editingVendorId').value = vendor ? vendor.id : '';
  document.getElementById('vendorName').value = vendor ? vendor.name : '';
  document.getElementById('vendorOwner').value = vendor ? vendor.owner : '';
  document.getElementById('vendorEmail').value = vendor ? vendor.email : '';
  document.getElementById('vendorPhone').value = vendor ? vendor.phone : '';
  document.getElementById('vendorCategory').value = vendor ? vendor.category : 'Food';
  document.getElementById('vendorPassword').value = '';
  document.getElementById('vendorModal').classList.add('open');
}
function closeVendorModal() { document.getElementById('vendorModal').classList.remove('open'); }
function saveVendor() {
  const id = document.getElementById('editingVendorId').value;
  const name = document.getElementById('vendorName').value.trim();
  const owner = document.getElementById('vendorOwner').value.trim();
  const email = document.getElementById('vendorEmail').value.trim();
  const phone = document.getElementById('vendorPhone').value.trim();
  const category = document.getElementById('vendorCategory').value;
  if(!name || !owner || !email) { showToast('Please fill required fields'); return; }
  if(id) {
    const index = vendors.findIndex(v => v.id === id);
    if(index !== -1) vendors[index] = { ...vendors[index], name, owner, email, phone, category };
  } else {
    const newId = 'v' + Date.now();
    vendors.push({ id: newId, name, owner, email, phone, category, joined: new Date().toISOString().split('T')[0], productCount: 0, revenue: 0 });
  }
  saveAll(); renderAll(); closeVendorModal(); showToast('Vendor saved');
}
function deleteVendor(id) { if(confirm('Delete this vendor? Their products will also be deleted.')) { vendors = vendors.filter(v => v.id !== id); allProducts = allProducts.filter(p => p.vendorId !== id); saveAll(); renderAll(); showToast('Vendor deleted'); } }
function editVendor(id) { const vendor = vendors.find(v => v.id === id); if(vendor) openVendorModal(vendor); }
function viewVendorProducts(vendorId) { switchTab('products'); showToast('Showing products for this vendor'); }

// Product CRUD
function openGlobalProductModal(product = null) {
  const vendorSelect = document.getElementById('globalProdVendor');
  vendorSelect.innerHTML = '<option value="">Select Vendor</option>' + vendors.map(v => `<option value="${v.id}">${v.name}</option>`).join('');
  document.getElementById('globalProductModalTitle').innerText = product ? 'Edit Product' : 'Add Product';
  document.getElementById('editingGlobalProductId').value = product ? product.id : '';
  document.getElementById('globalProdName').value = product ? product.name : '';
  document.getElementById('globalProdDesc').value = product ? product.desc : '';
  document.getElementById('globalProdPrice').value = product ? product.price : '';
  document.getElementById('globalProdStock').value = product ? product.stock : '';
  document.getElementById('globalProdCategory').value = product ? product.category : 'Food';
  document.getElementById('globalProdImage').value = product ? product.image : '';
  if(product) vendorSelect.value = product.vendorId;
  document.getElementById('globalProductModal').classList.add('open');
}
function closeGlobalProductModal() { document.getElementById('globalProductModal').classList.remove('open'); }
function saveGlobalProduct() {
  const id = document.getElementById('editingGlobalProductId').value;
  const vendorId = document.getElementById('globalProdVendor').value;
  const vendor = vendors.find(v => v.id === vendorId);
  const name = document.getElementById('globalProdName').value.trim();
  const desc = document.getElementById('globalProdDesc').value.trim();
  const price = parseInt(document.getElementById('globalProdPrice').value);
  const stock = parseInt(document.getElementById('globalProdStock').value);
  const category = document.getElementById('globalProdCategory').value;
  const image = document.getElementById('globalProdImage').value || 'https://picsum.photos/seed/' + Date.now() + '/400/300';
  if(!name || !desc || isNaN(price) || !vendorId) { showToast('Please fill all fields and select a vendor'); return; }
  if(id) {
    const index = allProducts.findIndex(p => p.id === id);
    if(index !== -1) allProducts[index] = { ...allProducts[index], name, desc, price, stock, category, image, vendorId, vendorName: vendor.name };
  } else {
    const newId = 'prod' + Date.now();
    allProducts.push({ id: newId, vendorId, vendorName: vendor.name, name, desc, price, stock, category, image });
    vendor.productCount = (vendor.productCount || 0) + 1;
  }
  saveAll(); renderAll(); closeGlobalProductModal(); showToast('Product saved');
}
function deleteGlobalProduct(id) { if(confirm('Delete this product?')) { allProducts = allProducts.filter(p => p.id !== id); saveAll(); renderAll(); showToast('Product deleted'); } }
function editGlobalProduct(id) { const product = allProducts.find(p => p.id === id); if(product) openGlobalProductModal(product); }

// Comment moderation
function approveComment(id) { const comment = allComments.find(c => c.id === id); if(comment) { comment.status = 'approved'; saveAll(); renderComments(); showToast('Comment approved'); } }
function deleteComment(id) { if(confirm('Delete this comment?')) { allComments = allComments.filter(c => c.id !== id); saveAll(); renderComments(); showToast('Comment deleted'); } }

// ============ TAB SWITCHING ============
function switchTab(tab) {
  const tabs = ['racers', 'spectators', 'vendors', 'products', 'comments', 'orders'];
  tabs.forEach(t => {
    document.getElementById(t + 'Tab').classList.add('hidden');
    const btn = document.getElementById('tab-' + t);
    if(btn) btn.classList.remove('tab-active', 'bg-red-600', 'text-white');
    if(btn) btn.classList.add('text-neutral-400', 'hover:text-white');
  });
  document.getElementById(tab + 'Tab').classList.remove('hidden');
  const activeBtn = document.getElementById('tab-' + tab);
  if(activeBtn) { activeBtn.classList.add('tab-active', 'bg-red-600', 'text-white'); activeBtn.classList.remove('text-neutral-400'); }
  document.querySelectorAll('.tab-mobile').forEach(btn => { btn.classList.remove('bg-red-600', 'text-white'); btn.classList.add('bg-neutral-800', 'text-neutral-400'); });
  const mobileMatch = Array.from(document.querySelectorAll('.tab-mobile')).find(b => b.textContent.includes(tab === 'racers' ? '🏁' : tab === 'spectators' ? '👥' : tab === 'vendors' ? '🏪' : tab === 'products' ? '📦' : tab === 'comments' ? '💬' : '📋'));
  if(mobileMatch) { mobileMatch.classList.add('bg-red-600', 'text-white'); mobileMatch.classList.remove('bg-neutral-800', 'text-neutral-400'); }
}

function escapeHtml(str) { if(!str) return ''; return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;'); }
function showToast(msg) { const toast = document.getElementById('toast'); document.getElementById('toastMsg').innerText = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); }

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if(typeof lucide !== 'undefined') lucide.createIcons();
  loadData();
  switchTab('racers');
});

window.switchTab = switchTab;
window.openUserModal = openUserModal; window.closeUserModal = closeUserModal; window.saveUser = saveUser;
window.deleteRacer = deleteRacer; window.deleteSpectator = deleteSpectator; window.editRacer = editRacer; window.editSpectator = editSpectator;
window.openVendorModal = openVendorModal; window.closeVendorModal = closeVendorModal; window.saveVendor = saveVendor;
window.deleteVendor = deleteVendor; window.editVendor = editVendor; window.viewVendorProducts = viewVendorProducts;
window.openGlobalProductModal = openGlobalProductModal; window.closeGlobalProductModal = closeGlobalProductModal; window.saveGlobalProduct = saveGlobalProduct;
window.deleteGlobalProduct = deleteGlobalProduct; window.editGlobalProduct = editGlobalProduct;
window.approveComment = approveComment; window.deleteComment = deleteComment;
