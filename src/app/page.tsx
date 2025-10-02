'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ToolsPage() {
  const [timer, setTimer] = useState(7 * 60) // 7 Minuten in Sekunden
  const [isRunning, setIsRunning] = useState(false)
  const [currentRole, setCurrentRole] = useState<'driver' | 'navigator'>('driver')
  const [teamName, setTeamName] = useState('')

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1)
      }, 1000)
    } else if (timer === 0) {
      // Timer abgelaufen - Rollen wechseln
      setIsRunning(false)
      setCurrentRole(prev => prev === 'driver' ? 'navigator' : 'driver')
      setTimer(7 * 60) // Reset auf 7 Minuten
      
      // Audio-Signal (falls Browser es unterstützt)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Rollenwechsel! Driver und Navigator tauschen.')
        window.speechSynthesis.speak(utterance)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    setTimer(7 * 60)
    setIsRunning(false)
  }

  const switchRoles = () => {
    setCurrentRole(prev => prev === 'driver' ? 'navigator' : 'driver')
    resetTimer()
  }

  return (
    <div className="min-h-screen bg-gray-50">


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Setup */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            👥 Team-Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-4 rounded-lg border-2 transition-all ${
              currentRole === 'driver' 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  🚗 Driver
                </h3>
                {currentRole === 'driver' && (
                  <span className="bg-primary-500 text-white px-2 py-1 rounded text-sm">
                    Aktiv
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Bedient Computer, Maus und Tastatur. Schreibt den Code.
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Tippt und klickt</li>
                <li>• Führt Anweisungen aus</li>
                <li>• Fragt bei Unklarheiten nach</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all ${
              currentRole === 'navigator' 
                ? 'border-secondary-500 bg-secondary-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  🧭 Navigator
                </h3>
                {currentRole === 'navigator' && (
                  <span className="bg-secondary-500 text-white px-2 py-1 rounded text-sm">
                    Aktiv
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Liest Anweisungen vor, denkt mit, überprüft Ergebnisse.
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Liest Schritte vor</li>
                <li>• Achtet auf Details</li>
                <li>• Überprüft das Ergebnis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            ⏰ 7-Minuten Timer
          </h2>
          
          <div className="text-center mb-6">
            <div className={`text-6xl font-mono font-bold mb-4 ${
              timer <= 60 ? 'text-red-600' : 'text-gray-900'
            }`}>
              {formatTime(timer)}
            </div>
            
            {timer <= 60 && timer > 0 && (
              <div className="text-red-600 font-medium animate-pulse">
                ⚠️ Zeit läuft ab! Bereitet Rollenwechsel vor.
              </div>
            )}
            
            {timer === 0 && (
              <div className="text-red-600 font-bold text-xl animate-bounce">
                🔔 ROLLENWECHSEL! Driver ↔ Navigator
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-3 rounded-lg font-medium ${
                isRunning 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isRunning ? '⏸️ Pause' : '▶️ Start'}
            </button>
            
            <button
              onClick={resetTimer}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
            >
              🔄 Reset
            </button>
            
            <button
              onClick={switchRoles}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
            >
              🔄 Rollen tauschen
            </button>
          </div>
        </div>

        {/* Weitere Tools */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            🛠️ Weitere Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link href="/tools/dod" className="card p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="font-semibold text-gray-900">DoD & Retro</h3>
                  <p className="text-sm text-gray-600">Definition of Done und Retrospektive</p>
                </div>
              </div>
            </Link>
            
            <div className="card p-4 opacity-50">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Backlog Board</h3>
                  <p className="text-sm text-gray-600">To-Do / Doing / Done (Coming Soon)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regeln */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            📋 Team-Regeln
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">✅ Erlaubt</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Fragen stellen und diskutieren</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Fehler machen und daraus lernen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Rollenwechsel bei Problemen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Pausen machen wenn nötig</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">❌ Nicht erlaubt</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Beide gleichzeitig tippen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Navigator macht nichts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Driver ignoriert Navigator</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Timer ignorieren</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Debug-Regel */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            🐛 Debug-Regel
          </h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-2xl mr-3">⚠️</div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Bei Fehler oder Bug:
                </h3>
                <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                  <li><strong>STOP</strong> - Nicht weitermachen</li>
                  <li><strong>Rollen tauschen</strong> - Frische Augen helfen</li>
                  <li><strong>Ursache finden</strong> - Was ist schief gelaufen?</li>
                  <li><strong>Eine Sache ändern</strong> - Nicht alles auf einmal</li>
                  <li><strong>Testen</strong> - Funktioniert es jetzt?</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
