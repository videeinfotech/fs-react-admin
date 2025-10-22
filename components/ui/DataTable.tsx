import React, { useState, useMemo } from 'react';
import { SortIcon } from './icons/OtherIcons';

interface Column<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderActions?: (item: T) => React.ReactNode;
}

export function DataTable<T,>({ columns, data, renderActions }: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return data.filter(item =>
      columns.some(column =>
        String(item[column.accessor]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, columns]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        
        if (valA == null) return 1;
        if (valB == null) return -1;
        
        const keyStr = String(sortConfig.key).toLowerCase();
        if (typeof valA === 'string' && typeof valB === 'string' && (keyStr.includes('date') || keyStr.endsWith('at'))) {
            const dateA = new Date(valA).getTime();
            const dateB = new Date(valB).getTime();
             if (!isNaN(dateA) && !isNaN(dateB)) {
                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
             }
        }

        let comparison = 0;
        if (valA > valB) {
          comparison = 1;
        } else if (valA < valB) {
          comparison = -1;
        }
        
        return sortConfig.direction === 'asc' ? comparison : comparison * -1;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map(col => (
                <th 
                  key={String(col.accessor)} 
                  scope="col" 
                  className={`px-6 py-3 ${col.sortable ? 'cursor-pointer group' : ''}`}
                  onClick={() => col.sortable && requestSort(col.accessor)}
                >
                  <div className="flex items-center">
                    {col.header}
                    {col.sortable && (
                        <SortIcon direction={sortConfig?.key === col.accessor ? sortConfig.direction : undefined} />
                    )}
                  </div>
                </th>
              ))}
              {renderActions && <th scope="col" className="px-6 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {columns.map(col => (
                  <td key={String(col.accessor)} className="px-6 py-4">
                    {col.render ? col.render(item) : String(item[col.accessor])}
                  </td>
                ))}
                {renderActions && <td className="px-6 py-4">{renderActions(item)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}