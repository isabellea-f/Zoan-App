import { useRef, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Timer() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const addTask = () => {
    setTasks((prev) => [...prev, input]);
    setInput("");
    inputRef.current.clear();
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
        <Text className="text-center">Enter things to dofds!</Text>
        <View className="items-center">
          <TextInput
            ref={inputRef}
            className="bg-white p-4 rounded-lg my-5 w-4/5"
            placeholder="Add a task..."
            onChangeText={(text) => setInput(text)}
          />
          <TouchableOpacity
            onPress={addTask}
            style={{ backgroundColor: "#a855f7", padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Add task
            </Text>
          </TouchableOpacity>
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
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Text
                style={{
                  backgroundColor: "#a855f7",
                  padding: 12,
                  borderRadius: 8,
                  color: "white",
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
