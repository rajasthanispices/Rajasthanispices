// ========================================
// Rajasthan Trading & Manufactures - Main JS
// ========================================

// ========================================
// EmailJS Configuration
// ========================================

const EMAILJS_PUBLIC_KEY = 'KWhJOcCd78ATRxncx';
const EMAILJS_SERVICE_ID = 'service_9od66mc';
const EMAILJS_TEMPLATE_ID = 'template_p8d1mlp';

let emailJSLoadPromise = null;

function loadEmailJS() {
  // Already loaded
  if (window.emailjs) {
    window.emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY
    });

    return Promise.resolve();
  }

  // Already loading
  if (emailJSLoadPromise) {
    return emailJSLoadPromise;
  }

  // Load EmailJS SDK
  emailJSLoadPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/npm/@emailjs/browser@5/dist/email.min.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.emailjs) {
          window.emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
          });
          resolve();
        } else {
          reject(new Error('EmailJS SDK loaded but was not available.'));
        }
      });

      existingScript.addEventListener('error', () => {
        reject(new Error('EmailJS SDK failed to load.'));
      });

      return;
    }

    const script = document.createElement('script');

    script.src =
      'https://cdn.jsdelivr.net/npm/@emailjs/browser@5/dist/email.min.js';

    script.async = true;

    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init({
          publicKey: EMAILJS_PUBLIC_KEY
        });

        resolve();
      } else {
        reject(new Error('EmailJS SDK loaded but was not available.'));
      }
    };

    script.onerror = () => {
      reject(new Error('Unable to load EmailJS SDK.'));
    };

    document.head.appendChild(script);
  });

  return emailJSLoadPromise;
}

// ========================================
// Mobile Navigation Toggle
// ========================================

const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    const isActive = mainNav.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  });
}

// Close nav on link click (mobile)

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mainNav) mainNav.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ========================================
// Set Active Link based on current page URL
// ========================================

function setPathActiveNav() {
  const currentPath = window.location.pathname;

  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');

    if (
      href &&
      (
        href === currentPath ||
        (currentPath === '/' && href === '/index.html') ||
        (currentPath.endsWith(href) && href !== '/')
      )
    ) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setPathActiveNav);

// ========================================
// Modal Handling
// ========================================

const enquiryModal = document.getElementById('enquiryModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function openEnquiryModal(productName = '') {
  if (!enquiryModal) return;

  const modalProdInput = document.getElementById('modalFormProduct');

  if (modalProdInput && productName) {
    modalProdInput.value = productName;
  }

  enquiryModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEnquiryModal() {
  if (!enquiryModal) return;

  enquiryModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeEnquiryModal);
}

if (enquiryModal) {
  enquiryModal.addEventListener('click', (e) => {
    if (e.target === enquiryModal) {
      closeEnquiryModal();
    }
  });
}

// ========================================
// Attach event listeners to all modal triggers
// ========================================

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-open-modal]');

  if (trigger) {
    e.preventDefault();

    const prodName =
      trigger.getAttribute('data-product') || '';

    openEnquiryModal(prodName);
  }
});

// ========================================
// Header shadow on scroll
// ========================================

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 20) {
      header.style.boxShadow =
        '0 4px 20px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow =
        '0 2px 10px rgba(0,0,0,0.08)';
    }
  }
});

// ========================================
// Helper: Get Form Field Value
// ========================================

function getFormField(form, id, name) {
  // First try exact ID
  const idField = document.getElementById(id);

  if (idField) {
    return idField.value.trim();
  }

  // Fallback to name attribute
  if (form) {
    const nameField = form.querySelector(`[name="${name}"]`);

    if (nameField) {
      return nameField.value.trim();
    }
  }

  return '';
}

// ========================================
// Form submission handler
// Contact + Modal forms
// ========================================

