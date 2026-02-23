# Plan: Modernization of react-wire-table

## Current State Summary

- **Last release:** July 2020 (v0.1.3)
- **TypeScript:** 3.7.2 (no strict mode)
- **React:** 16.12.0 peerDep + prop-types
- **Build:** Rollup 1 + Babel 7.7 + custom build.js (4 formats: cjs, es, esnext, umd)
- **Tests:** Jest 24 — **0 tests in library** (only 1 trivial test in example/)
- **Linting:** ESLint 7 (.eslintrc.json format), Prettier 1.x, Stylelint 12
- **CI/CD:** None
- **Storybook:** v5.2.6 (severely outdated)
- **DevDependencies:** 55+ packages, many deprecated/vulnerable
- **Source code bugs:** 15+ identified issues

---

## Стратегия: три этапа с точками проверки

### Этап A: Модернизация библиотеки (Фазы 1-8)
> Обновляем всё внутреннее — TypeScript, билд, линтер, тесты, баги в коде.
> **example/ не трогаем вообще.** Storybook не трогаем.
> После завершения: `npm run build` даёт рабочий dist/, который можно подключить в example.

### Этап B: Проверка через example (Фаза 9)
> Запускаем существующий example/ с новым билдом библиотеки.
> Убеждаемся, что таблица рендерится, сортировка работает, checkbox работает.
> Если что-то сломалось — чиним в библиотеке, не в example.

### Этап C: Модернизация example + Storybook (Фазы 10-12)
> Только после подтверждения работоспособности обновляем example/ (CRA → Vite).
> Обновляем Storybook 5 → 8. Настраиваем CI. Финальный security audit.

---

## ЭТАП A: МОДЕРНИЗАЦИЯ БИБЛИОТЕКИ

---

### Фаза 1: TypeScript 3.7 → 5.7, strict mode

#### Файл: `tsconfig.json`

| Настройка | Сейчас | Цель | Зачем |
|-----------|--------|------|-------|
| `"types"` на root-уровне | `["@emotion/core", "node"]` | Удалить | Неправильное расположение; @emotion/core не зависимость |
| `strict` | Частичный (отдельные флаги) | `"strict": true` | Включает все strict-проверки одной строкой |
| `target` | `"es5"` | `"es2017"` | Современный target, Node 18+ поддерживает ES2017 нативно |
| `module` | `"commonjs"` | `"esnext"` | Современная модульная система для Rollup |
| `moduleResolution` | `"node"` | `"bundler"` | Современное разрешение для бандлеров |
| `lib` | `["es6", "dom", "es2016", "es2017"]` | `["es2017", "dom"]` | Упрощение |
| `jsx` | `"react"` | `"react-jsx"` | Новый JSX transform (React 17+), не нужен `import React` |
| `suppressImplicitAnyIndexErrors` | `true` | Удалить | Deprecated в TS 5.5 |
| `allowSyntheticDefaultImports` | `true` | Удалить | Redundant с esModuleInterop |
| `declarationMap` | отсутствует | `true` | IDE-навигация по типам к исходникам |
| `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters` | отдельные | Удалить | Покрыты `"strict": true` |
| `exclude` | Нет тестов/stories | + `"src/**/*.test.ts"`, `"src/**/*.test.tsx"`, `"src/**/*.stories.tsx"` | Тесты/stories не в build-выходе |

#### Изменения в исходном коде для strict mode:
- Исправить все `any` типы в `src/types/index.ts` → заменить на `unknown` или точные типы
- Исправить `stylize(...args: any)` в `src/context/TableContext.tsx`
- Исправить `result = temp as any` в `src/helpers/selectPath.ts`
- Добавить типизацию HOC в `TableContext.tsx`
- Убрать `import * as React from 'react'` → не нужен с новым JSX transform

---

### Фаза 2: Исправление багов в исходном коде

> Делается параллельно с Фазой 1, пока трогаем src/

#### 2.1 `src/helpers/selectPath.ts`
| Строка | Баг | Исправление |
|--------|-----|-------------|
| 7 | Избыточная проверка `typeof path !== 'undefined'` | Убрать, оставить только `typeof path === 'string'` |
| 8-10 | `.replace(']', '').replace('[', '.')` заменяет только первое вхождение | Использовать `.replace(/\]/g, '').replace(/\[/g, '.')` |
| 22 | `result = temp as any` | Убрать cast, использовать type narrowing |

#### 2.2 `src/helpers/getComputedWidth.ts`
| Строка | Баг | Исправление |
|--------|-----|-------------|
| 4 | Опечатка: `souce` | Переименовать в `source` |
| 18 | `.replace(/\D+/g, '')` ломает процентные ширины типа "50%" | Обрабатывать строковые ширины с % отдельно |

