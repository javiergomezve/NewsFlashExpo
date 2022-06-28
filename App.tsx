import { FC } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createClient, Provider as UrqlProvider } from 'urql';

import RootNavigator from './src/screens/Root.navigator';

const client = createClient({
    url: 'https://9228-190-67-220-99.ngrok.io/graphql',
});

const App: FC = () => {
    return (
        <UrqlProvider value={client}>
            <NavigationContainer>
                <StatusBar hidden />
                <RootNavigator />
            </NavigationContainer>
        </UrqlProvider>
    );
};

export default App;
