import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTasb.navigator';
import StoryDetailsModal from './StoryDetailsModal.screen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name="BottomTabs"
                component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}
            />

            <RootStack.Screen
                name="StoryDetailsModal"
                component={StoryDetailsModal}
                options={{ presentation: 'modal' }}
            />
        </RootStack.Navigator>
    );
};

export default RootNavigator;
