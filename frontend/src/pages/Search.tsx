import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Row, Col, Spin, Alert, Input, Select, Empty } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { characterApi } from '../services/api'
import type { Character } from '../types'
import CharacterCard from '../components/CharacterCard'

const categoryOptions = [
  { value: '', label: '全部' },
  { value: '佛', label: '佛' },
  { value: '菩萨', label: '菩萨' },
  { value: '罗汉', label: '罗汉' },
  { value: '护法', label: '护法' },
  { value: '其他', label: '其他' },
]

export default function Search() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState('')
  const [results, setResults] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      doSearch(initialQuery, category)
    }
  }, [initialQuery])

  const doSearch = (q: string, cat: string) => {
    if (!q.trim()) return

    setLoading(true)
    setSearched(true)
    characterApi
      .search(q, cat || undefined)
      .then(setResults)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  const handleSearch = () => {
    setSearchParams({ q: query, ...(category ? { category } : {}) })
    doSearch(query, category)
  }

  return (
    <div className="page-container">
      <h2 className="section-title">搜索角色</h2>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Input.Search
            placeholder="输入角色名称..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onSearch={handleSearch}
            style={{ flex: 1, minWidth: 200 }}
            size="large"
            enterButton={<SearchOutlined />}
          />
          <Select
            value={category}
            onChange={setCategory}
            options={categoryOptions}
            style={{ width: 140 }}
            placeholder="筛选分类"
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', paddingTop: 60 }}>
          <Spin size="large" />
        </div>
      ) : searched ? (
        results.length > 0 ? (
          <>
            <Alert
              type="info"
              message={`找到 ${results.length} 个相关角色`}
              style={{ marginBottom: 24 }}
            />
            <Row gutter={[20, 20]}>
              {results.map(char => (
                <Col key={char.id} xs={24} sm={12} md={8} lg={6}>
                  <CharacterCard
                    character={char}
                    onClick={() => navigate(`/character/${char.id}`)}
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Empty
            description="未找到匹配的角色"
            style={{ paddingTop: 60 }}
          >
            <p style={{ color: '#888' }}>
              换个关键词试试，或浏览全部角色
            </p>
          </Empty>
        )
      ) : null}
    </div>
  )
}
