import React from 'react';
import { Layout, Typography } from 'antd';
import { ScissorOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header
        style={{
          background: '#ffffff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={3} style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
          <ScissorOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          ShortLink
        </Typography.Title>
      </Header>

      <Content
        style={{
          padding: '48px 24px',
          display: 'flex',
          justifyContent: 'center',
          background: '#f5f5f5',
        }}
      >
        {children}
      </Content>

      <Footer style={{ textAlign: 'center', background: '#ffffff', color: '#999', borderTop: '1px solid #eee' }}>
        ShortLink © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
