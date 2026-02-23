// Don counter and feedback
let arbresFinances = 0;

function formatEuros(n) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}

function updateCompteur() {
  const el = document.getElementById('compteur');
  if (el) el.textContent = `Nombre d’arbres symboliquement financés : ${arbresFinances}`;
}

// Handle donation button
const donBtn = document.getElementById('donBtn');
if (donBtn) {
  donBtn.addEventListener('click', () => {
    const montantInput = document.getElementById('montant');
    const feedback = document.getElementById('donFeedback');
    const montant = parseFloat(montantInput.value || '0');

    if (Number.isNaN(montant) || montant <= 0) {
      feedback.textContent = 'Veuillez saisir un montant valide.';
      feedback.style.color = '#b71c1c';
      return;
    }

    // Exemple: 1 arbre symbolique pour 5€
    const arbres = Math.max(1, Math.floor(montant / 5));
    arbresFinances += arbres;
    updateCompteur();

    feedback.textContent = `Merci pour votre don de ${formatEuros(montant)} ! (${arbres} arbre(s) financé(s))`;
    feedback.style.color = '#1b5e20';

    // petite animation visuelle
    donBtn.classList.add('pulse');
    setTimeout(() => donBtn.classList.remove('pulse'), 300);
  });
}

// Reset counter
const resetCounter = document.getElementById('resetCounter');
if (resetCounter) {
  resetCounter.addEventListener('click', () => {
    arbresFinances = 0;
    updateCompteur();
    const feedback = document.getElementById('donFeedback');
    if (feedback) feedback.textContent = 'Compteur réinitialisé.';
  });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const feedback = document.getElementById('contactFeedback');

    if (!nom || !email || !message) {
      feedback.textContent = 'Merci de remplir tous les champs.';
      feedback.style.color = '#b71c1c';
      return;
    }

    feedback.textContent = `Merci ${nom}, votre message a bien été envoyé.`;
    feedback.style.color = '#1b5e20';
    contactForm.reset();
  });
}

// Initial UI updates
updateCompteur();

// Micro animation class (optional)
const style = document.createElement('style');
style.textContent = `
  .pulse { transform: scale(0.98); }
`;
document.head.appendChild(style);
