import React from "react";
import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "default" | "danger" | "success";
};

function Button({ title, onPress, variant = "default" }: ButtonProps) {
  const buttonStyles = {
    default: "bg-mix",
    danger: "bg-red-500",
    success: "bg-coffee",
  };
  return (
    <TouchableOpacity onPress={onPress} className={`px-4 py-2 rounded-md ${buttonStyles[variant]}`}>
      <Text className="text-cream">{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
