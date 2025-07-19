document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    // Staggered fade-in animation for cards
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); // 100ms delay between each card
    });
});