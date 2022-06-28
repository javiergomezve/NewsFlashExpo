import { FC } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createClient, Provider as UrqlProvider } from 'urql';

import BottomTabNavigator from './src/screens/BottomTasb.navigator';

const client = createClient({
    url: 'https://9228-190-67-220-99.ngrok.io/graphql',
});

const App: FC = () => {
    return (
        <UrqlProvider value={client}>
            <NavigationContainer>
                <StatusBar hidden />
                <BottomTabNavigator />
            </NavigationContainer>
        </UrqlProvider>
    );
};

export default App;
