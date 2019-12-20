import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination, TableCell } from '@material-ui/core';
import MaterialTable, {MTableCell} from 'material-table';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));


export default function ProductView(props) {
    const classes = useStyles();
    console.log('virew', props);
    const tableOption = {
        actionsColumnIndex: 100,
        headerStyle: {
            textAlign: 'left'
        },
        actionsCellStyle: {
            width: 'fit-content'
        },
        pageSize: props.perPage ? props.perPage : 0

    }
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                {/* <Button
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        type="file"
                        style={{ display: "none" }}
                    />
                </Button> */}
                <Tooltip title="Thêm sản phẩm">
                    <Fab className={classes.button} color="primary" aria-label="add" onClick={() => props.onAddClickHandle()}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <MaterialTable
                    components={{
                        Pagination: paginationProps => (
                            <TablePagination
                                {...paginationProps}
                                rowsPerPageOptions={[1, 10, 20]}
                                rowsPerPage={props.perPage ? props.perPage : 0}
                                count={props.totalRows ? props.totalRows : 0}
                                page={props.currentPage - 1}
                                onChangePage={(e, page) => {
                                    props.fetchProducts(page + 1, props.perPage)
                                }}
                                onChangeRowsPerPage={event => {
                                    props.changePerPage(event.target.value);
                                }}
                            />
                        ),
                        Cell: cellProps => {
                            let formatedValue = cellProps.value;
                            if(cellProps.columnDef.additionType==="array"){
                                formatedValue = '';
                                cellProps.value.map((value, index) => {
                                    if(index) {
                                        formatedValue += ', ' + value.name; 
                                    }
                                    else {
                                        formatedValue += value.name;
                                    }
                                })
                            }
                            
                            if(cellProps.columnDef.additionType==="images"){
                                formatedValue = cellProps.value[0] ? 
                                (
                                <Card className={classes.card}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        width="200"
                                        image={process.env.REACT_APP_STORAGE_URL + cellProps.value[0].image}
                                    />
                                </Card>
                                ) : '';
                            }
                            
                            return (
                            <MTableCell 
                                {...cellProps}
                                value={formatedValue}
                            />
                            );
                        }
                    }}
                    columns={[
                        { title: 'Id', field: 'id', type: 'numeric', cellStyle: { textAlign: 'left' } },
                        { title: 'Tên sản phẩm', field: 'name', cellStyle: { textAlign: 'left' } },
                        { title: 'Hình ảnh', additionType: 'images', field: 'images', cellStyle: { textAlign: 'left' } },
                        { title: 'Loại sản phẩm', additionType: 'array', field: 'categories', cellStyle: { textAlign: 'left' } },
                        { title: 'Giá', field: 'price', cellStyle: { textAlign: 'left' } },
                        { title: 'Đơn vị tính', field: 'unit', cellStyle: { textAlign: 'left' } },
                    ]}
                    data={props.products}
                    title="Sản Phẩm"
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Chỉnh sửa',
                            iconProps: {
                                color: 'primary'
                            },
                            onClick: (event, rowData) => { props.onEditClickHandle(rowData.id) }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Xóa',
                            iconProps: {
                                color: 'secondary'
                            },
                            onClick: (event, rowData) => { props.onDeleteClickHandle(rowData.id) }
                        }
                    ]}
                    options={tableOption}
                />

            </GridItem>
        </GridContainer>
    );
} 