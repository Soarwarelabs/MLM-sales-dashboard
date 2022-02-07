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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { ComplaintData } from "interfaces/pages/ComplaintRegistration";
import { RootState } from "interfaces/redux/store";
import moment from "moment";
import { useSelector } from "react-redux";
import { ManagerData } from "interfaces/pages/Managers";
import axios from "axios";
import { TextField } from "@material-ui/core";

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
  data: ComplaintData[];
  isLoading: boolean;
  // onChangeManagerAssigning: (member_uuid: string, inquiry_uuid: string) => void;
  onStatusChange: (status: string, uuid: string) => void;
}

const Table = ({
  data,
  isLoading,
  // onChangeManagerAssigning,
  onStatusChange,
}: TableProps) => {
  const token = useSelector<RootState>((state) => state.auth.token);
  const role = useSelector<RootState>((state) => state.profile.role) as {
    name: string;
    code: string;
    uuid: string;
  } | null;

  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState<string>("");
  const [type, setType] = useState<string>("");

  const [showInquiries, setShowInquiries] = useState<string>("all");
  const [complaintsData, setComplaintsData] = useState<ComplaintData[]>(data);
  const generalComplaints = data?.filter(
    (val) => val.shop === null && val.order === null
  );
  const shopComplaints = data?.filter(
    (val) => val.shop !== null && val.order !== null
  );

  // const getManagers = async () => {
  //   try {
  //     setIsFetchingManagers(true);
  //     const { data } = await axios.get("members", {
  //       params: {
  //         role: "manager",
  //       },
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     setManagers(data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsFetchingManagers(false);
  //   }
  // };

  useEffect(() => {}, []);

  return (
    <>
      <MaterialTable
        isLoading={isLoading}
        icons={tableIcons}
        style={{ minWidth: "100%" }}
        // placeholder="Select Manager"
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Typography
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginRight: 20,
                minWidth: "300px",
              }}
            >
              Complaints
            </Typography>
            <TextField
              select
              // defaultValue="Select Manager"
              placeholder="Select Manager"
              fullWidth
              value={showInquiries}
              onChange={({ target }) => {
                setShowInquiries(target.value as string);

                target.value === "shop"
                  ? setComplaintsData(shopComplaints as ComplaintData[])
                  : target.value === "website"
                  ? setComplaintsData(generalComplaints as ComplaintData[])
                  : setComplaintsData(data as ComplaintData[]);
              }}
            >
              <MenuItem value={"all"}>
                {" "}
                <Typography
                  style={{ fontSize: 18, fontWeight: "bold", marginRight: 20 }}
                >
                  All Complaints{" "}
                </Typography>
              </MenuItem>
              <MenuItem value={"shop"}>
                {" "}
                <Typography
                  style={{ fontSize: 18, fontWeight: "bold", marginRight: 20 }}
                >
                  Shop Complaints{" "}
                </Typography>
              </MenuItem>
              <MenuItem value={"website"}>
                {" "}
                <Typography
                  style={{ fontSize: 18, fontWeight: "bold", marginRight: 20 }}
                >
                  General Complaints{" "}
                </Typography>
              </MenuItem>
            </TextField>
          </div>
        }
        columns={
          showInquiries === "website"
            ? [
                {
                  title: "Complainer",
                  render: ({ user }) => {
                    return <Typography>{user.name}</Typography>;
                  },
                },
                {
                  title: "Phone Number",
                  render: ({ user }) => {
                    return <Typography>{user.number}</Typography>;
                  },
                },
                { title: "Subject", field: "subject" },
                { title: "Ticket Key", field: "ticket_key" },
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

                {
                  title: "Status",
                  field: "status",
                  render: ({ ticket_status, uuid }) => {
                    return (
                      <Select
                        style={{ minWidth: "100px" }}
                        value={ticket_status}
                        onChange={({ target }) =>
                          // onChangeManagerAssigning(target.value as string, uuid)
                          onStatusChange(target.value as string, uuid)
                        }
                      >
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="close">Closed</MenuItem>
                      </Select>
                    );
                  },
                },
              ]
            : [
                // {title:"Shop", field:"shop"},
                {
                  title: "Order key",

                  render: ({ order }) => {
                    return (
                      <Typography style={{ minWidth: "100px" }}>
                        {order?.order_key}
                      </Typography>
                    );
                  },
                },
                {
                  title: "Shop Name",

                  render: ({ shop }) => {
                    return (
                      <Typography style={{ minWidth: "100px" }}>
                        {shop?.name}
                      </Typography>
                    );
                  },
                },
                {
                  title: "Shop Number",

                  render: ({ shop }) => {
                    return <Typography>{shop?.number}</Typography>;
                  },
                },
                {
                  title: "Complainer",

                  render: ({ user }) => {
                    return (
                      <Typography style={{ minWidth: "100px" }}>
                        {user?.name}
                      </Typography>
                    );
                  },
                },
                {
                  title: "Phone Number",

                  render: ({ user }) => {
                    return <Typography>{user?.number}</Typography>;
                  },
                },
                {
                  title: "Subject",
                  render: ({ subject }) => {
                    return (
                      <Typography style={{ minWidth: "150px" }}>
                        {subject}
                      </Typography>
                    );
                  },
                },
                { title: "Ticket Key", field: "ticket_key" },
                {
                  title: "Date Time",
                  render: ({ created_at }) => {
                    return (
                      <Typography style={{ minWidth: "150px" }}>
                        {moment(created_at).format("MMM DD, YYYY [at] HH:mm")}
                      </Typography>
                    );
                  },
                },

                {
                  title: "Status",
                  field: "ticket_status",
                  render: ({ ticket_status, uuid }) => {
                    return (
                      <Select
                        style={{ minWidth: "100px" }}
                        value={ticket_status}
                        onChange={({ target }) =>
                          // onChangeManagerAssigning(target.value as string, uuid)
                          onStatusChange(target.value as string, uuid)
                        }
                      >
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="close">Closed</MenuItem>
                      </Select>
                    );
                  },
                },
              ]
        }
        data={complaintsData.length === 0 ? data : complaintsData}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
        }}
        detailPanel={(rowData) => {
          return (
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom>
                  {`Message:                  .   ${rowData?.ticket_id[0]?.description}`}
                </Typography>
              </CardContent>
            </Card>
          );
        }}
      />
      {/* <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure that this is irrelevent to you?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you change the Department of Inquirey, you are not able to get
            it back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "red" }}
            onClick={() => setOpen(false)}
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              onChangeDepartment(type, uuid, false);
              setTimeout(() => {
                setOpen(false);
              }, 1000);
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export { Table };
