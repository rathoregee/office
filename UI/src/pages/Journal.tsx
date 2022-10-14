import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from '../redux/reducers/rootReducer';
import { fetchAccounts } from '../redux/reducers/JournalReducer';
import { Provider, useSelector, useDispatch } from 'react-redux';
import Chip from '@mui/material/Chip';
import './Journal.css';

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const StyledBox = styled(Box)(({ theme }) => ({
    maxHeight: 400,
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


export function Journal() {
    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [rows, setRows] = useState<any>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { accounts, loading } = useSelector((state: RootState) => state.accounts);
    const [list, setList] = useState<any>([]);

    useEffect(() => {
        dispatch(fetchAccounts());
        const arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push({
                id: i,
                account: 'Credit card',
                detail: '',
                dr: 0.00,
                cr: 0.00
            });
        }
        setRows(arr);
    }, [dispatch])


    useEffect(() => {
        if (!!accounts.accounts) {
            setList(accounts.accounts.map(key => { return key.name }));            
        }

    }, [accounts]);


    const columns: GridColumns = [
        {
            field: 'account',
            headerName: 'Account',
            type: 'singleSelect',
            valueOptions: list,
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
        <Provider store={store}>
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
                            <div className='right-section'>
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
                            </div>
                        </Box>
                    </div>
                    <StyledBox style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            autoHeight={true}
                            rowHeight={25}
                            rows={rows}
                            columns={columns}
                            experimentalFeatures={{ newEditingApi: true }}
                            initialState={{
                                pagination: {
                                    pageSize: 15,
                                },
                            }}
                        />
                        <Box sx={{ maxWidth: '100%' }}>
                            <TextField fullWidth label="Comments" id="fullWidth" />
                        </Box>
                        <br></br>

                    </StyledBox>
                </div>
            </ThemeProvider>
        </Provider>
    );
}
