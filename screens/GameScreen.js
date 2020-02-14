import React, { useState, useRef, useEffect } from 'react'

import { View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo'

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
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

  const initialGuess = generateRandomBetween(1, 99, props.userChoice)
  const [currentGuess, setCurrentGuess ] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess])
  const [ availableDeviceWidth, setAvailableDeviceWidth ] = useState(Dimensions.get('window').width)
  const [ availableDeviceHeight, setAvailableDeviceHeight ] = useState(Dimensions.get('window').height)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const {userChoice, onGameOver} = props

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width)
      setAvailableDeviceHeight(Dimensions.get('window').height)
    }

    Dimensions.addEventListener('change', updateLayout)

    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

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

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig
  }

  if (availableDeviceHeight < 500) {
    console.log('hi')
    return (
      <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onClick={() => nextGuessHandler('lower')}>
            <Ionicons name='md-remove' size={24} color='white'/>
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>

            <MainButton onClick={() => nextGuessHandler('greater')}>
            <Ionicons name='md-add' size={24} color='white'/>
            </MainButton>
        </View>

        <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {
            pastGuesses.map((guess, i) => (
              renderListItem(guess, pastGuesses.length - i)
            ))
          }
        </ScrollView>

        </View>
    </View>
    )
  } else {
    return (
      <View style={styles.screen}>
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
    marginTop: Dimensions.get('window').height > 600 ? 20: 10,
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    width: Dimensions.get('window').width > 330 ? '80%' : '90%'

  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center'
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