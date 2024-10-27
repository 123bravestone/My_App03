import { View, Text } from "react-native";
import React from "react";
import moment from "moment";
import { PieChart } from "react-native-gifted-charts";
import { Colors } from "../../../constants/index.js";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Home/Header.jsx";

const Expense_Graph = () => {
  var a = moment().format("YYYY-MM-DD");
  var given = moment("2024-09-02", "YYYY-MM-DD");
  var current = moment().startOf("day");

  const pieData = [
    {
      value: 47,
      color: Colors.tintColor,
      focused: true,
      text: "47%",
    },
    {
      value: 40,
      color: Colors.blue,
      text: "40%",
    },
    {
      value: 16,
      color: "#666",
      text: "26%",
    },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97", text: "3%" },
  ];
  var b = moment.duration(current.diff(given)).asDays();

  return (
    <SafeAreaView className="flex-1">
      <Header />

      <Text>{b}</Text>
      <Text>{a}</Text>

      <View style={{ paddingVertical: 20, alignItems: "center" }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          focusOnPress
          // semiCircle
          radius={140}
          innerRadius={80}
          innerCircleColor={Colors.white}
          centerLabelComponent={() => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  47%
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Expense_Graph;
