import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  home: undefined;
  swipes: undefined;
  lobby: undefined;
  profile: undefined;
  voting: undefined;
  result: undefined;
  login: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;