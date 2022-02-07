import React, { useState, useEffect } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { AgentForm, Table } from "pages/Agents/components";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { useSelector } from "react-redux";
import { AgentData, AgentFormData } from "interfaces/pages/Agents";
import { RootState } from "interfaces/redux/store";

interface Role {
  code: string;
  uuid: string;
  name: string;
}

const Agents = () => {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const roles = useSelector<RootState>(
    (state) => state.dropdown.roles
  ) as Role[];
  const token = useSelector<RootState>((state) => state.auth.token);
  const [currentSelected, setCurrentSelected] =
    useState<AgentData | null>(null);
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

  const onSelect = (agent: AgentData) => {
    setCurrentSelected(agent);
    handleDrawerOpen();
  };

  const editAgent = async (agentData: AgentFormData) => {
    try {
      setIsCreatingOrEditing(true);
      await axios.put(
        "members/",
        {
          uuid: currentSelected?.uuid,
          first_name: agentData.first_name,
          last_name: agentData.last_name,
          number: agentData.phone_number,
          email: agentData.email,
          area: agentData.area.map((a) => JSON.parse(a).uuid),
          cnic: agentData.cnic,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getAgents();
      handleDrawerClose();
      setMessage("Updated Sucessfully");
      setIsMessageVisible(true);
    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.message);
      setIsMessageVisible(true);
    } finally {
      setIsCreatingOrEditing(false);
    }
  };
  const addAgent = async (agentData: AgentFormData) => {
    try {
      setIsCreatingOrEditing(true);
      await axios.post(
        "members/",
        {
          first_name: agentData.first_name,
          last_name: agentData.last_name,
          number: agentData.phone_number,
          email: agentData.email,
          area: agentData.area.map((a) => JSON.parse(a).uuid),
          cnic: agentData.cnic,
          role: roles.find(({ code }) => code === "agent")?.uuid,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getAgents();
      handleDrawerClose();
      setMessage("Agent added Sucessfully");
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
      setMessage("Deleting Agent");
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
      setAgents([
        ...agents.filter(({ uuid: agent_uuid }) => agent_uuid !== uuid),
      ]);
    } catch (error) {
      setMessage("Error Occured While Deleting");
      setIsMessageVisible(true);
    }
  };

  const getAgents = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("members", {
        params: {
          role: "agent",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setAgents(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAgents();
  }, []);

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <AgentForm
          initialValues={{
            first_name: currentSelected?.first_name || "",
            last_name: currentSelected?.last_name || "",
            email: currentSelected?.email || "",
            phone_number: currentSelected?.phone_number || "",
            cnic: currentSelected?.cnic || "",
            area: currentSelected?.area.map((a) => JSON.stringify(a)) || [],
            city: currentSelected?.city || null,
          }}
          onSubmit={currentSelected ? editAgent : addAgent}
          editMode={currentSelected ? true : false}
          isCreatingOrEditing={isCreatingOrEditing}
        />
      </SwipeableDrawer>
      <Table
        openAgentForm={() => {
          setCurrentSelected(null);
          handleDrawerOpen();
        }}
        data={agents}
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

export { Agents };
