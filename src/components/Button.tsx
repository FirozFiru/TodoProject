import { Pressable, StyleSheet, Text } from "react-native";


interface ButtonProps {
    name: string,
    onPress: () => void

}
function Button({name, onPress}: ButtonProps) {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text>{name}</Text>
        </Pressable>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        // width: '30%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: "dodgerblue",
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})