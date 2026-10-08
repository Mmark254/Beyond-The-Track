var introImages=[
  'https://picsum.photos/seed/intro-f1/1200/800.jpg',
  'https://picsum.photos/seed/intro-nascar/1200/800.jpg',
  'https://picsum.photos/seed/intro-motogp/1200/800.jpg',
  'https://picsum.photos/seed/intro-rally/1200/800.jpg',
  'https://picsum.photos/seed/intro-super/1200/800.jpg',
  'https://picsum.photos/seed/intro-drift/1200/800.jpg',
  'https://picsum.photos/seed/intro-indy/1200/800.jpg',
  'https://picsum.photos/seed/intro-leman/1200/800.jpg',
  'https://picsum.photos/seed/intro-gt/1200/800.jpg',
  'https://picsum.photos/seed/intro-kart/1200/800.jpg',
  'https://picsum.photos/seed/intro-speed/1200/800.jpg',
  'https://picsum.photos/seed/intro-track/1200/800.jpg'
];

var historyEvents=[
  {year:'1894',title:'Paris-Rouen',desc:'The world\'s first organized motoring competition. 21 drivers left Paris, and Count de Dion completed the 127km route in 6 hours and 48 minutes, averaging just 19 km/h.',side:'left',img:'history1894'},
  {year:'1907',title:'Brooklands Opens',desc:'The world\'s first purpose-built motor racing circuit opened in Surrey, England. Its 4.43km concrete oval set the standard for every track that followed.',side:'right',img:'history1907'},
  {year:'1911',title:'Indianapolis 500',desc:'The inaugural Indy 500 at "The Brickyard," originally paved with 3.2 million bricks. Ray Harroun won with an average speed of 120 km/h.',side:'left',img:'history1911'},
  {year:'1923',title:'24 Hours of Le Mans',desc:'The first Le Mans pushed limits of man and machine — racing for endurance over an entire day and night, testing reliability over raw speed.',side:'right',img:'history1923'},
  {year:'1929',title:'Monaco Grand Prix',desc:'Racing through the narrow streets of Monte Carlo became the most glamorous and technically demanding circuit in Formula 1. The crown jewel of motorsport.',side:'left',img:'history1929'},
  {year:'1950',title:'Formula 1 Championship',desc:'The first official F1 World Championship at Silverstone. Giuseppe Farina won the inaugural title, and a new era of global motorsport began.',side:'right',img:'history1950'},
  {year:'1967',title:'The Green Hell',desc:'Jackie Stewart called the Nürburgring Nordschleife "The Green Hell" — 20.8km of forest, elevation changes, and blind corners. The longest F1 circuit ever.',side:'left',img:'history1967'},
  {year:'1994',title:'Senna\'s Legacy',desc:'Ayrton Senna\'s tragic accident at Imola led to the most comprehensive safety revolution — HANS devices, safer barriers, and redesigned circuits worldwide.',side:'right',img:'history1994'},
  {year:'2025',title:'Beyond The Track',desc:'A unified platform launches — connecting racers, spectators, and vendors under one roof. Pure motorsport, accessible to everyone, everywhere.',side:'left',img:'history2025'}
];

var selectedCat='',heroIdx=0,authSlideIdx=0,authSlideTimer=null;

// Function to redirect to specific portal pages (Update these URLs with your actual dashboard links)
function redirectToPortal(category) {
    if (category === 'racer') {
        window.location.href = 'racer_dashboard.php'; // Update with your actual racer dashboard URL
    } else if (category === 'spectator') {
        window.location.href = 'spectator_dashboard.php'; // Update with your actual spectator dashboard URL
    } else if (category === 'vendor') {
        window.location.href = 'vendor_dashboard.php'; // Update with your actual vendor dashboard URL
    }
}

