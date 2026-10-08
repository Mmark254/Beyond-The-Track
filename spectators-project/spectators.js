// Helper functions
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function updateBookingTotal() {
  const qty = parseInt(document.getElementById('bk-qty').value);
  const total = window.currentBookingPrice * qty;
  document.getElementById('bk-total').textContent = 'KSh ' + total.toLocaleString();
  document.getElementById('bk-total-alt').textContent = `≈ $${Math.round(total/130)} / €${Math.round(total/141)} / £${Math.round(total/166)}`;
}

function openBookingModal(seatType, price) {
  window.currentBookingPrice = price;
  window.currentSeatType = seatType;
  
  const detailsDiv = document.getElementById('booking-details');
  detailsDiv.innerHTML = `
    <div class="bg-neutral-900 rounded-xl p-4 flex items-center gap-4">
      <div class="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center">
        <i data-lucide="armchair" class="w-6 h-6 text-red-400"></i>
      </div>
      <div>
        <p class="font-semibold">${seatType}</p>
        <p class="text-sm text-neutral-500">KSh ${price.toLocaleString()} per seat</p>
      </div>
    </div>
  `;
  updateBookingTotal();
  openModal('booking-modal');
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function processSeatBooking() {
  const name = document.getElementById('bk-name').value.trim();
  const phone = document.getElementById('bk-phone').value.trim();
  const email = document.getElementById('bk-email').value.trim();
  const qty = parseInt(document.getElementById('bk-qty').value);
  const race = document.getElementById('bk-race').value;
  const terms = document.getElementById('terms').checked;
  
  if (!name || !phone || !email) {
    alert('❌ Please fill in all required fields');
    return;
  }
  
  if (!/^07\d{8}$/.test(phone)) {
    alert('❌ Enter valid Safaricom number (07XXXXXXXX)');
    return;
  }
  
  if (!terms) {
    alert('❌ Please agree to the Terms & Conditions');
    return;
  }
  
  const total = window.currentBookingPrice * qty;
  alert(`✅ Booking Confirmed!\n\n🏁 Seat: ${window.currentSeatType}\n👥 Quantity: ${qty}\n🏎️ Race: ${race}\n💰 Total: KSh ${total.toLocaleString()}\n\n📱 M-Pesa payment will be processed.\nCheck your phone for the STK push.`);
  
  closeModal('booking-modal');
  
  // Reset form
  document.getElementById('bk-name').value = '';
  document.getElementById('bk-phone').value = '';
  document.getElementById('bk-email').value = '';
  document.getElementById('terms').checked = false;
  
  // Optional: Clear textarea if exists
  const textarea = document.querySelector('#booking-modal textarea');
  if (textarea) textarea.value = '';
}

// Expose functions globally
window.closeModal = closeModal;
window.openModal = openModal;
window.updateBookingTotal = updateBookingTotal;
window.openBookingModal = openBookingModal;
window.processSeatBooking = processSeatBooking;

// Sample food data structure (you can replace with your actual data)
const sampleFoodItems = {
  "Gourmet Burger": {
    name: "Gourmet Burger",
    desc: "Premium wagyu beef burger",
    price: 2340,
    img: "burger99",
    time: 900,
    ingredients: ["200g A4-grade Wagyu beef patty", "Aged cheddar cheese slice", "Truffle aioli", "Toasted brioche bun", "Caramelized red onions", "Vine-ripened tomato", "Butter lettuce", "Dill pickle chips"],
    justification: "Wagyu beef has exceptional marbling (A4 grade), costing 5x more than regular beef."
  },
  "Margherita Pizza": {
    name: "Margherita Pizza",
    desc: "Wood-fired Neapolitan style",
    price: 1950,
    img: "pizza88",
    time: 720,
    ingredients: ["San Marzano DOP tomato sauce", "Fresh mozzarella di bufala", "Fresh basil leaves", "Extra virgin olive oil", "Tipo 00 flour dough (48hr fermented)", "Sea salt"],
    justification: "San Marzano tomatoes are DOP-certified from Italy. Mozzarella di bufala is made from water buffalo milk."
  }
};

// Function to show food detail
function showFoodDetail(foodName, foodData) {
  const container = document.getElementById('food-detail-content');
  if (!container) return;
  
  const item = foodData || sampleFoodItems[foodName];
  if (!item) return;
  
  const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const formatPrice = (price) => {
    return 'KSh ' + price.toLocaleString();
  };
  
  const formatAltPrice = (price) => {
    return `≈ $${Math.round(price/130)} / €${Math.round(price/141)} / £${Math.round(price/166)}`;
  };
  
  container.innerHTML = `
    <div class="relative">
      <!-- Hero Image -->
      <div class="relative h-56 overflow-hidden">
        <img src="https://picsum.photos/seed/${item.img}/700/350.jpg" class="w-full h-full object-cover" alt="${item.name}">
        <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
        <button onclick="closeModal('food-detail-modal')" class="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/70 transition">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-2xl font-bold mb-1">${escapeHtml(item.name)}</h3>
            <p class="text-sm text-neutral-400">${escapeHtml(item.desc)}</p>
          </div>
          <div class="text-right shrink-0 ml-4">
            <p class="text-2xl font-bold text-white">${formatPrice(item.price)}</p>
            <p class="text-xs text-neutral-500">${formatAltPrice(item.price)}</p>
          </div>
        </div>
        
        <!-- Prep Time -->
        ${item.time > 0 ? `
          <div class="flex items-center gap-2 text-sm text-amber-400 mb-4 bg-amber-500/10 px-3 py-2 rounded-lg">
            <i data-lucide="clock" class="w-4 h-4"></i>
            Preparation time: ${formatTime(item.time)}
          </div>
        ` : ''}
        
        <!-- Ingredients -->
        <div class="mb-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
            <i data-lucide="list" class="w-3.5 h-3.5"></i>
            What's Included
          </h4>
          <div class="flex flex-wrap gap-2">
            ${item.ingredients.map(ing => `<span class="ingredient-tag">${escapeHtml(ing)}</span>`).join('')}
          </div>
        </div>
        
        <!-- Price Justification -->
        <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-6">
          <h4 class="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-3 h-3"></i>
            Why This Price?
          </h4>
          <p class="text-sm text-neutral-300 leading-relaxed">${escapeHtml(item.justification)}</p>
        </div>
        
        <!-- Add to Cart Button -->
        <button onclick="addToCartFromDetail('${escapeHtml(item.name)}', ${item.price}, ${item.time}, 'food'); closeModal('food-detail-modal')" class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-lg">
          <i data-lucide="shopping-cart" class="w-5 h-5"></i>
          Add to Cart — ${formatPrice(item.price)}
        </button>
      </div>
    </div>
  `;
  
  // Reinitialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons({ nodes: [container] });
  }
  
  // Open the modal
  openModal('food-detail-modal');
}

// Helper function to close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Helper function to open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

// Helper function to add to cart
function addToCartFromDetail(name, price, time, cat) {
  // Your existing add to cart logic here
  console.log(`Added to cart: ${name} - ${price}`);
  // You can trigger a toast notification here
  showFoodToast(`${name} added to cart!`, 'success');
}

// Toast notification for food modal
function showFoodToast(msg, type) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-24 right-6 z-[100] flex flex-col gap-3';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast-message ${type === 'error' ? 'bg-red-600' : 'bg-emerald-600'} text-white px-4 py-3 rounded-xl shadow-lg text-sm flex items-center gap-2`;
  toast.innerHTML = `<i data-lucide="${type === 'error' ? 'alert-circle' : 'check-circle'}" class="w-4 h-4"></i> ${msg}`;
  
  container.appendChild(toast);
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons({ nodes: [toast] });
  }
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Expose functions globally
window.showFoodDetail = showFoodDetail;
window.closeModal = closeModal;
window.openModal = openModal;
window.addToCartFromDetail = addToCartFromDetail;

