import { Link, useLocation } from 'react-router-dom';
import { Button } from 'crypto-components';
import usePortfolio from '../../hooks/usePortfolio';
import StyledHeader from './StyledHeader';
import trpc from '../../services/trpc.service';

export default function Header() {
  const { sum, profit } = usePortfolio();

  const { data } = trpc.useQuery(['assets', { offset: 0, limit: 3 }]);
  const topAssets = data?.data;

  const location = useLocation();

  return (
    <StyledHeader>
      {topAssets && (
        <div className="top-curr-container">
          {topAssets?.map((item) => (
            <Link to={`asset/${item.id}`} key={item.id}>
              <div className="top-curr">
                {item.name}
                <span
                  className={`top-curr-profit ${
                    +item.changePercent24Hr < 0 ? 'color-red' : 'color-green'
                  }`}
                >
                  {(+item.changePercent24Hr).toFixed(2)}
                  %
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div>
        {!!sum && (
          <>
            <h4>{sum.toFixed(2)}</h4>
            {' '}
            <h4>
              {profit.toFixed(2) || ''}
              (
              {`${((profit / sum) * 100).toFixed(2)}%` || ''}
              )
            </h4>
          </>
        )}
      </div>
      <div>
        <Button<typeof Link>
          data-cy-id="portfolio-link"
          color="blue"
          as={Link}
          to={`${location.pathname}${location.pathname === '/' ? '' : '/'}portfolio`}
          state={{ prevLocation: location.pathname }}
        >
          portfolio
        </Button>
      </div>
    </StyledHeader>
  );
}
