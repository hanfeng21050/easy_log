# Easy Console Log

🚀 A VS Code extension for quickly inserting and removing console.log statements.

[English](#features) | [中文说明](#功能特点)

[![Version](https://img.shields.io/visual-studio-marketplace/v/hanfeng21050.easy-log-helper)](https://marketplace.visualstudio.com/items?itemName=hanfeng21050.easy-log-helper)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/hanfeng21050.easy-log-helper)](https://marketplace.visualstudio.com/items?itemName=hanfeng21050.easy-log-helper)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/hanfeng21050.easy-log-helper)](https://marketplace.visualstudio.com/items?itemName=hanfeng21050.easy-log-helper)
[![OpenVSX Downloads](https://img.shields.io/open-vsx/dt/hanfeng21050/easy-log-helper)](https://open-vsx.org/extension/hanfeng21050/easy-log-helper)

## Features

✨ Insert and remove console.log statements with keyboard shortcuts:

- 📝 `Alt+L` - Insert console.log
- 🗑️ `Shift+Alt+L` - Remove all extension-added console.log statements

### Smart Console Log Insertion

The extension supports three scenarios when inserting logs:

1. **Selected Text**
   ```javascript
   const userName = "John";  // Select "userName"
   // Press Alt+L
   console.log('===> file.js:2 ~ userName', userName);
   ```

2. **Word Under Cursor**
   ```javascript
   const userName = "John";  // Cursor on userName
   // Press Alt+L
   console.log('===> file.js:2 ~ userName', userName);
   ```

3. **Empty Location**
   ```javascript
   // Press Alt+L
   console.log('===> file.js:1 ~ ', );
   ```

### Intelligent Features

- 📍 Automatically includes file name and line number
- ✌️ Creates two cursors for easy editing
- ↩️ Maintains code indentation
- 🎨 Configurable log prefix

### Supported Languages

- JavaScript (.js)
- TypeScript (.ts)
- JavaScript React (.jsx)
- TypeScript React (.tsx)
- Vue (.vue)
- HTML (.html, .htm)
- Angular (.component.ts)
- Svelte (.svelte)
- EJS (.ejs)
- Handlebars (.hbs)
- Nunjucks (.njk)
- PHP (.php)
- Webpack 配置 (.config.js)
- Vite 配置 (vite.config.js)
- Jest 测试 (.test.js, .spec.js)
- Node.js 脚本

## Configuration

Customize the extension in VS Code settings:

```json
{
  "easyLog.prefix": "===>" // Default log prefix
}
```

## Example

### Before and After Log Cleanup

Before:
```javascript
const value = 42;
console.log('===> file.js:2 ~ value', value);
console.log('Regular log');  // Won't be removed
console.log('===> file.js:4 ~ result', result);
```

After `Shift+Alt+L`:
```javascript
const value = 42;
console.log('Regular log');  // Preserved
```

## Installation

1. Open VS Code
2. Press `Ctrl+P`
3. Type `ext install hanfeng21050.easy-log-helper`
4. Press Enter

## 功能特点

### 1. 快速插入日志（Alt+L）

在代码中任意位置按 `Alt+L` 即可插入 console.log 语句。支持以下三种场景：

#### 选中文本
```javascript
const userName = "John";  // 选中 "userName"
// 按 Alt+L
console.log('===> file.js:2 ~ userName', userName);
```

#### 光标位于单词上
```javascript
const userName = "John";  // 光标位于 userName 上
// 按 Alt+L
console.log('===> file.js:2 ~ userName', userName);
```

#### 空白处插入
```javascript
// 按 Alt+L
console.log('===> file.js:1 ~ ', );
```

### 2. 一键清除日志（Shift+Alt+L）

按 `Shift+Alt+L` 可以删除所有使用此扩展插入的 console.log 语句：
- 只删除带有特定前缀的日志
- 删除整行日志内容
- 保留其他普通的 console.log 语句

### 3. 智能特性

- **文件信息**：每条日志都包含当前文件名和行号
- **多光标支持**：插入日志时会创建两个光标，方便编辑
- **保持缩进**：自动保持代码的缩进级别
- **可配置前缀**：可以自定义日志的前缀标识

## 配置选项

你可以通过 VS Code 设置来自定义扩展：

```json
{
  "easyLog.prefix": "===>" // 日志前缀的默认值
}
```

## 快捷键

- `Alt+L`：插入 console.log 语句
- `Shift+Alt+L`：删除所有由此扩展插入的 console.log 语句

## 支持的文件类型

支持所有可以写 JavaScript/TypeScript 代码的文件：

### Web 开发
- JavaScript (.js, .mjs, .cjs)
- TypeScript (.ts, .d.ts)
- React (.jsx, .tsx)
- Vue (.vue)
- HTML (.html, .htm)
- Angular (.component.ts)
- Svelte (.svelte)

### 模板引擎
- EJS (.ejs)
- Handlebars (.hbs)
- Nunjucks (.njk)
- PHP (.php)

### 其他
- Webpack 配置 (.config.js)
- Vite 配置 (vite.config.js)
- Jest 测试 (.test.js, .spec.js)
- Node.js 脚本

只要文件中包含可以执行 JavaScript/TypeScript 代码的部分，就可以使用此扩展插入和清除日志。

### Vue 文件示例

```vue
<template>
  <div @click="handleClick">{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello'  // 选中 message
      // 按 Alt+L 插入：
      // console.log('===> App.vue:8 ~ message', message)
    }
  },
  methods: {
    handleClick() {
      const value = 42;
      // 在这里按 Alt+L
      console.log('===> App.vue:15 ~ value', value);
    }
  }
}
</script>
```

### HTML 文件示例

```html
<script>
  function init() {
    const config = {
      theme: 'dark'  // 选中 theme
      // 按 Alt+L 插入：
      // console.log('===> index.html:5 ~ theme', theme)
    };
  }
</script>
```

### React 组件示例

```jsx
function App() {
  const [count, setCount] = useState(0);  // 选中 count
  // 按 Alt+L 插入：
  // console.log('===> App.jsx:3 ~ count', count);

  return (
    <button onClick={() => {
      const newCount = count + 1;
      // 在这里按 Alt+L
      console.log('===> App.jsx:8 ~ newCount', newCount);
      setCount(newCount);
    }}>
      点击 {count} 次
    </button>
  );
}
```

## 安装方法

1. 打开 VS Code
2. 按 `Ctrl+P` 打开快速打开对话框
3. 输入 `ext install easy-log`
4. 按回车安装

## 开源协议

MIT

## 参与贡献

欢迎提交问题和功能建议！
