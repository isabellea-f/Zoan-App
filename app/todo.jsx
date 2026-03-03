import { FlatList, Text, TextInput, View } from "react-native";

export default function Timer() {
  return (
    <View className="flex-1">
      <Text className="text-5xl text-center mt-5 pb-2 text-purple-500 font-bold">
        Todo
      </Text>
      <View>
        <Text className="text-center">Enter things to do!</Text>
        <View className="flex-1 items-center">
          <TextInput
            className="bg-white p-4 rounded-lg my-5 w-4/5"
            placeholder="Add a task..."
          />
        </View>
      </View>
      <FlatList>{/* Scrollable list of tasks */}</FlatList>
    </View>
  );
}
