import {StyleSheet, View, Dimensions, Platform} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import BottomBar from '../../molecules/BottomBar';
import NavItem from '../../atoms/NavItem';
import ButtonFab from '../../atoms/ButtonFab';

const SCREEN_WIDTH = Dimensions.get('window').width;
const FAB_SIZE = 63;
const FAB_VERTICAL_OFFSET = -8;

const BottomNavigation = ({
  items,
  activeKey,
  onTabPress,
  onAddPress,
  fabIcon,
}) => {
  const safeAreaBottom = Platform.OS === 'ios' ? 20 : 0;

  const leftItems = items.slice(0, 2);
  const rightItems = items.slice(2, 4);

  const renderNavItem = item => (
    <NavItem
      key={item.key}
      label={item.label}
      icon={item.icon}
      active={activeKey === item.key}
      onPress={() => onTabPress(item.key)}
    />
  );

  const fabLeft = (SCREEN_WIDTH - FAB_SIZE) / 2;
  const fabBottom = 34 + safeAreaBottom + FAB_VERTICAL_OFFSET;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <BottomBar
          leftItems={leftItems.map(renderNavItem)}
          rightItems={rightItems.map(renderNavItem)}
          safeAreaBottom={safeAreaBottom}
        />
        <View style={[styles.fabContainer, {left: fabLeft, bottom: fabBottom}]}>
          <ButtonFab size={FAB_SIZE} onPress={onAddPress} icon={fabIcon} />
        </View>
      </View>
    </View>
  );
};

BottomNavigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    }),
  ).isRequired,
  activeKey: PropTypes.string.isRequired,
  onTabPress: PropTypes.func.isRequired,
  onAddPress: PropTypes.func.isRequired,
  fabIcon: PropTypes.elementType.isRequired,
};

export default BottomNavigation;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    position: 'relative',
  },
  fabContainer: {
    position: 'absolute',
  },
});
