import { Text, TouchableOpacity } from "react-native";

const colorMap = {
  primary: "bg-[rgb(103,99,122)]",
  primaryLight: "bg-[rgb(182,152,206)]",
  primaryLighter: "bg-[rgb(237,233,254)]",
  primaryDark: "bg-[rgb(49,37,109)]",
  none: "none",
};

export default function Button({
  title,
  onPress,
  icon,
  color = "purple",
  disabled = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${colorMap[color]} ${color === "none" ? "p-0" : "p-3"} rounded-lg flex-row items-center justify-center gap-2 ${disabled ? "opacity-50" : ""}`}
    >
      {icon}
      <Text className="text-white text-center">{title}</Text>
    </TouchableOpacity>
  );
}
