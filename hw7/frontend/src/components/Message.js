import styled from "styled-components";
import { Tag } from "antd";

const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
    margin: 8px 10px;

    & p: first-child {
        margin: 0 5px;
    }
    & p: last-child {
        padding: 2px 5px;
        border-radius: 5px;
        background: #eee;
        color: gray;
        margin: auto 0;
    }
`;

const Message = ({ isMe, sender, message }) => {
    return (
        <StyledMessage isMe={isMe}>
            <Tag color={isMe ? "blue" : "magenta"} style={{ margin: "0 8px" }}>
                {sender}
            </Tag>
            <p>{message}</p>
        </StyledMessage>
    );
};

export default Message;