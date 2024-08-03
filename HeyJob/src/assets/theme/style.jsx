import { StyleSheet } from "react-native";
import { bgButton1 } from "./color";

const styleShare = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: bgButton1
    },
    flexCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    flexBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        height: 1,
        flex: 1,
        opacity: 0.6,
        backgroundColor: 'grey'
    },
    lineText: {
        marginHorizontal: 5,
        fontWeight: '500',
        opacity: 0.6,
    },
    imageLogin: {
        width: 300,
        height: 300,
        marginBottom:20,
        resizeMode:'center'
    }
})

export default styleShare