import { useState, useEffect } from "react";
import firebase from "firebase/app";
import { env } from "@env";
import { useDispatch } from "react-redux";
import { setToken } from "@redux/actions/notification";

export const useNotificationRegisteration = (): boolean => {
  const isFCMSupported = firebase.messaging.isSupported();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getToken = async () => {
    try {
      //const messaging = firebase.messaging();
      //const token = await messaging.getToken({ vapidKey: env.VAPID_KEY });
      //await dispatch(setToken(token));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isFCMSupported) {
      getToken();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  return loading;
};
