// extension.js
const vscode = require('vscode');

function activate(context) {
  // Registrar a decoração
  // const title = /{[^}]*/g;
  const decorationType = vscode.window.createTextEditorDecorationType({
    color: new vscode.ThemeColor("title")
  });

  // Registrar um observador para atualizar as decorações
  const disposable = vscode.window.onDidChangeActiveTextEditor(editor => {
    if (editor) {
      updateDecorations(editor, decorationType);
    }
  });
  // Atualizar decorações assim que o texto é exibido
  vscode.window.onDidChangeTextEditorViewColumn(event => {
    if (event && event.textEditor) {
      updateDecorations(event.textEditor, decorationType);
    }
  });

  // Ativar a extensão assim que ela é ativada
  const initialEditor = vscode.window.activeTextEditor;
  if (initialEditor) {
    updateDecorations(initialEditor, decorationType);
  }

  context.subscriptions.push(decorationType, disposable);
}

function updateDecorations(editor, decorationType) {
  const content = editor.document.getText();
  const decorations = [];
  const regex = /{[^}]*/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const startPosition = editor.document.positionAt(match.index + 1);
    const endPosition = editor.document.positionAt(match.index + match[0].length);

    const decoration = {
      range: new vscode.Range(startPosition, endPosition),
      hoverMessage: "Texto destacado pela extensão",
    };

    decorations.push(decoration);
  }
  editor.setDecorations(decorationType, decorations);
}

exports.activate = activate;
