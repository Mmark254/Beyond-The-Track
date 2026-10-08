// ----- SINGLE VENDOR DATA (Realistic fresh start) -----
    let vendorProducts = [];   // starts empty — no products initially
    let vendorOrders = [];     // no orders yet (real world)
    let messages = [];

    // Helper: toast
    function showToast(msg) { let t = document.getElementById('toastText'); t.innerText = msg; document.getElementById('toastMsgBox').classList.add('show'); setTimeout(()=> document.getElementById('toastMsgBox').classList.remove('show'), 2800); }

    // Image handling: convert uploaded file to Base64
    let currentImageBase64 = "";
    document.getElementById('imageFileInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file && (file.type.startsWith('image/'))) {
            const reader = new FileReader();
            reader.onload = function(ev) { currentImageBase64 = ev.target.result; document.getElementById('imagePreview').innerHTML = `<img src="${currentImageBase64}" style="height:50px; width:auto; border-radius:6px;">`; };
            reader.readAsDataURL(file);
        } else { showToast("Please select a valid image file"); }
    });

    // Render Products (only vendor's own)
    function renderProducts() {
        const grid = document.getElementById('vendorProductsGrid');
        if(vendorProducts.length === 0) { grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted);border:1px dashed var(--border);border-radius:20px">✨ No products yet. Click "+ ADD PRODUCT" to start selling.</div>'; return; }
        grid.innerHTML = vendorProducts.map(p => `
            <div class="product-card">
                <div class="product-img">${p.image ? `<img src="${p.image}" alt="${p.name}">` : '<div style="height:100%;display:flex;align-items:center;justify-content:center;background:#1e1e1e;">📦 No Image</div>'}</div>
                <div class="product-body">
                    <h3>${escapeHtml(p.name)}</h3>
                    <div class="price">KES ${p.price.toLocaleString()}</div>
                    <div class="stock">📦 Stock: ${p.stock} units</div>
                    <div class="product-actions"><button class="edit-btn" onclick="editProduct('${p.id}')">✏️ EDIT</button><button class="delete-btn" onclick="deleteProduct('${p.id}')">🗑 DELETE</button></div>
                </div>
            </div>
        `).join('');
        updateStats();
    }

    function escapeHtml(str) { return str.replace(/[&<>]/g, function(m){if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }

    let editingId = null;
    function openProductModal() { editingId = null; currentImageBase64 = ""; document.getElementById('imagePreview').innerHTML = ''; document.getElementById('imageFileInput').value = ''; document.getElementById('modalTitle').innerText = "ADD PRODUCT"; document.getElementById('prodName').value = ""; document.getElementById('prodPrice').value = ""; document.getElementById('prodStock').value = ""; document.getElementById('prodCat').value = "Gear"; document.getElementById('prodDesc').value = ""; document.getElementById('prodImageData').value = ""; document.getElementById('productModal').classList.add('open'); }
    function closeProductModal() { document.getElementById('productModal').classList.remove('open'); editingId = null; }
    function editProduct(id) { let p = vendorProducts.find(x => x.id === id); if(p){ editingId = id; document.getElementById('modalTitle').innerText = "EDIT PRODUCT"; document.getElementById('prodName').value = p.name; document.getElementById('prodPrice').value = p.price; document.getElementById('prodStock').value = p.stock; document.getElementById('prodCat').value = p.category; document.getElementById('prodDesc').value = p.description || ''; currentImageBase64 = p.image || ''; document.getElementById('imagePreview').innerHTML = p.image ? `<img src="${p.image}" style="height:50px; border-radius:6px;">` : ''; document.getElementById('productModal').classList.add('open'); } }
    function saveProduct() {
        let name = document.getElementById('prodName').value.trim(); let price = parseFloat(document.getElementById('prodPrice').value); let stock = parseInt(document.getElementById('prodStock').value); let category = document.getElementById('prodCat').value; let desc = document.getElementById('prodDesc').value;
        if(!name || isNaN(price) || isNaN(stock)) { showToast("Please fill name, price and stock"); return; }
        let imageFinal = currentImageBase64 || "";
        if(editingId) {
            let idx = vendorProducts.findIndex(p => p.id === editingId);
            if(idx !== -1) { vendorProducts[idx] = { ...vendorProducts[idx], name, price, stock, category, description: desc, image: imageFinal }; showToast("Product updated"); }
        } else {
            let newId = 'p_' + Date.now() + '_' + Math.floor(Math.random()*1000);
            vendorProducts.push({ id: newId, name, price, stock, category, description: desc, image: imageFinal });
            showToast("Product added!");
        }
        closeProductModal(); renderProducts(); updateStats();
    }
    function deleteProduct(id) { if(confirm("Delete this product? Orders remain for history.")) { vendorProducts = vendorProducts.filter(p => p.id !== id); renderProducts(); updateStats(); showToast("Product removed"); } }

    // Orders (realistically empty at start, but we simulate if any orders come in from demo)
    function loadDemoOrders() {
        if(vendorOrders.length === 0 && vendorProducts.length > 0) {
            // Only add sample orders if user wants to test – but keep realistic. Actually we keep empty but for demonstration we'll generate one order only if admin adds products and we trigger test.
        }
    }

    function renderOrders() {
        const tbody = document.getElementById('ordersTableBody');
        let filtered = vendorOrders.filter(o => currentOrderFilter === 'all' ? true : o.status === currentOrderFilter);
        if(filtered.length === 0) { tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:30px">📭 No orders yet. Once customers buy, they appear here.</td></tr>'; return; }
        tbody.innerHTML = filtered.map(o => `<tr><td style="font-family:monospace">${o.id}</td><td>${o.customer}<br><span style="font-size:0.6rem;color:var(--muted)">${o.customerEmail}</span></td><td>${o.productName}</td><td>${o.quantity}</td><td>KES ${o.amount.toLocaleString()}</td><td><span class="status-badge status-${o.status}">● ${o.status.toUpperCase()}</span></td><td>${o.status === 'pending' ? `<button class="action-btn" onclick="updateOrderStatus('${o.id}','shipped')">📦 SHIP</button>` : o.status === 'shipped' ? `<button class="action-btn" onclick="updateOrderStatus('${o.id}','delivered')">✅ DELIVER</button>` : '—'} <button class="action-btn action-contact" onclick="contactCustomer('${o.customer}','${o.id}')">💬 MSG</button></td></tr>`).join('');
    }

    let currentOrderFilter = 'all';
    function filterOrders(tab, btn) { currentOrderFilter = tab; document.querySelectorAll('.filter-tab').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderOrders(); }
    function updateOrderStatus(orderId, newStatus) { let ord = vendorOrders.find(o=>o.id===orderId); if(ord) { ord.status = newStatus; renderOrders(); updateStats(); showToast(`Order ${orderId} → ${newStatus}`); } }
    function contactCustomer(custName, orderId) { let msg = prompt(`Message to ${custName}:`); if(msg && msg.trim()) { messages.unshift({ id: Date.now(), from: "Vendor", to: custName, text: msg, timestamp: new Date().toLocaleString() }); renderMessages(); showToast(`Message sent to ${custName}`); } }
    function sendBroadcast() { let input = document.getElementById('broadcastMsg'); let text = input.value.trim(); if(!text) { showToast("Enter message"); return; } let uniqueCustomers = [...new Map(vendorOrders.map(o=>[o.customerEmail, {name:o.customer}])).values()]; if(uniqueCustomers.length===0) { showToast("No customers yet"); return; } uniqueCustomers.forEach(c=>{ messages.unshift({ id: Date.now()+c.name, from: "Vendor (broadcast)", to: c.name, text: text, timestamp: new Date().toLocaleString() }); }); renderMessages(); input.value=''; showToast(`Message sent to ${uniqueCustomers.length} customers`); }
    function renderMessages() { let container = document.getElementById('chatMessages'); if(messages.length===0){ container.innerHTML='<div style="color:var(--muted);text-align:center">💬 No conversations yet. When customers ask, you’ll see here.</div>'; return; } container.innerHTML = messages.slice().reverse().map(m=>`<div class="message-item"><div class="message-customer">📩 ${m.from} → ${m.to || 'customer'}</div><div class="message-text">${escapeHtml(m.text)}</div><div class="message-time">${m.timestamp}</div></div>`).join(''); }

    function updateStats() {
        let totalRevenue = vendorOrders.reduce((sum,o)=> sum + (o.status !== 'pending' ? o.amount : 0), 0);
        document.getElementById('totalRevenue').innerText = 'KES ' + totalRevenue.toLocaleString();
        document.getElementById('totalOrders').innerText = vendorOrders.length;
        document.getElementById('productCount').innerText = vendorProducts.length;
        document.getElementById('pendingCount').innerText = vendorOrders.filter(o=>o.status==='pending').length;
    }

    // Hero slideshow
    let hSlide=0, hSlides=document.querySelectorAll('.hero-slide'), hDots=document.getElementById('heroDots'), hInt;
    for(let i=0;i<hSlides.length;i++){ let d=document.createElement('div'); d.className='hero-dot'+(i===0?' active':''); d.onclick=(function(idx){return function(){goHero(idx)}})(i); hDots.appendChild(d); }
    let hDotEls = hDots.querySelectorAll('.hero-dot');
    function goHero(i){ hSlides.forEach((s,j)=>{ s.classList.toggle('active',j===i); hDotEls[j].classList.toggle('active',j===i); }); hSlide=i; let bar=document.getElementById('heroBar'); bar.style.animation='none'; bar.offsetHeight; bar.style.animation='progress 6s linear forwards'; clearInterval(hInt); hInt=setInterval(()=>goHero((hSlide+1)%hSlides.length),6000); }
    function heroNav(d){ goHero((hSlide+d+hSlides.length)%hSlides.length); }
    hInt=setInterval(()=>goHero((hSlide+1)%hSlides.length),6000);

    // Optional: allow vendor to add a test order (real world none, but for demo we keep empty)
    // No pre-filled orders/products — completely empty start.
    renderProducts(); renderOrders(); renderMessages(); updateStats();
    // Ensure upload zone click works
    document.getElementById('uploadZone').addEventListener('click', ()=>document.getElementById('imageFileInput').click());
