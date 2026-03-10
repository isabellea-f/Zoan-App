import React from "react";
import { Text, TextInput, Vibration, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomemadeButton from "../components/Button";
import "../global.css";

export default function Home() {
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
    return `${seconds}s `;
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
          <Text className="font-bold mb-5 font-mono bg-[rgb(182,152,206)] text-center text-8xl py-10">
            {formatTime(time)}
          </Text>

          <View className="flex-row gap-4 justify-center">
            {running ? (
              <HomemadeButton
                title="Pausa"
                color="primaryLight"
                onPress={() => setRunning(false)}
              />
            ) : (
              <HomemadeButton
                title="Dansa"
                color="primaryLight"
                onPress={() => setRunning(true)}
              />
            )}

            <HomemadeButton
              title="Gå tillbaka"
              color="primaryLight"
              onPress={() => setHasStarted(false)}
            />
          </View>
        </View>
      ) : (
        <View>
          <View className="flex-row items-center justify-center gap-2 relative">
            <View className="relative">
              <TextInput
                className="text-8xl w-60 h-60 p-2 pt-2 leading-[0] bg-[rgb(182,152,206)] bg-opacity-25 rounded-2xl text-center"
                value={number}
                onChangeText={(val) => {
                  const num = Number(val);
                  if (num >= 0) onChangeNumber(val);
                }}
                inputMode="numeric"
                maxLength={3}
              />
              <Text
                style={{
                  position: "absolute",
                  bottom: "12",
                  right: "94",
                  color: "inherit",
                }}
              >
                min
              </Text>
            </View>
            <View>
              <HomemadeButton
                title="+"
                color="primaryLight"
                onPress={() =>
                  onChangeNumber((prev) =>
                    prev <= 995 ? (Number(prev) + 5).toString() : "999",
                  )
                }
              />
              <HomemadeButton
                title="-"
                color="primaryLight"
                onPress={() =>
                  onChangeNumber((prev) =>
                    prev >= 5 ? (Number(prev) - 5).toString() : "0",
                  )
                }
              />
              <HomemadeButton
                title="dev"
                color="primaryLight"
                onPress={() => onChangeNumber((0.1).toString())}
              />
            </View>
          </View>
          <View className="flex-row justify-center">
            <HomemadeButton
              title="Starta"
              color="primary"
              onPress={handleStart}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
