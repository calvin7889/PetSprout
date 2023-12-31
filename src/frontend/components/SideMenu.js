import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context';
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Image,
	Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toggle from 'react-native-toggle-element';
import Colours from '../resources/themes/Colours';
import { useTheme } from '@react-navigation/native';
import { logo } from '../resources/images/Logo/Logo';
import { comingsoon } from '../resources/images/Pets/ComingSoon/ComingSoon';
import { egg } from '../resources/images/Pets/Egg/Egg';
import LogoutConfirmation from './LogoutPopup';
import { EvolutionMapping } from '../resources/mappings/EvolutionMapping';
import { getImage } from '../resources/images/Pets/ImageMapping';
import FaintingPopup from "./FaintingPopup";
function ThemeCircle({ colorTheme, onPress, selected }) {
	const { height, width } = Dimensions.get('window');

	return (
		<View>
			<TouchableOpacity
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'row',
					height: height * 0.045,
					width: height * 0.045,
					borderRadius: (height * 0.045) / 2,
					backgroundColor: selected
						? colorTheme.Selected
						: colorTheme.NotSelected,
				}}
				onPress={onPress}
			>
				{selected ? (
					<View
						style={{
							alignItems: 'center',
							flexDirection: 'row',
							height: height * 0.03,
							width: height * 0.03,
							borderRadius: (height * 0.03) / 2,
							backgroundColor: colorTheme.NotSelected,
						}}
					/>
				) : (
					<></>
				)}
			</TouchableOpacity>
		</View>
	);
}

const Tab = ({ color, icon, onPress, title, isImage = false }) => (
	<TouchableOpacity
		style={{
			alignItems: 'center',
			flexDirection: 'row',
			width: '100%',
			marginBottom: Dimensions.get('window').height * 0.01,
		}}
		onPress={onPress}
	>
		{isImage ? (
			<Image
				source={icon}
				resizeMode='contain'
				style={{
					width: 40,
					height: 40,
					tintColor: color,
					// transform: [ { rotate: rotate }]
				}}
			/>
		) : (
			<MaterialCommunityIcons name={icon} color={color} size={40} />
		)}
		<Text
			style={{
				textAlign: 'center',
				color: color,
				fontSize: 20,
				fontWeight: 'bold',
			}}
		>
			{' '}
			{title}{' '}
		</Text>
	</TouchableOpacity>
);

