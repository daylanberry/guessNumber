import React, { useState } from 'react'
import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

import { View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import Colors from '../constants/colors'


const StartGameScreen = props => {

  const [enteredValue, setValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()

  const numberInputHandler = inputText => {
    setValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setValue('')
    setConfirmed(false)
  }

  const confirmInputHandler = () => {
    const choseNumber = parseInt(enteredValue)

    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
      Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
      return
    }
    setConfirmed(true)
    Keyboard.dismiss()
    setSelectedNumber(choseNumber)
    setValue('')
  }

  let confirmedOutput
  if (confirmed) {
    confirmedOutput =
    <Card style={styles.summaryContainer}>
      <BodyText>You Selected</BodyText>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <MainButton onClick={() => props.onStartGame(selectedNumber)}>
        START GAME
      </MainButton>

    </Card>
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
    <View style={styles.screen}>
      <TitleText style={styles.title}>Start a New Game!</TitleText>
      <Card style={styles.inputContainer}>
        <BodyText>Select a Number</BodyText>
        <Input style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={2}
          keyboardType="number-pad"
          value={enteredValue}
          onChangeText={numberInputHandler}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button style={styles.button}
              title='Reset'
              onPress={resetInputHandler}
              color={Colors.accent}
            />
          </View>
          <View style={styles.button}>
            <Button title='Confirm'
              color={Colors.primary}
              onPress={confirmInputHandler}
            />
          </View>
        </View>
      </Card>
      {confirmedOutput}
    </View>

    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15

  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center'
  },

  summaryContainer: {
    margin: 20,
    alignItems: 'center'
  }

})

export default StartGameScreen
