import React, { useEffect, useState } from 'react';
import { getGroups } from '../services/api';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await getGroups(page);
      setGroups(data.items);
    };
    fetchGroups();
  }, [page]);

  return (
    <div>
      <h1>Groups</h1>
      <table>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Word Count</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.name}</td>
              <td>{group.word_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default Groups;
