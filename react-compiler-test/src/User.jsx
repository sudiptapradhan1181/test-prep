import React, { use } from "react";

export default function User() {
  const user = use(fetchUser());
  console.log(user);
  return <div>{user.name}</div>;
}

async function fetchUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  return await response.json();
}
