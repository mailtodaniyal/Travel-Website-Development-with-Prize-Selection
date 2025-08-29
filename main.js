// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Initialize date pickers
    const datepickers = document.querySelectorAll('.datepicker');
    datepickers.forEach(picker => {
        picker.addEventListener('focus', function() {
            this.type = 'date';
        });
    });
    
    // Filter toggle for mobile
    const filterToggle = document.createElement('button');
    filterToggle.className = 'btn-secondary filter-toggle';
    filterToggle.innerHTML = '<i class="fas fa-filter"></i> Filters';
    const resultsHeader = document.querySelector('.results-header');
    
    if (window.innerWidth <= 768 && resultsHeader) {
        resultsHeader.insertBefore(filterToggle, resultsHeader.firstChild);
        const filtersSidebar = document.querySelector('.filters-sidebar');
        
        filterToggle.addEventListener('click', function() {
            filtersSidebar.classList.toggle('active');
        });
    }
    
    // Wishlist toggle
    const wishlistButtons = document.querySelectorAll('.card-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#FF6B6B';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    });
    
    // Room selection
    const roomSelectButtons = document.querySelectorAll('.room-card .btn-primary');
    roomSelectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const roomCard = this.closest('.room-card');
            document.querySelectorAll('.room-card').forEach(card => {
                card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            });
            roomCard.style.boxShadow = '0 0 0 2px #FF6B6B, 0 4px 12px rgba(0, 0, 0, 0.1)';
            this.textContent = 'Selected';
            this.style.backgroundColor = '#006F7C';
        });
    });
    
    // Duration selection
    const durationOptions = document.querySelectorAll('.duration-option');
    durationOptions.forEach(option => {
        option.addEventListener('click', function() {
            durationOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Flight tabs
    const flightTabs = document.querySelectorAll('.flight-tab');
    flightTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            flightTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Price range slider
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            const minPrice = document.querySelector('.price-values span:first-child');
            const maxPrice = document.querySelector('.price-values span:last-child');
            const value = this.value;
            minPrice.textContent = `£${500}`;
            maxPrice.textContent = `£${value}`;
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Initialize calendar
    initializeCalendar();
});

// Calendar functionality
function initializeCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    function renderCalendar(month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const currentMonthElement = document.querySelector('.current-month');
        
        currentMonthElement.textContent = `${months[month]} ${year}`;
        calendarGrid.innerHTML = '';
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyCell);
        }
        
        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            // Randomly mark some days as available (for demo)
            const isAvailable = Math.random() > 0.3;
            if (isAvailable) {
                dayCell.classList.add('available');
                
                dayCell.addEventListener('click', function() {
                    document.querySelectorAll('.calendar-day').forEach(cell => {
                        cell.classList.remove('selected');
                    });
                    this.classList.add('selected');
                });
            } else {
                dayCell.classList.add('unavailable');
            }
            
            // Highlight current day
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayCell.classList.add('current');
            }
            
            calendarGrid.appendChild(dayCell);
        }
    }
    
    // Navigation buttons
    document.querySelector('.btn-date-nav.prev').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    document.querySelector('.btn-date-nav.next').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    // Initial render
    renderCalendar(currentMonth, currentYear);
}