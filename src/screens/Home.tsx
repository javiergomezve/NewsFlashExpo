import { FC } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { gql, useQuery } from 'urql';

import { RootStackParamList } from '../types';
import {
    AllStoriesQuery,
    AllStoriesQueryVariables,
} from '../graphql/__generated__/operationTypes';

const STORIES_QUERY = gql`
    query AllStories {
        stories {
            id
            title
            author
            summary
        }
    }
`;

const Home: FC = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
            renderItem={({ item }) => (
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
            )}
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
    separator: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 40,
    },
});
