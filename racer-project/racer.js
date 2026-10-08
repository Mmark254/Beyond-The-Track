const rates={USD:0.0077,EUR:0.0071,GBP:0.0061};
    function formatKES(a){return'KES '+a.toLocaleString()}
    function convertCurrency(kes){return Object.entries(rates).map(([c,r])=>`${c} ${(kes*r).toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:0})}`).join(' · ')}

    const categories=['Formula','Rally','Drift','Endurance','Sprint','GT','Touring','Street'];
    const statuses=['live','upcoming','upcoming','upcoming','live','upcoming'];
    const countries=['Kenya','South Africa','Japan','USA','UK','Italy','Germany','Brazil','Australia','UAE','Monaco','Mexico','Canada','France','Spain','Singapore','China','India','Nigeria','Egypt','Morocco','Tanzania','Thailand','South Korea','Netherlands','Belgium'];
    const cityData={'Kenya':'Nairobi','South Africa':'Johannesburg','Japan':'Suzuka','USA':'Austin','UK':'Silverstone','Italy':'Monza','Germany':'Nürburgring','Brazil':'São Paulo','Australia':'Melbourne','UAE':'Abu Dhabi','Monaco':'Monte Carlo','Mexico':'Mexico City','Canada':'Montreal','France':'Le Mans','Spain':'Barcelona','Singapore':'Marina Bay','China':'Shanghai','India':'Delhi','Nigeria':'Lagos','Egypt':'Cairo','Morocco':'Marrakech','Tanzania':'Dar es Salaam','Thailand':'Bangkok','South Korea':'Seoul','Netherlands':'Zandvoort','Belgium':'Spa'};
    const raceNames=['Grand Prix','Rally Championship','Drift Masters','24hr Endurance','Night Sprint','GT Challenge','Touring Cup','Street Kings','Thunder Circuit','Diamond Race','Iron Lap','Velocity Open','Apex Series','Storm Run','Phoenix Rally','Blaze Cup','Nitro League','Titan Race','Eclipse Circuit','Horizon GP'];
    const awards=['🏆 Gold Trophy + Cash','🥇 Championship Belt','🏅 Diamond Medal','🎖️ Platinum Cup','👑 Crown + Cash','💎 Crystal Trophy','🏆 Grand Prize Pack','🥇 Champion Ring'];

    let races=[];
    for(let i=0;i<52;i++){
      const country=countries[i%countries.length];
      const city=cityData[country]||country;
      const cat=categories[i%categories.length];
      const status=i<3?statuses[i%statuses.length]:'upcoming';
      const prize=Math.floor(Math.random()*4000000)+500000;
      const fee=Math.floor(Math.random()*80000)+15000;
      const date=new Date(Date.now()+Math.random()*90*86400000);
      races.push({id:i,name:`${city} ${raceNames[i%raceNames.length]}`,country:country,city:city,category:cat,status:status,prize:prize,fee:fee,date:date,entrants:0,maxEntrants:200,award:awards[i%awards.length],laps:Math.floor(Math.random()*60)+10,distance:`${Math.floor(Math.random()*300)+50}km`});
    }

    let winners=[];

    const merchItems=[
      {id:1,name:'Racing Team Jacket',price:8500,img:'images/img25.jpeg',desc:'Premium wind-resistant jacket with embroidered logos',sizes:['S','M','L','XL']},
      {id:2,name:'Champion Helmet Replica',price:25000,img:'images/img28.jpeg',desc:'Full-scale replica of the championship winning helmet',sizes:[]},
      {id:3,name:'Pit Crew T-Shirt',price:3200,img:'images/img27.jpeg',desc:'Breathable cotton blend with race graphics',sizes:['S','M','L','XL','XXL']},
      {id:4,name:'Racing Gloves',price:6800,img:'images/img26.jpeg',desc:'Fireproof competition-grade racing gloves',sizes:['S','M','L']},
      {id:5,name:'Team Cap',price:2500,img:'images/img29.jpeg',desc:'Adjustable snapback with 3D embroidered logo',sizes:['One Size']},
      {id:6,name:'Diecast Model Car',price:12000,img:'images/img30.jpeg',desc:'1:18 scale precision diecast championship car',sizes:[]},
      {id:7,name:'Racing Suit',price:45000,img:'images/img27.jpeg',desc:'FIA-homologated race suit with custom patches',sizes:['S','M','L','XL']},
      {id:8,name:'Track Day Backpack',price:5500,img:'images/img31.jpeg',desc:'Durable race-day pack with hydration sleeve',sizes:['One Size']},
      {id:9,name:'Exhaust Note Speaker',price:9800,img:'images/img32.jpeg',desc:'Bluetooth speaker shaped like a turbo exhaust',sizes:[]},
      {id:10,name:'Pit Lane Hoodie',price:6200,img:'images/img33.jpeg',desc:'Heavyweight fleece with reflective racing stripes',sizes:['S','M','L','XL']},
      {id:11,name:'Champion Poster Set',price:1800,img:'images/img34.jpeg',desc:'Set of 4 high-quality A3 race posters',sizes:[]},
      {id:12,name:'Racing Sunglasses',price:7500,img:'images/img35.jpeg',desc:'Polarized lens with carbon-fibre temples',sizes:['One Size']}
    ];

    const slideImages = [
      {url: "images/img40.jpeg", alt: "Formula 1 Racing"},
      {url: "images/img41.jpeg", alt: "Race Car Action"},
      {url: "images/img42.jpeg", alt: "Rally Racing"},
      {url: "images/img43.jpeg", alt: "Drift Competition"},
      {url: "images/img44.jpeg", alt: "Race Track"}
    ];

    function buildSlideshow() {
      const container = document.getElementById('heroSlideshow');
      const dotsContainer = document.getElementById('slideDots');
      container.innerHTML = '';
      dotsContainer.innerHTML = '';
      slideImages.forEach((img, i) => {
        const slide = document.createElement('div');
        slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
        const imgElement = document.createElement('img');
        imgElement.src = img.url;
        imgElement.alt = img.alt;
        imgElement.className = 'slide-bg';
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'cover';
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.inset = '0';
        overlay.style.background = 'linear-gradient(rgba(10,10,10,0.4), rgba(10,10,10,0.8))';
        overlay.style.pointerEvents = 'none';
        slide.appendChild(imgElement);
        slide.appendChild(overlay);
        container.appendChild(slide);
        const dot = document.createElement('button');
        dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
      });
    }

    let currentSlide=0;
    function goToSlide(n){
      const slides=document.querySelectorAll('.hero-slide');
      const dots=document.querySelectorAll('.slide-dot');
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide=n;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }
    function nextSlide(){goToSlide((currentSlide+1)%slideImages.length);animateSlideProgress()}
    function animateSlideProgress(){const pb=document.getElementById('slideProgress');pb.style.animation='none';setTimeout(()=>{pb.style.animation='slideProgress 6s linear forwards'},10)}
    setInterval(nextSlide,6000);

    let displayedRaces=12;
    let activeFilter='all';
    let searchQuery='';

    function getFilteredRaces(){
      return races.filter(r=>{
        const matchFilter=activeFilter==='all'||(activeFilter==='live'&&r.status==='live')||(activeFilter==='upcoming'&&r.status==='upcoming')||r.category.toLowerCase()===activeFilter;
        const matchSearch=searchQuery===''||r.name.toLowerCase().includes(searchQuery)||r.country.toLowerCase().includes(searchQuery)||r.category.toLowerCase().includes(searchQuery)||r.city.toLowerCase().includes(searchQuery);
        return matchFilter&&matchSearch;
      });
    }

    function renderRaces(){
      const grid=document.getElementById('raceGrid');
      const filtered=getFilteredRaces();
      const toShow=filtered.slice(0,displayedRaces);
      grid.innerHTML='';
      if(toShow.length===0){
        grid.innerHTML='<div class="col-span-full text-center py-12" style="color:#6b7280"><i data-lucide="search-x" style="width:40px;height:40px;margin:0 auto 12px;display:block"></i><p style="font-size:14px">No races found</p></div>';
        lucide.createIcons();
        return;
      }
      toShow.forEach((race,i)=>{
        const statusClass=race.status==='live'?'badge-live':'badge-upcoming';
        const statusText=race.status==='live'?'🔴 LIVE':'UPCOMING';
        const card=document.createElement('div');
        card.className='race-card fade-up';
        card.style.animationDelay=`${i*0.05}s`;
        card.innerHTML=`<div class="flex justify-between items-start mb-3"><span class="px-3 py-1 rounded-full text-xs font-bold ${statusClass}" style="font-size:10px;letter-spacing:1px">${statusText}</span><span class="px-2 py-1 rounded text-xs" style="background:rgba(156,163,175,0.1);color:#9ca3af;font-size:9px">${race.category.toUpperCase()}</span></div><h3 style="font-weight:700;font-size:16px;margin:0 0 6px;line-height:1.3">${race.name}</h3><div class="flex items-center gap-2 mb-3"><span style="color:#9ca3af;font-size:14px">${race.city}, ${race.country}</span></div><div class="flex items-center gap-4 mb-3 text-xs" style="color:#6b7280"><span><i data-lucide="calendar" style="width:12px;height:12px;display:inline;vertical-align:middle"></i> ${race.date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</span><span><i data-lucide="users" style="width:12px;height:12px;display:inline;vertical-align:middle"></i> ${race.entrants}/${race.maxEntrants}</span></div><div class="p-3 rounded-lg mb-3" style="background:rgba(0,0,0,0.25)"><div class="flex justify-between items-center mb-1"><span style="font-size:11px;color:#9ca3af">PRIZE POOL</span><span style="font-size:11px;color:#9ca3af">ENTRY FEE</span></div><div class="flex justify-between items-center"><span class="price-tag" style="color:var(--gold);font-size:15px">${formatKES(race.prize)}</span><span class="price-tag" style="color:var(--accent2);font-size:14px">${formatKES(race.fee)}</span></div><div class="flex justify-between mt-1"><span style="font-size:10px;color:#6b7280">${convertCurrency(race.prize)}</span><span style="font-size:10px;color:#6b7280">${convertCurrency(race.fee)}</span></div></div><div class="flex items-center gap-2 mb-4" style="font-size:12px;color:var(--gold)"><span>${race.award}</span></div><div class="flex gap-2"><button class="btn-primary flex-1" style="font-size:11px;padding:10px" onclick="openRegister(${race.id})">REGISTER</button><button class="btn-secondary" style="font-size:11px;padding:10px 16px" onclick="openRegister(${race.id})"><i data-lucide="info" style="width:14px;height:14px"></i></button></div>`;
        grid.appendChild(card);
      });
      document.getElementById('loadMoreRaces').style.display=displayedRaces>=filtered.length?'none':'inline-block';
      lucide.createIcons();
    }

    document.querySelectorAll('.tab-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter=btn.dataset.filter;
        displayedRaces=12;
        renderRaces();
      });
    });

    document.getElementById('raceSearch').addEventListener('input',e=>{
      searchQuery=e.target.value.toLowerCase();
      displayedRaces=12;
      renderRaces();
    });

    document.getElementById('loadMoreRaces').addEventListener('click',()=>{
      displayedRaces+=12;
      renderRaces();
    });

    function renderWinners(){
      const grid=document.getElementById('winnersGrid');
      grid.innerHTML='';
      if(winners.length===0){
        grid.innerHTML='<div class="col-span-full text-center py-12" style="color:#6b7280"><i data-lucide="trophy" style="width:40px;height:40px;margin:0 auto 12px;display:block"></i><p style="font-size:14px">No winners yet. Be the first!</p></div>';
        lucide.createIcons();
        return;
      }
      winners.forEach((w,i)=>{
        const card=document.createElement('div');
        card.className='winner-card fade-up';
        card.style.animationDelay=`${i*0.06}s`;
        const medalColors=['#f59e0b','#9ca3af','#cd7f32'];
        card.innerHTML=`<div class="flex items-center gap-3 mb-3"><div class="w-12 h-12 rounded-full flex items-center justify-center" style="background:linear-gradient(135deg,${medalColors[0]}22,${medalColors[0]}44);border:2px solid ${medalColors[0]}55"><span style="font-size:20px">🏁</span></div><div><h4 style="font-weight:700;font-size:13px;margin:0;line-height:1.3">${w.name}</h4><p style="font-size:12px;color:#9ca3af;margin:0">${w.country} · ${w.year}</p></div></div><p style="font-size:13px;color:#9ca3af;margin:0 0 8px">${w.race}</p><div class="p-2.5 rounded-lg" style="background:rgba(245,158,11,0.04);border:1px solid rgba(245,158,11,0.1)"><div style="font-size:12px;color:var(--gold);margin-bottom:4px">${w.award}</div><div class="price-tag" style="color:var(--gold);font-size:15px">${formatKES(w.prize)}</div><div style="font-size:10px;color:#6b7280;margin-top:2px">${convertCurrency(w.prize)}</div></div>`;
        grid.appendChild(card);
      });
      lucide.createIcons();
    }

    function renderMerch(){
      const grid=document.getElementById('merchGrid');
      grid.innerHTML='';
      merchItems.forEach((item,i)=>{
        const card=document.createElement('div');
        card.className='merch-card fade-up';
        card.style.animationDelay=`${i*0.05}s`;
        card.innerHTML=`<div class="flex items-center justify-center" style="height:140px;background:linear-gradient(135deg,rgba(225,29,72,0.03),rgba(245,158,11,0.03));font-size:64px;overflow:hidden"><img src="${item.img}" alt="${item.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=font-size:64px>📦</span>'"></div><div class="p-4"><h4 style="font-weight:700;font-size:13px;margin:0 0 4px">${item.name}</h4><p style="font-size:12px;color:#9ca3af;margin:0 0 10px;line-height:1.4">${item.desc}</p><div class="mb-3"><span class="price-tag" style="color:var(--accent2);font-size:18px">${formatKES(item.price)}</span><div style="font-size:10px;color:#6b7280;margin-top:2px">${convertCurrency(item.price)}</div></div><button class="btn-primary w-full" style="font-size:11px;padding:10px" onclick="openMerchModal(${item.id})">BUY NOW</button></div>`;
        grid.appendChild(card);
      });
      lucide.createIcons();
    }

    let selectedRace=null;
    function openRegister(id){
      selectedRace=races.find(r=>r.id===id);
      if(!selectedRace)return;
      document.getElementById('modalTitle').textContent=selectedRace.name;
      document.getElementById('modalSubtitle').textContent=`${selectedRace.city}, ${selectedRace.country} · ${selectedRace.category}`;
      document.getElementById('modalDetails').innerHTML=`<div class="grid grid-cols-2 gap-3"><div class="p-3 rounded-lg" style="background:rgba(0,0,0,0.2)"><div style="font-size:10px;color:#6b7280;margin-bottom:2px">DATE</div><div style="font-size:13px;font-weight:600">${selectedRace.date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</div></div><div class="p-3 rounded-lg" style="background:rgba(0,0,0,0.2)"><div style="font-size:10px;color:#6b7280;margin-bottom:2px">DISTANCE</div><div style="font-size:13px;font-weight:600">${selectedRace.distance} · ${selectedRace.laps} laps</div></div><div class="p-3 rounded-lg" style="background:rgba(0,0,0,0.2)"><div style="font-size:10px;color:#6b7280;margin-bottom:2px">PRIZE</div><div style="font-size:13px;font-weight:600;color:var(--gold)">${formatKES(selectedRace.prize)}</div></div><div class="p-3 rounded-lg" style="background:rgba(0,0,0,0.2)"><div style="font-size:10px;color:#6b7280;margin-bottom:2px">AWARD</div><div style="font-size:13px;font-weight:600;color:var(--gold)">${selectedRace.award}</div></div></div>`;
      document.getElementById('modalFee').textContent=formatKES(selectedRace.fee);
      document.getElementById('modalFeeConverted').textContent=convertCurrency(selectedRace.fee);
      document.getElementById('registerModal').classList.add('show');
      document.getElementById('registerBtn').textContent='REGISTER & PAY';
      document.getElementById('registerBtn').disabled=false;
      lucide.createIcons();
    }
    function closeModal(){document.getElementById('registerModal').classList.remove('show')}

    function handleRegister(e){
      e.preventDefault();
      const btn=document.getElementById('registerBtn');
      btn.textContent='PROCESSING...';
      btn.disabled=true;
      setTimeout(()=>{
        closeModal();
        showToast('Registration Successful!',`You're registered for ${selectedRace.name}`);
        document.getElementById('registerForm').reset();
      },1500);
    }

    function openMerchModal(id){
      const item=merchItems.find(m=>m.id===id);
      if(!item)return;
      const content=document.getElementById('merchModalContent');
      content.innerHTML=`<div style="width:100%;height:200px;background:linear-gradient(135deg,rgba(225,29,72,0.03),rgba(245,158,11,0.03));border-radius:12px;overflow:hidden;margin-bottom:16px"><img src="${item.img}" alt="${item.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.parentElement.style.fontSize='80px';this.parentElement.innerHTML='📦'"></div><h3 style="font-weight:700;font-size:20px;margin:0 0 4px">${item.name}</h3><p style="color:#9ca3af;font-size:14px;margin:0 0 16px">${item.desc}</p><div class="p-3 rounded-lg mb-4" style="background:rgba(0,0,0,0.2)"><span class="price-tag" style="color:var(--accent2);font-size:22px">${formatKES(item.price)}</span><div style="font-size:11px;color:#6b7280;margin-top:2px">${convertCurrency(item.price)}</div></div>${item.sizes.length?`<div class="mb-4"><label class="block mb-2 text-sm font-semibold" style="color:#9ca3af">Size</label><div class="flex gap-2 flex-wrap">${item.sizes.map(s=>`<button class="size-btn px-4 py-2 rounded-lg text-sm font-semibold" style="background:rgba(255,255,255,0.05);border:1px solid rgba(156,163,175,0.2);color:var(--text);cursor:pointer" onclick="this.parentElement.querySelectorAll('.size-btn').forEach(b=>{b.style.borderColor='rgba(156,163,175,0.2)';b.style.background='rgba(255,255,255,0.05)'});this.style.borderColor='var(--accent2)';this.style.background='rgba(245,158,11,0.1)'">${s}</button>`).join('')}</div></div>`:''}<div class="mb-4"><label class="block mb-2 text-sm font-semibold" style="color:#9ca3af">Quantity</label><div class="flex items-center gap-3"><button class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:rgba(255,255,255,0.05);border:1px solid rgba(156,163,175,0.2);color:var(--text);cursor:pointer;font-size:18px" onclick="const q=document.getElementById('merchQty');if(parseInt(q.value)>1)q.value=parseInt(q.value)-1">−</button><input type="number" id="merchQty" value="1" min="1" max="10" class="w-16 text-center py-2 rounded-lg" style="background:rgba(0,0,0,0.3);border:1px solid rgba(156,163,175,0.15);color:var(--text);font-size:14px;outline:none"><button class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:rgba(255,255,255,0.05);border:1px solid rgba(156,163,175,0.2);color:var(--text);cursor:pointer;font-size:18px" onclick="const q=document.getElementById('merchQty');if(parseInt(q.value)<10)q.value=parseInt(q.value)+1">+</button></div></div><button class="btn-primary w-full" style="padding:14px;font-size:13px" id="addToCartBtn" onclick="addToCart(${item.id})">ADD TO CART</button>`;
      document.getElementById('merchModal').classList.add('show');
      lucide.createIcons();
    }
    function closeMerchModal(){document.getElementById('merchModal').classList.remove('show')}

    let shoppingCart=[];

    function addToCart(itemId){
      const item=merchItems.find(m=>m.id===itemId);
      const qty=parseInt(document.getElementById('merchQty').value)||1;
      if(!item)return;
      const cartItem={id:itemId,name:item.name,price:item.price,quantity:qty,total:item.price*qty};
      const existing=shoppingCart.find(ci=>ci.id===itemId);
      if(existing){
        existing.quantity+=qty;
        existing.total=existing.price*existing.quantity;
      }else{
        shoppingCart.push(cartItem);
      }
      closeMerchModal();
      showToast('Added to Cart!',`${item.name} has been added to your cart`);
    }

    function removeFromCart(itemId){
      shoppingCart=shoppingCart.filter(ci=>ci.id!==itemId);
      updateCart();
    }

    function updateCartQuantity(itemId,newQty){
      const item=shoppingCart.find(ci=>ci.id===itemId);
      if(item){
        item.quantity=Math.max(1,newQty);
        item.total=item.price*item.quantity;
      }
      updateCart();
    }

    function updateCart(){
      const list=document.getElementById('cartItemsList');
      if(shoppingCart.length===0){
        list.innerHTML='<div style="text-align:center;color:#6b7280;padding:20px"><i data-lucide="shopping-cart" style="width:40px;height:40px;margin:0 auto 12px;display:block"></i><p style="font-size:14px">Your cart is empty</p></div>';
        document.getElementById('cartSubtotal').textContent='KES 0';
        document.getElementById('cartTotal').textContent='KES 0';
        lucide.createIcons();
        return;
      }
      let total=0;
      list.innerHTML=shoppingCart.map(item=>{
        total+=item.total;
        return `<div class="p-3 rounded-lg mb-3" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)"><div class="flex justify-between items-start mb-2"><div><h4 style="font-weight:600;font-size:13px;margin:0">${item.name}</h4><p style="font-size:11px;color:#6b7280;margin:0">Price: ${formatKES(item.price)}</p></div><button onclick="removeFromCart(${item.id})" style="background:none;border:none;cursor:pointer;color:#9ca3af;padding:4px"><i data-lucide="trash-2" style="width:16px;height:16px"></i></button></div><div class="flex items-center justify-between"><div class="flex items-center gap-2"><button class="w-6 h-6 rounded flex items-center justify-center" style="background:rgba(255,255,255,0.05);border:none;cursor:pointer;color:var(--text);font-size:12px" onclick="updateCartQuantity(${item.id},${item.quantity-1})">−</button><span style="width:20px;text-align:center;font-size:12px;font-weight:600">${item.quantity}</span><button class="w-6 h-6 rounded flex items-center justify-center" style="background:rgba(255,255,255,0.05);border:none;cursor:pointer;color:var(--text);font-size:12px" onclick="updateCartQuantity(${item.id},${item.quantity+1})">+</button></div><span class="price-tag" style="color:var(--accent2);font-size:13px">${formatKES(item.total)}</span></div></div>`;
      }).join('');
      document.getElementById('cartSubtotal').textContent=formatKES(total);
      document.getElementById('cartTotal').textContent=formatKES(total);
      lucide.createIcons();
    }

    function closeCartModal(){
      document.getElementById('cartModal').classList.remove('show');
    }

    function openCart(){
      updateCart();
      document.getElementById('cartModal').classList.add('show');
    }

    function proceedToPayment(){
      if(shoppingCart.length===0){
        showToast('Empty Cart','Please add items before checkout');
        return;
      }
      closeCartModal();
      document.getElementById('mpesaModal').classList.add('show');
      const total=shoppingCart.reduce((sum,item)=>sum+item.total,0);
      document.getElementById('mpesaAmount').textContent=formatKES(total);
      document.getElementById('mpesaAmountConverted').textContent=convertCurrency(total);
      document.getElementById('mpesaPhone').value='';
      lucide.createIcons();
    }

    function closeMpesaModal(){
      document.getElementById('mpesaModal').classList.remove('show');
    }

    function handleMpesaPayment(){
      const phone=document.getElementById('mpesaPhone').value.trim();
      const btn=document.getElementById('mpesaPayBtn');
      if(!phone){
        showToast('Missing Phone','Please enter your M-Pesa phone number');
        return;
      }
      btn.textContent='SENDING PROMPT...';
      btn.disabled=true;
      setTimeout(()=>{
        closeMpesaModal();
        btn.textContent='SEND M-PESA PROMPT';
        btn.disabled=false;
        showToast('Payment Successful!','Your M-Pesa payment has been processed');
        shoppingCart=[];
        updateCart();
      },2500);
    }

    function showToast(title,msg){
      document.getElementById('toastTitle').textContent=title;
      document.getElementById('toastMsg').textContent=msg;
      const toast=document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(()=>toast.classList.remove('show'),3500);
    }

    function openProfileModal(){
      if(!currentRacer){
        showToast('Login Required','Please sign in to view your profile.');
        setTimeout(()=>{ window.location.href = 'index.html'; }, 800);
        return;
      }
      document.getElementById('profileModal').classList.add('show');
      lucide.createIcons();
    }
    function closeProfileModal(){document.getElementById('profileModal').classList.remove('show')}

    function editProfile(){
      showToast('Profile Edit','Edit feature coming soon!');
    }

    let countdownSeconds=2*3600+14*60+33;
    function updateCountdown(){
      if(countdownSeconds<=0)countdownSeconds=7200;
      countdownSeconds--;
      const h=Math.floor(countdownSeconds/3600);
      const m=Math.floor((countdownSeconds%3600)/60);
      const s=countdownSeconds%60;
      const el=document.getElementById('nextRaceCountdown');
      if(el)el.textContent=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }
    setInterval(updateCountdown,1000);

    const defaultConfig={page_title:'GLOBAL RACERS HUB',welcome_text:'WELCOME BACK, RACER',background_color:'#0a0a0a',surface_color:'#141414',text_color:'#ffffff',accent_color:'#e11d48',accent2_color:'#f59e0b',font_family:'Inter',font_size:16};

    let currentRacer=null;

    function loadRacerProfile(){
      const saved=localStorage.getItem('racerProfile');
      if(saved){
        currentRacer=JSON.parse(saved);
        updateRacerDisplay();
        return true;
      }
      return false;
    }

    function saveRacerProfile(name,email,phone,team){
      currentRacer={
        name:name,
        email:email,
        phone:phone,
        team:team||'Independent',
        racesEntered:12,
        wins:3,
        earnings:5450000
      };
      localStorage.setItem('racerProfile',JSON.stringify(currentRacer));
      updateRacerDisplay();
    }

    function updateRacerDisplay(){
      if(currentRacer){
        document.getElementById('welcomeText').textContent=`WELCOME BACK, ${currentRacer.name.toUpperCase()}`;
        document.getElementById('heroName').textContent=`${currentRacer.name.toUpperCase()}, `;
        document.getElementById('profileName').textContent=currentRacer.name;
        document.getElementById('profileTeam').textContent=currentRacer.team;
        document.getElementById('profileEmail').textContent=currentRacer.email;
        document.getElementById('profilePhone').textContent=currentRacer.phone;
        document.getElementById('profileRaces').textContent=currentRacer.racesEntered;
        document.getElementById('profileWins').textContent=currentRacer.wins;
        document.getElementById('profileEarnings').textContent=formatKES(currentRacer.earnings);
      }
    }

    function clearRacerProfile(){
      currentRacer=null;
      localStorage.removeItem('racerProfile');
      showToast('Logged Out','See you next time, racer!');
      setTimeout(()=>{ window.location.href = 'index.html'; }, 500);
    }

    // Side Menu Functions
    function toggleMenu(){
      const menu=document.getElementById('sideMenu');
      if(!menu)createSideMenu();
      document.getElementById('sideMenu').classList.toggle('show');
      lucide.createIcons();
    }

    function closeSideMenu(){
      const menu=document.getElementById('sideMenu');
      if(menu)menu.classList.remove('show');
    }

    function createSideMenu(){
      if(document.getElementById('sideMenu'))return;
      const overlay=document.createElement('div');
      overlay.className='modal-overlay';
      overlay.id='sideMenu';
      overlay.style.alignItems='flex-start';
      overlay.style.justifyContent='flex-end';
      overlay.style.backdropFilter='none';
      overlay.innerHTML=`<div style="width:100%;max-width:280px;height:100%;background:linear-gradient(135deg,#141414,#1f1f1f);border-left:1px solid rgba(225,29,72,0.15);overflow-y:auto;display:flex;flex-direction:column;animation:slideInRight 0.3s ease">
        <div style="padding:20px;border-bottom:1px solid rgba(156,163,175,0.1)">
          <button onclick="closeSideMenu()" style="background:none;border:none;cursor:pointer;float:right;color:#9ca3af"><i data-lucide="x" style="width:24px;height:24px"></i></button>
          <h3 style="font-weight:700;font-size:14px;margin:0;letter-spacing:1px">MENU</h3>
        </div>
        <div style="flex:1;padding:16px 0">
          <div style="display:flex;flex-direction:column;gap:0">
            <button onclick="viewProfile()" style="background:none;border:none;padding:14px 16px;text-align:left;color:var(--text);cursor:pointer;font-size:13px;font-weight:600;letter-spacing:0.5px;transition:all 0.3s;border-left:3px solid transparent" onmouseover="this.style.background='rgba(225,29,72,0.1)';this.style.borderLeftColor='var(--accent)'" onmouseout="this.style.background='transparent';this.style.borderLeftColor='transparent'">
              <i data-lucide="user" style="width:16px;height:16px;display:inline;margin-right:10px;vertical-align:middle"></i> My Profile
            </button>
            <button onclick="viewRaceHistory()" style="background:none;border:none;padding:14px 16px;text-align:left;color:var(--text);cursor:pointer;font-size:13px;font-weight:600;letter-spacing:0.5px;transition:all 0.3s;border-left:3px solid transparent" onmouseover="this.style.background='rgba(225,29,72,0.1)';this.style.borderLeftColor='var(--accent)'" onmouseout="this.style.background='transparent';this.style.borderLeftColor='transparent'">
              <i data-lucide="flag" style="width:16px;height:16px;display:inline;margin-right:10px;vertical-align:middle"></i> Race History
            </button>
            <button onclick="viewLeaderboard()" style="background:none;border:none;padding:14px 16px;text-align:left;color:var(--text);cursor:pointer;font-size:13px;font-weight:600;letter-spacing:0.5px;transition:all 0.3s;border-left:3px solid transparent" onmouseover="this.style.background='rgba(225,29,72,0.1)';this.style.borderLeftColor='var(--accent)'" onmouseout="this.style.background='transparent';this.style.borderLeftColor='transparent'">
              <i data-lucide="trophy" style="width:16px;height:16px;display:inline;margin-right:10px;vertical-align:middle"></i> Leaderboard
            </button>
            <button onclick="viewAchievements()" style="background:none;border:none;padding:14px 16px;text-align:left;color:var(--text);cursor:pointer;font-size:13px;font-weight:600;letter-spacing:0.5px;transition:all 0.3s;border-left:3px solid transparent" onmouseover="this.style.background='rgba(225,29,72,0.1)';this.style.borderLeftColor='var(--accent)'" onmouseout="this.style.background='transparent';this.style.borderLeftColor='transparent'">
              <i data-lucide="award" style="width:16px;height:16px;display:inline;margin-right:10px;vertical-align:middle"></i> Achievements
            </button>
            <button onclick="viewSettings()" style="background:none;border:none;padding:14px 16px;text-align:left;color:var(--text);cursor:pointer;font-size:13px;font-weight:600;letter-spacing:0.5px;transition:all 0.3s;border-left:3px solid transparent" onmouseover="this.style.background='rgba(225,29,72,0.1)';this.style.borderLeftColor='var(--accent)'" onmouseout="this.style.background='transparent';this.style.borderLeftColor='transparent'">
              <i data-lucide="settings" style="width:16px;height:16px;display:inline;margin-right:10px;vertical-align:middle"></i> Settings
            </button>
            <button onclick="viewSupport()" style="background:none;border:none;padding:14px 16px;text-align:left;color:var(--text);cursor:pointer;font-size:13px;font-weight:600;letter-spacing:0.5px;transition:all 0.3s;border-left:3px solid transparent" onmouseover="this.style.background='rgba(225,29,72,0.1)';this.style.borderLeftColor='var(--accent)'" onmouseout="this.style.background='transparent';this.style.borderLeftColor='transparent'">
              <i data-lucide="help-circle" style="width:16px;height:16px;display:inline;margin-right:10px;vertical-align:middle"></i> Help & Support
            </button>
          </div>
        </div>
        <div style="padding:16px;border-top:1px solid rgba(156,163,175,0.1)">
          <button onclick="logoutFromMenu()" class="btn-secondary w-full" style="font-size:12px;padding:12px">
            <i data-lucide="log-out" style="width:14px;height:14px;display:inline;margin-right:8px;vertical-align:middle"></i> LOGOUT
          </button>
        </div>
      </div>`;
      document.body.appendChild(overlay);
      overlay.addEventListener('click',e=>{if(e.target===e.currentTarget)closeSideMenu()});
    }

    function openMenuContent(title,content){
      closeSideMenu();
      const area=document.getElementById('menuContentArea');
      area.innerHTML=`<h3 style="font-weight:700;font-size:20px;margin:0 0 16px">${title}</h3>${content}`;
      document.getElementById('menuContentModal').classList.add('show');
      lucide.createIcons();
    }

    function closeMenuContent(){
      document.getElementById('menuContentModal').classList.remove('show');
    }

    function viewProfile(){
      if(!currentRacer)return;
      const winRate=Math.round((currentRacer.wins/currentRacer.racesEntered)*100);
      const content=`
        <div class="text-center mb-6">
          <div class="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style="background:linear-gradient(135deg,var(--accent),#be123c)"><i data-lucide="user" style="width:40px;height:40px;color:#fff"></i></div>
          <h2 style="font-weight:700;font-size:20px;margin:0 0 4px">${currentRacer.name}</h2>
          <p style="color:#9ca3af;font-size:13px;margin:0">${currentRacer.team}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
          <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <div style="font-size:10px;color:#6b7280;margin-bottom:6px;letter-spacing:1px">EMAIL ADDRESS</div>
            <div style="font-size:13px;font-family:monospace;color:var(--text)">${currentRacer.email}</div>
          </div>
          <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <div style="font-size:10px;color:#6b7280;margin-bottom:6px;letter-spacing:1px">PHONE NUMBER</div>
            <div style="font-size:13px;font-family:monospace;color:var(--text)">${currentRacer.phone}</div>
          </div>
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:12px">
            <div class="p-4 rounded-lg" style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.15)">
              <div style="font-size:10px;color:#6b7280;margin-bottom:2px;letter-spacing:1px">RACES ENTERED</div>
              <div style="font-size:22px;font-weight:700;color:#22c55e;margin-bottom:4px">${currentRacer.racesEntered}</div>
              <div style="font-size:10px;color:#9ca3af">Total participations</div>
            </div>
            <div class="p-4 rounded-lg" style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.15)">
              <div style="font-size:10px;color:#6b7280;margin-bottom:2px;letter-spacing:1px">WINS</div>
              <div style="font-size:22px;font-weight:700;color:var(--gold);margin-bottom:4px">${currentRacer.wins}</div>
              <div style="font-size:10px;color:#9ca3af">${winRate}% win rate</div>
            </div>
          </div>
          <div class="p-4 rounded-lg" style="background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(245,158,11,0.05));border:1px solid rgba(245,158,11,0.2)">
            <div style="font-size:10px;color:#6b7280;margin-bottom:4px;letter-spacing:1px">TOTAL WINNINGS</div>
            <div style="font-size:20px;font-weight:700;color:var(--accent2);margin-bottom:2px">${formatKES(currentRacer.earnings)}</div>
            <div style="font-size:10px;color:#6b7280">${convertCurrency(currentRacer.earnings)}</div>
          </div>
          <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <div style="font-size:10px;color:#6b7280;margin-bottom:6px;letter-spacing:1px">ACCOUNT STATUS</div>
            <div style="display:flex;align-items:center;gap:8px">
              <div style="width:8px;height:8px;background:#22c55e;border-radius:50%;animation:pulse 1.5s infinite"></div>
              <span style="font-size:13px;color:#22c55e;font-weight:600">ACTIVE & VERIFIED</span>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn-secondary flex-1" style="padding:12px;font-size:12px" onclick="editProfile()">EDIT PROFILE</button>
          <button class="btn-primary flex-1" style="padding:12px;font-size:12px" onclick="closeMenuContent()">CLOSE</button>
        </div>
      `;
      openMenuContent('My Profile',content);
    }

    function viewRaceHistory(){
      if(!currentRacer)return;
      const raceHistory=[
        {name:'Monaco Grand Prix',date:'2025-03-15',status:'Won',prize:2500000,track:'Monte Carlo Circuit',laps:'78/78',time:'2:14:33',avg:'189 km/h',competitors:45},
        {name:'Tokyo Drift Masters',date:'2025-03-08',status:'2nd Place',prize:1250000,track:'Odaiba Circuit',laps:'65/65',time:'1:58:12',avg:'176 km/h',competitors:52},
        {name:'Berlin Rally Championship',date:'2025-02-28',status:'5th Place',prize:450000,track:'Berlin Street',laps:'42/45',time:'1:45:08',avg:'165 km/h',competitors:38},
        {name:'Austin Street Race',date:'2025-02-20',status:'DNF',prize:0,track:'Austin Street',laps:'23/60',time:'45:12',avg:'152 km/h',competitors:41},
        {name:'Dubai 24hr Endurance',date:'2025-02-08',status:'3rd Place',prize:850000,track:'Jebel Ali Circuit',laps:'156/156',time:'24:00:00',avg:'168 km/h',competitors:28},
        {name:'Singapore Night Race',date:'2025-01-25',status:'Won',prize:1800000,track:'Marina Bay',laps:'61/61',time:'2:08:45',avg:'181 km/h',competitors:44},
      ];
      const content=`
        <div style="display:flex;flex-direction:column;gap:12px">
          ${raceHistory.map((r,i)=>{
            const statusColors={Won:'rgba(34,197,94,0.15)',['2nd Place']:'rgba(192,192,192,0.15)',['3rd Place']:'rgba(205,127,50,0.15)',['5th Place']:'rgba(245,158,11,0.15)',DNF:'rgba(239,68,68,0.15)'};
            const statusTextColors={Won:'#22c55e',['2nd Place']:'#c0c0c0',['3rd Place']:'#cd7f32',['5th Place']:'#f59e0b',DNF:'#ef4444'};
            return `
            <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
              <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:10px">
                <div>
                  <h4 style="font-weight:700;font-size:14px;margin:0">${r.name}</h4>
                  <p style="font-size:11px;color:#9ca3af;margin:4px 0 0">📍 ${r.track}</p>
                </div>
                <span style="font-size:11px;padding:6px 12px;border-radius:6px;background:${statusColors[r.status]};color:${statusTextColors[r.status]};font-weight:700">${r.status}</span>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;font-size:11px;color:#6b7280">
                <span>📅 ${r.date}</span>
                <span>⏱️ ${r.time}</span>
              </div>
              <div class="grid" style="grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:8px">
                <div style="padding:8px;background:rgba(225,29,72,0.08);border:1px solid rgba(225,29,72,0.1);border-radius:6px;text-align:center">
                  <div style="font-size:10px;color:#6b7280">LAPS</div>
                  <div style="font-size:13px;font-weight:700;color:var(--accent)">${r.laps}</div>
                </div>
                <div style="padding:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.1);border-radius:6px;text-align:center">
                  <div style="font-size:10px;color:#6b7280">AVG SPEED</div>
                  <div style="font-size:13px;font-weight:700;color:var(--gold)">${r.avg}</div>
                </div>
                <div style="padding:8px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.1);border-radius:6px;text-align:center">
                  <div style="font-size:10px;color:#6b7280">COMPETITORS</div>
                  <div style="font-size:13px;font-weight:700;color:#22c55e">${r.competitors}</div>
                </div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px;background:rgba(0,0,0,0.2);border-radius:4px">
                <span style="font-size:11px;color:#9ca3af">Prize Earned:</span>
                <span style="font-size:13px;font-weight:700;color:var(--accent2)">${formatKES(r.prize)}</span>
              </div>
            </div>
            `;
          }).join('')}
        </div>
        <button class="btn-primary w-full" style="padding:12px;font-size:12px;margin-top:16px" onclick="closeMenuContent()">CLOSE</button>
      `;
      openMenuContent('Race History',content);
    }

    function viewLeaderboard(){
      const leaderboard=[
        {rank:1,name:'Alex Kimani',country:'Kenya',wins:24,races:87,earnings:18750000,avgSpeed:'195 km/h',winRate:28},
        {rank:2,name:'Sarah Johnson',country:'UK',wins:21,races:79,earnings:16425000,avgSpeed:'192 km/h',winRate:27},
        {rank:3,name:'James Mwangi',country:'Kenya',wins:currentRacer?.wins||3,races:currentRacer?.racesEntered||12,earnings:currentRacer?.earnings||5450000,avgSpeed:'188 km/h',winRate:Math.round(((currentRacer?.wins||3)/(currentRacer?.racesEntered||12))*100)},
        {rank:4,name:'Carlos Martinez',country:'Spain',wins:18,races:65,earnings:12880000,avgSpeed:'190 km/h',winRate:28},
        {rank:5,name:'Yuki Tanaka',country:'Japan',wins:16,races:58,earnings:11320000,avgSpeed:'189 km/h',winRate:28},
        {rank:6,name:'Sofia Petrovic',country:'Serbia',wins:14,races:52,earnings:9450000,avgSpeed:'187 km/h',winRate:27},
        {rank:7,name:'Lucas Oliveira',country:'Brazil',wins:12,races:48,earnings:7800000,avgSpeed:'185 km/h',winRate:25},
        {rank:8,name:'Emma Chen',country:'Singapore',wins:10,races:44,earnings:6500000,avgSpeed:'183 km/h',winRate:23},
      ];
      const medalIcons={1:'🥇',2:'🥈',3:'🥉'};
      const content=`
        <div style="display:flex;flex-direction:column;gap:10px">
          ${leaderboard.map((r,i)=>`
            <div class="p-4 rounded-lg" style="background:${r.rank<=3?'rgba('+{1:'245,158,11',2:'192,192,192',3:'205,127,50'}[r.rank]+',0.08)':'rgba(255,255,255,0.03)'};border:1px solid ${r.rank<=3?'rgba('+{1:'245,158,11',2:'192,192,192',3:'205,127,50'}[r.rank]+',0.2)':'rgba(156,163,175,0.1)'}">
              <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px">
                <div style="display:flex;align-items:center;gap:12px;flex:1">
                  <span style="font-size:20px;width:32px;text-align:center">${medalIcons[r.rank]||'#'+r.rank}</span>
                  <div>
                    <h4 style="font-weight:700;font-size:14px;margin:0">${r.name}</h4>
                    <p style="font-size:11px;color:#9ca3af;margin:2px 0 0">📍 ${r.country}</p>
                  </div>
                </div>
                <div style="text-align:right">
                  <div style="font-size:11px;color:#9ca3af;margin-bottom:2px">WINS</div>
                  <div style="font-size:16px;font-weight:700;color:var(--gold)">${r.wins}</div>
                </div>
              </div>
              <div class="grid" style="grid-template-columns:repeat(3,1fr);gap:8px">
                <div style="padding:8px;background:rgba(225,29,72,0.08);border:1px solid rgba(225,29,72,0.1);border-radius:6px;text-align:center">
                  <div style="font-size:9px;color:#6b7280">RACES</div>
                  <div style="font-size:12px;font-weight:700;color:var(--accent)">${r.races}</div>
                </div>
                <div style="padding:8px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.1);border-radius:6px;text-align:center">
                  <div style="font-size:9px;color:#6b7280">WIN RATE</div>
                  <div style="font-size:12px;font-weight:700;color:#22c55e">${r.winRate}%</div>
                </div>
                <div style="padding:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.1);border-radius:6px;text-align:center">
                  <div style="font-size:9px;color:#6b7280">AVG SPEED</div>
                  <div style="font-size:12px;font-weight:700;color:var(--gold)">${r.avgSpeed.split(' ')[0]}</div>
                </div>
              </div>
              <div style="margin-top:8px;padding:8px;background:rgba(0,0,0,0.2);border-radius:4px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;color:#9ca3af">Total Earnings</span>
                  <span style="font-size:12px;font-weight:700;color:var(--accent2)">${formatKES(r.earnings)}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn-primary w-full" style="padding:12px;font-size:12px;margin-top:16px" onclick="closeMenuContent()">CLOSE</button>
      `;
      openMenuContent('Leaderboard',content);
    }

    function viewAchievements(){
      const achievements=[
        {icon:'🏆',name:'First Victory',desc:'Won your first race',unlocked:true,date:'2025-02-10'},
        {icon:'🔥',name:'Hot Streak',desc:'Win 5 races in a row',unlocked:true,date:'2025-03-01'},
        {icon:'💰',name:'Big Spender',desc:'Earn 5M+ in prizes',unlocked:true,date:'2025-02-25'},
        {icon:'⚡',name:'Speed Demon',desc:'Complete 50 races',unlocked:false,progress:24,total:50},
        {icon:'🌍',name:'World Tour',desc:'Race in 10+ countries',unlocked:false,progress:6,total:10},
        {icon:'👑',name:'Champion',desc:'Win 10 races total',unlocked:false,progress:3,total:10},
        {icon:'💎',name:'Legendary Racer',desc:'Earn 10M+ in winnings',unlocked:false,progress:5.45,total:10},
        {icon:'🎯',name:'Precision Driver',desc:'Achieve 95%+ accuracy',unlocked:false,progress:87,total:95},
      ];
      const content=`
        <div style="display:flex;flex-direction:column;gap:12px">
          ${achievements.map(a=>`
            <div class="p-4 rounded-lg" style="background:${a.unlocked?'rgba(34,197,94,0.08)':'rgba(255,255,255,0.03)'};border:1px solid ${a.unlocked?'rgba(34,197,94,0.15)':'rgba(156,163,175,0.1)'}">
              <div style="display:flex;align-items:flex-start;gap:12px">
                <span style="font-size:28px;opacity:${a.unlocked?1:0.4}">${a.icon}</span>
                <div style="flex:1">
                  <h4 style="font-weight:700;font-size:13px;margin:0 0 2px">${a.name}</h4>
                  <p style="font-size:11px;color:#9ca3af;margin:0 0 6px">${a.desc}</p>
                  ${a.unlocked?`
                    <div style="display:flex;align-items:center;gap:6px;font-size:10px;color:#22c55e">✓ Unlocked · ${a.date}</div>
                  `:`
                    <div>
                      <div style="display:flex;justify-content:space-between;font-size:9px;color:#9ca3af;margin-bottom:4px">
                        <span>Progress</span>
                        <span>${Math.round(a.progress)}/${a.total}</span>
                      </div>
                      <div style="width:100%;height:6px;background:rgba(0,0,0,0.3);border-radius:3px;overflow:hidden">
                        <div style="width:${(a.progress/a.total)*100}%;height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width 0.3s"></div>
                      </div>
                    </div>
                  `}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn-primary w-full" style="padding:12px;font-size:12px;margin-top:16px" onclick="closeMenuContent()">CLOSE</button>
      `;
      openMenuContent('Achievements',content);
    }

    function viewSettings(){
      let emailNotif=localStorage.getItem('emailNotif')!=='false';
      let smsNotif=localStorage.getItem('smsNotif')!=='false';
      let darkMode=localStorage.getItem('darkMode')!=='false';
      let language=localStorage.getItem('language')||'English';
      
      const content=`
        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="padding:4px;border-bottom:1px solid rgba(156,163,175,0.1);margin-bottom:8px">
            <h3 style="font-weight:700;font-size:11px;color:#9ca3af;margin:0;letter-spacing:1px">NOTIFICATIONS</h3>
          </div>
          <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <div>
                <label style="font-size:13px;font-weight:600">Email Notifications</label>
                <p style="font-size:10px;color:#6b7280;margin:4px 0 0">Race updates, winners & prizes</p>
              </div>
              <input type="checkbox" ${emailNotif?'checked':''} onchange="localStorage.setItem('emailNotif',this.checked);showToast('Settings','Email notifications '+( this.checked?'enabled':'disabled'))" style="width:18px;height:18px;cursor:pointer">
            </div>
          </div>
          <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <div>
                <label style="font-size:13px;font-weight:600">SMS Alerts</label>
                <p style="font-size:10px;color:#6b7280;margin:4px 0 0">Important race reminders & alerts</p>
              </div>
              <input type="checkbox" ${smsNotif?'checked':''} onchange="localStorage.setItem('smsNotif',this.checked);showToast('Settings','SMS alerts '+( this.checked?'enabled':'disabled'))" style="width:18px;height:18px;cursor:pointer">
            </div>
          </div>
          
          <div style="padding:4px;border-bottom:1px solid rgba(156,163,175,0.1);margin-top:12px;margin-bottom:8px">
            <h3 style="font-weight:700;font-size:11px;color:#9ca3af;margin:0;letter-spacing:1px">DISPLAY</h3>
          </div>
          <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <div>
                <label style="font-size:13px;font-weight:600">Dark Mode</label>
                <p style="font-size:10px;color:#6b7280;margin:4px 0 0">Easy on the eyes for racing</p>
              </div>
              <input type="checkbox" ${darkMode?'checked':''} onchange="localStorage.setItem('darkMode',this.checked);showToast('Settings','Dark mode '+( this.checked?'enabled':'disabled'))" style="width:18px;height:18px;cursor:pointer;opacity:0.5" disabled>
            </div>
          </div>
          
          <div style="padding:4px;border-bottom:1px solid rgba(156,163,175,0.1);margin-top:12px;margin-bottom:8px">
            <h3 style="font-weight:700;font-size:11px;color:#9ca3af;margin:0;letter-spacing:1px">PREFERENCES</h3>
          </div>
          <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <label style="font-size:13px;font-weight:600;display:block;margin-bottom:8px">Language</label>
            <select onchange="localStorage.setItem('language',this.value);showToast('Settings','Language changed to '+this.value)" style="width:100%;padding:10px;border-radius:6px;background:rgba(0,0,0,0.3);border:1px solid rgba(156,163,175,0.15);color:var(--text);font-size:13px">
              <option ${language==='English'?'selected':''}>English</option>
              <option ${language==='Swahili'?'selected':''}>Swahili</option>
              <option ${language==='French'?'selected':''}>French</option>
              <option ${language==='Spanish'?'selected':''}>Spanish</option>
              <option ${language==='Chinese'?'selected':''}>中文 (Chinese)</option>
              <option ${language==='Japanese'?'selected':''}>日本語 (Japanese)</option>
            </select>
          </div>
          
          <div style="padding:4px;border-bottom:1px solid rgba(156,163,175,0.1);margin-top:12px;margin-bottom:8px">
            <h3 style="font-weight:700;font-size:11px;color:#9ca3af;margin:0;letter-spacing:1px">ACCOUNT</h3>
          </div>
          <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <button class="btn-secondary w-full" style="font-size:12px;padding:12px" onclick="showToast('Password','Reset link sent to your email')">CHANGE PASSWORD</button>
          </div>
          <div class="p-4 rounded-lg" style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.15)">
            <button class="btn-secondary w-full" style="font-size:12px;padding:12px;color:#ef4444;border-color:#ef4444" onclick="showToast('Account','Delete request sent for review')">DELETE ACCOUNT</button>
          </div>
        </div>
        <button class="btn-primary w-full" style="padding:12px;font-size:12px;margin-top:16px" onclick="closeMenuContent()">CLOSE</button>
      `;
      openMenuContent('Settings',content);
    }

    function viewSupport(){
      const content=`
        <div style="display:flex;flex-direction:column;gap:12px">
          <div class="p-4 rounded-lg" style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.15)">
            <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">
              <span style="font-size:24px">❓</span>
              <div style="flex:1">
                <h4 style="font-weight:700;font-size:13px;margin:0 0 4px">FAQ - Frequently Asked Questions</h4>
                <p style="font-size:11px;color:#9ca3af;margin:0;line-height:1.5">Find answers to common questions about registration, racing, payments and more</p>
              </div>
            </div>
            <button class="btn-secondary" style="font-size:11px;padding:10px 16px;width:100%" onclick="showFAQ()">VIEW FAQ</button>
          </div>
          
          <div class="p-4 rounded-lg" style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.15)">
            <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">
              <span style="font-size:24px">💬</span>
              <div style="flex:1">
                <h4 style="font-weight:700;font-size:13px;margin:0 0 4px">Live Chat Support</h4>
                <p style="font-size:11px;color:#9ca3af;margin:0;line-height:1.5">Chat with our support team right now. Available 24/7 for urgent issues</p>
              </div>
            </div>
            <button class="btn-secondary" style="font-size:11px;padding:10px 16px;width:100%" onclick="startLiveChat()">START CHAT NOW</button>
          </div>
          
          <div class="p-4 rounded-lg" style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.15)">
            <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">
              <span style="font-size:24px">📧</span>
              <div style="flex:1">
                <h4 style="font-weight:700;font-size:13px;margin:0 0 4px">Email Support</h4>
                <p style="font-size:11px;color:#9ca3af;margin:0">support@globracershub.com</p>
                <p style="font-size:10px;color:#6b7280;margin:2px 0 0">Response time: Within 24 hours</p>
              </div>
            </div>
            <button class="btn-secondary" style="font-size:11px;padding:10px 16px;width:100%" onclick="sendSupportEmail()">SEND EMAIL</button>
          </div>
          
          <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">
              <span style="font-size:24px">📱</span>
              <div style="flex:1">
                <h4 style="font-weight:700;font-size:13px;margin:0 0 4px">Phone Support</h4>
                <p style="font-size:11px;color:#9ca3af;margin:0">+254 712 456 789</p>
                <p style="font-size:10px;color:#6b7280;margin:2px 0 0">Mon-Fri: 8am-6pm EAT • Sat: 10am-4pm</p>
              </div>
            </div>
            <button class="btn-secondary" style="font-size:11px;padding:10px 16px;width:100%" onclick="showToast('Support','Copy +254 712 456 789')" title="Click to copy">CALL NOW</button>
          </div>
          
          <div class="p-4 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <h4 style="font-weight:700;font-size:13px;margin:0">App Information</h4>
              <span style="font-size:11px;background:rgba(245,158,11,0.2);color:var(--gold);padding:4px 8px;border-radius:4px">Latest</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#9ca3af;margin-bottom:6px">
              <span>Version</span>
              <span style="color:var(--text);font-weight:600">v2.1.0</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#9ca3af">
              <span>Last Updated</span>
              <span style="color:var(--text);font-weight:600">2025-03-18</span>
            </div>
          </div>
          
          <div class="p-4 rounded-lg" style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.15)">
            <p style="font-size:11px;color:#9ca3af;margin:0;line-height:1.6">
              Having issues? Try clearing your browser cache or disable browser extensions that might interfere with the site. 
              If problems persist, please contact support.
            </p>
          </div>
        </div>
        <button class="btn-primary w-full" style="padding:12px;font-size:12px;margin-top:16px" onclick="closeMenuContent()">CLOSE</button>
      `;
      openMenuContent('Help & Support',content);
    }

    function showFAQ(){
      const faqItems=[
        {q:'How do I register for a race?',a:'Click "REGISTER" on any race card, fill in your details, select payment method, and complete payment. You\'ll receive confirmation via email.'},
        {q:'What payment methods do you accept?',a:'We accept M-Pesa, Credit/Debit cards, PayPal, and Bank Transfers. All payments are secure and encrypted.'},
        {q:'Can I cancel my race registration?',a:'Yes, you can cancel up to 48 hours before the race starts. Visit "Race History" > select race > click "Cancel Entry" for a full refund.'},
        {q:'How are winners determined?',a:'Winners are ranked by fastest lap time or points based on race category. Results are posted within 2 hours of race completion.'},
        {q:'What if I DNF (Did Not Finish)?',a:'DNF racers don\'t earn prize money but maintain their race count. You can always join future races to improve your record.'},
      ];
      
      let faqContent='<div style="display:flex;flex-direction:column;gap:8px">';
      faqItems.forEach((item,i)=>{
        faqContent+=`
          <div class="p-3 rounded-lg" style="background:rgba(255,255,255,0.03);border:1px solid rgba(156,163,175,0.1)">
            <h4 style="font-size:12px;font-weight:600;margin:0 0 6px;cursor:pointer;color:var(--accent)" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'">❯ ${item.q}</h4>
            <p style="font-size:11px;color:#9ca3af;margin:0;line-height:1.5">${item.a}</p>
          </div>
        `;
      });
      faqContent+='</div><button class="btn-primary w-full" style="padding:12px;font-size:12px;margin-top:16px" onclick="closeMenuContent()">BACK</button>';
      document.getElementById('menuContentArea').innerHTML='<h3 style="font-weight:700;font-size:20px;margin:0 0 16px">FAQ</h3>'+faqContent;
    }

    function startLiveChat(){
      showToast('Live Chat','Chat session started! Support team assigned.');
    }

    function sendSupportEmail(){
      showToast('Support Email','Thank you for contacting us. We\'ll reply within 24 hours.');
    }

    function logoutFromMenu(){
      closeSideMenu();
      clearRacerProfile();
    }

    // Initialize
    buildSlideshow();
    renderRaces();
    renderWinners();
    renderMerch();
    lucide.createIcons();
    animateSlideProgress();
    if(!loadRacerProfile()){
      // No login modal in this version, but we keep the logic
    }

    // Modal click handlers
    document.getElementById('registerModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});
    document.getElementById('merchModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeMerchModal()});
    document.getElementById('cartModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeCartModal()});
    document.getElementById('mpesaModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeMpesaModal()});
    document.getElementById('profileModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeProfileModal()});
    document.getElementById('menuContentModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeMenuContent()});
