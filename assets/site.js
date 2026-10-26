// ===== NAV =====
const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>nav.classList.toggle('sc',scrollY>50),{passive:true});
const hbg=document.getElementById('hbg'),mnn=document.getElementById('mnn'),mno=document.getElementById('mno'),mnc=document.getElementById('mnc');
function oNav(){mnn.classList.add('op');mno.classList.add('op');document.body.style.overflow='hidden'}
function cNav(){mnn.classList.remove('op');mno.classList.remove('op');document.body.style.overflow=''}
hbg.addEventListener('click',oNav);hbg.addEventListener('keydown',e=>e.key==='Enter'&&oNav());
mnc.addEventListener('click',cNav);mno.addEventListener('click',cNav);
mnn.querySelectorAll('a').forEach(a=>a.addEventListener('click',cNav));

// ===== SMOOTH SCROLL for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(!href||href==='#')return;
    const t=document.querySelector(href);
    if(t){
      e.preventDefault();
      const nh=document.getElementById('mainNav')?.offsetHeight||72;
      const extraGap=window.innerWidth<=640?20:24;
      const targetPos=t.getBoundingClientRect().top+window.pageYOffset-nh-extraGap;
      window.scrollTo({top:Math.max(0,targetPos),behavior:'smooth'});
    }
  });
});

// ===== SCROLL REVEAL =====
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vi')}}),{threshold:.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

// ===== HERO COUNTER ANIMATION =====
function animateCounters(){
  document.querySelectorAll('.counter').forEach(c=>{
    const target=parseInt(c.dataset.target);
    if(isNaN(target))return;
    const duration=2000;
    const start=performance.now();
    function tick(now){
      const elapsed=now-start;
      const progress=Math.min(elapsed/duration,1);
      const eased=progress===1?1:1-Math.pow(2,-10*progress)*Math.cos((progress*10-0.75)*((2*Math.PI)/3));
      c.textContent=Math.round(target*eased)+'+';
      c.style.transform=`scale(${1+0.05*(1-progress)})`;
      if(progress<1)requestAnimationFrame(tick);
      else{c.textContent=target+'+';c.style.transform='scale(1)'}
    }
    requestAnimationFrame(tick);
  });
}
const heroObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){animateCounters();heroObs.disconnect()}})},{threshold:.3});
const heroEl=document.getElementById('home');
if(heroEl)heroObs.observe(heroEl);

// ===== HERO PARTICLE SYSTEM =====
(function(){
  const pc=document.getElementById('hParticles');
  if(!pc)return;
  for(let i=0;i<20;i++){
    const p=document.createElement('div');
    p.className='h-particle';
    p.style.left=Math.random()*100+'%';
    p.style.top=Math.random()*100+'%';
    p.style.width=(1+Math.random()*2)+'px';
    p.style.height=p.style.width;
    p.style.animationDuration=(8+Math.random()*12)+'s';
    p.style.animationDelay=Math.random()*8+'s';
    p.style.opacity=0.1+Math.random()*0.3;
    pc.appendChild(p);
  }
})();

// ===== HERO PIPELINE ANIMATION =====
let pipeStep=0;const pipeNodes=document.querySelectorAll('.pipe-node');
function animPipe(){pipeNodes.forEach((n,i)=>{n.classList.toggle('active',i<=pipeStep)});pipeStep=(pipeStep+1)%pipeNodes.length}
setInterval(animPipe,1800);

// ===== LAYER ANIMATION =====
const layerObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const layers=e.target.querySelectorAll('.layer');layers.forEach((l,i)=>{setTimeout(()=>l.classList.add('vis'),i*200)})}})},{threshold:.2});
const lv=document.getElementById('layerVis');if(lv)layerObs.observe(lv);

// ===== FILTER =====
function fp(c){
  document.querySelectorAll('.fbt').forEach(b=>b.classList.remove('ac'));
  const lm={all:'All',website:'Websites',billing:'Billing',erp:'ERP',industry:'Industry'};
  document.querySelectorAll('.fbt').forEach(b=>{if(b.textContent.trim()===(lm[c]||'All'))b.classList.add('ac')});
  const cards=document.querySelectorAll('.pcd');
  cards.forEach(card=>{const cats=card.dataset.cats||'';const show=(c==='all'||cats.includes(c));card.style.display=show?'':'none'});
}
function fas(c){fp(c);const w=document.getElementById('work');if(w){const nh=document.getElementById('mainNav')?.offsetHeight||72;const extra=window.innerWidth<=640?20:24;window.scrollTo({top:Math.max(0,w.getBoundingClientRect().top+window.pageYOffset-nh-extra),behavior:'smooth'});}}

