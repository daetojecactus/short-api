import React, { useState } from 'react';
import { Button, Drawer, Space, Typography, notification } from 'antd';
import { deleteShortLink } from '@/api/shortLink';
import { useRouter } from 'next/router';

interface P {
  alias: string;
}

export function ShortLinkDeleteDrawer({ alias }: P) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const handleDelete = async () => {
    try {
      await deleteShortLink(alias);

      api.success({
        message: 'Ссылка удалена',
        description: `Алиас ${alias} успешно удалён.`,
        duration: 4,
      });

      setOpen(false);
      if (router.pathname === '/[alias]') {
        setTimeout(() => router.push('/'), 500);
      }
    } catch {
      api.error({
        message: 'Ошибка',
        description: 'Не удалось удалить ссылку. Попробуйте позже.',
        duration: 4,
      });
    }
  };

  return (
    <>
      {contextHolder}

      <Button danger onClick={() => setOpen(true)}>
        Удалить
      </Button>

      <Drawer title="Удаление короткой ссылки" open={open} onClose={() => setOpen(false)} destroyOnClose width={400}>
        <Typography.Paragraph>
          Вы уверены, что хотите удалить ссылку <Typography.Text strong>{alias}</Typography.Text>?
        </Typography.Paragraph>

        <Space>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button type="primary" danger onClick={handleDelete}>
            Удалить
          </Button>
        </Space>
      </Drawer>
    </>
  );
}
