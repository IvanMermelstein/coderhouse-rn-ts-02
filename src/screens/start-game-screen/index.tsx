import React, { FC, useState } from 'react';
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Card from '../../components/card';
import Header from '../../components/header';
import Input from '../../components/input';
import { colors } from '../../constants/theme';
import { styles } from './styles';

const isIOS = Platform.OS === 'ios';

interface StartGameScreenProps {
    onStartGame: (value: number) => void;
}

const StartGameScreen: FC<StartGameScreenProps> = ({ onStartGame }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [selectedNumber, setSelectedNumber] = useState<number>(0);

    const handleOnChange = (text: string) => {
        setInputValue(text.replace(/[^0-9]/g, ''));
    };

    const handleResetInput = () => {
        setInputValue('');
        setConfirmed(false);
    };

    const handleConfirmInput = () => {
        const chosenNumber = parseInt(inputValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setInputValue('');
    };

    const confirmedOutput = confirmed ? (
        <Card style={styles.containerConfirmed}>
            <Text style={styles.cardTitle}>Tu Selección</Text>
            <Text style={styles.confirmedText}>{selectedNumber}</Text>
            <View style={styles.buttonsContainer}>
                <Button
                    title='Empezar Juego'
                    onPress={() => onStartGame(selectedNumber)}
                    color='#52528C'
                />
            </View>
        </Card>
    ) : null;

    return (
        <ScrollView style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                    behavior={isIOS ? 'position' : 'height'}
                    style={styles.container}>
                    <View style={styles.container}>
                        <Header title='Adivina el número' />
                        <Card>
                            <Text style={styles.cardTitle}>Empezar Juego</Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>
                                    Elija un número
                                </Text>
                                <Input
                                    blurOnSubmit
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    placeholder='Ej: 11'
                                    placeholderTextColor={
                                        colors.placeholderColor
                                    }
                                    maxLength={2}
                                    handleOnChange={value =>
                                        handleOnChange(value)
                                    }
                                    returnKeyType='done'
                                    value={inputValue}
                                />
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Button
                                    title='Limpiar'
                                    onPress={() => handleResetInput()}
                                    color='#52528C'
                                />
                                <Button
                                    title='Confirmar'
                                    onPress={() => handleConfirmInput()}
                                    color='#52528C'
                                />
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

export default StartGameScreen;
