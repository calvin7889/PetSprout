import { StyleSheet, Platform, StatusBar } from 'react-native';

const androidSafeAreaView = () => {
	return StyleSheet.create({
		AndroidSafeArea: {
			flex: 1,
			backgroundColor: 'white',
			paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
		},
	});
};

export default androidSafeAreaView;
