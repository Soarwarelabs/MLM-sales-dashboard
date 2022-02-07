import React, { forwardRef, useState, MouseEvent, useEffect } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Delete from "@material-ui/icons/Delete";
import Save from "@material-ui/icons/Save";
import MaterialTable from "material-table";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
// import ReceiptIcon from '@material-ui/icons/Receipt';
import AddIcon from "@material-ui/icons/Add";
import {
  ShopData,
  ShopUpdateData,
  TransactionData,
} from "interfaces/pages/Shops";
import { RootState } from "interfaces/redux/store";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import { ShopTransactionForm } from "./ShopsTransactionForm";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { useHistory } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import { TablePaginationActions } from "../../../components";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import FilterListIcon from "@material-ui/icons/FilterList";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { FilteredTransactions } from "interfaces/pages/Transaction";

const tableIcons: any = {
  Delete: forwardRef((props: any, ref) => <Delete {...props} ref={ref} />),
  Save: forwardRef((props: any, ref) => <Save {...props} ref={ref} />),
  Add: forwardRef((props: any, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props: any, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref) => <Clear {...props} ref={ref} />),
  // Delete: forwardRef((props:any, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props: any, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props: any, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props: any, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props: any, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props: any, ref) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props: any, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props: any, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props: any, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props: any, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props: any, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props: any, ref) => (
    <ArrowDownward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props: any, ref) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props: any, ref) => (
    <ViewColumn {...props} ref={ref} />
  )),
};

interface TableProps {
  data: ShopData[];
  onChangePaymentStatus: (newStatus: string, uuid: string) => void;
  isLoading: boolean;
  count: number;
  addTransaction: (shop: ShopData) => void;
  modifyShop: (shop: ShopData) => void;
  updateShop: (shop_uuid: string, updatedData: ShopUpdateData) => void;
  getFilteredShops: (data: FilteredTransactions) => void;
}

