document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-modal');
    const bookButtons = document.querySelectorAll('.book-now');
    const bookingForm = document.getElementById('bookingForm');
    const serviceTypeInput = document.getElementById('serviceType');
    const serviceTierInput = document.getElementById('serviceTier');

    // Open modal when Book Now is clicked
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const tier = this.getAttribute('data-tier');
            
            serviceTypeInput.value = service;
            serviceTierInput.value = tier;
            
            modal.style.display = 'flex';
        });
    });

    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const bookingData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            service: formData.get('serviceType'),
            tier: formData.get('serviceTier')
        };

        // Here you would typically send this data to your server
        console.log('Booking Data:', bookingData);
        
        // For now, just show an alert
        alert('Thank you for your booking! I will contact you soon.');
        
        // Close modal and reset form
        modal.style.display = 'none';
        bookingForm.reset();
    });
});
