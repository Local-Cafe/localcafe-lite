// Menu filtering functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (filterButtons.length === 0 || menuCards.length === 0) {
    return; // No filters or menu cards on this page
  }

  // Function to apply a filter
  function applyFilter(filter, shouldScroll = false) {
    // Update active state on buttons
    filterButtons.forEach(btn => {
      if (btn.dataset.filter === filter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Filter menu cards
    menuCards.forEach(card => {
      if (filter === 'all') {
        // Show all cards
        card.style.display = '';
      } else {
        // Get card tags (comma-separated string)
        const cardTags = card.dataset.tags || '';
        const tagsArray = cardTags.split(',').map(tag => tag.trim());

        // Show card if it has the selected tag
        if (tagsArray.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      }
    });

    // Scroll to menu section if requested
    if (shouldScroll) {
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Handle filter button clicks
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = button.dataset.filter;

      // Update URL hash
      if (filter === 'all') {
        window.location.hash = 'menu';
      } else {
        window.location.hash = `filter:${filter}`;
      }

      // Apply the filter
      applyFilter(filter);
    });
  });

  // Apply filter on page load based on URL hash
  function applyFilterFromHash() {
    const hash = window.location.hash.slice(1); // Remove the #

    if (hash.startsWith('filter:')) {
      // Extract filter tag from hash
      const filter = hash.replace('filter:', '');
      applyFilter(filter, true); // Scroll to menu section
    } else {
      // Default to showing all
      applyFilter('all');
    }
  }

  // Apply filter on initial page load
  applyFilterFromHash();

  // Listen for hash changes (browser back/forward)
  window.addEventListener('hashchange', applyFilterFromHash);
});

// Dynamic map iframe sizing
document.addEventListener('DOMContentLoaded', () => {
  const locationMaps = document.querySelectorAll('.location-map');

  if (locationMaps.length === 0) {
    return; // No maps on this page
  }

  function resizeMaps() {
    locationMaps.forEach(mapContainer => {
      const iframe = mapContainer.querySelector('iframe');
      if (!iframe) return;

      // Get the container dimensions
      const containerWidth = mapContainer.offsetWidth;
      const containerHeight = mapContainer.offsetHeight;

      // Set iframe dimensions to fill container
      iframe.style.width = `${containerWidth}px`;
      iframe.style.height = `${containerHeight}px`;
    });
  }

  // Initial resize
  resizeMaps();

  // Resize on window resize
  window.addEventListener('resize', resizeMaps);
});

// Hero slideshow
document.addEventListener('DOMContentLoaded', () => {
  const slideshow = document.querySelector('.hero-slideshow');

  if (!slideshow) {
    return; // No slideshow on this page
  }

  const slides = slideshow.querySelectorAll('.hero-slide');

  if (slides.length <= 1) {
    return; // Only one slide, no need to cycle
  }

  let currentSlide = 0;

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  // Change slide every 5 seconds
  setInterval(nextSlide, 5000);
});

// Close mobile menu when clicking a nav link
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!navToggle || navLinks.length === 0) {
    return; // No mobile menu on this page
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.checked = false;
    });
  });
});
