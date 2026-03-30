import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Row, Col, Card, Spin, Alert } from 'antd'
import { FireOutlined, SearchOutlined, ReadOutlined } from '@ant-design/icons'
import { characterApi } from '../services/api'
import type { Character, Category } from '../types'
import CharacterCard from '../components/CharacterCard'

const categoryInfo = [
  { name: '佛', icon: '佛', desc: '佛教最高果位', color: '#c41e3a', bg: 'linear-gradient(135deg, #fff 0%, #ffe0e0 100%)' },
  { name: '菩萨', icon: '萨', desc: '觉悟有情', color: '#1e90ff', bg: 'linear-gradient(135deg, #fff 0%, #d0e8ff 100%)' },
  { name: '罗汉', icon: '汉', desc: '自觉者', color: '#228b22', bg: 'linear-gradient(135deg, #fff 0%, #d0ffd0 100%)' },
  { name: '护法', icon: '护', desc: '护持佛教', color: '#ff8c00', bg: 'linear-gradient(135deg, #fff 0%, #ffe8d0 100%)' },
]

export default function Home() {
  const navigate = useNavigate()
  const [hotCharacters, setHotCharacters] = useState<Character[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      characterApi.hot(8),
      characterApi.categories(),
    ])
      .then(([hot, cats]) => {
        setHotCharacters(hot)
        setCategories(cats)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', paddingTop: 100 }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="page-container">
      {error && <Alert type="error" message={error} style={{ marginBottom: 24 }} />}

      <div style={{
        background: 'linear-gradient(135deg, #8b4513 0%, #654321 100%)',
        borderRadius: 16,
        padding: '48px 40px',
        marginBottom: 40,
        textAlign: 'center',
        color: '#fff',
      }}>
        <h1 style={{ fontSize: 36, marginBottom: 16, color: '#fff' }}>
          探索佛教文化
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32 }}>
          了解佛、菩萨、罗汉、护法的故事与传说
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/browse')}
            style={{
              background: '#daa520',
              border: 'none',
              borderRadius: 24,
              padding: '12px 32px',
              color: '#fff',
              fontSize: 16,
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <SearchOutlined /> 开始浏览
          </button>
          <button
            onClick={() => navigate('/contribute')}
            style={{
              background: 'transparent',
              border: '2px solid #fff',
              borderRadius: 24,
              padding: '12px 32px',
              color: '#fff',
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            <ReadOutlined /> 添加角色
          </button>
        </div>
      </div>

      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">
          <FireOutlined style={{ color: '#ff6b6b', marginRight: 8 }} />
          热门角色
        </h2>
        <Row gutter={[20, 20]}>
          {hotCharacters.map(char => (
            <Col key={char.id} xs={24} sm={12} md={8} lg={6}>
              <CharacterCard
                character={char}
                onClick={() => navigate(`/character/${char.id}`)}
              />
            </Col>
          ))}
        </Row>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">浏览分类</h2>
        <Row gutter={[20, 20]}>
          {categoryInfo.map(cat => {
            const catData = categories.find(c => c.name === cat.name)
            return (
              <Col key={cat.name} xs={24} sm={12}>
                <Link to={`/browse?category=${cat.name}`}>
                  <Card
                    hoverable
                    style={{
                      background: cat.bg,
                      border: `2px solid ${cat.color}22`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <div
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: '50%',
                          background: `${cat.color}22`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 32,
                          fontWeight: 700,
                          color: cat.color,
                        }}
                      >
                        {cat.icon}
                      </div>
                      <div>
                        <h3 style={{ fontSize: 20, color: cat.color, marginBottom: 4 }}>{cat.name}</h3>
                        <p style={{ color: '#666', margin: 0 }}>{cat.desc}</p>
                        <p style={{ color: '#999', fontSize: 13 }}>
                          {catData ? `${catData.count} 个角色` : '加载中...'}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            )
          })}
        </Row>
      </section>
    </div>
  )
}
