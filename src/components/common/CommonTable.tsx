// components/common/CommonTable.tsx
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import type { CommonTableProps } from '../../types/CommomType';
import '../../styles/table.css';
const CommonTable = <T,>({ table }: CommonTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await table.dataFetcher();
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error('Table fetch error:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table.dataFetcher]);
  const customStylesForTable = {
    table: {
      style: {
        borderRadius: "14px",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
      },
    },
    headRow: {
      style: {
        background: "#4F39F7",
        color: "white",
        fontSize: "15px",
        minHeight: "58px",
      },
    },
    headCells: {
      style: {
        padding: "16px",
        fontWeight: 600,
        letterSpacing: "0.5px",
      },
    },
    rows: {
      style: {
        backgroundColor: "#fff",
        '&:hover': {
          backgroundColor: "#F3F4F6",
        },
      },
    },
    cells: {
      style: { padding: "14px 16px" }
    }
  };
  return (
    <DataTable
      columns={table.columns}
      data={data}
      progressPending={loading}
      customStyles={table.customStyles || customStylesForTable}
      fixedHeader={table.fixedHeader}
      noDataComponent={table.noDataComponent}
      progressComponent={table.progressComponent}
    />
  );
};

export default CommonTable;