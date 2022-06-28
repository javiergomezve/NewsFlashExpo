import React, { FC } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { gql, useQuery } from 'urql';

import {
    AllStoriesQuery,
    AllStoriesQueryVariables,
} from '../graphql/__generated__/operationTypes';
import { StorySummaryFields } from '../graphql/fragments';
import Story from '../components/Story';

const STORIES_QUERY = gql`
    query AllStories {
        stories {
            ...StorySummaryFields
        }
    }

    ${StorySummaryFields}
`;

const Home: FC = () => {
    const [{ data, error, fetching }] = useQuery<
        AllStoriesQuery,
        AllStoriesQueryVariables
    >({
        query: STORIES_QUERY,
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
        <FlatList
            contentContainerStyle={styles.flatListContainer}
            data={data?.stories}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => <Story item={item} />}
            style={styles.flatList}
        />
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListContainer: {
        paddingVertical: 20,
    },
    flatList: {
        paddingHorizontal: 20,
    },
    separator: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 40,
    },
});