// ===== PROJECT DATA =====
const PD={
  deltasquad:{
    t:'Delta Squad Foundation \u2014 Cadet Training Portal',
    v:'Comprehensive organizational cadet training management system with role-based portals, attendance, assessments, leave management and reporting.',
    img:'assets/img/proj_deltasquad.jpg',
    b:[['Training Portal \u00B7 Full Stack','c']],
    pr:'The Delta Squad Foundation needed a centralized system to manage cadet training operations. Manual tracking of attendance, assessments, leave requests, notices, and training reports across commanders and cadets was inefficient and error-prone.',
    so:'A full-stack cadet training portal with Commander/Admin and Cadet portals. Commanders manage cadets, subjects, sessions, results, reports, and system records. Cadets view attendance, results, notices, notes, and submit leave requests. Includes secure JWT authentication, role-based access, notifications, multi-language support (i18n), and a public counselling-registration form.',
    fl:['Secure Login','Role Detection','Commander Dashboard','Cadet Portal','Attendance Tracking','Assessment & Results','Leave Management','Notifications','Reports'],
    tc:{'Frontend':['React.js','Responsive UI','i18n Multi-language'],'Backend':['Express.js','REST APIs','JWT Authentication','Role-based Middleware'],'Database':['PostgreSQL','Neon Cloud','Relational Schema'],'Features':['Attendance Tracking','Assessment System','Leave Workflow','Notifications','Public Registration']},
    bv:'Centralizes all training operations into one platform. Eliminates manual tracking. Role-based portals ensure data security. Multi-language support enables broader adoption.',
    link:'https://deltasquads.netlify.app/'
  },
  afterbuild:{
    t:'AfterBuild Studio \u2014 Luxury Interior Design Website',
    v:'Premium architectural and interior design studio website with portfolio gallery, service pillars, founder section, and brand identity.',
    img:'assets/img/proj_afterbuild.jpg',
    b:[['Interior Design \u00B7 Website','c']],
    pr:'AfterBuild Studio, a luxury interior design firm, needed a premium web presence that reflects their design quality and attracts high-end clients. Their previous online presence did not match the calibre of their portfolio.',
    so:'A modern, visually stunning website showcasing the studio\u2019s portfolio, services (Interior Design, Architecture, Project Management, Custom Furniture), team section with founder credentials, and a project gallery with before/after imagery. Designed to convey luxury through dark aesthetics and gold accents.',
    fl:['Hero with Brand Video','Portfolio Gallery','Service Pillars','Founder Section','Contact Form','Responsive Design','SEO Optimized'],
    tc:{'Frontend':['Next.js','TypeScript','Tailwind CSS','Responsive Design'],'Design':['Premium Dark Theme','Gold Accents','Portfolio Grid','Smooth Animations'],'Deployment':['Netlify','CI/CD','Custom Domain']},
    bv:'Establishes a premium digital presence matching the studio\u2019s real-world reputation. Professional portfolio presentation drives client enquiries from high-net-worth individuals.',
    link:'https://afterbuild.netlify.app/'
  },
  schoolerp:{
    t:'Greenwood International School ERP',
    v:'Full-stack school management system with 8 user roles, 74 database tables, and comprehensive academic, financial, and administrative modules.',
    img:'assets/img/proj_school_erp.jpg',
    b:[['Education \u00B7 ERP','c']],
    pr:'The school was managing student records, attendance, exams, fees, library, and transport on paper and spreadsheets across multiple departments. This led to data inconsistency, reporting delays, and administrative overhead.',
    so:'A comprehensive School ERP with 8 user roles (Admin, Principal, Teacher, Accountant, Admission Officer, Librarian, Parent, Student) and modules for student information, attendance, exam management, fee tracking, library management, transport routing, and communication. Built on a 74-table PostgreSQL database with Flask backend and React frontend.',
    fl:['8 User Role Portals','Student Information System','Attendance Tracking','Exam & Results Management','Fee Management & Receipts','Library Management','Transport Routing','Parent Portal','Communication System'],
    tc:{'Frontend':['React','TypeScript','Vite','Responsive Design'],'Backend':['Flask (Python)','SQLAlchemy ORM','REST APIs','JWT Authentication'],'Database':['PostgreSQL','SQLite (dev)','74 Tables','Relational Schema'],'Features':['Role-Based Access Control','PDF Report Generation','Email Notifications','Dashboard Analytics']},
    bv:'Eliminates paper-based processes across all departments. 8 role-specific portals ensure each user sees only what they need. Automated fee tracking and exam result generation saves 20+ hours/week of administrative work.',
    link:'https://friendly-dragon-fe77ba.netlify.app'
  },
  gstbilling:{
    t:'Offline GST Enterprise Billing Suite',
    v:'Production-quality offline-first GST billing system with tax engine, invoicing, quotations, delivery challans, bank reconciliation, job costing, and GSTR exports.',
    img:'assets/img/proj_gst_billing.jpg',
    b:[['GST Billing \u00B7 Enterprise','c']],
    pr:'A construction/building materials business needed a comprehensive offline billing solution that handles GST compliance, multi-counter operations, delivery challans, and bank reconciliation \u2014 without depending on constant internet connectivity.',
    so:'An offline-first billing suite with WAL-mode SQLite for reliability. Features include: GST tax engine (CGST/SGST/IGST with HSN-based rates), invoice & quotation generation (A4 and thermal), delivery challan management, payment tracking, bank reconciliation, job costing, customer portal, and GSTR-1/GSTR-3B export. Multi-counter LAN support for simultaneous operation.',
    fl:['GST Tax Engine','Invoice Generation (A4 & Thermal)','Quotation Management','Delivery Challans','Payment Tracking','Bank Reconciliation','Job Costing','GSTR-1/3B Export','Customer Portal','Multi-Counter LAN','E-way Bill Adapter'],
    tc:{'Frontend':['React 19','TypeScript','Vite','Responsive UI'],'Backend':['Express.js','REST APIs','SQLite WAL Mode'],'Business Logic':['GST Tax Engine','HSN Code Mapping','CGST/SGST/IGST Calculation','E-way Bill'],'Features':['Offline-First Architecture','PDF Invoice Generation','Bank Reconciliation','Job Costing','Multi-Counter Support']},
    bv:'Complete GST compliance without internet dependency. Multi-counter support enables simultaneous billing. GSTR exports eliminate manual tax filing data entry. Bank reconciliation catches payment discrepancies automatically.',
    link:'https://gst-building.onrender.com/'
  },
  football:{
    t:'New Life Sports \u2014 Football Academy Platform',
    v:'Interactive football academy website with training programs by age group, 3D tactical pitch, player development pathway, and registration system.',
    img:'assets/img/proj_football_academy.jpg',
    b:[['Sports \u00B7 Academy','c']],
    pr:'New Life Sports Football Academy needed a modern web platform to showcase their training programs, attract new registrations, and provide information about coaching methodology, facility details, and player development pathways.',
    so:'A dynamic Next.js website with age-based program sections (Mini Kickers to Elite Development), interactive 3D tactical pitch visualization, player development pathway timeline, training schedule display, photo/video gallery, coach profiles, and an integrated registration form. Mobile-optimized with smooth animations.',
    fl:['Age-Based Training Programs','3D Tactical Pitch','Player Development Pathway','Training Schedules','Photo & Video Gallery','Coach Profiles','Registration System','Mobile-First Design'],
    tc:{'Frontend':['Next.js 16','TypeScript','Tailwind CSS','Lucide Icons'],'Design':['Sports-themed Dark Design','3D Pitch Visualization','Smooth Animations','Responsive Layout'],'Deployment':['Netlify','Static Site Generation']},
    bv:'Professional academy presence that converts visitors into registrations. Interactive elements (3D pitch, pathway timeline) differentiate from competitor academies. Age-based program structure helps parents find the right fit immediately.',
    link:'https://newlifesports.netlify.app/'
  },
  corn:{
    t:'Pioneer \u2014 Corn. Revolutionized.',
    v:'Award-quality interactive WebGL experience with Three.js 3D corn models, post-processing effects, GSAP camera transitions, and cinematic science storytelling.',
    img:'assets/img/proj_corn_webgl.jpg',
    b:[['WebGL \u00B7 3D Interactive','c']],
    pr:'Pioneer needed an immersive, interactive web experience to showcase their corn science and innovation story. Traditional static websites could not convey the depth and beauty of agricultural research in an engaging way.',
    so:'A cinematic WebGL experience built with Three.js. Features include: 3D corn models with procedural geometry, UnrealBloomPass and BokehPass post-processing, GSAP-driven camera transitions between scenes, scroll-triggered animations, GLSL shaders for custom effects, and information panels revealing the science of corn development. The experience takes users through corn\u2019s journey from seed to harvest.',
    fl:['Three.js 3D Scene','Procedural Corn Geometry','WebGL Post-Processing','GSAP Camera Transitions','Scroll-Triggered Animations','GLSL Custom Shaders','Interactive Science Panels','Cinematic Storytelling'],
    tc:{'3D/WebGL':['Three.js','WebGL','GLSL Shaders','Procedural Geometry','Post-Processing (Bloom, Bokeh)'],'Animation':['GSAP (GreenSock)','ScrollTrigger','Camera Transitions'],'Frontend':['Vite','JavaScript','Responsive Design']},
    bv:'Creates a memorable, immersive brand experience that traditional websites cannot match. Interactive 3D elements increase time-on-site and engagement dramatically. Cinematic quality positions the brand as innovative.',
    link:'https://cornrevolutions.netlify.app/#science'
  },
  chemical:{
    t:'S.B.R. Chemicals & Oils \u2014 GST Billing & Cloud ERP',
    v:'Industry-specific billing system for chemical and oil distributor with custom measurement units, GST engine, Supabase cloud sync, and pixel-perfect paper invoice matching.',
    img:'assets/img/proj_chemical_billing.jpg',
    b:[['Chemical Industry \u00B7 Billing','c']],
    pr:'S.B.R. Chemicals & Oils, a chemical distributor, needed a billing system that handles their unique requirements: custom measurement units (Litres, Barrels, Kgs, Drums), chemical inventory tracking, GST compliance, and invoices that match their existing paper format exactly.',
    so:'A cloud-connected billing and ERP system built specifically for the chemical industry. Features GST-compliant invoicing with custom units, customer and product management, inventory tracking, Supabase cloud sync for multi-device access, and PDF invoice generation that pixel-perfectly matches the client\u2019s existing paper invoice layout.',
    fl:['Chemical Product Catalog','Custom Units (L/Barrel/Kg/Drum)','GST Invoice Generation','Customer Management','Inventory Tracking','Cloud Sync (Supabase)','Pixel-Perfect PDF Invoices','Payment Tracking','Admin Dashboard'],
    tc:{'Frontend':['React 19','TypeScript','Vite','Responsive UI'],'Backend & Cloud':['Supabase (PostgreSQL)','Real-time Sync','Row-Level Security'],'Business Logic':['GST Tax Engine','Custom Unit Conversion','Chemical Inventory','Invoice PDF Generation']},
    bv:'Replaces manual paper-based billing with a digital system that maintains the exact invoice format the business is used to. Cloud sync enables billing from any device. Chemical-specific units eliminate conversion errors.',
    link:'https://srs-chemical-billing.netlify.app/'
  },
  warehouse:{
    t:'Warehouse Management System',
    v:'Inventory and warehouse management platform currently under development. Stock tracking, order processing, and supply chain coordination.',
    img:'assets/img/proj_gst_billing.jpg',
    b:[['Warehouse \u00B7 Management','c']],
    pr:'The client needs a centralized system to manage warehouse inventory, track stock movements, process orders, and coordinate supply chain operations across multiple locations.',
    so:'A warehouse management platform with inventory tracking, stock alerts, order processing workflow, and reporting dashboard. Currently in early development phase.',
    fl:['Inventory Tracking','Stock Alerts','Order Processing','Supplier Management','Reports & Analytics'],
    tc:{'Frontend':['React','TypeScript'],'Backend':['Node.js','REST APIs'],'Database':['PostgreSQL']},
    bv:'Centralizes warehouse operations, reduces stock discrepancies, and automates reorder alerts. Enables data-driven supply chain decisions.',
    link:null
  }
};

