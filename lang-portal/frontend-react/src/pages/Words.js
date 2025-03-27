import React, { useEffect, useState } from 'react';
import { getWords } from '../services/api';

const Words = () => {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchWords = async () => {
      const data = await getWords(page);
      setWords(data.items);
    };
    fetchWords();
  }, [page]);

  return (
    <div>
      <h1>Words</h1>
      <table>
        <thead>
          <tr>
            <th>Japanese</th>
            <th>Romaji</th>
            <th>English</th>
            <th>Correct Count</th>
            <th>Wrong Count</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.japanese}>
              <td>{word.japanese}</td>
              <td>{word.romaji}</td>
              <td>{word.english}</td>
              <td>{word.correct_count}</td>
              <td>{word.wrong_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default Words;
