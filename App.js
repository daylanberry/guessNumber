import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, SafeAreaView } from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState(false)
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(err) => console.log(err)}/>
  }

  const startNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(false)
  }

  const startGameHandler = (number) => {
    setUserNumber(number)
    setGuessRounds(0)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }


  let content = <StartGameScreen onStartGame={startGameHandler}/>
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={startGameHandler}/>
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={'Guess a Number'}/>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
