  // کمک‌تابع‌ها
    const $$  = (s, r = document) => r.querySelector(s);
    const $$$ = (s, r = document) => r.querySelectorAll(s);

    // تبدیل امروز میلادی به جلالی (fallback)
    function getJTodayFallback(sep='/'){
      const g=new Date();
      const gdm=[0,31,((g.getFullYear()%4===0&&g.getFullYear()%100!==0)||g.getFullYear()%400===0)?29:28,31,30,31,30,31,31,30,31,30,31];
      let gy=g.getFullYear(), gm=g.getMonth()+1, gd=g.getDate();
      let gy2=gy-1600, gm2=gm-1, gd2=gd-1;
      let gdn=365*gy2+Math.floor((gy2+3)/4)-Math.floor((gy2+99)/100)+Math.floor((gy2+399)/400);
      for(let i=0;i<gm2;++i) gdn+=gdm[i+1];
      gdn+=gd2; let jdn=gdn-79; const jnp=Math.floor(jdn/12053); jdn%=12053;
      let jy=979+33*jnp+4*Math.floor(jdn/1461); jdn%=1461;
      if(jdn>=366){ jy+=Math.floor((jdn-366)/365); jdn=(jdn-366)%365; }
      const jm=(jdn<186)?1+Math.floor(jdn/31):7+Math.floor((jdn-186)/30);
      const jd=1+((jdn<186)?(jdn%31):((jdn-186)%30));
      const pad=n=>(n<10?'0':'')+n;
      return `${jy}${sep}${pad(jm)}${sep}${pad(jd)}`;
    }

    document.addEventListener('DOMContentLoaded', function(){
      // particles (اختیاری)
      if (typeof particlesJS === 'function') {
        particlesJS('particles-js',{
          particles:{ number:{value:80,density:{enable:true,value_area:800}},
            color:{value:'#6c5ce7'}, shape:{type:'circle'},
            opacity:{value:.5,random:true}, size:{value:3,random:true},
            line_linked:{enable:true,distance:150,color:'#48dbfb',opacity:.4,width:1},
            move:{enable:true,speed:3} },
          interactivity:{ events:{onhover:{enable:true,mode:'grab'},onclick:{enable:true,mode:'push'}},
            modes:{grab:{distance:140,line_linked:{opacity:.6}}}}, retina_detect:true
        });
      }

      // حفظ انتخاب مرکز
      const sel=$$('#hs-center-select');
      if (sel){
        const saved=localStorage.getItem('hs-selected-center');
        if(saved) sel.value=saved;
        sel.addEventListener('change',()=>localStorage.setItem('hs-selected-center',sel.value));
      }

      // شروع دیت‌پیکر (استاندارد و پایدار)
      const dateInput = $$('#hs-login-date');

      // اگر نسخه/فایل جلالی درست لود شده باشد:
      if (typeof jalaliDatepicker !== 'undefined' && dateInput) {
        // هر ورودی با data-jdp را مشاهده می‌کند
        jalaliDatepicker.startWatch({
          minDate: "today",
          showTodayBtn: true,
          autoHide: true,
          time: false,
          date: true,
        });

        // مقدار پیش‌فرض: امروز
        if (!dateInput.value) {
          if (typeof jalaliDatepicker.getJalaliDate === 'function') {
            dateInput.value = jalaliDatepicker.getJalaliDate(new Date(), '/');
          } else {
            dateInput.value = getJTodayFallback('/');
          }
        }

        // باز شدن قطعی روی فوکِس/کلیک (بدون optionهای غیررسمی)
        const open = () => {
          try { jalaliDatepicker.show(dateInput); }
          catch(e){ /* اگر نسخه متد show نداشت، کلیک مصنوعی کار می‌کند */ 
            dateInput.dispatchEvent(new MouseEvent('click',{bubbles:true}));
          }
        };
        dateInput.addEventListener('focus', open);
        dateInput.addEventListener('click', open);

        // کلیک روی آیکن هم بازش کند
        const icon = dateInput.closest('.hs-input-group')?.querySelector('i');
        if (icon){ icon.style.cursor='pointer'; icon.addEventListener('click', open); }

        // جلوگیری از تایپ دستی
        dateInput.addEventListener('keydown', e=> e.preventDefault());
      } else {
        // اگر اسکریپت جلالی لود نشد، مقدار fallback بده
        if (dateInput && !dateInput.value) dateInput.value = getJTodayFallback('/');
        console.error('jalaliDatepicker not found. Check CDN/file path.');
      }

      // ولیدیشن فرم
      const form = $$('#hs-login-form');
      if (form){
        form.addEventListener('submit',(e)=>{
          e.preventDefault();
          const center=$$('#hs-center-select');
          const code=$$('#hs-code');
          const pass=$$('#hs-password');
          const date=$$('#hs-login-date');
          const errs=[];
          if(!center.value) errs.push('مرکز را انتخاب کنید.');
          if(!/^\d{4,8}$/.test((code.value||'').trim())) errs.push('کد باید ۴ تا ۸ رقم باشد.');
          if(!pass.value) errs.push('رمز عبور را وارد کنید.');
          if(!date.value) errs.push('تاریخ را انتخاب کنید.');
          if(errs.length){ alert(errs.join('\n')); return; }
          alert('ورود با موفقیت شبیه‌سازی شد ✅');
        });
      }
    });