(function(){
  var overlay=document.getElementById('intro-overlay');
  var montage=document.getElementById('intro-montage');
  var flash=document.getElementById('intro-flash');
  var sweep=document.getElementById('intro-sweep');
  var textEl=document.getElementById('intro-text');
  var beyond=document.getElementById('intro-beyond');
  var trackText=document.getElementById('intro-track-text');
  var line=document.getElementById('intro-line');
  var tagline=document.getElementById('intro-tagline');

  montage.style.backgroundImage='url('+introImages[0]+')';

  var idx=0;
  var p1=setInterval(function(){
    if(idx>=introImages.length){
      clearInterval(p1);
      montage.style.opacity='0';

      setTimeout(function(){
        sweep.classList.add('intro-sweep-anim');
        setTimeout(function(){
          sweep.style.opacity='0';
          setTimeout(function(){

            textEl.style.opacity='1';
            beyond.classList.add('intro-slam','intro-glow');
            overlay.classList.add('intro-shake');
            setTimeout(function(){overlay.classList.remove('intro-shake')},200);

            setTimeout(function(){
              line.classList.add('intro-line-anim');
              trackText.classList.add('intro-track');

              setTimeout(function(){
                tagline.style.transition='opacity .6s ease';
                tagline.style.opacity='1';

                setTimeout(function(){
                  overlay.style.transition='opacity .7s ease';
                  overlay.style.opacity='0';
                  setTimeout(function(){
                    overlay.style.display='none';
                    document.body.style.overflow='auto';
                    document.body.style.overflowX='hidden';
                    afterIntro();
                  },700);
                },800);
              },500);
            },400);
          },600);
        },300);
      },300);
      return;
    }
    montage.style.backgroundImage='url('+introImages[idx]+')';
    if(idx%4===0&&idx>0){
      flash.classList.add('intro-flash-anim');
      setTimeout(function(){flash.classList.remove('intro-flash-anim')},150);
    }
    idx++;
  },190);
})();

function afterIntro(){
  fetch('check_session.php')
    .then(function(response){ return response.json(); })
    .then(function(data){
      if(data.logged_in){
        showApp(data.user);
      } else {
        document.getElementById('auth-screen').style.display='block';
        startAuthSlideshow();
      }
    })
    .catch(function(){
      document.getElementById('auth-screen').style.display='block';
      startAuthSlideshow();
    });
}

function replayIntro(){location.reload()}

function startAuthSlideshow(){
  var slides=document.querySelectorAll('.auth-slide');
  var dotsC=document.getElementById('auth-slide-dots');
  if(!slides.length)return;
  if(dotsC.children.length)return;
  for(var i=0;i<slides.length;i++){
    (function(i){
      var d=document.createElement('button');
      d.className='w-2 h-2 rounded-full transition-all duration-300 '+(i===0?'bg-white w-6':'bg-white/30');
      d.onclick=function(){goAuthSlide(i)};
      dotsC.appendChild(d);
    })(i);
  }
  authSlideTimer=setInterval(function(){goAuthSlide((authSlideIdx+1)%slides.length)},4000);
}

function goAuthSlide(i){
  var sl=document.querySelectorAll('.auth-slide');
  var dt=document.querySelectorAll('#auth-slide-dots button');
  sl[authSlideIdx].classList.remove('active');
  dt[authSlideIdx].className='w-2 h-2 rounded-full transition-all duration-300 bg-white/30';
  authSlideIdx=i;
  sl[authSlideIdx].classList.add('active');
  dt[authSlideIdx].className='w-2 h-2 rounded-full transition-all duration-300 bg-white w-6';
}

function switchAuthTab(tab){
  var isL=tab==='login';
  document.getElementById('tab-login').className=(isL?'auth-tab-active ':'')+'flex-1 text-sm font-semibold py-2.5 rounded-lg border border-transparent transition-all duration-200'+(isL?'':' text-neutral-500');
  document.getElementById('tab-signup').className=(!isL?'auth-tab-active ':'')+'flex-1 text-sm font-semibold py-2.5 rounded-lg border border-transparent transition-all duration-200'+(!isL?'':' text-neutral-500');
  document.getElementById('login-form').style.display=isL?'block':'none';
  document.getElementById('signup-form').style.display=isL?'none':'block';
  clearErrors();
}

