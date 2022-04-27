import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import config from '@app/config';

export const CreateApolloClient = (token: string) => {
    const httpLink = createHttpLink({
        uri: config.BACKEND_URL,
        credentials: 'include',
    });

    const authLink = setContext((_: any, { headers }: any) => ({
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    }));

    const link = authLink.concat(httpLink);

    return new ApolloClient({
        link,
        // ssrMode: true,
        cache: new InMemoryCache({
            // addTypename: false,
        }),
    });
};