#### 2.3 `src/helpers/sorting.ts`
| Строка | Баг | Исправление |
|--------|-----|-------------|
| 6 | `value \|\| JSON.stringify(draft)` — странный fallback | Использовать `value ?? ''` |
| 8 | `.replace(' ', '')` убирает только первый пробел | Использовать `.replace(/\s/g, '')` |
| 15 | `direction: string` — слишком широкий тип | Типизировать как `'asc' \| 'desc'` |

#### 2.4 `src/components/tableBody/TableBody.tsx`
| Строка | Баг | Исправление |
|--------|-----|-------------|
| 18 | Захардкоженный русский текст `'Нет объектов для отображения'` | Заменить на `'No items to display'` |

#### 2.5 `src/components/tableHeaderCell/TableHeaderCell.tsx`
| Строка | Баг | Исправление |
|--------|-----|-------------|
| 32-34 | Нет проверки существования `Kit[kit]` | Добавить guard: `if (kit && Kit[kit])` |
| 40 | Устанавливает `type="button"` на div-элементы | Ставить `type` только когда `sort === true` (button) |

#### 2.6 `src/context/TableContext.tsx`
| Строка | Баг | Исправление |
|--------|-----|-------------|
| 14 | `stylize(...args: any): string` | Типизировать правильно |
| 38 | `React.ComponentType` слишком общий | Добавить generic constraint |
| 40 | Нет типа для `props` | Добавить типизацию |

#### 2.7 `src/types/index.ts`
| Строка | Баг | Исправление |
|--------|-----|-------------|
| 7 | `Record<string, any>` | `Record<string, unknown>` |
| 20 | `processFunc?: (value: any) => any` | Использовать `unknown` или generic |
| 26 | `render?: (item: any)` | Использовать `TItem` |

#### 2.8 SVG Icon компоненты
| Файл | Баг | Исправление |
|------|-----|-------------|
| `arrowDown.tsx` | Захардкоженный `fill="#C8C8C8"`, игнорирует fill prop | Добавить `fill` в интерфейс, использовать `fill \|\| '#C8C8C8'` |
| `arrowUp.tsx` | Та же проблема | Тот же фикс |

#### 2.9 `src/components/tableCell/helpers.tsx`
| Строка | Баг | Исправление |
|--------|-----|-------------|
| 10 | Отсутствует `key` на `<div>` в `getEmptyCells` map | Добавить `key={index}` |

#### 2.10 `src/styles.css`
- 8 пустых определений классов — удалить или добавить комментарий что это placeholder'ы

---

### Фаза 3: Зависимости — очистка и обновление

#### Удалить deprecated/ненужные devDependencies:
| Пакет | Причина |
|-------|---------|
| `standard-version` | Archived |
| `commitizen` + `cz-conventional-changelog` | Не нужны |
| `@commitlint/cli` + `@commitlint/config-conventional` | Убрать (можно вернуть позже) |
| `husky` v3 | Старый формат хуков |
| `lint-staged` v9 | Убрать (можно вернуть с современным husky v9) |
| `pretty-quick` | Заменяется prettier напрямую |
| `gh-pages` | Будет через GitHub Actions |
| `autoprefixer` | Современные браузеры не нуждаются |
| `postcss-preset-env` | Не нужен |
| `css-loader`, `style-loader` | Storybook-специфичные, будут через Storybook 8 |
| `awesome-typescript-loader` | Deprecated |
| `react-docgen-typescript-loader` | Storybook-специфичный, deprecated |

#### Удалить из package.json секции:
- `commitlint.config.js` (файл)
- `husky` config section
- `lint-staged` config section
- `config.commitizen` section

#### Обновить runtime dependency:
- `classifizer` ^1.0.7 → latest (ваша библиотека, только что обновлена)

#### Удалить peerDependency:
- `prop-types` — не нужен с TypeScript, React 17+ не навязывает prop-types

#### Обновить peerDependencies:
```json
"peerDependencies": {
  "react": ">=17.0.0",
  "react-dom": ">=17.0.0"
}
```

---

### Фаза 4: Билд-система — Rollup 1 + Babel → Rollup 4 + tsc

#### Удалить всю директорию `build-tool/`:
- `build-tool/build.js`, `rollup.config.js`, `babelrc.base.js`, `babelrc.cjs.js`, `babelrc.esm.js`, `babelrc.esm.pure.js`, `babelrc.umd.js`, `utils.js`, `peerDep.js`