// ===== MODAL =====
const mol=document.getElementById('mol'),mcl=document.getElementById('mcl');
function om(k){
  const d=PD[k];if(!d)return;
  const mhi=document.getElementById('mhi'),mni=document.getElementById('mni');
  if(d.img){mhi.src=d.img;mhi.alt=d.t;mhi.style.display='';mni.style.display='none'}
  else{mhi.style.display='none';mni.style.display='flex';mni.innerHTML=d.ico||'\u{1F4BB}'}
  document.getElementById('mbd').innerHTML=(d.b||[]).map(([tx])=>`<div class="pcb">${tx}</div>`).join('');
  document.getElementById('mt').textContent=d.t;
  document.getElementById('mv').textContent=d.v;
  document.getElementById('mpr').textContent=d.pr;
  document.getElementById('mso').textContent=d.so;
  document.getElementById('mfl').innerHTML=d.fl.map((s,i)=>`<div class="mfs">${s}</div>${i<d.fl.length-1?'<div class="mfa">\u2192</div>':''}`).join('');
  document.getElementById('mtc').innerHTML=Object.entries(d.tc).map(([l,items])=>`<div class="mtcc"><div class="mtct">${l}</div><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('');
  document.getElementById('mbv').textContent=d.bv;
  // Live demo link
  const linksEl=document.getElementById('mlinks');
  const lkEl=document.getElementById('mlk');
  if(d.link){
    linksEl.style.display='';
    lkEl.innerHTML=`<a href="${d.link}" target="_blank" rel="noopener" class="mla mlap">Visit Live Demo \u2192</a>`;
  } else {
    linksEl.style.display='none';
  }
  mol.classList.add('op');document.body.style.overflow='hidden';
  mol.querySelector('.msc').scrollTop=0;
}
function cm(){mol.classList.remove('op');document.body.style.overflow=''}
mcl.addEventListener('click',cm);
mol.addEventListener('click',e=>{if(e.target===mol)cm()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){cm();closeChat()}});

function bst(){const c=document.getElementById('contact');if(c){const nh=document.getElementById('mainNav')?.offsetHeight||72;const extra=window.innerWidth<=640?20:24;window.scrollTo({top:Math.max(0,c.getBoundingClientRect().top+window.pageYOffset-nh-extra),behavior:'smooth'});}}

// ===== CONTACT FORM =====
function hfs(e){
  e.preventDefault();
  const btn=document.getElementById('fsb');
  const n=document.getElementById('fn').value,em=document.getElementById('fe').value,
        ph=document.getElementById('fph').value,sv=document.getElementById('fsr').value,
        ms=document.getElementById('fm').value;
  const sub=encodeURIComponent('Project Inquiry - '+sv);
  const body=encodeURIComponent('Hi IdeasEternal,\n\nName: '+n+'\nEmail: '+em+'\nPhone: '+ph+'\nService: '+sv+'\n\nMessage:\n'+ms+'\n\nSent from ideaseternal.com');
  window.location.href='mailto:ideaseternal777@gmail.com?subject='+sub+'&body='+body;
  btn.textContent='Email Client Opening... \u2713';
  btn.style.background='linear-gradient(135deg,#22c55e,#16a34a)';
  setTimeout(()=>{btn.textContent='Send Message \u2192';btn.style.background=''},4000);
}

// ===== CHATBOT =====
const chatPanel=document.getElementById('chatPanel'),chatBody=document.getElementById('chatBody'),
      chatFab=document.getElementById('chatFab'),chatFtr=document.getElementById('chatFtr'),
      chatIn=document.getElementById('chatIn');
let chatState='init',chatData={service:'',problem:'',name:'',email:'',phone:'',message:''};

function openChat(){chatPanel.classList.add('open');chatFab.style.display='none';if(chatState==='init')chatStart()}
function closeChat(){chatPanel.classList.remove('open');chatFab.style.display=''}

function showTyping(){
  const t=document.createElement('div');t.className='chat-typing';t.id='typingDots';
  t.innerHTML='<span></span><span></span><span></span>';
  chatBody.appendChild(t);chatBody.scrollTop=chatBody.scrollHeight;
  return t;
}
function removeTyping(){const t=document.getElementById('typingDots');if(t)t.remove()}

function chatStart(){
  chatState='service';chatBody.innerHTML='';chatFtr.classList.add('hidden');
  chatData={service:'',problem:'',name:'',email:'',phone:'',message:''};
  showTyping();
  setTimeout(()=>{removeTyping();addBotMsg("Hi! \u{1F44B} Welcome to IdeasEternal.");
  showTyping();
  setTimeout(()=>{removeTyping();addBotMsg("What type of project are you looking for?");
  setTimeout(()=>addOpts(['Business Website','Billing System','ERP / Management Software','Interactive Website','Industry-Specific App','Not Sure Yet']),300)},800)},600);
}

function addBotMsg(t){const d=document.createElement('div');d.className='chat-msg bot';d.textContent=t;chatBody.appendChild(d);chatBody.scrollTop=chatBody.scrollHeight}
function addUsrMsg(t){const d=document.createElement('div');d.className='chat-msg usr';d.textContent=t;chatBody.appendChild(d);chatBody.scrollTop=chatBody.scrollHeight}
function addOpts(opts){
  const w=document.createElement('div');w.className='chat-opts';
  opts.forEach(o=>{const b=document.createElement('button');b.className='chat-opt';b.textContent=o;
    b.addEventListener('click',()=>{w.remove();addUsrMsg(o);handleOpt(o)});w.appendChild(b)});
  chatBody.appendChild(w);chatBody.scrollTop=chatBody.scrollHeight;
}

function handleOpt(val){
  if(chatState==='service'){
    chatData.service=val;chatState='problem';
    showTyping();
    setTimeout(()=>{removeTyping();addBotMsg("Great choice! What are you trying to achieve?");
    setTimeout(()=>addOpts(['Build a New Product','Replace Paper / Manual Process','Improve Current System','Need Online Presence','Need GST Billing','Not sure \u2014 need advice']),300)},600);
  }else if(chatState==='problem'){
    chatData.problem=val;chatState='name';
    showTyping();
    setTimeout(()=>{removeTyping();addBotMsg("Excellent. Let me get a few details so we can reach out to you.");
    showTyping();
    setTimeout(()=>{removeTyping();addBotMsg("What's your name?");chatFtr.classList.remove('hidden');chatIn.placeholder='Your name...';chatIn.focus()},600)},600);
  }else if(chatState==='confirm'){
    if(val.includes('Send')){
      const sub=encodeURIComponent('Project Inquiry via Chat - '+chatData.service);
      const body=encodeURIComponent(`Hi IdeasEternal,\n\nNew project enquiry:\n\nService: ${chatData.service}\nGoal: ${chatData.problem}\nName: ${chatData.name}\nEmail: ${chatData.email}\nPhone: ${chatData.phone||'Not provided'}\n\nProject:\n${chatData.message}\n\nSent from ideaseternal.com`);
      window.location.href='mailto:ideaseternal777@gmail.com?subject='+sub+'&body='+body;
      showTyping();
      setTimeout(()=>{removeTyping();addBotMsg("\u2705 Your email client should open with the pre-filled message. We'll respond within 24 hours!");chatState='done';setTimeout(()=>addOpts(['Start New Conversation','Close Chat']),600)},500);
    }else if(val.includes('Edit')){chatState='name';addBotMsg("No problem! What's your name?");chatFtr.classList.remove('hidden');chatIn.placeholder='Your name...';chatIn.focus()}
    else if(val.includes('Start'))chatStart();
  }else if(chatState==='done'){
    if(val.includes('Start'))chatStart();
    else closeChat();
  }
}

function chatSendText(){
  const v=chatIn.value.trim();if(!v)return;
  addUsrMsg(v);chatIn.value='';
  if(chatState==='name'){chatData.name=v;chatState='email';showTyping();setTimeout(()=>{removeTyping();addBotMsg("And your email address?");chatIn.placeholder='email@example.com';chatIn.type='email';chatIn.focus()},500)}
  else if(chatState==='email'){chatData.email=v;chatState='phone';showTyping();setTimeout(()=>{removeTyping();addBotMsg("Phone or WhatsApp number? (press Send to skip)");chatIn.placeholder='+91 XXXXX XXXXX';chatIn.type='tel';chatIn.focus()},500)}
  else if(chatState==='phone'){chatData.phone=v;chatState='message';showTyping();setTimeout(()=>{removeTyping();addBotMsg("Tell us about your project idea:");chatIn.placeholder='Describe your project...';chatIn.type='text';chatIn.focus()},500)}
  else if(chatState==='message'){
    chatData.message=v;chatState='confirm';chatFtr.classList.add('hidden');
    showTyping();
    setTimeout(()=>{
      removeTyping();
      addBotMsg("Here's your enquiry summary:");
      addBotMsg(`Service: ${chatData.service}\nGoal: ${chatData.problem}\nName: ${chatData.name}\nEmail: ${chatData.email}${chatData.phone?'\nPhone: '+chatData.phone:''}\n\nMessage: ${chatData.message}`);
      setTimeout(()=>addOpts(['Send Enquiry \u2192','Edit Details','Start Over']),500);
    },600);
  }
}

chatIn.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();chatSendText()}});
function chatRestart(){chatState='init';chatStart()}

// ===== NAV ACTIVE HIGHLIGHT =====
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nls a');
const navObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const id=e.target.id;navLinks.forEach(l=>{l.style.color=l.getAttribute('href')==='#'+id?'var(--wh)':''})}})},{threshold:.3,rootMargin:'-80px 0px -50% 0px'});
sections.forEach(s=>navObs.observe(s));

// ===== PRELOADER =====
window.addEventListener('load',()=>{
  const pl=document.getElementById('preloader');
  if(pl){setTimeout(()=>pl.classList.add('hide'),800)}
});

// ===== BACK TO TOP =====
const btt=document.getElementById('btt');
window.addEventListener('scroll',()=>{if(btt)btt.classList.toggle('show',scrollY>400)},{passive:true});

// ===== FAQ TOGGLE =====
function toggleFaq(el){
  const isOpen=el.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!isOpen)el.classList.add('open');
}

// ===== SCROLL PROGRESS BAR =====
const scrollProg=document.getElementById('scrollProgress');
if(scrollProg){
  window.addEventListener('scroll',()=>{
    const scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    const scrollHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    const progress=(scrollTop/scrollHeight)*100;
    scrollProg.style.width=progress+'%';
  },{passive:true});
}

// ===== CURSOR GLOW EFFECT =====
const cursorGlow=document.getElementById('cursorGlow');
if(cursorGlow&&window.innerWidth>768){
  let mouseX=0,mouseY=0,glowX=0,glowY=0;
  document.addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY;cursorGlow.classList.add('active')});
  document.addEventListener('mouseleave',()=>cursorGlow.classList.remove('active'));
  function updateGlow(){
    glowX+=(mouseX-glowX)*.08;glowY+=(mouseY-glowY)*.08;
    cursorGlow.style.left=glowX+'px';cursorGlow.style.top=glowY+'px';
    requestAnimationFrame(updateGlow);
  }
  requestAnimationFrame(updateGlow);
}

// ===== 3D TILT EFFECT ON PROJECT CARDS =====
document.querySelectorAll('.pcd').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect=card.getBoundingClientRect();
    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;
    const centerX=rect.width/2;
    const centerY=rect.height/2;
    const rotateX=((y-centerY)/centerY)*-4;
    const rotateY=((x-centerX)/centerX)*4;
    card.style.transform=`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click',function(e){
    const ripple=document.createElement('span');
    ripple.className='ripple';
    const rect=this.getBoundingClientRect();
    const size=Math.max(rect.width,rect.height);
    ripple.style.width=ripple.style.height=size+'px';
    ripple.style.left=(e.clientX-rect.left-size/2)+'px';
    ripple.style.top=(e.clientY-rect.top-size/2)+'px';
    this.appendChild(ripple);
    ripple.addEventListener('animationend',()=>ripple.remove());
  });
});

