import React from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Timer() {
  const [number, onChangeNumber] = React.useState("45");
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [hasStarted, setHasStarted] = React.useState(false);

  // useCallback(handleStart, [])

  function handleStart() {
    setRunning(true);
    setHasStarted(true);
    setTime(Number(number) * 60);
  }

  function formatTime(sec) {
    const hrs = Math.floor(sec / 3600);
    const min = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    if (hrs > 0)
      return `${hrs}:${min.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (min > 0) return `${min}:${seconds.toString().padStart(2, "0")}`;
    return `${seconds}s`;
  }

  React.useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setRunning(false);
          Vibration.vibrate(1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  return (
    <SafeAreaView>
      {hasStarted ? (
        <View>
          <Text className="font-bold text-purple-600 text-center text-6xl py-10">
            {formatTime(time)}
          </Text>
          <View className="flex-row gap-4 justify-center">
            <TouchableOpacity
              onPress={() => setRunning(true)}
              className="p-3 bg-purple-600 rounded-full"
            >
              <Text className="text-white font-bold text-xl">Dansa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setRunning(false)}
              className="p-3 bg-purple-600 rounded-full"
            >
              <Text className="text-white font-bold text-xl">Pausa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setHasStarted(false)}
              className="p-3 bg-purple-600 rounded-full"
            >
              <Text className="text-white font-bold text-xl">Gå tillbaka</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View className="flex-row items-center justify-center gap-2">
            <TextInput
              className="text-4xl w-20 p-2 bg-slate-500 bg-opacity-25 rounded-xl text-center"
              value={number}
              onChangeText={(val) => {
                const num = Number(val);
                if (num >= 0) onChangeNumber(val);
              }}
              inputMode="numeric"
              maxLength={3}
            />
            <View>
              <Button
                title="+"
                onPress={() =>
                  onChangeNumber((prev) =>
                    prev <= 995 ? (Number(prev) + 5).toString() : "999",
                  )
                }
              />
              <Button
                title="-"
                onPress={() =>
                  onChangeNumber((prev) =>
                    prev >= 5 ? (Number(prev) - 5).toString() : "0",
                  )
                }
              />
            </View>
          </View>
          <View className="flex-row justify-center">
            <Button title="Start" onPress={handleStart} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
