import React, { useMemo } from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from 'react-table';
import DefaultColumnFilter from './Filter/defaultColumn';
import GlobalFilter from './Filter/global';
import { Container } from './styles';

const Table = ({ columns, data }) => {
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
  );

  // Render the UI for your table
  return (
    <Container>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 25, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize} resultados por página
          </option>
        ))}
      </select>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div>
                    <span>
                      {column.render('Header') === 'check' ? (
                        <button
                          type="button"
                          className="btn btn-info"
                          id="check"
                        >
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                      ) : (
                        column.render('Header')
                      )}
                    </span>
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <span className="arrow arrow-down"></span>
                        ) : (
                          <span className="arrow arrow-up"></span>
                        )
                      ) : (
                        column.accessor && (
                          <>
                            <span className="arrow arrow-up"></span>
                            <span className="arrow arrow-down"></span>
                          </>
                        )
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={row.original.cor && row.original.cor}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <div className="paginate">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          Primeiro
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'Anterior'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'Próximo'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'Último'}
        </button>{' '}
        <span>
          Página {pageIndex + 1} de {pageOptions.length}{' '}
        </span>
        <span>
          | ir para a página:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>{' '}
      </div>
    </Container>
  );
};

export default Table;
