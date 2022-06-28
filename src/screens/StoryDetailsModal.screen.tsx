import { FC } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/core';
import { useQuery, gql } from 'urql';

import { RootStackParamList } from '../types';

const STORY_BY_ID = gql`
    query StoryById($id: ID!) {
        story(id: $id) {
            id
            title
            author
            summary
            text
        }
    }
`;

const StoryDetailsModal: FC = () => {
    const route =
        useRoute<RouteProp<RootStackParamList, 'StoryDetailsModal'>>();

    const [{ data, fetching, error }] = useQuery({
        query: STORY_BY_ID,
        variables: {
            id: route.params.id,
        },
    });

    if (fetching) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color="gray" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Something went wrong</Text>
                <Text>{error.message}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.author}>by: {data.story.author}</Text>
            <Text style={styles.summary}>{data.story.summary}</Text>
            <Text style={styles.text}>{data.story.text}</Text>
        </ScrollView>
    );
};

export default StoryDetailsModal;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    scrollView: {
        padding: 20,
    },
    author: {
        fontStyle: 'italic',
        fontSize: 16,
        color: 'grey',
        marginBottom: 20,
    },
    summary: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 25,
        textAlign: 'justify',
    },
    text: {
        fontSize: 16,
        lineHeight: 25,
        textAlign: 'justify',
    },
});
