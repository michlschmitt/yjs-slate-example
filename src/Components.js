// node_modules
import styled from "@emotion/styled";

export const RoomWrapper = styled.div`
  padding-bottom: 10px;
  border-bottom: 2px solid #e8e8e8;
`;

export const H4 = styled.h4`
  margin: 0;
  padding-right: 10px;
`;

export const Input = styled.input`
  padding: 6px 14px;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 240px;
  outline: none;
  border: 2px solid palevioletred;
  margin-right: auto;
  color: white;
`;

export const Button = styled.button`
  padding: 6px 14px;
  display: block;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  text-align: center;
  color: palevioletred;
  white-space: nowrap;
  border: 2px solid palevioletred;
  & + button {
    margin-left: 10px;
  }
`;

export const IconButton = styled(Button)((props) => ({
  color: props.active ? "mediumvioletred" : "lightpink",
  border: "none",
  padding: 0,
}));

export const Icon = styled.div``;

export const Grid = styled.div`
  display: grid;
  grid-gap: 1vw;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

export const Instance = styled.div`
  background: ${(props) =>
    props.online ? "rgba(0, 0, 0, 0.1)" : "rgba(247, 0, 0, 0.2)"};
  width: 50vw;
  color: white;
`;

export const InstanceInner = styled.div`
  padding: 2rem;
`;

export const ClientFrame = styled.div`
  box-shadow: 2px 2px 4px rgba(128, 128, 128, 0.2);
  padding: 10px;
  min-height: 70px;
  margin-left: -10px;
  margin-right: -10px;
  background: black;
  blockquote {
    border-left: 2px solid #ddd;
    margin-left: 0;
    margin-right: 0;
    padding-left: 10px;
    color: #aaa;
    font-style: italic;
  }
  a {
    color: purple;
    text-decoration: none;
  }
  a:visited {
    color: darkmagenta;
  }
`;
