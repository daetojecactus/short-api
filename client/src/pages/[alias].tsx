import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Descriptions, Spin, message } from 'antd';
import { getShortLinkInfo } from '@/api/shortLink';
import { ShortLinkDeleteDrawer } from '@/components/ShortLink/ShortLinkActions/ShortLinkDeleteDrawer';
import { getAnalytics } from '@/api/statistics';

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

  if (loading) return <Spin size="large" style={{ marginTop: 100 }} />;

  return (
    <Card title={`Информация по ссылке: ${alias}`} style={{ maxWidth: 800, margin: '40px auto' }}>
      <Descriptions column={1} bordered style={{ marginBottom: 20 }}>
        <Descriptions.Item label="Оригинальный URL">
          <a href={shortLink?.originalUrl} target="_blank" rel="noreferrer">
            {shortLink?.originalUrl}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label="Дата создания">{new Date(shortLink?.createdAt).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="Кликов">{analytics?.count}</Descriptions.Item>
        <Descriptions.Item label="Переходов (IP)">{analytics?.ips?.join(', ') || 'Нет данных'}</Descriptions.Item>
      </Descriptions>
      <ShortLinkDeleteDrawer alias={alias} />
    </Card>
  );
}
