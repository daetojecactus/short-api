import React, { useState } from 'react';
import { Button, DatePicker, Drawer, Form, Input, message } from 'antd';
import { createShortLink } from '@/api/shortLink';

export function ShortLinkCreateDrawer() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const payload = {
        originalUrl: values.originalUrl,
        alias: values.alias || undefined,
        expiresAt: values.expiresAt?.toISOString(),
      };

      const res = await createShortLink(payload);
      message.success(`Короткая ссылка: ${res.shortUrl}`);
      setOpen(false);
      form.resetFields();
    } catch (err) {
      message.error('Ошибка при создании ссылки');
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Создать ссылку</Button>

      <Drawer title="Создание короткой ссылки" open={open} onClose={() => setOpen(false)} destroyOnClose width={400}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="originalUrl"
            label="Оригинальная ссылка"
            rules={[{ required: true, message: 'Введите оригинальную ссылку' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="alias" label="Пользовательский алиас (опционально)">
            <Input maxLength={20} />
          </Form.Item>

          <Form.Item name="expiresAt" label="Дата окончания действия (опционально)">
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Создать короткую ссылку
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
