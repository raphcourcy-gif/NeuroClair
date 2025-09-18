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
                <img src="https://img.icons8.com/plasticine/100/000000/idea.png" alt="Icône d'idée" class="step-icon">
                <h2>Étape 2 : Comprendre les distorsions cognitives</h2>
                <p>Nos pensées négatives sont souvent des raccourcis de l'esprit appelés **distorsions cognitives**. En les reconnaissant, on peut mieux les remettre en question. Voici quelques exemples :</p>
                <ul>
                    <li><strong>Pensée 'tout ou rien'</strong> : "Si je ne suis pas parfait, je suis un échec total."</li>
                    <li><strong>Surgénéralisation</strong> : "Puisque j'ai raté cet entretien, je ne trouverai jamais de travail."</li>
                    <li><strong>Raisonnement émotionnel</strong> : "Je me sens stupide, donc je suis stupide."</li>
                    <li><strong>Personnalisation</strong> : "C'est de ma faute si la réunion s'est mal passée."</li>
                    <li><strong>Inférence arbitraire</strong> : "Elle n'a pas répondu à mon message, donc elle me déteste."</li>
                </ul>
                <div class="nav-buttons">
                    <button class="back-btn" data-prev="1">Précédent</button>
                    <button class="continue-btn" data-next="3">Continuer</button>
                </div>
            </div>
            <div id="step-3" class="exercise-step">
                <img src="https://img.icons8.com/plasticine/100/000000/hearts.png" alt="Icône de cœur" class="step-icon">
                <h2>Étape 3 : Quelles émotions ressentez-vous ?</h2>
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
                    <button class="back-btn" data-prev="2">Précédent</button>
                    <button class="continue-btn" data-next="4">Continuer</button>
                </div>
            </div>
            <div id="step-4" class="exercise-step">
                <img src="https://img.icons8.com/plasticine/100/000000/scales.png" alt="Icône de balance" class="step-icon">
                <h2>Étape 4 : Le questionnement socratique</h2>
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
    const capsulesHTML = `
        <div class="content-section-text">
            <h2>Capsules d'apprentissage</h2>
            <p>Apprenez des concepts clés en psychologie et des outils pour votre bien-être. Cliquez sur une carte pour découvrir son contenu!</p>
            <div class="flashcard-grid">
                </div>
        </div>
    `;
    const ressourcesHTML = `
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
    const flashcardData = [
        {
           front: "La thérapie cognitivo-comportementale (TCC)",
            back: {
                title: "Thérapie cognitivo-comportementale (TCC)",
                text: "Une approche thérapeutique qui vise à identifier et modifier les schémas de pensée négatifs (cognitions) et les comportements problématiques. La TCC est basée sur l'idée que nos pensées influencent nos émotions et nos actions, et en changeant ces pensées, nous pouvons améliorer notre bien-être."
            }
        },
        {
           front: "Neurobiologie simple de la dépression",
            back: {
                title: "Neurobiologie de la dépression",
                text: "La dépression est associée à des déséquilibres dans certains neurotransmetteurs (comme la sérotonine, la dopamine et la noradrénaline) et à des altérations dans certaines régions du cerveau (comme l'amygdale, l'hippocampe et le cortex préfrontal). Ces changements peuvent affecter l'humeur, la motivation, et les fonctions cognitives."
            }
        },
        {
           front: "Psychologie positive",
            back: {
                title: "Psychologie positive",
                text: "Un domaine de la psychologie qui se concentre sur les forces, les vertus et les facteurs qui contribuent au bien-être et à la résilience. Plutôt que de se concentrer uniquement sur les troubles mentaux, la psychologie positive explore ce qui rend la vie digne d'être vécue."
            }
        },
        {
           front: "Journal de gratitude",
            back: {
                title: "Journal de gratitude",
                text: "Une pratique consistant à écrire régulièrement des choses pour lesquelles on est reconnaissant. Tenir un journal de gratitude peut améliorer l'humeur, augmenter le bien-être et réduire les symptômes de dépression en orientant l'attention vers les aspects positifs de la vie."
            }
        },
        {
           front: "Soutien social",
            back: {
                title: "Soutien social",
                text: "Les relations positives avec les autres sont cruciales pour la santé mentale. Un bon réseau de soutien social peut offrir de l'aide émotionnelle, des conseils, et un sentiment d'appartenance, ce qui peut atténuer les effets du stress et de la dépression."
            }
        },
        {
           front: "Les antidépresseurs et ses risques",
            back: {
                title: "Les antidépresseurs et leurs risques",
                text: "Les antidépresseurs, comme les ISRS (inhibiteurs sélectifs de la recapture de la sérotonine), sont souvent prescrits pour traiter la dépression. Cependant, ils peuvent avoir des effets secondaires (nausées, insomnie, dysfonction sexuelle) et ne conviennent pas à tout le monde."
            }
        },
        {
           front: "Les antidépresseurs et ses risques (2)",
            back: {
                title: "Les antidépresseurs et leurs risques",
                text: "Il est important de ne pas arrêter brusquement un traitement antidépresseur sans avis médical, car cela peut entraîner des symptômes de sevrage. La décision de commencer ou d'arrêter un antidépresseur doit toujours être prise en consultation avec un professionnel de santé."
            }
        },
        {
            front: "Traitement ascendant",
            back: {
                title: "Traitement ascendant (bottom-up)",
                text: "Processus de perception qui commence par les informations sensorielles brutes (stimuli) et qui les assemble pour former une représentation mentale. C'est le traitement de l'information guidé par les données entrantes, sans intervention du contexte ou des attentes."
            }
        },
        {
            front: "Traitement descendant",
            back: {
                title: "Traitement descendant (top-down)",
                text: "Processus de perception guidé par nos connaissances, nos attentes, et notre vécu. Le cerveau utilise le contexte et les informations déjà stockées pour interpréter les stimuli sensoriels. C'est ce qui nous permet de reconnaître des objets ou des mots même s'ils sont partiellement cachés."
            }
        },
        {
            front: "Distorsions cognitives",
            back: {
                title: "Distorsions cognitives",
                text: "Des schémas de pensée irrationnels ou exagérés qui faussent notre perception de la réalité. Elles sont souvent à la base des émotions négatives et sont une cible de travail clé en thérapie cognitivo-comportementale (TCC). Exemples : la pensée 'tout ou rien' ou la surgénéralisation."
            }
        },
        {
            front: "Thérapie d'acceptation et d'engagement (ACT)",
            back: {
                title: "Thérapie d'acceptation et d'engagement (ACT)",
                text: "Approche thérapeutique qui vise à accepter les pensées et émotions difficiles plutôt que de les combattre. L'objectif est de s'engager dans des actions qui sont alignées avec ses valeurs profondes, malgré la présence de la souffrance psychologique. Se concentre sur la flexibilité psychologique."
            }
        },
        {
            front: "Ancrage (psychologie)",
            back: {
                title: "Ancrage (ancrage)",
                text: "Un biais cognitif où les individus dépendent trop d'une première information (l'ancre) pour prendre des décisions. Par exemple, lors de la négociation, le prix de départ (l'ancre) influence fortement la valeur perçue du produit."
            }
        },
        {
            front: "Décentration",
            back: {
                title: "Décentration",
                text: "Un processus cognitif qui consiste à se détacher de sa propre perspective pour pouvoir considérer d'autres points de vue. En thérapie, la décentration aide à observer ses pensées comme de simples événements mentaux (et non des faits) et à réduire leur impact émotionnel."
            }
        },
        {
            front: "Condtionnement opérant",
            back: {
                title: "Conditionnement opérant",
                text: "Apprentissage par lequel la fréquence d'un comportement est modifiée par ses conséquences (renforcements ou punitions). Ce concept est crucial pour comprendre comment les comportements liés à la dépression (ex: l'évitement) peuvent se maintenir."
            }
        },
        {
           front: "Condtionnement classique",
            back: {
                title: "Conditionnement classique",
                text: "Un type d'apprentissage qui associe un stimulus neutre à un stimulus inconditionnel, ce qui finit par déclencher une réponse réflexe. Le conditionnement classique agit sur des comportements involontaires et passifs."
            }
        },
        {
           front: "Neuroplasticité",
            back: {
                title: "Le cerveau plastique (neuroplasticité)",
                text: "La capacité du cerveau à se remodeler et à former de nouvelles connexions neuronales en réponse à l'expérience et à l'apprentissage. C'est un concept clé pour comprendre comment les interventions peuvent entraîner des changements durables dans le fonctionnement cérébral."
            }
        },
        {
           front: "Biais cognitifs",
            back: {
                title: "(Biais cognitifs)",
                text: "Des erreurs systématiques dans la pensée qui affectent les décisions et les jugements. Ils sont souvent le résultat de raccourcis mentaux (heuristiques) et peuvent contribuer à des perceptions négatives de soi et du monde."
            }
        },
        {
           front: "Biais de confirmation",
            back: {
                title: "Biais de confirmation",
                text: "La tendance à rechercher, interpréter et se souvenir des informations de manière à confirmer ses croyances préexistantes. Ce biais peut renforcer les pensées négatives en nous faisant ignorer les preuves contraires."
            }
        },
        {
           front: "Biais d'attribution",
            back: {
                title: "Biais d'attribution",
                text: "La tendance à attribuer les causes de nos succès à des facteurs internes (compétence) et nos échecs à des facteurs externes (malchance). Ce biais peut affecter l'estime de soi et la perception de contrôle sur les événements."
            }
        },
        {
           front: "Biais de négativité",
            back: {
                title: "Biais de négativité",
                text: "La tendance à accorder plus d'importance aux expériences négatives qu'aux positives. Ce biais peut contribuer à une vision pessimiste de soi et du monde, renforçant les pensées et émotions négatives."
            }
        },
        {
           front: "Respiration consciente",
            back: {
                title: "Respiration consciente",
                text: "Une technique de pleine conscience qui consiste à porter une attention intentionnelle à sa respiration. Elle aide à calmer le système nerveux, à réduire le stress et à ancrer l'attention dans le moment présent."
            }
        },
        {
           front: "Hygiène de vie",
            back: {
                title: "Hygiène de vie",
                text: "Un ensemble de pratiques quotidiennes qui favorisent la santé physique et mentale, comme une alimentation équilibrée, l'exercice régulier, un sommeil suffisant, et la gestion du stress."
            }
        },
    ];
    function showSection(sectionId) {
        console.log('Affichage de la section:', sectionId);
        
        document.getElementById('home').style.display = 'none';
        document.getElementById('journal').style.display = 'none';
        document.getElementById('exercice').style.display = 'none';
        document.getElementById('ressources').style.display = 'none';
        document.getElementById('capsules').style.display = 'none';
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            
            if (sectionId === 'journal' && targetSection.innerHTML.length < 100) {
                console.log('Chargement du journal');
                targetSection.innerHTML = journalHTML;
                initJournalHandlers();
            } else if (sectionId === 'exercice' && targetSection.innerHTML.length < 100) {
                console.log('Chargement de l\'exercice');
                targetSection.innerHTML = exerciceHTML;
                initExerciceHandlers();
            } else if (sectionId === 'capsules' && targetSection.innerHTML.length < 100) {
                console.log('Chargement des capsules');
                targetSection.innerHTML = capsulesHTML;
                initCapsulesHandlers();
            } else if (sectionId === 'ressources' && targetSection.innerHTML.length < 100) {
                console.log('Chargement des ressources');
                targetSection.innerHTML = ressourcesHTML;
            }
        }
    }
    
    function initApp() {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const navLinks = document.querySelectorAll('.nav-item');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.dataset.section;
                if (sectionId) {
                    showSection(sectionId);
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
        document.addEventListener('click', (e) => {
            if (e.target.closest('.content-card')) {
                e.preventDefault();
                const card = e.target.closest('.content-card');
                const sectionId = card.dataset.section;
                if (sectionId) {
                    showSection(sectionId);
                    navLinks.forEach(nav => {
                        nav.classList.remove('active');
                        if (nav.dataset.section === sectionId) {
                            nav.classList.add('active');
                        }
                    });
                }
            }
        });
        showSection('home');
    }
    
    let journalEntries = {};
    let selectedDate = null;
    let selectedColor = null;
    let currentDate = new Date();
    
    function initJournalHandlers() {
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
            
            for (let i = 0; i < startDayIndex; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('calendar-day', 'empty');
                calendarGrid.appendChild(emptyDay);
            }
            
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
            let progress = (currentStep - 1) / 5 * 100;
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
    
    function initCapsulesHandlers() {
        const flashcardGrid = document.querySelector('.flashcard-grid');
        flashcardGrid.innerHTML = '';
        
        flashcardData.forEach(data => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('flashcard-container');
            
            cardContainer.innerHTML = `
                <div class="flashcard">
                    <div class="flashcard-front">
                        <h3>${data.front}</h3>
                    </div>
                    <div class="flashcard-back">
                        <h4>${data.back.title}</h4>
                        <p>${data.back.text}</p>
                    </div>
                </div>
            `;
            
            cardContainer.addEventListener('click', () => {
                cardContainer.classList.toggle('is-flipped');
            });
            flashcardGrid.appendChild(cardContainer);
        });
    }
    
    initApp();
});
