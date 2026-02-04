// ----------------- NAVBAR COLLAPSE -----------------
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar.classList.contains('show')) {
      new bootstrap.Collapse(navbar).toggle();
    }
  });
});

// ----------------- TOGGLE PHONE & EMAIL -----------------
document.querySelectorAll(".toggle-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

// ----------------- UNDERLINE SCROLL ANIMATION -----------------
const sections = document.querySelectorAll('section');

function handleUnderline() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const underline = section.querySelector('.underline');

    if (!underline) return;

    // Section is visible in viewport
    if (rect.top < window.innerHeight * 0.7 && rect.bottom > 100) {
      underline.classList.add('active'); // show line
    } else {
      underline.classList.remove('active'); // hide line
    }
  });
}

// Run on scroll and on page load
window.addEventListener('scroll', handleUnderline);
window.addEventListener('load', handleUnderline);



