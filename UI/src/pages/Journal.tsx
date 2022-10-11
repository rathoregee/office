import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import './Journal.css';
const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const StyledBox = styled(Box)(({ theme }) => ({

    '& .MuiDataGrid-cell--editing': {
        backgroundColor: 'rgb(255,215,115, 0.19)',
        color: '#1a3e72',
        '& .MuiInputBase-root': {
            height: '100%',
        },
    },
    '& .Mui-error': {
        backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
        color: theme.palette.error.main,
    },
}));

let accounts: string[] = ['Loan Payment', 'Credit card', 'Bank transfer', 'Cash'];


export function Journal() {
    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [rows, setRows] = useState<any>([]);

    const d = [
        {
            id: 1,
            account: 'Credit card',
            detail: 'Credit card paid',
            dr: 250.00,
            cr: 0.00
        },
        {
            id: 2,
            account: 'Cash',
            detail: 'Tim Horton dinner',
            dr: 250.00,
            cr: 0.00
        },
        {
            id: 3,
            account: 'Bank transfer',
            detail: 'Car insurance',
            dr: 0.00,
            cr: 500
        }
    ];

    useEffect(() => {
        setRows(d);
        accounts.push('aaaaa');
    }, []);

    const columns: GridColumns = [
        {
            field: 'account',
            headerName: 'Account',
            type: 'singleSelect',
            valueOptions: accounts,
            width: 350,

            sortable: false,
            editable: true,
            // preProcessEditCellProps: (params) => {
            //     const isPaidProps = params.otherFieldsProps!.isPaid;
            //     const hasError = isPaidProps.value && !params.props.value;
            //     return { ...params.props, error: hasError };
            // },
        },
        {
            field: 'detail',
            headerName: 'Detail',
            width: 800,

            sortable: false,
            editable: true
        },
        {
            field: 'dr',
            headerName: 'Debit',
            type: 'number',
            width: 120,

            sortable: false,
            editable: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'cr',
            headerName: 'Credit',
            type: 'number',
            width: 120,

            sortable: false,
            editable: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        }
    ];

    return (
        <ThemeProvider theme={theme}>
            <div className='jv-header'>
                <div className='jv-header'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Chip label="Journal General" />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Voucher Number"
                            defaultValue="000456"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                        </LocalizationProvider>
                        <Button variant="outlined">Post</Button>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Total Debit"
                            defaultValue="500.00"
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Total Credit"
                            defaultValue="500.00"
                        />
                    </Box>
                </div>
                <StyledBox>
                    <DataGrid
                        autoHeight={true}
                        rows={rows}
                        columns={columns}
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                    <Box sx={{ maxWidth: '100%' }}>
                        <TextField fullWidth label="Comments" id="fullWidth" />
                    </Box>
                    <br></br>

                </StyledBox>
            </div>
        </ThemeProvider>
    );
}
