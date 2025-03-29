import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigation } from '@/context/NavigationContext'
import { createStudySession } from '@/services/api'

type Group = {
  id: number
  name: string
}

type StudyActivity = {
  id: number
  title: string
  launch_url: string
  preview_url: string
}

type LaunchData = {
  activity: StudyActivity
  groups: Group[]
}

export default function StudyActivityLaunch() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setCurrentStudyActivity } = useNavigation()
  const [launchData, setLaunchData] = useState<LaunchData | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/study-activities/${id}/launch`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch launch data')
        return response.json()
      })
      .then(data => {
        setLaunchData(data)
        setCurrentStudyActivity(data.activity)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id, setCurrentStudyActivity])

  // Clean up when unmounting
  useEffect(() => {
    return () => {
      setCurrentStudyActivity(null)
    }
  }, [setCurrentStudyActivity])

  const handleLaunch = async () => {
    if (!launchData?.activity || !selectedGroup) return;
    
    try {
      // Create a study session first
      const result = await createStudySession(parseInt(selectedGroup), launchData.activity.id);
      const sessionId = result.session_id;
      
      // Replace any instances of $group_id with the actual group id and add session_id
      const launchUrl = new URL(launchData.activity.launch_url);
      launchUrl.searchParams.set('group_id', selectedGroup);
      launchUrl.searchParams.set('session_id', sessionId.toString());
      
      // Open the modified URL in a new tab
      window.open(launchUrl.toString(), '_blank');
      
      // Navigate to the session show page
      navigate(`/sessions/${sessionId}`);
    } catch (error) {
      console.error('Failed to launch activity:', error);
    }
  }

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  if (!launchData) {
    return <div className="text-red-500">Activity not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-10 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">{launchData.activity.title}</h1>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">Select Word Group</label>
          <Select onValueChange={setSelectedGroup} value={selectedGroup}>
            <SelectTrigger className="border-gray-300 dark:border-gray-700 rounded-lg">
              <SelectValue placeholder="Select a word group" />
            </SelectTrigger>
            <SelectContent>
              {launchData.groups.map((group) => (
                <SelectItem key={group.id} value={group.id.toString()}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleLaunch}
          disabled={!selectedGroup}
          className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700"
        >
          Launch Now
        </Button>
      </div>
    </div>
  )
}
