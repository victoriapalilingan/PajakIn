import React from 'react';
import {View} from 'react-native';
import Text from '../../atoms/Text';

const Header = ({title}) => (
  <View className="bg-teal-700 rounded-b-3xl pt-8 pb-6 px-6 shadow-lg">
    <Text size="xl" className="text-yellow-400 font-bold">
      {title}
    </Text>
  </View>
);

export default Header;
