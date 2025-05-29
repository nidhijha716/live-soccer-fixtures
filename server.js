// server.js — Express backend fetching from Football-Data.org

import express from 'express'
import fetch   from 'node-fetch'
import cors    from 'cors'

const app  = express()
const PORT = 3000

const FOOTBALL_DATA_TOKEN = '7dc437f32d3d49f4a0a6ed046481f05e'

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' })
})

app.get('/api/matches', async (req, res) => {
  try {
    console.log(' Fetching scheduled matches from Football-Data.org…')

    const response = await fetch(
      'https://api.football-data.org/v4/matches?status=SCHEDULED',
      {
        headers: {
          'X-Auth-Token': FOOTBALL_DATA_TOKEN
        }
      }
    )

    if (!response.ok) {
      console.error('  Football-Data.org responded with', response.status)
      return res
        .status(response.status)
        .json({ error: 'Upstream fetch failed', status: response.status })
    }

    const data = await response.json()
    
    const matches = (data.matches || []).map(m => ({
      home:     m.homeTeam.name,
      away:     m.awayTeam.name,
      datetime: m.utcDate   
    }))

    console.log(` Found ${matches.length} scheduled matches`)
    return res.json(matches)

  } catch (err) {
    console.error(' Error in /api/matches:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`)
  console.log(` Health-check:    http://localhost:${PORT}/api/health`)
  console.log(` Scheduled matches: http://localhost:${PORT}/api/matches`)
})
