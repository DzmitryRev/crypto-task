/* eslint-disable linebreak-style */
import React, { PropsWithChildren } from "react";

export default function TableRow({ children }: PropsWithChildren) {
  return <tr data-testid="table-row">{children}</tr>;
}