async function handleEnquirySubmit(
  event,
  formPrefix = 'form'
) {
  event.preventDefault();

  const form = event.currentTarget;

  // ----------------------------------------
  // Get form values
  // ----------------------------------------

  const name = getFormField(
    form,
    `${formPrefix}Name`,
    'name'
  );

  const company = getFormField(
    form,
    `${formPrefix}Company`,
    'company'
  );

  const phone = getFormField(
    form,
    `${formPrefix}Phone`,
    'phone'
  );

  const product =
    getFormField(
      form,
      `${formPrefix}Product`,
      'product'
    ) || 'General Business Enquiry';

  const qty =
    getFormField(
      form,
      `${formPrefix}Qty`,
      'qty'
    ) || 'N/A';

  const message = getFormField(
    form,
    `${formPrefix}Message`,
    'message'
  );

  let country =
    getFormField(
      form,
      `${formPrefix}Country`,
      'country'
    ) || 'India';

  // ----------------------------------------
  // WhatsApp Message
  // ----------------------------------------

  const waMessage =
    `Hello Rajasthan Trading & Manufactures!\n\n` +
    `Name: ${name}\n` +
    `Company: ${company} (${country})\n` +
    `Phone: ${phone}\n` +
    `Product/Topic: ${product}\n` +
    `Est. Quantity: ${qty}\n` +
    `Message: ${message}`;

  // Open WhatsApp immediately
  // so the browser does not block it.
  window.open(
    `https://wa.me/919829377723?text=${encodeURIComponent(waMessage)}`,
    '_blank',
    'noopener'
  );

  // ----------------------------------------
  // Submit Button State
  // ----------------------------------------

  const submitBtn =
    event.submitter ||
    form.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

  let originalButtonHTML = '';

  if (submitBtn) {
    originalButtonHTML = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    if (submitBtn.tagName === 'INPUT') {
      submitBtn.value = 'Sending...';
    } else {
      submitBtn.innerHTML = 'Sending Enquiry...';
    }
  }

  // ----------------------------------------
  // EmailJS
  // ----------------------------------------

  try {
    await loadEmailJS();

    const templateParams = {
      name: name,
      company: company,
      country: country,
      phone: phone,
      product: product,
      qty: qty,
      message: message
    };

    await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    // --------------------------------------
    // Success
    // --------------------------------------

    alert(
      'Enquiry sent successfully! We will get back to you shortly.'
    );

    // Close modal after successful submission
    if (
      enquiryModal &&
      enquiryModal.classList.contains('active')
    ) {
      closeEnquiryModal();
    }

    // Reset submitted form
    if (form) {
      form.reset();
    }

  } catch (error) {
    // --------------------------------------
    // Error
    // --------------------------------------

    console.error(
      'EmailJS Error:',
      error
    );

    alert(
      'WhatsApp enquiry opened, but email delivery failed. Please try again.'
    );

  } finally {
    // --------------------------------------
    // Restore Button
    // --------------------------------------

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';

      if (submitBtn.tagName === 'INPUT') {
        submitBtn.value = 'Send Enquiry';
      } else {
        submitBtn.innerHTML =
          originalButtonHTML || 'Send Enquiry';
      }
    }
  }
}

// ========================================
// Contact Enquiry Form
// ========================================

const enquiryForm =
  document.getElementById('enquiryForm');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    handleEnquirySubmit(e, 'form');
  });
}

// ========================================
// Modal Enquiry Form
// ========================================

const modalEnquiryForm =
  document.getElementById('modalEnquiryForm');

if (modalEnquiryForm) {
  modalEnquiryForm.addEventListener('submit', (e) => {
    handleEnquirySubmit(e, 'modalForm');
  });
}

// ========================================
// Product Filtering Tabs
// products.html
// ========================================

const filterBtns =
  document.querySelectorAll(
    '.product-filter-btn'
  );

const productCards =
  document.querySelectorAll(
    '.product-grid-extended .product-card'
  );

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      filterBtns.forEach(b =>
        b.classList.remove('active')
      );

      btn.classList.add('active');

      const filter =
        btn.getAttribute('data-filter');

      productCards.forEach(card => {

        if (
          filter === 'all' ||
          card.getAttribute('data-category') === filter
        ) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }

      });
    });
  });
}

// ========================================
// Smooth scroll for anchor links
// ========================================

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener('click', function (e) {

      const href =
        this.getAttribute('href');

      if (href.length > 1) {

        const target =
          document.querySelector(href);

        if (target) {

          e.preventDefault();

          const headerHeight =
            header
              ? header.offsetHeight
              : 80;

          const targetPos =
            target.offsetTop -
            headerHeight -
            10;

          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });

        }
      }
    });
  });
