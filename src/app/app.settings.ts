import { ImageSourcePropType } from 'react-native';

export const API_URL = "http://172.30.104.235:8000/"
// process.env.EXPO_PUBLIC_API_URL
// "http://localhost:8000/api/v2/"
// "https://dishdash.ru";

export interface ImageFile {
  src: ImageSourcePropType;
}

export const avatars: ImageFile[] = [
  { src: require('./assets/avatars/0.png') },
  { src: require('./assets/avatars/1.png') },
  { src: require('./assets/avatars/2.png') },
  { src: require('./assets/avatars/3.png') },
  { src: require('./assets/avatars/4.png') },
  { src: require('./assets/avatars/5.png') },
  { src: require('./assets/avatars/6.png') },
  { src: require('./assets/avatars/7.png') },
  { src: require('./assets/avatars/8.png') },
  { src: require('./assets/avatars/9.png') },
  { src: require('./assets/avatars/10.png') },
  { src: require('./assets/avatars/11.png') },
];