import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Layout as AntLayout, Menu, Input, Space } from 'antd'
import { SearchOutlined, HomeOutlined, AppstoreOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Header, Content, Footer } = AntLayout

export default function Layout() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`)
      setSearchValue('')
    }
  }

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
    { key: 'browse', icon: <AppstoreOutlined />, label: <Link to="/browse">浏览</Link> },
    { key: 'contribute', icon: <PlusOutlined />, label: <Link to="/contribute">贡献</Link> },
  ]

  return (
    <AntLayout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Header
        style={{
          background: 'linear-gradient(180deg, #8b4513 0%, #654321 100%)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          padding: '0 24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/lotus.svg" alt="logo" style={{ width: 40, height: 40 }} />
            <span style={{ color: '#fff', fontSize: 22, fontWeight: 600, letterSpacing: 2 }}>
              佛教文化百科
            </span>
          </Link>

          <Space size={24}>
            <Input
              placeholder="搜索佛、菩萨、罗汉..."
              prefix={<SearchOutlined style={{ color: '#999' }} />}
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 260, borderRadius: 20 }}
            />
            <Menu
              mode="horizontal"
              selectedKeys={[]}
              items={menuItems}
              style={{
                background: 'transparent',
                border: 'none',
                lineHeight: '64px',
              }}
              theme="dark"
            />
          </Space>
        </div>
      </Header>

      <Content style={{ background: 'transparent' }}>
        <div style={{ padding: '24px 0', minHeight: 'calc(100vh - 200px)' }}>
          <Outlet />
        </div>
      </Content>

      <Footer
        style={{
          background: 'linear-gradient(180deg, #654321 0%, #4a3728 100%)',
          color: '#d4c4a8',
          textAlign: 'center',
          padding: '24px',
          marginTop: 40,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ marginBottom: 8, fontSize: 16 }}>
            佛教文化百科 BuddhaInfo
          </p>
          <p style={{ fontSize: 13, opacity: 0.8 }}>
            传承佛教文化，弘扬佛法智慧
          </p>
        </div>
      </Footer>
    </AntLayout>
  )
}
