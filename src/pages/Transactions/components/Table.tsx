import React, { forwardRef } from "react";
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
import ViewColumn from "@material-ui/icons/ViewColumn";
import Delete from "@material-ui/icons/Delete";
import Save from "@material-ui/icons/Save";
import MaterialTable from "material-table";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { TransactionData } from "interfaces/pages/Transaction";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "interfaces/redux/store";
import moment from "moment";

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
  openTransactionForm: () => void;
  onSelect: (member: TransactionData) => void;
  // onDelete: (uuid: string) => void;
  isLoading: boolean;
}

const Table = ({
  data,
  openTransactionForm,
  onSelect,
  // onDelete,
  isLoading,
}: TableProps) => {
  const role = useSelector<RootState>((state) => state.profile.role) as {
    name: string;
    code: string;
    uuid: string;
  } | null;

  return (
    <MaterialTable
      style={{ width: "100%" }}
      icons={tableIcons}
      isLoading={isLoading}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Typography
            style={{ fontSize: 22, fontWeight: "bold", marginRight: 20 }}
          >
            List of Transactions
          </Typography>
          <Button
            style={{ color: "white" }}
            variant="contained"
            color="primary"
            onClick={openTransactionForm}
          >
            Add Transactions
          </Button>
        </div>
      }
      columns={[
        { title: "Refrence payment ID", field: "reference_id" },

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
            return <Typography>{pay_type.name}</Typography>;
          },
        },

        {
          title: "Payment Method",
          field: "payment_method.name",
          render: ({ payment_method }) => {
            return <Typography>{payment_method.name}</Typography>;
          },
        },
        {
          title: "Package",
          field: "package.name",
          render: (rowData) => {
            return <Typography>{rowData.package.name}</Typography>;
          },
        },
        {
          title: "Paid Amount",
          field: "package.amount",
          render: (rowData) => {
            return <Typography>{rowData.package.amount}</Typography>;
          },
        },

        {
          title: "Payment Status",
          field: "payment_status",
          render: ({ payment_status }) => {
            return <Typography>{payment_status?.toUpperCase()}</Typography>;
          },
        },
        {
          title: "Recipts ",
          field: "attachment",

          render: ({ attachment }) => {
            return attachment === null ? (
              "No Recipt"
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
      data={data}
      actions={
        role?.code === "acc" || role?.code === "agent"
          ? []
          : [
              (rowData) => ({
                icon: () => <Edit />,
                tooltip:
                  rowData.payment_status === "confirmed"
                    ? "Can not edit confirmed payments"
                    : "Edit Transaction",
                onClick:
                  rowData.payment_status === "confirmed"
                    ? () => console.log()
                    : () => onSelect(rowData),
              }),
            ]
      }
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
      }}
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
  );
};

export { Table };
