import { Form, Input, Modal, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import "./ModalLogin.scss";
import logo from "src/assets/images/logo.png";
import userAPI from "src/api/user";
import { useDispatch } from "react-redux";
import { login } from "src/redux/auth";
import toast from "react-hot-toast";
type Props = {
  visible: boolean;
  onCancel: () => void;
};

const ModalType = {
  Login: "Login",
  Register: "Register",
  ForgetPassword: "ForgetPassword",
};

const ModalLogin = (props: Props) => {
  const [form] = useForm();
  const dispatch = useDispatch();

  const [modalType, setModalType] = React.useState(ModalType.Login);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const res = await userAPI.login(form.getFieldsValue());
    if (res.errorCode) {
      toast.error(`${res?.data}`, { position: "top-right" });
      setIsLoading(false);
    } else {
      localStorage.setItem("token", res?.data?.token);
      dispatch(login(res?.data));
      props.onCancel();
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);

    const res = await userAPI.register(form.getFieldsValue());
    if (res.errorCode) {
      setIsLoading(false);
      toast.error(`${res?.data}`, { position: "top-right" });
    } else {
      setIsLoading(false);
      localStorage.setItem("token", res?.data?.token);
      dispatch(login(res?.data));
      props.onCancel();
    }
  };

  const handleForgetPassword = () => {
    console.log(form.getFieldsValue);
  };

  return (
    <Modal
      visible={props.visible}
      onCancel={() => {
        props.onCancel();
        setModalType(ModalType.Login);
      }}
      footer={null}
      closable={false}
      className="modal-login"
      width={600}
      destroyOnClose
    >
      <Spin spinning={isLoading}>
        <div className="modal-content">
          <div className="logo">
            <img src={logo} alt="logo" width={100} />
          </div>
          {modalType === ModalType.Login ? (
            <Form form={form} onFinish={handleLogin}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input placeholder="Email" className="custom-input" />
              </Form.Item>
              <Form.Item
                className="password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className="custom-input"
                />
              </Form.Item>
              <div className="forget-password">
                <span onClick={() => setModalType(ModalType.ForgetPassword)}>
                  Forget password?
                </span>
              </div>
              <Form.Item className="btn-submit">
                <button className="btn" type="submit">
                  Login
                </button>
              </Form.Item>
              <div className="register">
                Do not have account?{" "}
                <span onClick={() => setModalType(ModalType.Register)}>
                  Free register
                </span>
              </div>
            </Form>
          ) : modalType === ModalType.Register ? (
            <Form form={form} onFinish={handleRegister}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input placeholder="Email" className="custom-input" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className="custom-input"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Retype password"
                  className="custom-input"
                />
              </Form.Item>
              <Form.Item className="btn-submit">
                <button className="btn" type="submit">
                  Register
                </button>
              </Form.Item>
              <div className="register">
                Already have account?{" "}
                <span onClick={() => setModalType(ModalType.Login)}>Login</span>
              </div>
            </Form>
          ) : (
            <Form form={form} onFinish={handleForgetPassword}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input placeholder="Email" className="custom-input" />
              </Form.Item>
              <Form.Item className="btn-submit">
                <button className="btn" type="submit">
                  Send mail
                </button>
              </Form.Item>
              <div className="register">
                Already have account?{" "}
                <span onClick={() => setModalType(ModalType.Login)}>Login</span>
              </div>
            </Form>
          )}
        </div>
      </Spin>
    </Modal>
  );
};

export default ModalLogin;
