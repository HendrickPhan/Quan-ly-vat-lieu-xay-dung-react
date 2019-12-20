import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import { fetchAgency, fetchAgencySelectList } from './AgencyFormActions';
// react-router-doom components

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));


export default function AgencyFormView(props) {
    const classes = useStyles();
    let idField = "";
    if(props.agency.id) {
        idField = <Grid item xs={12} sm={12}>
                    <TextField
                        id="id"
                        label="Id"
                        fullWidth
                        disabled
                        value={props.fetched && props.agency.id ? props.agency.id : ''}
                    />
                </Grid>
    } 
    
    return (
        <Paper className={classes.root}>
            <form noValidate autoComplete="off" onSubmit={(e) => props.handleSubmit(e)}>
                <Grid container spacing={3}>
                    {idField}
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Tên đại lý"
                            fullWidth
                            value={props.agency.name ? props.agency.name : ''}
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
                            value={props.agency.address ? props.agency.address : ''}
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
                            value={props.agency.phone ? props.agency.phone : ''}
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