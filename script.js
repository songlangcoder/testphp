// Carousel functionality for hero section
let currentSlide = 0;
const totalSlides = 5;

function updateCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-1 .dot');
    
    // Update slides
    if (slides.length > 0) {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    // Update dots
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Hero carousel - only initialize if elements exist
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 0) {
    document.querySelector('.hero-1 .left-arrow')?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    document.querySelector('.hero-1 .right-arrow')?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });

    // Add click handlers to dots
    document.querySelectorAll('.hero-1 .dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Initialize carousel
    updateCarousel();
}

// BOOK NOW button functionality
function initBookNowButtons() {
    // Add click handlers to all BOOK NOW buttons
    const bookNowButtons = document.querySelectorAll('.cta-button');
    
    bookNowButtons.forEach(button => {
        // Check if button already has our handler (by checking onclick)
        if (button.hasAttribute('data-book-now-handled')) {
            return; // Skip if already handled
        }
        
        // Mark as handled
        button.setAttribute('data-book-now-handled', 'true');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('BOOK NOW button clicked!');
            
            // Scroll to booking section if it exists on current page
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log('Scrolling to booking section');
            } else {
                // If on another page, redirect to booking page
                console.log('Redirecting to dat-lich.html');
                window.location.href = 'dat-lich.html';
            }
        });
    });
    
    console.log('BOOK NOW buttons initialized:', bookNowButtons.length);
}

// Initialize BOOK NOW buttons
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBookNowButtons);
} else {
    initBookNowButtons();
}

// Also run after a short delay as backup
setTimeout(initBookNowButtons, 500);

// Testimonial carousel
let currentTestimonial = 0;
const totalTestimonials = 3;

function updateTestimonial() {
    // This can be expanded to show different testimonials
    const testimonials = [
        {
            title: "DON'T THINK TWICE, BUY IT!",
            text: "Definitely worth your money if you're looking into buying one! Not only it's beautiful but does the job! Lightweight with a good grip handle. If you really want to invest into your business then I highly recommend splurging on yourself and getting one!",
            author: "— Customer A."
        },
        {
            title: "ABSOLUTELY AMAZING!",
            text: "This is the best product I've ever purchased. The quality is outstanding and it's so easy to use. My clients love the results and I couldn't be happier with my investment!",
            author: "— Customer B."
        },
        {
            title: "GAME CHANGER!",
            text: "This product has completely transformed my nail business. The results are professional and long-lasting. Highly recommend to anyone serious about nail art!",
            author: "— Customer C."
        }
    ];
    
    const testimonial = testimonials[currentTestimonial];
    const titleEl = document.querySelector('.testimonial-title');
    const textEl = document.querySelector('.testimonial-text');
    const authorEl = document.querySelector('.testimonial-author');
    
    if (titleEl) titleEl.textContent = testimonial.title;
    if (textEl) textEl.textContent = testimonial.text;
    if (authorEl) authorEl.textContent = testimonial.author;
}

document.querySelector('.testimonial-nav.left')?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonial();
});

document.querySelector('.testimonial-nav.right')?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonial();
});

// Initialize testimonial (only if elements exist)
const testimonialTitle = document.querySelector('.testimonial-title');
if (testimonialTitle) {
    updateTestimonial();
}

// Scroll to top functionality
const scrollTopBtn = document.querySelector('.scroll-top-btn');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Tab navigation
const tabLinks = document.querySelectorAll('.tab-link');
tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        tabLinks.forEach(tab => tab.classList.remove('active'));
        link.classList.add('active');
    });
});

