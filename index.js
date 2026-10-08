var introImages = [
  'images/img2.jpeg',
  'images/img3.jpeg',
  'images/img5.jpeg',
  'images/img6.jpeg',
  'images/img7.jpeg',
  'images/img9.jpeg',
  'images/img10.jpeg',
  'images/img18.jpeg',
  'images/img19.jpeg',
  'images/img20.jpeg',
  'images/img21.jpeg',
  'images/img22.jpeg'
];

var selectedCat = '';
var authSlideIdx = 0;
var authSlideTimer = null;

// Intro Animation
(function(){
  var overlay = document.getElementById('intro-overlay');
  var montage = document.getElementById('intro-montage');
  var flash = document.getElementById('intro-flash');
  var sweep = document.getElementById('intro-sweep');
  var textEl = document.getElementById('intro-text');
  var beyond = document.getElementById('intro-beyond');
  var trackText = document.getElementById('intro-track-text');
  var line = document.getElementById('intro-line');
  var tagline = document.getElementById('intro-tagline');

  montage.style.backgroundImage = 'url(' + introImages[0] + ')';

  var idx = 0;
  var p1 = setInterval(function(){
    if(idx >= introImages.length){
      clearInterval(p1);
      montage.style.opacity = '0';

      setTimeout(function(){
        sweep.classList.add('intro-sweep-anim');
        setTimeout(function(){
          sweep.style.opacity = '0';
          setTimeout(function(){
            textEl.style.opacity = '1';
            beyond.classList.add('intro-slam', 'intro-glow');
            overlay.classList.add('intro-shake');
            setTimeout(function(){ overlay.classList.remove('intro-shake'); }, 200);

            setTimeout(function(){
              line.classList.add('intro-line-anim');
              trackText.classList.add('intro-track');

              setTimeout(function(){
                tagline.style.transition = 'opacity .6s ease';
                tagline.style.opacity = '1';

                setTimeout(function(){
                  overlay.style.transition = 'opacity .7s ease';
                  overlay.style.opacity = '0';
                  setTimeout(function(){
                    overlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    document.getElementById('auth-screen').style.display = 'block';
                    startAuthSlideshow();
                  }, 700);
                }, 800);
              }, 500);
            }, 400);
          }, 600);
        }, 300);
      }, 300);
      return;
    }
    montage.style.backgroundImage = 'url(' + introImages[idx] + ')';
    if(idx % 4 === 0 && idx > 0){
      flash.classList.add('intro-flash-anim');
      setTimeout(function(){ flash.classList.remove('intro-flash-anim'); }, 150);
    }
    idx++;
  }, 190);
})();

function startAuthSlideshow(){
  var slides = document.querySelectorAll('.auth-slide');
  var dotsC = document.getElementById('auth-slide-dots');
  if(!slides.length) return;
  if(dotsC.children.length) return;
  for(var i = 0; i < slides.length; i++){
    (function(i){
      var d = document.createElement('button');
      d.className = 'w-2 h-2 rounded-full transition-all duration-300 ' + (i === 0 ? 'bg-white w-6' : 'bg-white/30');
      d.onclick = function(){ goAuthSlide(i); };
      dotsC.appendChild(d);
    })(i);
  }
  authSlideTimer = setInterval(function(){ goAuthSlide((authSlideIdx + 1) % slides.length); }, 4000);
}

function goAuthSlide(i){
  var sl = document.querySelectorAll('.auth-slide');
  var dt = document.querySelectorAll('#auth-slide-dots button');
  sl[authSlideIdx].classList.remove('active');
  dt[authSlideIdx].className = 'w-2 h-2 rounded-full transition-all duration-300 bg-white/30';
  authSlideIdx = i;
  sl[authSlideIdx].classList.add('active');
  dt[authSlideIdx].className = 'w-2 h-2 rounded-full transition-all duration-300 bg-white w-6';
}

function switchAuthTab(tab){
  var isL = tab === 'login';
  document.getElementById('tab-login').className = (isL ? 'auth-tab-active ' : '') + 'flex-1 text-sm font-semibold py-2.5 rounded-lg border border-transparent transition-all duration-200' + (isL ? '' : ' text-neutral-500');
  document.getElementById('tab-signup').className = (!isL ? 'auth-tab-active ' : '') + 'flex-1 text-sm font-semibold py-2.5 rounded-lg border border-transparent transition-all duration-200' + (!isL ? '' : ' text-neutral-500');
  document.getElementById('login-form').style.display = isL ? 'block' : 'none';
  document.getElementById('signup-form').style.display = isL ? 'none' : 'block';
  clearErrors();
}

function clearErrors(){
  var errs = document.querySelectorAll('.field-error');
  for(var i = 0; i < errs.length; i++) errs[i].classList.remove('field-error');
  var errTexts = document.querySelectorAll('.field-error-text');
  for(var j = 0; j < errTexts.length; j++) errTexts[j].classList.remove('show');
}

function showFieldError(id, msg){
  var inp = document.getElementById(id);
  var txt = document.getElementById(id + '-err');
  if(inp) inp.classList.add('field-error');
  if(txt){ if(msg) txt.textContent = msg; txt.classList.add('show'); }
}

function togglePw(id, btn){
  var inp = document.getElementById(id);
  var isP = inp.type === 'password';
  inp.type = isP ? 'text' : 'password';
  btn.innerHTML = '<i data-lucide="' + (isP ? 'eye-off' : 'eye') + '" class="w-4 h-4"></i>';
  lucide.createIcons({nodes: [btn]});
}

