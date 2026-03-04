import { Text, TouchableOpacity } from "react-native";

const colorMap = {
  primary: "bg-[rgb(103,99,122)]",
  primaryLight: "bg-[rgb(182,152,206)]",
  primaryLighter: "bg-[rgb(237,233,254)]",
  primaryDark: "bg-[rgb(49,37,109)]",
};

export default function Button({ title, onPress, color = "purple" }) {
  console.log("color:", color, "resolved:", colorMap[color]);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${colorMap[color]} p-3 rounded-lg`}
    >
      <Text className="text-white text-center">{title}</Text>
    </TouchableOpacity>
  );
}
