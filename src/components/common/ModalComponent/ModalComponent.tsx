/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  isEditMode?: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  visible,
  onClose,
  onSubmit,
  initialValues,
  isEditMode = false,
}) => {
  const [form] = Form.useForm();

  // Reset form values when opening the modal
  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue(initialValues || {});
    }
  }, [visible, form, initialValues]);

  return (
    <Modal
      title={isEditMode ? "Edit User" : "Create New User"}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
        >
          {isEditMode ? "Update" : "Submit"}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="Please enter first name" />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input placeholder="Please enter last name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Please enter email" />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Profile Image Link"
          rules={[{ required: true, message: "Please enter profile image link" }]}
        >
          <Input placeholder="Please enter profile image link" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
