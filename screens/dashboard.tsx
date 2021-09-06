import * as React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import configData from '../config.json';

export default class App extends React.Component {
  state = {
    statusText: 'Clocked out',
    clocked: false,
    clockedInTime: '',
  };
  _onPress(args) {
    var time = '';
    switch (args) {
      case 'clockin':
        if (this.state.clocked == false) {
          time =
            'Clocked in on: ' +
            new Date().getDate() +
            '.' +
            (new Date().getMonth() + 1) +
            ' at ' +
            new Date().getHours() +
            ':' +
            new Date().getMinutes();
          this._setState('clocked in', true, time);
        }
        break;
      case 'clockout':
        if (this.state.clocked == true) {
          this._setState('clocked out', false, time);
        }
    }
  }
  _setState(text, bit, time) {
    this.setState({
      statusText: text,
      clocked: bit,
      clockedInTime: time,
    });
  }
  render() {
    console.log(configData.SERVER_URL);
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'pink',
          }}
        >
          <LinearGradient
            colors={['black', 'pink']}
            style={{ height: '20%' }}
          ></LinearGradient>
          <View style={styles.statusText}>
            <Text>{this.state.clockedInTime}</Text>
          </View>
          <View style={styles.fixToText}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? 'rgb(210, 230, 255)'
                    : 'black',
                },
                styles.button,
              ]}
              onPress={() => this._onPress('clockin')}
            >
              <Text style={styles.buttonText}>
                Clock in
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? 'rgb(210, 230, 255)'
                    : 'black',
                },
                styles.button,
              ]}
              onPress={() => this._onPress('clockout')}
            >
              <Text style={styles.buttonText}>
                Clock out
              </Text>
            </Pressable>
          </View>
        </View>

        <LinearGradient
          colors={['pink', 'black']}
          style={{
            height: '20%',
            justifyContent: 'space-between',
          }}
        ></LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  containerHalf: {
    height: '50%',
  },
  statusText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '10%',
    alignItems: 'center',
    marginTop: '40%',
    marginBottom: '5%',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '10%',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: 150,
    elevation: 3,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    letterSpacing: 0.25,
    color: 'pink',
  },
});
