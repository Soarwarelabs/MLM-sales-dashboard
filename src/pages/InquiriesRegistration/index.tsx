import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { InquiryData } from "interfaces/pages/RegistrationInquiries";
import { RootState } from "interfaces/redux/store";
import { Table } from "pages/InquiriesRegistration/components";
import { useSelector } from "react-redux";

const RegistrationInquiries = () => {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const role = useSelector<RootState>((state) => state.profile.role) as {
    name: string;
    code: string;
    uuid: string;
  } | null;
  const token = useSelector<RootState>((state) => state.auth.token);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [previous, setPrevious] = useState<string | null>("");
  const [next, setNext] = useState<string | null>("");
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getInquiries = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("inquiries/", {
        params: {
          role: role?.code,
          param: "registration",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("Data =>", data);
      setInquiries(data?.results);
      setCount(data?.count);
      setPrevious(data?.previous);
      setNext(data?.next);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeDepartment = async (
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
        count={count}
        next={next}
        previous={previous}
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

export { RegistrationInquiries };
