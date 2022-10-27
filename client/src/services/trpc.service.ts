import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from 'crypto-server/src/trpc/router';

const trpc = createReactQueryHooks<AppRouter>();

export default trpc;
