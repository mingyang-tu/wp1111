import { Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 15pt
`;

const Login = ({ me, setName, password, setPassword, onLogin, onSignup }) => {
    return (
        <>
            <Input
                size="large"
                style={{ width: 300, marginTop: 50 }}
                prefix={<UserOutlined style={{ marginRight: 5 }} />}
                placeholder="Username"
                value={me}
                onChange={(e) => { setName(e.target.value) }}
            />
            <Input.Search
                type="password"
                size="large"
                style={{ width: 300, marginTop: 25 }}
                prefix={<LockOutlined style={{ marginRight: 5 }} />}
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                enterButton="Sign In"
                onSearch={() => { onLogin() }}
            />
            <Wrapper>
                <p style={{ margin: 0 }}>Don't have an account?</p>
                <Button type="link" onClick={onSignup}>Sign Up</Button>
            </Wrapper>
        </>
    );
}

export default Login;