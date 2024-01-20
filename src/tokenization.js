
function provideDocumentTokens(document,vscode) {
  const tokens = [];

  // Expressões regulares para identificar palavras-chave, strings, números e comentários
  const title = /\{([^;]*)\}.*;?/g;
  const text = /\'([^;]*)\'.*;?/g;
  const colors = /\(([^)]+)\)/g;
  const left = /\([ \n\r\t]*([l|e][^)]*)\)/g;
  const right = /\([ \n\r\t]*([r|d][^)]*)\)/g;
  const coments = /\*[^;]*/g;

  let match;

  while ((match = title.exec(document))) {
    tokens.push({
      range: new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
      kind: vscode.TokenKind.Comment,
    });
  }
  while ((match = text.exec(document))) {
    tokens.push({
      range: new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
      kind: vscode.TokenKind.Comment,
    });
  }
  while ((match = colors.exec(document))) {
    tokens.push({
      range: new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
      kind: vscode.TokenKind.Comment,
    });
  }
  while ((match = left.exec(document))) {
    tokens.push({
      range: new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
      kind: vscode.TokenKind.Comment,
    });
  }
  while ((match = right.exec(document))) {
    tokens.push({
      range: new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
      kind: vscode.TokenKind.Comment,
    });
  }
  while ((match = coments.exec(document))) {
    tokens.push({
      range: new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
      kind: vscode.TokenKind.Comment,
    });
  }

  return tokens;
}

module.exports = {provideDocumentTokens}