// Function to update cart items display
function updateMpesaCartDisplay(cartItems) {
  const container = document.getElementById('mpesa-cart-items');
  if (!container) return;
  
  if (!cartItems || cartItems.length === 0) {
    container.innerHTML = '<div class="text-center text-neutral-500 py-4 text-sm">Your cart is empty</div>';
    return;
  }
  
  container.innerHTML = cartItems.map(item => `
    <div class="flex items-center justify-between bg-neutral-900 rounded-lg px-3 py-2.5 border border-neutral-800">
      <div class="flex items-center gap-2">
        <i data-lucide="${item.cat === 'food' ? 'utensils' : (item.cat === 'merch' ? 'shirt' : 'building')}" class="w-4 h-4 text-green-400"></i>
        <div>
          <span class="text-sm font-medium">${escapeHtml(item.name)}</span>
          <span class="text-xs text-neutral-500 ml-2">x${item.qty}</span>
        </div>
      </div>
      <span class="text-sm font-semibold mpesa-green">KSh ${(item.price * item.qty).toLocaleString()}</span>
    </div>
  `).join('');
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons({ nodes: [container] });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function openMpesaModal(cartItems) {
  updateMpesaCartDisplay(cartItems);
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  const totalEl = document.getElementById('mpesa-total');
  const subtotalEl = document.getElementById('mpesa-subtotal');
  const totalAltEl = document.getElementById('mpesa-total-alt');
  
  if (totalEl) totalEl.textContent = 'KSh ' + total.toLocaleString();
  if (subtotalEl) subtotalEl.textContent = 'KSh ' + total.toLocaleString();
  if (totalAltEl) totalAltEl.textContent = `≈ $${Math.round(total/130)} / €${Math.round(total/141)} / £${Math.round(total/166)}`;
  
  const phoneInput = document.getElementById('mpesa-phone');
  if (phoneInput) phoneInput.value = '';
  
  openModal('mpesa-modal');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function startMpesaFlow() {
  const phone = document.getElementById('mpesa-phone')?.value.replace(/\s/g, '');
  
  if (!phone) {
    showMpesaToast('Please enter your M-Pesa phone number', 'error');
    return;
  }
  
  if (!/^07\d{8}$/.test(phone)) {
    showMpesaToast('Enter valid Safaricom number (07XXXXXXXX)', 'error');
    return;
  }
  
  closeModal('mpesa-modal');
  showMpesaToast('STK push sent to ' + phone, 'success');
}

function showMpesaToast(msg, type) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-24 right-6 z-[100] flex flex-col gap-3';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast-message ${type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white px-4 py-3 rounded-xl shadow-lg text-sm flex items-center gap-2`;
  toast.innerHTML = `<i data-lucide="${type === 'error' ? 'alert-circle' : 'check-circle'}" class="w-4 h-4"></i> ${msg}`;
  
  container.appendChild(toast);
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons({ nodes: [toast] });
  }
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

window.openMpesaModal = openMpesaModal;
window.closeModal = closeModal;
window.openModal = openModal;
window.startMpesaFlow = startMpesaFlow;

// ==================== CENTRALIZED STATE ====================
const state = {
  cart: [],
  orders: [],
  orderIdCounter: 1000,
  currentWinnerIdx: 0,
  winnerPhotoIdx: {},
  racesShown: 12,
  currentFilter: 'All',
  currentMarketTab: 'food',
  heroIdx: 0,
  bkType: '',
  bkKsh: 0,
  mpesaPhone: '',
  mpesaAccount: '',
  mpesaTotal: 0,
  lastScrollY: window.scrollY
};

// ==================== DATA ====================
const winners = [
  { name:"Max Verstappen", nickname:"The Dutch Lion", country:"Netherlands 🇳🇱", team:"Red Bull Racing", wins:60, podiums:105, championships:3, bio:"Born on September 30, 1997, Max was practically raised on the racetrack. Son of former F1 driver Jos Verstappen, he started karting at four and never looked back.", fact:"At 17 years and 166 days, he became the youngest F1 driver ever. Two years later, he won his first race — the youngest winner in history — on his debut with Red Bull at Spain 2016.", photos:["verstappen1","verstappen2","verstappen3","verstappen4"] },
  { name:"Lewis Hamilton", nickname:"The Silver Arrow", country:"United Kingdom 🇬🇧", team:"Mercedes / Ferrari", wins:103, podiums:201, championships:7, bio:"From a humble background in Stevenage, Lewis fought through prejudice and financial barriers to reach the pinnacle of motorsport.", fact:"Lewis is the only Black driver in F1 history and uses his platform to fight racial injustice. He was knighted by Queen Elizabeth II in 2021.", photos:["hamilton1","hamilton2","hamilton3","hamilton4"] },
  { name:"Ayrton Senna", nickname:"The Magic", country:"Brazil 🇧🇷", team:"McLaren", wins:41, podiums:80, championships:3, bio:"Ayrton Senna was more than a racer — he was a national hero. His supernatural connection with the car produced breathtaking laps.", fact:"At the 1984 Monaco GP in an inferior Tolethi car, Ayrton drove so phenomenally in the rain that he caught leader Alain Prost.", photos:["senna1","senna2","senna3","senna4"] },
  { name:"Michael Schumacher", nickname:"The Red Baron", country:"Germany 🇩🇪", team:"Ferrari / Benetton", wins:91, podiums:155, championships:7, bio:"Michael transformed Ferrari from a struggling team into the most dominant force in F1 history.", fact:"Schumacher once drove an entire lap of the Nürburgring with a broken exhaust bracket, completing qualifying with his car literally falling apart.", photos:["schumi1","schumi2","schumi3","schumi4"] },
  { name:"Valentino Rossi", nickname:"The Doctor", country:"Italy 🇮🇹", team:"Yamaha / Honda", wins:89, podiums:199, championships:7, bio:"Valentino Rossi didn't just win MotoGP races — he entertained millions.", fact:"Rossi once celebrated a win by pretending to fall asleep on his bike during the slowdown lap.", photos:["rossi1","rossi2","rossi3","rossi4"] },
  { name:"Sebastian Vettel", nickname:"Baby Schumi", country:"Germany 🇩🇪", team:"Red Bull / Ferrari", wins:53, podiums:122, championships:4, bio:"Sebastian won four consecutive world titles with Red Bull from 2010-2013.", fact:"Vettel once arrived at a race event dressed as a beetle to protest against an insect-harming pesticide.", photos:["vettel1","vettel2","vettel3","vettel4"] },
  { name:"Ken Block", nickname:"The Hoonigan", country:"USA 🇺🇸", team:"Hoonigan Racing", wins:0, podiums:0, championships:0, bio:"Ken Block didn't race to win championships — he raced to inspire millions. His Gymkhana series, viewed over 500M times.", fact:"Ken's Gymkhana videos were filmed from an abandoned factory in France to the streets of Dubai.", photos:["kenblock1","kenblock2","kenblock3","kenblock4"] },
  { name:"Fernando Alonso", nickname:"El Nano", country:"Spain 🇪🇸", team:"Alpine / Aston Martin", wins:32, podiums:106, championships:2, bio:"Fernando broke the Schumacher dominance in 2005 and 2006.", fact:"His race engineer famously said: 'Fernando is faster than you' — now one of the most iconic phrases in F1.", photos:["alonso1","alonso2","alonso3","alonso4"] }
];

const ytBase="https://www.youtube.com/results?search_query=";
const raceList=[
  {name:"Monaco Grand Prix",loc:"Monte Carlo, Monaco",cat:"F1",yt:"Monaco+Grand+Prix+live+stream"},
  {name:"Daytona 500",loc:"Daytona Beach, USA",cat:"NASCAR",yt:"Daytona+500+live+stream"},
  {name:"Le Mans 24 Hours",loc:"Le Mans, France",cat:"Endurance",yt:"Le+Mans+24+Hours+live+stream"},
  {name:"MotoGP Qatar",loc:"Losail, Qatar",cat:"MotoGP",yt:"MotoGP+Qatar+live+stream"},
  {name:"Indy 500",loc:"Indianapolis, USA",cat:"IndyCar",yt:"Indy+500+live+stream"},
  {name:"Safari Rally Kenya",loc:"Nairobi, Kenya",cat:"Rally",yt:"Safari+Rally+Kenya+live+stream"},
  {name:"British GP",loc:"Silverstone, UK",cat:"F1",yt:"British+Grand+Prix+live+stream"},
  {name:"Nurburgring 24h",loc:"Nürburg, Germany",cat:"Endurance",yt:"Nurburgring+24+hours+live"},
  {name:"Bathurst 1000",loc:"Bathurst, Australia",cat:"Touring",yt:"Bathurst+1000+live+stream"},
  {name:"Isle of Man TT",loc:"Isle of Man, UK",cat:"Road Racing",yt:"Isle+of+Man+TT+live+stream"},
  {name:"MotoGP Americas",loc:"Austin, USA",cat:"MotoGP",yt:"MotoGP+Americas+live+stream"},
  {name:"Japanese GP",loc:"Suzuka, Japan",cat:"F1",yt:"Japanese+Grand+Prix+live"},
  {name:"Italian GP",loc:"Monza, Italy",cat:"F1",yt:"Italian+Grand+Prix+live"},
  {name:"Spanish GP",loc:"Barcelona, Spain",cat:"F1",yt:"Spanish+Grand+Prix+live"},
  {name:"Canadian GP",loc:"Montreal, Canada",cat:"F1",yt:"Canadian+Grand+Prix+live"},
  {name:"Belgian GP",loc:"Spa, Belgium",cat:"F1",yt:"Belgian+Grand+Prix+live"},
  {name:"Mexican GP",loc:"Mexico City, Mexico",cat:"F1",yt:"Mexican+Grand+Prix+live"},
  {name:"Brazilian GP",loc:"São Paulo, Brazil",cat:"F1",yt:"Brazilian+Grand+Prix+live"},
  {name:"Australian GP",loc:"Melbourne, Australia",cat:"F1",yt:"Australian+Grand+Prix+live"},
  {name:"MotoGP Italy",loc:"Mugello, Italy",cat:"MotoGP",yt:"MotoGP+Mugello+live"},
  {name:"MotoGP Spain",loc:"Jerez, Spain",cat:"MotoGP",yt:"MotoGP+Jerez+live"},
  {name:"MotoGP Japan",loc:"Motegi, Japan",cat:"MotoGP",yt:"MotoGP+Japan+live"},
  {name:"Talladega 500",loc:"Alabama, USA",cat:"NASCAR",yt:"Talladega+500+live"},
  {name:"Charlotte 600",loc:"Charlotte, USA",cat:"NASCAR",yt:"Charlotte+600+live"},
  {name:"Sebring 12 Hours",loc:"Sebring, USA",cat:"Endurance",yt:"Sebring+12+hours+live"},
  {name:"Spa 24 Hours",loc:"Spa, Belgium",cat:"Endurance",yt:"Spa+24+hours+live"},
  {name:"WRC Monte Carlo",loc:"Monte Carlo, Monaco",cat:"Rally",yt:"WRC+Monte+Carlo+live"},
  {name:"WRC Sweden",loc:"Umeå, Sweden",cat:"Rally",yt:"WRC+Sweden+live"},
  {name:"WRC Argentina",loc:"Buenos Aires, Argentina",cat:"Rally",yt:"WRC+Argentina+live"},
  {name:"WRC Croatia",loc:"Zagreb, Croatia",cat:"Rally",yt:"WRC+Croatia+live"},
  {name:"Supercars Adelaide",loc:"Adelaide, Australia",cat:"Touring",yt:"Supercars+Adelaide+live"},
  {name:"DTM Norisring",loc:"Nuremberg, Germany",cat:"Touring",yt:"DTM+Norisring+live"},
  {name:"North West 200",loc:"Portrush, UK",cat:"Road Racing",yt:"North+West+200+live"},
  {name:"Ulster GP",loc:"Dundrod, UK",cat:"Road Racing",yt:"Ulster+Grand+Prix+live"},
  {name:"Macau GP",loc:"Macau, China",cat:"Road Racing",yt:"Macau+Grand+Prix+live"},
  {name:"IndyCar Long Beach",loc:"California, USA",cat:"IndyCar",yt:"IndyCar+Long+Beach+live"},
  {name:"IndyCar Toronto",loc:"Toronto, Canada",cat:"IndyCar",yt:"IndyCar+Toronto+live"},
  {name:"Formula E Rome",loc:"Rome, Italy",cat:"Formula E",yt:"Formula+E+Rome+live"},
  {name:"Formula E Berlin",loc:"Berlin, Germany",cat:"Formula E",yt:"Formula+E+Berlin+live"},
  {name:"Formula E London",loc:"London, UK",cat:"Formula E",yt:"Formula+E+London+live"},
  {name:"World RX Barcelona",loc:"Barcelona, Spain",cat:"Rallycross",yt:"World+Rallycross+Barcelona"},
  {name:"World RX Abu Dhabi",loc:"Abu Dhabi, UAE",cat:"Rallycross",yt:"World+Rallycross+Abu+Dhabi"},
  {name:"WRC Kenya",loc:"Nairobi, Kenya",cat:"Rally",yt:"WRC+Kenya+Safari+Rally+live"},
  {name:"IndyCar Mid-Ohio",loc:"Ohio, USA",cat:"IndyCar",yt:"IndyCar+Mid+Ohio+live"},
  {name:"IndyCar Portland",loc:"Oregon, USA",cat:"IndyCar",yt:"IndyCar+Portland+live"},
  {name:"IndyCar Laguna Seca",loc:"California, USA",cat:"IndyCar",yt:"IndyCar+Laguna+Seca+live"},
  {name:"Formula E Monaco",loc:"Monaco",cat:"Formula E",yt:"Formula+E+Monaco+live"},
  {name:"Daytona 240",loc:"Daytona Beach, USA",cat:"NASCAR",yt:"Daytona+240+live"},
  {name:"NWES Valencia",loc:"Valencia, Spain",cat:"Touring",yt:"NWES+Valencia+live"},
  {name:"WRC Japan",loc:"Nagoya, Japan",cat:"Rally",yt:"WRC+Japan+live"},
  {name:"World RX Norway",loc:"Hell, Norway",cat:"Rallycross",yt:"World+Rallycross+Norway"}
];

const foodItems=[
  {name:"Gourmet Burger",desc:"Premium wagyu beef burger",price:2340,img:"burger99",time:900,cat:"food",ingredients:["200g A4-grade Wagyu beef patty","Aged cheddar cheese slice","Truffle aioli","Toasted brioche bun","Caramelized red onions","Vine-ripened tomato","Butter lettuce","Dill pickle chips"],justification:"Wagyu beef has exceptional marbling (A4 grade), costing 5x more than regular beef."},
  {name:"Margherita Pizza",desc:"Wood-fired Neapolitan style",price:1950,img:"pizza88",time:720,cat:"food",ingredients:["San Marzano DOP tomato sauce","Fresh mozzarella di bufala","Fresh basil leaves","Extra virgin olive oil","Tipo 00 flour dough (48hr fermented)","Sea salt"],justification:"San Marzano tomatoes are DOP-certified from Italy. Mozzarella di bufala is made from water buffalo milk."},
  {name:"Sushi Platter",desc:"Chef's selection, 12 pieces",price:3640,img:"sushi77",time:600,cat:"food",ingredients:["4x Salmon nigiri","4x Tuna sashimi (yellowfin)","4x California roll","Fresh wasabi","Pickled ginger","Premium soy sauce"],justification:"Uses Norwegian farmed salmon and yellowfin tuna. Real wasabi root costs KSh 800+ per serving."},
  {name:"Caesar Salad",desc:"Classic with premium additions",price:1560,img:"salad66",time:300,cat:"food",ingredients:["Romaine hearts","Parmigiano-Reggiano 24-month aged","House-made garlic croutons","Anchovy fillet dressing","Lemon zest","Free-range egg yolk"],justification:"Parmigiano-Reggiano is imported from Parma, Italy and aged 24 months."},
  {name:"Grilled Ribeye",desc:"300g prime cut with sides",price:5460,img:"steak55",time:1200,cat:"food",ingredients:["300g Prime ribeye (28-day dry-aged)","Garlic herb butter","Roasted baby potatoes","Grilled asparagus","Red wine jus","Flaky sea salt"],justification:"28-day dry-aged prime ribeye loses 20% moisture during aging, concentrating flavor."},
  {name:"Fish & Chips",desc:"Beer-battered Atlantic cod",price:2080,img:"fishchips44",time:600,cat:"food",ingredients:["Atlantic cod fillet (200g)","Tusker Lager beer batter","Hand-cut thick chips","Tartar sauce","Mushy peas","Lemon wedge"],justification:"Atlantic cod is sustainably sourced. Beer batter uses Tusker Lager for a local twist."},
  {name:"Chicken Wings",desc:"12 pieces, buffalo style",price:1820,img:"wings33",time:480,cat:"food",ingredients:["12 free-range chicken wing sections","Frank's RedHot buffalo sauce","Unsalted butter","Blue cheese dip (roquefort)","Celery & carrot sticks"],justification:"Free-range wings are larger and more flavorful. Roquefort blue cheese dip is imported from France."},
  {name:"Craft Beer",desc:"Local IPA, 500ml draft",price:1170,img:"craftbeer22",time:120,cat:"food",ingredients:["500ml freshly poured IPA","6.5% ABV","Cascade & Centennial hops","Local malted barley"],justification:"Craft IPA uses premium Cascade and Centennial hops at 3x the hop rate of commercial beers."},
  {name:"Espresso Martini",desc:"Vodka, coffee liqueur, espresso",price:1820,img:"martini11",time:180,cat:"food",ingredients:["Ketel One vodka (50ml)","Kahlúa coffee liqueur (25ml)","Fresh double espresso (30ml)","Coffee bean garnish"],justification:"Uses Ketel One (premium vodka) and fresh espresso pulled to order."},
  {name:"Fresh Smoothie",desc:"Tropical mango blend",price:1040,img:"smoothie10",time:120,cat:"food",ingredients:["Alphonso mango (2 whole)","Passion fruit (3 pcs)","Banana","Coconut water (fresh)","Raw honey drizzle"],justification:"Alphonso mangoes are the 'king of mangoes' from India, only available seasonally."},
  {name:"Churros",desc:"With Belgian chocolate dip",price:910,img:"churros09",time:300,cat:"food",ingredients:["Choux pastry dough","Cinnamon sugar coating","Belgian dark chocolate (70% cacao)","Vanilla bean cream"],justification:"Belgian dark chocolate (70% cacao) from Callebaut costs 4x more than standard chocolate."},
  {name:"Loaded Nachos",desc:"With all the toppings",price:1690,img:"nachos08",time:360,cat:"food",ingredients:["Corn tortilla chips (house-fried)","Fresh guacamole (2 avocados)","Sour cream","Pickled jalapeños","Aged cheddar & mozzarella","Pico de gallo"],justification:"Chips are fried fresh to order. Guacamole is made from whole avocados."}
];

const merchItems=[
  {name:"Team Racing Cap",desc:"Official team logo, adjustable",price:4550,img:"racingcap01",time:0,cat:"merch",details:["100% brushed cotton","Embroidered team logo","Adjustable metal clasp","UV-resistant dye"]},
  {name:"Racing Jacket",desc:"Waterproof, team colors",price:15600,img:"racingjacket02",time:0,cat:"merch",details:["3-layer waterproof fabric","Team colors & sponsors","Zippered pockets (4)","Breathable membrane"]},
  {name:"Pit Crew T-Shirt",desc:"Premium cotton, limited edition",price:5850,img:"racetshirt03",time:0,cat:"merch",details:["180gsm premium cotton","Limited edition numbering","Crew neck","Pre-shrunk fabric"]},
  {name:"Racing Gloves",desc:"Professional grade, suede",price:8450,img:"racinggloves04",time:0,cat:"merch",details:["Premium suede palm","Pre-curved fingers","Touchscreen-compatible tips","Velcro wrist closure"]},
  {name:"Team Scarf",desc:"Knit, team badge",price:3250,img:"teamscarf05",time:0,cat:"merch",details:["Merino wool blend","Woven team pattern","Embroidered crest","Fringed ends"]},
  {name:"Miniature Car Model",desc:"1:18 scale, die-cast",price:11570,img:"minicar06",time:0,cat:"merch",details:["1:18 precision scale","Die-cast metal body","Steerable front wheels","Display case included"]}
];

const accomItems=[
  {name:"Trackside Hotel Suite",desc:"5-star, track view balcony",price:58500,img:"hotelsuite01",time:0,cat:"accommodation",details:["King-size bed","Private balcony facing track","Room service 24/7","Spa access"]},
  {name:"Luxury Resort Room",desc:"Spa access, breakfast included",price:41600,img:"resortroom02",time:0,cat:"accommodation",details:["Queen-size bed","Resort pool access","Spa treatment (1 included)","Full breakfast"]},
  {name:"Glamping Tent",desc:"Premium tent, shared facilities",price:12350,img:"glamping03",time:0,cat:"accommodation",details:["Queen air bed","LED lighting","Shared shower block","Breakfast hamper"]},
  {name:"RV Parking Spot",desc:"Full hookups, 24h security",price:8450,img:"rvspot04",time:0,cat:"accommodation",details:["30ft max length","Water & electric hookups","Waste disposal station","24h security"]},
  {name:"Apartment Rental",desc:"2-bedroom, near track",price:36400,img:"apartment05",time:0,cat:"accommodation",details:["2 bedrooms, 1 bathroom","Full kitchen","5 min drive to track","Self check-in"]},
  {name:"Hostel Bed",desc:"Dorm style, breakfast included",price:4550,img:"hostelbed06",time:0,cat:"accommodation",details:["Single bed in 6-bed dorm","Locker storage","Shared bathroom","Free Wi-Fi"]}
];

// ==================== HELPERS ====================
const fKSh=n=>'KSh '+n.toLocaleString();
const gAlt=ksh=>`≈ $${Math.round(ksh/130).toLocaleString()} / €${Math.round(ksh/141).toLocaleString()} / £${Math.round(ksh/166).toLocaleString()}`;
const fTime=s=>{if(s<=0)return'00:00';const m=Math.floor(s/60),sc=s%60;return`${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`};
const gId=()=>'RS-'+(++state.orderIdCounter);
const mpesaIcon=`<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><text x="12" y="16" text-anchor="middle" font-size="9" font-weight="bold" fill="currentColor" stroke="none">M</text></svg>`;

// ==================== UI ENHANCEMENTS ====================
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  menu.classList.toggle('hidden');
  icon.setAttribute('data-lucide', menu.classList.contains('hidden') ? 'menu' : 'x');
  lucide.createIcons({nodes: [icon]});
}
function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.add('hidden');
  document.getElementById('menu-icon').setAttribute('data-lucide', 'menu');
  lucide.createIcons({nodes: [document.getElementById('menu-icon')]});
}

