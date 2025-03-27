import React, { useEffect, useState } from 'react';
import { getStudySessions } from '../services/api';

const StudySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchSessions = async () => {
      const data = await getStudySessions(page);
      setSessions(data.items);
    };
    fetchSessions();
  }, [page]);

  return (
    <div>
      <h1>Study Sessions</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Activity Name</th>
            <th>Group Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Review Items Count</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.id}</td>
              <td>{session.activity_name}</td>
              <td>{session.group_name}</td>
              <td>{session.start_time}</td>
              <td>{session.end_time || 'N/A'}</td>
              <td>{session.review_items_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default StudySessions;
