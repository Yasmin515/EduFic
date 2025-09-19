let entradas = [];
        let saidas = [];

        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            
            document.getElementById(sectionId).classList.add('active');
            event.target.classList.add('active');
        }

        function showConceptDetails(concept) {
            const details = document.getElementById('concept-details');
            const title = document.getElementById('concept-title');
            const content = document.getElementById('concept-content');
            
            const concepts = {
                receitas: {
                    title: '💵 Receitas - Dinheiro que ENTRA',
                    content: `
                        <p><strong>Exemplos de receitas:</strong></p>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Mesada dos pais: ajuda com custos mensais</li>
                            <li>Salário de trabalho part-time</li>
                            <li>Dinheiro de aniversário </li>
                            <li>Venda de produtos</li>
                            <li>Freelances</li>
                        </ul>
                        <div class="tips">
                            <h4>💡 Dica importante:</h4>
                            <p>Para aumentar suas receitas: desenvolva habilidades, venda algo que você faz bem, ou arranje um trabalho part-time!</p>
                        </div>
                    `
                },
                despesas: {
                    title: '💸 Despesas - Dinheiro que SAI',
                    content: `
                        <p><strong>Tipos de despesas:</strong></p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0;">
                            <div>
                                <h4>🔒 Fixas (todo mês):</h4>
                                <ul style="padding-left: 20px;">
                                    <li>Transporte escolar</li>
                                    <li>Plano do celular</li>
                                    <li>Netflix/Spotify</li>
                                </ul>
                            </div>
                            <div>
                                <h4>📊 Variáveis (mudam):</h4>
                                <ul style="padding-left: 20px;">
                                    <li>Lanche na escola</li>
                                    <li>Cinema</li>
                                    <li>Roupas</li>
                                </ul>
                            </div>
                        </div>
                    `
                },
                ativos: {
                    title: '📈 Ativos - Te fazem GANHAR dinheiro',
                    content: `
                        <p><strong>Exemplos de ativos para jovens:</strong></p>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Conta poupança que rende juros</li>
                            <li>Curso que te qualifica para trabalho</li>
                            <li>Equipamentos para freelance (câmera, computador)</li>
                            <li>Ações de empresas</li>
                            <li>Seu próprio negócio</li>
                        </ul>
                        <div class="tips">
                            <h4>🎯 Meta:</h4>
                            <p>Sempre que possível, transforme gastos em investimentos em ativos!</p>
                        </div>
                    `
                },
                passivos: {
                    title: '📉 Passivos - Te fazem PERDER dinheiro',
                    content: `
                        <p><strong>Exemplos de passivos:</strong></p>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Celular financiado (parcelas + juros)</li>
                            <li>Cartão de crédito em atraso</li>
                            <li>Assinaturas que não usa</li>
                            <li>Compras por impulso</li>
                        </ul>
                        <div class="tips" style="background: #ffe6e6; border-left-color: #e53e3e;">
                            <h4>⚠️ Cuidado:</h4>
                            <p>Muitas coisas parecem ativos, mas são passivos disfarçados!</p>
                        </div>
                    `
                }
            };
            
            title.innerHTML = concepts[concept].title;
            content.innerHTML = concepts[concept].content;
            details.style.display = 'block';
            details.scrollIntoView({ behavior: 'smooth' });
        }

        function checkQuiz(element, isCorrect) {
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.style.pointerEvents = 'none';
                if (opt === element) {
                    opt.classList.add(isCorrect ? 'correct' : 'wrong');
                } else if (!opt.classList.contains('wrong')) {
                    opt.style.opacity = '0.5';
                }
            });
            
            if (isCorrect) {
                setTimeout(() => {
                    alert('🎉 Correto! Um smartphone financiado gera despesas mensais, tirando dinheiro do seu bolso.');
                }, 500);
            }
        }

        function calcularReceitas() {
            const receitaPrincipal = parseFloat(document.getElementById('receita-principal').value) || 0;
            const outrasReceitas = parseFloat(document.getElementById('outras-receitas').value) || 0;
            const total = receitaPrincipal + outrasReceitas;
            
            const resultado = document.getElementById('resultado-receitas');
            resultado.innerHTML = `
                <h4>💰 Suas Receitas Mensais:</h4>
                <p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
                <p>Receita principal: R$ ${receitaPrincipal.toFixed(2)}</p>
                <p>Outras receitas: R$ ${outrasReceitas.toFixed(2)}</p>
                ${total > 0 ? '<p style="color: green;">✅ Ótimo! Você tem receitas regulares.</p>' : '<p style="color: orange;">⚠️ Que tal buscar uma fonte de renda?</p>'}
            `;
            resultado.style.display = 'block';
        }

        function analisarDespesas() {
            const transporte = parseFloat(document.getElementById('transporte').value) || 0;
            const celular = parseFloat(document.getElementById('celular').value) || 0;
            const streaming = parseFloat(document.getElementById('streaming').value) || 0;
            const alimentacao = parseFloat(document.getElementById('alimentacao').value) || 0;
            const lazer = parseFloat(document.getElementById('lazer').value) || 0;
            const compras = parseFloat(document.getElementById('compras').value) || 0;
            
            const fixas = transporte + celular + streaming;
            const variaveis = alimentacao + lazer + compras;
            const total = fixas + variaveis;
            
            const resultado = document.getElementById('analise-despesas');
            resultado.innerHTML = `
                <h4>💸 Análise das suas Despesas:</h4>
                <div class="expense-item">
                    <span>Despesas Fixas:</span>
                    <strong>R$ ${fixas.toFixed(2)}</strong>
                </div>
                <div class="expense-item">
                    <span>Despesas Variáveis:</span>
                    <strong>R$ ${variaveis.toFixed(2)}</strong>
                </div>
                <div class="expense-item" style="background: #e6f7ff;">
                    <span>TOTAL MENSAL:</span>
                    <strong>R$ ${total.toFixed(2)}</strong>
                </div>
                <div style="margin-top: 15px;">
                    <p><strong>📊 Distribuição:</strong></p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${fixas > 0 ? (fixas/total*100) : 0}%"></div>
                    </div>
                    <p>Fixas: ${fixas > 0 ? ((fixas/total)*100).toFixed(1) : 0}% | Variáveis: ${variaveis > 0 ? ((variaveis/total)*100).toFixed(1) : 0}%</p>
                </div>
                ${fixas > variaveis ? 
                    '<p style="color: green;">✅ Bom controle! Suas despesas fixas são maiores que as variáveis.</p>' : 
                    '<p style="color: orange;">⚠️ Cuidado! Muitas despesas variáveis podem sair do controle.</p>'
                }
            `;
            resultado.style.display = 'block';
        }

        function calcularJuros() {
            const valorProduto = parseFloat(document.getElementById('valor-produto').value) || 1000;
            const taxaJuros = parseFloat(document.getElementById('taxa-juros').value) || 2.5;
            const parcelas = parseInt(document.getElementById('parcelas').value) || 12;
            
            const taxaMensal = taxaJuros / 100;
            const valorParcela = (valorProduto * taxaMensal * Math.pow(1 + taxaMensal, parcelas)) / 
                               (Math.pow(1 + taxaMensal, parcelas) - 1);
            const valorTotal = valorParcela * parcelas;
            const jurosTotal = valorTotal - valorProduto;
            
            const resultado = document.getElementById('resultado-juros');
            resultado.innerHTML = `
                <h4>💰 Análise de Juros:</h4>
                <div class="expense-item">
                    <span>Valor à vista:</span>
                    <strong>R$ ${valorProduto.toFixed(2)}</strong>
                </div>
                <div class="expense-item">
                    <span>Valor de cada parcela:</span>
                    <strong>R$ ${valorParcela.toFixed(2)}</strong>
                </div>
                <div class="expense-item" style="background: #ffe6e6;">
                    <span>Valor total parcelado:</span>
                    <strong>R$ ${valorTotal.toFixed(2)}</strong>
                </div>
                <div class="expense-item" style="background: #ffcccc;">
                    <span>Juros pagos:</span>
                    <strong>R$ ${jurosTotal.toFixed(2)}</strong>
                </div>
                <p style="margin-top: 15px; font-weight: bold; color: #e53e3e;">
                    💸 Você pagará R$ ${jurosTotal.toFixed(2)} A MAIS só de juros!
                </p>
                ${jurosTotal > valorProduto * 0.3 ? 
                    '<p style="color: red;">🚨 CUIDADO! Os juros são muito altos!</p>' : 
                    '<p style="color: orange;">⚠️ Avalie se vale a pena parcelar.</p>'
                }
            `;
            resultado.style.display = 'block';
        }

        function calcularContaFelicidade() {
            const renda = parseFloat(document.getElementById('renda-felicidade').value) || 0;
            const contaFelicidade = renda * 0.1; // 10% para diversão
            const poupanca = renda * 0.2; // 20% para poupança
            const gastos = renda * 0.7; // 70% para gastos básicos
            
            const resultado = document.getElementById('resultado-felicidade');
            resultado.innerHTML = `
                <h4>😊 Divisão Inteligente da sua Renda:</h4>
                <div class="expense-item">
                    <span>💰 Pague-se primeiro (poupança):</span>
                    <strong>R$ ${poupanca.toFixed(2)} (20%)</strong>
                </div>
                <div class="expense-item">
                    <span>😊 Conta da Felicidade:</span>
                    <strong>R$ ${contaFelicidade.toFixed(2)} (10%)</strong>
                </div>
                <div class="expense-item">
                    <span>🏠 Gastos básicos:</span>
                    <strong>R$ ${gastos.toFixed(2)} (70%)</strong>
                </div>
                <div class="tips">
                    <h4>💡 Como usar a Conta da Felicidade:</h4>
                    <p>Use esse dinheiro para coisas que te fazem feliz: cinema, roupas, jogos. Sem culpa, porque você já separou!</p>
                </div>
            `;
            resultado.style.display = 'block';
        }

        function adicionarEntrada() {
            const nome = prompt("Nome da entrada (ex: Mesada, Trabalho):");
            const valor = parseFloat(prompt("Valor da entrada:"));
            
            if (nome && valor > 0) {
                entradas.push({ nome, valor });
                atualizarListaEntradas();
            }
        }

        function adicionarSaida() {
            const nome = prompt("Nome da saída (ex: Transporte, Lanche):");
            const valor = parseFloat(prompt("Valor da saída:"));
            
            if (nome && valor > 0) {
                saidas.push({ nome, valor });
                atualizarListaSaidas();
            }
        }

        function atualizarListaEntradas() {
            const lista = document.getElementById('lista-entradas');
            lista.innerHTML = entradas.map((entrada, index) => `
                <div class="expense-item">
                    <span>💵 ${entrada.nome}</span>
                    <strong>R$ ${entrada.valor.toFixed(2)}</strong>
                    <button onclick="removerEntrada(${index})" style="background: #e53e3e; color: white; border: none; padding: 5px 10px; border-radius: 5px; margin-left: 10px;">❌</button>
                </div>
            `).join('');
        }

        function atualizarListaSaidas() {
            const lista = document.getElementById('lista-saidas');
            lista.innerHTML = saidas.map((saida, index) => `
                <div class="expense-item">
                    <span>💸 ${saida.nome}</span>
                    <strong>R$ ${saida.valor.toFixed(2)}</strong>
                    <button onclick="removerSaida(${index})" style="background: #e53e3e; color: white; border: none; padding: 5px 10px; border-radius: 5px; margin-left: 10px;">❌</button>
                </div>
            `).join('');
        }

        function removerEntrada(index) {
            entradas.splice(index, 1);
            atualizarListaEntradas();
        }

        function removerSaida(index) {
            saidas.splice(index, 1);
            atualizarListaSaidas();
        }

        function calcularFluxo() {
            const totalEntradas = entradas.reduce((sum, entrada) => sum + entrada.valor, 0);
            const totalSaidas = saidas.reduce((sum, saida) => sum + saida.valor, 0);
            const saldo = totalEntradas - totalSaidas;
            
            const resultado = document.getElementById('resultado-fluxo');
            resultado.innerHTML = `
                <h4>📈 Seu Fluxo de Caixa Mensal:</h4>
                <div class="expense-item" style="background: #e6ffed;">
                    <span>💵 Total de Entradas:</span>
                    <strong>R$ ${totalEntradas.toFixed(2)}</strong>
                </div>
                <div class="expense-item" style="background: #ffe6e6;">
                    <span>💸 Total de Saídas:</span>
                    <strong>R$ ${totalSaidas.toFixed(2)}</strong>
                </div>
                <div class="expense-item" style="background: ${saldo >= 0 ? '#e6f7ff' : '#ffcccc'};">
                    <span>💰 Saldo Final:</span>
                    <strong style="color: ${saldo >= 0 ? 'green' : 'red'};">R$ ${saldo.toFixed(2)}</strong>
                </div>
                <div style="margin-top: 15px;">
                    ${saldo > 0 ? 
                        `<p style="color: green;">✅ Parabéns! Você tem R$ ${saldo.toFixed(2)} sobrando para investir!</p>` : 
                        saldo === 0 ?
                        '<p style="color: orange;">⚠️ Você está no zero a zero. Que tal reduzir algumas despesas?</p>' :
                        `<p style="color: red;">🚨 Atenção! Você está gastando R$ ${Math.abs(saldo).toFixed(2)} a mais do que ganha!</p>`
                    }
                </div>
            `;
            resultado.style.display = 'block';
        }

        function calcularReserva() {
            const gastosEssenciais = parseFloat(document.getElementById('gastos-essenciais').value) || 0;
            const reservaMinima = gastosEssenciais * 3;
            const reservaIdeal = gastosEssenciais * 6;
            
            const resultado = document.getElementById('resultado-reserva');
            resultado.innerHTML = `
                <h4>🆘 Sua Reserva de Emergência:</h4>
                <div class="expense-item">
                    <span>Gastos mensais essenciais:</span>
                    <strong>R$ ${gastosEssenciais.toFixed(2)}</strong>
                </div>
                <div class="expense-item" style="background: #fff2e6;">
                    <span>🔺 Reserva Mínima (3 meses):</span>
                    <strong>R$ ${reservaMinima.toFixed(2)}</strong>
                </div>
                <div class="expense-item" style="background: #e6f7ff;">
                    <span>🎯 Reserva Ideal (6 meses):</span>
                    <strong>R$ ${reservaIdeal.toFixed(2)}</strong>
                </div>
                <div class="tips">
                    <h4>💡 Por que ter uma reserva?</h4>
                    <p>Para não precisar se endividar em emergências: celular quebrado, problema de saúde, perda de renda...</p>
                </div>
                <p><strong>💪 Meta mensal:</strong> Se conseguir guardar R$ ${(reservaMinima/12).toFixed(2)}/mês, terá sua reserva mínima em 1 ano!</p>
            `;
            resultado.style.display = 'block';
        }

        function calcularObjetivo() {
            const nomeObjetivo = document.getElementById('nome-objetivo').value || 'Meu objetivo';
            const valorObjetivo = parseFloat(document.getElementById('valor-objetivo').value) || 0;
            const prazoObjetivo = parseInt(document.getElementById('prazo-objetivo').value) || 12;
            
            const metaMensal = valorObjetivo / prazoObjetivo;
            const metaDiaria = metaMensal / 30;
            
            const resultado = document.getElementById('resultado-objetivo');
            resultado.innerHTML = `
                <h4>🎯 Plano para: ${nomeObjetivo}</h4>
                <div class="expense-item">
                    <span>💰 Valor total:</span>
                    <strong>R$ ${valorObjetivo.toFixed(2)}</strong>
                </div>
                <div class="expense-item">
                    <span>📅 Prazo:</span>
                    <strong>${prazoObjetivo} meses</strong>
                </div>
                <div class="expense-item" style="background: #e6f7ff;">
                    <span>💪 Precisa guardar por mês:</span>
                    <strong>R$ ${metaMensal.toFixed(2)}</strong>
                </div>
                <div class="expense-item" style="background: #f0f8ff;">
                    <span>☕ Por dia (aproximadamente):</span>
                    <strong>R$ ${metaDiaria.toFixed(2)}</strong>
                </div>
                <div class="tips">
                    <h4>💡 Dicas para alcançar:</h4>
                    <p>• Abra uma conta poupança específica para este objetivo<br>
                    • Guarde primeiro, gaste depois<br>
                    • Procure rendas extras para acelerar o processo</p>
                </div>
            `;
            resultado.style.display = 'block';
        }

        function compararOpcoes() {
            const valorInvestir = parseFloat(document.getElementById('valor-investir').value) || 100;
            const rendimento = parseFloat(document.getElementById('rendimento').value) || 0.8;
            const mesesInvestir = parseInt(document.getElementById('meses-investir').value) || 12;
            const rendaExtra = parseFloat(document.getElementById('renda-extra').value) || 100;
            const mesesRenda = parseInt(document.getElementById('meses-renda').value) || 12;
            
            // Cálculo do investimento com juros compostos
            const taxaMensal = rendimento / 100;
            let montanteInvestimento = 0;
            for (let i = 0; i < mesesInvestir; i++) {
                montanteInvestimento = (montanteInvestimento + valorInvestir) * (1 + taxaMensal);
            }
            const lucroInvestimento = montanteInvestimento - (valorInvestir * mesesInvestir);
            
            // Cálculo da renda extra
            const totalRendaExtra = rendaExtra * mesesRenda;
            
            const resultado = document.getElementById('resultado-comparacao');
            resultado.innerHTML = `
                <h4>⚖️ Comparação: Investir X Ganhar Mais</h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    <div style="background: #e6f7ff; padding: 20px; border-radius: 10px;">
                        <h4>💹 Investindo R$ ${valorInvestir}/mês</h4>
                        <p>Valor investido: R$ ${(valorInvestir * mesesInvestir).toFixed(2)}</p>
                        <p>Rendimento: R$ ${lucroInvestimento.toFixed(2)}</p>
                        <p><strong>Total final: R$ ${montanteInvestimento.toFixed(2)}</strong></p>
                    </div>
                    
                    <div style="background: #f0fff4; padding: 20px; border-radius: 10px;">
                        <h4>💪 Ganhando R$ ${rendaExtra}/mês extra</h4>
                        <p>Renda extra mensal: R$ ${rendaExtra}</p>
                        <p>Por ${mesesRenda} meses</p>
                        <p><strong>Total ganho: R$ ${totalRendaExtra.toFixed(2)}</strong></p>
                    </div>
                </div>
                
                <div class="tips">
                    <h4>🏆 Melhor opção:</h4>
                    ${montanteInvestimento > totalRendaExtra ? 
                        '<p style="color: green;"><strong>INVESTIR</strong> te dará mais dinheiro no final!</p>' :
                        '<p style="color: blue;"><strong>GANHAR MAIS</strong> te dará mais dinheiro no total!</p>'
                    }
                    <p><strong>💡 Dica de ouro:</strong> Por que não fazer os dois? Ganhe mais E invista mais!</p>
                </div>
            `;
            resultado.style.display = 'block';
        }

        function calcularIndependencia() {
            const gastosTotais = parseFloat(document.getElementById('gastos-totais').value) || 1000;
            const valorMensalInvestir = parseFloat(document.getElementById('valor-mensal-investir').value) || 200;
            
            // Para independência financeira, precisa de um patrimônio que renda os gastos mensais
            // Usando regra dos 4% (0.33% ao mês), precisa de 300x os gastos mensais
            const patrimonioNecessario = gastosTotais * 300;
            
            // Calculando quantos meses para juntar esse patrimônio investindo (assumindo 0.8% ao mês)
            const rendimentoMensal = 0.008;
            let meses = 0;
            let patrimonio = 0;
            
            while (patrimonio < patrimonioNecessario && meses < 600) { // máximo 50 anos
                patrimonio = (patrimonio + valorMensalInvestir) * (1 + rendimentoMensal);
                meses++;
            }
            
            const anos = Math.floor(meses / 12);
            const mesesRestantes = meses % 12;
            
            const resultado = document.getElementById('resultado-independencia');
            resultado.innerHTML = `
                <h4>🏆 Seu Caminho para Independência Financeira</h4>
                
                <div class="expense-item">
                    <span>💸 Seus gastos mensais:</span>
                    <strong>R$ ${gastosTotais.toFixed(2)}</strong>
                </div>
                <div class="expense-item">
                    <span>💰 Valor que investe/mês:</span>
                    <strong>R$ ${valorMensalInvestir.toFixed(2)}</strong>
                </div>
                <div class="expense-item" style="background: #fff2e6;">
                    <span>🎯 Patrimônio necessário:</span>
                    <strong>R$ ${patrimonioNecessario.toLocaleString('pt-BR')}</strong>
                </div>
                <div class="expense-item" style="background: #e6f7ff;">
                    <span>⏰ Tempo para independência:</span>
                    <strong>${anos} anos e ${mesesRestantes} meses</strong>
                </div>
                
                <div class="tips">
                    <h4>🚀 Como acelerar o processo:</h4>
                    <p>• <strong>Aumente sua renda:</strong> desenvolva habilidades valiosas<br>
                    • <strong>Reduza gastos:</strong> viva abaixo das suas possibilidades<br>
                    • <strong>Invista mais:</strong> a cada aumento de renda, invista a diferença<br>
                    • <strong>Seja consistente:</strong> pequenas quantias investidas regularmente fazem milagres!</p>
                </div>
                
                <div style="background: #e6ffed; padding: 15px; border-radius: 10px; margin-top: 15px;">
                    <h4>💡 O que é independência financeira?</h4>
                    <p>É quando seus investimentos rendem mais do que você gasta. Aí você pode viver só dos rendimentos, sem precisar trabalhar por obrigação!</p>
                </div>
            `;
            resultado.style.display = 'block';
        }

        // Inicializar com alguns exemplos no fluxo de caixa
        document.addEventListener('DOMContentLoaded', function() {
            // Adicionar alguns exemplos iniciais
            entradas = [
                { nome: 'Mesada', valor: 200 },
                { nome: 'Trabalho Part-time', valor: 300 }
            ];
            saidas = [
                { nome: 'Transporte', valor: 80 },
                { nome: 'Lanche', valor: 120 },
                { nome: 'Celular', valor: 50 }
            ];
            
            atualizarListaEntradas();
            atualizarListaSaidas();
        });