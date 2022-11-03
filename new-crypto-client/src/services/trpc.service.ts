import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "new-crypto-server/src/trpc/router";

const trpc = createReactQueryHooks<AppRouter>();

export default trpc;