function SideMenu(props) {
	const {
		changeColorTheme,
		getColor,
		changeModeTheme,
		getMode,
		getToken,
		changeLogo,
		changePet,
		changeComingSoon,
		getPet,
	} = useContext(AuthContext);

	const { colors } = useTheme();
	const [color, setColor] = useState(getColor);
	const [userName, setUserName] = useState('');
	const [logoutVisible, setLogoutVisible] = useState(false);

	let defaultMode = true;
	if (getMode == 'dark') {
		defaultMode = false;
	}

	useEffect(() => {
		fetch('http://3.15.57.200:5000/api/v1.0.0/user/viewAccount', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setUserName(data.userName);
			})
			.catch((err) => console.log(err));

		fetch('http://3.15.57.200:5000/api/v1.0.0/pets/get_current', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authentication-token': getToken,
			},
		})
			.then((res) =>
				res.json().then((data) => {
					console.log("Current pet from side menu is " + data.image)
					changePet(data.image);
				}),
			)
			.catch();
	}, []);

	const [toggleValue, setToggleValue] = useState(!defaultMode);
	const [modalVisible, setModalVisible] = useState(props.modalVisible)

	useEffect(() => setModalVisible(props.modalVisible), [props.modalVisible])

	function colorChange(color) {
		changeColorTheme(color);
		setColor(color);
		props.setModalVisible(false);
		console.log(color);
		console.log(logo[color]);
		changeLogo(logo[color]);
		changeComingSoon(comingsoon[color]);
	}
	return (
		<Modal
			swipeDirection='left'
			onSwipeComplete={(e) => {
				props.setModalVisible(false);
			}}
			transparent={true}
			backdropOpacity={0.2}
			onBackdropPress={() => props.setModalVisible(false)}
			style={{ margin: 0 }}
			isVisible={modalVisible}
			animationIn='slideInLeft'
			animationOut='slideOutLeft'
		>
			<View
				style={{
					height: '100%',
					width: '80%',
					paddingTop: '10%',
					paddingLeft: '5%',
					backgroundColor: colors.background,
				}}
			>
				<SafeAreaView>
					<View style={{ marginHorizontal: '6%', height: '100%' }}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: '6%',
							}}
						>
							<View
								style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
							>
								<TouchableOpacity style={{ justifyContent: 'center' }}>
									<Image
										style={{
											width: 50,
											height: 50,
											borderRadius: 25,
										}}
										source={getImage(getPet, 'Happy', getColor)}
									></Image>
								</TouchableOpacity>
								<View
									style={{
										flexDirection: 'row',
										flex: 1,
										marginHorizontal: '4%',
									}}
								>
									<Text
										numberOfLines={2}
										style={{
											fontSize: 20,
											fontWeight: 'bold',
											color: colors.Quaternary,
											textAlign: 'center',
										}}
									>
										{userName}
									</Text>
								</View>
							</View>
							{/* <TouchableOpacity*/}
							{/*	style={{ height: 40, justifyContent: 'center' }}*/}
							{/*	onPress={() => {*/}
							{/*		props.setModalVisible(false);*/}
							{/*		props.navigation.navigate('SettingsScreen');*/}
							{/*	}}*/}
							{/*>*/}
							{/*	<MaterialCommxunityIcons*/}
							{/*		name='cog'*/}
							{/*		color={colors.Quaternary}*/}
							{/*		size={40}*/}
							{/*	/>*/}
							{/*</TouchableOpacity>*/}
						</View>
						<TouchableOpacity
							style={{ marginHorizontal: '6%', marginBottom: '2%' }}
						>
							<Text
								style={{
									fontSize: 18,
									color: colors.Quaternary,
									textAlign: 'center',
								}}
							>
								"What you choose to struggle in is what you’ll ultimately
								become.”
							</Text>
							<Text
								style={{
									fontSize: 18,
									color: colors.Quaternary,
									textAlign: 'right',
								}}
							>
								{' '}
								- Mark Manson{' '}
							</Text>
						</TouchableOpacity>
						<View
							style={{
								marginLeft: '6%',
							}}
						>
							{/*<Tab*/}
							{/*	color={colors.Quaternary}*/}
							{/*	icon={'star'}*/}
							{/*	title={'Achievements'}*/}
							{/*	onPress={() => {*/}
							{/*		props.setModalVisible(false);*/}
							{/*		props.navigation.navigate('AchievementScreen');*/}
							{/*	}}*/}
							{/*/>*/}
							<Tab
								color={colors.Quaternary}
								icon={'account-circle'}
								title={'Account'}
								onPress={() => {
									props.setModalVisible(false);
									props.navigation.navigate('ProfileScreen');
								}}
							/>
							<Tab
								color={colors.Quaternary}
								icon={'bullhorn'}
								title={'Feedback'}
								onPress={() => {
									props.setModalVisible(false);
									props.navigation.navigate('FeedbackScreen');
								}}
							/>
							<Tab
								color={colors.Quaternary}
								icon={'bug'}
								title={'Report a Bug'}
								onPress={() => {
									props.setModalVisible(false);
									props.navigation.navigate('ReportABugScreen');
								}}
							/>
							<Tab
								color={colors.Quaternary}
								icon={'account-group'}
								title={'Collaborators'}
								onPress={() => {
									props.setModalVisible(false);
									props.navigation.navigate('CollaboratorsScreen');
								}}
							/>
							{/*<Tab*/}
							{/*	color={colors.Quaternary}*/}
							{/*	icon={'hand-heart'}*/}
							{/*	title={'Support Us!'}*/}
							{/*	onPress={() => {*/}
							{/*		props.setModalVisible(false);*/}
							{/*		props.navigation.navigate('SupportUsScreen');*/}
							{/*	}}*/}
							{/*/>*/}
							<Tab
								color={colors.Quaternary}
								icon={require('../resources/images/Icon.png')}
								title={'About'}
								isImage={true}
								onPress={() => {
									props.setModalVisible(false);
									props.navigation.navigate('AboutScreen');
								}}
							/>
						</View>
						<View
							style={{
								justifyContent: 'flex-end',
								marginHorizontal: '6%',
								flex: 1,
							}}
						>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginBottom: '6%',
								}}
							>
								<ThemeCircle
									colorTheme={Colours.Green}
									selected={color == 'Green'}
									onPress={() => colorChange('Green')}
								/>
								<ThemeCircle
									colorTheme={Colours.Yellow}
									selected={color == 'Orange'}
									onPress={() => colorChange('Orange')}
								/>
								<ThemeCircle
									colorTheme={Colours.Blue}
									selected={color == 'Blue'}
									onPress={() => colorChange('Blue')}
								/>
								<ThemeCircle
									colorTheme={Colours.Purple}
									selected={color == 'Purple'}
									onPress={() => colorChange('Purple')}
								/>
								<ThemeCircle
									colorTheme={Colours.Red}
									selected={color == 'Red'}
									onPress={() => colorChange('Red')}
								/>
							</View>
							<View style={{ alignItems: 'center', marginBottom: 10 }}>
								<Toggle
									value={toggleValue}
									onPress={(newState) => {
										newState
											? changeModeTheme('dark')
											: changeModeTheme('light');
										setToggleValue(newState);
									}}
									thumbButton={{
										activeBackgroundColor: '#ffffff',
										inActiveBackgroundColor: '#272727',
									}}
									trackBar={{
										width: 100,
										height: 50,
										radius: 25,
										activeBackgroundColor: '#272727',
										inActiveBackgroundColor: '#808080',
									}}
									leftComponent={
										<MaterialCommunityIcons
											name={'weather-sunny'}
											color={'#ffffff'}
											size={30}
										/>
									}
									rightComponent={
										<MaterialCommunityIcons
											name={'moon-waning-crescent'}
											color={'#272727'}
											size={30}
										/>
									}
								/>
							</View>
							<Tab
								color={colors.Quaternary}
								icon={'logout'}
								title={'Log Out'}
								onPress={() => {
									setLogoutVisible(true);
								}}
							/>
						</View>
					</View>
				</SafeAreaView>
			</View>
			<LogoutConfirmation
				visible={logoutVisible}
				setVisible={setLogoutVisible}
			></LogoutConfirmation>
		</Modal>
	);
}

export default SideMenu;
