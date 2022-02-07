import React, { forwardRef, useState, useEffect, MouseEvent } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TextField from "@material-ui/core/TextField";
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
import Typography from "@material-ui/core/Typography";
import { InquiryData, InquiryType } from "interfaces/pages/Inquiries";
import { RootState } from "interfaces/redux/store";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import { ManagerData } from "interfaces/pages/Managers";
import TablePagination from "@material-ui/core/TablePagination";
import { TablePaginationActions } from "../../../components";

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
  count: number;
  onChangeManagerAssigning: (
    member_uuid: string,
    inquiry_uuid: string,
    status: boolean
  ) => void;
}

const Table = ({
  data,
  count,
  isLoading,
  onChangeManagerAssigning,
}: TableProps) => {
  const inquiry_types = useSelector<RootState>(
    (state) => state.dropdown.inquiry_types
  ) as InquiryType[];
  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState<string>("");
  const [type, setType] = useState<string>("");
  const token = useSelector<RootState>((state) => state.auth.token);
  const role = useSelector<RootState>((state) => state.profile.role) as {
    name: string;
    code: string;
    uuid: string;
  } | null;
  const [showInquiries, setShowInquiries] = useState<string>("all");
  const [inquiriesData, setInquriesData] = useState<InquiryData[]>(data);
  const websiteInquries = data?.filter((val) => val.shop === null);
  const shopInquiries = data?.filter((val) => val.shop !== null);

  const [ispLoading, setPIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // getInquiries(newPage + 1)
  };
  const getInquiries = async (page: number) => {
    try {
      setPIsLoading(true);
      const { data } = await axios.get("inquiries/", {
        params: {
          role: role?.code,
          param: "accounts",
          page: page,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setInquriesData(data?.results);
      // setCount(data?.count)
      // setPrevious(data?.previous)
      // setNext(data?.next)
    } catch (error) {
      console.log(error);
    } finally {
      setPIsLoading(false);
    }
  };
  // const token = useSelector<RootState>((state) => state.auth.token);
  // const [managers, setManagers] = useState<ManagerData[]>([]);
  // const [isFetchingManagers, setIsFetchingManagers] = useState<boolean>(true);

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

  // useEffect(() => {
  //   getManagers();
  // }, []);

  return (
    <>
      <MaterialTable
        isLoading={isLoading || ispLoading}
        icons={tableIcons}
        style={{ width: "100%" }}
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
              Accounts Inquiries
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
                  ? setInquriesData(shopInquiries as InquiryData[])
                  : target.value === "website"
                  ? setInquriesData(websiteInquries as InquiryData[])
                  : setInquriesData(data as InquiryData[]);
              }}
            >
              <MenuItem value={"all"}>
                {" "}
                <Typography
                  style={{ fontSize: 15, fontWeight: "bold", marginRight: 20 }}
                >
                  All Inquiries{" "}
                </Typography>
              </MenuItem>
              <MenuItem value={"shop"}>
                {" "}
                <Typography
                  style={{ fontSize: 15, fontWeight: "bold", marginRight: 20 }}
                >
                  Shop Inquiries{" "}
                </Typography>
              </MenuItem>
              <MenuItem value={"website"}>
                {" "}
                <Typography
                  style={{ fontSize: 15, fontWeight: "bold", marginRight: 20 }}
                >
                  Website Inquiries{" "}
                </Typography>
              </MenuItem>
            </TextField>
          </div>
        }
        columns={
          showInquiries === "website"
            ? [
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
                {
                  title: "Status",
                  field: "status",
                  render: ({ status, uuid }) => {
                    return (
                      <Select
                        style={{ minWidth: "100px" }}
                        value={status}
                        onChange={({ target }) =>
                          // onChangeManagerAssigning(target.value as string, uuid)
                          onChangeManagerAssigning(
                            target.value as string,
                            uuid,
                            true
                          )
                        }
                      >
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="close">Closed</MenuItem>
                      </Select>
                    );
                  },
                },
                // {
                //   title: "Type",
                //   field: "type",
                //   render: ({ type }) => (
                //     <Chip
                //       label={type}
                //     />
                //   ),
                // },
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
                            setType(target.value as string);
                            setOpen(true);
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
              ]
            : [
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
                {
                  title: "Status",
                  field: "status",
                  render: ({ status, uuid }) => {
                    return (
                      <Select
                        style={{ minWidth: "100px" }}
                        value={status}
                        onChange={({ target }) =>
                          // onChangeManagerAssigning(target.value as string, uuid)
                          onChangeManagerAssigning(
                            target.value as string,
                            uuid,
                            true
                          )
                        }
                      >
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="close">Closed</MenuItem>
                      </Select>
                    );
                  },
                },
                // {
                //   title: "Type",
                //   field: "type",
                //   render: ({ type }) => (
                //     <Chip
                //       label={type}
                //     />
                //   ),
                // },
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
                            setType(target.value as string);
                            setOpen(true);
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
              ]
        }
        data={inquiriesData.length === 0 ? data : inquiriesData}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
          // pageSize: 10
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
        //       onPageChange={handleChangePage}
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
      <Dialog
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
              onChangeManagerAssigning(type, uuid, false);
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
      </Dialog>
    </>
  );
};

export { Table };
