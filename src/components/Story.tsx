import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import { StorySummaryFieldsFragment } from '../graphql/__generated__/operationTypes';

const Story: FC<{ item: StorySummaryFieldsFragment }> = ({ item }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <Pressable
            onPress={() =>
                navigation.navigate('StoryDetailsModal', {
                    id: item.id,
                    title: item.title,
                })
            }
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
        </Pressable>
    );
};

export default Story;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 10,
    },
    summary: {
        fontSize: 18,
        color: 'grey',
    },
});
