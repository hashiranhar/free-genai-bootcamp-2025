import { useStudyActivities } from '../api/studyActivities';
import ActivityCard from '../components/ActivityCard';

export default function StudyActivities() {
  const { data: activities, isLoading } = useStudyActivities();

  if (isLoading) return <p className="p-6">Loading study activities...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Study Activities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities?.map((activity: any) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            name={activity.name}
            thumbnail_url={activity.thumbnail_url}
          />
        ))}
      </div>
    </div>
  );
}
