import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonProps = {
  label: string;
  style?: ViewStyle; // menambahkan props style
  textStyle?: TextStyle; // menambahkan props textStyle
  onPress?: () => void;
};

const Button: React.FC<ButtonProps> = ({label, style, textStyle, onPress}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2D6A4F',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    fontWeight: '600',
    fontSize: 40,
    textAlign: 'center',
  },
});

export default Button;