function clearErrors(){
  var errs=document.querySelectorAll('.field-error');
  for(var i=0;i<errs.length;i++)errs[i].classList.remove('field-error');
  var errTexts=document.querySelectorAll('.field-error-text');
  for(var j=0;j<errTexts.length;j++)errTexts[j].classList.remove('show');
}

function showFieldError(id,msg){
  var inp=document.getElementById(id);
  var txt=document.getElementById(id+'-err');
  if(inp)inp.classList.add('field-error');
  if(txt){if(msg)txt.textContent=msg;txt.classList.add('show')}
}

function togglePw(id,btn){
  var inp=document.getElementById(id);
  var isP=inp.type==='password';
  inp.type=isP?'text':'password';
  btn.innerHTML='<i data-lucide="'+(isP?'eye-off':'eye')+'" class="w-4 h-4"></i>';
  lucide.createIcons({nodes:[btn]});
}

function checkPwStrength(){
  var pw=document.getElementById('su-pass').value;
  var bar=document.getElementById('pw-bar');
  var label=document.getElementById('pw-label');
  var s=0;
  if(pw.length>=6)s++;
  if(pw.length>=8)s++;
  if(/[A-Z]/.test(pw)&&/[a-z]/.test(pw))s++;
  if(/\d/.test(pw))s++;
  if(/[^A-Za-z0-9]/.test(pw))s++;
  bar.className='h-full rounded-full transition-all duration-300';
  if(s<=1){bar.classList.add('pw-weak');label.textContent='Weak';label.style.color='#f87171'}
  else if(s<=3){bar.classList.add('pw-medium');label.textContent='Medium';label.style.color='#fbbf24'}
  else{bar.classList.add('pw-strong');label.textContent='Strong';label.style.color='#4ade80'}
  if(!pw){bar.style.width='0';label.textContent=''}
}

function selectCat(cat){
  selectedCat=cat;
  document.getElementById('su-cat').value=cat;
  var cards=document.querySelectorAll('.cat-card');
  for(var i=0;i<cards.length;i++){cards[i].classList.toggle('selected',cards[i].dataset.cat===cat)}
  lucide.createIcons();
}

function handleLogin(e){
  e.preventDefault();
  clearErrors();
  var email=document.getElementById('li-email').value.trim();
  var pass=document.getElementById('li-pass').value;
  var v=true;
  if(!email){showFieldError('li-email','Email is required');v=false}
  if(!pass){showFieldError('li-pass','Password is required');v=false}
  if(!v)return;

  var submitBtn=e.target.querySelector('button[type="submit"]');
  var originalText=submitBtn.innerHTML;
  submitBtn.innerHTML='<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Logging in...';
  submitBtn.disabled=true;
  lucide.createIcons();

  fetch('login.php',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email:email,password:pass})
  })
  .then(function(r){return r.json()})
  .then(function(data){
    submitBtn.innerHTML=originalText;
    submitBtn.disabled=false;
    lucide.createIcons();
    if(data.success){
      if(authSlideTimer)clearInterval(authSlideTimer);
      document.getElementById('auth-screen').style.display='none';
      showToast(data.message,'success');
      showApp(data.user);
      // Redirect based on user category after successful login
      if(data.redirect){
        setTimeout(function(){
          window.location.href = data.redirect;
        }, 1500);
      }
    } else {
      showToast(data.message,'error');
      if(data.message.includes('Email not found'))showFieldError('li-email',data.message);
      else if(data.message.includes('Incorrect password'))showFieldError('li-pass',data.message);
    }
  })
  .catch(function(error){
    submitBtn.innerHTML=originalText;
    submitBtn.disabled=false;
    lucide.createIcons();
    showToast('Connection error. Please try again.','error');
  });
}

