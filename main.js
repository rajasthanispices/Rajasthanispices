// ========================================
// Rajasthan Trading & Manufactures - Main JS
// ========================================

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mainNav) mainNav.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
  });
});

// Set Active Link based on current page URL
function setPathActiveNav() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '/' && href === '/index.html') || (currentPath.endsWith(href) && href !== '/'))) {
      link.classList.add('active');
    }
  });
}
document.addEventListener('DOMContentLoaded', setPathActiveNav);

// Modal Handling
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

// Attach event listeners to all modal triggers
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-open-modal]');
  if (trigger) {
    e.preventDefault();
    const prodName = trigger.getAttribute('data-product') || '';
    openEnquiryModal(prodName);
  }
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    }
  }
});

// Form submission handler (for contact & modal forms)
function handleEnquirySubmit(event, formPrefix = 'form') {
  event.preventDefault();
  
  const nameEl = document.getElementById(`${formPrefix}Name`);
  const companyEl = document.getElementById(`${formPrefix}Company`);
  const phoneEl = document.getElementById(`${formPrefix}Phone`);
  const productEl = document.getElementById(`${formPrefix}Product`);
  const qtyEl = document.getElementById(`${formPrefix}Qty`);
  const messageEl = document.getElementById(`${formPrefix}Message`);
  const countryEl = document.getElementById(`${formPrefix}Country`);

  const name = nameEl ? nameEl.value : '';
  const company = companyEl ? companyEl.value : '';
  const phone = phoneEl ? phoneEl.value : '';
  const product = productEl ? productEl.value : 'General Enquiry';
  const qty = qtyEl ? qtyEl.value : 'N/A';
  const message = messageEl ? messageEl.value : '';
  const country = countryEl ? countryEl.value : 'India';

  const waMessage = `Hello Rajasthan Trading & Manufactures!%0A%0AName: ${name}%0ACompany: ${company} (${country})%0APhone: ${phone}%0AProduct/Topic: ${product}%0AEst. Quantity: ${qty}%0AMessage: ${message}`;
  
  window.open(`https://wa.me/919829377723?text=${waMessage}`, '_blank');

  if (enquiryModal && enquiryModal.classList.contains('active')) {
    closeEnquiryModal();
  }
}

const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => handleEnquirySubmit(e, 'form'));
}

const modalEnquiryForm = document.getElementById('modalEnquiryForm');
if (modalEnquiryForm) {
  modalEnquiryForm.addEventListener('submit', (e) => handleEnquirySubmit(e, 'modalForm'));
}

// Product Filtering Tabs (on products.html)
const filterBtns = document.querySelectorAll('.product-filter-btn');
const productCards = document.querySelectorAll('.product-grid-extended .product-card');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPos = target.offsetTop - headerHeight - 10;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    }
  });
});
