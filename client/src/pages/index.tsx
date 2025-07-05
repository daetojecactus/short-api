import React from 'react';
import { Card, Typography, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { ShortLinkCreateDrawer } from '@/components/ShortLink/ShortLinkActions/ShortLinkCreateDrawer';
import { ShortLinkSearchForm } from '@/components/ShortLink/ShortLinkSearchForm/ShortLinkSearchForm';

export default function IndexPage() {
  const router = useRouter();

  const handleSearch = (alias: string) => {
    router.push(`/${alias}`);
  };

  return (
    <Card style={{ maxWidth: 600, margin: '40px auto' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Typography.Title level={3}>Сервис сокращения ссылок</Typography.Title>

        <ShortLinkSearchForm onSearch={handleSearch} />
        <ShortLinkCreateDrawer />
      </Space>
    </Card>
  );
}
