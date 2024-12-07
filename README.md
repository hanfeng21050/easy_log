# Easy Log

一个帮助你快速插入和删除 console.log 语句的 VS Code 扩展。

## 功能特点

### 1. 快速插入日志（Alt+L）

在代码中任意位置按 `Alt+L` 即可插入 console.log 语句。支持以下三种场景：

#### 选中文本
当你选中了某段文本时：
```javascript
const userName = "John";  // 选中 "userName"
// 按 Alt+L
console.log('===> file.js:2 ~ userName', userName);
```

#### 光标位于单词上
当光标位于某个单词上时：
```javascript
const userName = "John";  // 光标位于 userName 上
// 按 Alt+L
console.log('===> file.js:2 ~ userName', userName);
```

#### 空白处插入
当光标位于空白处时：
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

## 支持的语言

- JavaScript (.js)
- TypeScript (.ts)
- JavaScript React (.jsx)
- TypeScript React (.tsx)

## 使用示例

### 清除日志前后对比

清除前：
```javascript
const value = 42;
console.log('===> file.js:2 ~ value', value);
console.log('这是普通日志');  // 这个不会被删除
console.log('===> file.js:4 ~ result', result);
```

按 `Shift+Alt+L` 后：
```javascript
const value = 42;
console.log('这是普通日志');  // 这个被保留了
```

## 安装方法

1. 打开 VS Code
2. 按 `Ctrl+P` 打开快速打开对话框
3. 输入 `ext install easy-log`
4. 按回车安装

## 参与贡献

欢迎提交问题和功能建议！
