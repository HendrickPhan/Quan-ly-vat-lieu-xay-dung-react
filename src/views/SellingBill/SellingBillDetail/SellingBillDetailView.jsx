import React from "react";
import { displayMessage } from '../../../components/Snackbar/SnackbarActions.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getUserRole} from '../../../routes/UserRoleStatic';

import {
  WAREHOUSE_STAFF,
  ADMIN,
  BUSINESS_STAFF,
  ASSISTANT,
  AGENCY_MANAGER,
} from '../../../routes/UserRoleStatic';


const billStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        width: '100%',
        overflowX: 'auto',
    },
    card: {
        maxWidth: 345,
        margin: theme.spacing(3, 2),
        boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.5)"
    },
    media: {
        height: 200,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        right: 0,
        width: 'calc(100% - 276px)'         
    },
    nextBtn: {
        width: 'fit-content',
        position: 'absolute',
        right: 0
    },
    button:{
        align_item: 'center'
    },
    table: {
    minWidth: 650,
    },
    full_size: {
      width: '100%',
      marginBottom: '10px'
    },
    color_red:{
        color: 'red'
    },
    right: {
      float: 'right'
    },
    left: {
      float: 'left'
    },
    bottom: {
      marginBottom: '10px'
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

export default function SellingBillDetailView(props) {
  console.log('staff', props);
    const classes = billStyles();
    const userRole = getUserRole();
    const tableOption = {
      actionsColumnIndex: 100,
      headerStyle: {
          textAlign: 'left'
      },
      actionsCellStyle: {
          width: 'fit-content'
      },
      pageSize: 5
    
    }
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    switch(userRole){
      default:
        return (
          <Paper className={classes.root}>
            <Grid item xs={12} sm={12}>
              <InputLabel>Thông tin Khách hàng</InputLabel>
              <TextField
                    disabled
                    className={ classes.full_size }
                    name="total_paid"
                    label="Tên Khách hàng"              
                    value={(props.customerName) ? props.customerName : ''}
              />
              <TextField
                  disabled
                  className={ classes.full_size }
                  name="total_paid"
                  label="SDT khách hàng"              
                  value={(props.customerPhone) ? props.customerPhone : ''}
              />
            </Grid>
            <InputLabel id="categories-select-label">Xác nhận hóa đơn</InputLabel>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell align="right">Tên sản phẩm</TableCell>
                  <TableCell align="right">Đơn vị tính</TableCell>
                  <TableCell align="right">Số lượng</TableCell>
                  <TableCell align="right">Đơn giá</TableCell>
                  <TableCell align="right">Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.sellingBillDetails.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.product.name}</TableCell>
                    <TableCell align="right">{row.product.unit}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.unit_price}</TableCell>
                    <TableCell align="right">{row.quantity * row.unit_price}</TableCell>
                  </TableRow>
                ))}
                 {/* <TableRow>
                    <TableCell component="th" scope="row">
                    </TableCell>
                    <TableCell align="right" className={classes.color_red}>Thuế VAT</TableCell>
                    <TableCell align="right">%</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">{ props.totalBill/110*100 }</TableCell>
                  </TableRow> */}
    
                  <TableRow>
                    <TableCell component="th" scope="row">
                    </TableCell>
                    <TableCell align="right" className={classes.color_red}>Tổng tiền</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right" className={classes.color_red}>{ props.totalBill }</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            <Grid item xs={12} sm={12}>
              <TextField
                  required
                  className={ classes.full_size }
                  name="total_paid"
                  label="Trả trước"
                  disabled
                  type="number"
                  inputProps={{ min: "0", max: props.totalBill }}
                  value={(props.totalPaid !== null) ? props.totalPaid : 0}
                  onChange={ (e) => props.handleTotalPaidChange(e) }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField 
                  className={classes.full_size }
                  disabled
                  name="total_paid"
                  label="Còn lại"
                  type="number"
                  value={ props.totalBill - props.totalPaid }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  size="small"
                  className={classes.button}
                  onClick = { (e) => props.redirect(e) }  
              >
              Quay lại
              </Button>
            </Grid>
          </Paper>
        );
        break;
      case WAREHOUSE_STAFF:
        return (
          <Paper className={classes.root}>
            <Grid item xs={12} sm={12}>
              <InputLabel>Thông tin Khách hàng</InputLabel>
              <TextField
                    disabled
                    className={ classes.full_size }
                    name="total_paid"
                    label="Tên Khách hàng"              
                    value={(props.customerName) ? props.customerName : ''}
              />
              <TextField
                  disabled
                  className={ classes.full_size }
                  name="total_paid"
                  label="SDT khách hàng"              
                  value={(props.customerPhone) ? props.customerPhone : ''}
              />
            </Grid>
            <InputLabel id="categories-select-label">Xác nhận hóa đơn</InputLabel>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell align="right">Tên sản phẩm</TableCell>
                  <TableCell align="right">Đơn vị tính</TableCell>
                  <TableCell align="right">Số lượng</TableCell>
                  <TableCell align="right">Đơn giá</TableCell>
                  <TableCell align="right">Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.sellingBillDetails.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.product.name}</TableCell>
                    <TableCell align="right">{row.product.unit}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.unit_price}</TableCell>
                    <TableCell align="right">{row.quantity * row.unit_price}</TableCell>
                  </TableRow>
                ))}
                 {/* <TableRow>
                    <TableCell component="th" scope="row">
                    </TableCell>
                    <TableCell align="right" className={classes.color_red}>Thuế VAT</TableCell>
                    <TableCell align="right">%</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">{ props.totalBill/110*100 }</TableCell>
                  </TableRow> */}
    
                  <TableRow>
                    <TableCell component="th" scope="row">
                    </TableCell>
                    <TableCell align="right" className={classes.color_red}>Tổng tiền</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right" className={classes.color_red}>{ props.totalBill }</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            <Grid item xs={12} sm={12}>
              <TextField
                  required
                  className={ classes.full_size }
                  name="total_paid"
                  label="Trả trước"
                  disabled
                  type="number"
                  inputProps={{ min: "0", max: props.totalBill }}
                  value={(props.totalPaid !== null) ? props.totalPaid : 0}
                  onChange={ (e) => props.handleTotalPaidChange(e) }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField 
                  className={classes.full_size }
                  disabled
                  name="total_paid"
                  label="Còn lại"
                  type="number"
                  value={ props.totalBill - props.totalPaid }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  size="small"
                  className={classes.button}
                  onClick = { (e) => props.redirect(e) }  
              >
              Quay lại
              </Button>
              <Button 
                  variant="contained"
                  color="primary"
                  //disabled={props.sellingBillDetails[0].status_confirm}
                  className={[classes.button, classes.right]}
                  onClick={(e) => props.handleSubmit(e, props.sellingBillDetails[0].selling_bill_id)}
                  type="button">
                  Xuất hàng
              </Button>
            </Grid>
          </Paper>
        );
        break;

      case BUSINESS_STAFF: 
        return (
          <Paper className={classes.root}>
            <Grid item xs={12} sm={12}>
              <InputLabel>Thông tin Khách hàng</InputLabel>
              <TextField
                    disabled
                    className={ classes.full_size }
                    name="total_paid"
                    label="Tên Khách hàng"              
                    value={(props.customerName) ? props.customerName : ''}
              />
              <TextField
                  disabled
                  className={ classes.full_size }
                  name="total_paid"
                  label="SDT khách hàng"              
                  value={(props.customerPhone) ? props.customerPhone : ''}
              />
            </Grid>
            <InputLabel id="categories-select-label">Xác nhận hóa đơn</InputLabel>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell align="right">Tên sản phẩm</TableCell>
                  <TableCell align="right">Đơn vị tính</TableCell>
                  <TableCell align="right">Số lượng</TableCell>
                  <TableCell align="right">Đơn giá</TableCell>
                  <TableCell align="right">Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.sellingBillDetails.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.product.name}</TableCell>
                    <TableCell align="right">{row.product.unit}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.unit_price}</TableCell>
                    <TableCell align="right">{row.quantity * row.unit_price}</TableCell>
                  </TableRow>
                ))}
              
                  <TableRow>
                    <TableCell component="th" scope="row">
                    </TableCell>
                    <TableCell align="right" className={classes.color_red}>Tổng tiền</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right" className={classes.color_red}>{ props.totalBill }</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            <Grid item xs={12} sm={12}>
              <TextField
                  required
                  className={ classes.full_size }
                  name="total_paid"
                  label="Trả trước"
                  disabled
                  type="number"
                  inputProps={{ min: "0", max: props.totalBill }}
                  value={(props.totalPaid !== null) ? props.totalPaid : 0}
                  onChange={ (e) => props.handleTotalPaidChange(e) }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField 
                  className={classes.full_size }
                  disabled
                  name="total_paid"
                  label="Còn lại"
                  type="number"
                  value={ props.totalBill - props.totalPaid }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MaterialTable
                    columns={[
                        { title: 'Mã chi tiết', field: 'id', type: 'numeric', cellStyle: { textAlign: 'left' } },
                        { title: 'Người khởi tạo', field: 'selling_bills.user.name', cellStyle: { textAlign: 'left' } },
                        { title: 'Số tiền', field: 'amount', cellStyle: { textAlign: 'left' } },
                        { title: 'Ngày thanh toán', field: 'created_at', cellStyle: { textAlign: 'left' } },
                    ]}
                    data={props.transactions || []}
                    title="Thông tin thanh toán"
                    options={tableOption}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  size="small"
                  className={classes.button}
                  onClick = { (e) => props.redirect(e) }  
              >
              Quay lại
              </Button>
              <Button 
                  variant="contained"
                  color="primary"
                  //disabled={props.sellingBillDetails[0].status_confirm}
                  className={[classes.button, classes.right]}
                 // onClick={(e) => props.handleSubmit(e, props.sellingBillDetails[0].selling_bill_id)}
                 onClick={handleOpen}
                  type="button">
                  Tạo hóa đơn
              </Button>
            </Grid>
          
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={handleClose}
            >
              <div className={classes.paper}>
                <h2 id="simple-modal-title">Thanh toán</h2>
                <form autoComplete="off" onSubmit={(e) => props.handleAddTransaction(e)}>
                  <input 
                    type="number" 
                    name ="amount" 
                    className={classes.bottom}>
                  </input>
                  <Grid xs={12} sm={12}>
                    <Button 
                        variant="contained"
                        color="primary"
                        //disabled={props.sellingBillDetails[0].status_confirm}
                        className={[classes.button, classes.right]}
                        type="submit">
                        Tạo hóa đơn
                    </Button>
                    <Button 
                        variant="contained"
                        color="primary"
                        //disabled={props.sellingBillDetails[0].status_confirm}
                        className={[classes.button, classes.left]}
                        onClick={handleClose}
                        type="button">
                        Thoát
                    </Button>
                  </Grid>
                </form>
              </div>
            </Modal>
          </Paper>
        ); 
        break;
    }
} 