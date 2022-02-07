import React, { forwardRef,useState } from "react";
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
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { AccountantData } from "interfaces/pages/Accountants";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  data: AccountantData[];
  openAgentForm: () => void;
  onSelect: (member: AccountantData) => void;
  onDelete: (uuid: string) => void;
  isLoading: boolean;
}

const Table = ({
  data,
  openAgentForm,
  onSelect,
  onDelete,
  isLoading,
}: TableProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string>("")
  return (
    <>
       <Dialog
                        open={open}
                        onClose={()=>setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                
                                Once you delete  it, all credentials and data will loss.
          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                    <Button style={{color:"red"}} onClick={() => setOpen(false)} color="primary">
                                No
          </Button>
                    <Button  onClick={() => { onDelete(uuid); setTimeout(() => {
                        
                    setOpen(false)}, 1000);}} color="primary" autoFocus >
                                Yes
                                
                            </Button>
                        </DialogActions>
                    </Dialog> 
    <MaterialTable
      isLoading={isLoading}
      style={{ width: "100%" }}
      icons={tableIcons}
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
            Accountants
          </Typography>
          <Button
            style={{ color: "white" }}
            variant="contained"
            color="primary"
            onClick={openAgentForm}
          >
            Add Accountant
          </Button>
        </div>
      }
      columns={[
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "CNIC", field: "cnic" },
        { title: "Contact Number", field: "phone_number" },
      ]}
      data={data}
      actions={[
        (rowData) => ({
          icon: () => <Edit />,
          tooltip: "Edit Accountant",
          onClick: () => onSelect(rowData),
        }),
        ({ uuid }) => ({
          icon: () => <Delete />,
          tooltip: "Delete Accountant",
          onClick: () => { setUuid(uuid); setOpen(true) },
        }),
      ]}
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
    /></>
  );
};

export { Table };
