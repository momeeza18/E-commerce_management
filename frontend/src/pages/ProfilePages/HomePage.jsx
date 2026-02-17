import React from "react";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <div>
      <h3>Welcome {user?.name}!</h3>
      <p>{user?.store?.name}</p>
    </div>
  );
};

export default HomePage;
