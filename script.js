// Variable globale pour stocker l'ID de l'entreprise sélectionnée
let SELECTED_COMPANY_ID = null;

// Configuration et Plateformes (gardées intactes)
const CONFIG = {
  SHEET_ID: '1gwe5oyDjs_u_qbLbRkjF3cCvLAm1dUO_fG0agUAjfjU',
  TRACKING_SHEET_ID: '13d0sO0isKMQWP5rkkLxhbzpgIVGrd1pARzFLfACMDE0',
  TRACKING_SCRIPT_URL:
    'https://script.google.com/macros/s/AKfycbxxP4Zd-7oozh9EUBSEo5uIf620NYN2bgw3KI9mU5Jx-j9kEC5b2DGI_vILRS6Ae20h/exec',
};

const PLATFORMS = [
  { key: 'facebook', name: 'Facebook', icon: '📘', color: '#1877F2' },
  { key: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2' },
  { key: 'instagram', name: 'Instagram', icon: '📷', color: '#E4405F' },
  { key: 'website', name: 'Site Web', icon: '🌐', color: '#059669' },
  {
    key: 'googleMyBusiness',
    name: 'Google My Business',
    icon: '📍',
    color: '#4285F4',
  },
  {
    key: 'pagesJaunes',
    name: 'Pages Jaunes',
    icon: '📒',
    color: '#FFD700',
  },
];

// ... autres fonctions (showScreen, animateCounter, toggleDropdown, filterCompanies, exportToPDF, exportAllToPDF) -
// NOTE : updateCompanyDropdown, toggleDropdown, filterCompanies, et exportAllToPDF ne sont plus nécessaires ou appelées.
// Les fonctions existantes (comme updateCharts, updatePlatforms) doivent être conservées.

// Fonction pour mettre à jour l'affichage de l'entreprise (MODIFIÉE)
function updateCompanyDisplayCard() {
    if (!analysisData || !SELECTED_COMPANY_ID) return;

    const company = analysisData.companies.find(c => c.id === SELECTED_COMPANY_ID);
    if (company) {
        document.getElementById('currentCompanyName').textContent = company.name;
        document.getElementById('companyScoreText').textContent = `${company.score}%`;
        document.getElementById('companyScoreFill').style.width = `${company.score}%`;
    }
}

// Assurez-vous d'appeler cette fonction dans updateDashboard
function updateDashboard() {
    if (!analysisData || !SELECTED_COMPANY_ID) return;

    const company = analysisData.companies.find(c => c.id === SELECTED_COMPANY_ID);
    if (company) {
        // Mise à jour du nouvel affichage de l'entreprise
        updateCompanyDisplayCard();

        // Mettre à jour l'analyse détaillée
        document.getElementById('analysisScore').textContent = `Score global : ${company.score}%`;

        // Mise à jour des autres composants (charts, plateformes, etc.)
        // updateCharts(company); 
        // updatePlatforms(company); 
        // updateVisibilityLevel(company.score); 

        // NOTE : Les fonctions de mise à jour des graphiques et des plateformes doivent être conservées et basées sur l'ID de l'entreprise sélectionnée.
    }
}


// ... dans la fonction loadData ...
// Exemple de modification de loadData (simulée à partir du snippet) :
document.addEventListener('DOMContentLoaded', function () {
    // ... (Code d'accès) ...

    document.getElementById('loginForm').addEventListener('submit', async function (e) {
        // ... (Logique de vérification du code) ...

        try {
            // ... (Logique de récupération de analysisData) ...

            // 1. DÉSACTIVATION DE LA MISE À JOUR DYNAMIQUE DU TITRE
            document.getElementById('analysisCount').textContent = 'Analyse complète de la visibilité web de votre entreprise';

            animateCounter(
                document.getElementById('globalScoreCount'),
                analysisData.globalAverage
            );

            // 2. SÉLECTION AUTOMATIQUE DE LA PREMIÈRE ENTREPRISE
            if (analysisData.companies && analysisData.companies.length > 0) {
                // Définit l'ID de la première entreprise dans la liste
                SELECTED_COMPANY_ID = analysisData.companies[0].id; 
            }

            // Suppression: updateCompanyDropdown(); 
            updateDashboard();

            showScreen('dashboard');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors du chargement des données: ' + error.message);
            showScreen('accessForm');
        }
    });

    // Suppression de l'écouteur du dropdown
    // document.getElementById('companyDropdown').addEventListener('click', function () { toggleDropdown(); });

    // Suppression de l'écouteur pour fermer le dropdown
    // document.addEventListener('click', function (e) { ... });

    // Suppression de l'écouteur de la barre de recherche
    // document.getElementById('searchInput').addEventListener('input', function (e) { filterCompanies(e.target.value); });

    // MODIFICATION DE L'ÉCOUTEUR DU BOUTON D'EXPORT pour Ctrl+P
    document
        .getElementById('exportIndividual')
        .addEventListener('click', function() {
            // Action Ctrl+P
            window.print();
        });
    
    // Suppression de l'écouteur pour exporter tous les résultats
    // document.getElementById('exportAll').addEventListener('click', exportAllToPDF);

    // Bouton retour (gardé intact)
    document.getElementById('backBtn').addEventListener('click', function () {
        showScreen('accessForm');
        // Reset form
        document.getElementById('loginForm').reset();
    });
});