window.addEventListener('scroll', () => {
  const cartEl = document.getElementById('floating-cart');
  if (state.cart.length === 0) return;
  if (window.scrollY > state.lastScrollY && window.scrollY > 500) {
    cartEl.classList.add('hide-cart');
  } else {
    cartEl.classList.remove('hide-cart');
  }
  state.lastScrollY = window.scrollY;
});

function closeModal(id){
  const modal = document.getElementById(id);
  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('closing');
    document.body.style.overflow = '';
  }, 200);
}

function openModal(id){
  document.getElementById(id).classList.remove('hidden','closing');
  document.body.style.overflow='hidden';
  lucide.createIcons();
}

function showToast(msg,type='info'){
  const c=document.getElementById('toast-container');
  const cl={info:'bg-blue-600',success:'bg-emerald-600',error:'bg-red-600',warning:'bg-amber-600'};
  const ic={info:'info',success:'check-circle-2',error:'alert-circle',warning:'alert-triangle'};
  const t=document.createElement('div');
  t.className=`toast-enter flex items-center gap-3 ${cl[type]} text-white px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium min-w-[280px]`;
  t.innerHTML=`<i data-lucide="${ic[type]}" class="w-4 h-4 shrink-0"></i><span>${msg}</span>`;
  c.appendChild(t);lucide.createIcons({nodes:[t]});
  setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),300)},3500);
}

