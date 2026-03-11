//home 

function toggleRows() {
    const hiddenRows = document.querySelectorAll('.hidden-row');
    const viewMoreBtn = document.querySelector('.view-more');

    hiddenRows.forEach(row => {
        if (row.style.display === 'block') {
            row.style.display = 'none';
            viewMoreBtn.textContent = 'view more';
        } else {
            row.style.display = 'block';
            viewMoreBtn.textContent = 'view less';
        }
    });
}    


document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.gallery-item');
    if (items.length === 0) return;

    let currentItem = 0;

    // Force immediate display of first image
    items[0].style.opacity = '1';
    items[0].style.zIndex = '1';

    function nextSlide() {
        items[currentItem].style.opacity = '0';
        items[currentItem].style.zIndex = '-1';

        const nextItem = (currentItem + 1) % items.length;
        items[nextItem].style.opacity = '1';
        items[nextItem].style.zIndex = '1';

        currentItem = nextItem;
    }

    setInterval(nextSlide, 5000);
});



document.addEventListener('DOMContentLoaded', function() {
    function rotateGallery(containerClass) {
        const items = document.querySelectorAll(`.${containerClass} .comp-gallery-item`);
        if (items.length === 0) return;

        let currentIndex = 0;

        setInterval(() => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }, 2000);
    }

    rotateGallery('gallery-container');
    rotateGallery('comp-gallery-container');
});



// research

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.research-card');
    const descContainer = document.querySelector('.description-container');
    const descriptions = document.querySelectorAll('.description-box');

    let activeCard = null;

    function updateContainerHeight(targetDesc) {
        const height = targetDesc.offsetHeight;
        descContainer.style.height = `${height}px`;
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const research = card.dataset.research;
            const targetDesc = document.getElementById(`${research}-desc`);

            if (!targetDesc) return;

            cards.forEach(c => c.classList.remove('active'));
            descriptions.forEach(d => d.classList.remove('active'));

            if (activeCard === card) {
                descContainer.style.height = '0';
                activeCard = null;
            } else {
                card.classList.add('active');
                targetDesc.classList.add('active');
                targetDesc.style.display = 'block';
                updateContainerHeight(targetDesc);
                activeCard = card;
            }
        });
    });
});



// publications

function populateYearDropdown() {
    const yearSelect = document.getElementById('yearFilter');
    if (!yearSelect) return;
    const currentYear = new Date().getFullYear();
    const startYear = 2020;

    yearSelect.innerHTML = '<option value="all">All Years</option>';

    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

let currentYear = 'all';
let currentCategory = 'all';

function applyFilters() {
    const publications = document.querySelectorAll('.publication-item');
    const searchInput = document.getElementById('searchInput');
    const searchVal = searchInput ? searchInput.value.toLowerCase() : '';

    publications.forEach(pub => {
        let text = pub.textContent.toLowerCase();
        let yearMatch = text.match(/\d{4}/);
        let pubYear = yearMatch ? yearMatch[0] : '';
        let category = pub.getAttribute('data-category');

        let yearMatches = currentYear === 'all' || pubYear === currentYear;
        let categoryMatches = currentCategory === 'all' || category === currentCategory;
        let searchMatches = text.includes(searchVal);

        pub.style.display = (yearMatches && categoryMatches && searchMatches) ? '' : 'none';
    });
}

function filterCategory(category) {
    const buttons = document.querySelectorAll('.category-buttons button');
    currentCategory = category;

    buttons.forEach(button => {
        button.style.background = 'white';
        button.style.color = 'var(--primary-color)';
    });
    if (event && event.target) {
        event.target.style.background = 'var(--primary-color)';
        event.target.style.color = 'white';
    }

    applyFilters();
}

function initializeFilters() {
    populateYearDropdown();
    currentYear = 'all';
    currentCategory = 'all';

    const yearFilter = document.getElementById('yearFilter');
    if (yearFilter) {
        yearFilter.addEventListener('change', function() {
            currentYear = this.value;
            applyFilters();
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            applyFilters();
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeFilters);



// Scroll to top button
const scrollBtn = document.getElementById("scrollToTop");
if (scrollBtn) {
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    };

    scrollBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}



// Contact

function toggleMap() {
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        mapContainer.classList.toggle('map-visible');
    }
}

function togglePopup() {
    const popup = document.getElementById('contactForm');
    if (popup) {
        popup.classList.toggle('active');
    }
}
