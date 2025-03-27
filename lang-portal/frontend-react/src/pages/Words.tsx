import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Words = () => {
  const [words, setWords] = useState([]); // Initialize `words` as an empty array

  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:8000/api/words/') // Added trailing slash
      .then(response => {
        // Extract `items` array from the response object
        if (response.data && Array.isArray(response.data.items)) {
          setWords(response.data.items);
        } else {
          console.error('Data does not contain an items array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching words:', error);
      });
  }, []);

  // Map over words if it's an array, otherwise show a loading state or error
  return (
    <div>
      {Array.isArray(words) ? (
        words.map((word, index) => (
          <div key={index}>{word.name}</div>  // Assuming each `word` object has a `name` property
        ))
      ) : (
        <p>Loading words...</p> // Show loading or an error if words is not an array
      )}
    </div>
  );
};

export default Words;
