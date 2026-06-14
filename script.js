function switchTab(tab) {
  const loginFields = document.getElementById('login-fields');
  const registerFields = document.getElementById('register-fields');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const signupToggle = document.getElementById('signup-toggle');
  const loginHeader = document.querySelector('.login-header h2');
  const loginSubtitle = document.querySelector('.login-header p');

  if (tab === 'login') {
    loginFields.style.display = 'block';
    registerFields.style.display = 'none';
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    signupToggle.style.display = 'block';
    loginHeader.textContent = 'Welcome back';
    loginSubtitle.textContent = 'Sign in to manage your loan application';
  } else {
    loginFields.style.display = 'none';
    registerFields.style.display = 'block';
    tabLogin.classList.remove('active');
    tabRegister.classList.add('active');
    signupToggle.style.display = 'none';
    loginHeader.textContent = 'Start your application';
    loginSubtitle.textContent = 'Create your account — it takes under 2 minutes';
  }
}
function submitLogin() {
    window.location.href = 'loan application.html';
}

function submitRegister() {
    window.location.href = 'loan application.html';
}
function handleGoogleLogin(response) {
    sessionStorage.setItem('loggedIn', 'true');
    window.location.href = 'loan application.html';
}
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('open');
}

function goToStep(stepNumber) {
  // Hide all sections
  document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.step-line').forEach(l => l.classList.remove('completed'));

  // Show target section
  document.getElementById('section-' + stepNumber).classList.add('active');

  // Update step indicators
  for (let i = 1; i <= 4; i++) {
    const indicator = document.getElementById('step-indicator-' + i);
    if (i < stepNumber) indicator.classList.add('completed');
    if (i === stepNumber) indicator.classList.add('active');
  }

  // Update step lines
  const lines = document.querySelectorAll('.step-line');
  lines.forEach((line, index) => {
    if (index < stepNumber - 1) line.classList.add('completed');
  });

  // Scroll to top of form
  window.scrollTo({ top: 116, behavior: 'smooth' });
}

function submitApplication() {
    const declared = document.getElementById('declare').checked;
    if (!declared) {
        alert('Please tick the declaration checkbox before submitting.');
        return;
    }

    const data = {
        firstName: document.getElementById('firstName')?.value || '',
        lastName: document.getElementById('lastName')?.value || '',
        idNumber: document.getElementById('idNumber')?.value || '',
        dob: document.getElementById('dob')?.value || '',
        gender: document.getElementById('gender')?.value || '',
        nationality: document.getElementById('nationality')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        address: document.getElementById('address')?.value || '',
        city: document.getElementById('city')?.value || '',
        country: document.getElementById('country')?.value || '',
        emergencyName: document.getElementById('emergencyName')?.value || '',
        emergencyPhone: document.getElementById('emergencyPhone')?.value || '',
        institution: document.getElementById('institution')?.value || '',
        course: document.getElementById('course')?.value || '',
        studyLevel: document.getElementById('studyLevel')?.value || '',
        studyMode: document.getElementById('studyMode')?.value || '',
        startDate: document.getElementById('startDate')?.value || '',
        gradYear: document.getElementById('gradYear')?.value || '',
        studentNumber: document.getElementById('studentNumber')?.value || '',
        loanAmount: document.getElementById('loanAmount')?.value || '',
        repayment: document.getElementById('repayment')?.value || '',
        loanPurpose: document.getElementById('loanPurpose')?.value || '',
        employment: document.getElementById('employment')?.value || '',
        income: document.getElementById('income')?.value || '',
        guarantor: document.getElementById('guarantor')?.value || '',
        comments: document.getElementById('comments')?.value || '',
    };

    uploadID().then(idUrl => {
  data.idDocument = idUrl || 'No ID uploaded';
  
  fetch('https://formspree.io/f/xkoavvgn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  document.getElementById('section-4').classList.remove('active');
  const success = document.getElementById('success-screen');
  success.classList.add('active');
  document.querySelectorAll('.step').forEach(s => {
    s.classList.remove('active');
    s.classList.add('completed');
  });
  document.querySelectorAll('.step-line').forEach(l => l.classList.add('completed'));
  window.scrollTo({ top: 116, behavior: 'smooth' });
});

    document.getElementById('section-4').classList.remove('active');
    const success = document.getElementById('success-screen');
    success.classList.add('active');
    document.querySelectorAll('.step').forEach(s => {
        s.classList.remove('active');
        s.classList.add('completed');
    });
    document.querySelectorAll('.step-line').forEach(l => l.classList.add('completed'));
    window.scrollTo({ top: 116, behavior: 'smooth' });
}
const captions = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

document.querySelectorAll('.stars').forEach(starsContainer => {
  const stars = starsContainer.querySelectorAll('.star');
  const group = stars[0].dataset.group;
  const caption = document.getElementById('caption-' + group);

  stars.forEach(star => {
    // Hover effect
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.value);
      stars.forEach((s, i) => {
        s.style.color = i < val ? '#C9A84C' : '#e2e8f0';
      });
      caption.textContent = captions[val];
    });

    // Mouse leave — restore selected state
    starsContainer.addEventListener('mouseleave', () => {
      const selected = starsContainer.dataset.selected || 0;
      stars.forEach((s, i) => {
        s.style.color = i < selected ? '#C9A84C' : '#e2e8f0';
      });
      caption.textContent = selected > 0 ? captions[selected] : 'Click to rate';
    });

    // Click to select
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.value);
      starsContainer.dataset.selected = val;
      stars.forEach((s, i) => {
        s.classList.toggle('active', i < val);
        s.style.color = i < val ? '#C9A84C' : '#e2e8f0';
      });
      caption.textContent = captions[val];
    });
  });
});

function submitFeedback(e) {
  e.preventDefault();
  document.querySelector('.feedback-form').style.display = 'none';
  const success = document.getElementById('success-screen');
  success.classList.add('active');
  window.scrollTo({ top: 116, behavior: 'smooth' });
}


function selectChoice(el, group) {
  const choices = document.querySelectorAll(`#choices-${group} .choice-item`);
  choices.forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function submitFeedback() {
  // Show thank you section
  const thankyou = document.getElementById('thankyou');
  thankyou.style.display = 'grid';
  thankyou.scrollIntoView({ behavior: 'smooth' });

  // Hide the last question section
  document.getElementById('q5').style.display = 'none';
}
async function uploadID() {
  const file = document.getElementById('idUpload').files[0];
  if (!file) return null;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'armase_id_uploads');
  formData.append('cloud_name', 'dmcuw9p3q');

  const response = await fetch('https://api.cloudinary.com/v1_1/dmcuw9p3q/image/upload', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  return data.secure_url;
}