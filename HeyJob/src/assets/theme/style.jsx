import { StyleSheet } from "react-native";
import { bgButton1, bgButton2, bgImage, grey, orange, white } from "./color";

const styleShare = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: bgButton1
    },
    titleJobAndName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: bgButton1
    },
    textMainOption: {
        fontSize: 20,
        fontWeight: 'bold',
        color: bgButton1
    },
    flexCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
        marginBottom: 20,
        resizeMode: 'center'
    },
    containerAvatar: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: bgImage,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -45
    },
    avatarJob: {
        width: 54,
        height: 54,
        resizeMode: 'cover'
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    buttonSave: {
        borderWidth: 1,
        borderColor: orange,
        borderRadius: 10,
        padding: 10,
        marginRight: 10
    },
})

export default styleShare