// Variáveis Globais
let currentUser = null;
let currentClassCode = '';
let userData = {
    balance: 0,
    income: 0,
    expenses: 0,
    quizStats: { total: 0, correct: 0, points: 0 },
    goals: [],
    personalInfo: {
        birthdate: '',
        phone: '',
        address: ''
    }
};
let editingField = '';
let charts = {};
let currentQuizIndex = 0;
let quizAnswered = false;

// Base de Dados de Quizzes
const quizzes = [
    {
        question: 'O que é mais importante para construir riqueza a longo prazo?',
        options: ['Ganhar muito dinheiro', 'Gastar pouco', 'Investir regularmente', 'Todas as anteriores'],
        correct: 3,
        explanation: 'Construir riqueza requer ganhos bons, gastos controlados E investimentos regulares. São os três pilares!'
    },
    {
        question: 'Qual a regra básica de poupança que todos deveriam seguir?',
        options: ['Poupar o que sobra no fim do mês', 'Poupar pelo menos 10% da renda primeiro', 'Poupar apenas em emergências', 'Não precisa poupar na juventude'],
        correct: 1,
        explanation: 'Pague-se primeiro! Separe pelo menos 10% assim que receber, ANTES de gastar. O resto você administra.'
    },
    {
        question: 'O que caracteriza um ATIVO financeiro?',
        options: ['Algo que perde valor com o tempo', 'Algo que gera gastos mensais', 'Algo que gera renda ou se valoriza', 'Algo muito caro'],
        correct: 2,
        explanation: 'Ativo é tudo que coloca dinheiro no seu bolso: investimentos que rendem, negócios, habilidades rentáveis!'
    },
    {
        question: 'Qual o primeiro passo para organizar sua vida financeira?',
        options: ['Investir em ações', 'Fazer um orçamento detalhado', 'Comprar um carro', 'Pegar um empréstimo'],
        correct: 1,
        explanation: 'Tudo começa com o orçamento! Você precisa saber quanto entra e quanto sai para ter controle.'
    },
    {
        question: 'O que são juros compostos?',
        options: ['Juros sobre juros que fazem seu dinheiro crescer exponencialmente', 'Juros simples calculados uma vez', 'Taxa bancária fixa', 'Multa por atraso'],
        correct: 0,
        explanation: 'Juros compostos são o maior aliado do investidor! É quando você ganha juros sobre os juros anteriores, fazendo seu dinheiro crescer cada vez mais rápido.'
    },
    {
        question: 'Qual é a ordem correta para usar seu dinheiro?',
        options: ['Gastar, poupar, investir', 'Poupar, gastar, investir', 'Poupar, investir, gastar', 'Investir, poupar, gastar'],
        correct: 2,
        explanation: 'Primeiro poupe (reserva de emergência), depois invista (futuro) e por último gaste o que sobrou!'
    },
    {
        question: 'Quanto você deveria ter em uma reserva de emergência?',
        options: ['1 mês de despesas', '3-6 meses de despesas', '1 ano de despesas', 'Não precisa ter'],
        correct: 1,
        explanation: 'O ideal é ter de 3 a 6 meses de suas despesas guardados para emergências como desemprego ou imprevistos.'
    },
    {
        question: 'Qual a melhor estratégia para sair das dívidas?',
        options: ['Ignorar e esperar passar', 'Pagar a maior dívida primeiro', 'Pagar a dívida com maior juros primeiro', 'Fazer novos empréstimos'],
        correct: 2,
        explanation: 'Priorize pagar as dívidas com maiores juros primeiro! Assim você economiza mais dinheiro no longo prazo.'
    },
    {
        question: 'O que é inflação?',
        options: ['Aumento geral dos preços', 'Diminuição dos preços', 'Aumento do salário', 'Taxa de juros'],
        correct: 0,
        explanation: 'Inflação é quando os preços dos produtos e serviços aumentam, fazendo seu dinheiro perder poder de compra.'
    },
    {
        question: 'Qual investimento é considerado mais seguro no Brasil?',
        options: ['Ações', 'Criptomoedas', 'Tesouro Direto', 'Apostas'],
        correct: 2,
        explanation: 'O Tesouro Direto é garantido pelo governo federal e é considerado o investimento mais seguro do país.'
    },
    {
        question: 'O que significa diversificar investimentos?',
        options: ['Colocar todo dinheiro em um lugar', 'Distribuir o dinheiro em vários tipos de investimentos', 'Gastar em coisas diferentes', 'Investir apenas em ações'],
        correct: 1,
        explanation: 'Diversificar é não colocar todos os ovos na mesma cesta! Distribua seu dinheiro em diferentes investimentos para reduzir riscos.'
    },
    {
        question: 'Qual é o problema de comprar parcelado?',
        options: ['Nenhum problema', 'Você paga juros escondidos', 'É mais barato', 'Aumenta seu crédito'],
        correct: 1,
        explanation: 'Compras parceladas geralmente têm juros embutidos no preço, fazendo você pagar mais caro pelo produto!'
    },
    {
        question: 'O que é renda passiva?',
        options: ['Dinheiro que você ganha trabalhando', 'Dinheiro que entra sem você trabalhar ativamente', 'Salário mensal', 'Mesada dos pais'],
        correct: 1,
        explanation: 'Renda passiva é quando você ganha dinheiro sem trabalhar ativamente, como aluguéis, dividendos de ações ou direitos autorais.'
    },
    {
        question: 'Qual a diferença entre poupar e investir?',
        options: ['Não há diferença', 'Poupar é guardar, investir é fazer o dinheiro crescer', 'Investir é mais arriscado que poupar', 'Apenas B e C estão corretas'],
        correct: 3,
        explanation: 'Poupar é apenas guardar dinheiro. Investir é fazer esse dinheiro trabalhar para você e crescer, mas com riscos envolvidos.'
    },
    {
        question: 'Por que é importante começar a investir cedo?',
        options: ['Para impressionar os amigos', 'Por causa dos juros compostos ao longo do tempo', 'Não é importante', 'Apenas para ricos'],
        correct: 1,
        explanation: 'Quanto mais cedo você começa, mais tempo os juros compostos têm para trabalhar a seu favor, multiplicando seu dinheiro!'
    }
];

