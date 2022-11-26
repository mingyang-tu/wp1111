import styled from "styled-components";
import { Tag } from "antd";

const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({ isMe }) => (isMe ? "row-reverse" : "row")};
    margin: 10px;

    > p {
        margin: 0;
        padding: 2px 5px;
        border-radius: 5px;
        background: ${({ isMe }) => (isMe ? "#1890ff" : "#eeeeee")};
        color: ${({ isMe }) => (isMe ? "white" : "black")};
        overflow-wrap: break-word;
        max-width: 75%;
    }
`;

const StyledTag = styled(Tag)`
    max-width: 15%;
    overflow-wrap: break-word;
    white-space: normal;
`;

const Message = ({ isMe, sender, message }) => {
    return (
        <StyledMessage isMe={isMe}>
            <StyledTag color={isMe ? "blue" : "magenta"}  style={{ margin: "0 8px" }}>
                {sender}
            </StyledTag>
            <p>{message}</p>
        </StyledMessage>
    );
};

export default Message;