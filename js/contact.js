/**
 * NIRMAL PREM — Contact & Bridal Appointment Engine
 * Form validation, dynamic WhatsApp dispatch, and toast notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('nirmal-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const whatsapp = form.querySelector('[name="whatsapp"]').value.trim() || phone;
    const division = form.querySelector('[name="division"]').value;
    const preference = form.querySelector('[name="preference"]').value;
    const occasion = form.querySelector('[name="occasion"]').value.trim();
    const date = form.querySelector('[name="date"]').value;
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !phone) {
      if (window.showToast) {
        window.showToast('Please provide your name and contact phone number.');
      } else {
        alert('Please provide your name and contact phone number.');
      }
      return;
    }

    // Construct high-touch WhatsApp message
    let waText = `*NIRMAL PREM APPOINTMENT & ENQUIRY*\n`;
    waText += `*Name:* ${name}\n`;
    waText += `*Mobile:* ${phone}\n`;
    waText += `*WhatsApp:* ${whatsapp}\n`;
    waText += `*Interested In:* ${division}\n`;
    waText += `*Preference:* ${preference}\n`;
    if (occasion) waText += `*Occasion:* ${occasion}\n`;
    if (date) waText += `*Preferred Date:* ${date}\n`;
    if (message) waText += `*Message:* ${message}\n`;
    waText += `\n_Submitted via Nirmal Prem Official Website_`;

    const waUrl = window.buildWhatsAppLink(waText);

    // Show celebratory confirmation UI
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Connecting to WhatsApp...</span>`;

    if (window.showToast) {
      window.showToast('Enquiry received! Connecting you with Nirmal Prem concierge on WhatsApp...');
    }

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
    }, 1200);
  });
}
