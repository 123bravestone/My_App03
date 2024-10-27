import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

const index = () => {
  const { token } = useSelector((state) => state.user);
  return <>{token ? <Redirect href="/home" /> : <Redirect href="/auth" />}</>;
};

export default index;
