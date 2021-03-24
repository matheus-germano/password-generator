import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons  } from '@expo/vector-icons';

import Slider from '@react-native-community/slider'
import Clipboard from 'expo-clipboard'

let charset = '@_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOQPRSTUVWXYZ0123456789'

export default function App() {
  const [password, setPassword] = useState('')

  const [size, setSize] = useState(5)

  function generatePass() {
    let pass = '';

    for(let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(pass)
  }

  function copyPass() {
    Clipboard.setString(password);
  }

  return(
    <View style={styles.container}>
      <Image 
        source={require('./src/assets/password.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.area}>
        <Slider 
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor='#ff0000'
          maximumTrackTintColor='#333'
          thumbTintColor='#333'
          value={size}
          onValueChange={(valor) => setSize(valor.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      { password != "" && (
        <View style={styles.passArea}>
          <Text style={styles.password} onPress={copyPass}>{password} <MaterialIcons name="content-copy" size={24} color="#333" style={styles.icon}/></Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3FF'
  },
  logo: {
    height: 128,
    width: 128,
    marginBottom: 60
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#ffa200',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  passArea: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 24,
    color: '#333'
  },
  icon: {
    marginLeft: 'auto'
  }
});