import { Picker } from "@react-native-picker/picker";

export function DropdownPicker({ value, onValueChange, options }) {
  return (
    <>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onValueChange(itemValue)}
      >
        {options.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </>
  );
}