function scrollToOrders(){if(!state.orders.length){showToast('No active orders yet','info');return}document.getElementById('my-orders').classList.remove('hidden');document.getElementById('my-orders').scrollIntoView({behavior:'smooth'})}

function updateBadges(){
  const b=document.getElementById('nav-order-count');b.textContent=state.orders.length;
  state.orders.length>0?b.classList.remove('hidden'):b.classList.add('hidden');
  const s=document.getElementById('my-orders'),badge=document.getElementById('orders-total-badge');
  if(state.orders.length>0){s.classList.remove('hidden');badge.classList.remove('hidden');badge.textContent=state.orders.length+' item'+(state.orders.length>1?'s':'')}else badge.classList.add('hidden');
  renderOrders();
}

// ==================== HERO ====================
function initHero(){
  const sl=document.querySelectorAll('.hero-slide'),dc=document.getElementById('hero-dots');
  sl.forEach((_,i)=>{const d=document.createElement('button');d.className=`w-2 h-2 rounded-full transition-all duration-300 ${i===0?'bg-white w-6':'bg-white/30'}`;d.onclick=()=>goHero(i);dc.appendChild(d)});
  setInterval(()=>goHero((state.heroIdx+1)%sl.length),5000);
}
function goHero(i){
  const sl=document.querySelectorAll('.hero-slide'),dt=document.querySelectorAll('#hero-dots button');
  sl[state.heroIdx].classList.remove('active');dt[state.heroIdx].className='w-2 h-2 rounded-full transition-all duration-300 bg-white/30';
  state.heroIdx=i;sl[state.heroIdx].classList.add('active');dt[state.heroIdx].className='w-2 h-2 rounded-full transition-all duration-300 bg-white w-6';
}

