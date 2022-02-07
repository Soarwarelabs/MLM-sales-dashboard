import React, { useState, useEffect } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {
  Table,
  ShopTransactionDetails,
} from "pages/AllTransactions/components";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  FilteredTransactions,
  TransactionData,
} from "interfaces/pages/Transaction";
import CloseIcon from "@material-ui/icons/Close";
import { RootState } from "interfaces/redux/store";

interface PayStatusType {
  newStatus: string;
  uuid: string;
}
const AllTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const token = useSelector<RootState>((state) => state.auth.token);
  const [currentSelected, setCurrentSelected] = useState<TransactionData | any>(
    null
  );
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSelect = (trans: TransactionData) => {
    setCurrentSelected(trans);
    handleDrawerOpen();
  };

  const handlePaymentStatusChange = async (data: PayStatusType) => {
    try {
      setMessage("Changing Payment Status");
      setIsMessageVisible(true);
      await axios.post(
        "change-payment/",
        {
          status: data.newStatus,
          uuid: data.uuid,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setMessage("Success");
      setIsMessageVisible(true);
      handleDrawerClose();
      getTransactions({
        shop_status: "",
        packages: "",
        paymentstatus: "",
        start_date: "",
        end_date: "",
        search_filter: "",
      });
    } catch (error) {
      setMessage("Unknown Error Occured");
      setIsMessageVisible(true);
    }
  };
  const getTransactions = async ({
    shop_status,
    packages,
    paymentstatus,
    start_date,
    end_date,
    search_filter,
  }: FilteredTransactions) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("transaction/", {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          shop_status,
          packages,
          paymentstatus,
          start_date,
          end_date,
          search_filter,
        },
      });
      setTransactions(data?.results);
      setCount(data?.count);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions({
      shop_status: "",
      packages: "",
      paymentstatus: "",
      start_date: "",
      end_date: "",
      search_filter: "",
    });
  }, []);

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <ShopTransactionDetails
          initialValues={currentSelected}
          //  onSubmit={currentSelected ? editTransaction : addTransaction}
          onSubmit={handlePaymentStatusChange}
          editMode={false}
          // isCreatingOrEditing={isCreatingOrEditing}
        />
      </SwipeableDrawer>
      <Table
        count={count}
        data={transactions}
        onSelect={onSelect}
        getFilteredTransactions={getTransactions}
        // onDelete={onDelete}
        // handlePaymentStatusChange={handlePaymentStatusChange}
        isLoading={isLoading}
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
    </>
  );
};

export { AllTransactions };
