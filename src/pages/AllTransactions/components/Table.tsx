import React, { forwardRef, useState, MouseEvent } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Delete from "@material-ui/icons/Delete";
import Save from "@material-ui/icons/Save";
import MaterialTable from "material-table";
import { useSelector } from "react-redux";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  FilteredTransactions,
  TransactionData,
} from "interfaces/pages/Transaction";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { RootState } from "interfaces/redux/store";
import moment from "moment";
import axios from "axios";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { DateRangePicker } from "materialui-daterange-picker";
import FilterListIcon from "@material-ui/icons/FilterList";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

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
  data: TransactionData[];
  onSelect: (member: TransactionData) => void;
  // onDelete: (uuid: string) => void;
  count: number;
  isLoading: boolean;
  getFilteredTransactions: (data: FilteredTransactions) => void;
}

const Table = ({
  data,
  // openAgentForm,
  count,
  onSelect,
  getFilteredTransactions,
  // onDelete,

  isLoading,
}: TableProps) => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState<TransactionData[]>(data);
  const [filteredTransactions, setFilteredTransactions] =
    useState<TransactionData[]>(data);
  const token = useSelector<RootState>((state) => state.auth.token);
  const [ispLoading, setPIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [pakageStatus, setPakageStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [openModel, setOpenModel] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const toggle = () => setOpenModel(!openModel);
  const openDateRanger = () => setOpenDate(!openDate);
  const handleOpenModel = () => {
    setOpen(true);
    setOpenModel(true);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
    setOpen(false);
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
  // const handleDateChange = (event: React.ChangeEvent<{ value: Date }>) => {
  //   setValue(event.target.value as Date);
  // };

  const role = useSelector<RootState>((state) => state.profile.role) as {
    name: string;
    code: string;
    uuid: string;
  } | null;
  // console.log("getFilteredTransactions", getFilteredTransactions);
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
    // getTransactions(newPage + 1)
  };
  const getTransactions = async (
    // page: number,
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
      const { data } = await axios.get("transaction/", {
        params: {
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
      setTransactions(data?.results);
      setFilter(true);
    } catch (error) {
      console.log(error);
    } finally {
      setPIsLoading(false);
    }
  };
  // useEffect(() => {
  //   getTransactions({
  //     shop_status: "",
  //     packages: pakageStatus,
  //     paymentstatus: paymentStatus,
  //     start_date: "",
  //     end_date: "",
  //     search_filter: "true",
  //   });
  // }, []);

  const applyFilterTransaction = () => {
    getFilteredTransactions({
      shop_status: "",
      packages: pakageStatus,
      paymentstatus: paymentStatus,
      start_date: startDate,
      end_date: endDate,
      search_filter: "true",
    });
  };

  return (
    <div style={{ backgroundColor: "white", height: "200px" }}>
      {" "}
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
        Transactions
      </Typography>
      <MaterialTable
        style={{ width: "100%", border: "none" }}
        icons={tableIcons}
        isLoading={isLoading || ispLoading}
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
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#91c43e",
                color: "white",
              }}
              onClick={applyFilterTransaction}
            >
              Filter
            </Button>
            {/* </div> */}
          </div>
        }
        columns={[
          { title: "Refrence ID", field: "reference_id" },

          {
            title: "Shop Name ",
            field: "shop.name",

            render: ({ shop }) => {
              return <Typography>{shop?.name}</Typography>;
            },
          },
          {
            title: "Billing Date ",
            field: "billing_date",

            render: ({ billing_date }) => {
              return (
                <Typography>
                  {moment(billing_date).format("DD/MM/YYYY")}
                </Typography>
              );
            },
          },
          {
            title: "Transaction  Date ",
            field: "pay_date",

            render: ({ pay_date }) => {
              return (
                <Typography>{moment(pay_date).format("DD/MM/YYYY")}</Typography>
              );
            },
          },
          {
            title: "Pay Type",
            field: "pay_type.name",
            render: ({ pay_type }) => {
              return <Typography>{pay_type?.name}</Typography>;
            },
          },

          {
            title: "Payment Method",
            field: "payment_method.name",
            render: ({ payment_method }) => {
              return <Typography>{payment_method?.name}</Typography>;
            },
          },
          {
            title: "Package",
            field: "package.name",
            render: (rowData) => {
              return <Typography>{rowData.package?.name}</Typography>;
            },
          },
          {
            title: "Paid Amount",
            field: "package.amount",
            render: (rowData) => {
              return <Typography>{rowData.package?.amount}</Typography>;
            },
          },

          {
            title: "Payment Status",
            field: "payment_status",
            editable: "never",
            render: ({ payment_status, uuid }) => (
              <div>
                <Typography>{payment_status?.toUpperCase()}</Typography>
                {/* {payment_status.toLowerCase() !== "confirmed" ? ( */}
                {/* <Select
                value={payment_status}
                onChange={({ target }) =>
                  handlePaymentStatusChange(target.value as string, uuid)
                }
              >
                {payment_permissions.map((permission) => {
                  return (

                    <MenuItem key={permission} value={permission}>
                      {permission.toUpperCase()}
                    </MenuItem>
                  );
                })}
                {payment_status &&
                  !payment_permissions.includes(payment_status) && (
                    <MenuItem disabled value={payment_status}>
                      {payment_status.toUpperCase()}
                    </MenuItem>
                  )}
              </Select> */}
                {/* ) : (
                  <Typography>{payment_status.toUpperCase()}</Typography>
                )} */}
              </div>
            ),
          },
          {
            title: "Recipts ",
            field: "attachment",

            render: ({ attachment }) => {
              return attachment === null || attachment === " " ? (
                " no recipt"
              ) : (
                <Link
                  to={{
                    pathname: attachment,
                  }}
                  target="_blank"
                >
                  <ReceiptIcon />
                </Link>
              );
            },
          },
        ]}
        // data={transactions.length === 0 ? data : filteredTransactions}
        data={data}
        actions={
          role?.code !== "macc"
            ? [
                (rowData) => ({
                  icon: () => <Edit />,
                  tooltip: "Change Payment Status ",
                  onClick: () => onSelect(rowData),
                }),
                //   ({ uuid }) => ({
                //     icon: () => <Delete />,
                //     tooltip: "Delete Agent",
                //     onClick: () => onDelete(uuid),
                //   }),
              ]
            : []
        }
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
          pageSize: 20,
          pageSizeOptions: [20, 50, 100, 200],
        }}

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
        // detailPanel={(rowData) => {
        //   return (
        //     <Card variant="outlined">
        //       <CardContent>
        //         <Typography variant="h5" gutterBottom>
        //           {rowData.shopname}
        //         </Typography>
        //         <div
        //           style={{
        //             display: "flex",
        //             flexDirection: "row",
        //           }}
        //         >
        //           {" "}
        //           <Typography style={{ width: "200px" }} component="h2">
        //             Last Paid date:
        //           </Typography>
        //           <Typography color="textSecondary" component="h2">
        //             {/* {" " + rowData.ownername} */}
        //             03/03/2020
        //           </Typography>
        //         </div>
        //         <div
        //           style={{
        //             display: "flex",
        //             flexDirection: "row",
        //           }}
        //         >
        //           <Typography style={{ width: "200px" }} component="h2">
        //             Last Amount Paid
        //           </Typography>
        //           <Typography color="textSecondary" component="h2">
        //             {/* {rowData.city} */}
        //             4000 PKR
        //           </Typography>
        //         </div>
        //         <div
        //           style={{
        //             display: "flex",
        //             flexDirection: "row",
        //           }}
        //         >
        //           <Typography style={{ width: "200px" }} component="h2">
        //             Package
        //           </Typography>
        //           <Typography color="textSecondary" component="h2">
        //             {/* {rowData.shopcontact} */}
        //             Golden
        //           </Typography>
        //         </div>
        //         <div
        //           style={{
        //             display: "flex",
        //             flexDirection: "row",
        //           }}
        //         >
        //           <Typography style={{ width: "200px" }} component="h2">
        //             Address:
        //           </Typography>
        //           <Typography color="textSecondary" component="h2">
        //             {/* {rowData.city} */}
        //             Shop No: 345, firdos Market, street 5, Modal town Lahore
        //           </Typography>
        //         </div>
        //       </CardContent>
        //     </Card>
        //   );
        // }}
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
