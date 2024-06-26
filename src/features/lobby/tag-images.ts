import { ImageSourcePropType } from "react-native";

export const tagImages: {
  title: string;
  src: ImageSourcePropType
}[] = [
  {
    title: 'coffee.png',
    src: require('./assets/coffee.png'),
  },
  {
    title: 'bar.png',
    src: require('./assets/bar.png'),
  },
  {
    title: 'cafe.png',
    src: require('./assets/cafe.png'),
  }
]