// contact.js — mobile menu + quote form submission

// --- Mobile menu (same behaviour as the main site) ---
const menuToggle = document.querySelector('.menu-toggle');
const closeMenuButton = document.querySelector('.close-menu');
const navbar = document.querySelector('.navbar');

if (menuToggle) menuToggle.addEventListener('click', () => navbar.classList.toggle('active'));
if (closeMenuButton) closeMenuButton.addEventListener('click', () => navbar.classList.remove('active'));

// --- Back to top link in footer ---
document.querySelectorAll('.back-top-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// --- Quote form ---
const form = document.getElementById('quoteForm');
const status = document.getElementById('formStatus');
const submitBtn = form ? form.querySelector('.submit-btn') : null;
const MAX_FILE = 8 * 1024 * 1024; // 8 MB

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Client-side file size check
        const fileInput = document.getElementById('artwork');
        if (fileInput && fileInput.files.length > 0 && fileInput.files[0].size > MAX_FILE) {
            showStatus('error', 'That file is larger than 8 MB. Please attach a smaller file.');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        status.className = 'form-status';
        status.style.display = 'none';

        const data = new FormData(form);

        fetch('save_contact.php', { method: 'POST', body: data })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    // Option A: redirect to a thank-you page (create thank-you.html later)
                    // window.location.href = 'thank-you.html';
                    showStatus('success', res.message || 'Thank you. Your request has been sent — we\'ll be in touch shortly.');
                    form.reset();
                } else {
                    showStatus('error', res.message || 'Something went wrong. Please try again or email us directly.');
                }
            })
            .catch(() => {
                showStatus('error', 'We couldn\'t send your request. Please email enquiries@printpromo.ie directly.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Quote Request';
            });
    });
}

function showStatus(type, msg) {
    status.textContent = msg;
    status.className = 'form-status ' + type;
    status.style.display = 'block';
    status.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
