import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // 注册插入日志的命令
    let insertLogDisposable = vscode.commands.registerCommand('easy-log.insertLog', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        // 获取配置的前缀和支持的语言
        const config = vscode.workspace.getConfiguration('easyLog');
        const prefix = config.get<string>('prefix', '===>');
        const supportedLanguages = config.get<string[]>('supportedLanguages', [
            'javascript',
            'typescript',
            'javascriptreact',
            'typescriptreact',
            'vue',
            'html',
            'svelte',
            'php',
            'ejs',
            'handlebars',
            'nunjucks'
        ]);

        // 检查文件类型是否支持
        const currentLanguage = editor.document.languageId;
        if (!supportedLanguages.includes(currentLanguage)) {
            vscode.window.showInformationMessage(`Easy Log does not support ${currentLanguage} files. Supported types: ${supportedLanguages.join(', ')}`);
            return;
        }

        // 检查是否在 <script> 标签内（对于 HTML、Vue 等文件）
        const isInScriptTag = checkIfInScriptTag(editor);
        if (['html', 'vue', 'php', 'ejs', 'handlebars', 'nunjucks'].includes(currentLanguage) && !isInScriptTag) {
            vscode.window.showInformationMessage('Please place the cursor inside a <script> tag to insert console.log');
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        
        // 获取文件名和行号
        const fileName = path.basename(editor.document.fileName);
        const lineNumber = selection.active.line + 2; // +2 因为我们要在下一行插入，而且行号从1开始

        // 获取当前行的缩进
        const currentLine = editor.document.lineAt(selection.active.line);
        const currentIndentation = currentLine.text.match(/^\s*/)?.[0] || '';
        
        // 获取下一行的缩进（如果存在）
        let nextLineIndentation = currentIndentation;
        if (selection.active.line + 1 < editor.document.lineCount) {
            const nextLine = editor.document.lineAt(selection.active.line + 1);
            if (nextLine.text.trim().length > 0) {
                nextLineIndentation = nextLine.text.match(/^\s*/)?.[0] || '';
            }
        }
        
        // 使用更深的缩进
        const finalIndentation = nextLineIndentation.length > currentIndentation.length ? nextLineIndentation : currentIndentation;

        let logStatement = '';
        let textToSelect = '';
        let isEmptyLog = false;
        
        if (selectedText) {
            // 如果有选中的文本
            textToSelect = selectedText;
            logStatement = `${finalIndentation}console.log('${prefix} ${fileName}:${lineNumber} ~ ${textToSelect}', ${textToSelect});`;
        } else if (selection.isEmpty) {
            const wordRange = editor.document.getWordRangeAtPosition(selection.active);
            if (wordRange) {
                // 如果光标在单词上
                textToSelect = editor.document.getText(wordRange);
                logStatement = `${finalIndentation}console.log('${prefix} ${fileName}:${lineNumber} ~ ${textToSelect}', ${textToSelect});`;
            } else {
                // 如果光标不在单词上
                isEmptyLog = true;
                logStatement = `${finalIndentation}console.log('${prefix} ${fileName}:${lineNumber} ~ ', );`;
            }
        }

        if (logStatement) {
            await editor.edit(editBuilder => {
                const position = new vscode.Position(selection.active.line + 1, 0);
                editBuilder.insert(position, logStatement + '\n');
            });

            const newLine = selection.active.line + 1;
            const newLineText = editor.document.lineAt(newLine).text;

            if (isEmptyLog) {
                // 如果是空日志，创建两个光标：一个在消息位置，一个在括号内
                const selections: vscode.Selection[] = [];
                
                // 查找消息位置（在最后一个引号前面）
                const quotePos = newLineText.lastIndexOf("'");
                if (quotePos !== -1) {
                    selections.push(new vscode.Selection(
                        new vscode.Position(newLine, quotePos),
                        new vscode.Position(newLine, quotePos)
                    ));
                }
                
                // 查找括号内的位置
                const commaPos = newLineText.indexOf(", ");
                if (commaPos !== -1) {
                    const startPos = commaPos + 2; // ', ' 的长度
                    selections.push(new vscode.Selection(
                        new vscode.Position(newLine, startPos),
                        new vscode.Position(newLine, startPos)
                    ));
                }
                
                if (selections.length > 0) {
                    editor.selections = selections;
                }
            } else if (textToSelect) {
                // 如果有文本需要选中，创建两个选中相同文本的光标
                const selections: vscode.Selection[] = [];
                
                // 查找消息中的文本位置
                const messageText = `${prefix} ${fileName}:${lineNumber} ~ ${textToSelect}`;
                const messageStart = newLineText.indexOf(messageText);
                if (messageStart !== -1) {
                    const startPos = messageStart + messageText.length - textToSelect.length;
                    selections.push(new vscode.Selection(
                        new vscode.Position(newLine, startPos),
                        new vscode.Position(newLine, startPos + textToSelect.length)
                    ));
                }
                
                // 查找变量位置
                const variableStart = newLineText.indexOf(`, ${textToSelect});`);
                if (variableStart !== -1) {
                    const startPos = variableStart + 2; // ', ' 的长度
                    selections.push(new vscode.Selection(
                        new vscode.Position(newLine, startPos),
                        new vscode.Position(newLine, startPos + textToSelect.length)
                    ));
                }
                
                if (selections.length > 0) {
                    editor.selections = selections;
                }
            }
        }
    });

    // 注册清除日志的命令
    let clearLogsDisposable = vscode.commands.registerCommand('easy-log.clearLogs', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        // 获取配置的前缀
        const config = vscode.workspace.getConfiguration('easyLog');
        const prefix = config.get<string>('prefix', '===>');

        // 从后往前遍历所有行，这样删除行时不会影响后续行的位置
        let hasChanges = false;
        await editor.edit(editBuilder => {
            for (let i = editor.document.lineCount - 1; i >= 0; i--) {
                const line = editor.document.lineAt(i);
                const lineText = line.text;
                
                // 检查这一行是否包含我们的console.log
                if (lineText.includes(`console.log('${prefix}`) && lineText.trim().endsWith(');')) {
                    // 删除整行（包括换行符）
                    const range = line.rangeIncludingLineBreak;
                    editBuilder.delete(range);
                    hasChanges = true;
                }
            }
        });

        if (hasChanges) {
            vscode.window.showInformationMessage('All console.log statements have been removed.');
        } else {
            vscode.window.showInformationMessage('No console.log statements found.');
        }
    });

    context.subscriptions.push(insertLogDisposable, clearLogsDisposable);
}

export function deactivate() {}

// 添加新函数来检查是否在 script 标签内
function checkIfInScriptTag(editor: vscode.TextEditor): boolean {
    const document = editor.document;
    const cursorLine = editor.selection.active.line;
    
    // 从光标位置向上搜索最近的 script 开始标签
    let scriptStart = -1;
    for (let i = cursorLine; i >= 0; i--) {
        const lineText = document.lineAt(i).text;
        if (/<script.*>/.test(lineText)) {
            scriptStart = i;
            break;
        }
    }
    
    // 如果找到了开始标签，向下搜索结束标签
    if (scriptStart !== -1) {
        for (let i = cursorLine; i < document.lineCount; i++) {
            const lineText = document.lineAt(i).text;
            if (/<\/script>/.test(lineText)) {
                // 光标在 script 标签内
                return true;
            }
        }
    }
    
    return false;
}
