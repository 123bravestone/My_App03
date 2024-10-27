import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      {/* <Stack.Screen name="get_started" options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="user_name"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
