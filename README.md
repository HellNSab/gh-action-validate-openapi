# Github action to validate an open api file

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

## Usage

See [action.yml](action.yml)

```yaml
name: Run open api file validation

on:
  - pull_request

jobs:
  build:
    name: Run open api file validation
    runs-on: ubuntu-latest
    steps:
      # Check out the repository
      - uses: actions/checkout@v3

      # Run validation
      - uses: HellNSab/gh-action-validate-openapi@latest
        with:
          filepath: 'doc/api.yaml'
```

### Inputs

- **filepath:** File path of the open api file
