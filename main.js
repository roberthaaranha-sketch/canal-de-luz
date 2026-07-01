// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile nav toggle
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.terapia-card, .frase-card, .don-item, .alegrese-item, .paraquem-item, .info-card, .sobre-text, .sobre-dons, .alegrese-text, .alegrese-quote, .agendar-form, .agendar-info'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Scroll arrow
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
  document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
});

// Form submission
document.getElementById('formAgendar')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const terapia = document.getElementById('terapia').value;
  const mensagem = document.getElementById('mensagem').value;
  const whatsapp = document.getElementById('whatsapp').value;

  // Build WhatsApp message
  const texto = `Olá Robertha! Me chamo ${nome} e gostaria de agendar uma sessão.\n\nTerapia de interesse: ${terapia || 'a definir'}\n${mensagem ? `\nMensagem: ${mensagem}` : ''}\n\nE-mail: ${email}`;
  const url = `https://wa.me/5511984309434?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
});
