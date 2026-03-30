# 佛教文化网站 - 接口文档

## 1. API 基础信息

- **Base URL**: `/api`
- **Content-Type**: `application/json`
- **字符编码**: UTF-8

---

## 2. 角色接口

### 2.1 获取角色列表

```
GET /api/characters
```

**Query Parameters:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| category | string | 否 | - | 筛选分类：佛/菩萨/罗汉/护法/其他 |
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 12 | 每页数量（最大50） |
| sort | string | 否 | createdAt | 排序字段：createdAt/name |
| order | string | 否 | desc | 排序方向：asc/desc |

**Response:**
```typescript
interface ListResponse {
  data: Character[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

interface Character {
  id: number;
  name: string;
  sanskritName: string | null;
  otherNames: string[] | null;
  category: '佛' | '菩萨' | '罗汉' | '护法' | '其他';
  summary: string;
  story: string | null;
  scripture: string | null;
  imageUrl: string | null;
  isHot: boolean;
  createdAt: string;
  updatedAt: string;
}
```

**示例响应:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "观世音菩萨",
      "sanskritName": "Avalokiteshvara",
      "otherNames": ["观音菩萨", "观世音"],
      "category": "菩萨",
      "summary": "大慈大悲的菩萨，以慈悲救济众生为本愿...",
      "story": "相传观音菩萨曾化身千万亿...",
      "scripture": "《妙法莲华经·观世音菩萨普门品》",
      "imageUrl": "/images/guanyin.jpg",
      "isHot": true,
      "createdAt": "2024-01-15T08:00:00Z",
      "updatedAt": "2024-01-15T08:00:00Z"
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

---

### 2.2 获取角色详情

```
GET /api/characters/:id
```

**Path Parameters:**

| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 角色ID |

**Response:**
```typescript
interface CharacterDetailResponse {
  data: CharacterDetail;
}

interface CharacterDetail extends Character {
  relatedCharacters: {
    id: number;
    name: string;
    category: string;
  }[];
}
```

---

### 2.3 获取分类列表

```
GET /api/characters/categories
```

**Response:**
```typescript
interface CategoriesResponse {
  data: {
    name: string;
    count: number;
  }[];
}
```

**示例响应:**
```json
{
  "data": [
    { "name": "佛", "count": 10 },
    { "name": "菩萨", "count": 20 },
    { "name": "罗汉", "count": 18 },
    { "name": "护法", "count": 10 },
    { "name": "其他", "count": 5 }
  ]
}
```

---

### 2.4 获取热门角色

```
GET /api/characters/hot
```

**Query Parameters:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| limit | number | 否 | 6 | 返回数量（最大20） |

**Response:**
```typescript
interface HotCharactersResponse {
  data: Character[];
}
```

---

### 2.5 搜索角色

```
GET /api/characters/search
```

**Query Parameters:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| q | string | 是 | 搜索关键词 |
| category | string | 否 | 筛选分类 |

**Response:**
```typescript
interface SearchResponse {
  data: Character[];
  total: number;
}
```

---

## 3. 贡献接口

### 3.1 提交贡献

```
POST /api/contributions
```

**Request Body:**
```typescript
interface ContributionRequest {
  type: '新增角色' | '补充数据';
  data: {
    // 新增角色
    name?: string;
    category?: string;
    summary?: string;
    story?: string;
    scripture?: string;
    // 或补充数据
    characterId?: number;
    content?: string;
  };
  submitterName: string;
  submitterEmail?: string;
}
```

**Response:**
```typescript
interface ContributionResponse {
  success: boolean;
  message: string;
  id: number;
}
```

**错误响应:**
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}
```

---

## 4. 错误码定义

| 错误码 | HTTP状态码 | 说明 |
|--------|------------|------|
| VALIDATION_ERROR | 400 | 请求参数验证失败 |
| NOT_FOUND | 404 | 资源不存在 |
| INTERNAL_ERROR | 500 | 服务器内部错误 |

**错误响应示例:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数验证失败",
    "details": {
      "name": ["名称不能为空"]
    }
  }
}
```

---

## 5. 公共响应格式

**成功响应:**
```typescript
{
  "success": true,
  "data": ...
}
```

**分页响应:**
```typescript
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 12,
    "total": 100,
    "totalPages": 9
  }
}
```
