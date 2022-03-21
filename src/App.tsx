import React, { FC, useState } from 'react';
import { SafeAreaView } from 'react-native';
import GameOverScreen from './screens/game-over-screen';
import GameScreen from './screens/game-screen';
import StartGameScreen from './screens/start-game-screen';
import { styles } from './styles';

const App: FC = () => {
    const [userNumber, setUserNumber] = useState<number | null>(null);
    const [guessRounds, setGuessRounds] = useState<number>(0);

    const handleStartGame = (selectedNumber: number) => {
        setUserNumber(selectedNumber);
    };

    const handleGameOver = (numRounds: number) => {
        setGuessRounds(numRounds);
    };

    const handleRestart = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    let content = <StartGameScreen onStartGame={handleStartGame} />;

    if (userNumber && guessRounds <= 0) {
        content = (
            <GameScreen userOptions={userNumber} onGameOver={handleGameOver} />
        );
    } else if (guessRounds > 0) {
        content = (
            <GameOverScreen
                rounds={guessRounds}
                choice={userNumber}
                onRestart={handleRestart}
            />
        );
    }
    return <SafeAreaView style={styles.container}>{content}</SafeAreaView>;
};

export default App;
