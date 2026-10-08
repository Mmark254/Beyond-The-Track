var introImages=[
  'images/img1.jpeg',
  'img1.img.jpeg',
  'img2.img.jpeg',
  'img3.img.jpeg',
  'img4.img.jpeg',
  'img5.img.jpeg',
  'img6.img.jpeg',
  'img7.img.jpeg',
  'img8.img.jpeg',
  'img9.img.jpeg',
  'img10.img.jpeg',
  'img11.img.jpeg'
];

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
