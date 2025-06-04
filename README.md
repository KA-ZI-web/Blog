# 项目开发指南（非部署版）

## 🚀 本地开发环境准备

### 前提条件
- Node.js 16+
- npm/yarn

## 📥 安装依赖

```bash
# 前端依赖
cd frontend
npm install  # 或 yarn install

# 后端依赖
cd ../backend
npm install  # 或 yarn install
```

## 🔧 开发模式运行

### 前端开发服务器
```bash
cd frontend
npm start
```
访问：http://localhost:3000

### 后端开发服务器
```bash
cd backend
npm run dev
```
API 地址：http://localhost:4000

2. 配置连接信息：
复制 `backend/.env.example` 为 `backend/.env` 并修改：
```ini
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=dev_db
```

## 📂 项目结构

```
.
├── frontend              # 前端代码
│   ├── src
│   │   ├── components    # 公共组件
│   │   ├── pages         # 页面组件
│   │   ├── utils         # 工具函数
│   │   └── App.jsx       # 主入口
├── backend               # 后端代码
│   ├── blog              # 博客应用
│   │   ├── models.py     # 数据模型
│   │   └── views.py      # API视图
│   └── config            # 项目配置
│       └── settings.py   # 主设置文件
└── screenshots           # 项目截图
```

## 💡 开发建议

1. 使用 VS Code 的 Remote Development 扩展进行开发
2. 提交代码前运行：
```bash
npm run lint  # 检查代码规范
npm run build  # 确保能正常构建
```

## 🆘 常见问题

**Q：前端无法连接后端API**
A：检查 `frontend/src/config.js` 中的 `API_BASE_URL` 配置

**Q：依赖安装失败**
A：尝试删除node_modules后重新安装：
```bash
rm -rf node_modules
npm install
```

> 提示：本项目已配置好热更新功能，代码修改会自动刷新浏览器
