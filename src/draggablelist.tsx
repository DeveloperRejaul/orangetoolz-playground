import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const MARGIN_HORIZONTAL = 10;
const LIST_HEIGHT = 100;
const MARGIN_VERTICAL = 10;
const list = ['draggablelist', 'draggablelist', 'draggablelist', 'draggablelist', 'draggablelist'];

const Button = Animated.createAnimatedComponent(TouchableOpacity);

export default function DraggableList() {
    const {width:WIDTH} = useWindowDimensions();
    const [activeIndex, setActiveIndex] = useState<number>();
    const translateY = useSharedValue(0);

    const LIST_WIDTH = WIDTH - (MARGIN_HORIZONTAL * 2);


   const animatedStyle =  useAnimatedStyle(()=>({
    transform:[{translateY: translateY.value}],
   }));

    const gesture = Gesture.Pan()
    .onBegin(()=>{
        console.log('start');
    })
    .onUpdate((e) => {
        translateY.value =  e.translationY;
     })
    .onEnd(() => {
        console.log('end');

    })
    .onFinalize(() => {
        console.log('Finalize');
    });

  return (
    <GestureDetector gesture={gesture}>
        <ScrollView>
        {list.map((d,i)=> (
            <Button
                key={i}
                style={[{
                    width: LIST_WIDTH,
                    top: (LIST_HEIGHT * i) + MARGIN_VERTICAL,
                    marginVertical: (MARGIN_VERTICAL * i),
                },
                styles.list]}
                    onPress={() =>{
                        setActiveIndex(i);
                    }
                }
                >
                <Text>{d}</Text>
            </Button>
        ))}
        </ScrollView>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
    list:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        height: LIST_HEIGHT,
        marginHorizontal: MARGIN_HORIZONTAL,
        position: 'absolute',
    },
});
