console.log({ starting: true });

import express from 'express';
const app = express();
import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType,GraphQLID, GraphQLString,GraphQLNonNull } from 'graphql';

//Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'The root query',
    fields: {
        viewer: {
            type: GraphQLString,
            resolve() {
                return 'viewer!';
            }
        }
    }
});


//Root Mutation
let inMemoryStore = {};
const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'The root mutation',
    fields: {
        setNode: {
            type: GraphQLString,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                value: {
                    type: new GraphQLNonNull(GraphQLString),
                }
            },
            resolve(source, args) {
                inMemoryStore[args.key] = args.value;
                return inMemoryStore[args.key];
            }
        }
    }
});
const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
app.use('/graphql', graphqlHTTP({ schema: Schema, graphiql: true }));
app.listen(3000, () => {
    console.log({ running: true });
});