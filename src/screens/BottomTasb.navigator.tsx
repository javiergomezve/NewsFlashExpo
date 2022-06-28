import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabParamList } from '../types';
import Home from './Home';
import BookmarksScreen from './Bookmarks.screen';

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: FC = () => {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen name="Home" component={Home} />
            <BottomTabs.Screen name="Bookmarks" component={BookmarksScreen} />
        </BottomTabs.Navigator>
    );
};

export default BottomTabNavigator;
