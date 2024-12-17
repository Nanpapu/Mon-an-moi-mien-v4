module.exports = {
    plugins: ['jsdoc'],
    extends: ['plugin:jsdoc/recommended'],
    rules: {
      'jsdoc/require-description': 1,          // Yêu cầu mô tả
      'jsdoc/require-param-description': 1,     // Yêu cầu mô tả cho params
      'jsdoc/require-returns-description': 1,   // Yêu cầu mô tả cho returns
      'jsdoc/require-jsdoc': [1, {
        'require': {
          'FunctionDeclaration': true,
          'MethodDefinition': true,
          'ClassDeclaration': true,
          'ArrowFunctionExpression': true
        }
      }]
    }
  }