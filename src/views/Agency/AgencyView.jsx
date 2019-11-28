import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination } from '@material-ui/core';
import MaterialTable from 'material-table';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));


export default function AgencyView(props) {
    const classes = useStyles();

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
                <Tooltip title="Thêm loại sản phẩm">
                    <Fab className={classes.button} color="primary" aria-label="add" onClick={() => props.onAddClickHandle()}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <MaterialTable
                    components={{
                        Pagination: pagimationProps => (
                            <TablePagination
                                {...pagimationProps}
                                rowsPerPageOptions={[1, 10, 20]}
                                rowsPerPage={props.perPage ? props.perPage : 0}
                                count={props.totalRows ? props.totalRows : 0}
                                page={props.currentPage - 1}
                                onChangePage={(e, page) => {
                                    props.fetchAgencies(page + 1, props.perPage)
                                }}
                                onChangeRowsPerPage={event => {
                                    props.changePerPage(event.target.value);
                                }}
                            />
                        ),
                    }}
                    columns={[
                        { title: 'Id', field: 'id', type: 'numeric', cellStyle: { textAlign: 'left' } },
                        { title: 'Tên đại lý', field: 'name', cellStyle: { textAlign: 'left' } },
                        { title: 'Địa chỉ', field: 'address', cellStyle: { textAlign: 'left' } },
                        { title: 'Số điện thoại', field: 'phone', cellStyle: { textAlign: 'left' } },
                    ]}
                    data={props.agencies}
                    title="Đại Lý"
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