// Add hover effects to product categories
const categoryItems = document.querySelectorAll('.category-item');
categoryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Mobile menu toggle (for responsive design)
function handleResize() {
    if (window.innerWidth <= 768) {
        // Add mobile menu functionality if needed
        const headerIcons = document.querySelector('.header-icons');
        if (headerIcons) {
            headerIcons.style.flexWrap = 'wrap';
        }
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// Header Icons Functionality - Main functionality for all pages
// Run immediately if DOM is already loaded, or wait for DOMContentLoaded
(function initHeaderIcons() {
    function setupHeaderIcons() {
        // Sticky header effect
        const header = document.querySelector('.header');
        if (header) {
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                if (currentScroll > 100) {
                    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                } else {
                    header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                }
                lastScroll = currentScroll;
            });
        }

        // Initialize scroll top button visibility
        const scrollTopBtn = document.querySelector('.scroll-top-btn');
        if (scrollTopBtn) {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
            scrollTopBtn.style.transition = 'opacity 0.3s, visibility 0.3s';
        }

        // Booking form handling
        const bookingForm = document.querySelector('#bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    service: document.getElementById('service').value,
                    date: document.getElementById('date').value,
                    time: document.getElementById('time').value,
                    message: document.getElementById('message').value
                };
                
                // Validate required fields
                if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
                    alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
                    return;
                }
                
                // Show success message
                alert(`Cảm ơn ${formData.name}! Đặt lịch của bạn đã được ghi nhận.\n\nThông tin đặt lịch:\n- Dịch vụ: ${formData.service}\n- Ngày: ${formData.date}\n- Giờ: ${formData.time}\n\nChúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận!`);
                
                // Reset form
                bookingForm.reset();
            });
            
            // Set minimum date to today
            const dateInput = document.getElementById('date');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.setAttribute('min', today);
            }
        }

        // Observe elements for animation (only on pages that have these elements)
        const animatedElements = document.querySelectorAll('.category-item, .celebrity-item, .testimonial-container');
        if (animatedElements.length > 0) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
        
        // Search Button
        const searchBtn = document.getElementById('searchBtn');
        const searchModal = document.getElementById('searchModal');
        const closeSearchModal = document.getElementById('closeSearchModal');
        const searchInput = document.getElementById('searchInput');
        const searchSubmitBtn = document.getElementById('searchSubmitBtn');
        const searchResults = document.getElementById('searchResults');
        
        console.log('Search button found:', !!searchBtn, 'Search modal found:', !!searchModal);
        
        if (searchBtn && searchModal) {
            searchBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Search button clicked');
                searchModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                if (searchInput) searchInput.focus();
                return false;
            };
            
            if (closeSearchModal) {
                closeSearchModal.addEventListener('click', () => {
                    searchModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }
            
            window.addEventListener('click', (e) => {
                if (e.target === searchModal) {
                    searchModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Search functionality
        const services = [
            'Manicure', 'Pedicure', 'Gel Nails', 'Nail Art', 'Acrylic Nails', 
            'Dip Powder', 'Ombre Nails', '3D Nail Art', 'SNS Dip Powder', 'Paraffin Wax'
        ];
        
        function performSearch(query) {
            if (!searchResults) return;
            if (!query || query.trim() === '') {
                searchResults.innerHTML = '<p class="search-placeholder">Nhập từ khóa để tìm kiếm...</p>';
                return;
            }
            
            const results = services.filter(service => 
                service.toLowerCase().includes(query.toLowerCase())
            );
            
            if (results.length === 0) {
                searchResults.innerHTML = '<p class="search-placeholder">Không tìm thấy kết quả nào.</p>';
            } else {
                searchResults.innerHTML = results.map(service => `
                    <div class="search-result-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${service}</span>
                        <button class="view-service-btn" onclick="location.href='dich-vu.html'">Xem</button>
                    </div>
                `).join('');
            }
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                performSearch(e.target.value);
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch(e.target.value);
                }
            });
        }
        
        if (searchSubmitBtn) {
            searchSubmitBtn.addEventListener('click', () => {
                if (searchInput) performSearch(searchInput.value);
            });
        }
        
        // Favorite Button
        const favoriteBtn = document.getElementById('favoriteBtn');
        const favoriteModal = document.getElementById('favoriteModal');
        const closeFavoriteModal = document.getElementById('closeFavoriteModal');
        const favoritesList = document.getElementById('favoritesList');
        
        console.log('Favorite button found:', !!favoriteBtn, 'Favorite modal found:', !!favoriteModal);
        
        // Load favorites from localStorage
        function loadFavorites() {
            if (!favoritesList) return;
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (favorites.length === 0) {
                favoritesList.innerHTML = '<p class="empty-favorites">Bạn chưa có dịch vụ yêu thích nào.</p>';
            } else {
                favoritesList.innerHTML = favorites.map(item => `
                    <div class="favorite-item">
                        <span>${item}</span>
                        <button class="remove-favorite-btn" data-service="${item}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('');
                
                // Add remove listeners
                favoritesList.querySelectorAll('.remove-favorite-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const service = btn.getAttribute('data-service');
                        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                        favorites = favorites.filter(f => f !== service);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                        loadFavorites();
                        updateFavoriteIcon();
                    });
                });
            }
        }
        
        function updateFavoriteIcon() {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (favoriteBtn) {
                if (favorites.length > 0) {
                    favoriteBtn.classList.add('has-favorites');
                    favoriteBtn.title = `Yêu thích (${favorites.length})`;
                } else {
                    favoriteBtn.classList.remove('has-favorites');
                    favoriteBtn.title = 'Yêu thích';
                }
            }
        }
        
        if (favoriteBtn && favoriteModal) {
            favoriteBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Favorite button clicked');
                loadFavorites();
                favoriteModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                return false;
            };
            
            if (closeFavoriteModal) {
                closeFavoriteModal.addEventListener('click', () => {
                    favoriteModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }
            
            window.addEventListener('click', (e) => {
                if (e.target === favoriteModal) {
                    favoriteModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Add to favorites from service cards, promo cards, and learn cards
        document.querySelectorAll('.service-card, .new-service-card, .promo-card, .learn-card').forEach(card => {
            const title = card.querySelector('h3');
            if (title) {
                const serviceName = title.textContent.trim();
                
                // Check if already in favorites to set initial state
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                const isFavorite = favorites.includes(serviceName);
                
                // Check if button already exists to avoid duplicates
                if (card.querySelector('.add-to-favorite-btn')) {
                    return;
                }
                
                const favoriteIcon = document.createElement('button');
                favoriteIcon.className = 'add-to-favorite-btn';
                favoriteIcon.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
                favoriteIcon.title = isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích';
                if (isFavorite) {
                    favoriteIcon.style.color = '#8b2635';
                }
                
                favoriteIcon.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    let currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                    if (!currentFavorites.includes(serviceName)) {
                        currentFavorites.push(serviceName);
                        localStorage.setItem('favorites', JSON.stringify(currentFavorites));
                        favoriteIcon.innerHTML = '<i class="fas fa-heart"></i>';
                        favoriteIcon.style.color = '#8b2635';
                        favoriteIcon.title = 'Bỏ yêu thích';
                        alert(`Đã thêm "${serviceName}" vào yêu thích!`);
                        updateFavoriteIcon();
                    } else {
                        // Remove from favorites
                        currentFavorites = currentFavorites.filter(f => f !== serviceName);
                        localStorage.setItem('favorites', JSON.stringify(currentFavorites));
                        favoriteIcon.innerHTML = '<i class="far fa-heart"></i>';
                        favoriteIcon.style.color = '';
                        favoriteIcon.title = 'Thêm vào yêu thích';
                        alert(`Đã xóa "${serviceName}" khỏi yêu thích!`);
                        updateFavoriteIcon();
                    }
                });
                
                // Insert the button at the beginning of the card, or after the image if exists
                const imageWrapper = card.querySelector('.service-image-wrapper, .service-image-new, .promo-image-wrapper, .learn-image');
                if (imageWrapper) {
                    imageWrapper.style.position = 'relative';
                    imageWrapper.appendChild(favoriteIcon);
                } else {
                    // Fallback: insert after title
                    title.parentNode.insertBefore(favoriteIcon, title.nextSibling);
                }
            }
        });
        
        // Initialize favorite icon
        updateFavoriteIcon();
        
        // Booking Button - Scroll to booking section
        const bookingBtn = document.getElementById('bookingBtn');
        console.log('Booking button found:', !!bookingBtn);
        if (bookingBtn) {
            bookingBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Booking button clicked');
                const bookingSection = document.getElementById('booking');
                if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    // If on another page, redirect to booking page
                    window.location.href = 'dat-lich.html';
                }
                return false;
            };
        }
        
        console.log('All header icon functionality initialized');
    }
    
    // Run immediately if DOM is ready, or wait for DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupHeaderIcons);
    } else {
        // DOM is already loaded
        setupHeaderIcons();
    }
})();

// Simple direct initialization for header icons - works on all pages
function initHeaderButtons() {
    console.log('Initializing header buttons...');
    
    // Search Button
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    console.log('Search button:', searchBtn, 'Modal:', searchModal);
    
    if (searchBtn && searchModal) {
        searchBtn.onclick = null;
        searchBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Search button clicked! Opening modal...');
            searchModal.classList.add('show');
            searchModal.style.display = 'block';
            searchModal.style.visibility = 'visible';
            searchModal.style.opacity = '1';
            searchModal.style.zIndex = '10000';
            document.body.style.overflow = 'hidden';
            const searchInput = document.getElementById('searchInput');
            if (searchInput) setTimeout(() => searchInput.focus(), 100);
            return false;
        };
        
        const closeSearchModal = document.getElementById('closeSearchModal');
        if (closeSearchModal) {
            closeSearchModal.onclick = function(e) {
                e.preventDefault();
                searchModal.classList.remove('show');
                searchModal.style.display = 'none';
                searchModal.style.visibility = 'hidden';
                searchModal.style.opacity = '0';
                document.body.style.overflow = 'auto';
                return false;
            };
        }
        
        searchModal.onclick = function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('show');
                searchModal.style.display = 'none';
                searchModal.style.visibility = 'hidden';
                searchModal.style.opacity = '0';
                document.body.style.overflow = 'auto';
            }
        };
    }
    
    // Favorite Button
    const favoriteBtn = document.getElementById('favoriteBtn');
    const favoriteModal = document.getElementById('favoriteModal');
    const favoritesList = document.getElementById('favoritesList');
    console.log('Favorite button:', favoriteBtn, 'Modal:', favoriteModal, 'List:', favoritesList);
    
    // Load favorites function
    function loadFavorites() {
        console.log('loadFavorites() called');
        
        if (!favoritesList) {
            console.warn('favoritesList element not found');
            // Try to find it again
            const list = document.getElementById('favoritesList');
            if (list) {
                console.log('Found favoritesList on retry');
                // Update the reference
                // favoritesList = list; // Can't reassign const, but we'll use list
                return loadFavoritesDirect(list);
            }
            return;
        }
        
        return loadFavoritesDirect(favoritesList);
    }
    
    function loadFavoritesDirect(listElement) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        console.log('Loaded favorites from localStorage:', favorites, 'Count:', favorites.length);
        
        if (favorites.length === 0) {
            listElement.innerHTML = '<p class="empty-favorites">Bạn chưa có dịch vụ yêu thích nào.</p>';
            console.log('No favorites to display');
        } else {
            console.log('Displaying', favorites.length, 'favorites');
            listElement.innerHTML = favorites.map(item => `
                <div class="favorite-item">
                    <span>${item}</span>
                    <button class="remove-favorite-btn" data-service="${item}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
            
            // Add remove listeners
            listElement.querySelectorAll('.remove-favorite-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const service = btn.getAttribute('data-service');
                    let currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                    currentFavorites = currentFavorites.filter(f => f !== service);
                    localStorage.setItem('favorites', JSON.stringify(currentFavorites));
                    console.log('Removed favorite:', service, 'Remaining:', currentFavorites);
                    loadFavorites();
                    
                    // Update favorite icon badge
                    if (currentFavorites.length > 0) {
                        if (favoriteBtn) {
                            favoriteBtn.classList.add('has-favorites');
                            favoriteBtn.title = `Yêu thích (${currentFavorites.length})`;
                        }
                    } else {
                        if (favoriteBtn) {
                            favoriteBtn.classList.remove('has-favorites');
                            favoriteBtn.title = 'Yêu thích';
                        }
                    }
                });
            });
        }
    }
    
    if (favoriteBtn && favoriteModal && favoritesList) {
        favoriteBtn.onclick = null;
        favoriteBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Favorite button clicked! Opening modal...');
            
            // Load favorites before opening modal
            loadFavorites();
            
            favoriteModal.classList.add('show');
            favoriteModal.style.display = 'block';
            favoriteModal.style.visibility = 'visible';
            favoriteModal.style.opacity = '1';
            favoriteModal.style.zIndex = '10000';
            document.body.style.overflow = 'hidden';
            
            console.log('Modal opened with favorites loaded');
            return false;
        };
        
        const closeFavoriteModal = document.getElementById('closeFavoriteModal');
        if (closeFavoriteModal) {
            closeFavoriteModal.onclick = function(e) {
                e.preventDefault();
                favoriteModal.classList.remove('show');
                favoriteModal.style.display = 'none';
                favoriteModal.style.visibility = 'hidden';
                favoriteModal.style.opacity = '0';
                document.body.style.overflow = 'auto';
                return false;
            };
        }
        
        favoriteModal.onclick = function(e) {
            if (e.target === favoriteModal) {
                favoriteModal.classList.remove('show');
                favoriteModal.style.display = 'none';
                favoriteModal.style.visibility = 'hidden';
                favoriteModal.style.opacity = '0';
                document.body.style.overflow = 'auto';
            }
        };
    }
    
    // Booking Button
    const bookingBtn = document.getElementById('bookingBtn');
    console.log('Booking button:', bookingBtn);
    
    if (bookingBtn) {
        bookingBtn.onclick = null;
        bookingBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Booking button clicked!');
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.log('Redirecting to dat-lich.html...');
                window.location.href = 'dat-lich.html';
            }
            return false;
        };
    }
    
    console.log('Header buttons initialization complete!');
}

