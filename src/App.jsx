

import { useState, useEffect } from 'react'
import styles from './App.module.css'

export default function App() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch matches on mount
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        console.log('Fetching matches from API...')
        const res = await fetch('/api/matches')
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        console.log('Received matches:', data)
        setMatches(data)
      } catch (err) {
        console.error('Error fetching matches:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  // Format a datetime string nicely
  const formatDateTime = datetime => {
    try {
      return new Date(datetime).toLocaleString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Date TBD'
    }
  }

  return (
    <div className={styles.parallax}>
      <div className={styles.content}>
        {/* HEADER */}
        <header className={styles.header}>
          <h1>⚽ Upcoming Soccer Matches</h1>
          <p>Live schedule from your chosen competition</p>
        </header>

        {/* LOADING */}
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading matches...</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className={styles.error}>
            <p>❌ Error: {error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        )}

        {/* MATCH LIST */}
        {!loading && !error && (
          <div className={styles.matchesContainer}>
            {matches.length === 0 ? (
              <div className={styles.noMatches}>
                <p>No upcoming matches found</p>
              </div>
            ) : (
              <div className={styles.matchesGrid}>
                {matches.map((match, i) => (
                  <div key={i} className={styles.matchCard}>
                    <div className={styles.teams}>
                      <span className={styles.homeTeam}>{match.home}</span>
                      <span className={styles.vs}>VS</span>
                      <span className={styles.awayTeam}>{match.away}</span>
                    </div>
                    <div className={styles.datetime}>
                      📅 {formatDateTime(match.datetime)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABOUT SOCCER */}
        <section className={styles.aboutSection}>
          <h2>About Soccer</h2>
          <p>
            Soccer (football) is the world’s most popular sport, played by over 250 million players in over 200
            countries. It’s a game of two teams, each aiming to score in the opposing net by kicking a ball
            – simple rules, but endless excitement!
          </p>
        </section>
      </div>
    </div>
  )
}












