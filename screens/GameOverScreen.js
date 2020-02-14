import React from 'react'

import { View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {

  return (
    <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode='cover'
        />

      </View >
      <BodyText style={styles.resultText}>
        Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> to guess the numbers <Text style={styles.highlight}>{props.userNumber}</Text>
      </BodyText>
      <MainButton onClick={() => props.onRestart()}>
        NEW GAME
      </MainButton>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  imageContainer: {
    width: Dimensions.get('window').width * .7,
    height: Dimensions.get('window').width * .7,
    borderRadius: (Dimensions.get('window').width * .7 )/2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height/30
  },
  resuleContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height/60
  },

  image: {
    width: '100%',
    height: '100%'
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 600 ? 16: 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
})

export default GameOverScreen