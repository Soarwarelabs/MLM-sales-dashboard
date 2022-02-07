import React, { useState, useEffect } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Table, ShopTransactionForm } from "pages/Transactions/components";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  TransactionData,
  TransactionFormData,
} from "interfaces/pages/Transaction";
import { ShopData } from "interfaces/pages/Shops";
import { RootState } from "interfaces/redux/store";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";

interface Role {
  code: string;
  uuid: string;
  name: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const roles = useSelector<RootState>(
    (state) => state.dropdown.roles
  ) as Role[];
  const token = useSelector<RootState>((state) => state.auth.token);
  const [currentSelected, setCurrentSelected] =
    useState<TransactionData | null>(null);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreatingOrEditing, setIsCreatingOrEditing] =
    useState<boolean>(false);
  const location = useLocation();
  const shopData: any = location.state;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSelect = (transactions: TransactionData) => {
    setCurrentSelected(transactions);
    handleDrawerOpen();
  };

  const editTransactions = async (trancs: TransactionFormData) => {
    try {
      setMessage("Changing Trasaction Info");
      setIsMessageVisible(true);

      // const shop_uuid = trancs.shop_uuid
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
      await axios.put(
        "transaction/",
        {
          uuid: currentSelected?.uuid,
          shop_uuid: shopData.uuid,
          attachment,
          reference_id,
          paid_amount,
          package: packages,
          payment_method,
          payment_status,
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
      setMessage("Trasaction Info Changed Successfully");
      setIsMessageVisible(true);
      getTransactions();
      handleDrawerClose();
    } catch (error) {
      setMessage("An Error Occured");
      setIsMessageVisible(true);
      console.log(error);
    }
  };

  // const onDelete = async (uuid: string) => {
  //   try {
  //     setMessage("Deleting Agent");
  //     setIsMessageVisible(true);
  //     await axios.delete("members/", {
  //       data: {
  //         uuid,
  //       },
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     setMessage("Successfully Deleted");
  //     setIsMessageVisible(true);
  //     setAgents([
  //       ...agents.filter(({ uuid: agent_uuid }) => agent_uuid !== uuid),
  //     ]);
  //   } catch (error) {
  //     setMessage("Error Occured While Deleting");
  //     setIsMessageVisible(true);
  //   }
  // };

  const getTransactions = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "shop-transaction/",
        { shop_uuid: shopData.uuid },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setTransactions(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const addTransaction = async (trancs: TransactionFormData) => {
    try {
      setMessage("Changing Trasaction Info");
      setIsMessageVisible(true);

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
          shop_uuid: shopData.uuid,

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
      getTransactions();
      handleDrawerClose();
    } catch (error) {
      setMessage("An Error Occured");
      setIsMessageVisible(true);
      console.log(error);
    }
  };
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <Card style={{ width: "100%", padding: "15px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h3> {shopData?.name} Shop </h3>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Typography> Shop owner: </Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Typography> {shopData?.shop_owner?.name} </Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Typography> Contact Number: </Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Typography>{shopData?.phone}</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Typography>Email:</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Typography noWrap>{shopData?.email}</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Typography>Shop Satutus:</Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Typography>{shopData?.shop_status}</Typography>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Typography>Address:</Typography>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <Typography>{shopData?.address}</Typography>
          </Grid>
        </Grid>
      </Card>
      <Table
        data={transactions}
        onSelect={onSelect}
        // onDelete={onDelete}
        isLoading={isLoading}
        openTransactionForm={() => {
          setCurrentSelected(null);
          handleDrawerOpen();
        }}
      />
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <ShopTransactionForm
          initialValues={{
            pay_date: currentSelected?.pay_date,
            billing_date: currentSelected?.billing_date,
            attachment: "",

            reference_id: currentSelected?.reference_id,
            paid_amount: currentSelected?.package.amount,
            package: currentSelected?.package.uuid,
            payment_method: currentSelected?.payment_method.code,
            pay_type: currentSelected?.pay_type.code,
            purpose: currentSelected?.purpose,
            payment_status: currentSelected?.payment_status,
          }}
          // onSubmit={editTransactions}
          onSubmit={currentSelected ? editTransactions : addTransaction}
          editMode={currentSelected ? true : false}
          isCreatingOrEditing={isCreatingOrEditing}
        />
      </SwipeableDrawer>

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

export { Transactions };
