import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Form, Input, Select, Button, message, Alert, Upload } from 'antd'
import { SendOutlined, UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

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
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const uploadRef = useRef<any>(null)

  useEffect(() => {
    const state = location.state as { character?: any } | null
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
    setImageUrl('')
    if (uploadRef.current) {
      uploadRef.current.fileList = []
    }
  }

  const handleImageChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setUploading(true)
    }
    if (info.file.status === 'done') {
      const url = info.file.response?.data?.imageUrl
      if (url) {
        setImageUrl(url)
        message.success('图片上传成功')
      }
      setUploading(false)
    }
    if (info.file.status === 'error') {
      message.error('图片上传失败')
      setUploading(false)
    }
  }

  const handleSubmit = async (values: any) => {
    setSubmitting(true)
    try {
      const data: any = {
        name: values.name,
        category: values.category,
        summary: values.summary,
        story: values.story,
        scripture: values.scripture,
        sanskritName: values.sanskritName,
        otherNames: values.otherNames,
        submitterName: values.submitterName,
        submitterEmail: values.submitterEmail,
      }

      if (contributeType === '新增角色') {
        data.type = '新增角色'
        data.imageUrl = imageUrl
      } else {
        data.type = '补充数据'
        data.characterId = selectedCharacter?.id
        data.content = values.content
        data.imageUrl = imageUrl
      }

      await axios.post('/api/contributions', data)
      message.success('提交成功！感谢您的贡献，审核通过后将显示在网站上。')
      form.resetFields()
      setSelectedCharacter(null)
      setContributeType('新增角色')
      setImageUrl('')
      if (uploadRef.current) {
        uploadRef.current.fileList = []
      }
    } catch (err: any) {
      message.error(err.response?.data?.error?.message || err.message || '提交失败，请重试')
    } finally {
      setSubmitting(false)
    }
  }

  const uploadButton = (
    <div>
      <UploadOutlined rev={undefined} />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )

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
                <TextArea rows={6} placeholder="该角色的传说故事，历史典故" />
              </Form.Item>

              <Form.Item
                label="相关经典"
                name="scripture"
              >
                <Input placeholder="如：《妙法莲华经·观世音菩萨普门品》" />
              </Form.Item>

              <Form.Item label="图片（选填）">
                <Upload
                  ref={uploadRef}
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={true}
                  customRequest={async (options) => {
                    const formData = new FormData()
                    formData.append('image', options.file)
                    try {
                      const res = await axios.post('/api/upload/image', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                      })
                      options.onSuccess?.(res.data, options.file)
                    } catch (err: any) {
                      options.onError?.(err)
                    }
                  }}
                  onChange={handleImageChange}
                >
                  {imageUrl ? null : uploadButton}
                </Upload>
                {imageUrl && (
                  <div style={{ marginTop: 8, color: '#52c41a' }}>
                    图片已上传
                  </div>
                )}
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

              <Form.Item label="图片（选填）">
                <Upload
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={true}
                  customRequest={async (options) => {
                    const formData = new FormData()
                    formData.append('image', options.file)
                    try {
                      const res = await axios.post('/api/upload/image', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                      })
                      options.onSuccess?.(res.data, options.file)
                    } catch (err: any) {
                      options.onError?.(err)
                    }
                  }}
                  onChange={handleImageChange}
                >
                  {imageUrl ? null : uploadButton}
                </Upload>
                {imageUrl && (
                  <div style={{ marginTop: 8, color: '#52c41a' }}>
                    图片已上传
                  </div>
                )}
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
              loading={submitting || uploading}
              icon={<SendOutlined rev={undefined} />}
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
