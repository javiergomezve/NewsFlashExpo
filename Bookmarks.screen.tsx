import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BookmarksScreen: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Bookmarks</Text>
        </View>
    );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
