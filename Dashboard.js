// Dashboard Module
const Dashboard = (() => {
    // Sample creator data
    const creators = [
        { id: 1, name: "Alex Rivera", revenue: 5250, color: "#3a86ff" },
        { id: 2, name: "Jamie Chen", revenue: 4200, color: "#8338ec" },
        { id: 3, name: "Taylor Morgan", revenue: 3875, color: "#06d6a0" },
        { id: 4, name: "Casey Kim", revenue: 3520, color: "#ffd166" },
        { id: 5, name: "Jordan Patel", revenue: 2980, color: "#ef476f" },
        { id: 6, name: "Riley Smith", revenue: 2450, color: "#118ab2" },
        { id: 7, name: "Quinn Davis", revenue: 2100, color: "#073b4c" },
        { id: 8, name: "Avery Johnson", revenue: 1850, color: "#f3722c" }
    ];

    let commissionInterval = null;
    let managerToggle, managerView, commissionGrid, totalCommissionDisplay;

    // Accessibility: keyboard toggle support
    function setupToggleAccessibility() {
        managerToggle.addEventListener('keyup', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                managerToggle.checked = !managerToggle.checked;
                managerToggle.dispatchEvent(new Event('change'));
            }
        });
    }

    // Sidebar keyboard navigation
    function setupSidebarAccessibility() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    navItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    item.setAttribute('aria-current', 'page');
                }
            });
        });
    }

    // Function to generate random fluctuation in revenue (for simulation)
    function fluctuateRevenue(baseRevenue) {
        const fluctuation = (Math.random() * 0.1) - 0.05; // -5% to +5%
        return baseRevenue * (1 + fluctuation);
    }

    // Function to update commission display
    function updateCommissions() {
        let totalCommission = 0;
        // Create document fragment for performance
        const fragment = document.createDocumentFragment();

        creators.forEach(creator => {
            const fluctuatedRevenue = fluctuateRevenue(creator.revenue);
            const commission = fluctuatedRevenue * 0.1; // 10% commission
            totalCommission += commission;

            const card = document.createElement('div');
            card.className = 'commission-card';
            card.innerHTML = `
                <div class="creator-name">${creator.name}</div>
                <div class="commission-detail">
                    <span>Revenue:</span>
                    <span>$${fluctuatedRevenue.toFixed(2)}</span>
                </div>
                <div class="commission-detail">
                    <span>Your 10%:</span>
                    <span>$${commission.toFixed(2)}</span>
                </div>
                <div class="commission-total">
                    <span>Updated: ${new Date().toLocaleTimeString()}</span>
                </div>
            `;
            fragment.appendChild(card);
        });

        // Only update DOM if something has changed
        commissionGrid.innerHTML = '';
        commissionGrid.appendChild(fragment);

        totalCommissionDisplay.textContent = `$${totalCommission.toFixed(2)}`;
    }

    function startCommissionUpdates() {
        updateCommissions(); // Initial update
        if (!commissionInterval) {
            commissionInterval = setInterval(updateCommissions, 3000); // Update every 3 seconds
        }
    }

    function stopCommissionUpdates() {
        clearInterval(commissionInterval);
        commissionInterval = null;
    }

    function handleManagerToggleChange() {
        managerToggle.setAttribute('aria-checked', managerToggle.checked ? 'true' : 'false');
        if (managerToggle.checked) {
            managerView.hidden = false;
            startCommissionUpdates();
        } else {
            managerView.hidden = true;
            stopCommissionUpdates();
        }
    }

    function setupManagerToggle() {
        managerToggle.addEventListener('change', handleManagerToggleChange);
        setupToggleAccessibility();
    }

    function init() {
        managerToggle = document.getElementById('managerToggle');
        managerView = document.getElementById('managerView');
        commissionGrid = document.getElementById('commissionGrid');
        totalCommissionDisplay = document.getElementById('totalCommission');

        setupManagerToggle();
        setupSidebarAccessibility();

        // Initialize dashboard
        console.log("Dashboard initialized with dummy data for testing");
    }
    return { init };
})();

// DOMContentLoaded for safe initialization
document.addEventListener('DOMContentLoaded', Dashboard.init);
