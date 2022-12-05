import styled from "styled-components";
import { Badge } from 'antd';

const StyledTabBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ChatTabBar = ({ label, notice }) => {
    return (
        <StyledTabBar>
            <p style={{ margin: 0 }}>{label}</p>
            <Badge count={notice} offset={[5, 0]}/>
        </StyledTabBar>
    );
}

export default ChatTabBar;