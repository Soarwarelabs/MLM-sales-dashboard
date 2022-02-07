/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { ManagerForm, Table } from "pages/Managers/components";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { useSelector } from "react-redux";
import { ManagerData, ManagerFormData } from "interfaces/pages/Managers";
import { RootState } from "interfaces/redux/store";

interface Role {
  code: string;
  uuid: string;
  name: string;
}

const Managers = () => {
  const [managers, setManagers] = useState<ManagerData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const roles = useSelector<RootState>(
    (state) => state.dropdown.roles
  ) as Role[];
  const token = useSelector<RootState>((state) => state.auth.token);
  const [currentSelected, setCurrentSelected] =
    useState<ManagerData | null>(null);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreatingOrEditing, setIsCreatingOrEditing] =
    useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSelect = (manager: ManagerData) => {
    setCurrentSelected(manager);
    handleDrawerOpen();
  };

  const editManager = async (managerData: ManagerFormData) => {
    try {
      setIsCreatingOrEditing(true);
      await axios.put(
        "members/",
        {
          uuid: currentSelected?.uuid,
          first_name: managerData.first_name,
          last_name: managerData.last_name,
          number: managerData.phone_number,
          email: managerData.email,
          area: managerData.area.map((a) => JSON.parse(a).uuid),
          cnic: managerData.cnic,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getManagers();
      handleDrawerClose();
      setMessage("Updated sucessfully");
      setIsMessageVisible(true);
    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.message);
      setIsMessageVisible(true);
    } finally {
      setIsCreatingOrEditing(false);
    }
  };
  const addManager = async (managerData: ManagerFormData) => {
    try {
      setIsCreatingOrEditing(true);
      await axios.post(
        "members/",
        {
          first_name: managerData.first_name,
          last_name: managerData.last_name,
          number: managerData.phone_number,
          email: managerData.email,
          area: managerData.area.map((a) => JSON.parse(a).uuid),
          cnic: managerData.cnic,
          role: roles.find(({ code }) => code === "manager")?.uuid,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getManagers();
      handleDrawerClose();
      setMessage("Manager added sucessfully.");
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
      setMessage("Deleting Manager");
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
      setManagers([
        ...managers.filter(({ uuid: manager_uuid }) => manager_uuid !== uuid),
      ]);
    } catch (error) {
      setMessage("Error Occured While Deleting");
      setIsMessageVisible(true);
    }
  };

  const getManagers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("members", {
        params: {
          role: "manager",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setManagers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getManagers();
  }, []);

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <ManagerForm
          initialValues={{
            first_name: currentSelected?.first_name || "",
            last_name: currentSelected?.last_name || "",
            email: currentSelected?.email || "",
            phone_number: currentSelected?.phone_number || "",
            cnic: currentSelected?.cnic || "",
            area: currentSelected?.area.map((a) => JSON.stringify(a)) || [],
            city: currentSelected?.city || null,
          }}
          onSubmit={currentSelected ? editManager : addManager}
          editMode={currentSelected ? true : false}
          isCreatingOrEditing={isCreatingOrEditing}
        />
      </SwipeableDrawer>
      <Table
        openAgentForm={() => {
          setCurrentSelected(null);
          handleDrawerOpen();
        }}
        data={managers}
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

export { Managers };
