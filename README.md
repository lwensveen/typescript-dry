# 🧠 typescript-dry
[![codecov](https://codecov.io/gh/lwensveen/typescript-dry/branch/main/graph/badge.svg)](https://codecov.io/gh/lwensveen/typescript-dry)  

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