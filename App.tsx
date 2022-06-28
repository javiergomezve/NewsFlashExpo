import { FC } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
    createClient,
    dedupExchange,
    fetchExchange,
    Provider as UrqlProvider,
} from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

import schema from './src/graphql/graphql.schema.json';
import RootNavigator from './src/screens/Root.navigator';

const client = createClient({
    url: 'https://0bbb-190-67-220-99.ngrok.io/graphql',
    exchanges: [
        dedupExchange,
        cacheExchange({
            schema: schema as any,
            resolvers: {
                Query: {
                    story: (_, args) => ({ __typename: 'Story', id: args.id }),
                },
            },
        }),
        fetchExchange,
    ],
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
