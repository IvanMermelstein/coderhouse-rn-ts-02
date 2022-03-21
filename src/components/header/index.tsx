import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

interface HeaderProps {
    title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

export default Header;
