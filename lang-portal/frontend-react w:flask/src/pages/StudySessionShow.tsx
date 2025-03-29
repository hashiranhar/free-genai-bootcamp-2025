import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigation } from '@/context/NavigationContext'
import WordsTable from '@/components/WordsTable'
import Pagination from '@/components/Pagination'
import type { Word, WordSortKey } from '@/services/api'

interface StudySession {
  id: number
  group_id: number
  group_name: string
  activity_id: number
  activity_name: string
  start_time: string
  end_time: string
  review_items_count: number
}

interface SessionResponse {
  session: StudySession
  words: Word[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export default function StudySessionShow() {
  const { id } = useParams<{ id: string }>()
  const [session, setSession] = useState<StudySession | null>(null)
  const [words, setWords] = useState<Word[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortKey, setSortKey] = useState<WordSortKey>('kanji')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `http://localhost:5000/api/study-sessions/${id}?page=${currentPage}&per_page=10`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch session data')
        }
        const data: SessionResponse = await response.json()
        setSession(data.session)
        setWords(data.words)
        setTotalPages(data.total_pages)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, currentPage])

  const handleSort = (key: WordSortKey) => {
    if (key === sortKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading...</div>
  }

  if (error || !session) {
    return <div className="text-red-500 text-center py-4">{error || 'Session not found'}</div>
  }

  return (
    <div className="space-y-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Study Session</h1>
        <Link
          to="/sessions"
          className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700"
        >
          Back to Sessions
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Activity</h2>
            <Link to={`/study-activities/${session.activity_id}`} className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
              {session.activity_name}
            </Link>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Group</h2>
            <Link to={`/groups/${session.group_id}`} className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
              {session.group_name}
            </Link>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Start Time</h2>
            <p className="text-lg text-gray-800 dark:text-gray-200">{session.start_time}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Review Items</h2>
            <p className="text-lg text-gray-800 dark:text-gray-200">{session.review_items_count}</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Words Reviewed</h2>
        <WordsTable
          words={words}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}
