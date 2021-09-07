import { StyleSheet } from 'react-native';

const fontSize = 13;

const settingStyles = (theme) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
        settingContainer: {
			width: '80vw',
		},
        oneSettingContainer: {
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginTop: '1vh',
			marginBottom: '1vh',
		},
		header: {
			flex: 1.5,
			flexDirection: 'row',
			alignItems: 'flex-start',
			paddingLeft: 20,
			paddingRight: 20,
			paddingTop: 50,
		},
		text: {
			fontStyle: 'normal',
			fontWeight: '700',
			fontSize: fontSize,
		},
		textDisplayMargin: {
			paddingLeft: '7vw',
			marginRight: 100,
			marginTop: 0,
			marginBottom: '2vh',
		},
		textDisplay: {
			fontStyle: 'normal',
			fontWeight: '700',
			fontSize: fontSize,
		},
		textTitle: {
			width: '100%',
			textAlign: 'left',
			color: ColorSet.Green.Tertiary,
		},
		textNormal: {
			textAlign: 'left',
			color: ColorSet.Green.Quaternary,
		},
		switchStyling: {
			justifyContent: 'center',
			height: '3vh',
		},
	});

export default settingStyles;
