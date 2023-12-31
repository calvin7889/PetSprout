import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, scrolling, TouchableOpacity, Touchable, KeyboardAvoidingView, Platform } from 'react-native';

import PomodoroTasks from '../components/PomodoroTasks';
import MenuHeader from '../components/MenuHeader';
import styles from '../styling/Header';
import { useTheme } from '@react-navigation/native';
import PomodoroTasksStyles from'../styling/PomodoroTasks';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';

function PomodoroTasksScreen(props) {
    const scrolling = React.useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();

    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('');

    const [displayed, setDisplayed] = useState(false);

    useEffect(() => {
		if (tasks.length == 0 && !displayed) displayTasks();
	});

    const displayTasks= () => {
        setTasks([...tasks, 'Mock Task']);
        setTitle(...title,'');
    }

    const createTask=(props)=>{
        setTasks([...tasks, '']);
        setTitle(...title,'');
    }

    const CreateTaskButton = () => {
        return (
            <View style={PomodoroTasksStyles.create}>
                <Text style={PomodoroTasksStyles.plus}>+</Text>
            </View>
        )
    }

    const SortTaskButton = () =>{
        return (
            <View style={PomodoroTasksStyles.create}>
                <Text style={PomodoroTasksStyles.plus}>S</Text>
            </View>
        )
    }

    return(
        <SafeAreaView style={[
            PomodoroTasksStyles.safeArea,
            androidSafeAreaView().AndroidSafeArea,
        ]}>
            <MenuHeader
                back={true}
                text={'PomodoroTasks'}
                navigation={props.navigation}
            />
            <KeyboardAvoidingView behavior={Platform.OS==="ios" ? "padding" : "padding"} style={styles(colors).headContainer}>
                <View style={{ marginTop: 20 }} />
                <Animated.ScrollView
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrolling } } }],
                            { useNativeDriver: true },
                        )}
                        decelerationRate={'normal'}
                >
                    <View style={PomodoroTasksStyles.container}>
                        <View style={PomodoroTasksStyles.tasksWrapper}>
                            <View style={PomodoroTasksStyles.items}>
                                {tasks.map((items) => {
                                    return <PomodoroTasks text={items} 
                                    />
                                })}
                            </View>
                        </View>
                    </View>
                </Animated.ScrollView>
                <View style={PomodoroTasksStyles.buttons}>
                    <TouchableOpacity style={PomodoroTasksStyles.createTask}
                        onPress={() => {
                            createTask();
                        }}
                    >
                        <CreateTaskButton/>
                    </TouchableOpacity>
                    <TouchableOpacity style={PomodoroTasksStyles.SortTask}>
                        <SortTaskButton/>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


export default PomodoroTasksScreen;