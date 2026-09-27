/**
 * Accessible Project Inquiry Form Validation & Submission Logic
 */
export function initForm() {
  const form = document.getElementById('project-form');
  const statusAlert = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  function setFieldError(field, hasError, customMsg) {
    const parent = field.parentElement;
    const errorSpan = parent.querySelector('.error-msg');

    if (hasError) {
      field.classList.add('border-red-700');
      field.setAttribute('aria-invalid', 'true');
      if (errorSpan) {
        if (customMsg) errorSpan.textContent = customMsg;
        errorSpan.classList.remove('hidden');
      }
    } else {
      field.classList.remove('border-red-700');
      field.removeAttribute('aria-invalid');
      if (errorSpan) errorSpan.classList.add('hidden');
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Required Inputs
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        setFieldError(input, true);
        isValid = false;
      } else {
        setFieldError(input, false);
      }
    });

    // Special Email Check
    const emailInput = document.getElementById('email-address');
    if (emailInput && emailInput.value.trim()) {
      if (!validateEmail(emailInput.value.trim())) {
        setFieldError(emailInput, true, "Please enter a valid email address.");
        isValid = false;
      }
    }

    if (!isValid) {
      statusAlert.className = "p-4 mb-6 rounded-md text-sm font-medium bg-red-950/10 text-red-900 border border-red-900/20";
      statusAlert.textContent = "Please fix the highlighted fields before submitting.";
      statusAlert.classList.remove('hidden');
      return;
    }

    // Direct Simulated Submission State
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending Scope Specification...</span>`;

    setTimeout(() => {
      statusAlert.className = "p-4 mb-6 rounded-md text-sm font-medium bg-emerald-950/10 text-emerald-900 border border-emerald-900/20";
      statusAlert.textContent = "Thank you! Your project inquiry has been received. The NextByte team will respond within 24 business hours.";
      statusAlert.classList.remove('hidden');

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Submit Project Scope & Inquiry</span>
        <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>`;
    }, 1200);
  });
}