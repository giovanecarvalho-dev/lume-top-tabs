import { useState } from 'react'
import './App.css'

const tabs = [
  { id: 'overview', label: 'Visão geral' },
  { id: 'movements', label: 'Movimentações' },
  { id: 'budgets', label: 'Orçamentos' },
  { id: 'reports', label: 'Relatórios' },
  { id: 'goals', label: 'Metas' },
]

const overviewMetrics = [
  { label: 'Receita', value: 'R$ 26.480', detail: '+12.4%', tone: 'positive' },
  { label: 'Despesas', value: 'R$ 18.190', detail: '-4.1%', tone: 'neutral' },
  { label: 'Investido', value: 'R$ 11.250', detail: '+8.3%', tone: 'positive' },
]

const transactionRows = [
  { title: 'Salário', meta: 'Hoje · Empresa', value: '+ R$ 5.800,00', color: 'positive' },
  { title: 'Mercado', meta: 'Ontem · Supermercado', value: '- R$ 618,40', color: 'negative' },
  { title: 'Spotify', meta: '15 jun · Streaming', value: '- R$ 49,90', color: 'negative' },
  { title: 'Ifood', meta: '14 jun · Delivery', value: '- R$ 96,80', color: 'negative' },
  { title: 'Dividendos', meta: '12 jun · Ações', value: '+ R$ 410,00', color: 'positive' },
]

const budgetCards = [
  { name: 'Casa', spent: 78, limit: 85, value: 'R$ 3.680 / R$ 4.720', tone: 'mint' },
  { name: 'Alimentação', spent: 64, limit: 72, value: 'R$ 2.140 / R$ 3.330', tone: 'green' },
  { name: 'Investimentos', spent: 51, limit: 60, value: 'R$ 2.940 / R$ 5.750', tone: 'teal' },
]

const toplineSeries = [42, 58, 54, 72, 68, 88, 94, 81, 96]

const reportStats = [
  { label: 'Receita líquida', value: 'R$ 9.2k', trend: '+18%' },
  { label: 'Margem', value: '32.4%', trend: '+2.8%' },
  { label: 'Fluxo', value: 'R$ 4.8k', trend: '+9.1%' },
]

const goals = [
  { title: 'Reserva emergencial', progress: 72, value: 'R$ 21.600', target: 'R$ 30.000', accent: 'mint' },
  { title: 'Viagem', progress: 46, value: 'R$ 8.300', target: 'R$ 18.000', accent: 'green' },
  { title: 'Apartamento', progress: 58, value: 'R$ 60.200', target: 'R$ 104.000', accent: 'teal' },
]

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [transitionDirection, setTransitionDirection] = useState('next')
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)

  const handleTabChange = (tabId) => {
    const nextIndex = tabs.findIndex((tab) => tab.id === tabId)
    setTransitionDirection(nextIndex >= activeIndex ? 'next' : 'prev')
    setActiveTab(tabId)
  }

  return (
    <div className="lume-app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="app-shell">
        <header className="topbar">
          <div className="brand-wrap">
            <div className="brand-mark">L</div>
            <div>
              <span className="eyebrow">Financeiro pessoal</span>
              <h1>Lume</h1>
            </div>
          </div>

          <div className="header-status" aria-label="Status do dia">
            <span className="status-dot" />
            <span>Hoje</span>
          </div>
        </header>

        <nav className="tabs-shell" aria-label="Top tabs">
          <div
            className="tab-indicator"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />

          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              aria-pressed={activeTab === tab.id}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <main
          className="content-shell"
          data-direction={transitionDirection}
          key={activeTab}
        >
          {activeTab === 'overview' && <OverviewPanel />}
          {activeTab === 'movements' && <MovementsPanel />}
          {activeTab === 'budgets' && <BudgetsPanel />}
          {activeTab === 'reports' && <ReportsPanel />}
          {activeTab === 'goals' && <GoalsPanel />}
        </main>
      </div>
    </div>
  )
}

