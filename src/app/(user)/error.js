'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'

/**
 * Brief: Composant de gestion d'erreurs pour la section utilisateur avec possibilité de récupération
 * @param {Object} error - Objet d'erreur capturé par le boundary
 * @param {Function} reset - Fonction pour tenter de récupérer en re-rendant le segment
 * @returns {JSX.Element} Interface d'erreur avec message et bouton de réessai
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong! 😭</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}