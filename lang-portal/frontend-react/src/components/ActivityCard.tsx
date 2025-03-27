import { Link } from 'react-router-dom';

interface ActivityCardProps {
  id: number;
  name: string;
  thumbnail_url?: string;
}

export default function ActivityCard({ id, name, thumbnail_url }: ActivityCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 shadow rounded overflow-hidden flex flex-col">
      {thumbnail_url && (
        <img src={thumbnail_url} alt={name} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <div className="mt-auto space-x-2">
          <Link to={`/study_activities/${id}`} className="text-blue-600 underline">View</Link>
          <Link to={`/study_activities/${id}/launch`} className="text-green-600 underline">Launch</Link>
        </div>
      </div>
    </div>
  );
}