function handleSignup(e){
  e.preventDefault();
  clearErrors();
  var fn=document.getElementById('su-fname').value.trim();
  var ln=document.getElementById('su-lname').value.trim();
  var em=document.getElementById('su-email').value.trim();
  var pw=document.getElementById('su-pass').value;
  var pw2=document.getElementById('su-pass2').value;
  var cat=document.getElementById('su-cat').value;
  var v=true;
  if(!fn){showFieldError('su-fname');v=false}
  if(!ln){showFieldError('su-lname');v=false}
  if(!em||!/\S+@\S+\.\S+/.test(em)){showFieldError('su-email','Valid email required');v=false}
  if(pw.length<8){showFieldError('su-pass','Min 8 characters');v=false}
  if(pw!==pw2){showFieldError('su-pass2','Passwords don\'t match');v=false}
  if(!cat){showFieldError('su-cat','Please select a category');v=false}
  if(!v)return;

  var submitBtn=e.target.querySelector('button[type="submit"]');
  var originalText=submitBtn.innerHTML;
  submitBtn.innerHTML='<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Creating account...';
  submitBtn.disabled=true;
  lucide.createIcons();

  fetch('register.php',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({firstName:fn,lastName:ln,email:em,password:pw,category:cat})
  })
  .then(function(r){return r.json()})
  .then(function(data){
    submitBtn.innerHTML=originalText;
    submitBtn.disabled=false;
    lucide.createIcons();
    if(data.success){
      if(authSlideTimer)clearInterval(authSlideTimer);
      document.getElementById('auth-screen').style.display='none';
      showToast(data.message,'success');
      showApp(data.user);
      // Redirect to appropriate dashboard after registration
      var redirectUrl = '';
      if(data.user.category === 'racer') redirectUrl = 'racer_dashboard.php';
      else if(data.user.category === 'spectator') redirectUrl = 'spectator_dashboard.php';
      else if(data.user.category === 'vendor') redirectUrl = 'vendor_dashboard.php';
      
      setTimeout(function(){
        window.location.href = redirectUrl;
      }, 1500);
    } else {
      showToast(data.message,'error');
      if(data.message.includes('Email already registered'))showFieldError('su-email',data.message);
    }
  })
  .catch(function(error){
    submitBtn.innerHTML=originalText;
    submitBtn.disabled=false;
    lucide.createIcons();
    showToast('Connection error. Please try again.','error');
  });
}

function handleLogout(){
  fetch('logout.php',{method:'POST',headers:{'Content-Type':'application/json'}})
  .then(function(){
    document.getElementById('main-app').style.display='none';
    document.getElementById('auth-screen').style.display='block';
    switchAuthTab('login');
    document.getElementById('li-email').value='';
    document.getElementById('li-pass').value='';
    startAuthSlideshow();
    showToast('Logged out successfully.','info');
  })
  .catch(function(){
    showToast('Error logging out.','error');
  });
}

function showApp(user){
  var cc={racer:'#f59e0b',spectator:'#dc2626',vendor:'#22c55e'};
  var cl={racer:'Racer',spectator:'Spectator',vendor:'Vendor'};
  document.getElementById('user-dot').style.background=cc[user.category]||'#dc2626';
  document.getElementById('user-display').textContent=user.firstName+' '+user.lastName[0]+'. \u00B7 '+cl[user.category];
  document.getElementById('hero-name').textContent=user.firstName;
  document.getElementById('hero-role-badge').textContent=cl[user.category];
  document.getElementById('hero-role-badge').style.background=cc[user.category];
  var cards=document.querySelectorAll('.portal-card');
  for(var i=0;i<cards.length;i++)cards[i].style.opacity='0.5';
  var pm={racer:1,spectator:0,vendor:2};
  if(cards[pm[user.category]])cards[pm[user.category]].style.opacity='1';
  document.getElementById('main-app').style.display='block';
  initHeroSlideshow();initHistoryTimeline();initCounters();lucide.createIcons();
  setTimeout(function(){
    var links=document.querySelectorAll('#main-app a[href^="#"]');
    for(var i=0;i<links.length;i++){
      links[i].addEventListener('click',function(e){
        e.preventDefault();
        var t=document.querySelector(this.getAttribute('href'));
        if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
      });
    }
  },100);
}

function initHeroSlideshow(){
  var sl=document.querySelectorAll('.hero-slide');
  var dc=document.getElementById('hero-dots');
  if(dc.children.length)return;
  for(var i=0;i<sl.length;i++){
    (function(i){
      var d=document.createElement('button');
      d.className='w-2 h-2 rounded-full transition-all duration-300 '+(i===0?'bg-white w-6':'bg-white/30');
      d.onclick=function(){goHero(i)};
      dc.appendChild(d);
    })(i);
  }
  setInterval(function(){goHero((heroIdx+1)%sl.length)},5000);
}

