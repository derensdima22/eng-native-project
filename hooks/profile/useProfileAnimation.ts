// hooks/useProfileAnimation.js
import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const useProfileAnimation = () => {
  const panY = useRef(new Animated.Value(0)).current;
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const midpoint = -hp("12.5%");

  const headerHeight = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [hp("20%"), hp("57%")],
    extrapolate: "clamp",
  });

  const imageOpacity = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [0.4, 1],
    extrapolate: "clamp",
  });

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: panY } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.BEGAN) {
      if (!isDragging) {
        setIsDragging(true);
        panY.setOffset(panY._value);
        panY.setValue(0);
      }
    }

    if (event.nativeEvent.state === State.END) {
      setIsDragging(false);
      panY.flattenOffset();

      const currentValue = panY._value;
      if (currentValue < midpoint) {
        Animated.spring(panY, {
          toValue: -hp("25%"),
          useNativeDriver: false,
        }).start(() => setIsEndReached(true));
      } else {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: false,
        }).start(() => setIsEndReached(false));
      }
    }
  };

  return {
    panY,
    isEndReached,
    headerHeight,
    imageOpacity,
    onGestureEvent,
    onHandlerStateChange,
  };
};
