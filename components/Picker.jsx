import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

export function DropdownPicker({ value, onValueChange, options }) {
  return (
    <View style={{ width: 120 }}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onValueChange(itemValue)}
      >
        {options.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}
