import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const StyledBox = styled(Box)(({ theme }) => ({

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

    }
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
        }
    ];

    return (
        <StyledBox>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={2}>
                        <Item>xs=8</Item>
                    </Grid>
                    <Grid xs={2}>
                        <Item>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Voucher Number"
                                defaultValue="Hello World"
                            /></Item>
                    </Grid>
                    <Grid xs={2}>
                        <Item><Button size="small" variant="outlined">Post</Button></Item>
                    </Grid>
                </Grid>
            </Box>
            <br></br>
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
    );
}
