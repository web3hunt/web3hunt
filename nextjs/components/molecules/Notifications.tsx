import { useState, useEffect } from "react";

export const Notifications = (props: { user: string }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://backend-kovan.epns.io/apis/feeds/get_feeds", {
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
        console.log(data);
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Notifications</p>;
  if (!data) return <p>No Notifications</p>;

  return <div>New Notifications</div>;
};
