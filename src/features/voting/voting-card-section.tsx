import { VoteCard } from '@/entities/voting/vote-card';
import { useBottomInsets } from '@/shared/hooks/getBottomInsets';
import { CustomButton } from '@/shared/ui/custom-button';
import { Header } from '@/shared/ui/header';
import { ProgressBar } from '@/shared/ui/progress-bar-timer';
import { useResultCardStore } from '@/app/stores/result-card.store';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFinalVoteStore } from '@/app/stores/final-vote.store';
import { useLobby } from '@/shared/hooks/useLobby';

export const VotingCardSection = () => {
  const bottomInsets = useBottomInsets();
  const { cards, votes } = useFinalVoteStore();
  const [indexOfSelectedCard, setIndexOfSelectedCard] = useState<number | null>(
    null
  );
  const { vote } = useLobby();

  const sendVote = async () => {
    if (indexOfSelectedCard === null) {
      return;
    }
    vote(-1, indexOfSelectedCard);
  };

  return (
    <View className='h-full items-center relative'>
      <Header>Голосование</Header>

      <View className='w-full'>
        <ProgressBar duration={60} />
      </View>

      <ScrollView>
        <View className='flex-row flex-wrap justify-between'>
          {cards.map((item, index) => (
            <VoteCard
              type={index === indexOfSelectedCard ? 'active' : 'default'}
              onPress={() => setIndexOfSelectedCard(index)}
              key={index}
              card={{ ...item }}
              voters={votes
                .filter((x) => x.voteOption == index)
                .flatMap((x) => x.user)}
            />
          ))}
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
  );
};
