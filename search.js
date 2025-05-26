document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const mainContent = document.getElementById('main-content');

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            // If query is empty, show all content
            Array.from(mainContent.children).forEach(section => {
                section.style.display = '';
            });
            return;
        }
        // Filter sections based on query matching text content
        Array.from(mainContent.children).forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(query)) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', performSearch);

    // Optional: allow pressing Enter key in input to trigger search
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        }
    });
});
