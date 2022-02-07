import React, { useState, useEffect } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { AccountantForm, Table } from "pages/Accountants/components";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  AccountantData,
  AccountantFormData,
} from "interfaces/pages/Accountants";
import { RootState } from "interfaces/redux/store";

interface Role {
  code: string;
  uuid: string;
  name: string;
}

const Accountants = () => {
  const [accountants, setAccountants] = useState<AccountantData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const roles = useSelector<RootState>(
    (state) => state.dropdown.roles
  ) as Role[];
  const token = useSelector<RootState>((state) => state.auth.token);
  const [currentSelected, setCurrentSelected] = useState<AccountantData | null>(
    null
  );
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreatingOrEditing, setIsCreatingOrEditing] = useState<boolean>(
    false
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSelect = (accountant: AccountantData) => {
    setCurrentSelected(accountant);
    handleDrawerOpen();
  };

  const editAccountant = async (accountantData: AccountantFormData) => {
    try {
      setIsCreatingOrEditing(true);
      await axios.put(
        "members/",
        {
          uuid: currentSelected?.uuid,
          first_name: accountantData.first_name,
          last_name: accountantData.last_name,
          number: accountantData.phone_number,
          email: accountantData.email,
          cnic: accountantData.cnic,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getAccountants();
      handleDrawerClose();
      setMessage("Updated successfully");
      setIsMessageVisible(true);
    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.message);
    } finally {
      setIsCreatingOrEditing(false);
    }
  };
  const addAccountant = async (accountantData: AccountantFormData) => {
    try {
      setIsCreatingOrEditing(true);
      await axios.post(
        "members/",
        {
          first_name: accountantData.first_name,
          last_name: accountantData.last_name,
          number: accountantData.phone_number,
          email: accountantData.email,
          area: accountantData.area.map((a) => JSON.parse(a).uuid),
          cnic: accountantData.cnic,
          role: roles.find(({ code }) => code === "acc")?.uuid,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getAccountants();
      handleDrawerClose();
      setMessage("Accountant added successfully");
      setIsMessageVisible(true);
    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.message);
      setIsMessageVisible(true);
    } finally {
      setIsCreatingOrEditing(false);
    }
  };

  const onDelete = async (uuid: string) => {
    try {
      setMessage("Deleting Accountant");
      setIsMessageVisible(true);
      await axios.delete("members/", {
        data: {
          uuid,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setMessage("Successfully Deleted");
      setIsMessageVisible(true);
      setAccountants([
        ...accountants.filter(
          ({ uuid: accountant_uuid }) => accountant_uuid !== uuid
        ),
      ]);
    } catch (error) {
      setMessage("Error Occured While Deleting");
      setIsMessageVisible(true);
    }
  };

  const getAccountants = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("members", {
        params: {
          role: "acc",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setAccountants(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAccountants();
  }, []);

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <AccountantForm
          initialValues={{
            first_name: currentSelected?.first_name || "",
            last_name: currentSelected?.last_name || "",
            email: currentSelected?.email || "",
            phone_number: currentSelected?.phone_number || "",
            cnic: currentSelected?.cnic || "",
            area: currentSelected?.area.map((a) => JSON.stringify(a)) || [],
            city: currentSelected?.city || null,
          }}
          onSubmit={currentSelected ? editAccountant : addAccountant}
          editMode={currentSelected ? true : false}
          isCreatingOrEditing={isCreatingOrEditing}
        />
      </SwipeableDrawer>
      <Table
        openAgentForm={() => {
          setCurrentSelected(null);
          handleDrawerOpen();
        }}
        data={accountants}
        onSelect={onSelect}
        onDelete={onDelete}
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

export { Accountants };
