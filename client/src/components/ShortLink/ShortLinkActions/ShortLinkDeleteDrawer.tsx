import React, { useState } from 'react';
import { Button, Drawer, message, Space } from 'antd';
import { deleteShortLink } from '@/api/shortLink';

interface Props {
  alias: string;
}

export function ShortLinkDeleteDrawer({ alias }: Props) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteShortLink(alias);
      message.success('Ссылка удалена');
      setOpen(false);
    } catch {
      message.error('Ошибка удаления');
    }
  };

  return (
    <>
      <Button danger onClick={() => setOpen(true)}>
        Удалить
      </Button>

      <Drawer title="Удаление короткой ссылки" open={open} onClose={() => setOpen(false)} destroyOnClose width={400}>
        <p>
          Вы действительно хотите удалить ссылку <strong>{alias}</strong>?
        </p>

        <Space>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button danger onClick={handleDelete}>
            Удалить
          </Button>
        </Space>
      </Drawer>
    </>
  );
}