// ==================== RACES ====================
function initRaces(){
  const liveIdx1 = Math.floor(Math.random() * raceList.length);
  let liveIdx2 = Math.floor(Math.random() * raceList.length);
  while(liveIdx2 === liveIdx1) liveIdx2 = Math.floor(Math.random() * raceList.length);
  raceList[liveIdx1].isLive = true;
  raceList[liveIdx2].isLive = true;

  const cats=['All',...new Set(raceList.map(r=>r.cat))];
  const fc=document.getElementById('race-filters');
  cats.forEach(c=>{const b=document.createElement('button');b.textContent=c;b.className=`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${c==='All'?'bg-red-600 text-white':'bg-neutral-800 text-neutral-400 hover:text-white'}`;b.onclick=()=>filterRaces(c,fc);fc.appendChild(b)});
  renderRaces();
}
function filterRaces(cat,fc){
  state.currentFilter=cat;state.racesShown=12;
  fc.querySelectorAll('button').forEach(b=>{b.className=b.textContent===cat?'px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 bg-red-600 text-white':'px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 bg-neutral-800 text-neutral-400 hover:text-white'});
  renderRaces();
}
function renderRaces(){
  const g=document.getElementById('races-grid');
  const filtered=state.currentFilter==='All'?raceList:raceList.filter(r=>r.cat===state.currentFilter);
  const shown=filtered.slice(0,state.racesShown);
  g.innerHTML=shown.map((r,i)=>`
    <div class="bg-[#141414] border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 group" style="animation:fade-in .5s ease-out ${i*0.04}s both">
      <div class="relative h-36 overflow-hidden">
        <img src="https://picsum.photos/seed/${r.name.replace(/\s/g,'').toLowerCase()}/400/200.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="${r.name}">
        <div class="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
        ${r.isLive ? `<div class="absolute top-3 left-3 bg-red-600 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><span class="w-1.5 h-1.5 bg-white rounded-full pulse-live"></span>Live Now</div>` : `<div class="absolute top-3 left-3 bg-neutral-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Scheduled</div>`}
        <div class="absolute top-3 right-3 text-xs text-neutral-300 bg-black/50 backdrop-blur px-2 py-1 rounded-md">${r.cat}</div>
      </div>
      <div class="p-4">
        <h4 class="font-semibold text-sm mb-1">${r.name}</h4>
        <p class="text-xs text-neutral-500 flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i>${r.loc}</p>
        <div class="mt-3 flex items-center justify-between">
          <span class="text-xs text-neutral-600 flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i>See schedule</span>
          <a href="${ytBase+r.yt}" target="_blank" rel="noopener" class="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 transition">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4L16 12l-6.5 3.6z"/></svg>
            ${r.isLive ? 'Watch Live' : 'Find Stream'}
          </a>
        </div>
      </div>
    </div>`).join('');
  document.getElementById('load-more-races').style.display=state.racesShown>=filtered.length?'none':'';
  lucide.createIcons({nodes:[g]});
}
function loadMoreRaces(){state.racesShown+=12;renderRaces()}

// ==================== SEAT BOOKING ====================
function openBookingModal(type,kshPrice){
  document.getElementById('booking-details').innerHTML=`<div class="bg-neutral-900 rounded-xl p-4 flex items-center gap-4"><div class="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center"><i data-lucide="armchair" class="w-6 h-6 text-red-400"></i></div><div><p class="font-semibold">${type}</p><p class="text-sm text-neutral-500">${fKSh(kshPrice)} per seat</p></div></div>`;
  state.bkType=type;state.bkKsh=kshPrice;
  updateBookingTotal();openModal('booking-modal');
}
function updateBookingTotal(){
  const q=parseInt(document.getElementById('bk-qty').value),total=state.bkKsh*q;
  document.getElementById('bk-total').textContent=fKSh(total);
  document.getElementById('bk-total-alt').textContent=gAlt(total);
}
function processSeatBooking(){
  const name=document.getElementById('bk-name').value.trim();
  const phone=document.getElementById('bk-phone').value.replace(/\s/g,'');
  const email=document.getElementById('bk-email').value.trim();
  if(!name||!phone||!email){showToast('Please fill in all fields','warning');return}
  if(!/^07\d{8}$/.test(phone)){showToast('Enter valid Safaricom number (07XXXXXXXX)','warning');return}
  const qty=parseInt(document.getElementById('bk-qty').value);
  const race=document.getElementById('bk-race').value;
  const total=state.bkKsh*qty;
  const oid=gId();
  state.orders.push({id:oid,type:'seat',name:state.bkType+' — '+race,desc:`${qty} seat${qty>1?'s':''} · ${phone}`,qty,total,status:'confirmed',remaining:0,timer:null,date:new Date().toLocaleString(),phone,mpesaRef:'BK'+Date.now().toString(36).toUpperCase()});
  closeModal('booking-modal');updateBadges();showReceipt(oid);
  showToast(`${qty}x ${state.bkType} booked!`,'success');
  document.getElementById('bk-name').value='';document.getElementById('bk-phone').value='';document.getElementById('bk-email').value='';
}

