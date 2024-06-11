import { Pressable, StyleSheet, Text } from "react-native"
import { useNavigation } from '@react-navigation/native';

export const BackButton = () => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    const res = navigation.canGoBack()
    if (res) {
      navigation.goBack()
    }
  }

  return (
    <Pressable style={styles.buttonContainer} onPress={handleGoBack}>
      <Text>Back</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderColor: '#000',
    borderWidth: 1,
    height: 50
  }
})