function OverviewPanel() {
  return (
    <section className="screen overview-screen">
      <div className="hero-card glass-card">
        <div className="hero-copy">
          <span className="label-badge">Saldo principal</span>
          <div className="money-line">
            <span className="currency">R$</span>
            <strong>48.290</strong>
            <span className="cents">,00</span>
          </div>
          <div className="trend-row">
            <span className="trend positive">+8,6% este mês</span>
            <span className="micro-dot" />
            <span className="muted">vs. maio</span>
          </div>
        </div>

        <div className="mini-metrics">
          {overviewMetrics.map((metric) => (
            <div key={metric.label} className="mini-metric" style={{ animationDelay: `${overviewMetrics.indexOf(metric) * 110}ms` }}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <em className={metric.tone}>{metric.detail}</em>
            </div>
          ))}
        </div>
      </div>

      <div className="lower-grid">
        <div className="glass-card chart-card">
          <div className="card-header">
            <div>
              <span className="label-badge pale">Evolução</span>
              <h2>Fluxo da renda</h2>
            </div>
            <span className="caption positive">+18.2%</span>
          </div>

          <div className="chart-wrap">
            <div className="gridlines" />
            <svg viewBox="0 0 532 160" className="line-chart" aria-label="Gráfico de evolução financeira">
              <defs>
                <linearGradient id="lineGlow" x1="0" x2="1">
                  <stop offset="0%" stopColor="#7ef7c7" />
                  <stop offset="100%" stopColor="#bafed7" />
                </linearGradient>
              </defs>
              <path d="M0,118 C52,115, 68,80, 110,88 S175,50, 203,72 S288,32, 332,58 S422,98, 532,44 L532,160 L0,160 Z" className="area-fill" />
              <path d="M0,118 C52,115, 68,80, 110,88 S175,50, 203,72 S288,32, 332,58 S422,98, 532,44" className="line-path" />
            </svg>
          </div>
        </div>

        <div className="glass-card ring-card">
          <div className="card-header compact">
            <div>
              <span className="label-badge pale">Distribuição</span>
              <h2>Gastos</h2>
            </div>
          </div>

          <div className="donut-wrap">
            <div className="donut-chart">
              <div className="donut-center">
                <strong>64%</strong>
                <span>fixos</span>
              </div>
            </div>
            <ul className="legend-list">
              <li><span className="legend-dot mint" /> Moradia <strong>32%</strong></li>
              <li><span className="legend-dot green" /> Alimentação <strong>22%</strong></li>
              <li><span className="legend-dot teal" /> Lazer <strong>10%</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function MovementsPanel() {
  return (
    <section className="screen movements-screen">
      <div className="glass-card transactions-card">
        <div className="card-header">
          <div>
            <span className="label-badge pale">Fluxo</span>
            <h2>Movimentações recentes</h2>
          </div>
          <span className="caption neutral">Últimos 7 dias</span>
        </div>

        <div className="transaction-list">
          {transactionRows.map((item, index) => (
            <div key={item.title} className="transaction-row" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="transaction-main">
                <span className={`coin-badge ${item.color}`}>{item.title.slice(0, 1)}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.meta}</small>
                </div>
              </div>
              <span className={`amount ${item.color}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BudgetsPanel() {
  return (
    <section className="screen budgets-screen">
      <div className="glass-card budgets-card">
        <div className="card-header">
          <div>
            <span className="label-badge pale">Planejamento</span>
            <h2>Orçamentos ativos</h2>
          </div>
          <span className="caption positive">96% do plano</span>
        </div>

        <div className="budget-list">
          {budgetCards.map((item, index) => (
            <div key={item.name} className="budget-item" style={{ animationDelay: `${index * 120}ms` }}>
              <div className="budget-topline">
                <span>{item.name}</span>
                <strong>{item.value}</strong>
              </div>
              <div className="progress-track">
                <div className={`progress-fill ${item.tone}`} style={{ width: `${item.spent}%` }} />
              </div>
              <div className="budget-meta">
                <span>{item.spent}% gasto</span>
                <span>{item.limit}% limite</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReportsPanel() {
  return (
    <section className="screen reports-screen">
      <div className="stats-grid">
        {reportStats.map((stat, index) => (
          <div key={stat.label} className="glass-card stat-card" style={{ animationDelay: `${index * 120}ms` }}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em>{stat.trend}</em>
          </div>
        ))}
      </div>

      <div className="glass-card report-card">
        <div className="card-header">
          <div>
            <span className="label-badge pale">Performance</span>
            <h2>Valor em movimento</h2>
          </div>
          <span className="caption positive">+14,9%</span>
        </div>

        <div className="report-visual">
          <svg viewBox="0 0 620 220" className="report-svg" aria-label="Relatório de movimentação">
            <defs>
              <linearGradient id="areaReport" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(126, 247, 199, 0.5)" />
                <stop offset="100%" stopColor="rgba(126, 247, 199, 0.04)" />
              </linearGradient>
            </defs>
            <path d="M0 170 C80 150, 120 120, 180 128 S300 76, 370 98 S500 32, 620 62 L620 220 L0 220 Z" fill="url(#areaReport)" />
            <path d="M0 170 C80 150, 120 120, 180 128 S300 76, 370 98 S500 32, 620 62" fill="none" stroke="#96f5d4" strokeWidth="4" strokeLinecap="round" />
            {toplineSeries.map((point, index) => (
              <circle key={point + index} cx={index * 68 + 18} cy={190 - point} r="4" fill="#d7ffef" />
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}

function GoalsPanel() {
  return (
    <section className="screen goals-screen">
      <div className="goals-grid">
        {goals.map((goal, index) => (
          <div key={goal.title} className="glass-card goal-card" style={{ animationDelay: `${index * 140}ms` }}>
            <div className="goal-ring" style={{ background: `conic-gradient(#7ef7c7 ${goal.progress * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}>
              <div className="goal-ring-inner">
                <strong>{goal.progress}%</strong>
              </div>
            </div>

            <div className="goal-copy">
              <h3>{goal.title}</h3>
              <div className="goal-values">
                <span>{goal.value}</span>
                <small>{goal.target}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default App
