# Cloudflare Pages 部署指南

## 前置条件

- GitHub 账号
- Cloudflare 账号（免费）
- 本地项目已提交到 Git

---

## 第一步：推送到 GitHub

```bash
# 创建 GitHub 仓库（二选一）

# 方式 A：用 gh CLI（推荐）
gh repo create my-blog --public --source=. --push

# 方式 B：手动
# 1. 在 github.com/new 创建仓库
# 2. 添加远程并推送：
git remote add origin git@github.com:<你的用户名>/my-blog.git
git branch -M main
git push -u origin main
```

## 第二步：连接 Cloudflare Pages

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com)
2. 左侧导航 → **Workers & Pages**
3. 点击 **Create** → **Pages** → **Connect to Git**
4. 授权 GitHub，选择你刚创建的仓库
5. 配置构建设置：

| 设置项 | 值 |
|--------|-----|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/`（留空） |
| Node.js version | `20`（见下方环境变量） |

6. 点击 **Environment variables** → 添加：

| 变量名 | 值 |
|--------|-----|
| `NODE_VERSION` | `20` |

7. 点击 **Save and Deploy**

首次部署需要 1-3 分钟。完成后你会获得一个 `<项目名>.pages.dev` 的 URL。

## 第三步：更新 site URL

部署成功后，用实际的 pages.dev 域名更新配置：

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://<你的项目名>.pages.dev',  // 替换这里
  // ...
});
```

提交并推送，Cloudflare 会自动重新部署。

## 第四步：验证

部署完成后逐项检查：

- [ ] 首页加载，文章列表正常
- [ ] 点击文章，博文页面渲染正常
- [ ] 中文字体 (LXGWWenKai) 正确加载
- [ ] 暗色模式切换正常
- [ ] Cmd+K 打开搜索，搜索有结果
- [ ] `/rss.xml` 返回有效 XML
- [ ] 代码块有语法高亮
- [ ] 链接 hover 时字体微妙变化（glitch 效果）

---

## 日常更新流程

```bash
# 写新文章
# 在 src/content/blog/ 下创建 .md 文件

# 本地预览
npm run dev
# 浏览器打开 localhost:4321

# 满意后提交推送
git add src/content/blog/new-post.md
git commit -m "post: 新文章标题"
git push

# Cloudflare 自动部署，约 30 秒后上线
```

---

## 注意事项

### 字体文件

- `public/fonts/` 下的 woff2 文件**必须**提交到 Git（约 50-80MB）
- `fonts/*.ttf` 源文件**不要**提交（已在 .gitignore 中排除）
- 如果克隆到新机器，woff2 已在仓库中，不需要重新分割
- 如果要更新字体版本，重新下载 TTF → 运行 `npm run split-fonts` → 提交 public/fonts/

### 构建脚本

`package.json` 中的 build 命令是：

```
astro build && npx pagefind --site dist
```

Astro 构建静态 HTML → Pagefind 扫描 HTML 生成搜索索引。两步必须按顺序执行。如果只改了 `astro build`，搜索功能会失效。

### Pagefind 搜索

- 搜索只在**构建后**才能工作（`npm run build && npm run preview`）
- `npm run dev` 模式下搜索会报错 — 这是正常的
- 搜索通过 `data-pagefind-body` 属性只索引博文正文，不会搜到导航栏/页脚

### 内容格式

Frontmatter 每个字段都有验证：

```yaml
---
title: "必填"
date: 2026-04-11      # 必填，YYYY-MM-DD
tldr: "必填，一句话摘要"
category: "必填"
tags: ["可选"]
draft: false           # 默认 false，设为 true 则不会发布
lang: zh               # 可选，zh 或 en
---
```

`draft: true` 的文章不会出现在任何页面和 RSS 中，但会保留在 Git 仓库里。

### 暗色模式

- 首次访问：跟随系统设置（`prefers-color-scheme`）
- 手动切换后：保存到 `localStorage`，刷新不会丢失
- `<script is:inline>` 在 HTML 解析时同步执行，避免白闪

---

## 可能的坑

### 1. 构建失败：Node.js 版本不对

**现象：** Cloudflare 构建报错 `SyntaxError: Unexpected token`