interface Plandata {
  amount: number;
  name: string;
  uuid: string;
}
const Table = ({
  data,
  onChangePaymentStatus,
  getFilteredShops,
  isLoading,
  count,
  modifyShop,
  updateShop,
}: TableProps) => {
  const classes = useStyles();
  const role = useSelector<RootState>((state) => state.profile.role) as {
    name: string;
    code: string;
    uuid: string;
  } | null;

  const [shopUuid, setShopUuid] = useState<string>("");
  const [shops, setShops] = useState<ShopData[]>(data);

  const [open, setOpen] = useState<boolean>(false);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const token = useSelector<RootState>((state) => state.auth.token);
  const [ispLoading, setPIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [plan, setPlan] = useState<Plandata>({
    name: "",
    amount: 0,
    uuid: "",
  });
  const history = useHistory();
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [pakageStatus, setPakageStatus] = useState<string>("");
  const [openModel, setOpenModel] = React.useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [filter, setFilter] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const toggle = () => setOpenModel(!openModel);
  const handleOpenModel = () => {
    setOpenDate(true);
    setOpenModel(true);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
    setOpenDate(false);
  };
  const handlePaymentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    // console.log(event.target.value, "my dataasss ");
    setPaymentStatus(event.target.value as string);
  };
  const handlePakageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPakageStatus(event.target.value as string);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
    {
      shop_status,
      packages,
      paymentstatus,
      start_date,
      end_date,
      search_filter,
    }: FilteredTransactions
  ) => {
    setPage(newPage);
    // getShops(newPage + 1)
  };

  const getShops = async (
    // page: number
    {
      shop_status,
      packages,
      paymentstatus,
      start_date,
      end_date,
      search_filter,
    }: FilteredTransactions
  ) => {
    try {
      setPIsLoading(true);
      const { data } = await axios.get("shops/", {
        params: {
          role: role?.code,
          // page: page,
          shop_status,
          packages,
          paymentstatus,
          start_date,
          end_date,
          search_filter,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setShops(data?.results);
      setFilter(true);
    } catch (error) {
      console.log(error);
    } finally {
      setPIsLoading(false);
    }
  };

  const addTransaction = async (trancs: TransactionData) => {
    try {
      setMessage("Changing Trasaction Info");
      setIsMessageVisible(true);

      const shop_uuid = trancs.shop_uuid;
      const attachment = trancs.attachment;

      const reference_id = trancs.reference_id;
      const paid_amount = trancs.paid_amount;
      const packages = trancs.package;
      const payment_method = trancs.payment_method;
      const pay_type = trancs.pay_type;
      const purpose = trancs.purpose;
      const billing_date = trancs.billing_date;
      const pay_date = trancs.pay_date;
      const payment_status = trancs.payment_status;
      await axios.post(
        "/transaction/",
        {
          shop_uuid,
          payment_status,
          attachment,
          reference_id,
          paid_amount,
          package: packages,
          payment_method,
          pay_type,
          purpose,
          billing_date,
          pay_date,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setMessage("Trasaction Info Added Successfully");
      setIsMessageVisible(true);

      handleDrawerClose();
    } catch (error) {
      setMessage("An Error Occured");
      setIsMessageVisible(true);
      console.log(error);
    }
  };
  // const [currentSelected, setCurrentSelected] = useState<AccountantData | null>(
  //   null
  // );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSelect = (shopData: ShopData) => {
    setShopUuid(shopData.uuid);
    setPlan(shopData.plan);
    handleDrawerOpen();
  };
  const applyFilterShops = () => {
    getFilteredShops({
      shop_status: "",
      packages: pakageStatus,
      paymentstatus: paymentStatus,
      start_date: startDate,
      end_date: endDate,
      search_filter: "true",
    });
  };

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <ShopTransactionForm
          initialValues={{
            uuid: "",
            shop_uuid: shopUuid,
            pay_date: new Date(),
            billing_date: new Date(),
            attachment: null,
            reference_id: 0,
            paid_amount: plan.amount,
            package: "",
            payment_method: "",
            pay_type: "",
            purpose: "",
            payment_status: "",
          }}
          //  onSubmit={currentSelected ? editTransaction : addTransaction}
          onSubmit={addTransaction}
          editMode={false}
          // isCreatingOrEditing={isCreatingOrEditing}
        />
      </SwipeableDrawer>
      <Typography
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginRight: 20,
          // margin: "10px",
          marginTop: 8,
          marginBottom: 15,
          // textAlign: "center",
        }}
      >
        Shop List
      </Typography>
      <MaterialTable
        isLoading={ispLoading}
        icons={tableIcons}
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              alignContent: "space-betweens",
              width: "100%",
            }}
          >
            {/* <div> */}
            {/* <Typography
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginRight: 20,
              // margin: "10px",
            }}
          >
            Transactions
          </Typography> */}
            {/* </div> */}
            {/* <div
            style={{
              display: "flex",
              alignItems: "left",
              flexDirection: "row",
              alignContent: "space-betweens",
              width: "100%",
            }}
          > */}
            <FormControl
              style={{
                flexDirection: "row",
                minWidth: 150,
                marginLeft: 10,
              }}
            >
              {/* <FilterListIcon />  */}
              <InputLabel id="demo-simple-select-label">
                Payment Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paymentStatus}
                onChange={handlePaymentChange}
                style={{ width: "100%" }}
              >
                <MenuItem value={"confirmed"}>Confirmed</MenuItem>
                <MenuItem value={"paid"}>Paid</MenuItem>
                <MenuItem value={"unPaid"}>UnPaid</MenuItem>
                <MenuItem value={"bounced"}>Bounced</MenuItem>
                <MenuItem value={"cancel"}>Cancel</MenuItem>
              </Select>
            </FormControl>
            <FilterListIcon />
            <FormControl
              style={{
                flexDirection: "row",
                minWidth: 150,
                marginLeft: 10,
              }}
            >
              {/* <FilterListIcon />  */}
              <InputLabel id="demo-simple-select-label">
                Package Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pakageStatus}
                onChange={handlePakageChange}
                style={{ width: "100%" }}
              >
                <MenuItem value={"57952675-65f5-4058-aee0-1f02945a430c"}>
                  Package 0
                </MenuItem>
                <MenuItem value={"02f77a67-e468-4c5c-8773-cab80710f8db"}>
                  Package 1
                </MenuItem>
                <MenuItem value={"5f8e97d6-99f3-4299-85a1-a72fda47f5e4"}>
                  Package 2
                </MenuItem>
                <MenuItem value={"cdd7aa76-3e20-48d1-a170-e3d963b76247"}>
                  Package 3
                </MenuItem>
              </Select>{" "}
            </FormControl>
            <FilterListIcon />{" "}
            <div
              style={{
                flexDirection: "row",
                minWidth: 150,
                marginLeft: 10,
                marginTop: 20,
              }}
            >
              <Button variant="outlined" onClick={handleOpenModel}>
                {startDate === "" && endDate === ""
                  ? "Select Date range:"
                  : `${startDate} - ${endDate}`}
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModel}
                onClose={handleCloseModel}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openModel}>
                  <div className={classes.paper}>
                    <DateRangePicker
                      open={openModel}
                      toggle={toggle}
                      onChange={(range) => {
                        console.log(range);
                        setStartDate(
                          moment(range.startDate).format("YYYY-MM-DD")
                        );
                        setEndDate(moment(range.endDate).format("YYYY-MM-DD"));
                        setOpenModel(false);
                        setOpen(false);
                      }}
                    />
                  </div>
                </Fade>
              </Modal>
            </div>
            <Button
              variant="contained"
              size="medium"
              style={{
                minWidth: 100,
                marginLeft: 10,
                marginTop: 20,
                backgroundColor: "#91c43e",
                color: "white",
                flex: "end",
              }}
              onClick={applyFilterShops}
            >
              Filter
            </Button>
            {/* </div> */}
          </div>
        }
        editable={{
          onRowUpdate: (newData) => {
            return new Promise((resolve, reject) => {
              updateShop(newData.uuid, {
                name: newData.name,
                phone: newData.phone,
                address: newData.address,
                owner_name: newData.shop_owner.name,
              });
              resolve("updated");
            });
          },
        }}
        columns={[
          { title: "Shop Name", field: "name", editable: "onUpdate" },
          { title: "Contact Number ", field: "phone", editable: "onUpdate" },
          {
            title: "Shop Owner",
            field: "shop_owner.name",
            editable: "onUpdate",
          },
          { title: "Address", field: "address", editable: "onUpdate" },

          { title: "Promo Code", field: "promo_code", editable: "never" },
          {
            title: "Plan",
            field: "plan.name",
            editable: "never",
            render: ({ plan }) => <Typography>{plan.name}</Typography>,
          },
          // {
          //   title: "Amount",
          //   field: "plan.amount",
          //   editable: "never",
          //   render: ({ plan }) => <Typography>{`Rs. ${plan.amount}`}</Typography>,
          // },
          // {
          //   title: "Payment Status",
          //   field: "payment_status",
          //   editable: "never",
          //   render: ({ payment_status, uuid }) => (
          //     <div>
          //       {payment_status.toLowerCase() !== "confirmed" ? (
          //         <Select
          //           value={payment_status}
          //           onChange={({ target }) =>
          //             onChangePaymentStatus(target.value as string, uuid)
          //           }
          //         >
          //           {payment_permissions.map((permission) => {
          //             return (

          //               <MenuItem key={permission} value={permission}>
          //                 {permission.toUpperCase()}
          //               </MenuItem>
          //             );
          //           })}
          //           {payment_status &&
          //             !payment_permissions.includes(payment_status) && (
          //               <MenuItem disabled value={payment_status}>
          //                 {payment_status.toUpperCase()}
          //               </MenuItem>
          //             )}
          //         </Select>
          //       ) : (
          //           <Typography>{payment_status.toUpperCase()}</Typography>
          //         )}
          //     </div>
          //   ),
          // },
          {
            title: "Activation Status",
            field: "shop_status",
            editable: "never",
            render: ({ shop_status }) => (
              <Typography>{shop_status.toUpperCase()}</Typography>
            ),
          },
          {
            title: "Created at ",
            field: "created_at",
            editable: "never",
            render: ({ created_at }) => {
              return (
                <Typography>
                  {moment(created_at).format("DD/MM/YYYY")}
                </Typography>
              );
            },
          },
        ]}
        // data={shops.length === 0 ? data : shops}
        data={data}
        actions={[
          (rowData) => ({
            icon: () => <AddIcon />,
            tooltip: "Add  Transaction",
            onClick: () => onSelect(rowData),
          }),
          (rowData) => ({
            icon: () => <VisibilityIcon />,
            tooltip: "Shops Transactions Details",
            onClick: () =>
              history.push({
                pathname: "/shops/transactions",

                state: rowData,
              }),
          }),
        ]}
        // components={{
        //   Pagination: props => (
        //     <TablePagination
        //       style={{ float: "right" }}
        //       rowsPerPageOptions={[10]}
        //       // colSpan={3}
        //       count={count}
        //       rowsPerPage={10}
        //       page={page}
        //       SelectProps={{
        //         inputProps: { 'aria-label': 'rows per page' },
        //         native: true,
        //       }}
        //       onChangePage={handleChangePage}
        //       // onChangeRowsPerPage={handleChangeRowsPerPage}
        //       ActionsComponent={TablePaginationActions}
        //     />
        //   ),
        // }}

        options={{
          actionsColumnIndex: -1,
          exportButton: true,
          // pageSize: 10
          pageSize: 20,
          pageSizeOptions: [20, 50, 100, 200],
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMessageVisible}
        onClose={() => setIsMessageVisible(false)}
        message={message}
        autoHideDuration={3000}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={() => setIsMessageVisible(false)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
};

export { Table };
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);
