# 🧠 typescript-dry

[![CI](https://github.com/lwensveen/typescript-dry/actions/workflows/ci.yml/badge.svg)](https://github.com/lwensveen/typescript-dry/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/typescript-dry)](https://www.npmjs.com/package/typescript-dry)
[![downloads](https://img.shields.io/npm/dw/typescript-dry)](https://www.npmjs.com/package/typescript-dry)
[![size](https://img.shields.io/bundlephobia/minzip/typescript-dry)](https://bundlephobia.com/package/typescript-dry)
[![codecov](https://codecov.io/gh/lwensveen/typescript-dry/branch/main/graph/badge.svg)](https://codecov.io/gh/lwensveen/typescript-dry)
[![docs](https://img.shields.io/badge/docs-%E2%9C%93-blue)](https://lwensveen.github.io/typescript-dry/)
[![license](https://img.shields.io/npm/l/typescript-dry)](LICENSE)

A tool to detect duplicate or near-duplicate TypeScript type/interface definitions in your codebase.

## Installation

Install `typescript-dry` via npm:

```bash
npm install -g typescript-dry
```

## Usage

Scan your repository for exact duplicate type/interface definitions:

```bash
npx typescript-dry .
```

Detect near-duplicate definitions with a similarity threshold (e.g., 85%):

```bash
npx typescript-dry . -t 0.85
```

## Features

- **Exact Duplicate Detection**: Identifies identical TypeScript type and interface definitions.
- **Fuzzy Matching**: Finds near-duplicate definitions with a configurable similarity threshold.
- **Lightweight**: Seamlessly integrates into your TypeScript development workflow.

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/lwensveen/typescript-dry).

## Support

If you encounter issues or have questions, file an issue on the [GitHub repository](https://github.com/lwensveen/typescript-dry/issues).