import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const renderActions = () => {};

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'headline',
    headerName: 'Headline',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    minWidth: 80,
    renderCell: renderActions,
  },
];

export default function InstructorTable(props) {
  const { data } = props;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        getRowId={(r) => r._id}
        columns={columns}
        autoPageSize
      />
    </div>
  );
}
