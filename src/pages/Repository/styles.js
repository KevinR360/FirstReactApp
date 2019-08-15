import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
  }
`;

export const IssueState = styled.div.attrs(props => ({
  disable: props.state,
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  button {
    margin-left: 10px;
    height: 40px;
    width: 80px;
    border: none;
    background: #7159c1;
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
    }
  }

  ${props =>
    props.state === 'all' &&
    css`
      button:nth-of-type(1) {
        background #3BD9A1;
      }
    `}


  ${props =>
    props.state === 'open' &&
    css`
      button:nth-of-type(2) {
        background #3BD9A1;
      }
    `}


  ${props =>
    props.state === 'closed' &&
    css`
      button:nth-of-type(3) {
        background #3BD9A1;
      }
    `}
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 20px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Pagination = styled.div.attrs(props => ({
  disable: props.pageState,
}))`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-top: 20px;

  button {
    border: 1px solid #eee;
    width: auto;
    height: 50px;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    background: none;
    font-size: 30px;
    color: #7159c1;
    padding: 5px 0;

    border-radius: 25px 0 0 25px;

    &:hover {
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
    }
  }

  ${props =>
    props.pageState === 1 &&
    css`
      button:nth-of-type(1) {
        cursor: not-allowed;
        opacity: 0.6;

        &:hover {
          background: none;
          box-shadow: none;
        }
      }
    `}

  button:nth-of-type(2) {
    border-radius: 0 25px 25px 0;
  }
`;
