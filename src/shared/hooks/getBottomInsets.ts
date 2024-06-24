import { useSafeAreaInsets } from "react-native-safe-area-context";

const bottomMargin = 8;

export const useBottomInsets = () => {
  const insets = useSafeAreaInsets();

  if (insets.bottom < bottomMargin) {
    return bottomMargin;
  }

  return insets.bottom
}