// ===== SERVICE CARD MAGNETIC HOVER =====
document.querySelectorAll('.scd').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect=card.getBoundingClientRect();
    const x=((e.clientX-rect.left)/rect.width-.5)*10;
    const y=((e.clientY-rect.top)/rect.height-.5)*10;
    card.style.transform=`translateY(-4px) translate(${x*0.3}px,${y*0.3}px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='translateY(0) translate(0,0)';
  });
});

// ===== PARALLAX ON HERO BACKGROUND =====
const hg1=document.querySelector('.hg1');
const hg2=document.querySelector('.hg2');
if(hg1&&hg2){
  window.addEventListener('scroll',()=>{
    const scrolled=window.scrollY;
    if(scrolled<window.innerHeight){
      hg1.style.transform=`scale(${1+scrolled*0.0003}) translateY(${scrolled*0.15}px)`;
      hg2.style.transform=`scale(${1+scrolled*0.0002}) translateY(${scrolled*0.1}px)`;
    }
  },{passive:true});
}

// ===== TEXT WORD-BY-WORD REVEAL =====
document.querySelectorAll('.rv .st').forEach(title=>{
  const html=title.innerHTML;
  if(html.includes('class="word"'))return;
  const parts=html.split(/(<[^>]+>)/);
  let newHtml='';
  let wordIndex=0;
  parts.forEach(part=>{
    if(part.startsWith('<')){
      newHtml+=part;
    }else{
      const words=part.split(/(\s+)/);
      words.forEach(w=>{
        if(w.trim()){
          newHtml+=`<span class="word" style="transition-delay:${wordIndex*0.06}s">${w}</span>`;
          wordIndex++;
        }else{
          newHtml+=w;
        }
      });
    }
  });
  title.innerHTML=newHtml;
});

// ===== ANIMATED HERO CANVAS PARTICLES =====
(function(){
  const hero=document.querySelector('.hero');
  if(!hero||window.innerWidth<768)return;
  const canvas=document.createElement('canvas');
  canvas.style.cssText='position:absolute;inset:0;z-index:1;pointer-events:none;opacity:.5';
  hero.querySelector('.hbg').appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let w,h,particles=[];
  function resize(){w=canvas.width=hero.offsetWidth;h=canvas.height=hero.offsetHeight}
  resize();window.addEventListener('resize',resize);
  class Particle{
    constructor(){this.reset()}
    reset(){this.x=Math.random()*w;this.y=Math.random()*h;this.vx=(Math.random()-.5)*.3;this.vy=(Math.random()-.5)*.3;this.r=Math.random()*1.5+.5;this.life=Math.random()*200+100;this.age=0;this.opacity=0}
    update(){this.x+=this.vx;this.y+=this.vy;this.age++;
      if(this.age<30)this.opacity=this.age/30;
      else if(this.age>this.life-30)this.opacity=(this.life-this.age)/30;
      else this.opacity=1;
      if(this.age>=this.life||this.x<0||this.x>w||this.y<0||this.y>h)this.reset();}
    draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(34,197,94,${this.opacity*.15})`;ctx.fill()}
  }
  for(let i=0;i<40;i++)particles.push(new Particle());
  function connectParticles(){
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x;
        const dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          const op=((120-dist)/120)*.06*particles[i].opacity*particles[j].opacity;
          ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(34,197,94,${op})`;ctx.lineWidth=.5;ctx.stroke();
        }
      }
    }
  }
  function animate(){ctx.clearRect(0,0,w,h);particles.forEach(p=>{p.update();p.draw()});connectParticles();requestAnimationFrame(animate)}
  animate();
})();

// ===== MAGNETIC CTA BUTTONS =====
document.querySelectorAll('.btn-glow').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const rect=btn.getBoundingClientRect();
    const x=e.clientX-rect.left-rect.width/2;
    const y=e.clientY-rect.top-rect.height/2;
    btn.style.transform=`translate(${x*.15}px,${y*.15}px) scale(1.02)`;
  });
  btn.addEventListener('mouseleave',()=>{
    btn.style.transform='translate(0,0) scale(1)';
    btn.style.transition='transform .4s cubic-bezier(.23,1,.32,1)';
    setTimeout(()=>btn.style.transition='',400);
  });
});

// ===== SECTION LABELS TEXT REVEAL =====
const labelObs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el=entry.target;
      const original=el.textContent;
      const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let iterations=0;
      const interval=setInterval(()=>{
        el.textContent=original.split('').map((char,i)=>{
          if(i<iterations||char===' ')return char;
          return chars[Math.floor(Math.random()*chars.length)];
        }).join('');
        iterations+=.5;
        if(iterations>=original.length)clearInterval(interval);
      },30);
      labelObs.unobserve(el);
    }
  });
},{threshold:.5});
document.querySelectorAll('.sl').forEach(el=>labelObs.observe(el));

// ===== SMOOTH SECTION PARALLAX =====
(function(){
  if(window.innerWidth<768)return;
  const parallaxSections=document.querySelectorAll('.sec');
  window.addEventListener('scroll',()=>{
    const scrollY=window.scrollY;
    parallaxSections.forEach(sec=>{
      const rect=sec.getBoundingClientRect();
      if(rect.top<window.innerHeight&&rect.bottom>0){
        const progress=(window.innerHeight-rect.top)/(window.innerHeight+rect.height);
        const translate=(progress-.5)*-15;
        const before=sec.querySelector('.sl');
        if(before){before.style.transform=`translateY(${translate}px)`}
      }
    });
  },{passive:true});
})();

// ===== ENHANCED PRELOADER WITH PERCENTAGE =====
(function(){
  const pl=document.getElementById('preloader');
  if(!pl)return;
  const txt=pl.querySelector('.prl-txt');
  if(!txt)return;
  let pct=0;
  const interval=setInterval(()=>{
    pct+=Math.floor(Math.random()*15)+5;
    if(pct>100)pct=100;
    txt.textContent=pct+'%';
    if(pct>=100){clearInterval(interval);txt.textContent='Ready'}
  },100);
})();

// ===== TYPED TEXT IN HERO BADGE =====
(function(){
  const badge=document.querySelector('.hey');
  if(!badge)return;
  const texts=['Custom Software & Web Development','Billing Systems & ERP Solutions','8 Client Projects Delivered','From Idea to Live Product'];
  let textIdx=0;let charIdx=0;let isDeleting=false;let isPaused=false;
  const textSpan=badge.childNodes[badge.childNodes.length-1];
  if(!textSpan||textSpan.nodeType!==3)return;
  function type(){
    const current=texts[textIdx];
    if(!isDeleting&&!isPaused){
      textSpan.textContent=current.substring(0,charIdx+1);
      charIdx++;
      if(charIdx===current.length){isPaused=true;setTimeout(()=>{isPaused=false;isDeleting=true;type()},2500);return}
    }else if(isDeleting){
      textSpan.textContent=current.substring(0,charIdx-1);
      charIdx--;
      if(charIdx===0){isDeleting=false;textIdx=(textIdx+1)%texts.length}
    }
    setTimeout(type,isDeleting?30:60);
  }
  setTimeout(type,3000);
})();

// ===== INTERSECTION-BASED CARD STAGGER =====
const gridObs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const grid=entry.target;
      const cards=grid.querySelectorAll('.pcd,.scd,.wcd');
      cards.forEach((card,i)=>{
        setTimeout(()=>{card.classList.add('vi')},i*80);
      });
      gridObs.unobserve(grid);
    }
  });
},{threshold:.1});
document.querySelectorAll('.pgr,.sgr,.wgr').forEach(g=>gridObs.observe(g));

// ===== SMOOTH SCROLL INDICATOR =====
(function(){
  const hero=document.querySelector('.hero');
  if(!hero)return;
  const indicator=document.createElement('div');
  indicator.innerHTML='<div style="width:24px;height:40px;border:2px solid rgba(255,255,255,.2);border-radius:12px;display:flex;justify-content:center;padding-top:6px"><div style="width:3px;height:8px;background:var(--or);border-radius:2px;animation:scrollIndicator 2s ease-in-out infinite"></div></div><style>@keyframes scrollIndicator{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(10px);opacity:.3}}</style>';
  indicator.style.cssText='position:absolute;bottom:32px;left:50%;transform:translateX(-50%);z-index:10;opacity:.6;transition:opacity .3s ease';
  hero.appendChild(indicator);
  window.addEventListener('scroll',()=>{indicator.style.opacity=window.scrollY>100?'0':'0.6'},{passive:true});
})();

// ===== INTERACTIVE GLOW ON IMAGES =====
document.querySelectorAll('.pim').forEach(pim=>{
  pim.addEventListener('mousemove',e=>{
    const rect=pim.getBoundingClientRect();
    const x=((e.clientX-rect.left)/rect.width)*100;
    const y=((e.clientY-rect.top)/rect.height)*100;
    pim.style.setProperty('--glow-x',x+'%');
    pim.style.setProperty('--glow-y',y+'%');
  });
});

// ===== SMOOTH NUMBER COUNTING FOR STATS =====
document.querySelectorAll('.hsi').forEach(stat=>{
  stat.addEventListener('mouseenter',()=>{
    const n=stat.querySelector('.n');
    if(!n||!n.dataset.target)return;
    const target=parseInt(n.dataset.target);
    let current=0;
    const step=Math.ceil(target/20);
    const interval=setInterval(()=>{
      current+=step;
      if(current>=target){current=target;clearInterval(interval)}
      n.textContent=current+'+';
    },40);
  });
});

