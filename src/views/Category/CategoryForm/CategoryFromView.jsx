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
import { fetchCategory, fetchCategorySelectList } from './CategoryFormActions';
// react-router-doom components

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));


export default function CategoryFormView(props) {
    const classes = useStyles();
    let idField = "";
    if(props.category.id) {
        idField = <Grid item xs={12} sm={12}>
                    <TextField
                        id="id"
                        label="Id"
                        fullWidth
                        disabled
                        value={props.fetched && props.category.id ? props.category.id : ''}

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
                            label="Tên loại sản phẩm"
                            fullWidth
                            value={props.fetched && props.category.name ? props.category.name : ''}
                            onChange={(e) => props.handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Loại sản phẩm cha</InputLabel>
                            <Select
                                labelid="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.fetched &&  props.category.parent_id ? props.category.parent_id : ''}
                                name="parent_id"
                                onChange={(e) => props.handleChange(e)}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {props.categorySelectList.map(prop => {
                                    if(prop.id != props.category.id){
                                        return (
                                            <MenuItem value={prop.id} key={prop.id} >{prop.name}</MenuItem>
                                        )
                                    }
                                })}
                            </Select>
                        </FormControl>
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