import { useGroupList } from '../api/groups';
import { Link } from 'react-router-dom';

export default function Groups() {
  const { data: groups, isLoading } = useGroupList();

  if (isLoading) return <p className="p-6">Loading groups...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Word Groups</h1>
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-zinc-800">
              <th className="p-2 text-left">Group Name</th>
              <th className="p-2 text-left">Word Count</th>
            </tr>
          </thead>
          <tbody>
            {groups?.map((group: any) => (
              <tr key={group.id} className="border-t dark:border-zinc-700">
                <td className="p-2">
                  <Link
                    to={`/groups/${group.id}`}
                    className="text-blue-600 underline"
                  >
                    {group.name}
                  </Link>
                </td>
                <td className="p-2">{group.word_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
