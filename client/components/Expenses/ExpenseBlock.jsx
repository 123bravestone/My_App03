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
import React, { useEffect, useState } from "react";
// import { ExpenseType } from "@/types";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../../constants/index.js";
import { useSelector, useDispatch } from "react-redux";
import { addAllExpenses } from "../../store/CreateSlices/UserSlice.js";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const data = [
  { label: "Housing", value: "1", color: "red" },
  { label: "Food", value: "2", color: "blue" }, // { label: "Item 2", value: "2" },
  { label: "Saving", value: "3", color: "green" }, // { label: "Item 3", value: "3" },
  { label: "Miscleneous", value: "4", color: "yellow" }, // { label: "Item 4", value: "4" },
  { label: "Gas Cylinder", value: "5", color: "purple" }, // { label: "Item 5", value: "5" },
  { label: "Electricity Bill", value: "6", color: "orange" }, // { label: "Item 6", value: "6" },
  { label: "Mobile Recharge", value: "7", color: "pink" }, // { label: "Item 7", value: "7" },
  { label: "Library", value: "8", color: "blue" },
  { label: "Coaching Class", value: "9", color: "orange" },
  { label: "Metro", value: "10", color: "yellow" },
  { label: "Stock Market", value: "11", icon: "gray" },
];

const ExpenseBlock = ({ expensList }) => {
  let amt = 0;
  const allExpenses = useSelector((state) => state.user.allExpenses);
  const dispatchEvent = useDispatch();
  const [visible, setVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mthExpenses, setMthExpenses] = useState({
    // id: moment().format("YYYYMMDDhhmmss"),
    id: "",
    amount: 0,
    name: "",
    value: "",
    color: "",
    dateValue: "",
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
    if (!mthExpenses.amount || !mthExpenses.name) {
      Alert.alert("Please enter all the fields");
      return;
    } else {
      dispatchEvent(addAllExpenses([mthExpenses, ...allExpenses]));
      setMthExpenses({
        ...mthExpenses,

        amount: 0,
        name: "",
        value: "",
      });
      setVisible(!visible);
    }
  };

  useEffect(() => {
    // console.log(allExpenses);
    // dispatchEvent(addAllExpenses([]));
    // const alf = (10 / amt) * 100;
    // console.log(parseFloat(alf).toFixed(2) + "%");
  }, []);
  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <View style={styles.addBtn}>
            <Feather name="plus" size={24} color="black" />
            <Text style={{ color: "black", marginTop: 10, fontSize: 12 }}>
              Add Item
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    // const amt = item.amount?.split(".");
    // if (!amt) return null;

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          Alert.alert(
            "Monthly Expense",
            `${item.name} / ₹${item.amount} created on ${item.dateValue}`,
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: () => {
                  Alert.alert("Delete", "Are you sure you want to delete?", [
                    {
                      text: "No",
                      style: "cancel",
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        dispatchEvent(
                          addAllExpenses(
                            allExpenses.filter(
                              (expense) => expense.id !== item.id
                            )
                          )
                        );
                      },
                    },
                  ]);
                },
              },
            ]
          );
        }}
        style={[
          styles.expensesBlock,
          {
            backgroundColor:
              item.name === "Food"
                ? "#97e0f7"
                : item.name === "Saving"
                ? "#c8fb99"
                : "#723feb",
          },
        ]}
        // className='bg-[#c8fb99] '
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
          {item.name.slice(0, 10)}
          {item.name.length > 10 ? ".." : null}
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
          {/* ₹{amt[0]}. */}₹{item.amount}.
          <Text style={{ fontSize: 12, color: "#000000" }}>
            {/* {amt[1]} */}
            00
          </Text>
        </Text>
        <Text
          style={{
            color:
              item.name === "Food"
                ? "#1a1a1a"
                : item.name === "Saving"
                ? "#1a1a1a"
                : "#000000",
            backgroundColor: "#ffffff",
            paddingHorizontal: 5,
            paddingVertical: 3,
            borderRadius: 10,
            fontSize: 14,
          }}
        >
          {(parseFloat(item.amount / amt) * 100).toFixed(2)}%
        </Text>
      </TouchableOpacity>
    );
  };

  const staticItem = [{ name: "Add Item" }];

  const renderLabel = () => {
    if (mthExpenses.value || isFocus) {
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
        <Text className="text-[14px] text-[#000000]">
          Monthly{" "}
          <Text className="text-[20px] font-baloo text-[#000000] ">
            Expenses
          </Text>
        </Text>
        {allExpenses.length > 0 &&
          allExpenses.map((expense) => {
            amt = amt + expense.amount;
          })}
        <Text className="text-[20px] font-bold text-[#686868] ">
          ₹{amt}.<Text className="text-[14px] text-[#686868]">00</Text>
        </Text>
      </View>
      <FlatList
        data={staticItem.concat(allExpenses)}
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
          <Text className="text-[#000000] text-[20px] font-baloo mt-[10px]">
            Add Month Expense
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
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={mthExpenses.value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setMthExpenses({
                ...mthExpenses,
                name: item.label,
                value: item.value,
                dateValue: moment().format("DD-MM-YYYY"),
                id: moment().format("YYYYMMDDhhmmss"),
              });

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
            <View className="flex-row items-center px-[10px] py-[10px] rounded-[10px] bg-[#e4e3e3]">
              <Text className="text-[#000000] text-[20px] font-bold">₹</Text>
              <TextInput
                className=" text-[18px]  text-[#414040] "
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
              className="bg-[#e4e3e3] px-[20px] py-[10px] rounded-[10px] justify-center"
            >
              <Text
                className={`${
                  mthExpenses.dateValue ? "text-[#373737]" : "text-[#414040]"
                } text-[16px] `}
              >
                {mthExpenses.dateValue
                  ? mthExpenses.dateValue
                  : moment().format("DD, MMM YYYY")}
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 8,

    borderRadius: 15,
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
