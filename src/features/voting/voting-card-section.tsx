import { VoteCard } from '@/entities/voting/vote-card';
import { useBottomInsets } from '@/shared/hooks/getBottomInsets';
import { ICard } from '@/shared/interfaces/card.interface'
import { CustomButton } from '@/shared/ui/custom-button';
import { Header } from '@/shared/ui/header';
import { ProgressBar } from '@/shared/ui/progress-bar-timer';
import React, { useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const cards: ICard[] = [
  {
    id: 1,
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
  // {
  //   id: 4,
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
  // {
  //   id: 5,
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
  //   id: 6,
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

interface IVoteCard {
  type: 'default' | 'active';
}

export const VotingCardSection = () => {
  const bottomInsets = useBottomInsets();
  const [categories, setCategories] = useState<IVoteCard[]>(
    Array.from({ length: cards.length }, () => ({ type: 'default' }))
  );

  const togglePlaceType = (index: number) => {
    const newCategories = Array.from({ length: cards.length }, (): IVoteCard => ({ type: 'default' }))
    newCategories[index].type = 'active';

    setCategories(newCategories);
  };

  const sendVote = () => {

  }

  return (
    <View className='h-full relative'>
      <Header>Голосование</Header>

      <ProgressBar duration={60} />

      <ScrollView
        className='h-max rounded-[18px]'
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          // columnGap: 8,
          rowGap: 8
        }} className='w-max flex-row justify-between flex-wrap'>
          {
            cards.map((value, index) => (
              <VoteCard
                type={categories[index].type}
                onPress={() => togglePlaceType(index)}
                key={index}
                card={{ ...value }}
              />
            ))
          }
        </View>
      </ScrollView>

      <CustomButton
        style={{
          width: '100%',
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