// Run on multiple events to ensure it works
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderButtons);
} else {
    initHeaderButtons();
}

window.addEventListener('load', initHeaderButtons);

// Also run after a short delay as final backup
setTimeout(initHeaderButtons, 500);

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            mainNav.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                if (mainNav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            return false;
        };
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active')) {
                if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    mainNav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

// Initialize mobile menu
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

window.addEventListener('load', initMobileMenu);
setTimeout(initMobileMenu, 500);

console.log('Web Demo website loaded successfully!');

// Seller login functionality
(function initSellerLogin() {
    const sellerBtn = document.getElementById('sellerBtn');
    const sellerModal = document.getElementById('sellerModal');
    const closeSellerModal = document.getElementById('closeSellerModal');
    const sellerLoginForm = document.getElementById('sellerLoginForm');
    const sellerCancelBtn = document.getElementById('sellerCancelBtn');
    const sellerPanel = document.getElementById('sellerPanel');
    const sellerNameDisplay = document.getElementById('sellerNameDisplay');
    const sellerLogoutBtn = document.getElementById('sellerLogoutBtn');
    const sellerDashboardBtn = document.getElementById('sellerDashboardBtn');

    if (!sellerBtn || !sellerModal) {
        console.log('Seller login elements not found on this page.');
        return;
    }

    // Demo credentials (in a real app replace with server-side auth)
    const DEMO_EMAIL = 'seller@example.com';
    const DEMO_PASS = 'sellerpass';

    function openSellerModal() {
        sellerModal.style.display = 'block';
        sellerModal.style.visibility = 'visible';
        sellerModal.style.opacity = '1';
        document.body.style.overflow = 'hidden';

        const emailInput = document.getElementById('sellerEmail');
        if (emailInput) setTimeout(() => emailInput.focus(), 80);

        // Render appropriate view based on login state
        renderSellerState();
    }

    function closeModal() {
        sellerModal.style.display = 'none';
        sellerModal.style.visibility = 'hidden';
        sellerModal.style.opacity = '0';
        document.body.style.overflow = 'auto';
    }

    function isSellerLoggedIn() {
        try {
            const s = JSON.parse(localStorage.getItem('sellerAuth') || 'null');
            return s && s.email;
        } catch (e) {
            return false;
        }
    }

    function renderSellerState() {
        const auth = JSON.parse(localStorage.getItem('sellerAuth') || 'null');
        const formWrapper = document.getElementById('sellerFormWrapper');
        if (auth && auth.email) {
            // show panel
            if (formWrapper) formWrapper.style.display = 'none';
            sellerPanel.style.display = 'block';
            sellerNameDisplay.textContent = auth.email;
        } else {
            // show login form
            if (formWrapper) formWrapper.style.display = 'block';
            sellerPanel.style.display = 'none';
        }
    }

    sellerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openSellerModal();
        return false;
    });

    if (closeSellerModal) {
        closeSellerModal.addEventListener('click', closeModal);
    }

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === sellerModal) {
            closeModal();
        }
    });

    // Cancel button
    if (sellerCancelBtn) {
        sellerCancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // Login form submit
    if (sellerLoginForm) {
        sellerLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('sellerEmail').value.trim();
            const pass = document.getElementById('sellerPassword').value;

            if (!email || !pass) {
                alert('Vui lòng nhập email và mật khẩu.');
                return;
            }

            // Simple client-side auth for demo
            if (email === DEMO_EMAIL && pass === DEMO_PASS) {
                const auth = { email: email, loggedAt: new Date().toISOString() };
                localStorage.setItem('sellerAuth', JSON.stringify(auth));
                alert('Đăng nhập thành công!');
                renderSellerState();
            } else {
                alert('Email hoặc mật khẩu không đúng. Dùng demo: seller@example.com / sellerpass');
            }
        });
    }

    // Logout
    if (sellerLogoutBtn) {
        sellerLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('sellerAuth');
            renderSellerState();
            alert('Bạn đã đăng xuất.');
            closeModal();
        });
    }

    // Dashboard button - for demo redirect to a placeholder page
    if (sellerDashboardBtn) {
        sellerDashboardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real app this would go to /seller/dashboard
            window.location.href = 'seller-dashboard.html';
        });
    }

    // On load, if seller is already logged in, update icon state
    if (isSellerLoggedIn()) {
        sellerBtn.classList.add('seller-logged-in');
    }
})();
