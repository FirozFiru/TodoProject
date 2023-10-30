import {View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { selectDarkTheme } from '../redux/reducers';
import { darkTheme, lightTheme } from '../Theme';
import ReactNativeModal from 'react-native-modal';


interface ModalPorps{
    isVisible: boolean,
    message: string,
    onDismiss: () => void
}

function ModalPopup ({isVisible, message, onDismiss}: ModalPorps) {
    const isDark = useSelector(selectDarkTheme);
    return (
        <ReactNativeModal isVisible={isVisible} >
            <View style={isDark ? [styles.container, {backgroundColor: darkTheme.modalBackground}] : styles.container}>
            {/* @ts-ignore */}
            <Text style={styles.text(isDark)}>{message}</Text>
             {/* @ts-ignore */}
            <Text style={styles.text(isDark)} onPress={onDismiss}>cancle</Text>
            </View>
        </ReactNativeModal>
    )
}

export default ModalPopup;

const styles = StyleSheet.create({
    container: {width: '100%', height: 100, backgroundColor: '#FFF', borderRadius:10, justifyContent: 'center', alignItems: 'center'},
    //@ts-ignore
    text: (isDark) => ({
        color: isDark ? darkTheme.textColor : lightTheme.textColor
    })
})