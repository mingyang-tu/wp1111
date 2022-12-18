import { Modal, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const SignUpModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Create your account"
            okText="Sign up"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((e) => {
                    if (e.errorFields) {
                        window.alert(e.errorFields[0].errors);
                    }
                    else {
                        window.alert(e);
                    }
                });
            }}
        >
            <Form form={form} layout="vertical" name="form_in_modal">
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{
                        required: true,
                        message: "Error: Please enter your username!"
                    }]}
                >
                    <Input
                        prefix={<UserOutlined style={{ marginRight: 5 }} />}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{
                        required: true,
                        message: "Error: Please enter your password!"
                    }]}
                >
                    <Input
                        type="password"
                        prefix={<LockOutlined style={{ marginRight: 5 }} />}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default SignUpModal;