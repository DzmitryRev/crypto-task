/* eslint-disable import/no-relative-packages */
import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../../../server/src/trpc/router';

const trpc = createReactQueryHooks<AppRouter>();

export default trpc;
