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

## Contributing

Issues and feature requests are welcome! Feel free to contribute.

## Marketplace

This extension is available on:

- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=hanfeng21050.easy-log-helper)
- [Open VSX Registry](https://open-vsx.org/extension/hanfeng21050/easy-log-helper)

## License

MIT License - see the [LICENSE](LICENSE) file for details.
