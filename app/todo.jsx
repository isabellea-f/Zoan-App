import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/Button";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Low");
  const inputRef = useRef(null);

  // Priority
  const options = ["Low", "Medium", "High"];
  const priorityColor = { High: "red", Medium: "yellow", Low: "green" };

  const addTask = () => {
    setTasks((prev) => [
      ...prev,
      { text: input, finished: false, priority: selectedPriority },
    ]);
    setInput("");
    setSelectedPriority("Low");
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
    <View className="flex-1 bg-white">
      <Text className="text-3xl text-center mt-10 pb-10 text-purple-500 font-bold">
        Todo
      </Text>
      <View>
        <View className="w-4/5 self-center">
          <TextInput
            ref={inputRef}
            className="bg-gray-200 p-4 rounded-lg mb-4"
            placeholder="Add a task..."
            placeholderTextColor="#4B5563"
            onChangeText={(text) => setInput(text)}
          />

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setSelectedPriority(option)}
                className="py-1.5 px-3 rounded-full mt-2 justify-center"
                style={{
                  backgroundColor:
                    selectedPriority === option ? "rgb(103,99,122)" : undefined,
                }}
              >
                <Text
                  className={
                    selectedPriority === option ? "text-white" : "text-black"
                  }
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="w-2/5 self-center mt-10">
            <Button
              title="Add task"
              onPress={addTask}
              color="primaryLight"
              disabled={!input.trim()}
            />
          </View>
        </View>
      </View>

      <View className="p-8 rounded-lg">
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <View
              className="flex-row items-center justify-between py-2 px-3.5 my-2 mx-5 bg-gray-200 color-black rounded-xl shadow-sm"
              style={{
                borderLeftWidth: 6,
                borderLeftColor: priorityColor[item.priority],
              }}
            >
              <View className="flex-row items-center gap-2 flex-1">
                <TouchableOpacity
                  onPress={() => finishTask(index)}
                  style={{
                    padding: 6,
                  }}
                >
                  <Ionicons
                    name={
                      item.finished
                        ? "checkmark-circle"
                        : "checkmark-circle-outline"
                    }
                    size={24}
                    color={item.finished ? "green" : "black"}
                  />
                </TouchableOpacity>

                <Text
                  className="flex-shrink"
                  style={
                    item.finished
                      ? {
                          textDecorationLine: "line-through",
                        }
                      : null
                  }
                >
                  {item.text}
                </Text>
              </View>

              <Button
                onPress={() => deleteTask(index)}
                icon={<Ionicons name="trash-outline" size={25} color="black" />}
                color="none"
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}
