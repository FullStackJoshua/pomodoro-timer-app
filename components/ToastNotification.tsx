import React from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#4CAF50", backgroundColor: "#333" }}
      text1Style={{ color: "#FFF" }}
      text2Style={{ color: "#DDD" }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#FF5733", backgroundColor: "#333" }}
      text1Style={{ color: "#FFF" }}
      text2Style={{ color: "#DDD" }}
    />
  ),
};

export default function ToastNotification() {
  return <Toast />;
}