#### Удалить файлы:
- `.babelrc`

#### Создать: `rollup.config.mjs` (в корне)
Два выхода: ESM + CJS. CSS извлекается через rollup-plugin-postcss. Типы через tsc.

#### Создать: `tsconfig.build.json` (для билда)
Расширяет tsconfig.json, добавляет declaration, declarationMap, исключает тесты и stories.

#### Удалить devDependencies (Babel + старый Rollup):
- Все `@babel/*` пакеты (cli, core, plugin-proposal-*, preset-*)
- `babel-loader`, `babel-plugin-*`, `babel-eslint`
- `rollup` v1, `rollup-plugin-babel`, `rollup-plugin-commonjs`, `rollup-plugin-node-resolve`
- `rollup-plugin-size-snapshot`, `rollup-plugin-terser`, `@rollup/plugin-replace`
- Утилиты: `concurrently`, `cross-spawn`, `rimraf`, `which`, `yargs-parser`, `read-pkg-up`, `glob`, `inflected`

#### Добавить devDependencies:
- `rollup` ^4, `@rollup/plugin-node-resolve`, `@rollup/plugin-commonjs`, `@rollup/plugin-typescript`, `@rollup/plugin-terser`
- `rollup-plugin-postcss` (latest), `rollup-plugin-peer-deps-external` (latest)
- `tslib` ^2.8

---

### Фаза 5: package.json — модернизация

| Поле | Сейчас | Цель |
|------|--------|------|
| `main` | `"dist/cjs/index"` | `"dist/cjs/index.js"` |
| `module` | `"dist/es/index"` | `"dist/es/index.js"` |
| `types` | `"dist/types/index.d.ts"` | Оставить |
| `exports` | отсутствует | Conditional exports (types/import/require + CSS) |
| `sideEffects` | `false` | `["*.css"]` (CSS — side effect!) |
| `engines.node` | `">=8.0.0"` | `">=18"` |
| `keywords` | `["react", "react-wire-table", "library"]` | `["react", "table", "wire-table", "sortable-table", "typescript"]` |

#### Добавить `exports`:
```json
"exports": {
  ".": {
    "types": "./dist/types/index.d.ts",
    "import": "./dist/es/index.js",
    "require": "./dist/cjs/index.js"
  },
  "./styles.css": "./dist/react-wire-table.css"
}
```

#### Обновить scripts:
```json
"scripts": {
  "build": "rollup -c rollup.config.mjs",
  "typecheck": "tsc --noEmit",
  "lint": "eslint src/",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "pre-publish": "npm run typecheck && npm run lint && npm run test && npm run build"
}
```

---

### Фаза 6: ESLint 7 (.eslintrc.json) → ESLint 9 flat config

#### Удалить:
- `.eslintrc.json`

#### Создать: `eslint.config.mjs`
```javascript
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    plugins: { react: reactPlugin, 'react-hooks': reactHooksPlugin },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
    settings: { react: { version: 'detect' } },
  },
  { ignores: ['dist/**', 'node_modules/**', 'build-tool/**', 'example/**', 'docs/**'] }
);
```

#### Удалить devDependencies:
- `eslint-config-airbnb`, `eslint-config-airbnb-base`, `eslint-config-prettier`
- `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-prettier`
- `babel-eslint`
- `@typescript-eslint/eslint-plugin` v2, `@typescript-eslint/parser` v2

#### Добавить devDependencies:
- `@eslint/js` ^9.18, `typescript-eslint` ^8.20
- `eslint-plugin-react` (latest), `eslint-plugin-react-hooks` (latest)

---

### Фаза 7: Jest 24 → Vitest + написание тестов

#### Удалить:
- `jest.config.js`
- `__mocks__/styleMock.js`

