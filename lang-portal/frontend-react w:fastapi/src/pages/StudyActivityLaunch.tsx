import { useParams, useNavigate } from 'react-router-dom';
import { useGroups } from '../api/groups';
import { useLaunchActivity } from '../api/studyActivities';
import { useForm } from 'react-hook-form';

export default function StudyActivityLaunch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: groups } = useGroups();
  const launchMutation = useLaunchActivity();

  const { register, handleSubmit } = useForm<{ group_id: number }>();

  const onSubmit = handleSubmit(async (values) => {
    const payload = { activity_id: Number(id), group_id: values.group_id };
    const result = await launchMutation.mutateAsync(payload);

    // Open activity in new tab
    window.open(result.activity_url, '_blank');

    // Redirect to session page
    navigate(`/study_sessions/${result.study_session_id}`);
  });

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Launch Study Activity</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Group</label>
          <select {...register('group_id')} className="w-full border rounded px-3 py-2">
            {groups?.map((group: any) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Launch Now
        </button>
      </form>
    </div>
  );
}
