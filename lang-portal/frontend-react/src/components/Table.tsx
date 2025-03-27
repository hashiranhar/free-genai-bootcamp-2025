import React, { useState } from 'react';

interface TableProps {
  data: Array<Record<string, any>>;
  columns: Array<string>;
  rowsPerPage?: number;
}

const Table: React.FC<TableProps> = ({ data, columns, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={startIndex + rowsPerPage >= data.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