#### Создать: `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      include: ['src/components/**/*.{ts,tsx}', 'src/helpers/**/*.ts', 'src/context/**/*.tsx'],
      exclude: ['src/**/*.test.*', 'src/**/index.ts'],
    },
  },
});
```

#### Написать тесты (сейчас 0 в библиотеке!):
- `src/helpers/__tests__/selectPath.test.ts` — вложенные пути, bracket notation, edge cases
- `src/helpers/__tests__/sorting.test.ts` — prepare(), mainSorting(), sorter()
- `src/helpers/__tests__/getComputedWidth.test.ts` — вычисление ширины
- `src/components/__tests__/Table.test.tsx` — рендеринг Table, сортировка, контекст
- `src/components/__tests__/TableBody.test.tsx` — пустое состояние, рендеринг items
- `src/components/__tests__/TableHeaderCell.test.tsx` — взаимодействие сортировки

#### Удалить devDependencies:
- `jest`, `babel-jest`, `ts-jest`, `@types/jest`
- `@testing-library/jest-dom` v4, `@testing-library/react` v9
- `react-test-renderer`, `@types/react-test-renderer`

#### Добавить devDependencies:
- `vitest` ^3.0, `@vitest/coverage-v8` ^3.0
- `@testing-library/react` ^16.0, `@testing-library/jest-dom` ^6.0
- `jsdom`

---

### Фаза 8: Очистка файлов + Prettier + .gitignore + GitHub Actions CI

#### Удалить:
- `commitlint.config.js`
- `stylelint.config.js` + `.stylelintignore`

#### Обновить:
- `prettier.config.js` → Prettier 3 конфиг
- `.prettierignore` — обновить
- `.gitignore` — очистить (убрать `build`, `.docz`, добавить `coverage`)

#### Создать: `.github/workflows/ci.yml`
```yaml
name: CI
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
      - run: npm run test:coverage
```

---

### Точка проверки Этапа A:
```bash
rm -rf node_modules package-lock.json
npm install
npm run typecheck   # tsc --noEmit — нет ошибок
npm run lint        # eslint — нет ошибок
npm run build       # rollup → dist/ с ESM, CJS, CSS, types
npm run test        # vitest — все тесты проходят
```

---

## ЭТАП B: ПРОВЕРКА ЧЕРЕЗ EXAMPLE

---

### Фаза 9: Проверка существующего example с новым билдом

1. Убедиться что `npm run build` создал корректный `dist/`
2. Зайти в `example/`, установить зависимости, запустить
3. Проверить:
   - Таблица рендерится
   - Сортировка по колонкам работает
   - Checkbox (kit) работает
   - CSS стили применяются
   - Нет console errors
4. Если что-то сломалось — чиним в **библиотеке**, не в example
5. Повторяем до полной работоспособности

---

## ЭТАП C: МОДЕРНИЗАЦИЯ ИНФРАСТРУКТУРЫ

> Только после подтверждения работоспособности библиотеки

---

### Фаза 10: Example — CRA → Vite

- Удалить `example/` полностью
- Создать новый `example/` с Vite + React + TypeScript
- Минимальный standalone-пример: таблица с сортировкой, custom render, CSS modules, checkbox kit
- `example/package.json` с зависимостью `"react-wire-table": "file:.."`
- Проверить запуск: `cd example && npm install && npm run dev`

---

### Фаза 11: Storybook 5 → 8

#### Удалить:
- `.storybook/addons.js`, `config.js`, `presets.js`, `webpack.config.js`

#### Создать:
- `.storybook/main.ts` — Storybook 8 с Vite builder
- `.storybook/preview.ts` — Global decorators
- Story файлы в `src/` в CSF3 формате

#### Добавить devDependencies:
- `@storybook/react-vite`, `@storybook/react`, `@storybook/addon-essentials`, `storybook`

#### Удалить devDependencies:
- `@storybook/addon-actions` v5, `@storybook/addon-docs` v5, `@storybook/addon-links` v5
- `@storybook/addons` v5, `@storybook/react` v5

---

### Фаза 12: Финальный security audit

- Запустить `npm audit` после чистой установки
- Большинство уязвимостей уйдут с удалением 40+ deprecated devDeps
- Проверить оставшиеся и исправить
- Удалить старый `package-lock.json`, сгенерировать новый

---

## Ожидаемые devDependencies после всех фаз (~20 пакетов вместо 55+)

```json
"devDependencies": {
  "@eslint/js": "^9.18.0",
  "@rollup/plugin-commonjs": "^28.0.0",
  "@rollup/plugin-node-resolve": "^16.0.0",
  "@rollup/plugin-terser": "^0.4.0",
  "@rollup/plugin-typescript": "^12.0.0",
  "@storybook/react-vite": "^8.0.0",
  "@testing-library/react": "^16.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "@vitest/coverage-v8": "^3.0.0",
  "eslint": "^9.18.0",
  "eslint-plugin-react": "latest",
  "eslint-plugin-react-hooks": "latest",
  "jsdom": "latest",
  "prettier": "^3.4.0",
  "rollup": "^4.0.0",
  "rollup-plugin-peer-deps-external": "^2.2.0",
  "rollup-plugin-postcss": "latest",
  "storybook": "^8.0.0",
  "tslib": "^2.8.0",
  "typescript": "^5.7.0",
  "typescript-eslint": "^8.20.0",
  "vitest": "^3.0.0"
}
```
