import React from 'react'

import { View, Text, StyleSheet, Button, Image } from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode='cover'
        />

      </View>
      <BodyText style={styles.resultText}>
        Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> to guess the numbers <Text style={styles.highlight}>{props.userNumber}</Text>
      </BodyText>
      <MainButton onClick={() => props.onRestart()}>
        NEW GAME
      </MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },

  image: {
    width: '100%',
    height: '100%'
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
})

export default GameOverScreen