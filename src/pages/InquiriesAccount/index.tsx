import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { InquiryData } from "interfaces/pages/Inquiries";
import { RootState } from "interfaces/redux/store";
import { Table } from "pages/InquiriesAccount/components";
import { useSelector } from "react-redux";

const InquiriesAccount = () => {
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
  const [count, setCount] = useState<number>(0);
  const getInquiries = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("inquiries/", {
        params: {
          role: role?.code,
          param: "accounts",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setInquiries(data?.results);
      setCount(data?.count);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeManagerAssigning = async (
    type: string,
    uuid: string,
    status: boolean
  ) => {
    try {
      setMessage("Changing Department Inquiry");
      setIsMessageVisible(true);
      await axios.post(
        "/change-type/",
        {
          uuid,
          type,
          status,
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

  useEffect(() => {
    getInquiries();
  }, []);

  return (
    <React.Fragment>
      <Table
        count={count}
        data={inquiries}
        isLoading={isLoading}
        onChangeManagerAssigning={onChangeManagerAssigning}
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

export { InquiriesAccount };
