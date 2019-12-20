import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from "../../../components/Snackbar/Snackbar.js"; 

// react-redux components
import { connect } from 'react-redux';
import { fetchVendor, fetchVendorSelectList } from './VendorFormActions';
// react-router-doom components

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));


export default function VendorFormView(props) {
    const classes = useStyles();
    let idField = "";
    let inDebtAmountField = "";
    if(props.vendor.id) {
        idField = <Grid item xs={12} sm={12}>
                    <TextField
                        id="id"
                        label="Id"
                        fullWidth
                        disabled
                        value={props.fetched && props.vendor.id ? props.vendor.id : ''}

                    />
                </Grid>

        inDebtAmountField = <Grid item xs={12} sm={12}>
                    <TextField
                        id="in_debt_amount"
                        label="Số tiền đang nợ"
                        fullWidth
                        disabled
                        value={props.fetched && props.vendor.in_debt_amount ? props.vendor.in_debt_amount : 0}

                    />
                </Grid>
    } 
    
    return (
        <Paper className={classes.root}>
            <form autoComplete="off" onSubmit={(e) => props.handleSubmit(e)}>
                <Grid container spacing={3}>
                    {idField}
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Tên nhà cung cấp"
                            fullWidth
                            value={props.vendor.name ? props.vendor.name : ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Địa chỉ"
                            fullWidth
                            value={props.vendor.address ? props.vendor.address : ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Số điện thoại"
                            fullWidth
                            value={props.vendor.phone ? props.vendor.phone : ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={props.vendor.email ? props.vendor.email : ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            size="small"
                            className={classes.button}
                        >
                            <SaveIcon />Save
                    </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
} 