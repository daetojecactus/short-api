import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Descriptions, Spin, Typography, message, Button, Space, Divider, Layout } from 'antd';
import { CopyOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { getShortLinkInfo } from '@/api/shortLink';
import { getAnalytics } from '@/api/statistics';
import { ShortLinkDeleteDrawer } from '@/components/ShortLink/ShortLinkActions/ShortLinkDeleteDrawer';

const { Content } = Layout;

export default function ShortLinkDetailsPage() {
  const router = useRouter();
  const alias = router.query.alias as string;

  const [shortLink, setShortLink] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!alias) return;
    (async () => {
      try {
        const shortLinkRes = await getShortLinkInfo(alias);
        const analyticsRes = await getAnalytics(alias);
        setShortLink(shortLinkRes);
        setAnalytics(analyticsRes);
      } catch (err) {
        message.error('Ошибка при получении данных');
      } finally {
        setLoading(false);
      }
    })();
  }, [alias]);

  const handleCopy = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_API_URL + '/' + alias);
    message.success('Ссылка скопирована!');
  };

  const handleBack = () => {
    router.push('/');
  };

  if (loading)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );

  return (
    <Content style={{ padding: '40px 24px', display: 'flex', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 800, width: '100%', padding: 24, borderRadius: 12 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Typography.Title level={2}>Информация о ссылке</Typography.Title>

          <Descriptions column={1} bordered>
            <Descriptions.Item label="Короткая ссылка">
              <Space>
                <a href={shortLink?.originalUrl} target="_blank" rel="noreferrer">
                  {process.env.NEXT_PUBLIC_API_URL}/{alias}
                </a>
                <Button icon={<CopyOutlined />} onClick={handleCopy} size="small" />
              </Space>
            </Descriptions.Item>

            <Descriptions.Item label="Оригинальный URL">
              <a href={shortLink?.originalUrl} target="_blank" rel="noreferrer">
                {shortLink?.originalUrl}
              </a>
            </Descriptions.Item>

            <Descriptions.Item label="Дата создания">
              {new Date(shortLink?.createdAt).toLocaleString()}
            </Descriptions.Item>

            <Descriptions.Item label="Кликов">{analytics?.count ?? '—'}</Descriptions.Item>

            <Descriptions.Item label="Последние IP-адреса">
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{analytics?.ips?.join('\n') || 'Нет данных'}</pre>
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
              На главную
            </Button>
            <ShortLinkDeleteDrawer alias={alias} />
          </Space>
        </Space>
      </Card>
    </Content>
  );
}
