import React, { FC } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { gql, useMutation } from 'urql';

import { RootStackParamList } from '../types';
import {
    StorySummaryFieldsFragment,
    AddBookMarkMutation,
    AddBookMarkMutationVariables,
} from '../graphql/__generated__/operationTypes';

const ADD_BOOKMARK_MUTATION = gql`
    mutation AddBookMark($storyId: ID!) {
        addBookmark(storyId: $storyId) {
            id
            story {
                id
                title
                bookmarkId
            }
        }
    }
`;

const Story: FC<{ item: StorySummaryFieldsFragment }> = ({ item }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [{ fetching: isAddingBookmark }, addBookmark] = useMutation<
        AddBookMarkMutation,
        AddBookMarkMutationVariables
    >(ADD_BOOKMARK_MUTATION);

    return (
        <Pressable
            onPress={() =>
                navigation.navigate('StoryDetailsModal', {
                    id: item.id,
                    title: item.title,
                })
            }
        >
            <View style={styles.row}>
                <Text style={styles.title}>
                    {item.title} {item.bookmarkId ? '🔖' : ''}
                </Text>

                {!item.bookmarkId && !isAddingBookmark && (
                    <Pressable
                        onPress={() => addBookmark({ storyId: item.id })}
                    >
                        <Text>Add bookmark</Text>
                    </Pressable>
                )}

                {isAddingBookmark && <ActivityIndicator />}
            </View>
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
    },
    summary: {
        fontSize: 18,
        color: 'grey',
    },
    row: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
