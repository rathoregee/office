import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomPrice } from '@mui/x-data-grid-generator';

const StyledBox = styled(Box)(({ theme }) => ({
    height: 300,
    width: '100%',
    backgroundColor: 'white',
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

const rows: GridRowsProp = [
    {
        id: 1,
        expense: 'Light bill',
        price: randomPrice(0, 1000),
        dueAt: new Date(2021, 6, 8),
        isPaid: false,
        paymentMethod: '',
    },
    {
        id: 2,
        expense: 'Rent',
        price: randomPrice(0, 1000),
        dueAt: new Date(2021, 7, 1),
        isPaid: false,
        paymentMethod: '',
    },
    {
        id: 3,
        expense: 'Car insurance',
        price: randomPrice(0, 1000),
        dueAt: new Date(2021, 7, 4),
        isPaid: true,
        paymentMethod: 'Wire transfer',
    },
];

export function Journal() {
    const columns: GridColumns = [
        {
            field: 'paymentMethod',
            headerName: 'Account',
            type: 'singleSelect',
            valueOptions: ['Credit card', 'Wire transfer', 'Cash'],
            width: 160,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isPaidProps = params.otherFieldsProps!.isPaid;
                const hasError = isPaidProps.value && !params.props.value;
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'expense', 
            headerName: 'Detail', 
            width: 500, 
            editable: true 
        },
        {
            field: 'price',
            headerName: 'Debit',
            type: 'number',
            width: 120,
            editable: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'price',
            headerName: 'Credit',
            type: 'number',
            width: 120,
            editable: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
    ];

    return (
        <StyledBox>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                experimentalFeatures={{ newEditingApi: true }}
            />
        </StyledBox>
    );
}
