import { StyleSheet, Dimensions } from 'react-native';

const PRIMARY_COLOR = '#7444C0';
const SECONDARY_COLOR = '#5636B8';
const WHITE = '#FFFFFF';
const GRAY = '#757E90';
const DARK_GRAY = '#363636';
const BLACK = '#000000';

const ICON_FONT = '';

const DIMENSION_WIDTH = Dimensions.get('window').width;
const DIMENSION_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
	// CONTAINER - HOME
	containerCardItem: {
		backgroundColor: WHITE,
		borderRadius: 8,
		alignItems: 'center',
		margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},

	// COMPONENTS - STATUS
	bgOfStatus: {
		backgroundColor: 'white'
	},
	outlineStatus: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'gray',
		flexDirection: 'row',
		height: 40,
		marginTop: 5,
		paddingHorizontal: 5,
		marginHorizontal: 15,
		borderRadius: 10
	},
	leftBlockOfStatus: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	rightBlockOfStatus: {
		marginLeft: 'auto',
		flexDirection: 'row',
		alignItems: 'center'
	},
	nameText: {
		marginLeft: 15,
		fontSize: 24,
		color: 'blue',
		fontWeight: 'bold'
	},
	statusText: {
		fontWeight: 'bold',
		marginHorizontal: 5
	},
	roleText: {},

	// COMPONENTS - SPELLINPUT
	textInput: {
		width: '80%',
		flexDirection: 'row',
		backgroundColor: 'white',
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: 'black'
	},

	// COMPONENTS - SPELLBUTTON
	button: {
		width: '80%',
		height: 30,
		borderWidth: 1,
		borderColor: 'black',
		justifyContent: 'center',
		backgroundColor: '#A4C6FF'
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold'
	}
});
