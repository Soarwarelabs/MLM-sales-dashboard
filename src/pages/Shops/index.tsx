import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
  ShopData,
  PaymentStatus,
  ShopUpdateData,
} from "interfaces/pages/Shops";
import { RootState } from "interfaces/redux/store";
import { Table } from "pages/Shops/components";
import { useSelector } from "react-redux";
import { FilteredTransactions } from "interfaces/pages/Transaction";

const Shops = () => {
  const [shops, setShops] = useState<ShopData[]>([]);
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
  const handlePaymentStatusChange = async (
    newStatus: PaymentStatus,
    uuid: string
  ) => {
    try {
      setMessage("Changing Payment Status");
      setIsMessageVisible(true);
      await axios.post(
        "change-payment/",
        {
          status: newStatus,
          uuid,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setShops([
        ...shops.map((shop) => {
          if (shop.uuid === uuid) {
            return {
              ...shop,
              payment_status: newStatus,
            };
          } else {
            return shop;
          }
        }),
      ]);
      setMessage("Success");
      setIsMessageVisible(true);
      getShops({
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
  const getShops = async ({
    shop_status,
    packages,
    paymentstatus,
    start_date,
    end_date,
    search_filter,
  }: FilteredTransactions) => {
    try {
      setIsLoading(true);

      const { data } = await axios.get("shops/", {
        params: {
          role: role?.code,
          shop_status,
          packages,
          paymentstatus,
          start_date,
          end_date,
          search_filter,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setShops(data?.results);
      setCount(data?.count);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateShop = async (shop_uuid: string, updatedData: ShopUpdateData) => {
    try {
      setMessage("Updating");
      setIsMessageVisible(true);
      await axios.put(
        "update-shop/",
        {
          shop_uuid,
          ...updatedData,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setShops([
        ...shops.map((shop) => {
          if (shop.uuid === shop_uuid) {
            return {
              ...shop,
              name: updatedData.name,
              address: updatedData.address,
              phone: updatedData.phone,
              shop_owner: {
                ...shop.shop_owner,
                name: updatedData.owner_name,
              },
            };
          } else {
            return shop;
          }
        }),
      ]);
      setMessage("Success");
      setIsMessageVisible(true);
    } catch (error) {
      console.log(error);
      setMessage("Error Occured");
      setIsMessageVisible(true);
    }
  };

  const addTransaction = async (shop: ShopData) => {
    try {
      setMessage("Changing Trasaction Info");
      setIsMessageVisible(true);
      const attachment = shop.attachment;
      const method = shop.payment_method;
      const shop_uuid = shop.uuid;
      await axios.post(
        "/change-method/",
        {
          shop_uuid,
          attachment,
          method,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setMessage("Trasaction Info Changed Successfully");
      setIsMessageVisible(true);
    } catch (error) {
      setMessage("An Error Occured");
      setIsMessageVisible(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getShops({
      shop_status: "",
      packages: "",
      paymentstatus: "",
      start_date: "",
      end_date: "",
      search_filter: "",
    });
  }, []);

  return (
    <React.Fragment>
      <Table
        data={shops}
        count={count}
        onChangePaymentStatus={handlePaymentStatusChange}
        isLoading={isLoading}
        addTransaction={addTransaction}
        getFilteredShops={getShops}
        updateShop={updateShop}
        modifyShop={(_shop) => {
          setShops([
            ...shops.map((s) => {
              if (s.uuid === _shop.uuid) {
                return {
                  ..._shop,
                };
              } else {
                return s;
              }
            }),
          ]);
        }}
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

export { Shops };
