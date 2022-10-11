import React from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from '../Link/Link';

type AssetTableRowPropsType = {
  id: string;
  name: string;
  symbol: string;
  price: string;
  changePerDay: string;
};

function AssetTableRow({
  id, name, symbol, price, changePerDay,
}: AssetTableRowPropsType) {
  return (
    <tr data-testid="table-row">
      <td className="name-td">
        <Link to={`asset/${id}`}>{name}</Link>
      </td>
      <td className="symbol-td">{symbol}</td>
      <td className="price-td" title={price}>
        {Number(price).toFixed(2)}
      </td>
      <td className="change-td" title={changePerDay}>
        {Number(changePerDay).toFixed(2)}
        %
      </td>
      <td>
        <ButtonLink color="green" path={`buy/${id}`}>
          add
        </ButtonLink>
      </td>
    </tr>
  );
}

export default AssetTableRow;