function goHero(i){
  var sl=document.querySelectorAll('.hero-slide');
  var dt=document.querySelectorAll('#hero-dots button');
  sl[heroIdx].classList.remove('active');
  dt[heroIdx].className='w-2 h-2 rounded-full transition-all duration-300 bg-white/30';
  heroIdx=i;
  sl[heroIdx].classList.add('active');
  dt[heroIdx].className='w-2 h-2 rounded-full transition-all duration-300 bg-white w-6';
}

function initHistoryTimeline(){
  var tl=document.getElementById('history-timeline');
  if(tl.children.length)return;
  var html='';
  for(var i=0;i<historyEvents.length;i++){
    var ev=historyEvents[i];
    html+='<div class="relative flex items-start gap-6 md:gap-0 '+(ev.side==='right'?'md:flex-row-reverse':'')+'" style="animation:fade-in .6s ease-out '+(i*0.1)+'s both">';
    html+='<div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 z-10"><div class="history-dot"></div></div>';
    html+='<div class="ml-14 md:ml-0 md:w-[calc(50%-2rem)] '+(ev.side==='right'?'md:text-right md:pr-8':'md:pl-8')+'">';
    html+='<div class="inline-block bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-3" style="font-family:\'Oswald\',sans-serif">'+ev.year+'</div>';
    html+='<h3 class="text-xl font-bold mb-2" style="font-family:\'Oswald\',sans-serif">'+ev.title+'</h3>';
    html+='<p class="text-sm text-neutral-400 leading-relaxed" style="font-family:\'Barlow\',sans-serif">'+ev.desc+'</p>';
    html+='</div>';
    html+='<div class="hidden md:block md:w-[calc(50%-2rem)] '+(ev.side==='right'?'md:pl-8':'md:pr-8 md:text-right')+'">';
    html+='<div class="rounded-xl overflow-hidden border border-neutral-800"><img src="https://picsum.photos/seed/'+ev.img+'/500/300.jpg" class="w-full h-40 object-cover" alt="'+ev.title+'" loading="lazy"></div>';
    html+='</div></div>';
  }
  tl.innerHTML=html;
}

function initCounters(){
  var obs=new IntersectionObserver(function(entries){
    for(var e=0;e<entries.length;e++){
      if(entries[e].isIntersecting){
        var el=entries[e].target;
        var target=parseInt(el.dataset.count);
        var cur=0;
        var step=Math.max(1,Math.floor(target/60));
        var iv=setInterval(function(){
          cur+=step;
          if(cur>=target){cur=target;clearInterval(iv)}
          el.textContent=cur>=1000?(cur/1000).toFixed(cur>=target?0:1)+'K+':cur+'+';
          if(target<100)el.textContent=cur+'+';
        },25);
        obs.unobserve(el);
      }
    }
  },{threshold:0.5});
  var counters=document.querySelectorAll('[data-count]');
  for(var i=0;i<counters.length;i++)obs.observe(counters[i]);
}

function showToast(msg,type){
  type=type||'info';
  var c=document.getElementById('toast-container');
  var cls={info:'bg-blue-600',success:'bg-emerald-600',error:'bg-red-600',warning:'bg-amber-600'};
  var ics={info:'info',success:'check-circle-2',error:'alert-circle',warning:'alert-triangle'};
  var t=document.createElement('div');
  t.className='animate-fade-in flex items-center gap-3 '+(cls[type]||cls.info)+' text-white px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium min-w-[280px]';
  t.innerHTML='<i data-lucide="'+(ics[type]||ics.info)+'" class="w-4 h-4 shrink-0"></i><span>'+msg+'</span>';
  c.appendChild(t);
  lucide.createIcons({nodes:[t]});
  setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(function(){t.remove()},300)},3500);
}

document.addEventListener('DOMContentLoaded',function(){
  lucide.createIcons();
});
