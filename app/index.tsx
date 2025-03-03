import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import { useTimerContext } from "@/context/TimerProvider";

export default function Index() {
  const { isRunning, startTimer, pauseTimer, resetTimer, timeLeft, sessionType } =
    useTimerContext();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-neutral-900">
      <Text className="text-2xl font-bold text-white">
        {sessionType === "work" && "🛠 Focus Mode"}
        {sessionType === "shortBreak" && "☕ Short Break"}
        {sessionType === "longBreak" && "🌿 Long Break"}
      </Text>

      <Text className="text-5xl font-bold text-white mt-2">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </Text>

      <Button
        title={isRunning ? "Pause" : "Start"}
        variant={isRunning ? "danger" : "success"}
        onPress={isRunning ? pauseTimer : startTimer}
      />

      <Button title="Reset" variant="default" onPress={resetTimer} />

      {/* <Button title="Settings" variant="default" onPress={() => router.push("/settings")} /> */}
    </View>
  );
}
