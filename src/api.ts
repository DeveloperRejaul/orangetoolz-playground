import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

class Api {
    async getUser(path: string) {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/${path}`);
            return {
                type: 'seccess',
                data: await res.json(),
            };
        } catch (error) {
            return {
                type: 'error',
                data: error,
            };
        }

    }
}

export const api = new Api();




export const rtkapi = createApi({
  reducerPath: 'rtkapi',
  baseQuery: graphqlRequestBaseQuery({
    url: 'https://flyby-router-demo.herokuapp.com/',
  }),
  endpoints: () => ({}),
});
