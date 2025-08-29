// Datepicker initialization
document.addEventListener('DOMContentLoaded', function() {
    const datepickers = document.querySelectorAll('.datepicker');
    
    datepickers.forEach(picker => {
        // Add datepicker functionality
        picker.addEventListener('focus', function() {
            if (!this._datepicker) {
                createDatepicker(this);
            }
        });
    });
    
    function createDatepicker(input) {
        // Create datepicker container
        const datepicker = document.createElement('div');
        datepicker.className = 'custom-datepicker';
        datepicker.style.position = 'absolute';
        datepicker.style.zIndex = '1000';
        datepicker.style.backgroundColor = '#fff';
        datepicker.style.border = '1px solid #ddd';
        datepicker.style.borderRadius = '8px';
        datepicker.style.padding = '10px';
        datepicker.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        
        // Create header with month/year navigation
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.marginBottom = '10px';
        
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.style.background = 'none';
        prevBtn.style.border = 'none';
        prevBtn.style.cursor = 'pointer';
        
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.style.background = 'none';
        nextBtn.style.border = 'none';
        nextBtn.style.cursor = 'pointer';
        
        const monthYear = document.createElement('span');
        monthYear.style.fontWeight = 'bold';
        
        header.appendChild(prevBtn);
        header.appendChild(monthYear);
        header.appendChild(nextBtn);
        
        // Create calendar grid
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekdaysRow = document.createElement('div');
        weekdaysRow.style.display = 'grid';
        weekdaysRow.style.gridTemplateColumns = 'repeat(7, 1fr)';
        weekdaysRow.style.textAlign = 'center';
        weekdaysRow.style.marginBottom = '5px';
        weekdaysRow.style.fontWeight = 'bold';
        
        weekdays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            weekdaysRow.appendChild(dayElement);
        });
        
        const calendarGrid = document.createElement('div');
        calendarGrid.style.display = 'grid';
        calendarGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        calendarGrid.style.gap = '5px';
        
        // Append elements to datepicker
        datepicker.appendChild(header);
        datepicker.appendChild(weekdaysRow);
        datepicker.appendChild(calendarGrid);
        
        // Position datepicker below input
        input.parentNode.appendChild(datepicker);
        positionDatepicker(datepicker, input);
        
        // Initialize calendar
        const currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        
        function renderCalendar(month, year) {
            monthYear.textContent = `${getMonthName(month)} ${year}`;
            calendarGrid.innerHTML = '';
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Add empty cells for days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'datepicker-day empty';
                calendarGrid.appendChild(emptyCell);
            }
            
            // Add cells for each day of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'datepicker-day';
                dayCell.textContent = day;
                
                // Highlight current day
                if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                    dayCell.style.backgroundColor = '#f0f0f0';
                }
                
                // Add click event to select date
                dayCell.addEventListener('click', function() {
                    const selectedDate = new Date(year, month, day);
                    input.value = formatDate(selectedDate);
                    datepicker.style.display = 'none';
                });
                
                calendarGrid.appendChild(dayCell);
            }
        }
        
        // Navigation buttons
        prevBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });
        
        nextBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });
        
        // Initial render
        renderCalendar(currentMonth, currentYear);
        
        // Store reference
        input._datepicker = datepicker;
        
        // Close datepicker when clicking outside
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !datepicker.contains(e.target)) {
                datepicker.style.display = 'none';
            }
        });
    }
    
    function positionDatepicker(datepicker, input) {
        const rect = input.getBoundingClientRect();
        datepicker.style.top = `${rect.bottom + window.scrollY}px`;
        datepicker.style.left = `${rect.left + window.scrollX}px`;
        datepicker.style.width = `${rect.width}px`;
    }
    
    function getMonthName(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }
    
    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
});