import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BAR_HEIGHT = 70;

const BottomBar = ({leftItems, rightItems, safeAreaBottom}) => {
  const safePadding = safeAreaBottom || 0;
  const centerX = SCREEN_WIDTH / 2;
  const notchRadius = 42;
  const notchWidth = 110;

  const cornerRadius = 28;
  const leftNotchStart = centerX - notchWidth / 2;
  const rightNotchStart = centerX + notchWidth / 2;

  const curveDepth = notchRadius - 5;

  const pathData = `
    M 0,${cornerRadius}
    Q 0,0 ${cornerRadius},0
    L ${leftNotchStart - 10},0
    Q ${leftNotchStart - 3},0 ${leftNotchStart + 5},8
    Q ${leftNotchStart + 18},${curveDepth - 15} ${
    centerX - notchRadius + 10
  },${curveDepth}
    Q ${centerX},${curveDepth + 8} ${centerX + notchRadius - 10},${curveDepth}
    Q ${rightNotchStart - 18},${curveDepth - 15} ${rightNotchStart - 5},8
    Q ${rightNotchStart + 3},0 ${rightNotchStart + 10},0
    L ${SCREEN_WIDTH - cornerRadius},0
    Q ${SCREEN_WIDTH},0 ${SCREEN_WIDTH},${cornerRadius}
    L ${SCREEN_WIDTH},${BAR_HEIGHT + safePadding}
    L 0,${BAR_HEIGHT + safePadding}
    Z
  `;

  return (
    <View style={styles.container}>
      <Svg
        width={SCREEN_WIDTH}
        height={BAR_HEIGHT + safePadding}
        style={styles.svg}>
        <Defs>
          <LinearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#226A5F" stopOpacity="1" />
            <Stop offset="29" stopColor="#2A6E53" stopOpacity="1" />
            <Stop offset="100" stopColor="#205942ff" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path d={pathData} fill="url(#barGradient)" />
      </Svg>
      <View style={[styles.itemsContainer, {paddingBottom: safePadding}]}>
        <View style={styles.leftSection}>{leftItems}</View>
        <View style={styles.centerSpacer} />
        <View style={styles.rightSection}>{rightItems}</View>
      </View>
    </View>
  );
};

BottomBar.propTypes = {
  leftItems: PropTypes.node,
  rightItems: PropTypes.node,
  safeAreaBottom: PropTypes.number,
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: BAR_HEIGHT,
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingRight: 15,
  },
  centerSpacer: {
    width: 110,
  },
  rightSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 15,
  },
});
