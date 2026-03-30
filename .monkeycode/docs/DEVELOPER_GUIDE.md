# 佛教文化网站 - 开发指南

## 1. 环境准备

### 必要工具

| 工具 | 版本要求 | 说明 |
|------|----------|------|
| Node.js | 18+ | 后端运行环境 |
| pnpm | 8+ | 包管理器（推荐） |
| Git | 2.30+ | 版本控制 |

### 开发环境配置

```bash
# 克隆项目
git clone <repository-url>
cd buddha-info

# 安装根目录依赖（workspace）
pnpm install
```

---

## 2. 项目启动

### 前端开发

```bash
cd frontend
pnpm dev
```

访问 `http://localhost:5173`

### 后端开发

```bash
cd backend
pnpm dev
```

API 服务运行在 `http://localhost:3001`

### 初始化数据库

```bash
cd backend
pnpm db:generate    # 生成 Prisma Client
pnpm db:push        # 同步数据库结构
pnpm db:seed        # 导入初始数据
```

---

## 3. 项目配置

### 前端配置

**文件: `frontend/vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

### 后端配置

**文件: `backend/.env`**

```
DATABASE_URL="file:./dev.db"
PORT=3001
NODE_ENV=development
```

---

## 4. 数据库操作

### Prisma 命令

```bash
pnpm db:generate    # 生成 Prisma Client
pnpm db:push        # 同步数据库结构（开发用）
pnpm db:migrate     # 执行数据库迁移（生产用）
pnpm db:seed        # 导入初始数据
pnpm db:studio      # 打开 Prisma Studio 可视化工具
```

### 查看数据库

```bash
pnpm db:studio
```

---

## 5. 代码规范

### TypeScript 规范

- 使用 `strict` 模式
- 优先使用 `interface` 定义对象类型
- 使用 `type` 定义联合类型、工具类型
- 避免使用 `any`，使用 `unknown` 替代

### React 组件规范

- 组件文件使用 PascalCase 命名（如 `CharacterCard.tsx`）
- 组件内部逻辑使用 Hooks 封装
- 优先使用函数组件 + TypeScript
- Props 类型定义使用 interface

### API 响应规范

- 所有 API 响应使用统一格式
- 成功响应：`{ success: true, data: ... }`
- 错误响应：`{ success: false, error: { code, message } }`

---

## 6. 目录约定

### 前端目录结构

```
frontend/src/
├── components/        # 公共组件
│   └── xxx/
│       ├── index.tsx
│       └── styles.ts
├── pages/           # 页面组件
├── hooks/           # 自定义 Hooks
│   └── useXxx.ts
├── services/        # API 调用
│   └── api.ts
├── types/           # 类型定义
│   └── index.ts
└── styles/          # 全局样式
    └── global.css
```

### 后端目录结构

```
backend/src/
├── routes/          # 路由定义
├── controllers/     # 控制器
├── services/        # 业务逻辑
├── middlewares/     # 中间件
└── utils/           # 工具函数
```

---

## 7. 常用开发命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck

# 运行测试
pnpm test

# 提交代码
git add .
git commit -m "feat: xxx"
git push
```

---

## 8. 部署说明

### 前端部署（Vercel 为例）

1. 在 Vercel 导入前端项目
2. 设置构建命令：`pnpm build`
3. 设置输出目录：`dist`
4. 配置环境变量：`VITE_API_URL=<后端API地址>`

### 后端部署（Railway 为例）

1. 在 Railway 创建新项目
2. 连接 Git 仓库
3. 设置构建命令：`pnpm install && pnpm build`
4. 设置启动命令：`node dist/index.js`
5. 配置环境变量：`DATABASE_URL`, `PORT`

### Docker 部署（可选）

```dockerfile
# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --prod
COPY dist ./dist
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

---

## 9. 开发流程

### 分支命名规范

```
YYMMDD-feat-xxx-xxx     # 新功能
YYMMDD-fix-xxx-xxx      # Bug 修复
YYMMDD-chore-xxx-xxx    # 杂项
```

### 提交信息规范

```
<type>: <subject>

<body>

<footer>
```

**Type 类型:**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `chore`: 构建/工具变更

### Pull Request 流程

1. 创建新分支
2. 开发并提交代码
3. 推送分支到远程
4. 创建 Pull Request
5. 代码审查
6. 合并到主分支

---

## 10. 常见问题

### Q: 数据库连接失败？

检查 `backend/.env` 中的 `DATABASE_URL` 是否正确，确保 `backend/prisma/dev.db` 文件存在。

### Q: 前端代理不生效？

确保 `vite.config.ts` 中的 `proxy` 配置正确，且后端服务已启动在指定端口。

### Q: 如何重置数据库？

```bash
cd backend
rm prisma/dev.db
pnpm db:push
pnpm db:seed
```
