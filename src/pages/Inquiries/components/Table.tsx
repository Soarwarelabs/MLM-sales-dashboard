import React, { forwardRef, useState, useEffect } from "react";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography";
import { InquiryData, InquiryType } from "interfaces/pages/Inquiries";
import { RootState } from "interfaces/redux/store";
import moment from "moment";
import { useSelector } from "react-redux";
import { ManagerData } from "interfaces/pages/Managers";
import axios from "axios";

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
  data: InquiryData[];
  isLoading: boolean;
  onChangeManagerAssigning: (member_uuid: string, inquiry_uuid: string) => void;
  onChangeDepartment: (member_uuid: string, inquiry_uuid: string) => void;
}

const Table = ({ data, isLoading, onChangeManagerAssigning, onChangeDepartment }: TableProps) => {
  const inquiry_types = useSelector<RootState>(
    (state) => state.dropdown.inquiry_types
  ) as InquiryType[];
  const token = useSelector<RootState>((state) => state.auth.token);
  const [managers, setManagers] = useState<ManagerData[]>([]);
  const [isFetchingManagers, setIsFetchingManagers] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState<string>("")
  const [type, setType] = useState<string>("")
  const getManagers = async () => {
    try {
      setIsFetchingManagers(true);
      const { data } = await axios.get("members", {
        params: {
          role: "manager",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setManagers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingManagers(false);
    }
  };

  useEffect(() => {
    getManagers();
  }, []);

  return (<>
    <MaterialTable
      isLoading={isLoading || isFetchingManagers}
      icons={tableIcons}
      style={{ width: "100%" }}
      title="Technical Inquiries"
      columns={[
        { title: "Complainer", field: "name" },
        { title: "Email", field: "email" },
        { title: "Phone Number", field: "number" },
        { title: "Message", field: "message" },
        {
          title: "Date Time",
          render: ({ created_at }) => {
            return (
              <Typography>
                {moment(created_at).format("MMM DD, YYYY [at] HH:mm")}
              </Typography>
            );
          },
        },
        // {
        //   title: "Type",
        //   field: "type",
        //   render: ({ type }) => (
        //     <Chip
        //       label={inquiry_types.find(({ code }) => code === type)?.name}
        //     />
        //   ),
        // },
        {
          title: "Assigned To",
          field: "assigned_to",
          render: ({ assigned_to, uuid }) => {
            return (
              <Select
                style={{ minWidth: "100px" }}
                // placeholder="Select Manager"
                value={assigned_to?.uuid}
                onChange={({ target }) =>
                  onChangeManagerAssigning(target.value as string, uuid)
                }
              >
                {managers.map((manager) => {
                  return (
                    <MenuItem value={manager.uuid}>{manager.name}</MenuItem>
                  );
                })}
              </Select>
            );
          },
        },
        {
          title: "Change Department ",
          field: "type",
          render: ({ type, uuid }) => {
            return (
              <Select
                style={{ minWidth: "100px" }}
                value={type}
                onChange={({ target }) =>
                // onChangeManagerAssigning(target.value as string, uuid)
                {
                  setUuid(uuid);
                  setType(target.value as string); setOpen(true);
                }
                }
              >

                <MenuItem value="registration">Registration</MenuItem>
                <MenuItem value="sales">Technical</MenuItem>
                <MenuItem value="accounts">Accounts</MenuItem>


              </Select>
            );
          },
        },
      ]}
      data={data}
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
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure that this is irrelevent to you?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">

          Once you change the Department of Inquirey, you are not able to get it back.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: "red" }} onClick={() => setOpen(false)} color="primary">
          No
          </Button>
        <Button onClick={() => {
          onChangeDepartment(type, uuid); setTimeout(() => {

            setOpen(false)
          }, 1000);
        }} color="primary" autoFocus >
          Yes

                            </Button>
      </DialogActions>
    </Dialog>
  </>
  );
};

export { Table };
