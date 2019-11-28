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
import Input from '@material-ui/core/Input';
import SaveIcon from '@material-ui/icons/Save';
import Chip from '@material-ui/core/Chip';

import Snackbar from "../../../components/Snackbar/Snackbar.js";
import ImageList from "../../../components/ImageList/ImageList.js";
// react-redux components
import { connect } from 'react-redux';
import { fetchProduct, fetchProductSelectList } from './ProductFormActions';
// react-router-doom components

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));


export default function ProductFormView(props) {
    const classes = useStyles();
    let idField = "";
    let imageButton = "";
    let imageDisplay = "";
    let imageList = "";
    let imagesName = "";
    for (var i = 0; i < props.product.images.length; i++) {
        if (i) {
            imagesName += '\n' + props.product.images[i].name
        }
        else {
            imagesName += props.product.images[i].name
        }
    }
    
    if (props.product.id) {
        idField = 
        <Grid item xs={12} sm={12}>
            <TextField
                id="id"
                label="Id"
                fullWidth
                disabled
                value={props.product.id && props.product.id ? props.product.id : ''}
            />
        </Grid>

        imageList = <ImageList 
                        images={props.product.fetchedImages}
                        handleImageRestoreClick={props.handleImageRestoreClick}
                        handleImageDeleteClick={props.handleImageDeleteClick}
                        deleteImages={props.deleteImages}
                    />
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
                            label="Tên sản phẩm"
                            fullWidth
                            value={props.product.name ? props.product.name : ''}
                            onChange={(e) => props.handleInputChange(e)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                            <Select
                                labelid="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.product.categories.map(category => category.id)}
                                name="categories"
                                onChange={props.handleCategorySelectChange}
                                fullWidth
                                multiple
                                input={<Input id="categories" />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                        {selected.map(value => (
                                            props.categorySelectList.map(category => {
                                                if (category.id === value) {
                                                    return (
                                                        <Chip key={value} label={category.name} className={classes.chip} />
                                                    )
                                                }
                                            })
                                        ))}
                                    </div>
                                )}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {props.categorySelectList.map(prop => {
                                    if (prop.id !== props.product.id) {
                                        return (
                                            <MenuItem value={prop.id} key={prop.id} >{prop.name}</MenuItem>
                                        )
                                    }
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="unit"
                            name="unit"
                            label="Đơn vị tính"
                            fullWidth
                            value={props.product.unit ? props.product.unit : ''}
                            onChange={(e) => props.handleInputChange(e)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="price"
                            name="price"
                            label="Giá"
                            fullWidth
                            type="number"
                            value={props.product.price ? props.product.price : ''}
                            onChange={(e) => props.handleInputChange(e)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="image-label">Hình ảnh</InputLabel>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {imageList}
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                        <input
                                type="file"
                                style={{ display: "none" }}
                                multiple
                                onChange={(e) => props.handleImagesChange(e)}
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={9}>
                        <TextField
                            readOnly
                            fullWidth
                            multiline
                            value={imagesName}
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