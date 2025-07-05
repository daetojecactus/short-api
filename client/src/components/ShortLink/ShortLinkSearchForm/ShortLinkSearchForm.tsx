import React from 'react';
import { Button, Form, Input } from 'antd';

interface P {
  onSearch: (alias: string) => void;
}

export function ShortLinkSearchForm({ onSearch }: P) {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSearch(values.alias);
  };

  return (
    <Form form={form} layout="inline" onFinish={handleFinish}>
      <Form.Item name="alias" rules={[{ required: true, message: 'Введите алиас' }]}>
        <Input placeholder="Введите алиас" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Найти
        </Button>
      </Form.Item>
    </Form>
  );
}
