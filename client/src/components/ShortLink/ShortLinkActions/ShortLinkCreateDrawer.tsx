import React, { useState } from 'react';
import { Button, DatePicker, Drawer, Form, Input, notification } from 'antd';
import { createShortLink } from '@/api/shortLink';
import dayjs from 'dayjs';

export function ShortLinkCreateDrawer() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: any) => {
    try {
      const payload = {
        originalUrl: values.originalUrl,
        alias: values.alias?.trim() || undefined,
        expiresAt: values.expiresAt?.toISOString(),
      };

      const response = await createShortLink(payload);

      api.success({
        message: 'Ссылка создана!',
        description: (
          <span>
            Короткая ссылка:{' '}
            <a href={response.shortUrl} target="_blank" rel="noreferrer">
              {response.shortUrl}
            </a>
          </span>
        ),
        duration: 5,
      });

      form.resetFields();
      setOpen(false);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || 'Ошибка при создании ссылки';
      api.error({
        message: 'Ошибка',
        description: errorMsg,
        duration: 4,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={() => setOpen(true)}>
        Создать ссылку
      </Button>

      <Drawer title="Создание короткой ссылки" open={open} onClose={() => setOpen(false)} destroyOnClose width={420}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="originalUrl"
            label="Оригинальная ссылка"
            rules={[
              { required: true, message: 'Введите оригинальную ссылку' },
              { type: 'url', message: 'Введите корректный URL' },
            ]}
          >
            <Input placeholder="https://example.com" />
          </Form.Item>

          <Form.Item
            name="alias"
            label="Пользовательский алиас (необязательно)"
            rules={[
              { max: 20, message: 'Максимум 20 символов' },
              {
                pattern: /^[a-zA-Z0-9_-]*$/,
                message: 'Допустимы только буквы, цифры, "-" и "_"',
              },
            ]}
          >
            <Input placeholder="например, link123" />
          </Form.Item>

          <Form.Item name="expiresAt" label="Срок действия (необязательно)">
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm"
              disabledDate={current => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Сократить ссылку
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