// ========== FUNÇÕES DE LOGIN ==========

function initLogin() {
    document.getElementById('loginBtn').addEventListener('click', function() {
        const userType = document.getElementById('userType').value;
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const classCode = document.getElementById('classCode').value.trim().toUpperCase();

        if (!fullName || !email || !classCode) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';

        setTimeout(() => {
            currentUser = { name: fullName, email: email, type: userType, points: 0 };
            currentClassCode = classCode;

            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('appContainer').classList.add('show');
            document.getElementById('userName').textContent = fullName;
            document.getElementById('userEmail').textContent = email;
            document.getElementById('displayClassCode').textContent = classCode;
            document.getElementById('rankingClassCode').textContent = classCode;
            
            document.getElementById('profileName').textContent = fullName;
            document.getElementById('profileEmail').textContent = email;
            document.getElementById('infoName').textContent = fullName;
            document.getElementById('infoEmail').textContent = email;
            document.getElementById('infoUserType').textContent = userType === 'student' ? 'Aluno' : 'Professor';
            document.getElementById('infoClassCode').textContent = classCode;

            initializeApp();
            
            this.disabled = false;
            this.innerHTML = 'Entrar';
        }, 1000);
    });
}

// ========== INICIALIZAÇÃO DA APLICAÇÃO ==========

function initializeApp() {
    initializeCharts();
    loadQuiz();
    loadRanking();
    updateAllValues();
    loadNotifications();
    renderGoals();
}

