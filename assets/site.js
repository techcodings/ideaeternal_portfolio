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
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}
  });
});

// ===== SCROLL REVEAL =====
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vi')}}),{threshold:.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

// ===== HERO COUNTER ANIMATION =====
function animateCounters(){
  document.querySelectorAll('.counter').forEach(c=>{
    const target=parseInt(c.dataset.target);
    const duration=1500;
    const start=performance.now();
    function update(now){
      const elapsed=now-start;
      const progress=Math.min(elapsed/duration,1);
      const eased=1-Math.pow(1-progress,3);
      c.textContent=Math.round(target*eased)+'+';
      if(progress<1)requestAnimationFrame(update);
      else c.textContent=target+'+';
    }
    requestAnimationFrame(update);
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
  const lm={all:'All',ai:'AI / ML',web:'Web',mobile:'Mobile',cloud:'Cloud',automation:'Automation',cyber:'Cyber'};
  document.querySelectorAll('.fbt').forEach(b=>{if(b.textContent.trim()===(lm[c]||'All'))b.classList.add('ac')});
  const cards=document.querySelectorAll('.pcd');
  cards.forEach(card=>{const cats=card.dataset.cats||'';const show=(c==='all'||cats.includes(c));card.style.display=show?'':'none'});
}
function fas(c){fp(c);document.getElementById('work').scrollIntoView({behavior:'smooth'})}
function sap(){document.querySelectorAll('.pcd').forEach(c=>{c.style.display='';c.classList.add('rv');ro.observe(c)});const b=document.getElementById('smb');if(b)b.style.display='none'}

// ===== PROJECT DATA =====
const PD={
  deltasquad:{t:'Delta Squad Foundation \u2014 Cadet Training Portal',v:'Comprehensive organizational cadet training management system with role-based portals, attendance, assessments, leave management and reporting.',img:'assets/img/proj_deltasquad.jpg',b:[['Full Stack \u00B7 Portal','c']],pr:'The Delta Squad Foundation needed a centralized system to manage cadet training operations. Manual tracking of attendance, assessments, leave requests, notices, and training reports across commanders and cadets was inefficient and error-prone.',so:'A full-stack cadet training portal with Commander/Admin and Cadet portals. Commanders manage cadets, subjects, sessions, results, reports, and system records. Cadets view attendance, results, notices, notes, and submit leave requests. Includes secure JWT authentication, role-based access, notifications, multi-language support (i18n), and a public counselling-registration form.',fl:['Secure Login','Role Detection','Commander Dashboard','Cadet Portal','Attendance Tracking','Assessment & Results','Leave Management','Notifications','Reports'],arch:['React Frontend','Express.js API','JWT Auth','Role Middleware','PostgreSQL (Neon)','Notification Service','Admin Panel'],tc:{'Frontend':['React.js','Responsive UI','i18n Multi-language'],'Backend':['Express.js','REST APIs','JWT Authentication','Role-based Middleware'],'Database':['PostgreSQL','Neon Cloud','Relational Schema'],'Features':['Attendance Tracking','Assessment System','Leave Workflow','Notifications','Public Registration']},bv:'Centralizes all training operations into one platform. Eliminates manual tracking. Role-based portals ensure data security. Multi-language support enables broader adoption.',uc:['Training Organizations','Educational Institutions','Military Academies','Youth Programs','Corporate Training'],rec:null},
  safewave:{t:'SAFEWAVE \u2014 Fake Website Identification',v:'AI-powered cybersecurity platform detecting fake, fraudulent and phishing websites in real time.',img:'assets/img/proj_cyber.jpg',b:[['Cybersecurity \u00B7 AI','c']],pr:'Online fraud through fake websites is a growing threat. Phishing sites impersonate banks, government portals, and e-commerce platforms to steal credentials. There was no proactive AI-powered system that could analyze an unknown website\u2019s authenticity in real time.',so:'SAFEWAVE analyzes website properties \u2014 domain age, SSL validity, content structure, URL patterns, and behavioral signals \u2014 using ML classification to produce a trust score. Users receive an instant verdict: Safe, Suspicious, or Dangerous.',fl:['Website URL Input','Domain & SSL Analysis','ML Classification','Pattern Matching','Trust Score','User Alert'],arch:['User','Frontend (React)','API Gateway','URL Analyzer','ML Classifier','Trust Score Engine','Result'],tc:{'Frontend':['React.js','TypeScript','Real-time UI'],'Backend':['Node.js','REST API','URL Analyzer'],'AI/ML':['Classification Model','Feature Extraction','Risk Scoring'],'Deployment':['CI/CD','Cloud-hosted']},bv:'Protecting citizens from phishing reduces financial fraud and data breaches. Businesses can integrate SAFEWAVE as a security layer.',uc:['Banking & Finance','Government Portals','E-Commerce','Enterprise Security','Cybersecurity'],rec:{i:'\u{1F3C6}',t:'Smart India Hackathon 2024',o:'Ministry of Education, Govt. of India \u00B7 July 2024'}},
  multimodal:{t:'Multi-modal AI Guardian',v:'Real-time multi-modal AI surveillance combining face recognition, gesture analysis, and threat scoring.',img:'assets/img/proj_multimodal.jpg',b:[['AI \u00B7 Surveillance','c']],pr:'Traditional CCTV requires humans to watch feeds continuously \u2014 impossible to scale. Law enforcement needed an intelligent system to analyze multiple streams, detect threats, and surface alerts automatically.',so:'Integrates three AI subsystems: Face Recognition, Gesture Detection, and Heatmap Analysis for crowd intelligence \u2014 all feeding into a central threat scoring engine.',fl:['Live Camera Feeds','Frame Processing','Face Recognition','Gesture Detection','Behavioral Analysis','Threat Scoring','Alert Dashboard'],arch:['Camera Feeds','OpenCV Pipeline','Face Recognition','Gesture CNN','Behavior Analyzer','Threat Score','Alert Dashboard'],tc:{'AI/ML':['OpenCV','TensorFlow','Face Recognition','Gesture Detection'],'Backend':['Python','Flask API','Real-time Processing'],'Frontend':['Dashboard UI','Camera Feed']},bv:'Reduces human monitoring burden by 80%+ through AI automation. Enables faster threat response in public spaces.',uc:['Law Enforcement','Public Safety','Border Security','Transit Hubs','Smart Cities'],rec:{i:'\u{1F3C6}',t:'Rajasthan Police Hackathon 1.0',o:'Rajasthan Police \u00B7 February 2024 \u00B7 Selected from 250+ teams'}},
  edii:{t:'AI Submission Validator',v:'GPT-integrated AI backend for intelligent screening of submissions for quality and originality.',img:'assets/img/proj_ai.jpg',b:[['Applied AI','c']],pr:'Organizations receive thousands of idea submissions. Manually screening each for originality, completeness, and feasibility is time-consuming and inconsistent.',so:'AI-powered validation backend that automatically analyzes submitted ideas using GPT integration and NLP, scoring on originality, clarity, feasibility and completeness.',fl:['Idea Submission','NLP Pre-processing','GPT Analysis','Originality Check','Completeness Score','Firebase Store','Report'],arch:['User Submission','FastAPI','NLP Preprocessor','GPT API','Scoring Engine','Firebase','Admin Dashboard'],tc:{'AI/NLP':['GPT API','NLP Processing','Content Analysis','Originality Detection'],'Backend':['Python','FastAPI','REST API'],'Database':['Firebase Realtime','Score Tracking']},bv:'Eliminates days of manual review. Ensures consistent, unbiased evaluation. Surfaces highest-quality ideas for decision-making.',uc:['Government Programs','Hackathon Platforms','Startup Accelerators','Grant Programs','Universities'],rec:null},
  ibots:{t:'E-Commerce Platform',v:'Full-stack MERN e-commerce with AI-powered recommendations, analytics dashboard and cloud deployment.',img:'assets/img/proj_ecommerce.jpg',b:[['E-Commerce \u00B7 Full Stack','c']],pr:'A modern, scalable e-commerce platform with product catalogs, order management, personalized experiences, and a powerful admin dashboard.',so:'Custom MERN-stack e-commerce with AI-powered product recommendations. Admin dashboard provides real-time inventory tracking, order management, and sales analytics.',fl:['User Browse/Search','AI Recommendations','Product Catalog','Cart & Checkout','Order Processing','Admin Dashboard','Analytics'],arch:['User','React SPA','Express API','JWT Auth','MongoDB','AI Engine','AWS (EC2/S3)'],tc:{'Frontend':['React.js','Responsive UI','Real-time Updates'],'Backend':['Node.js','Express.js','REST APIs','JWT Auth'],'AI':['Recommendations','Behavior Analysis'],'Infrastructure':['AWS Cloud','Docker','CI/CD','MongoDB Atlas']},bv:'Dashboard reduced reporting time by 50%. Personalized UX improved engagement by 20%. Cloud deployment handles real transactions.',uc:['Retail & E-Commerce','Product Companies','B2B Marketplaces','Electronics'],rec:null},
  signlanguage:{t:'Sign Language Translator',v:'Real-time sign language to text translation using computer vision and CNN.',img:'assets/img/proj_sign.jpg',b:[['AI \u00B7 Accessibility','c']],pr:'Communication between hearing-impaired individuals and those unfamiliar with sign language is a significant barrier. Real-time tools are rare.',so:'Computer vision application using a webcam to capture hand gestures in real time and translate them to text via a CNN trained on sign language datasets.',fl:['Webcam Input','Frame Capture','Hand Detection','CNN Classifier','Character Map','Text Output'],arch:['Camera','OpenCV Capture','Hand Landmark','CNN Model','Character Recognition','Text Display'],tc:{'AI/CV':['OpenCV','CNN (TensorFlow)','Hand Detection','Gesture Classification'],'Backend':['Python','Real-time Processing']},bv:'Makes communication accessible without specialized hardware. Applicable in hospitals, schools, customer service counters.',uc:['Healthcare','Education','Customer Service','Public Services','Accessibility'],rec:null},
  stockpred:{t:'Stock Price Predictor',v:'ML time-series forecasting model for stock market prediction using historical data analysis.',img:'assets/img/proj_stock.jpg',b:[['AI \u00B7 Finance','c']],pr:'Predicting stock prices is a classic data science challenge. Traditional analysis struggles to capture complex temporal patterns in financial data.',so:'LSTM-based deep learning model trained on historical stock data to forecast future price movements. Includes data preprocessing, feature engineering, and visualization.',fl:['Data Collection','Preprocessing','Feature Engineering','LSTM Model','Training','Prediction','Visualization'],arch:['Market Data API','Pandas Pipeline','Feature Engineer','LSTM Network','Prediction Output','Chart Visualization'],tc:{'AI/ML':['LSTM','TensorFlow','Scikit-learn','Time Series'],'Data':['Pandas','NumPy','Matplotlib'],'Backend':['Python']},bv:'Demonstrates advanced ML capability on complex financial data. Pattern applicable to demand forecasting, resource planning.',uc:['Financial Services','Investment','Demand Forecasting','Business Intelligence'],rec:null},
  d2t:{t:'Product Management System',v:'Mobile-first product and order management with integrated payment and real-time tracking.',img:'assets/img/proj_d2t.jpg',b:[['Mobile \u00B7 Operations','c']],pr:'Manual order management via spreadsheets caused delays, errors, and missed payments. A mobile-first solution was needed.',so:'Cross-platform mobile app with product catalog management, order tracking, payment integration, and real-time inventory synchronization.',fl:['Product Catalog','Order Placement','Inventory Update','Payment','Order Fulfillment','Analytics'],arch:['Mobile App','React Native UI','Express API','Payment Gateway','MongoDB','Admin Panel'],tc:{'Mobile':['React Native','Mobile-first UI'],'Backend':['Node.js','REST API','Payment Gateway'],'Database':['MongoDB','Transaction Logs']},bv:'Improved efficiency by 40%. Handles 100+ daily transactions. Reduced order errors significantly.',uc:['Product Distribution','Field Sales','Order Management','SME Businesses'],rec:null},
  emailsms:{t:'Email & SMS Verification Pipeline',v:'Automated pipeline verifying contact data \u2014 eliminating invalid entries before they cause problems.',img:'assets/img/proj_auto.jpg',b:[['Automation \u00B7 Data','c']],pr:'Businesses accumulate invalid emails and phone numbers. Campaigns to invalid addresses damage sender reputation and increase costs.',so:'Automated verification pipeline checking MX records, SMTP handshake, format validity, and SMS reachability. Invalid contacts quarantined with reason codes.',fl:['Contact List','Format Check','MX/DNS Lookup','SMTP Handshake','SMS Check','DB Update','Report'],arch:['Input List','Format Validator','DNS/MX Resolver','SMTP Verifier','SMS Gateway','Result Database'],tc:{'Backend':['Python','Node.js','Async Processing'],'Verification':['SMTP Validation','DNS Lookup','SMS Gateway API'],'Database':['MongoDB','Batch Processing']},bv:'Reduces bounce rates, protects sender reputation, saves marketing budget.',uc:['E-Commerce','Digital Marketing','CRM Systems','Healthcare','Financial Services'],rec:null},
  sentiment:{t:'Sentiment Analysis Engine',v:'NLP-powered sentiment engine transforming customer reviews into actionable intelligence.',img:'assets/img/proj_sentiment.jpg',b:[['AI \u00B7 NLP','c']],pr:'Businesses receive thousands of reviews but lack tools to analyze sentiment at scale.',so:'Sentiment system processing reviews using NLP, classifying and extracting key topics. Dashboard shows sentiment trends and quality signals.',fl:['Reviews Input','NLP Processing','Classification','Topic Extraction','Aggregation','Dashboard'],arch:['Data Source','Text Preprocessor','BERT Model','Topic Modeler','Score Aggregator','React Dashboard'],tc:{'AI/NLP':['BERT/Transformer','Sentiment Classification','Topic Modeling'],'Backend':['Python','Flask API'],'Frontend':['React.js','Charts']},bv:'Understand customer sentiment without reading thousands of reviews.',uc:['E-Commerce','Product Mgmt','Customer Experience','Market Research'],rec:null},
  aichatbot:{t:'AI Customer Support Chatbot',v:'GPT-powered chatbot trained on custom business data for automated 24/7 customer support and lead generation.',img:'assets/img/proj_chatbot.jpg',b:[['AI \u00B7 SaaS','c']],pr:'Businesses spend heavily on customer support teams. Most queries are repetitive \u2014 FAQs, order status, pricing, returns. Customers expect instant answers 24/7 but human agents are expensive and have limited availability.',so:'An AI chatbot trained on the client\u2019s own documentation, FAQs, and product data using GPT + LangChain. It handles customer queries in natural language, escalates complex issues to humans, and learns from conversations. Includes an analytics dashboard showing resolution rates and common topics.',fl:['Customer Message','NLP Processing','Knowledge Base Search','GPT Response Generation','Escalation Check','Response Delivery','Analytics Log'],arch:['Chat Widget','Express API','LangChain Pipeline','Vector DB (Pinecone)','GPT API','Escalation Engine','Admin Dashboard'],tc:{'AI':['GPT-4 API','LangChain','Vector Embeddings','RAG Architecture'],'Backend':['Node.js','Express','WebSocket','MongoDB'],'Frontend':['React.js','Chat UI','Admin Dashboard'],'Infrastructure':['Docker','CI/CD','Cloud Hosting']},bv:'Reduces support costs by 60-70%. Handles unlimited concurrent conversations. Available 24/7 with instant response. Captures leads automatically from chat conversations.',uc:['E-Commerce','SaaS Companies','Healthcare','Real Estate','Education','Financial Services','Hospitality'],rec:null},
  hospital:{t:'Hospital & Clinic Management System',v:'End-to-end healthcare management with patient records, appointments, doctor portals, prescriptions, and billing.',img:'assets/img/proj_hospital.jpg',b:[['Healthcare \u00B7 Full Stack','c']],pr:'Clinics and small hospitals manage patient records on paper or spreadsheets. Appointment scheduling is phone-based, prescriptions are handwritten, and billing is manual. This creates errors, delays, and poor patient experience.',so:'A full-stack hospital management system with role-based portals for Admin, Doctor, and Receptionist. Manages patient records, appointment scheduling with calendar view, digital prescriptions, lab reports, billing with invoice generation, and department management. Secure authentication with audit trails.',fl:['Patient Registration','Appointment Booking','Doctor Assignment','Consultation Notes','Prescription','Lab Reports','Billing','Invoice'],arch:['React Frontend','Express API','JWT Auth','Role Middleware','PostgreSQL','PDF Generator','Email/SMS Notifier'],tc:{'Frontend':['React.js','Calendar UI','PDF Viewer','Responsive Design'],'Backend':['Node.js','Express','REST APIs','JWT Auth','Role-based Access'],'Database':['PostgreSQL','Patient Records','Audit Logs'],'Features':['Appointment Calendar','Digital Prescriptions','Invoice Generator','Lab Report Upload','SMS/Email Notifications']},bv:'Eliminates paper records. Reduces appointment scheduling time by 80%. Digital prescriptions reduce errors. Automated billing saves 15+ hours/week. Complete audit trail for compliance.',uc:['Clinics','Small Hospitals','Dental Practices','Physiotherapy Centers','Diagnostic Labs','Veterinary Clinics'],rec:null},
  booking:{t:'Booking & Appointment System',v:'Universal scheduling platform for service businesses \u2014 clinics, salons, tutors, consultants \u2014 with payments and analytics.',img:'assets/img/proj_booking.jpg',b:[['SaaS \u00B7 Platform','c']],pr:'Service businesses (salons, clinics, tutors, consultants) lose revenue from no-shows, double bookings, and phone-based scheduling. They need a modern self-service booking system that works 24/7.',so:'A SaaS booking platform where businesses create service listings, set availability, and let customers book online. Includes automated reminders (email/SMS), payment collection via Stripe, customer management, and an admin dashboard with booking analytics and revenue tracking.',fl:['Service Setup','Availability Calendar','Customer Booking','Payment (Stripe)','Confirmation','Reminder (SMS/Email)','Service Delivery','Review & Rating'],arch:['React Frontend','Express API','MongoDB','Stripe Payment','Calendar Engine','Notification Service (Twilio)','Admin Dashboard'],tc:{'Frontend':['React.js','Calendar UI','Payment Widget','Responsive'],'Backend':['Express.js','REST APIs','Stripe Integration','Twilio SMS'],'Database':['MongoDB','Booking Records','Customer Profiles'],'Features':['Online Booking','Stripe Payments','SMS/Email Reminders','Analytics Dashboard','Multi-service Support','Review System']},bv:'Eliminates no-shows with automated reminders. Captures bookings 24/7 without staff. Online payments reduce cancellations by 40%. Dashboard gives real-time revenue insights.',uc:['Salons & Spas','Medical Clinics','Tutoring Services','Consulting Firms','Fitness Studios','Photography','Legal Services'],rec:null}
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
  const marchEl=document.getElementById('march');
  if(d.arch&&d.arch.length){marchEl.parentElement.style.display='';marchEl.innerHTML=d.arch.map((n,i)=>`<div class="march-n">${n}</div>${i<d.arch.length-1?'<div class="march-a">\u2193</div>':''}`).join('')}
  else marchEl.parentElement.style.display='none';
  document.getElementById('mtc').innerHTML=Object.entries(d.tc).map(([l,items])=>`<div class="mtcc"><div class="mtct">${l}</div><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('');
  document.getElementById('mbv').textContent=d.bv;
  document.getElementById('muc').innerHTML=(d.uc||[]).map(u=>`<div class="muci">${u}</div>`).join('');
  const rs=document.getElementById('mres');
  if(d.rec){rs.style.display='';document.getElementById('mrec').innerHTML=`<div class="mreci">${d.rec.i}</div><div class="mrect"><h5>${d.rec.t}</h5><p>${d.rec.o}</p></div>`}
  else rs.style.display='none';
  mol.classList.add('op');document.body.style.overflow='hidden';
  mol.querySelector('.msc').scrollTop=0;
}
function cm(){mol.classList.remove('op');document.body.style.overflow=''}
mcl.addEventListener('click',cm);
mol.addEventListener('click',e=>{if(e.target===mol)cm()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){cm();closeChat()}});

function bst(){document.getElementById('contact').scrollIntoView({behavior:'smooth'})}

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
  setTimeout(()=>{removeTyping();addBotMsg("What type of solution are you looking for?");
  setTimeout(()=>addOpts(['Website','Mobile App','AI Solution','Business Software','Automation','E-Commerce','Not Sure Yet']),300)},800)},600);
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
    setTimeout(()=>addOpts(['Build a New Product','Automate Existing Work','Improve Current System','Add AI Features','Need a Website','Need a Mobile App']),300)},600);
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
