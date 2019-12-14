import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination } from '@material-ui/core';
import MaterialTable, {MTableCell} from 'material-table';
import Fab from '@material-ui/core/Fab';
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
    card: {
        width: '100px'
    }
}));


export default function UserView(props) {
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
                <Tooltip title="Thêm khách hàng">
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
                        Cell: cellProps => {
                            let formatedValue = cellProps.value;
                          
                            if(cellProps.columnDef.additionType==="images"){
                                formatedValue = cellProps.value ? 
                                (
                                <Card className={classes.card}>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        width="100"
                                        image={process.env.REACT_APP_STORAGE_URL + cellProps.value}
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
                        { title: 'Ảnh', field: 'avatar', additionType: 'images', cellStyle: { textAlign: 'left', width: '100px' } },
                        { title: 'Tên nhân viên', field: 'name', cellStyle: { textAlign: 'left' } },
                        { title: 'Số điện thoại', field: 'phone', cellStyle: { textAlign: 'left' } },
                        { title: 'Email', field: 'email', cellStyle: { textAlign: 'left' } },
                        { title: 'Chức vụ', field: 'role_text', cellStyle: { textAlign: 'left' } },
                    ]}
                    data={props.users}
                    title="Nhân Viên"
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