**原因：** Cloudflare Pages 默认 Node 12，太旧了

**解决：** 设置环境变量 `NODE_VERSION=20`（在 Cloudflare dashboard → 项目 Settings → Environment variables）

### 2. 字体加载 404

**现象：** 页面正常但中文字体回退到系统字体，控制台有 404 报错

**原因：** `public/fonts/` 没有提交到 Git，或者 `result.css` 中的路径不匹配

**解决：**
```bash
# 确认字体文件在 Git 中
git ls-files public/fonts/ | head -5
# 应该能看到 .woff2 和 result.css 文件

# 如果没有，重新分割并提交
npm run split-fonts
git add public/fonts/
git commit -m "fix: add font files"
git push
```

### 3. 搜索返回空结果

**现象：** 搜索弹窗打开了但搜什么都没结果

**原因：** Pagefind 索引没有正确生成

**解决：**
```bash
# 本地验证
npm run build
ls dist/pagefind/
# 应该能看到 pagefind.js, pagefind-ui.js, fragment/ 等文件

# 如果 dist/pagefind/ 不存在，检查 build 命令是否包含 pagefind
cat package.json | grep build
# 应该是 "astro build && npx pagefind --site dist"
```

### 4. RSS 链接指向 example.pages.dev

**现象：** RSS 阅读器中的链接都指向错误域名

**原因：** `astro.config.mjs` 的 `site` 还是占位符

**解决：** 部署后立即更新 `site` 为实际的 `.pages.dev` 域名

### 5. 文章 URL 带 .md 后缀

**现象：** 文章链接变成 `/blog/hello-world.md` 而不是 `/blog/hello-world`

**原因：** Astro 5 的 `post.id` 包含文件扩展名

**解决：** 这个已经在代码里处理了（`.replace(/\.mdx?$/, '')`）。如果你新增页面用到 `post.id`，记得同样处理。

### 6. Git 仓库过大

**现象：** 推送很慢，仓库超过 100MB

**原因：** woff2 字体文件（约 50-80MB）占体积

**解决：** 这是预期的。如果嫌大，可以考虑：
- 减少字体数量（只保留 WenKai + NeoXiHei 两个最常用的）
- 用 CDN 加载字体代替自托管（会牺牲一些加载速度控制）
- 用 Git LFS 管理大文件

### 7. 暗色模式闪白

**现象：** 刷新页面时短暂闪白色再变暗

**原因：** 主题脚本没有在 HTML 解析时执行

**解决：** 确保 `Base.astro` 中的主题脚本使用 `is:inline`：
```html
<script is:inline>
  const theme = localStorage.getItem('theme')
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
</script>
```
`is:inline` 阻止 Astro 打包这段脚本，确保它在 `<head>` 中同步执行。

### 8. Cloudflare 构建缓存导致更新不生效

**现象：** 推送了新文章但线上没有更新

**原因：** Cloudflare CDN 缓存

**解决：**
- 等待几分钟，CDN 缓存会自动刷新
- 或者在 Cloudflare dashboard → 项目 → Deployments → 手动触发重新部署
- 浏览器强制刷新：Cmd+Shift+R

### 9. 自定义域名配置

如果之后想用自己的域名（如 `yourname.dev`）：

1. 在 Cloudflare Registrar 购买域名（成本价，无加价）
2. 项目 Settings → Custom domains → 添加域名
3. Cloudflare 自动配置 DNS 和 SSL
4. 更新 `astro.config.mjs` 的 `site` 为新域名
5. 推送，完成

---

## GitHub Actions 自动部署（可选）

如果想用 GitHub Actions 而不是 Cloudflare 的 Git 集成：

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=<你的项目名>
```

需要在 GitHub 仓库 Settings → Secrets 中添加：
- `CLOUDFLARE_API_TOKEN`：在 Cloudflare dashboard → My Profile → API Tokens → Create Token → Edit Cloudflare Workers
- `CLOUDFLARE_ACCOUNT_ID`：在 Cloudflare dashboard 右侧边栏可以看到

这种方式的好处：更细的控制、可以加额外的步骤（如 lint、测试），但设置更复杂。对于个人博客，直接用 Cloudflare Git 集成就够了。
