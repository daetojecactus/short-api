import React from 'react';
import { Typography, Space } from 'antd';
import { useRouter } from 'next/router';
import { ShortLinkCreateDrawer } from '@/components/ShortLink/ShortLinkActions/ShortLinkCreateDrawer';
import { ShortLinkSearchForm } from '@/components/ShortLink/ShortLinkSearchForm/ShortLinkSearchForm';

export default function IndexPage() {
  const router = useRouter();

  const handleSearch = (alias: string) => {
    router.push(`/${alias}`);
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
        <Typography.Title level={2}>Сервис сокращения ссылок</Typography.Title>
        <ShortLinkSearchForm onSearch={handleSearch} />
        <ShortLinkCreateDrawer />
      </Space>
    </>
  );
}
