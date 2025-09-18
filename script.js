document.addEventListener('DOMContentLoaded', function() {
    const journalHTML = `
        <div class="content-section-text journal-container">
            <h2>Journal de l'humeur et des pensées</h2>
            <div class="journal-controls">
                <button id="prev-month">&lt;</button>
                <h3 id="current-month-year"></h3>
                <button id="next-month">&gt;</button>
            </div>
            <div id="calendar-grid"></div>
            <div id="journal-entry" style="display:none;">
                <h4>Sélectionnez une couleur pour la journée :</h4>
                <div class="color-picker">
                    <button class="color-btn red" data-color="red"></button>
                    <button class="color-btn yellow" data-color="yellow"></button>
                    <button class="color-btn green" data-color="green"></button>
                </div>
                <h4>Notez vos pensées de la journée :</h4>
                <textarea id="journal-text" rows="8"></textarea>
                <button id="save-entry-btn">Enregistrer</button>
                <p id="message"></p>
            </div>
            <div id="journal-display" style="display:none;">
                <h4 id="display-header">
                    <span id="display-date"></span>
                    <div id="display-color" class="color-box hidden"></div>
                </h4>
                <p id="display-text"></p>
                <button id="edit-entry-btn">Modifier</button>
            </div>
        </div>
    `;
    const exerciceHTML = `
        <div class="app-container-inner">
            <div class="progress-bar">
                <div class="progress-bar-fill" id="progressBar"></div>
            </div>
            <p class="time-estimation">Prenez votre temps, les pensées ne viennent pas toutes de la surface!</p>
            <div id="step-1" class="exercise-step active">
                <img src="https://img.icons8.com/plasticine/100/000000/light-on.png" alt="Icône d'ampoule" class="step-icon">
                <h2>Étape 1 : Identifiez votre pensée négative</h2>
                <p>Quelle pensée négative vous a traversé l'esprit dans une situation difficile ou lorsque vous vous êtes senti(e) mal ?</p>
                <textarea id="pna-input" rows="5" placeholder="Ex: 'Je suis un(e) bon(ne) à rien.' ou 'Personne ne m'aime.'"></textarea>
                <div class="nav-buttons">
                    <button class="continue-btn" data-next="2">Continuer</button>
                </div>
            </div>
            <div id="step-2" class="exercise-step">
                <img src="https://img.icons8.com/plasticine/100/000000/hearts.png" alt="Icône de cœur" class="step-icon">
                <h2>Étape 2 : Quelles émotions ressentez-vous ?</h2>
                <p>Quelles émotions cette pensée a-t-elle déclenchées ? Et quelles sensations physiques avez-vous ressenties ?</p>
                <div class="emotion-selector">
                    <button class="emotion-btn">Tristesse</button>
                    <button class="emotion-btn">Colère</button>
                    <button class="emotion-btn">Anxiété</button>
                    <button class="emotion-btn">Honte</button>
                    <button class="emotion-btn">Culpabilité</button>
                    <button class="emotion-btn">Désespoir</button>
                    <button class="emotion-btn">Frustration</button>
                    <button class="emotion-btn">Solitude</button>
                    <button class="emotion-btn">Vide</button>
                </div>
                <textarea id="emotions-input" rows="3" placeholder="Ex: 'Je me sens découragé(e). J'ai une boule au ventre.'"></textarea>
                <div class="nav-buttons">
                    <button class="back-btn" data-prev="1">Précédent</button>
                    <button class="continue-btn" data-next="3">Continuer</button>
                </div>
            </div>
            <div id="step-3" class="exercise-step">
                <img src="https://img.icons8.com/plasticine/100/000000/search.png" alt="Icône de loupe" class="step-icon">
                <h2>Étape 3 : Quelles preuves avez-vous que cette pensée est VRAIE ?</h2>
                <p>Essayez d'être juste. Quels sont les faits ou observations qui pourraient soutenir votre pensée négative ?</p>
                <textarea id="proof-for-input" rows="5" placeholder="Ex: 'J'ai raté mon examen hier.' ou 'Mon ami(e) ne m'a pas rappelé(e).'" ></textarea>
                <div class="nav-buttons">
                    <button class="back-btn" data-prev="2">Précédent</button>
                    <button class="continue-btn" data-next="4">Continuer</button>
                </div>
            </div>
            <div id="step-4" class="exercise-step">
                <img src="https://img.icons8.com/plasticine/100/000000/scales.png" alt="Icône de balance" class="step-icon">
                <h2>Étape 4 : Quelles preuves avez-vous que cette pensée est FAUSSE ?</h2>
                <p>Cherchez des preuves qui contredisent cette pensée. Y a-t-il d'autres perspectives ou des exceptions ?</p>
                <textarea id="proof-against-input" rows="5" placeholder="Ex: 'J'ai réussi d'autres examens par le passé.' ou 'Mon ami(e) est peut-être occupé(e).'" ></textarea>
                <div class="nav-buttons">
                    <button class="back-btn" data-prev="3">Précédent</button>
                    <button class="continue-btn" data-next="5">Continuer</button>
                </div>
            </div>
            <div id="step-5" class="exercise-step">
                <img src="https://img.icons8.com/plasticine/100/000000/synchronize.png" alt="Icône de reformulation" class="step-icon">
                <h2>Étape 5 : Reformulez vers une pensée plus équilibrée</h2>
                <p>En tenant compte de toutes les preuves, comment pourriez-vous reformuler votre pensée de manière plus réaliste et juste ?</p>
                <textarea id="alternative-thought-input" rows="5" placeholder="Ex: 'J'ai raté un examen, c'est décevant, mais ça ne fait pas de moi un échec total...'"></textarea>
                <div class="nav-buttons">
                    <button class="back-btn" data-prev="4">Précédent</button>
                    <button id="finish-btn">Terminer l'exercice</button>
                </div>
            </div>
            <div id="summary-screen" class="exercise-step">
                <h2>Félicitations d'avoir pris le temps !</h2>
                <p>Vous avez réussi à voir les choses sous un nouvel angle. Chaque petit pas compte.</p>
                <div class="summary-comparison">
                    <div class="summary-box">
                        <h3>Pensée Initiale</h3>
                        <p id="summary-initial"></p>
                    </div>
                    <div class="summary-box">
                        <h3>Pensée Équilibrée</h3>
                        <p id="summary-alternative"></p>
                    </div>
                </div>
                <button id="restart-btn">Recommencer</button>
            </div>
            <div id="safety-modal" class="modal-overlay">
                <div class="modal-content">
                    <h2>Besoin d'aide immédiate ?</h2>
                    <p>Vos mots suggèrent que vous traversez une période très difficile. Il est important de ne pas rester seul(e). Des ressources professionnelles sont disponibles pour vous aider.</p>
                    <a href="tel:1-833-456-4566" class="modal-btn call-btn">Appeler une ligne d'écoute (Canada)</a>
                    <a href="https://www.crisisservicescanada.ca/fr/" target="_blank" class="modal-btn resource-btn">Visiter un site de ressources</a>
                    <button id="close-modal-btn" class="modal-btn continue-btn">Continuer l'exercice</button>
                </div>
            </div>
        </div>
    `;
    // Fonction pour afficher une section
    function showSection(sectionId) {
        console.log('Affichage de la section:', sectionId); // Debug
        
        // Cache toutes les sections
        document.getElementById('home').style.display = 'none';
        document.getElementById('journal').style.display = 'none';
        document.getElementById('exercice').style.display = 'none';
        document.getElementById('ressources').style.display = 'none';
        
        // Affiche la section demandée
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            
            // Charge le contenu dynamique si la section est vide
            if (sectionId === 'journal' && targetSection.innerHTML.length < 100) {
                console.log('Chargement du journal'); // Debug
                targetSection.innerHTML = journalHTML;
                initJournalHandlers();
            } else if (sectionId === 'exercice' && targetSection.innerHTML.length < 100) {
                console.log('Chargement de l\'exercice'); // Debug
                targetSection.innerHTML = exerciceHTML;
                initExerciceHandlers();
            } else if (sectionId === 'ressources' && targetSection.innerHTML.length < 100) {
                console.log('Chargement des ressources'); // Debug
                targetSection.innerHTML = `
                    <div class="content-section-text">
                        <h2>Ressources pour la santé mentale</h2>
                        <p>Voici quelques ressources pour vous aider en cas de besoin. N'hésitez pas à les contacter pour obtenir du soutien professionnel.</p>
                        <div class="content-grid">
                            <a href="tel:1-833-456-4566" class="content-card">
                                <h3>Service d'aide immédiate</h3>
                                <p>En cas de crise ou de détresse psychologique. 24h/24, 7 jours sur 7.</p>
                            </a>
                            <a href="https://www.crisisservicescanada.ca/fr/" target="_blank" class="content-card">
                                <h3>Ressources en ligne</h3>
                                <p>Trouvez des lignes d'écoute et des services de soutien par texto.</p>
                            </a>
                            <a href="https://www.quebec.ca/sante/trouver-une-ressource/consulter-un-professionnel-de-la-sante/soutien-psychologique-et-psychotherapie" target="_blank" class="content-card">
                                <h3>Trouver un psychologue</h3>
                                <p>Informations du gouvernement du Québec pour trouver de l'aide professionnelle.</p>
                            </a>
                        </div>
                    </div>
                `;
            }
        }
    }
    // Initialisation de l'application
    function initApp() {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const navLinks = document.querySelectorAll('.nav-item');
        
        // Toggle sidebar
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }
        // Navigation principale (sidebar)
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.dataset.section;
                if (sectionId) {
                    showSection(sectionId);
                    // Met à jour la classe active
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
        // Navigation depuis les cartes de la page d'accueil
        document.addEventListener('click', (e) => {
            if (e.target.closest('.content-card')) {
                e.preventDefault();
                const card = e.target.closest('.content-card');
                const sectionId = card.dataset.section;
                if (sectionId) {
                    showSection(sectionId);
                    // Met à jour la classe active dans la sidebar
                    navLinks.forEach(nav => {
                        nav.classList.remove('active');
                        if (nav.dataset.section === sectionId) {
                            nav.classList.add('active');
                        }
                    });
                }
            }
        });
        // Affiche la section home par défaut
        showSection('home');
    }
    // Fonctions pour le Journal de l'humeur
    let journalEntries = {};
    let selectedDate = null;
    let selectedColor = null;
    let currentDate = new Date();
    function initJournalHandlers() {
        // Récupère les entrées sauvegardées
        const savedEntries = localStorage.getItem('journalEntries');
        if (savedEntries) {
            journalEntries = JSON.parse(savedEntries);
        }
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthYear = document.getElementById('current-month-year');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');
        const journalEntrySection = document.getElementById('journal-entry');
        const journalDisplaySection = document.getElementById('journal-display');
        const journalTextarea = document.getElementById('journal-text');
        const saveBtn = document.getElementById('save-entry-btn');
        const colorButtons = document.querySelectorAll('.color-btn');
        const messageDisplay = document.getElementById('message');
        const editBtn = document.getElementById('edit-entry-btn');
        const displayDateSpan = document.getElementById('display-date');
        const displayColorDiv = document.getElementById('display-color');
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDayIndex = firstDay.getDay();
            currentMonthYear.textContent = `${currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}`;
            calendarGrid.innerHTML = '';
            // Jours vides au début
            for (let i = 0; i < startDayIndex; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('calendar-day', 'empty');
                calendarGrid.appendChild(emptyDay);
            }
            // Jours du mois
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('calendar-day');
                dayDiv.textContent = i;
                dayDiv.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                
                if (journalEntries[dayDiv.dataset.date]) {
                    dayDiv.classList.add(journalEntries[dayDiv.dataset.date].color);
                }
                dayDiv.addEventListener('click', () => {
                    const allDays = document.querySelectorAll('.calendar-day');
                    allDays.forEach(d => d.classList.remove('selected'));
                    dayDiv.classList.add('selected');
                    selectedDate = dayDiv.dataset.date;
                    
                    if (journalEntries[selectedDate]) {
                        showJournalDisplay(selectedDate);
                    } else {
                        showJournalEntry();
                    }
                });
                calendarGrid.appendChild(dayDiv);
            }
        }
        function showJournalEntry() {
            journalEntrySection.style.display = 'block';
            journalDisplaySection.style.display = 'none';
            journalTextarea.value = '';
            colorButtons.forEach(btn => btn.classList.remove('selected'));
            selectedColor = null;
            messageDisplay.textContent = '';
        }
        function showJournalDisplay(date) {
            journalEntrySection.style.display = 'none';
            journalDisplaySection.style.display = 'block';
            const entry = journalEntries[date];
            
            const [year, month, day] = date.split('-').map(Number);
            const displayDate = new Date(year, month - 1, day);
            displayDateSpan.textContent = displayDate.toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            });
            displayColorDiv.className = `color-box ${entry.color}`; 
            displayColorDiv.classList.remove('hidden'); 
            
            document.getElementById('display-text').textContent = entry.text;
        }
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                colorButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedColor = btn.dataset.color;
            });
        });
        saveBtn.addEventListener('click', () => {
            if (selectedDate && selectedColor && journalTextarea.value.trim() !== '') {
                journalEntries[selectedDate] = {
                    color: selectedColor,
                    text: journalTextarea.value.trim()
                };
                localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
                showJournalDisplay(selectedDate);
                renderCalendar();
            } else {
                messageDisplay.textContent = 'Veuillez sélectionner une couleur et écrire une note.';
            }
        });
        editBtn.addEventListener('click', () => {
            const entry = journalEntries[selectedDate];
            journalTextarea.value = entry.text;
            colorButtons.forEach(btn => {
                if (btn.dataset.color === entry.color) {
                    btn.classList.add('selected');
                    selectedColor = entry.color;
                } else {
                    btn.classList.remove('selected');
                }
            });
            showJournalEntry();
        });
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
            journalDisplaySection.style.display = 'none';
            journalEntrySection.style.display = 'none';
            displayColorDiv.classList.add('hidden');
        });
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
            journalDisplaySection.style.display = 'none';
            journalEntrySection.style.display = 'none';
            displayColorDiv.classList.add('hidden');
        });
        
        renderCalendar();
        journalDisplaySection.style.display = 'none';
        journalEntrySection.style.display = 'none';
    }
    // Fonctions pour l'exercice interactif
    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }
    function initExerciceHandlers() {
        const allSteps = document.querySelectorAll('.exercise-step');
        const progressBar = document.getElementById('progressBar');
        const navButtons = document.querySelectorAll('.nav-buttons button');
        const summaryInitial = document.getElementById('summary-initial');
        const summaryAlternative = document.getElementById('summary-alternative');
        const restartBtn = document.getElementById('restart-btn');
        const pnaInput = document.getElementById('pna-input');
        const alternativeThoughtInput = document.getElementById('alternative-thought-input');
        const emotionButtons = document.querySelectorAll('.emotion-btn');
        const safetyModal = document.getElementById('safety-modal');
        const closeModalBtn = document.getElementById('close-modal-btn');
        
        let currentStep = 1;
        
        function updateProgressBar() {
            let progress = (currentStep - 1) / 4 * 100;
            progressBar.style.width = `${progress}%`;
        }
        function showStep(stepNumber) {
            allSteps.forEach(step => {
                step.classList.remove('active');
            });
            const targetStep = document.getElementById(`step-${stepNumber}`);
            if (targetStep) {
                targetStep.classList.add('active');
            } else if (stepNumber === 6) {
                document.getElementById('summary-screen').classList.add('active');
            }
            currentStep = stepNumber;
            updateProgressBar();
        }
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.id === 'finish-btn') {
                    summaryInitial.textContent = pnaInput.value;
                    summaryAlternative.textContent = alternativeThoughtInput.value;
                    showStep(6);
                }
                else if (this.classList.contains('continue-btn')) {
                    const nextStep = parseInt(this.dataset.next);
                    showStep(nextStep);
                } else if (this.classList.contains('back-btn')) {
                    const prevStep = parseInt(this.dataset.prev);
                    showStep(prevStep);
                }
            });
        });
        emotionButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('selected');
            });
        });
        if (pnaInput) {
            pnaInput.addEventListener('input', debounce(checkSafety, 500));
        }
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                pnaInput.value = '';
                document.getElementById('emotions-input').value = '';
                document.getElementById('proof-for-input').value = '';
                document.getElementById('proof-against-input').value = '';
                alternativeThoughtInput.value = '';
                emotionButtons.forEach(btn => btn.classList.remove('selected'));
                showStep(1);
            });
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                safetyModal.classList.remove('visible');
            });
        }
        
        function checkSafety() {
            const suicideKeywords = [
                "suicide", "mourir", "veux mourir", "planifier ma mort", "mort", "en finir", "souffrance", "plus vivre", "c'est fini", "tuer", "je veux me tuer", "prêt à en finir", "ma vie est un échec", "se pendre", "me gunner", "m'enlever la vie",
                "disparaitre", "se jeter", "se tirer dessus", "prendre des pilules", "overdose", "psychose", "je vois noir", "tout est de ma faute", "je me déteste", "ça ne s'arrangera jamais", "je suis inutile", "personne va s'ennuyer de moi", "je veux disparaitre", 
                "j'aimerais m'endormir pour toujours", "je suis fatigué de me battre", "plus de force", "je veux partir loin d'ici", "il serait temps que ça se termine", "le noir complet", "le vide", "c'est un trou noir", "l'obscurité", "ça fait trop mal", "la douleur est insupportable", "cette souffrance", "mon cœur ne tiendra plus",
                "je suis seul(e)", "personne ne me comprend", "je suis invisible", "je ne vaux rien", "je suis un fardeau"
            ];
            const text = pnaInput.value.toLowerCase();
            const modalVisible = suicideKeywords.some(keyword => text.includes(keyword));
            if (modalVisible) {
                safetyModal.classList.add('visible');
            } else {
                safetyModal.classList.remove('visible');
            }
        }
        showStep(1);
    }
    
    // Initialise l'application au chargement
    initApp();
});