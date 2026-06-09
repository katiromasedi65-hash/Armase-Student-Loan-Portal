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

  // Hide form, show success
  document.getElementById('section-4').classList.remove('active');
  const success = document.getElementById('success-screen');
  success.classList.add('active');

  // Mark all steps complete
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