import { Text, TextInput, View, StyleSheet } from "react-native";
import Button from "./Button";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectDarkTheme } from "../redux/reducers";
import { darkTheme, lightTheme } from "../Theme";

export type ListItem = {
    id: number,
    title: string,
    priority: string
}

interface Props {
    item: ListItem
    editable: boolean
    onDelete: () => void
    onEdit: () => void
    onBlurEvent: (value: string) => void
}

//@ts-ignore
function TodoListItem({item, editable, onDelete, onEdit, onBlurEvent}: Props, ref) {

    const [updatedText, setUpdatedText] = useState(item.title);
    const isDark = useSelector(selectDarkTheme);

    return (
        <View style={styles.container}>
            <TextInput 
            ref={ref}
            editable={editable}
            value={updatedText}
            style={isDark ? [styles.textInput, {borderColor: item.priority, color: darkTheme.textColor}] : [styles.textInput, {borderColor: item.priority, color: lightTheme.textColor}]}
            onChangeText={(text) => setUpdatedText(text)}
                onBlur={() => onBlurEvent(updatedText)}
            />
            <View style={styles.buttonContainer}>

            <Button name="Edit" onPress={onEdit} />
            <Button name="Delete" onPress={ onDelete} />
            </View>

        </View>
    )
}

export default React.forwardRef( TodoListItem);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        color: '#000',
        width: '60%',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10, 
        borderRadius: 10
    },
    buttonContainer : {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})