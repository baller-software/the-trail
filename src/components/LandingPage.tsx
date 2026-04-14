import type { Theme } from '../hooks/useTheme'
import styles from '../styles/landing.module.css'
import crtStyles from '../styles/crt-effects.module.css'

const ASCII_ART = `      _______________________________________________________
     /                                                       \\
    |    _________________________________________________    |
    |   |                                                 |   |
    |   |   _    _  _    ____  ____  _   _    ___  _   _  |   |
    |   |  | \\  / || |  / ___|| ___|| \\ | |  / _ \\| \\ | | |   |
    |   |  |  \\/  || |  \\___ \\| |__ |  \\| | | | | |  \\| | |   |
    |   |  | \\__/ || |   ___| |  __|| |\\  | | |_| | |\\  | |   |
    |   |  |_|  |_||_|  |____/|____||_| \\_|  \\___/|_| \\_| |   |
    |   |_________________________________________________|   |
    |                                                         |
     \\_________________________      ________________________/
                               |    |
                               |    |
                               |____|`

interface LandingPageProps {
  onStart: () => void
  theme: Theme
  onToggleTheme: () => void
}

export function LandingPage({
  onStart,
  theme,
  onToggleTheme,
}: LandingPageProps) {
  const themeLabel = theme === 'green' ? 'AMBER_MODE' : 'GREEN_MODE'

  return (
    <>
      <div className={crtStyles.crtOverlay} />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={`${styles.logo} ${crtStyles.glow}`}>
            OREGON_TRAIL_v1.0
          </div>
          <nav className={styles.nav}>
            <a href="#mission" className={styles.navLinkActive}>
              MISSION
            </a>
            <a href="#gameplay" className={styles.navLink}>
              GAMEPLAY
            </a>
            <a href="#history" className={styles.navLink}>
              HISTORY
            </a>
            <button className={styles.navLink} onClick={onStart}>
              PLAY NOW
            </button>
          </nav>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className={styles.bootButton} onClick={onToggleTheme}>
              {themeLabel}
            </button>
            <button className={styles.bootButton} onClick={onStart}>
              SYSTEM_BOOT
            </button>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <section className={styles.hero}>
          <pre className={styles.asciiArt}>{ASCII_ART}</pre>
          <h1 className={`${styles.heroTitle} ${crtStyles.brightGlow}`}>
            YOU HAVE DIED OF DYSENTERY
          </h1>
          <p className={styles.heroSubtitle}>
            A FAITHFUL TELETYPE RECREATION OF THE 1971 SIMULATION. NO GRAPHICS.
            NO MERCY. JUST YOU, YOUR WAGON, AND 2,000 MILES OF UNFORGIVING
            WILDERNESS.
          </p>
          <button className={styles.ctaButton} onClick={onStart}>
            [ BOOT SYSTEM ]
          </button>
        </section>

        <div className={styles.divider}>{'='.repeat(120)}</div>

        <section className={styles.missionSection} id="mission">
          <div className={styles.missionLabel}>
            <h2 className={styles.missionTitle}>MISSION_LOG</h2>
            <p className={styles.missionId}>ID: ARCHIVE_71_01</p>
            <div className={styles.missionStatus}>
              <p>CORE_DRIVE: MOUNTED</p>
              <p>STATUS: OPTIMAL</p>
            </div>
          </div>
          <div className={styles.missionBody}>
            <p className={styles.missionText}>
              OUR GOAL IS THE RADICAL PRESERVATION OF DIGITAL ARTIFACTS. THE
              OREGON TRAIL WAS BORN IN A MINNESOTA BASEMENT ON A TELETYPE
              TERMINAL — NOT A HIGH-RES SCREEN.
            </p>
            <p className={styles.missionTextDim}>
              BY STRIPPING AWAY THE LAYERS OF MODERN GRAPHICS, WE RETURN TO THE
              CORE OF THE EXPERIENCE: MATHEMATICS, PROBABILITY, AND HISTORICAL
              ACCURACY. WE PRESERVE THE STRUGGLE AND THE LEGACY OF EARLY
              COMPUTING.
            </p>
          </div>
        </section>

        <section className={styles.featuresSection} id="gameplay">
          <h3 className={styles.featuresTitle}>
            --- RESOURCE_MANAGEMENT_PROTOCOLS ---
          </h3>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <h4 className={styles.featureCardTitle}>[ 1. OXEN ]</h4>
              <p className={styles.featureCardBody}>
                THE BACKBONE OF YOUR JOURNEY. WITHOUT THEM, YOU ARE STATIONARY.
                WITHOUT SPEED, YOU ARE DEAD BEFORE WINTER.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h4 className={styles.featureCardTitle}>[ 2. FOOD ]</h4>
              <p className={styles.featureCardBody}>
                RATIONS DETERMINE MORALE AND HEALTH. A STARVING CREW IS A CREW
                SUSCEPTIBLE TO DISEASE AND MUTINY.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h4 className={styles.featureCardTitle}>[ 3. AMMO ]</h4>
              <p className={styles.featureCardBody}>
                YOUR ONLY DEFENSE AGAINST THE WILD AND YOUR ONLY WAY TO HUNT FOR
                EXTRA SUPPLIES. USE IT WISELY.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h4 className={styles.featureCardTitle}>[ 4. SURVIVAL ]</h4>
              <p className={styles.featureCardBody}>
                RANDOM EVENTS — BROKEN AXLES AND ILLNESS — WILL TEST YOUR
                DECISION-MAKING AT EVERY MILE.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.previewSection}>
          <div className={styles.previewWindow}>
            <div className={styles.previewHeader}>
              <span>LOG_VIEWER.EXE</span>
              <span>1971-12-03_ARCHIVE</span>
            </div>
            <div className={styles.previewContent}>
              <p className={styles.previewBright}>MILES TRAVELED: 452</p>
              <p>NEXT LANDMARK: CHIMNEY ROCK (12 MILES)</p>
              <p>WAGON STATUS: [ OK ]</p>
              <p>HEALTH STATUS: [ POOR ]</p>
              <div className={styles.previewQuote}>
                &quot;A COLD WIND BLOWS FROM THE NORTH. THE CHILDREN ARE WEAK.
                SUPPLIES ARE RUNNING THIN AS WE APPROACH THE CROSSING.&quot;
              </div>
            </div>
          </div>
          <div className={styles.previewWindow}>
            <div className={styles.previewHeader}>
              <span>MAP_RENDERER.EXE</span>
              <span>POSITION_TRACKER</span>
            </div>
            <div
              className={styles.previewContent}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <div
                className={crtStyles.glow}
                style={{ fontSize: '1.2rem', letterSpacing: '0.15em' }}
              >
                LOCATING CURRENT_POSITION...
              </div>
              <div
                className={crtStyles.brightGlow}
                style={{ fontSize: '3rem', margin: '2rem 0' }}
              >
                [ + ]
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  letterSpacing: '0.4em',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                LAT: 41.8319 / LONG: -103.7330
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} id="history">
          <h2 className={styles.ctaSectionTitle}>
            READY TO START THE JOURNEY?
          </h2>
          <div className={styles.ctaPrompt}>
            <span>&gt; [ ENTER ]</span>
            <span className={crtStyles.blinkingCursor} />
          </div>
          <button
            className={styles.ctaButton}
            onClick={onStart}
            style={{ marginTop: '3rem' }}
          >
            [ INITIALIZE BOOT_SEQUENCE ]
          </button>
          <p className={styles.ctaHint}>
            PRESS ANY KEY TO INITIALIZE BOOT_SEQUENCE
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div style={{ opacity: 0.6 }}>
            (C) 1971 MECC — TERMINAL_EMULATION_MODE: ENABLED
          </div>
          <div className={styles.footerLinks}>
            <button className={styles.footerLink} onClick={onToggleTheme}>
              {themeLabel}
            </button>
            <span style={{ color: 'var(--color-bright)' }}>STATUS: ONLINE</span>
          </div>
        </div>
      </footer>
    </>
  )
}
