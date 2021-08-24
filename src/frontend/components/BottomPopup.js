import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ColorSet from "../resources/themes/Global";
const TitledIcon = ({icon, onPress, title}) => (
        <View style={{width:75}}>
    <TouchableOpacity style={{justifyContent:"center", alignItems:"center"}} onPress={onPress}>
        <View style={{ backgroundColor:ColorSet.white, width:36, height:36,borderRadius:18}}>
        </View>
    </TouchableOpacity>
<Text style={{fontSize: 12, fontWeight: "bold", color:ColorSet.white, textAlign:"center"}}> {title} </Text>
        </View>
)

function BottomPopup(props) {
    return (
            <Modal
                swipeDirection="down"
                onSwipeComplete={(e) => {props.setModalVisible(false)}}
                transparent={true}
                backdropOpacity={0.2}
                onBackdropPress={() => props.setModalVisible(false)}
                style={{ justifyContent: 'flex-end', margin: 0}}
                isVisible={props.modalVisible}
            >
                <View style={{
                    height: 175,
                    backgroundColor:ColorSet.Green.Tertiary,
                    borderTopRightRadius:30,
                    borderTopLeftRadius:30
                }}>
                    <View style={{marginHorizontal:30}}>
                        <View style={{flexDirection:'row', justifyContent: 'space-between', alignItem:'center', marginTop:15}}>
                            <Text style={{fontSize: 24, fontWeight: "bold", color:ColorSet.white, marginBottom:20}}>Create</Text>
                            <TouchableOpacity style={{height:25}}onPress={() => props.setModalVisible(false)}>
                            <MaterialCommunityIcons name="close-thick" color={"white"} size={25} />
                            </TouchableOpacity>
                        </View>


                        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                            <TitledIcon title={"Habits"} onPress={() => {
                                props.setModalVisible(false)
                                props.navigation.navigate("CreateHabitScreen")
                                }
                            } />
                            <TitledIcon onPress={() => console.log("hey")} title={"Calender Entry"}/>
                            <TitledIcon onPress={() => console.log("bye")} title={"Calender Entry"}/>
                            <TitledIcon onPress={() => console.log("see ya")} title={"Reflection"}/>
                        </View>
                    </View>
                </View>
            </Modal>
    );
}

export default BottomPopup;