function checkPwStrength(){
  var pw = document.getElementById('su-pass').value;
  var bar = document.getElementById('pw-bar');
  var label = document.getElementById('pw-label');
  var s = 0;
  if(pw.length >= 6) s++;
  if(pw.length >= 8) s++;
  if(/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if(/\d/.test(pw)) s++;
  if(/[^A-Za-z0-9]/.test(pw)) s++;
  bar.className = 'h-full rounded-full transition-all duration-300';
  if(s <= 1){ bar.classList.add('pw-weak'); label.textContent = 'Weak'; label.style.color = '#f87171'; }
  else if(s <= 3){ bar.classList.add('pw-medium'); label.textContent = 'Medium'; label.style.color = '#fbbf24'; }
  else{ bar.classList.add('pw-strong'); label.textContent = 'Strong'; label.style.color = '#4ade80'; }
  if(!pw){ bar.style.width = '0'; label.textContent = ''; }
}

function selectCat(cat){
  selectedCat = cat;
  document.getElementById('su-cat').value = cat;
  var cards = document.querySelectorAll('.cat-card');
  for(var i = 0; i < cards.length; i++){ cards[i].classList.toggle('selected', cards[i].dataset.cat === cat); }
  lucide.createIcons();
}

function handleLogin(e){
  e.preventDefault();
  clearErrors();
  var email = document.getElementById('li-email').value.trim();
  var pass = document.getElementById('li-pass').value;
  var v = true;
  if(!email){ showFieldError('li-email', 'Email is required'); v = false; }
  if(!pass){ showFieldError('li-pass', 'Password is required'); v = false; }
  if(!v) return;

  var submitBtn = e.target.querySelector('button[type="submit"]');
  var originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Logging in...';
  submitBtn.disabled = true;
  lucide.createIcons();

  fetch('login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: pass })
  })
  .then(function(r){ return r.json(); })
  .then(function(data){
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    lucide.createIcons();
    if(data.success){
      if(authSlideTimer) clearInterval(authSlideTimer);
      showToast(data.message, 'success');
      window.location.href = data.redirect;
    } else {
      showToast(data.message, 'error');
      if(data.message.includes('Email not found')) showFieldError('li-email', data.message);
      else if(data.message.includes('Incorrect password')) showFieldError('li-pass', data.message);
    }
  })
  .catch(function(error){
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    lucide.createIcons();
    showToast('Connection error. Please try again.', 'error');
  });
}

function handleSignup(e){
  e.preventDefault();
  clearErrors();
  var fn = document.getElementById('su-fname').value.trim();
  var ln = document.getElementById('su-lname').value.trim();
  var em = document.getElementById('su-email').value.trim();
  var pw = document.getElementById('su-pass').value;
  var pw2 = document.getElementById('su-pass2').value;
  var cat = document.getElementById('su-cat').value;
  var v = true;
  if(!fn){ showFieldError('su-fname'); v = false; }
  if(!ln){ showFieldError('su-lname'); v = false; }
  if(!em || !/\S+@\S+\.\S+/.test(em)){ showFieldError('su-email', 'Valid email required'); v = false; }
  if(pw.length < 8){ showFieldError('su-pass', 'Min 8 characters'); v = false; }
  if(pw !== pw2){ showFieldError('su-pass2', 'Passwords don\'t match'); v = false; }
  if(!cat){ showFieldError('su-cat', 'Please select a category'); v = false; }
  if(!v) return;

  var submitBtn = e.target.querySelector('button[type="submit"]');
  var originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Creating account...';
  submitBtn.disabled = true;
  lucide.createIcons();

  fetch('register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName: fn, lastName: ln, email: em, password: pw, category: cat })
  })
  .then(function(r){ return r.json(); })
  .then(function(data){
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    lucide.createIcons();
    if(data.success){
      if(authSlideTimer) clearInterval(authSlideTimer);
      showToast(data.message, 'success');
      var redirectUrl = '';
      if(data.user.category === 'racer') redirectUrl = 'racer.html';
      else if(data.user.category === 'spectator') redirectUrl = 'spectators.html';
      else if(data.user.category === 'vendor') redirectUrl = 'vendors.html';
      
      setTimeout(function(){
        window.location.href = redirectUrl;
      }, 1500);
    } else {
      showToast(data.message, 'error');
      if(data.message.includes('Email already registered')) showFieldError('su-email', data.message);
    }
  })
  .catch(function(error){
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    lucide.createIcons();
    showToast('Connection error. Please try again.', 'error');
  });
}

function showToast(msg, type){
  type = type || 'info';
  var c = document.getElementById('toast-container');
  var cls = { info: 'bg-blue-600', success: 'bg-emerald-600', error: 'bg-red-600', warning: 'bg-amber-600' };
  var ics = { info: 'info', success: 'check-circle-2', error: 'alert-circle', warning: 'alert-triangle' };
  var t = document.createElement('div');
  t.className = 'animate-fade-in flex items-center gap-3 ' + (cls[type] || cls.info) + ' text-white px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium min-w-[280px]';
  t.innerHTML = '<i data-lucide="' + (ics[type] || ics.info) + '" class="w-4 h-4 shrink-0"></i><span>' + msg + '</span>';
  c.appendChild(t);
  lucide.createIcons({nodes: [t]});
  setTimeout(function(){ t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(function(){ t.remove(); }, 300); }, 3500);
}

document.addEventListener('DOMContentLoaded', function(){
  lucide.createIcons();
});
