import {
  View,
  Text,
  ListRenderItem,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
// import { ExpenseType } from "@/types";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../../constants/index.js";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import RNDateTimePicker from "@react-native-community/datetimepicker";

// const data = [
//   { label: "Housing", value: "1", color: "red" },
//   { label: "Food", value: "2", color: "blue" }, // { label: "Item 2", value: "2" },
//   { label: "Saving", value: "3", color: "green" }, // { label: "Item 3", value: "3" },
//   { label: "Miscleneous", value: "4", color: "yellow" }, // { label: "Item 4", value: "4" },
//   { label: "Gas Cylinder", value: "5", color: "purple" }, // { label: "Item 5", value: "5" },
//   { label: "Electricity Bill", value: "6", color: "orange" }, // { label: "Item 6", value: "6" },
//   { label: "Mobile Recharge", value: "7", color: "pink" }, // { label: "Item 7", value: "7" },
//   { label: "Library", value: "8", color: "blue" },
//   { label: "Coaching Class", value: "9", color: "orange" },
//   { label: "Metro", value: "10", color: "yellow" },
// ];
const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const ExpenseBlock = ({ expensList }) => {
  const [visible, setVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [value, setValue] = useState(null);
  // const [dateValue, setDateValue] = useState("");
  const [mthExpenses, setMthExpenses] = useState({
    amount: 0,
    dateValue: "",
    label_name: null,
  });

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setMthExpenses({
          ...mthExpenses,
          dateValue: moment(currentDate).format("DD MMM YYYY"),
        });
      }
    } else {
      toggleDatePicker();
    }
  };

  const handleExpenses = () => {
    console.log(mthExpenses);
    setMthExpenses("");
  };
  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <View style={styles.addBtn}>
            <Feather name="plus" size={24} color="white" />
            <Text style={{ color: "white", marginTop: 10, fontSize: 12 }}>
              Add Item
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    const amt = item.amount?.split(".");
    if (!amt) return null;

    return (
      <View
        style={[
          styles.expensesBlock,
          {
            backgroundColor:
              item.name === "Food"
                ? "#97e0f7"
                : item.name === "Saving"
                ? "#fcfcfc"
                : "#723feb",
          },
        ]}
      >
        <Text
          style={{
            fontSize: 14,
            color:
              item.name === "Food"
                ? "#1a1a1a"
                : item.name === "Saving"
                ? "#1a1a1a"
                : "#fcfcfc",
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            color:
              item.name === "Food"
                ? "#1a1a1a"
                : item.name === "Saving"
                ? "#1a1a1a"
                : "#fcfcfc",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          ₹{amt[0]}.
          <Text style={{ fontSize: 12, color: "#cccbcb" }}>{amt[1]}</Text>
        </Text>
        <Text
          style={{
            color:
              item.name === "Food"
                ? "#1a1a1a"
                : item.name === "Saving"
                ? "#1a1a1a"
                : "#fcfcfc",
            backgroundColor: "#f4d4fd33",
            paddingHorizontal: 5,
            paddingVertical: 3,
            borderRadius: 10,
            fontSize: 14,
          }}
        >
          {item.percentage}%
        </Text>
      </View>
    );
  };

  const staticItem = [{ name: "Add Item" }];

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={{ paddingVertical: 20 }}>
      <View className="flex-row justify-between items-center">
        <Text className="text-[14px] text-[#ffffff]">
          Monthly{" "}
          <Text className="text-[20px] font-baloo text-[#ffffff] ">
            Expenses
          </Text>
        </Text>
        <Text className="text-[20px] font-bold text-[#ffffff] ">
          ₹1588.
          <Text className="text-[14px] text-[#ffffff]">00</Text>
        </Text>
      </View>
      <FlatList
        data={staticItem.concat(expensList)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {isDatePickerVisible && (
        <RNDateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
          maximumDate={new Date()}
          minimumDate={new Date(2023, 0, 1)}
        />
      )}

      {visible && (
        <View className="flex-1 ">
          <Text className="text-[#ffffff] text-[24px] font-baloo my-[20px]">
            Add Spending
          </Text>

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            containerStyle={{
              borderRadius: 10,
            }}
            itemContainerStyle={{
              marginVertical: -8,
              // height: 10,
              // padding: "0",
              borderRadius: 10,
            }}
            placeholderStyle={styles.placeholderStyle}
            activeColor="#b9b9b9"
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select itemy" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              // setMthExpenses({ ...mthExpenses, label_name: item.label });
              setValue(item.label);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
          <View className="flex-1 flex-row justify-between my-[20px] ">
            <View className="flex-row items-center px-[10px] py-[10px] rounded-[10px] bg-white">
              <Text className="text-[#000000] text-[20px] font-bold">₹</Text>
              <TextInput
                className=" text-[18px]  text-[#545353] "
                placeholder="amount*"
                placeholderTextColor="#989898"
                keyboardType="numeric"
                value={mthExpenses.amount}
                onChangeText={(text) =>
                  setMthExpenses({ ...mthExpenses, amount: Math.floor(text) })
                }
              />
            </View>
            <Pressable
              onPress={toggleDatePicker}
              className="bg-white px-[20px] py-[10px] rounded-[10px] justify-center"
            >
              <Text
                className={`${
                  mthExpenses.dateValue ? "text-[#373737]" : "text-[#8e8d8d]"
                } text-[16px] `}
              >
                {mthExpenses.dateValue
                  ? mthExpenses.dateValue
                  : moment().format("DD-MM-YYYY")}
              </Text>
            </Pressable>
            <TouchableOpacity
              onPress={handleExpenses}
              className=" bg-blue-500 rounded-[10px] justify-center px-[20px]"
            >
              <Text className="text-[20px] font-baloo text-[#fefefe]">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExpenseBlock;

const styles = StyleSheet.create({
  expensesBlock: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.tintColor,
    marginRight: 15,
    width: 100,
    gap: 8,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  addBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#666",
    borderStyle: "dashed",
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    // padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
