import { NavigationProps } from '@/app/navigation.interface';
import { VoteCard } from '@/entities/voting/vote-card';
import { useBottomInsets } from '@/shared/hooks/getBottomInsets';
import { ICard } from '@/shared/interfaces/card.interface'
import { CustomButton } from '@/shared/ui/custom-button';
import { Header } from '@/shared/ui/header';
import { ProgressBar } from '@/shared/ui/progress-bar-timer';
import { useResultCardStore } from '@/widgets/stores/result-card.store';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

const cards: ICard[] = [
  {
    id: 1,
    title: 'Вольчек 1',
    description: 'Lorem ipsum',
    shortDescription: 'Lorem ipsum',
    location: 'Петроградская 49',
    address: 'Петроградская 49',
    type: 'BAR',
    price: 900,
    image:
      'https://avatars.mds.yandex.net/i?id=334b3e7b14fc60313dd2da2c1925815b93b4ed80-12579803-images-thumbs&n=13',
  },
  {
    id: 2,
    title: 'Дворик 1',
    description: 'Lorem ipsum',
    shortDescription: 'Lorem ipsum',
    location: 'Петроградская 49',
    address: 'Петроградская 49',
    type: 'CAFE',
    price: 900,
    image:
      'https://avatars.mds.yandex.net/i?id=c875f729e9669aea8af1af136c58450f1a7872cb-9856874-images-thumbs&n=13',
  },
  {
    id: 3,
    title: 'Вольчек 1',
    description: 'Lorem ipsum',
    shortDescription: 'Lorem ipsum',
    location: 'Петроградская 49',
    address: 'Петроградская 49',
    type: 'CAFE',
    price: 900,
    image:
      'https://avatars.mds.yandex.net/i?id=334b3e7b14fc60313dd2da2c1925815b93b4ed80-12579803-images-thumbs&n=13',
  },
  {
    id: 4,
    title: 'Дворик 1',
    description: 'Lorem ipsum',
    shortDescription: 'Lorem ipsum',
    location: 'Петроградская 49',
    address: 'Петроградская 49',
    type: 'CAFE',
    price: 900,
    image:
      'https://avatars.mds.yandex.net/i?id=c875f729e9669aea8af1af136c58450f1a7872cb-9856874-images-thumbs&n=13',
  },
  {
    id: 5,
    title: 'Вольчек 1',
    description: 'Lorem ipsum',
    shortDescription: 'Lorem ipsum',
    location: 'Петроградская 49',
    address: 'Петроградская 49',
    type: 'CAFE',
    price: 900,
    image:
      'https://avatars.mds.yandex.net/i?id=334b3e7b14fc60313dd2da2c1925815b93b4ed80-12579803-images-thumbs&n=13',
  },
  {
    id: 6,
    title: 'Дворик 1',
    description: 'Lorem ipsum',
    shortDescription: 'Lorem ipsum',
    location: 'Петроградская 49',
    address: 'Петроградская 49',
    type: 'CAFE',
    price: 900,
    image:
      'https://avatars.mds.yandex.net/i?id=c875f729e9669aea8af1af136c58450f1a7872cb-9856874-images-thumbs&n=13',
  },
  // {
  //   id: 7,
  //   title: 'Вольчек 1',
  //   description: 'Lorem ipsum',
  //   shortDescription: 'Lorem ipsum',
  //   location: 'Петроградская 49',
  //   address: 'Петроградская 49',
  //   type: 'CAFE',
  //   price: 900,
  //   image:
  //     'https://avatars.mds.yandex.net/i?id=334b3e7b14fc60313dd2da2c1925815b93b4ed80-12579803-images-thumbs&n=13',
  // },
  // {
  //   id: 8,
  //   title: 'Дворик 1',
  //   description: 'Lorem ipsum',
  //   shortDescription: 'Lorem ipsum',
  //   location: 'Петроградская 49',
  //   address: 'Петроградская 49',
  //   type: 'CAFE',
  //   price: 900,
  //   image:
  //     'https://avatars.mds.yandex.net/i?id=c875f729e9669aea8af1af136c58450f1a7872cb-9856874-images-thumbs&n=13',
  // },
];

export const VotingCardSection = () => {
  const navigation = useNavigation<NavigationProps>();
  const bottomInsets = useBottomInsets();
  const { setResultCard } = useResultCardStore();
  const [indexOfSelectedCard, setIndexOfSelectedCard] = useState<number | null>(null);

  const sendVote = async () => {
    if (indexOfSelectedCard === null) {
      return;
    }

    setResultCard(cards[indexOfSelectedCard])
    console.info('navigate')
    navigation.navigate('result')
  }

  return (
    <View className='h-full items-center relative'>
      <Header>Голосование</Header>

      <View className='w-full'>
        <ProgressBar duration={60} />
      </View>

      <ScrollView>
        <View className='flex-row flex-wrap justify-between'>
          {
            cards.map((item, index) => (
              <VoteCard
                type={index === indexOfSelectedCard ? 'active' : 'default'}
                onPress={() => setIndexOfSelectedCard(index)}
                key={index}
                card={{ ...item }}
              />
            ))
          }
        </View>
      </ScrollView>

      <CustomButton
        style={{
          position: 'absolute',
          bottom: bottomInsets,
        }}
        type='primary'
        onPress={sendVote}
      >
        Выбрать
      </CustomButton>

    </View>
  )
}
