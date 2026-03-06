import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Animation() {
    const r = useSharedValue(50);
    
    const handlePress = () => {
        r.value *= 1.3
    }
    const handleLongPress = () => {
        r.value = 50
    }

    const animatedProps = useAnimatedProps(() => ({
        r: withSpring(r.value, {
            mass: 5,
            stiffness: 1000,
            velocity: 200,
            damping: 50,
        }),
    }))

    return (
        <View style={styles.container}>
            <Text style={styles.bold}>Tap to grow, longpress to reset!</Text>
            <Svg style={styles.svg}>
                <AnimatedCircle 
                cx="50%" 
                cy="50%" 
                animatedProps={animatedProps} 
                fill="purple" 
                onPress={handlePress}
                onLongPress={handleLongPress}
                />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    svg: {
        height: '100%',
        width: '100%',
    },
    bold: {
        fontWeight: '700'
    }
})