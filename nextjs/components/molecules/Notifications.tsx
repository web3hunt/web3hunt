import { useEffect, useState } from "react";
import { EPNS_NOTIFICATIONS } from "../../constants/api.const";
import { ToastContainer, toast } from "react-toastify";

export const Notifications = (props: { user?: string }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(EPNS_NOTIFICATIONS, {
      method: "POST",
      body: JSON.stringify({
        user: props.user,
        page: 1,
        pageSize: 10,
        op: "read",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const notifications = data.results.map((result: any) => {
          return {
            title: result.payload.notification.title,
            message: result.payload.notification.body,
          };
        });
        notifications.map((notification: any) => {
          toast(`${notification.title}: ${notification.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
        setData(notifications);
        setLoading(false);
      });
  }, []);

  return null;

  // if (!props.user) {
  //   return null;
  // }

  // if (!data) return <p>No Notifications</p>;

  // return <div>{(data as any[]).length} Notifications</div>;
};
