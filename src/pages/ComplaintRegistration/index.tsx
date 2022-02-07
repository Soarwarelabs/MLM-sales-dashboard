import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { ComplaintData } from "interfaces/pages/ComplaintRegistration";
import { RootState } from "interfaces/redux/store";
import { Table } from "pages/ComplaintRegistration/components";
import { useSelector } from "react-redux";

const ComplaintRegistration = () => {
  const [complaints, setComplaints] = useState<ComplaintData[]>([]);
  const role = useSelector<RootState>((state) => state.profile.role) as {
    name: string;
    code: string;
    uuid: string;
  } | null;
  const token = useSelector<RootState>((state) => state.auth.token);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getComplaints = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("complaints/", {
        // params: {
        //   role: role?.code,
        //   param: "registration"
        // },
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setComplaints(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onStatusChange = async (status: string, uuid: string) => {
    try {
      setMessage("Changing Compliants Status");
      setIsMessageVisible(true);
      await axios.post(
        "/complaints-status/",
        {
          uuid,
          status,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getComplaints();
      setMessage("Successfully Compliants Status");
      setIsMessageVisible(true);
    } catch (error) {
      console.log(error);
      setMessage("Error Occured");
      setIsMessageVisible(true);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <React.Fragment>
      <Table
        data={complaints}
        isLoading={isLoading}
        // onChangeManagerAssigning={onChangeManagerAssigning}
        onStatusChange={onStatusChange}
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
    </React.Fragment>
  );
};

export { ComplaintRegistration };
