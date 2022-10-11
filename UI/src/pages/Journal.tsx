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

    },
];

export function Journal() {
    const columns: GridColumns = [
        {
            field: 'account',
            headerName: 'Account',
            type: 'singleSelect',
            valueOptions: ['Loan Payment', 'Credit card', 'Bank transfer', 'Cash'],
            width: 350,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isPaidProps = params.otherFieldsProps!.isPaid;
                const hasError = isPaidProps.value && !params.props.value;
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'detail',
            headerName: 'Detail',
            width: 800,
            editable: true
        },
        {
            field: 'dr',
            headerName: 'Debit',
            type: 'number',
            width: 120,
            editable: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'cr',
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
                experimentalFeatures={{ newEditingApi: true }}
            />
        </StyledBox>
    );
}
