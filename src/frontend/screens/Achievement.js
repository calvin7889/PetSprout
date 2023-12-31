import React, { useEffect, useContext, useState } from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import androidSafeAreaView from '../styling/AndroidSafeAreaView';
import AchievementStyle from '../styling/Achievement';
import { ProgressBar } from 'react-native-paper';
import MenuHeader from '../components/MenuHeader';
import HomeButton from '../components/HomeButton';

import { useFonts, Roboto_900Black } from '@expo-google-fonts/roboto';
import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../Context';

// data from database

/*

{
	category: category name,
	achievements: [
		{
			name: achievement name,
			level: bronze/silver/gold,
			progress: some decimal,
			iconSrc: require('../resources/assets/icon.png'),
		}
	]
}

*/

function AchievementScreen(props) {
	const { getToken } = useContext(AuthContext);
	const [achievements, setAchievements] = useState([]);

	let list = [];
	useEffect(() => {
		const get = () => {
			fetch('http://3.15.57.200:5000/api/v1.0.0/achievements/getAchievements', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'authentication-token': getToken,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					for (let cat in Object.keys(data)) {
						let sublist = [];

						console.log('cat = ' + cat);
						let cate = data[Object.keys(data)[cat]];
						console.log('cate = ');
						console.log(cate);
						for (let ach in Object.keys(cate)) {
							console.log(Object.keys(cate)[ach]);
							console.log('ach = ' + ach);
							let achieve = cate[Object.keys(cate)[ach]];
							console.log('achieve = ');
							console.log(achieve);
							sublist.push({
								name: Object.keys(cate)[ach],
								level:
									achieve >= 60 ? 'gold' : achieve >= 30 ? 'silver' : 'bronze',
								progress: achieve >= 90 ? 1 : (achieve % 30) / 30,
								iconSrc: require('../resources/assets/icon.png'),
							});
						}
						list.push({
							category: Object.keys(data)[cat],
							progresses: sublist,
						});
					}
				})
				.then(() => {
					console.log(list);
					setAchievements(list);
				})
				.catch((e) => console.log(e));
		};

		if (achievements.length == 0) {
			get();
		}
	}, []);

	let [fontsLoaded] = useFonts({
		Roboto_900Black,
	});

	const { colors } = useTheme();
	let styles = AchievementStyle(
		colors,
		Dimensions.get('screen').width,
		Dimensions.get('screen').height,
	);
	return (
		fontsLoaded && (
			<SafeAreaView style={androidSafeAreaView().AndroidSafeArea}>
				<MenuHeader text='Achievement' navigation={props.navigation} />

				<View style={{flex:1, alignItems: 'center'}}>
					{achievements.map((item) => (
						<OneCategory
							key={item.category}
							category={item.category}
							progresses={item.progresses}
							styles={styles}
						/>
					))}
				</View>
			<HomeButton navigation={props.navigation} colors={colors} />
		</SafeAreaView>
		)
	)
}

const AchievementPanel = (props) => {
	let temp = props.temp;
	return (
		<View style={props.style.achievementRow}>
			{temp.map((item, index) => (
				<OneAchievement
					key={item.name}
					name={item.name}
					level={item.level}
					progress={item.progress}
					srcPath={item.iconSrc}
					styles={props.style}
				/>
			))}
		</View>
	);
};

const CarouselAcheivement = (props) => {
	let list = props.list;
	console.log(list);
	if (list.length > 3) {
		let panels = [];
		let subpanel = [];
		for (let i = 0; i < list.length; i++) {
			if (subpanel.length == 3) {
				panels.push(subpanel);
				subpanel = [];
			}
			subpanel.push(list[i]);
		}
		if (subpanel.length > 0) {
			panels.push(subpanel);
		}
		console.log('Panel:');
		console.log(panels);

		return (
			<ScrollView
				showsHorizontalScrollIndicator={false}
				horizontal={true}
				decelerationRate={'fast'}
				style={props.style.achievementPanel}
				snapToInterval={
					3 *
					(0.1415 * Dimensions.get('screen').width +
						0.05 * Dimensions.get('screen').width)
				}
				snapToAlignment={'center'}
			>
				{panels.map((item) => (
					<View style={props.style.achievementPanel}>
						<AchievementPanel temp={item} style={props.style} />
					</View>
				))}
			</ScrollView>
		);
	} else {
		return <AchievementPanel temp={list} style={props.style} />;
	}
};

const OneCategory = (props) => {
	console.log(props.progresses);
	return (
		<View>
			<Text
				style={[
					props.styles.achievementName,
					props.styles.textStyles,
					{ fontFamily: 'Roboto_900Black' },
				]}
			>
				{props.category[0].toUpperCase() +
					props.category.slice(1).toLowerCase()}
			</Text>
			<CarouselAcheivement list={props.progresses} style={props.styles} />
		</View>
	);
};

const OneAchievement = (props) => {
	const sty =
		props.level == 'gold'
			? props.styles.achievementGold
			: props.level == 'silver'
			? props.styles.achievementSilver
			: props.styles.achievementBronze;
	return (
		<View style={props.styles.achievementContainer}>
			{/*<Text numberOfLines={1}>{props.name}</Text>*/}
			<Image
				style={[props.styles.achievementIcon, sty]}
				source={props.srcPath}
			/>
			<ProgressBar
				progress={props.progress}
				style={props.styles.progressBar}
				color='#75D6FF'
			/>
		</View>
	);
};

export default AchievementScreen;
