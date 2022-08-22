import { DatePicker, Form, Input, InputNumber, Radio, Tabs } from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import React, { useEffect } from "react";
import { FaBoxes, FaLock, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRouting from "src/hooks/UseRouting";
import { logout } from "src/redux/auth";
import { deleteAllCart } from "src/redux/cart";
import History from "./components/History";
import userAPI from "src/api/user";
import "./Profile.scss";
import { login } from "src/redux/auth";

type Props = {};

const Profile = (props: Props) => {
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  const { generate } = useRouting();
  const [form] = useForm();
  const dispatch = useDispatch();

  const [isEditProfile, setIsEditProfile] = React.useState(false);
  
  const handleChangeProfile = async () => {
    let formData = form.getFieldsValue();
    formData.birthday = moment(formData.birthday).format("DD/MM/YYYY")
    let res = await userAPI.update(formData, user.token);
    if(!res.errorCode){
      setIsEditProfile(false)
      const token = localStorage.getItem("token")
      res.data.token = token
      dispatch(login(res.data))
    }
  };

  const handleChangePassword = () => {};

  const handleChange = (key: string) => {
    if (key === "4") {
      dispatch(logout());
      dispatch(deleteAllCart())
      navigate(generate("home"));
    }
  };

  useEffect(() => {
    if (user) {
      //navigate(generate('home'))
      if (!isEditProfile) {
        form.setFieldsValue({
          ...user,
          birthday: moment(user.birthday),
        });
      }
    }
  }, [user, navigate, generate, isEditProfile, form]);
  return (
    <div className="profile">
      <Tabs
        defaultActiveKey="profile"
        tabPosition={"left"}
        onChange={handleChange}
      >
        <Tabs.TabPane
          tab={
            <span>
              <FaUserAlt />
              Profile
            </span>
          }
          key="1"
        >
          <Form form={form} labelCol={{ span: 3 }}>
            <Form.Item
              name="email"
              label="Email"
              initialValue={user.email ?? ""}
            >
              <Input readOnly className={`custom-input read-only-input`} />
            </Form.Item>
            <Form.Item name="name" label="Name" initialValue={user.name ?? ""}>
              <Input
                placeholder="Full name"
                className={`custom-input ${
                  !isEditProfile && "read-only-input"
                }`}
                readOnly={!isEditProfile}
              />
            </Form.Item>
            <Form.Item
              name="birthday"
              label="Date of birth"
            >
              <DatePicker
                format={"DD/MM/YYYY"}
                className={`custom-input ${
                  !isEditProfile && "read-only-input"
                }`}
                disabled={!isEditProfile}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              initialValue={user.gender ?? "male"}
            >
              <Radio.Group>
                <Radio value={"male"} disabled={!isEditProfile}>
                  Male
                </Radio>
                <Radio value={"female"} disabled={!isEditProfile}>
                  Female
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              initialValue={user.phone ?? ""}
            >
              <InputNumber
                placeholder="Phone number"
                className={`custom-input ${
                  !isEditProfile && "read-only-input"
                }`}
                readOnly={!isEditProfile}
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="Adress"
              initialValue={user.address ?? ""}
            >
              <Input
                placeholder="Address"
                className={`custom-input ${
                  !isEditProfile && "read-only-input"
                }`}
                readOnly={!isEditProfile}
              />
            </Form.Item>
            <div className="btn-group">
              {isEditProfile && (
                <button
                  className="btn outline-btn"
                  onClick={() => setIsEditProfile(false)}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="btn"
                onClick={
                  isEditProfile
                    ? () => handleChangeProfile()
                    : () => setIsEditProfile(true)
                }
              >
                {isEditProfile ? "Save" : "Edit"}
              </button>
            </div>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaLock />
              Password
            </span>
          }
          key="2"
        >
          <Form
            form={form}
            onFinish={handleChangePassword}
            labelCol={{ span: 3 }}
          >
            <Form.Item name="oldPassword" label="Old password">
              <Input.Password
                placeholder="Old password"
                className="custom-input"
              />
            </Form.Item>
            <Form.Item name="newPassword" label="New password">
              <Input.Password
                placeholder="New password"
                className="custom-input"
              />
            </Form.Item>
            <Form.Item name="confirmPassword" label="Confirm password">
              <Input.Password
                placeholder="Confirm password"
                className="custom-input"
              />
            </Form.Item>
            <div className="btn-group">
              <button type="submit" className="btn">
                Change
              </button>
            </div>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaBoxes />
              History
            </span>
          }
          key={"3"}
        >
          <History />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaSignOutAlt />
              Logout
            </span>
          }
          key={"4"}
        ></Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
