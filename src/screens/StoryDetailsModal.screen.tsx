import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StoryDetailsModal: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Story details</Text>
        </View>
    );
};

export default StoryDetailsModal;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
