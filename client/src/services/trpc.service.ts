/* eslint-disable linebreak-style */
import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from 'server/src/trpc/router';

const trpc = createReactQueryHooks<AppRouter>();

export default trpc;
