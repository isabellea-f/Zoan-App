import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Timer() {
  const [number, onChangeNumber] = React.useState("45");

  return (
    <View className="flex-1 items-center justify-center">
      <TextInput
        value={number}
        onChangeText={onChangeNumber}
        inputMode="numeric"
        maxLength={3}
      />
      <Button
        title="+"
        onPress={() => onChangeNumber((prev) => (Number(prev) + 5).toString())}
      />
      <Button
        title="-"
        onPress={() => onChangeNumber((prev) => (Number(prev) - 5).toString())}
      />
      <Text>Second Screen</Text>
    </View>
  );
}
