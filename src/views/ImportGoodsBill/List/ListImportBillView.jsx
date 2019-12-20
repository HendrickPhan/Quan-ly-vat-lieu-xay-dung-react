import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination } from '@material-ui/core';
import MaterialTable from 'material-table';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {getUserRole} from '../../../routes/UserRoleStatic';
import {
    WAREHOUSE_STAFF,
    ADMIN,
    BUSINESS_STAFF,
    ASSISTANT,
    AGENCY_MANAGER,
  } from '../../../routes/UserRoleStatic';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

let flag = false;

var fixColumn = [
    { title: 'Mã hóa đơn', field: 'id', type: 'numeric', cellStyle: { textAlign: 'left' } },
    { title: 'Tên đối tác', field: 'name', cellStyle: { textAlign: 'left' } },
    { title: 'Ngày lập', field: 'created_at', cellStyle: { textAlign: 'left' } },
    { title: 'Tổng tiền', field: 'total_amount', cellStyle: { textAlign: 'left' } },    
    { title: 'Trạng thái hàng', field: 'status', cellStyle: { textAlign: 'left' } },
];

function createListAction(props){
    let result = 
    [
        {
            icon: VisibilityIcon,
            tooltip: 'Xem chi tiết',
            iconProps: {
                color: 'primary'
            },
            onClick: (event, rowData) => { props.viewDetailBill(rowData.id) }
        },
    ]
    return result;
}


export default function ImportBilliew(props) {
    const classes = useStyles();
    const userRole = getUserRole();
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

    switch(userRole){
        case AGENCY_MANAGER:
            return (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Tooltip title="Thêm hóa đơn nhập hàng">
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
                                            props.fetchSellingBills(page + 1, props.perPage)
                                        }}
                                        onChangeRowsPerPage={event => {
                                            props.changePerPage(event.target.value);
                                        }}
                                    />
                                ),
                            }}
                            columns={ fixColumn }
                            data={props.importBills}
                            title="Hóa đơn nhập hàng"
                            actions={ createListAction(props) }
                            options={tableOption}
                        />
                    </GridItem>
                </GridContainer>
            );
            break;
        default:
            return (
                <GridContainer>
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
                                            props.fetchSellingBills(page + 1, props.perPage)
                                        }}
                                        onChangeRowsPerPage={event => {
                                            props.changePerPage(event.target.value);
                                        }}
                                    />
                                ),
                            }}
                            columns={ fixColumn }
                            data={props.importBills}
                            title="Hóa đơn Nhập hàng"
                            actions={ createListAction(props) }
                            options={tableOption}
                        />
        
                    </GridItem>
                </GridContainer>
            );
            break;
    }

} 