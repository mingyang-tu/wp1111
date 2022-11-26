import styled from "styled-components";
import { Tag } from "antd";

const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({ isMe }) => (isMe ? "row-reverse" : "row")};
    margin: 10px;

    & p {
        margin: 0 10px;
        padding: 2px 5px;
        border-radius: 5px;
        background: ${({ isMe }) => (isMe ? "#1890ff" : "#eeeeee")};
        color: ${({ isMe }) => (isMe ? "white" : "black")};
    }
`;

const Message = ({ isMe, sender, message }) => {
    return (
        <StyledMessage isMe={isMe}>
            <Tag color={isMe ? "blue" : "magenta"}  style={{ margin: 0 }}>
                {sender}
            </Tag>
            <p>{message}</p>
        </StyledMessage>
    );
};

export default Message;