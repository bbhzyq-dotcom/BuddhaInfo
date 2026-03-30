import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Spin, Alert, Tag, Button, Breadcrumb } from 'antd'
import { ArrowLeftOutlined, BookOutlined, HistoryOutlined } from '@ant-design/icons'
import { characterApi } from '../services/api'
import type { CharacterDetail } from '../types'

const categoryColors: Record<string, string> = {
  '佛': '#c41e3a',
  '菩萨': '#1e90ff',
  '罗汉': '#228b22',
  '护法': '#ff8c00',
  '其他': '#888888',
}

export default function Detail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [character, setCharacter] = useState<CharacterDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    characterApi
      .getById(parseInt(id))
      .then(setCharacter)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', paddingTop: 100 }}>
        <Spin size="large" />
      </div>
    )
  }

  if (error || !character) {
    return (
      <div className="page-container">
        <Alert type="error" message={error || '角色不存在'} />
        <Button onClick={() => navigate(-1)} style={{ marginTop: 16 }}>
          返回
        </Button>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Breadcrumb
        items={[
          { title: <a onClick={() => navigate('/')}>首页</a> },
          { title: <a onClick={() => navigate('/browse')}>浏览</a> },
          { title: character.name },
        ]}
        style={{ marginBottom: 24 }}
      />

      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 24 }}
      >
        返回
      </Button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }}>
        <div>
          <Card
            style={{ marginBottom: 24 }}
            cover={
              <div
                style={{
                  height: 200,
                  background: `linear-gradient(135deg, ${categoryColors[character.category]}33 0%, ${categoryColors[character.category]}66 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 80,
                  color: categoryColors[character.category],
                }}
              >
                {character.category === '佛' ? '佛' : 
                 character.category === '菩萨' ? '萨' : 
                 character.category === '罗汉' ? '罗汉' : 
                 character.category === '护法' ? '护' : '其他'}
              </div>
            }
          >
            <Card.Meta
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{character.name}</span>
                  <Tag color={categoryColors[character.category]}>
                    {character.category}
                  </Tag>
                </div>
              }
            />
          </Card>

          <Card title="简介" style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 16, lineHeight: 1.8 }}>{character.summary}</p>
          </Card>

          {character.story && (
            <Card
              title={
                <span>
                  <HistoryOutlined style={{ marginRight: 8 }} />
                  典故故事
                </span>
              }
              style={{ marginBottom: 24 }}
            >
              <p style={{ fontSize: 15, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {character.story}
              </p>
            </Card>
          )}

          {character.scripture && (
            <Card
              title={
                <span>
                  <BookOutlined style={{ marginRight: 8 }} />
                  相关经典
                </span>
              }
            >
              <p style={{ fontSize: 15, lineHeight: 1.8 }}>{character.scripture}</p>
            </Card>
          )}
        </div>

        <div>
          <Card title="基本信息" style={{ position: 'sticky', top: 88 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ color: '#888', marginBottom: 4 }}>名称</div>
                <div style={{ fontSize: 16, fontWeight: 500 }}>{character.name}</div>
              </div>

              {character.sanskritName && (
                <div>
                  <div style={{ color: '#888', marginBottom: 4 }}>梵文名称</div>
                  <div style={{ fontSize: 16, fontStyle: 'italic' }}>{character.sanskritName}</div>
                </div>
              )}

              {character.otherNames && character.otherNames.length > 0 && (
                <div>
                  <div style={{ color: '#888', marginBottom: 4 }}>其他叫法</div>
                  <div style={{ fontSize: 14 }}>
                    {character.otherNames.map((name, i) => (
                      <Tag key={i} style={{ marginBottom: 4 }}>{name}</Tag>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div style={{ color: '#888', marginBottom: 4 }}>分类</div>
                <Tag color={categoryColors[character.category]}>{character.category}</Tag>
              </div>
            </div>
          </Card>

          <Card style={{ marginTop: 24 }}>
            <Button
              type="primary"
              block
              onClick={() => navigate('/contribute', { state: { character } })}
            >
              补充/纠错
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
