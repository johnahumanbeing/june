document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'search-results';
    resultsContainer.style.marginTop = '1em';
    searchInput.parentNode.appendChild(resultsContainer);

    let searchData = null;

    // Fetch search data JSON
    fetch('search-data.json')
        .then(response => response.json())
        .then(data => {
            searchData = data;
        })
        .catch(error => {
            console.error('Error loading search data:', error);
        });

    function renderResults(results) {
        resultsContainer.innerHTML = '';
        if (results.length === 0) {
            resultsContainer.textContent = 'No results found.';
            return;
        }
        const ul = document.createElement('ul');
        results.forEach(item => {
            const li = document.createElement('li');
            if (item.type === 'victim') {
                li.innerHTML = `<strong>${item.name}</strong> (Victim) - ${item.date}: ${item.fate}`;
            } else if (item.type === 'traitor') {
                li.innerHTML = `<strong>${item.name}</strong> (Traitor) - ${item.role}, ${item.actions}${item.constituency ? ', ' + item.constituency : ''}`;
            }
            ul.appendChild(li);
        });
        resultsContainer.appendChild(ul);
    }

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            resultsContainer.innerHTML = '';
            return;
        }
        if (!searchData) {
            resultsContainer.textContent = 'Search data not loaded yet.';
            return;
        }
        const results = [];

        // Search victims
        searchData.victims.forEach(victim => {
            const combined = `${victim.name} ${victim.date} ${victim.fate}`.toLowerCase();
            if (combined.includes(query)) {
                results.push({ ...victim, type: 'victim' });
            }
        });

        // Search traitors
        searchData.traitors.forEach(traitor => {
            const combined = `${traitor.name} ${traitor.role} ${traitor.actions} ${traitor.constituency || ''}`.toLowerCase();
            if (combined.includes(query)) {
                results.push({ ...traitor, type: 'traitor' });
            }
        });

        renderResults(results);
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        }
    });
});
