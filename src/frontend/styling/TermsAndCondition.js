import { StyleSheet, StatusBar } from 'react-native';

const TermsAndCondition = (theme) =>
	StyleSheet.create({
		text: {
			fontSize: 15,
			fontStyle: 'normal',
			color: theme.Quinary,
			marginBottom: 15,
		},
		textTitle: {
			fontSize: 20,
			color: theme.Quinary,
			marginBottom: 10,
			marginTop: 10,
		},
		termsImg: {
			height: 100,
			width: 100,
			marginBottom: 25,
			marginTop: 10,
			resizeMode: 'contain',
			// tintColor: theme.Quaternary,
			// TODO
		},
		container: {
			flexDirection: 'column',
			//paddingTop: StatusBar.currentHeight,
			alignItems: 'flex-start',
			textAlign: 'left',
		},
		scrollView: {
			paddingHorizontal: 20,
			marginHorizontal: 50,
			borderColor: theme.Quaternary,
			borderWidth: 3,
			marginBottom: 20
		},
		headContainer: {
			display: 'flex',
			alignItems: 'center',
			textAlign: 'center',
			flexDirection: 'column',
			height: 500,
		},
	});

export default TermsAndCondition;
