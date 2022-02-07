import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { InquiryData } from "interfaces/pages/Inquiries";
import { RootState } from "interfaces/redux/store";
import { Table } from "pages/Inquiries/components";
import { useSelector } from "react-redux";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const role = useSelector<RootState>((state) => state.profile.role) as {
    name: string;
    code: string;
    uuid: string;
  } | null;
  const token = useSelector<RootState>((state) => state.auth.token);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getInquiries = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("inquiries/", {
        params: {
          role: role?.code,
          param: "sales"
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });


      setInquiries(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onChangeDepartment = async (
    type: string,
    uuid: string
  ) => {
    try {
      setMessage("Changing Department Inquiry");
      setIsMessageVisible(true);
      await axios.post(
        "/change-type/",
        {
          uuid,
          type,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getInquiries();
      setMessage("Successfully Changed Department");
      setIsMessageVisible(true);
    } catch (error) {
      console.log(error);
      setMessage("Error Occured");
      setIsMessageVisible(true);
    }
  };
  const onChangeManagerAssigning = async (
    member_uuid: string,
    inquiry_uuid: string
  ) => {
    try {
      setMessage("Assigning Inquiry");
      setIsMessageVisible(true);
      await axios.post(
        "/assign/",
        {
          inquiry_uuid,
          member_uuid,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getInquiries();
      setMessage("Successfully Assigned");
      setIsMessageVisible(true);
    } catch (error) {
      console.log(error);
      setMessage("Error Occured");
      setIsMessageVisible(true);
    }
  };

  useEffect(() => {
    getInquiries();
  }, []);

  return (
    <React.Fragment>
      <Table
        data={inquiries}
        isLoading={isLoading}
        onChangeManagerAssigning={onChangeManagerAssigning}
        onChangeDepartment={onChangeDepartment}
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

export { Inquiries };