function initializeCharts() {
    const ctxCategory = document.getElementById('categoryChart').getContext('2d');
    charts.category = new Chart(ctxCategory, {
        type: 'doughnut',
        data: {
            labels: ['Alimentação', 'Transporte', 'Lazer', 'Educação', 'Compras', 'Outros'],
            datasets: [{
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: ['#667eea', '#4facfe', '#ff9500', '#38a169', '#e53e3e', '#764ba2']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });

    const ctxEvolution = document.getElementById('evolutionChart').getContext('2d');
    charts.evolution = new Chart(ctxEvolution, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
            datasets: [{
                label: 'Saldo',
                data: [0, 0, 0, 0],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// ========== FUNÇÕES DE ATUALIZAÇÃO DE VALORES ==========

function updateAllValues() {
    document.getElementById('totalBalance').textContent = `R$ ${userData.balance.toFixed(2)}`;
    document.getElementById('totalIncome').textContent = `R$ ${userData.income.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `R$ ${userData.expenses.toFixed(2)}`;
    
    const savingsRate = userData.income > 0 ? ((userData.balance / userData.income) * 100).toFixed(1) : 0;
    document.getElementById('savingsRate').textContent = `${savingsRate}%`;
    
    document.getElementById('statSavings').textContent = `R$ ${userData.balance.toFixed(0)}`;
    document.getElementById('statGoals').textContent = userData.goals.length;
    document.getElementById('profilePoints').textContent = currentUser.points;
}

function updateCategoryChart() {
    const categories = [
        parseFloat(document.getElementById('catFood').value) || 0,
        parseFloat(document.getElementById('catTransport').value) || 0,
        parseFloat(document.getElementById('catLeisure').value) || 0,
        parseFloat(document.getElementById('catEducation').value) || 0,
        parseFloat(document.getElementById('catShopping').value) || 0,
        parseFloat(document.getElementById('catOthers').value) || 0
    ];
    
    charts.category.data.datasets[0].data = categories;
    charts.category.update();
    
    const total = categories.reduce((a, b) => a + b, 0);
    userData.expenses = total;
    userData.balance = userData.income - userData.expenses;
    updateAllValues();
}

// ========== FUNÇÕES DE EDIÇÃO ==========

function editValue(field) {
    editingField = field;
    const titles = {
        balance: 'Editar Saldo Total',
        income: 'Editar Receitas do Mês',
        expenses: 'Editar Despesas do Mês'
    };
    
    document.getElementById('editModalTitle').textContent = titles[field];
    document.getElementById('editModalLabel').textContent = 'Novo Valor (R$)';
    document.getElementById('editModalInput').value = userData[field];
    document.getElementById('editModal').classList.add('show');
}

function editPersonalInfo(field) {
    editingField = 'personal_' + field;
    const titles = {
        name: 'Editar Nome',
        email: 'Editar Email',
        birthdate: 'Editar Data de Nascimento',
        phone: 'Editar Telefone',
        address: 'Editar Endereço'
    };
    
    document.getElementById('editModalTitle').textContent = titles[field];
    document.getElementById('editModalLabel').textContent = titles[field].replace('Editar', '');
    
    if (field === 'name') document.getElementById('editModalInput').value = currentUser.name;
    else if (field === 'email') document.getElementById('editModalInput').value = currentUser.email;
    else document.getElementById('editModalInput').value = userData.personalInfo[field] || '';
    
    document.getElementById('editModal').classList.add('show');
}

function saveEdit() {
    const value = document.getElementById('editModalInput').value.trim();
    
    if (editingField.startsWith('personal_')) {
        const field = editingField.replace('personal_', '');
        if (field === 'name') {
            currentUser.name = value;
            document.getElementById('userName').textContent = value;
            document.getElementById('profileName').textContent = value;
            document.getElementById('infoName').textContent = value;
        } else if (field === 'email') {
            currentUser.email = value;
            document.getElementById('userEmail').textContent = value;
            document.getElementById('profileEmail').textContent = value;
            document.getElementById('infoEmail').textContent = value;
        } else {
            userData.personalInfo[field] = value;
            document.getElementById('info' + field.charAt(0).toUpperCase() + field.slice(1)).textContent = value || 'Não informado';
        }
    } else {
        const numValue = parseFloat(value) || 0;
        userData[editingField] = numValue;
        
        if (editingField === 'income' || editingField === 'expenses') {
            userData.balance = userData.income - userData.expenses;
        }
        
        updateAllValues();
    }
    
    closeModal('editModal');
}

// ========== FUNÇÕES DE CONCEITOS ==========

function toggleConcept(concept) {
    const conceptId = 'concept' + concept.charAt(0).toUpperCase() + concept.slice(1);
    const element = document.getElementById(conceptId);
    
    document.querySelectorAll('.concept-detail').forEach(el => {
        if (el.id !== conceptId) el.classList.remove('show');
    });
    
    element.classList.toggle('show');
    if (element.classList.contains('show')) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
}

// ========== FUNÇÕES DE OBJETIVOS ==========

function addGoal() {
    const name = document.getElementById('goalName').value.trim();
    const value = parseFloat(document.getElementById('goalValue').value);
    const months = parseInt(document.getElementById('goalMonths').value);

    if (!name || !value || value <= 0 || !months || months <= 0) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    const monthlyGoal = (value / months).toFixed(2);
    const goal = {
        id: Date.now(),
        name: name,
        value: value,
        months: months,
        monthlyGoal: monthlyGoal,
        saved: 0
    };

    userData.goals.push(goal);
    
    document.getElementById('goalName').value = '';
    document.getElementById('goalValue').value = '';
    document.getElementById('goalMonths').value = '';
    
    renderGoals();
    alert('✅ Objetivo criado com sucesso!');
}

function renderGoals() {
    const container = document.getElementById('goalsList');
    if (userData.goals.length === 0) {
        container.innerHTML = '<div style="background: white; padding: 40px; border-radius: 15px; text-align: center; color: #6c809e;">Nenhum objetivo cadastrado ainda. Crie seu primeiro objetivo acima!</div>';
        return;
    }

    container.innerHTML = userData.goals.map(goal => {
        const progress = Math.min((goal.saved / goal.value) * 100, 100);
        const remaining = Math.max(goal.value - goal.saved, 0);
        const monthsRemaining = Math.ceil(remaining / goal.monthlyGoal);

        return `
            <div class="goal-card">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <div>
                        <h3 style="font-size: 22px; margin-bottom: 5px; color: var(--dark);">🎯 ${goal.name}</h3>
                        <p style="font-size: 14px; color: #6c809e;">Meta: R$ ${goal.value.toFixed(2)}</p>
                    </div>
                    <button onclick="removeGoal(${goal.id})" style="background: var(--danger); color: white; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                
                <div style="margin: 15px 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="font-size: 14px; color: #6c809e;">Progresso</span>
                        <span style="font-weight: 700; color: var(--primary);">${progress.toFixed(1)}%</span>
                    </div>
                    <div style="width: 100%; height: 10px; background: #e5e7eb; border-radius: 10px; overflow: hidden;">
                        <div style="height: 100%; width: ${progress}%; background: linear-gradient(90deg, var(--success) 0%, var(--accent) 100%); border-radius: 10px; transition: width 0.5s ease;"></div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 15px;">
                    <div style="padding: 12px; background: #e6ffed; border-radius: 8px;">
                        <div style="font-size: 12px; color: #6c809e;">Economizado</div>
                        <div style="font-size: 20px; font-weight: 700; color: var(--success);">R$ ${goal.saved.toFixed(2)}</div>
                    </div>
                    <div style="padding: 12px; background: #ffe6e6; border-radius: 8px;">
                        <div style="font-size: 12px; color: #6c809e;">Falta</div>
                        <div style="font-size: 20px; font-weight: 700; color: var(--danger);">R$ ${remaining.toFixed(2)}</div>
                    </div>
                </div>

                <div style="background: #e6f7ff; padding: 15px; border-radius: 10px; margin-bottom: 15px; border-left: 4px solid var(--primary);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-size: 12px; color: #6c809e;">Para economizar por mês:</div>
                            <div style="font-size: 24px; font-weight: 700; color: var(--primary);">R$ ${goal.monthlyGoal}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 12px; color: #6c809e;">Tempo restante:</div>
                            <div style="font-size: 20px; font-weight: 700; color: var(--warning);">${monthsRemaining} meses</div>
                        </div>
                    </div>
                </div>

                <div style="background: #fff5e6; padding: 15px; border-radius: 10px; border-left: 4px solid var(--warning); margin-bottom: 15px;">
                    <strong>💡 Estratégia:</strong> Economize <strong>R$ ${goal.monthlyGoal}</strong> todo mês e você alcançará <strong>${goal.name}</strong> em ${goal.months} meses!
                </div>

                <button onclick="addToGoal(${goal.id})" style="width: 100%; padding: 14px; background: var(--success); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 16px;">
                    <i class="fas fa-plus-circle"></i> Adicionar Valor Economizado
                </button>
            </div>
        `;
    }).join('');
    
    document.getElementById('statGoals').textContent = userData.goals.length;
}

function addToGoal(goalId) {
    const goal = userData.goals.find(g => g.id === goalId);
    if (!goal) return;

    const amount = parseFloat(prompt(`Quanto você economizou para "${goal.name}"?`, '0'));
    if (amount && amount > 0) {
        goal.saved = Math.min(goal.saved + amount, goal.value);
        renderGoals();
        
        if (goal.saved >= goal.value) {
            setTimeout(() => {
                alert(`🎉🎉🎉 PARABÉNS! Você alcançou seu objetivo: ${goal.name}! 🎉🎉🎉`);
            }, 300);
        }
    }
}

function removeGoal(goalId) {
    if (confirm('Deseja realmente remover este objetivo?')) {
        userData.goals = userData.goals.filter(g => g.id !== goalId);
        renderGoals();
    }
}

// ========== FUNÇÕES DE QUIZ ==========

function loadQuiz() {
    quizAnswered = false;
    const quiz = quizzes[currentQuizIndex];
    
    document.getElementById('currentQuizNum').textContent = currentQuizIndex + 1;
    document.getElementById('totalQuizNum').textContent = quizzes.length;
    document.getElementById('quizQuestion').textContent = quiz.question;
    
    const optionsHTML = quiz.options.map((option, index) => `
        <div class="quiz-option" onclick="answerQuiz(${index})">
            ${String.fromCharCode(65 + index)}) ${option}
        </div>
    `).join('');
    
    document.getElementById('quizOptions').innerHTML = optionsHTML;
    document.getElementById('quizResult').style.display = 'none';
    
    document.getElementById('prevQuizBtn').disabled = currentQuizIndex === 0;
    document.getElementById('nextQuizBtn').disabled = currentQuizIndex === quizzes.length - 1;
    
    updateQuizStats();
}

function answerQuiz(selected) {
    if (quizAnswered) return;
    
    quizAnswered = true;
    const quiz = quizzes[currentQuizIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach(opt => opt.classList.add('disabled'));
    
    userData.quizStats.total++;
    
    if (selected === quiz.correct) {
        options[selected].classList.add('correct');
        userData.quizStats.correct++;
        userData.quizStats.points += 10;
        currentUser.points += 10;
        document.getElementById('resultText').innerHTML = '🎉 <strong>Correto!</strong> +10 pontos';
        document.getElementById('resultText').style.color = 'var(--success)';
    } else {
        options[selected].classList.add('wrong');
        options[quiz.correct].classList.add('correct');
        document.getElementById('resultText').innerHTML = '❌ <strong>Ops!</strong> Resposta incorreta';
        document.getElementById('resultText').style.color = 'var(--danger)';
    }
    
    document.getElementById('resultExplanation').textContent = quiz.explanation;
    document.getElementById('quizResult').style.display = 'block';
    
    updateQuizStats();
    loadRanking();
}

function changeQuiz(direction) {
    currentQuizIndex += direction;
    if (currentQuizIndex < 0) currentQuizIndex = 0;
    if (currentQuizIndex >= quizzes.length) currentQuizIndex = quizzes.length - 1;
    loadQuiz();
}

function updateQuizStats() {
    document.getElementById('quizTotal').textContent = userData.quizStats.total;
    document.getElementById('quizCorrect').textContent = userData.quizStats.correct;
    const rate = userData.quizStats.total > 0 ? ((userData.quizStats.correct / userData.quizStats.total) * 100).toFixed(1) : 0;
    document.getElementById('quizRate').textContent = `${rate}%`;
    document.getElementById('quizPoints').textContent = userData.quizStats.points;
    document.getElementById('statPoints').textContent = currentUser.points;
    document.getElementById('statQuizzes').textContent = userData.quizStats.total;
    document.getElementById('profilePoints').textContent = currentUser.points;
}

// ========== FUNÇÕES DE RANKING ==========

function loadRanking() {
    const students = [
        { name: currentUser.name, email: currentUser.email, points: currentUser.points },
        { name: 'Ana Silva', email: 'ana@email.com', points: 85 },
        { name: 'Carlos Santos', email: 'carlos@email.com', points: 72 },
        { name: 'Maria Oliveira', email: 'maria@email.com', points: 68 },
        { name: 'João Pedro', email: 'joao@email.com', points: 54 },
        { name: 'Beatriz Lima', email: 'beatriz@email.com', points: 48 },
        { name: 'Lucas Costa', email: 'lucas@email.com', points: 42 },
        { name: 'Julia Martins', email: 'julia@email.com', points: 38 }
    ];

    students.sort((a, b) => b.points - a.points);

    const rankingHTML = students.map((student, index) => {
        const position = index + 1;
        let positionBg = '#f7fafc';
        let emoji = position;
        
        if (position === 1) {
            positionBg = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
            emoji = '🥇';
        } else if (position === 2) {
            positionBg = 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)';
            emoji = '🥈';
        } else if (position === 3) {
            positionBg = 'linear-gradient(135deg, #CD7F32 0%, #B87333 100%)';
            emoji = '🥉';
        }

        const isCurrentUser = student.email === currentUser.email;
        const highlight = isCurrentUser ? 'background: #e6f7ff; border: 2px solid var(--primary); font-weight: 600;' : '';

        return `
            <div style="display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #f0f0f0; ${highlight} border-radius: 10px; margin-bottom: 5px;">
                <div style="width: 45px; height: 45px; border-radius: 50%; background: ${positionBg}; display: flex; align-items: center; justify-content: center; font-weight: 700; margin-right: 15px; font-size: 20px; color: white;">${emoji}</div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: var(--dark); margin-bottom: 5px;">${student.name} ${isCurrentUser ? '(Você)' : ''}</div>
                    <div style="font-size: 12px; color: #6c809e;">${student.email}</div>
                </div>
                <div style="font-size: 22px; font-weight: 700; color: var(--primary);">${student.points} pts</div>
            </div>
        `;
    }).join('');

    document.getElementById('rankingList').innerHTML = rankingHTML;
}

// ========== FUNÇÕES DE NOTIFICAÇÕES ==========

function loadNotifications() {
    const notifications = [
        { text: 'Novo quiz disponível! 🎯', time: 'Agora' },
        { text: 'Você subiu no ranking! 🏆', time: '2h atrás' },
        { text: 'Meta de economia atingida 💰', time: '1 dia' }
    ];

    document.getElementById('notificationList').innerHTML = notifications.map(n => `
        <div style="padding: 15px; border-bottom: 1px solid #f0f0f0; cursor: pointer;" onmouseover="this.style.background='var(--light)'" onmouseout="this.style.background='white'">
            <div style="font-weight: 600; margin-bottom: 5px;">${n.text}</div>
            <div style="font-size: 12px; color: #6c809e;">${n.time}</div>
        </div>
    `).join('');
}

// ========== FUNÇÕES DE NAVEGAÇÃO ==========

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function toggleNotifications() {
    document.getElementById('notificationPanel').classList.toggle('show');
    document.getElementById('settingsPanel').classList.remove('show');
}

function toggleSettings() {
    document.getElementById('settingsPanel').classList.toggle('show');
    document.getElementById('notificationPanel').classList.remove('show');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('darkModeIcon').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    document.getElementById('darkModeToggle').checked = isDark;
}

// ========== FUNÇÕES DE MODAL ==========

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// ========== FUNÇÕES DE SISTEMA ==========

function logout() {
    if (confirm('Deseja realmente sair?')) {
        location.reload();
    }
}

// ========== EVENT LISTENERS ==========

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
});

// Inicializa o login quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initLogin();
});
