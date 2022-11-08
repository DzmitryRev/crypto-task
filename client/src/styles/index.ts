import styled from 'styled-components';

// wrapper
export const StyledWrapper = styled.div`
  max-width: 1280px;
  padding: 0 10px;
  margin: 0 auto;
`;

export const StyledAssetInfo = styled.div`
  padding: 0 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 20px;
    font-weight: 500;
  }
  @media screen and (max-width: 868px) {
    padding: 0;
  }
  @media screen and (max-width: 498px) {
    flex-direction: column;
    align-items: start;
    .back-link,
    .change-block {
      margin-bottom: 10px;
    }
  }
`;

// buy asset page (inside modal)

export const StyledBuyAsset = styled.div`
  .buy-asset-name {
    margin-bottom: 5px;
  }
  .buy-asset-price {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 30px;
  }
  .buy-asset-input-container {
    margin-bottom: 15px;
    input {
      width: 150px;
      font-size: 22px;
      border: 1px solid #333;
      margin: 0 20px 20px 0;
    }
  }
  .buy-asset-total {
    font-size: 16px;
    font-weight: 700;
  }
`;

//

export const StyledError = styled.div`
  text-align: center;
  h4 {
    padding: 20px;
  }
`;
