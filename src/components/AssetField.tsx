import React from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from './Link';

type AssetFieldPropsType = {
  id: string,
  name: string,
  symbol: string,
  price: string,
  changePerDay: string
};

function AssetField({
  id, name, symbol, price, changePerDay,
}: AssetFieldPropsType) {
  return (
    <tr>
      <td className="name-td"><Link to={`asset/${id}`}>{name}</Link></td>
      <td className="symbol-td">{symbol}</td>
      <td className="price-td" title={price}>{Number(price).toFixed(2)}</td>
      <td className="change-td" title={changePerDay}>{Number(changePerDay).toFixed(2)}</td>
      <td>
        <ButtonLink
          color="green"
          path={`buy/${id}`}
        >
          add
        </ButtonLink>
      </td>
    </tr>
  );
}

export default AssetField;
