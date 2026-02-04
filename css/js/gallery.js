// Gallery lightbox functionality
function openLightbox(imageSrc, title) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
      <img src="${imageSrc}" alt="${title}">
      <h4>${title}</h4>
    </div>
  `;
  
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;
  
  document.body.appendChild(lightbox);
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    lightbox.remove();
  }
}

// Filter gallery items
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  
  galleryCards.forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      const title = this.querySelector('.card-title').textContent;
      openLightbox(img.src, title);
    });
  });
});