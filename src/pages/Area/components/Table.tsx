import React, { forwardRef, useState, MouseEvent } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import { useSelector } from "react-redux";
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
import { RootState } from "interfaces/redux/store";
import { AreaData } from "interfaces/pages/Area";
import axios from "axios";
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
  data: AreaData[];
  openAreaForm: () => void;
  onSelect: (area: AreaData) => void;
  onDelete: (uuid: string) => void;
  isLoading: boolean;
  count: number;
}

const Table = ({
  data,
  count,
  openAreaForm,
  onSelect,
  onDelete,
  isLoading,
}: TableProps) => {
  const [areas, setAreas] = useState<AreaData[]>(data);
  const token = useSelector<RootState>((state) => state.auth.token);

  const [ispLoading, setPIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // getAreas(newPage + 1)
  };
  const getAreas = async (page: number) => {
    try {
      setPIsLoading(true);
      const { data } = await axios.get("area/", {
        params: {
          page: page,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setAreas(data?.results);

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setPIsLoading(false);
    }
  };
  return (
    <MaterialTable
      style={{ width: "100%" }}
      icons={tableIcons}
      isLoading={isLoading || ispLoading}
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
            Areas
          </Typography>
          <Button
            style={{ color: "white" }}
            variant="contained"
            color="primary"
            onClick={openAreaForm}
          >
            Add Area
          </Button>
        </div>
      }
      columns={[
        { title: "Name", field: "name" },

        {
          title: "City",
          render: ({ city }) => (
            <>
              <Typography style={{ marginBottom: 5 }}>{city?.name}</Typography>
            </>
          ),
        },
      ]}
      data={areas.length === 0 ? data : areas}
      actions={[
        (rowData) => ({
          icon: () => <Edit />,
          tooltip: "Edit Area",
          onClick: () => onSelect(rowData),
        }),
        ({ uuid }) => ({
          icon: () => <Delete />,
          tooltip: "Delete Area",
          onClick: () => onDelete(uuid),
        }),
      ]}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
        pageSize: 20,
        pageSizeOptions: [20, 30, 50],
      }}
      //   components={{
      //     Pagination: props => (
      //       <TablePagination
      //         style={{ float: "right" }}
      //         rowsPerPageOptions={[10]}
      //         // colSpan={3}
      //         count={count}
      //         rowsPerPage={10}
      //         page={page}
      //         SelectProps={{
      //           inputProps: { 'aria-label': 'rows per page' },
      //           native: true,
      //         }}
      //         onPageChange={handleChangePage}
      //         // onChangeRowsPerPage={handleChangeRowsPerPage}
      //         ActionsComponent={TablePaginationActions}
      //       />
      //     ),
      //   }}
      // // detailPanel={(rowData) => {
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
