import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Row, Col, Spin, Alert, Select, Pagination } from 'antd'
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

export default function Browse() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || ''

  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)
    characterApi
      .list({ category: category || undefined, page, pageSize })
      .then(res => {
        setCharacters(res.data)
        setTotal(res.pagination.total)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [category, page, pageSize])

  const handleCategoryChange = (value: string) => {
    setSearchParams(value ? { category: value } : {})
    setPage(1)
  }

  return (
    <div className="page-container">
      <h2 className="section-title">浏览角色</h2>

      <div style={{ marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <span>筛选：</span>
        <Select
          value={category}
          onChange={handleCategoryChange}
          options={categoryOptions}
          style={{ width: 160 }}
        />
        <span style={{ color: '#888' }}>
          共 {total} 个角色
        </span>
      </div>

      {error && <Alert type="error" message={error} style={{ marginBottom: 24 }} />}

      {loading ? (
        <div style={{ textAlign: 'center', paddingTop: 60 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[20, 20]}>
            {characters.map(char => (
              <Col key={char.id} xs={24} sm={12} md={8} lg={6}>
                <CharacterCard
                  character={char}
                  onClick={() => navigate(`/character/${char.id}`)}
                />
              </Col>
            ))}
          </Row>

          {total > pageSize && (
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Pagination
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={(p, size) => {
                  setPage(p)
                  setPageSize(size)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                showSizeChanger
                showQuickJumper
                showTotal={total => `共 ${total} 条`}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
