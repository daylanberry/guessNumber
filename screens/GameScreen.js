import React, { useState, useRef, useEffect } from 'react'

import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min + 1

  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return randomNum
  }
}

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
)

//for flatList
// const renderListItem = (listLength, itemData) => {
//   console.log(itemData)
//   return (
//   <View style={styles.listItem}>
//     <BodyText>#{listLength - itemData.index}</BodyText>
//     <BodyText>{itemData.item}</BodyText>
//   </View>
// )}

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 99, props.userChoice)
  const [currentGuess, setCurrentGuess ] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess])

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const {userChoice, onGameOver} = props

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length)
      return
    }
  }, [currentGuess, userChoice, onGameOver])


  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
      Alert.alert('dont lie to me', 'You know that this is wrong', [{text: 'Sorry!', style: 'cancel'}])
      return
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }
    const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)


    setCurrentGuess(nextNum)
    setPastGuesses((currPastGuesses) => [nextNum, ...currPastGuesses])
  }

  return (
    <View style={styles.screen} >
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton onClick={() => nextGuessHandler('lower')}>
            <Ionicons name='md-remove' size={24} color='white'/>
          </MainButton>
          <MainButton onClick={() => nextGuessHandler('greater')}>
          <Ionicons name='md-add' size={24} color='white'/>
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {
            pastGuesses.map((guess, i) => (
              renderListItem(guess, pastGuesses.length - i)
            ))
          }
        </ScrollView>

        {/* <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        /> */}
        </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    width: '80%',

  },
  list: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  }
})