import { FC } from 'react';
import { createClient, Provider as UrqlProvider } from 'urql';

import Stories from './Stories';

const client = createClient({
    url: 'https://9228-190-67-220-99.ngrok.io/graphql',
});

const App: FC = () => {
    return (
        <UrqlProvider value={client}>
            <Stories />
        </UrqlProvider>
    );
};

export default App;
