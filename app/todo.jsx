import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import Button from "../components/Button";
import { DropdownPicker } from "../components/Picker";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Low");
  const inputRef = useRef(null);
  const options = ["Low", "Medium", "High"];

  const addTask = () => {
    setTasks((prev) => [
      ...prev,
      { text: input, finished: false, priority: selectedPriority },
    ]);
    setInput("");
    setSelectedPriority(null);
    inputRef.current.clear();
  };

  const finishTask = (index) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, finished: !task.finished } : task,
      ),
    );
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View className="flex-1">
      <Text className="text-5xl text-center mt-5 pb-2 text-purple-500 font-bold">
        Todo
      </Text>
      <View>
        <Text className="text-center items-center">Enter things to dofds!</Text>
        <View className="flex-row items-center justify-center gap-2 w-4/5 self-center">
          <TextInput
            ref={inputRef}
            className="bg-white p-4 rounded-lg my-5 flex-1"
            placeholder="Add a task..."
            onChangeText={(text) => setInput(text)}
          />
          <Button
            title="Add task"
            onPress={addTask}
            color="primaryLight"
            disabled={!input.trim()}
          />
          <DropdownPicker
            value={selectedPriority}
            onValueChange={setSelectedPriority}
            options={options}
          />
        </View>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 8,
            }}
          >
            <Text
              style={
                item.finished ? { textDecorationLine: "line-through" } : null
              }
            >
              {item.text}
            </Text>
            <Button
              title="Finish task"
              onPress={() => finishTask(index)}
              color="primaryLight"
            />
            <Button
              title=""
              onPress={() => {
                deleteTask(index);
              }}
              icon={<Ionicons name="trash-outline" size={25} color="black" />}
              color="none"
            />
          </View>
        )}
      />
    </View>
  );
}
