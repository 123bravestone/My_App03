import { View, Text, ScrollView, StatusBar, StyleSheet } from "react-native";

import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "../../../../store/CreateSlices/UserSlice.js";

import { Colors } from "../../../../constants/index.js";
import { PieChart } from "react-native-gifted-charts";

import ExpenseBlock from "../../../../components/Expenses/ExpenseBlock.jsx";
import ExpensList from "../../../../data/expenses.json";
import IncomeBlock from "../../../../components/Expenses/IncomeBlock.jsx";
import IncomeList from "../../../../data/income.json";
import SpendingBlock from "../../../../components/Expenses/SpendingBlock.jsx";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import Header from "../../../../components/Home/Header.jsx";
// import SpendingList from "../../../../data/spending.json";

const Expenses = () => {
  const { expensesAmount } = useSelector((state) => state.user);

  // useEffect(() => {
  //   console.log("allSpend", allSpends);
  //   dispatch(addAdmin(true));
  // }, []);
  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header />

      <View
        style={[
          styles.container,
          { backgroundColor: Colors.white, paddingTop: 10 },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View className="flex-1 items-center justify-center mt-4">
            <Text className="text-[24px] text-center">
              daily{" "}
              <Text className="text-[#686868] text-[28px] font-baloo">
                Expenses "{moment().format("MMM")}"
              </Text>
            </Text>
            <Text
              style={{
                color: "#686868",
                fontSize: 32,
                fontWeight: "700",
              }}
            >
              ₹{expensesAmount}.<Text style={{ fontSize: 22 }}>00</Text>
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="">
          <ExpenseBlock expensList={ExpensList} />
          <IncomeBlock incomeList={IncomeList} />
          <SpendingBlock />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
