import React, { FC, useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { gql, useQuery } from 'urql';

import { StorySummaryFields } from '../graphql/fragments';
import {
    AllBookmarksQuery,
    AllBookmarksQueryVariables,
} from '../graphql/__generated__/operationTypes';
import Story from '../components/Story';

const BOOKMARKS_QUERY = gql`
    query AllBookmarks {
        bookmarks {
            id
            story {
                ...StorySummaryFields
            }
        }
    }

    ${StorySummaryFields}
`;

const BookmarksScreen: FC = () => {
    const [{ data, error, fetching }, refreshBookmarks] = useQuery<
        AllBookmarksQuery,
        AllBookmarksQueryVariables
    >({
        query: BOOKMARKS_QUERY,
    });

    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefreshBookmarks = useCallback(() => {
        setIsRefreshing(true);
        refreshBookmarks({ requestPolicy: 'network-only' });
    }, [refreshBookmarks]);

    useEffect(() => {
        if (!fetching) {
            setIsRefreshing(false);
        }
    }, [fetching]);

    if (fetching && !isRefreshing) {
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
            refreshing={isRefreshing}
            onRefresh={handleRefreshBookmarks}
            contentContainerStyle={styles.flatListContainer}
            data={data?.bookmarks}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => <Story item={item.story} />}
            style={styles.flatList}
        />
    );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
