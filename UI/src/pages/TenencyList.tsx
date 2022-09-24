import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarContainerProps,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridCsvExportOptions,
  GridExportMenuItemProps,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  GridApi, GridColDef, GridValueGetterParams
} from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import { ButtonProps } from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const getJson = (apiRef: React.MutableRefObject<GridApi>) => {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row: Record<string, any> = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return JSON.stringify(data, null, 2);
};

const exportBlob = (blob: Blob, filename: string) => {
  // Save the blob in a json file
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  });
};

const JsonExportMenuItem = (props: GridExportMenuItemProps<{}>) => {
  const apiRef = useGridApiContext();

  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => {
        const jsonString = getJson(apiRef);
        const blob = new Blob([jsonString], {
          type: 'text/json',
        });
        exportBlob(blob, 'DataGrid_demo.json');

        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Export JSON
    </MenuItem>
  );
};

const csvOptions: GridCsvExportOptions = { delimiter: ';' };

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const CustomExportButton = (props: ButtonProps) => (
  <GridToolbarExportContainer {...props}>
    <GridCsvExportMenuItem options={csvOptions} />
    <JsonExportMenuItem />
  </GridToolbarExportContainer>
);

const CustomToolbar = (props: GridToolbarContainerProps) => (
  <GridToolbarContainer {...props}>
    <CustomExportButton />
  </GridToolbarContainer>
);

export function TenencyList() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [age, setAge] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <br></br>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <table>
            <tr>
              <td>
                <DesktopDatePicker
                  label="From Date"
                  inputFormat="DD-MM-YYYY"                
                  value={value}
                  minDate={dayjs('2017-01-01')}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </td>
              <td>
                <DesktopDatePicker
                  label="To Date"
                  inputFormat="DD-MM-YYYY"
                  value={value}
                  minDate={dayjs('2017-01-01')}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </td>
              <td>
                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Apartment</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Apartment"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>U14</MenuItem>
                      <MenuItem value={20}>U15</MenuItem>
                      <MenuItem value={30}>U15</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </td>
              <td>
                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Agent</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Agent"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Agent 1</MenuItem>
                      <MenuItem value={20}>Agent 2</MenuItem>
                      <MenuItem value={30}>Agent 2</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </td>
              <td>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '75ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >

                  <TextField id="standard-basic" label="search" variant="standard" />
                </Box>
              </td>
            </tr>
          </table>
        </Stack>
      </LocalizationProvider>

      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={15}
        // loading={loading}
        components={{ Toolbar: CustomToolbar }}
      />
    </div>
  );
}
