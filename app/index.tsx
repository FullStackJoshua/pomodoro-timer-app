import { Text, View } from "react-native";
import Button from "@/components/Button";
import { useTimerContext } from "@/context/TimerProvider";
import Background from "@/components/Backgorund";

export default function HomeScreen() {
  const { isRunning, startTimer, pauseTimer, resetTimer, timeLeft, sessionType } =
    useTimerContext();

  return (
    <Background>
      <View className="flex-1 items-center justify-center">
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
      </View>
    </Background>
  );
}
