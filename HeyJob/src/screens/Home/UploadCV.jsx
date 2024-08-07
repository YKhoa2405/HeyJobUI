import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, TextInput } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { bgButton1, bgButton2, grey, orange, white } from "../../assets/theme/color";

export default function UploadCV({ navigation }) {

    // const chooseFile = async () => {
    //     try {
    //       const res = await DocumentPicker.pick({
    //         type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
    //       });
    //     } catch (err) {
    //       if (DocumentPicker.isCancel(err)) {
    //         console.log('User cancelled the picker');
    //       } else {
    //         console.log('Unknown Error: ', err);
    //         throw err;
    //       }
    //     }
    //   };
      
    return (
        <View style={styleShare.container}>
            <UIHeader leftIcon={"arrow-back"}
                rightIcon={"ellipsis-horizontal"}
                title={'Ứng tuyển'}
                handleLeftIcon={() => { navigation.goBack() }} />
            <View style={styles.containerMain}>
                <Text style={styleShare.titleJobAndName}>CV ứng tuyển</Text>
                <TouchableWithoutFeedback onPress={()=>chooseFile()}>
                    <View style={styles.uploadBox}>
                        <Icon name="cloud-upload" size={30} color={orange}></Icon>
                        <Text style={[styleShare.titleJobAndName, { marginTop: 10 }]}>Nhấn để tải lên</Text>
                        <Text >Hỗ trợ định dang .doc, .docx, pdf</Text>
                    </View>
                </TouchableWithoutFeedback>

                <Text style={styleShare.titleJobAndName}>Thư giới thiệu</Text>
                <TextInput
                    style={styles.introduceInput}
                    placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và ghi rõ mong muốn, lý do làm việc tại công ty"
                    multiline={true}
                    numberOfLines={8}
                    textAlignVertical="top" />
                <Text style={styleShare.titleJobAndName}>Lưu ý</Text>

                <Text style={{ marginTop: 10, lineHeight: 24 }}><Text style={{ fontWeight: '500', color: orange }}>HeyJob</Text> khuyên tất cả các bạn hãy luôn cẩn trọng trong quá trình tìm việc và chủ động nghiên cứu về thông tin công ty, vị trí việc làm trước khi ứng tuyển.
                    Ứng viên cần có trách nhiệm với hành vi ứng tuyển của mình. Nếu bạn gặp phải tin tuyển dụng hoặc nhận được liên lạc đáng ngờ của nhà tuyển dụng, hãy báo cáo ngay cho <Text style={{ fontWeight: '500', color: orange }}>HeyJob</Text> qua email <Text style={{ fontWeight: '500', color: orange }}>nykhoa2405@gmail.com</Text> để được hỗ trợ kịp thời.</Text>

            </View>
            <View style={[styleShare.bottomBar, styleShare.flexCenter]}>
                <TouchableOpacity style={styles.buttonApply}>
                    <Text style={styles.buttonText}>Ứng tuyển</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerMain: {
        marginHorizontal: 20,
        marginTop: 10
    },
    buttonApply: {
        backgroundColor: bgButton1,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: '100%',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "500",
        color: white
    },
    uploadBox: {
        height: 180,
        borderWidth: 2,
        borderColor: bgButton2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor:white
    },
    introduceInput: {
        borderWidth: 1,
        borderColor: grey,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 30,
        padding: 10,
        backgroundColor: white
    }

})