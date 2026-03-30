# 佛教文化网站 - 架构设计

## 1. 技术选型

### 前端技术栈
| 技术 | 选择 | 说明 |
|------|------|------|
| 框架 | React 18 | 生态丰富，组件化开发 |
| 构建工具 | Vite | 快速开发启动，热更新快 |
| UI 组件库 | Ant Design 5 | 美观、组件丰富、中文支持好 |
| 路由 | React Router 6 | 官方推荐路由方案 |
| 状态管理 | Zustand | 轻量级状态管理 |
| HTTP 客户端 | Axios | 简洁易用 |

### 后端技术栈
| 技术 | 选择 | 说明 |
|------|------|------|
| 运行环境 | Node.js 18+ | LTS 版本，稳定可靠 |
| 框架 | Express 4 | 简洁灵活，社区成熟 |
| 数据库 | SQLite 3 | 轻量、零配置、易于部署 |
| ORM | Prisma | 类型安全、自动迁移 |
| 验证 | Zod | TypeScript 友好的验证 |

### 部署方式
- **前端**：静态部署（Vercel / Netlify / 任意静态服务器）
- **后端**：Node.js 运行时（Railway / Render / 任意 Node 容器）

---

## 2. 项目结构

```
buddha-info/
├── frontend/                 # 前端项目
│   ├── src/
│   │   ├── components/       # 公共组件
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CharacterCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── CategoryFilter.tsx
│   │   ├── pages/           # 页面组件
│   │   │   ├── Home.tsx
│   │   │   ├── Browse.tsx
│   │   │   ├── Detail.tsx
│   │   │   ├── Search.tsx
│   │   │   └── Contribute.tsx
│   │   ├── hooks/           # 自定义 Hooks
│   │   ├── services/        # API 服务
│   │   ├── types/           # TypeScript 类型
│   │   ├── styles/          # 全局样式
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                  # 后端项目
│   ├── src/
│   │   ├── routes/          # 路由定义
│   │   │   ├── characters.ts
│   │   │   └── contributions.ts
│   │   ├── controllers/     # 控制器
│   │   ├── services/        # 业务逻辑
│   │   ├── middlewares/     # 中间件
│   │   ├── prisma/          # Prisma 相关
│   │   │   └── schema.prisma
│   │   └── index.ts
│   ├── prisma/
│   │   └── seed.ts          # 初始数据
│   └── package.json
│
└── docs/                     # 项目文档
```

---

## 3. 数据模型

### 角色（Character）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 主键，自增 |
| name | String | 中文名称（必填） |
| sanskritName | String? | 梵文名称 |
| otherNames | String? | 其他叫法（JSON数组） |
| category | Enum | 分类：佛/菩萨/罗汉/护法/其他 |
| summary | String | 简介（必填） |
| story | String? | 典故故事 |
| scripture | String? | 相关经典出处 |
| imageUrl | String? | 图片URL |
| isHot | Boolean | 是否热门推荐 |
| status | Enum | 状态：已审核/待审核/拒绝 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

### 用户贡献（Contribution）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 主键，自增 |
| characterId | Int? | 关联角色ID（新增时为null） |
| type | Enum | 类型：新增角色/补充数据 |
| data | JSON | 提交的详细数据 |
| status | Enum | 状态：待审核/已通过/已拒绝 |
| submitterName | String | 提交者名称 |
| submitterEmail | String? | 提交者邮箱 |
| reviewNote | String? | 审核备注 |
| createdAt | DateTime | 提交时间 |
| reviewedAt | DateTime? | 审核时间 |

---

## 4. API 设计

### 角色相关接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/characters | 获取角色列表（分页、筛选） |
| GET | /api/characters/:id | 获取角色详情 |
| GET | /api/characters/categories | 获取所有分类 |
| GET | /api/characters/hot | 获取热门角色 |
| GET | /api/characters/search | 搜索角色 |

### 贡献相关接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/contributions | 提交新的贡献 |
| GET | /api/contributions | 获取贡献列表（后台） |
| PATCH | /api/contributions/:id | 审核贡献（后台） |

### 请求/响应示例

**GET /api/characters**

Request:
```
GET /api/characters?category=菩萨&page=1&pageSize=12
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "观世音菩萨",
      "sanskritName": "Avalokiteshvara",
      "otherNames": ["观音菩萨", "观世音"],
      "category": "菩萨",
      "summary": "大慈大悲的菩萨...",
      "imageUrl": "/images/guanyin.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 12,
    "total": 100,
    "totalPages": 9
  }
}
```

**POST /api/contributions**

Request:
```json
{
  "type": "新增角色",
  "data": {
    "name": "弥勒菩萨",
    "category": "菩萨",
    "summary": "未来佛...",
    "story": "弥勒菩萨的传说故事..."
  },
  "submitterName": "张三",
  "submitterEmail": "zhangsan@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "提交成功，等待审核",
  "id": 123
}
```

---

## 5. 前端路由设计

| 路径 | 页面 | 说明 |
|------|------|------|
| / | Home | 首页：热门角色、分类入口 |
| /browse | Browse | 浏览页面：分类列表、分页 |
| /character/:id | Detail | 角色详情页 |
| /search | Search | 搜索结果页 |
| /contribute | Contribute | 添加/贡献页面 |

---

## 6. 初始数据

### 佛（10尊）
释迦牟尼佛、阿弥陀佛、药师佛、燃灯佛、弥勒佛、毗卢遮那佛、卢舍那佛、阿閦佛、宝生佛、不空成就佛

### 菩萨（20位）
观世音菩萨、文殊菩萨、普贤菩萨、地藏菩萨大势至菩萨、虚空藏菩萨、金刚手菩萨、弥勒菩萨、准提菩萨、韦陀菩萨、伽蓝菩萨、日光菩萨、月光菩萨、药王菩萨、药上菩萨、无尽意菩萨、宝檀华菩萨、思维菩萨、大慧菩萨、光明菩萨

### 罗汉（20位）
十八罗汉加二：宾头卢尊者、摩诃迦叶

### 护法（10位）
韦陀菩萨、伽蓝菩萨、四大天王、增长天王、多闻天王、持国天王、广目天王、阎魔罗、欢喜金刚、莲花生大士

**总计约 60 个初始角色数据**
