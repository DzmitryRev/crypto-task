import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

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
        <Link to={`buy/${id}`}>
          <Button color="green">add</Button>
        </Link>
      </td>
    </tr>
  );
}

export default AssetField;
