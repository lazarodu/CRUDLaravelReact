import React from 'react';
// Define a default UI for filtering
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;

  return (
    <div className="search">
      Pesquisar:{' '}
      <input
        value={globalFilter || ''}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} registros...`}
        style={{
          fontSize: '1.2rem',
          border: '1',
        }}
      />
    </div>
  );
};

export default GlobalFilter;
