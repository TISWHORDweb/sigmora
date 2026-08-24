'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../lib/router';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FloatingCard from '../../components/3d/FloatingCards';
import {
  ActivityIcon,
  ArrowRightIcon,
  BarChartIcon,
  ChartIcon,
  CheckIcon,
  CoinsIcon,
  DiamondIcon,
  PackageIcon,
  ShieldIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from '../../components/icons/Icons';
import { MARKETING_PAGES } from '../../content/marketingPages';
import '../../styles/landing-tokens.css';
import '../../styles/landing-page.css';

const ICONS = {
  activity: ActivityIcon,
  chart: ChartIcon,
  bar: BarChartIcon,
  check: CheckIcon,
  coins: CoinsIcon,
  diamond: DiamondIcon,
  package: PackageIcon,
  shield: ShieldIcon,
  target: TargetIcon,
  trending: TrendingUpIcon,
  users: UsersIcon,
  zap: ZapIcon,
};

const ACCENTS = ['', 'teal', '', 'purple', '', 'teal'];

export const PageHeroBg = () => (
  <div className="page-hero-bg" aria-hidden="true">
    <div className="hero-gradient-orb orb-modern-1" />
    <div className="hero-gradient-orb orb-modern-2" />
    <div className="hero-grid-modern" />
  </div>
);

const resolveIcon = (name) => ICONS[name] || TargetIcon;

const Ticker = ({ items }) => (
  <div className="mk-ticker" aria-hidden="true">
    <div className="mk-ticker-track">
      {[0, 1].map((dup) => (
        <div className="mk-ticker-set" key={dup}>
          {items.map((t) => (
            <div className="mk-ticker-item" key={`${dup}-${t.pair}`}>
              <span className="pair">{t.pair}</span>
              <span className="px">{t.px}</span>
              <span className={`chg ${t.up ? 'up' : 'down'}`}>{t.chg}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const HeroVisual = ({ visual }) => {
  if (!visual) return null;
  if (visual.type === 'image') {
    return (
      <div className="mk-hero-visual">
        <img src={visual.src} alt={visual.alt || ''} />
      </div>
    );
  }
  if (visual.type === 'stats') {
    return (
      <div className="mk-hero-panel">
        <div className="mk-hero-panel-label">{visual.label || 'Platform'}</div>
        <div className="mk-hero-stats">
          {visual.items.map((s) => (
            <div key={s.label}>
              <div className="v">{s.value}</div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (visual.type === 'signal') {
    return (
      <div className="mk-hero-panel">
        <div className="mk-hero-panel-head">
          <span>SIGNALS</span>
          <span className="live">● LIVE</span>
        </div>
        {visual.items.map((s) => (
          <div className={`mk-signal-row ${s.side}`} key={s.name}>
            <div>
              <div className="n">{s.name}</div>
              <div className="m">{s.meta}</div>
            </div>
            <div className="s">
              {s.side === 'buy' ? 'BUY' : 'SELL'} {s.conv}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (visual.type === 'quote') {
    return (
      <div className="mk-hero-panel mk-hero-quote">
        <p>“{visual.text}”</p>
        <div className="by">{visual.author}</div>
      </div>
    );
  }
  return (
    <div className="mk-hero-panel">
      <div className="mk-hero-panel-head">
        <span>{visual.label || 'TAPE'}</span>
        <span className="live">● LIVE</span>
      </div>
      {(visual.items || []).map((t) => (
        <div className="mk-tape-row" key={t.pair}>
          <div>
            <div className="n">{t.pair}</div>
            <div className="m">{t.meta}</div>
          </div>
          <div className="p">{t.px}</div>
          <div className={`c ${t.up ? 'up' : 'down'}`}>{t.chg}</div>
        </div>
      ))}
    </div>
  );
};

const SectionHead = ({ section, left }) =>
  section.eyebrow || section.heading ? (
    <div className={`section-header ${left ? 'section-header-left' : ''}`}>
      {section.eyebrow && <span className="section-eyebrow">{section.eyebrow}</span>}
      {section.heading && <h2 className="section-title">{section.heading}</h2>}
      {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
    </div>
  ) : null;

const SectionCards = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className={`landing-cards-grid ${section.cols ? `cols-${section.cols}` : ''}`}>
        {section.items.map((item, i) => {
          const Icon = resolveIcon(item.icon);
          const inner = (
            <motion.div
              className="landing-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className={`landing-card-icon ${ACCENTS[i % ACCENTS.length]}`}>
                <Icon size={22} color="currentColor" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              {item.details?.length > 0 && (
                <ul>
                  {item.details.map((detail) => (
                    <li key={detail}>
                      <span>✓</span> {detail}
                    </li>
                  ))}
                </ul>
              )}
              {item.to && (
                <span className="mk-card-link">
                  Learn more <ArrowRightIcon size={14} color="currentColor" />
                </span>
              )}
            </motion.div>
          );
          return (
            <FloatingCard key={item.title} delay={i * 0.06}>
              {item.to ? (
                <Link to={item.to} className="mk-card-anchor">
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </FloatingCard>
          );
        })}
      </div>
    </div>
  </section>
);

const SectionSplit = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className={`section-container landing-split ${section.reverse ? 'mk-split-reverse' : ''}`}>
      <motion.div
        className="landing-prose"
        initial={{ opacity: 0, x: section.reverse ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        {section.eyebrow && <span className="section-eyebrow">{section.eyebrow}</span>}
        <h2>{section.heading}</h2>
        {section.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {section.checks?.length > 0 && (
          <ul className="mk-checks">
            {section.checks.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
        {section.cta && (
          <Link to={section.cta.to} className="btn-landing-primary" style={{ marginTop: 8 }}>
            {section.cta.label}
            <ArrowRightIcon size={18} color="currentColor" />
          </Link>
        )}
      </motion.div>
      {section.image && (
        <motion.div
          className="landing-media"
          initial={{ opacity: 0, x: section.reverse ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img src={section.image} alt={section.imageAlt || section.heading} />
        </motion.div>
      )}
      {section.panel && <HeroVisual visual={section.panel} />}
    </div>
  </section>
);

const SectionStats = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-stats">
        {section.items.map((s) => (
          <div className="mk-stat" key={s.label}>
            <div className="mk-stat-value">{s.value}</div>
            <div className="mk-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionHighlights = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-highlights">
        {section.items.map((item) => (
          <div className="mk-highlight" key={item.title}>
            <div className="mk-highlight-value">{item.value}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionSteps = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-steps">
        {section.items.map((step, i) => (
          <div className="mk-step" key={step.title}>
            <span className="mk-step-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionTable = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-table-wrap">
        <table className="mk-table">
          <thead>
            <tr>
              {section.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row) => (
              <tr key={row.cells.join('-')}>
                {row.cells.map((cell, i) => (
                  <td key={`${cell}-${i}`}>
                    {row.trend && i === row.trendCol ? (
                      <span className={`mk-trend ${row.trend}`}>{cell}</span>
                    ) : row.trend && i === row.cells.length - 1 && row.trendCol == null ? (
                      <span className={`mk-trend ${row.trend}`}>{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.footnote && <p className="mk-footnote">{section.footnote}</p>}
    </div>
  </section>
);

const SectionTimeline = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-timeline">
        {section.items.map((item) => (
          <div className="mk-timeline-item" key={item.title}>
            <div className="mk-timeline-year">{item.year}</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionProse = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container mk-prose">
      {section.eyebrow && <span className="section-eyebrow">{section.eyebrow}</span>}
      {section.heading && <h2 className="section-title">{section.heading}</h2>}
      {section.paragraphs?.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {section.blocks?.map((block) => (
        <div className="mk-prose-block" key={block.heading}>
          <h3>{block.heading}</h3>
          {block.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      ))}
    </div>
  </section>
);

const SectionFeed = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-feed">
        {section.items.map((item) => (
          <div className="mk-feed-row" key={item.title}>
            <span className="mk-feed-meta">{item.meta}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionNotice = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <div className="mk-notice">
        <h3>{section.heading}</h3>
        <p>{section.text}</p>
      </div>
    </div>
  </section>
);

const SectionTraders = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-traders">
        {section.items.map((t) => (
          <article className="mk-trader" key={t.name}>
            <img src={t.image} alt={t.name} />
            <div className="mk-trader-body">
              <div className="mk-trader-name">
                {t.name} <span className="mk-verified">✓</span>
              </div>
              <p>{t.desc}</p>
              <div className="mk-trader-stats">
                <div>
                  <div className="num">{t.ret}</div>
                  <div className="lbl">{t.retLabel || 'Return'}</div>
                </div>
                <div>
                  <div className="num">{t.win}</div>
                  <div className="lbl">Win Rate</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const SectionArticles = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-articles">
        {section.items.map((a) => {
          const body = (
            <>
              <span className="mk-article-tag">{a.tag}</span>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </>
          );
          return a.to ? (
            <Link to={a.to} className="mk-article" key={a.title}>
              {body}
            </Link>
          ) : (
            <article className="mk-article" key={a.title}>
              {body}
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const SectionJobs = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-jobs">
        {section.items.map((job) => (
          <div className="mk-job" key={job.title}>
            <div>
              <h3>{job.title}</h3>
              <p>{job.desc}</p>
            </div>
            <div className="mk-job-meta">
              <span>{job.team}</span>
              <span>{job.loc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionCompare = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-compare">
        {[section.left, section.right].map((col) => (
          <div className="mk-compare-col" key={col.heading}>
            <h3>{col.heading}</h3>
            <ul>
              {col.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionSessions = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-sessions">
        {section.items.map((s) => (
          <div className="mk-session" key={s.city}>
            <div className="mk-session-top">
              <h3>{s.city}</h3>
              <span className={`mk-pill ${s.open ? 'on' : ''}`}>{s.open ? 'In play' : 'Closed'}</span>
            </div>
            <div className="mk-session-hours">{s.hours}</div>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionBoard = ({ section, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <SectionHead section={section} />
      <div className="mk-board">
        {section.heatmap && (
          <div className="mk-board-card">
            <h4>Sector heatmap</h4>
            <div className="mk-heatmap">
              {section.heatmap.map((c) => (
                <div
                  key={c.label}
                  className="mk-heat-cell"
                  style={{
                    background: c.up ? 'rgba(168, 85, 247, 0.35)' : 'rgba(226, 86, 79, 0.32)',
                    gridColumn: c.wide ? 'span 2' : undefined,
                    gridRow: c.tall ? 'span 2' : undefined,
                  }}
                >
                  {c.label}
                  <span>{c.pct}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {section.regions && (
          <div className="mk-board-card">
            <h4>Regional activity</h4>
            {section.regions.map(([name, val]) => (
              <div className="mk-region" key={name}>
                <div className="mk-region-top">
                  <span>{name}</span>
                  <span>{val}</span>
                </div>
                <div className="mk-region-bar">
                  <i style={{ width: val }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
);

const SectionFaq = ({ section, odd }) => {
  const [open, setOpen] = useState(0);
  return (
    <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
      <div className="section-container">
        <SectionHead section={section} />
        <div className="faq-items mk-faq">
          {section.items.map((faq, i) => (
            <div className="faq-item-card" key={faq.q}>
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className={`faq-chevron ${open === i ? 'open' : ''}`}>
                  <ArrowRightIcon size={18} color="currentColor" />
                </span>
              </button>
              {open === i && (
                <div className="faq-answer-inner">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionRelated = ({ items, odd }) => (
  <section className={`landing-section ${odd ? 'section-bg-odd' : 'section-bg-even'}`}>
    <div className="section-container">
      <div className="section-header">
        <span className="section-eyebrow">Next</span>
        <h2 className="section-title">Keep exploring</h2>
      </div>
      <div className="mk-related">
        {items.map((r) => (
          <Link to={r.to} className="mk-related-card" key={r.to}>
            <h3>{r.label}</h3>
            <p>{r.desc}</p>
            <span>
              View <ArrowRightIcon size={14} color="currentColor" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const renderSection = (section, index) => {
  const odd = index % 2 === 1;
  const map = {
    split: SectionSplit,
    cards: SectionCards,
    stats: SectionStats,
    highlights: SectionHighlights,
    steps: SectionSteps,
    table: SectionTable,
    timeline: SectionTimeline,
    prose: SectionProse,
    feed: SectionFeed,
    notice: SectionNotice,
    traders: SectionTraders,
    articles: SectionArticles,
    jobs: SectionJobs,
    compare: SectionCompare,
    sessions: SectionSessions,
    board: SectionBoard,
    faq: SectionFaq,
  };
  const Comp = map[section.type];
  return Comp ? <Comp key={index} section={section} odd={odd} /> : null;
};

const MarketingPage = ({ pageId }) => {
  const page = MARKETING_PAGES[pageId];
  if (!page) return null;

  const BadgeIcon = resolveIcon(page.badgeIcon);
  const centered = page.layout === 'center';
  const cta = page.cta || {
    heading: 'Ready to Transform Your Trading?',
    text: 'Join thousands of successful traders on Sigmora and start your journey to trading excellence.',
    primary: { to: '/register', label: 'Start Trading →' },
    secondary: { to: '/register?role=creator', label: 'Register as a creator' },
  };
  const actions = page.actions || [
    { to: '/register', label: 'Start Trading →', primary: true },
    { to: '/register?role=creator', label: 'Register as a creator' },
  ];

  return (
    <div className="landing-premium">
      <Navbar landing />
      {page.ticker?.length > 0 && <Ticker items={page.ticker} />}

      <section className={`page-hero ${centered ? '' : 'page-hero-wide'}`}>
        <PageHeroBg />
        <motion.div
          className={centered ? 'section-container page-hero-inner' : 'section-container mk-hero'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={centered ? '' : 'mk-hero-copy'}>
            <span className="page-hero-badge">
              <BadgeIcon size={16} />
              {page.badge}
            </span>
            <h1 className="page-hero-title">
              {page.title} {page.titleAccent && <span className="gradient-modern">{page.titleAccent}</span>}
            </h1>
            <p className="page-hero-subtitle">{page.subtitle}</p>
            {!centered && (
              <div className="mk-hero-actions">
                {actions.map((a) => (
                  <Link
                    key={a.to + a.label}
                    to={a.to}
                    className={a.primary ? 'btn-landing-primary' : 'btn-landing-secondary'}
                  >
                    {a.label}
                    {a.primary && <ArrowRightIcon size={16} color="currentColor" />}
                  </Link>
                ))}
              </div>
            )}
            {page.trust && <p className="mk-hero-trust">{page.trust}</p>}
          </div>
          {!centered && <HeroVisual visual={page.visual} />}
        </motion.div>
      </section>

      {page.sections.map(renderSection)}
      {page.related?.length > 0 && (
        <SectionRelated items={page.related} odd={page.sections.length % 2 === 0} />
      )}

      {!page.hideCta && (
        <section className="landing-cta">
          <div className="landing-cta-inner">
            <h2>
              {cta.heading}{' '}
              {cta.headingAccent && <span className="gradient-modern">{cta.headingAccent}</span>}
            </h2>
            <p>{cta.text}</p>
            <div className="landing-cta-actions">
              <Link to={cta.primary.to} className="btn-landing-primary">
                {cta.primary.label}
                <ArrowRightIcon size={18} color="currentColor" />
              </Link>
              {cta.secondary && (
                <Link to={cta.secondary.to} className="btn-landing-secondary">
                  {cta.secondary.label}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <Footer landing />
    </div>
  );
};

export default MarketingPage;
