import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import Card from '../../components/card';
import Header from '../../components/header';
import useOrientation from '../../hooks/use-orientation';
import { styles } from './style';

interface GameScreenProps {
    userOptions: number;
    onGameOver: (value: number) => void;
}

const GameScreen: FC<GameScreenProps> = ({ userOptions, onGameOver }) => {
    const orientation = useOrientation();

    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const generateRandomBetween = useCallback(
        (min: number, max: number, exclude: number): number => {
            min = Math.ceil(min);
            max = Math.floor(max);
            const rndNum = Math.floor(Math.random() * (max - min)) + min;
            if (rndNum === exclude) {
                return generateRandomBetween(min, max, exclude);
            } else return rndNum;
        },
        [currentHigh, currentLow, userOptions]
    );

    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, userOptions)
    );

    useEffect(() => {
        if (currentGuess === userOptions) onGameOver(rounds);
    }, [currentGuess, userOptions, onGameOver]);

    const handlerNextGuess = (direction: string) => {
        if (
            (direction === 'lower' && currentGuess < userOptions) ||
            (direction === 'greater' && currentGuess > userOptions)
        ) {
            Alert.alert('No mientas...', 'tu sabes que no es verdad', [
                { text: '¡Disculpa!' },
                { text: 'Cancelar' }
            ]);
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        setRounds(current => current + 1);
    };

    return (
        <View style={styles.container}>
            <Header title='Juego Iniciado' />
            <Card
                style={
                    orientation?.isPortrait
                        ? styles.cardContainer
                        : styles.cardContainerLandscape
                }>
                <Text style={styles.cardTitle}>
                    La suposición del oponentes
                </Text>
                <Text style={styles.confirmedText}>{currentGuess}</Text>
                <View style={styles.buttonsContainer}>
                    <Button
                        title='Menor'
                        onPress={() => handlerNextGuess('lower')}
                        color='#52528C'
                    />
                    <Button
                        title='Mayor'
                        onPress={() => handlerNextGuess('greater')}
                        color='#52528C'
                    />
                </View>
            </Card>
        </View>
    );
};

export default GameScreen;
