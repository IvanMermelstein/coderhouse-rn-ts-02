import React, { FC } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { styles } from './styles';

interface InputProps extends TextInputProps {
    handleOnChange: (text: string) => void;
    style?: Object;
}

const Input: FC<InputProps> = ({ handleOnChange, style, ...props }) => {
    return (
        <View style={styles.container}>
            <TextInput
                {...props}
                style={[style, styles.input]}
                onChangeText={handleOnChange}
            />
        </View>
    );
};

export default Input;