// ==================== MARKETPLACE ====================
function initMarketplace(){renderMarket()}
function switchMarketTab(tab){
  state.currentMarketTab=tab;
  document.querySelectorAll('#market-tabs button').forEach(b=>{b.className=b.dataset.tab===tab?'tab-active whitespace-nowrap px-6 py-2.5 rounded-xl border border-transparent text-sm font-medium transition-all duration-200':'whitespace-nowrap px-6 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 text-sm font-medium transition-all duration-200 hover:text-white'});
  renderMarket();
}
function getAllItems(){return state.currentMarketTab==='food'?foodItems:state.currentMarketTab==='merch'?merchItems:accomItems}

function updateCartQuantity(name, price, time, cat, delta) {
  const idx = state.cart.findIndex(c => c.name === name);
  if (idx > -1) {
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
  } else if (delta > 0) {
    state.cart.push({ name, price, time, cat, qty: 1 });
  }
  renderMarket();
}

function renderMarket(){
  const g=document.getElementById('market-grid');
  const items=getAllItems();
  const isFood=state.currentMarketTab==='food';
  g.innerHTML=items.map((item,i)=>{
    const inCart=state.cart.find(c=>c.name===item.name);
    return `<div class="bg-[#141414] border ${inCart?'border-green-500/40':'border-neutral-800'} rounded-xl overflow-hidden hover:border-neutral-600 transition-all duration-300 group cursor-pointer relative" style="animation:fade-in .4s ease-out ${i*0.04}s both" onclick="${isFood?`showFoodDetail('${item.name.replace(/'/g,"\\'")}')`:''}">
      ${inCart?`<div class="absolute top-3 left-3 z-10 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><i data-lucide="check" class="w-3 h-3"></i>${inCart.qty} in Cart</div>`:''}
      <div class="relative h-44 overflow-hidden">
        <img src="https://picsum.photos/seed/${item.img}/400/300.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="${item.name}">
        ${isFood&&item.time>0?`<div class="absolute top-3 right-3 bg-black/60 backdrop-blur text-xs text-emerald-400 font-semibold px-2.5 py-1 rounded-md flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i>${fTime(item.time)}</div>`:''}
        ${isFood?'<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30"><div class="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5"><i data-lucide="eye" class="w-3.5 h-3.5"></i>View Ingredients</div></div>':''}
      </div>
      <div class="p-4" ${!isFood?'onclick="event.stopPropagation()"':''}>
        <h4 class="font-semibold text-sm mb-1">${item.name}</h4>
        <p class="text-xs text-neutral-500 mb-3 line-clamp-1">${item.desc}</p>
        <div class="flex items-center justify-between">
          <div><span class="text-lg font-bold">${fKSh(item.price)}</span><p class="text-[10px] text-neutral-600">${gAlt(item.price)}</p></div>
          <div class="flex items-center gap-1" onclick="event.stopPropagation()">
            ${inCart ? `<button onclick="updateCartQuantity('${item.name.replace(/'/g,"\\'")}', ${item.price}, ${item.time||0}, '${item.cat}', -1)" class="bg-neutral-700 hover:bg-red-600 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-all"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>` : ''}
            <button onclick="updateCartQuantity('${item.name.replace(/'/g,"\\'")}', ${item.price}, ${item.time||0}, '${item.cat}', 1)" class="${inCart ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-700'} text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5">
              <i data-lucide="${inCart ? 'plus' : 'shopping-cart'}" class="w-3.5 h-3.5"></i>${inCart ? 'Add' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>`}).join('');
  lucide.createIcons({nodes:[g]});updateFloatingCart();
}

function showFoodDetail(name){
  const item=foodItems.find(f=>f.name===name);if(!item)return;
  const inCart=state.cart.find(c=>c.name===name);
  const dc=document.getElementById('food-detail-content');
  dc.innerHTML=`
    <div class="relative h-56 overflow-hidden"><img src="https://picsum.photos/seed/${item.img}/700/350.jpg" class="w-full h-full object-cover" alt="${item.name}">
      <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
      <button onclick="closeModal('food-detail-modal')" class="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"><i data-lucide="x" class="w-4 h-4"></i></button>
    </div>
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div><h3 class="text-2xl font-bold mb-1">${item.name}</h3><p class="text-sm text-neutral-400">${item.desc}</p></div>
        <div class="text-right shrink-0 ml-4"><p class="text-2xl font-bold text-white">${fKSh(item.price)}</p><p class="text-xs text-neutral-500">${gAlt(item.price)}</p></div>
      </div>
      ${item.time>0?`<div class="flex items-center gap-2 text-sm text-amber-400 mb-4 bg-amber-500/10 px-3 py-2 rounded-lg"><i data-lucide="clock" class="w-4 h-4"></i>Preparation time: ${fTime(item.time)}</div>`:''}
      <div class="mb-4">
        <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2"><i data-lucide="list" class="w-3.5 h-3.5"></i>What's Included</h4>
        <div class="flex flex-wrap gap-2">${item.ingredients.map(ing=>`<span class="ingredient-tag">${ing}</span>`).join('')}</div>
      </div>
      <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-6">
        <h4 class="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5"><i data-lucide="sparkles" class="w-3 h-3"></i>Why This Price?</h4>
        <p class="text-sm text-neutral-300 leading-relaxed">${item.justification}</p>
      </div>
      <button onclick="updateCartQuantity('${item.name.replace(/'/g,"\\'")}',${item.price},${item.time},'food', 1);closeModal('food-detail-modal')" class="w-full ${inCart?'bg-green-600 hover:bg-green-500':'bg-red-600 hover:bg-red-700'} text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-lg">
        <i data-lucide="shopping-cart" class="w-5 h-5"></i>${inCart?'Add Another ('+fKSh(item.price)+')':'Add to Cart — '+fKSh(item.price)}
      </button>
    </div>`;
  openModal('food-detail-modal');
}

function updateFloatingCart(){
  const fc=document.getElementById('floating-cart');
  state.cart.length>0?fc.classList.remove('hidden'):fc.classList.add('hidden');
  document.getElementById('cart-count').textContent=state.cart.reduce((s,c) => s + c.qty, 0);
  document.getElementById('cart-total').textContent=fKSh(state.cart.reduce((s,c)=>s+(c.price*c.qty),0));
}

// ==================== M-PESA FLOW ====================
function openMpesaModal(){
  if(!state.cart.length){showToast('Your cart is empty','info');return}
  const items=document.getElementById('mpesa-cart-items');
  items.innerHTML=state.cart.map(c=>`<div class="flex items-center justify-between bg-neutral-900 rounded-lg px-3 py-2.5"><div class="flex items-center gap-2"><i data-lucide="${c.cat==='food'?'utensils':'shirt'}" class="w-4 h-4 text-green-400"></i><span class="text-sm">${c.name} (x${c.qty})</span></div><span class="text-sm font-semibold mpesa-green">${fKSh(c.price * c.qty)}</span></div>`).join('');
  const total=state.cart.reduce((s,c)=>s+(c.price*c.qty),0);
  document.getElementById('mpesa-total').textContent=fKSh(total);
  document.getElementById('mpesa-total-alt').textContent=gAlt(total);
  openModal('mpesa-modal');
}

function startMpesaFlow(){
  const phone=document.getElementById('mpesa-phone').value.replace(/\s/g,'');
  if(!/^07\d{8}$/.test(phone)){showToast('Enter valid Safaricom number (07XXXXXXXX)','warning');return}
  const total=state.cart.reduce((s,c)=>s+(c.price*c.qty),0);
  const account='RS'+(state.orderIdCounter+1);
  closeModal('mpesa-modal');

  const steps=[
    {n:'1',t:'Open M-Pesa',d:'Click "Open M-Pesa Menu" below or dial *334# on your phone'},
    {n:'2',t:'Select Lipa na M-Pesa',d:'Choose option 6 (Lipa na M-Pesa)'},
    {n:'3',t:'Select Buy Goods',d:'Choose option 1 (Buy Goods and Services)'},
    {n:'4',t:'Enter Paybill Number',d:'Type <strong class="text-white font-mono">174379</strong> and press OK'},
    {n:'5',t:'Enter Account Number',d:'Type <strong class="text-white font-mono">${account}</strong> and press OK'},
    {n:'6',t:'Enter Amount',d:'Type <strong class="text-white font-mono">${total}</strong> and press OK'},
    {n:'7',t:'Enter PIN & Confirm',d:'Enter your M-Pesa PIN and press OK to complete'}
  ];

  document.getElementById('mpesa-steps-display').innerHTML=steps.map(s=>`
    <div class="flex gap-3 items-start bg-neutral-900 rounded-xl p-3">
      <div class="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 font-bold text-xs shrink-0">${s.n}</div>
      <div><p class="text-sm font-semibold">${s.t}</p><p class="text-xs text-neutral-400 mt-0.5">${s.d}</p></div>
    </div>`).join('');

  document.getElementById('mpesa-instr-total').textContent=fKSh(total);
  document.getElementById('mpesa-instr-alt').textContent=gAlt(total);
  document.getElementById('mpesa-dial-link').href='tel:*334%23';
  
  state.mpesaPhone=phone; state.mpesaAccount=account; state.mpesaTotal=total;
  openModal('mpesa-instructions');
}

function confirmMpesaPayment(){
  closeModal('mpesa-instructions');
  openModal('mpesa-verifying');
  document.getElementById('verify-spinner').classList.remove('hidden');
  document.getElementById('verify-icon').classList.add('hidden');
  document.getElementById('verify-text').textContent='Verifying with Safaricom...';
  document.getElementById('verify-desc').textContent='Checking if payment was received on Paybill 174379';

  setTimeout(()=>{
    document.getElementById('verify-text').textContent='Payment received!';
    document.getElementById('verify-desc').textContent='Transaction confirmed — creating your orders';
    document.getElementById('verify-spinner').classList.add('hidden');
    document.getElementById('verify-icon').classList.remove('hidden');
    lucide.createIcons({nodes:[document.getElementById('verify-icon')]});

    setTimeout(()=>{
      closeModal('mpesa-verifying');
      finalizeMpesaOrders();
    },2000);
  },5000);
}

function cancelMpesaFull(){closeModal('mpesa-instructions');showToast('Payment cancelled','error')}

function finalizeMpesaOrders(){
  const ref='QJK'+Date.now().toString(36).toUpperCase().slice(-6);
  state.cart.forEach(item=>{
    const iid=gId();
    const hasTime=item.time>0;
    state.orders.push({id:iid,type:item.cat,name:item.name,desc:`M-Pesa · ${state.mpesaPhone} · x${item.qty} · ${ref}`,qty:item.qty,total:item.price*item.qty,status:hasTime?'preparing':'confirmed',remaining:hasTime?item.time:0,timer:null,date:new Date().toLocaleString(),phone:state.mpesaPhone,mpesaRef:ref,account:state.mpesaAccount});
    if(hasTime)startCountdown(iid,item.time);
  });
  const total=state.cart.reduce((s,c)=>s+(c.price*c.qty),0);
  state.cart=[];updateFloatingCart();renderMarket();updateBadges();
  showToast(`Payment of ${fKSh(total)} confirmed via M-Pesa!`,'success');
  setTimeout(()=>{if(state.orders.length)showReceipt(state.orders[state.orders.length-1].id)},500);
}

// ==================== ORDER TRACKING ====================
function startCountdown(oid,duration){
  const o=state.orders.find(x=>x.id===oid);if(!o)return;
  o.timer=setInterval(()=>{
    o.remaining--;
    const el=document.getElementById('countdown-'+oid),bar=document.getElementById('bar-'+oid);
    if(el)el.textContent=fTime(o.remaining);
    if(bar)bar.style.width=Math.max(0,(o.remaining/duration)*100)+'%';
    if(o.remaining<=0){clearInterval(o.timer);o.status='ready';o.remaining=0;renderOrders();showToast(`"${o.name}" is ready for pickup! 🎉`,'success')}
  },1000);
}

function renderOrders(){
  const list=document.getElementById('orders-list'),noOrd=document.getElementById('no-orders');
  if(!state.orders.length){list.innerHTML='';noOrd.classList.remove('hidden');return}
  noOrd.classList.add('hidden');
  const sc={preparing:'text-amber-400 bg-amber-400/10',ready:'text-emerald-400 bg-emerald-400/10',confirmed:'text-blue-400 bg-blue-400/10'};
  const si={preparing:'loader',ready:'check-circle-2',confirmed:'shield-check'};
  list.innerHTML=state.orders.map(o=>`
    <div class="bg-[#141414] border border-neutral-800 rounded-xl p-5 animate-fade-in">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0"><i data-lucide="${o.type==='seat'?'armchair':o.type==='food'?'utensils':'shirt'}" class="w-5 h-5 text-neutral-400"></i></div>
          <div><h4 class="font-semibold text-sm">${o.name}</h4><p class="text-xs text-neutral-500 mt-0.5">${o.id} · ${o.date}</p></div>
        </div>
        <span class="${sc[o.status]||''} text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0"><i data-lucide="${si[o.status]||'package'}" class="w-3 h-3 ${o.status==='preparing'?'animate-spin':''}"></i>${o.status.charAt(0).toUpperCase()+o.status.slice(1)}</span>
      </div>
      ${o.mpesaRef?`<div class="flex items-center gap-2 text-xs text-green-500/60 mb-2">${mpesaIcon.replace('w-5 h-5','w-3.5 h-3.5')}M-Pesa: ${o.mpesaRef}</div>`:''}
      ${o.remaining>0?`<div class="mt-3"><div class="flex items-center justify-between text-xs mb-1.5"><span class="text-neutral-500">Prep time</span><span id="countdown-${o.id}" class="text-amber-400 font-bold font-mono">${fTime(o.remaining)}</span></div><div class="h-1.5 bg-neutral-800 rounded-full overflow-hidden"><div id="bar-${o.id}" class="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full countdown-bar" style="width:100%"></div></div></div>`:''}
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800">
        <div><span class="text-lg font-bold">${fKSh(o.total)}</span><p class="text-[10px] text-neutral-600">${gAlt(o.total)}</p></div>
        <button onclick="showReceipt('${o.id}')" class="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 transition"><i data-lucide="receipt" class="w-3.5 h-3.5"></i>Receipt</button>
      </div>
    </div>`).join('');
  lucide.createIcons({nodes:[list]});
}

// ==================== RECEIPT ====================
function showReceipt(oid){
  const o=state.orders.find(x=>x.id===oid);if(!o)return;
  const rc=document.getElementById('receipt-content');
  const qrData=JSON.stringify({id:o.id,name:o.name,total:o.total,status:o.status,mpesaRef:o.mpesaRef||''});
  rc.innerHTML=`
    <div class="text-center mb-6">
      <div class="flex items-center justify-center gap-2 mb-4">
        <div class="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center"><i data-lucide="flag" class="w-5 h-5 text-white"></i></div>
        <div class="w-9 h-9 mpesa-bg rounded-lg flex items-center justify-center">${mpesaIcon.replace('w-5 h-5','w-4 h-4 text-white')}</div>
      </div>
      <h3 class="text-xl font-bold text-[#1a1a1a]">RaceSpectator</h3>
      <p class="text-xs text-neutral-500 mt-1">Official Receipt</p>
    </div>
    <div class="border border-dashed border-neutral-300 rounded-xl p-4 mb-4 space-y-2">
      <div class="flex justify-between text-xs"><span class="text-neutral-500">Order ID</span><span class="font-mono font-bold">${o.id}</span></div>
      <div class="flex justify-between text-xs"><span class="text-neutral-500">Date</span><span>${o.date}</span></div>
      <div class="flex justify-between text-xs"><span class="text-neutral-500">Type</span><span class="capitalize font-semibold">${o.type}</span></div>
      <div class="flex justify-between text-xs"><span class="text-neutral-500">Qty</span><span class="font-bold">${o.qty}</span></div>
      <div class="flex justify-between text-xs"><span class="text-neutral-500">Status</span><span class="capitalize font-semibold text-emerald-600">${o.status}</span></div>
      ${o.mpesaRef?`<div class="flex justify-between text-xs"><span class="text-neutral-500">M-Pesa Ref</span><span class="font-mono font-bold text-green-700">${o.mpesaRef}</span></div>`:''}
    </div>
    <div class="border border-dashed border-neutral-300 rounded-xl p-4 mb-4">
      <p class="text-xs text-neutral-500 mb-1 font-semibold uppercase tracking-wider">Item</p>
      <p class="font-semibold text-sm">${o.name}</p>
      <div class="mt-3 pt-3 border-t border-neutral-200 space-y-1">
        <div class="flex justify-between"><span class="font-bold text-lg text-[#1a1a1a]">${fKSh(o.total)}</span><span class="text-xs text-neutral-400">Paid</span></div>
        <p class="text-[10px] text-neutral-400">${gAlt(o.total)}</p>
      </div>
    </div>
    <div class="text-center mb-4">
      <p class="text-xs text-neutral-500 mb-3">Scan QR at venue</p>
      <div id="qr-${o.id}" class="inline-block bg-white p-3 rounded-xl border border-neutral-200"></div>
    </div>
    <button onclick="window.print()" class="w-full mt-4 bg-[#1a1a1a] text-white py-3 rounded-xl font-semibold text-sm hover:bg-neutral-700 transition flex items-center justify-center gap-2"><i data-lucide="printer" class="w-4 h-4"></i>Print Receipt</button>`;
  openModal('receipt-modal');
  setTimeout(()=>{
    const qrEl=document.getElementById('qr-'+o.id);if(qrEl)qrEl.innerHTML='';
    if(qrEl&&typeof QRCode!=='undefined')new QRCode(qrEl,{text:qrData,width:150,height:150,colorDark:'#1a1a1a',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});
    lucide.createIcons({nodes:[rc]});
  },100);
}

// ==================== WINNERS ====================
function initWinners(){
  winners.forEach((_,i)=>state.winnerPhotoIdx[i]=0);
  const dc=document.getElementById('winner-dots');
  winners.forEach((_,i)=>{const d=document.createElement('button');d.className=`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i===0?'bg-amber-500 w-7':'bg-neutral-700'}`;d.onclick=()=>showWinner(i);dc.appendChild(d)});
  showWinner(0);setInterval(()=>showWinner((state.currentWinnerIdx+1)%winners.length),8000);
}
function showWinner(idx){
  state.currentWinnerIdx=idx;const w=winners[idx],card=document.getElementById('winner-card');
  card.style.opacity='0';card.style.transform='translateY(20px)';
  setTimeout(()=>{
    const hc=w.championships>0;
    card.innerHTML=`<div class="grid md:grid-cols-2 gap-8 items-center">
      <div class="space-y-6">
        <div><span class="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 block">${w.nickname}</span><h3 class="text-4xl md:text-5xl font-bold tracking-tight mb-1">${w.name}</h3><p class="text-neutral-400 flex items-center gap-2 text-sm"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i>${w.country} · ${w.team}</p></div>
        ${hc?`<div class="flex gap-6"><div class="text-center"><p class="text-3xl font-bold">${w.wins}</p><p class="text-xs text-neutral-500 uppercase mt-1">Wins</p></div><div class="w-px bg-neutral-800"></div><div class="text-center"><p class="text-3xl font-bold">${w.podiums}</p><p class="text-xs text-neutral-500 uppercase mt-1">Podiums</p></div><div class="w-px bg-neutral-800"></div><div class="text-center"><p class="text-3xl font-bold text-amber-500">${w.championships}</p><p class="text-xs text-neutral-500 uppercase mt-1">Titles</p></div></div>`:`<div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"><p class="text-amber-400 text-sm font-medium">🏆 Legacy Champion</p></div>`}
        <div class="space-y-4">
          <div><h4 class="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Biography</h4><p class="text-sm text-neutral-300 leading-relaxed">${w.bio}</p></div>
          <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-4"><h4 class="text-xs font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5"><i data-lucide="sparkles" class="w-3 h-3"></i>Did You Know?</h4><p class="text-sm text-neutral-300 leading-relaxed">${w.fact}</p></div>
        </div>
      </div>
      <div><div class="relative rounded-2xl overflow-hidden aspect-[4/5]">
        <div class="flex transition-transform duration-500 ease-out" id="winner-photos" style="transform:translateX(0%)">${w.photos.map(p=>`<div class="winner-photo shrink-0 w-full"><img src="https://picsum.photos/seed/${p}/600/750.jpg" class="w-full h-full object-cover" alt="${w.name}"></div>`).join('')}</div>
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" id="winner-photo-dots">${w.photos.map((_,pi)=>`<button class="w-2 h-2 rounded-full transition-all duration-300 ${pi===0?'bg-white':'bg-white/30'}" onclick="goWinnerPhoto(${idx},${pi})"></button>`).join('')}</div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
        <div class="absolute bottom-12 left-4 right-4"><p class="text-white font-bold text-lg">${w.name}</p><p class="text-white/70 text-sm">${w.nickname}</p></div>
      </div></div>
    </div>`;
    card.style.opacity='1';card.style.transform='translateY(0)';card.style.transition='all .5s ease-out';
    document.querySelectorAll('#winner-dots button').forEach((d,i)=>d.className=`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i===idx?'bg-amber-500 w-7':'bg-neutral-700'}`);
    lucide.createIcons({nodes:[card]});
  },250);
  clearInterval(window._wpTimer);
  window._wpTimer=setInterval(()=>{state.winnerPhotoIdx[idx]=(state.winnerPhotoIdx[idx]+1)%w.photos.length;goWinnerPhoto(idx,state.winnerPhotoIdx[idx])},3000);
}
function goWinnerPhoto(wi,pi){
  state.winnerPhotoIdx[wi]=pi;const c=document.getElementById('winner-photos');if(c)c.style.transform=`translateX(-${pi*100}%)`;
  document.querySelectorAll('#winner-photo-dots button').forEach((d,i)=>d.className=`w-2 h-2 rounded-full transition-all duration-300 ${i===pi?'bg-white':'bg-white/30'}`);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded',()=>{
  lucide.createIcons();initHero();initRaces();initMarketplace();initWinners();renderOrders();
  document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'})})});
});
