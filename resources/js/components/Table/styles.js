import styled from 'styled-components';

export const Container = styled.div`
  div.search {
    margin: 0 0 8px 0;
    input {
      border: 1px solid #ddd;
      font-size: 14px;
    }
  }
  table {
    font-size: 14px;

    border-spacing: 0;
    border: 1px solid #ddd;
    width: 100%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.3rem;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;

      :last-child {
        border-right: 0;
      }

      > button {
        width: 100%;
      }
    }
    th {
      padding: 0.5rem;
      div {
        display: grid;
        grid-template-columns: auto 5px;
        align-self: center;
      }
    }
  }
  .arrow {
    display: block;
    width: 0px;
    height: 0px;
    margin: 3px 0;
    border: 5px solid transparent;
  }
  .arrow.arrow-up {
    border-bottom-color: #aaa;
    border-top-width: 0px;
  }
  .arrow.arrow-down {
    border-top-color: #aaa;
    border-bottom-width: 0px;
  }
  div.paginate {
    margin: 10px 0 0 0;
    button {
      border: 1px solid #ddd;
      color: #337ab7;
      padding: 0.9em;
      font-size: 0.8em;
      :disabled {
        color: #ddd;
        cursor: auto;
      }
    }
    input,
    span,
    select {
      font-size: 1em;
    }
    input {
      width: 3em;
      height: 2em;
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 10%;
    }
  }
`;
