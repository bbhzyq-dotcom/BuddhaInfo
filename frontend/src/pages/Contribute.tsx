import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Form, Input, Select, Button, message, Alert } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { contributionApi } from '../services/api'
import type { CharacterDetail } from '../types'

const { TextArea } = Input

const categoryOptions = [
  { value: '佛', label: '佛' },
  { value: '菩萨', label: '菩萨' },
  { value: '罗汉', label: '罗汉' },
  { value: '护法', label: '护法' },
  { value: '其他', label: '其他' },
]

export default function Contribute() {
  const location = useLocation()
  const [form] = Form.useForm()
  const [contributeType, setContributeType] = useState<'新增角色' | '补充数据'>('新增角色')
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterDetail | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const state = location.state as { character?: CharacterDetail } | null
    if (state?.character) {
      setSelectedCharacter(state.character)
      setContributeType('补充数据')
      form.setFieldsValue({
        characterId: state.character.id,
        name: state.character.name,
      })
    }
  }, [location.state, form])

  const handleTypeChange = (value: '新增角色' | '补充数据') => {
    setContributeType(value)
    if (value === '新增角色') {
      setSelectedCharacter(null)
      form.resetFields(['name', 'category', 'summary', 'story', 'scripture'])
    } else {
      form.resetFields(['content'])
    }
  }

  const handleSubmit = async (values: any) => {
    setSubmitting(true)
    try {
      if (contributeType === '新增角色') {
        await contributionApi.submit({
          type: '新增角色',
          data: {
            name: values.name,
            category: values.category,
            summary: values.summary,
            story: values.story,
            scripture: values.scripture,
            sanskritName: values.sanskritName,
            otherNames: values.otherNames,
            imageUrl: values.imageUrl,
          },
          submitterName: values.submitterName,
          submitterEmail: values.submitterEmail,
        })
      } else {
        await contributionApi.submit({
          type: '补充数据',
          data: {
            characterId: selectedCharacter?.id,
            content: values.content,
            imageUrl: values.imageUrl,
          },
          submitterName: values.submitterName,
          submitterEmail: values.submitterEmail,
        })
      }
      message.success('提交成功！感谢您的贡献，审核通过后将显示在网站上。')
      form.resetFields()
      setSelectedCharacter(null)
      setContributeType('新增角色')
    } catch (err: any) {
      message.error(err.message || '提交失败，请重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-container" style={{ maxWidth: 800 }}>
      <h2 className="section-title">添加/贡献</h2>

      <Alert
        type="info"
        message="您的贡献将帮助完善佛教文化百科数据库"
        description="提交的信息经过审核后会被添加，感谢您对佛教文化传播的支持"
        style={{ marginBottom: 24 }}
      />

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item label="贡献类型">
            <Select
              value={contributeType}
              onChange={handleTypeChange}
              options={[
                { value: '新增角色', label: '新增角色' },
                { value: '补充数据', label: '补充/纠错现有角色' },
              ]}
            />
          </Form.Item>

          {contributeType === '补充数据' && (
            <Form.Item label="选择角色" name="characterId">
              <Input value={selectedCharacter?.name || ''} disabled placeholder="请在角色详情页点击「补充/纠错」" />
            </Form.Item>
          )}

          {contributeType === '新增角色' && (
            <>
              <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true, message: '请输入角色名称' }]}
              >
                <Input placeholder="如：观世音菩萨" />
              </Form.Item>

              <Form.Item
                label="梵文名称"
                name="sanskritName"
              >
                <Input placeholder="如：Avalokiteshvara" />
              </Form.Item>

              <Form.Item
                label="其他叫法"
                name="otherNames"
              >
                <Select
                  mode="tags"
                  placeholder="输入多个别名后按回车"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label="分类"
                name="category"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select options={categoryOptions} placeholder="选择分类" />
              </Form.Item>

              <Form.Item
                label="简介"
                name="summary"
                rules={[{ required: true, message: '请输入简介' }]}
              >
                <TextArea rows={4} placeholder="简要介绍该角色的身份和特征" />
              </Form.Item>

              <Form.Item
                label="典故故事"
                name="story"
              >
                <TextArea rows={6} placeholder="该角色的传说故事、历史典故" />
              </Form.Item>

              <Form.Item
                label="相关经典"
                name="scripture"
              >
                <Input placeholder="如：《妙法莲华经·观世音菩萨普门品》" />
              </Form.Item>

              <Form.Item
                label="图片URL（选填）"
                name="imageUrl"
              >
                <Input placeholder="请输入图片网址，如：https://example.com/image.jpg" />
              </Form.Item>
            </>
          )}

          {contributeType === '补充数据' && (
            <>
              <Form.Item
                label="补充内容"
                name="content"
                rules={[{ required: true, message: '请输入补充内容' }]}
              >
                <TextArea rows={6} placeholder="请详细描述您要补充或纠错的内容" />
              </Form.Item>

              <Form.Item
                label="图片URL（选填）"
                name="imageUrl"
              >
                <Input placeholder="如发现图片错误或需要补充，请输入正确的图片网址" />
              </Form.Item>
            </>
          )}

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24, marginTop: 24 }}>
            <Form.Item
              label="您的称呼"
              name="submitterName"
              rules={[{ required: true, message: '请输入您的称呼' }]}
            >
              <Input placeholder="方便我们记录您的贡献" />
            </Form.Item>

            <Form.Item
              label="邮箱（选填）"
              name="submitterEmail"
              rules={[
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input placeholder="用于接收审核结果通知" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              icon={<SendOutlined />}
              size="large"
              block
            >
              提交贡献
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
