import { ToastAndroid } from "react-native";

export function showToastWithGravity(mensage: string) {
  ToastAndroid.showWithGravity(
    mensage,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
}