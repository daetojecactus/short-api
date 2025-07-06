import React from 'react';
import { Button, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface P {
  onSearch: (alias: string) => void;
}

export function ShortLinkSearchForm({ onSearch }: P) {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSearch(values.alias.trim());
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} style={{ width: '100%' }}>
      <Form.Item name="alias" label="Поиск по алиасу" rules={[{ required: true, message: 'Введите алиас' }]}>
        <Input size="large" placeholder="Например: abc123" prefix={<SearchOutlined />} style={{ borderRadius: 8 }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Найти ссылку
        </Button>
      </Form.Item>
    </Form>
  );
}
