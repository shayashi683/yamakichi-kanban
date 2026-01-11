# Claude Code 向けガイド

このファイルは Claude Code がこのプロジェクトを理解し、効率的に作業するためのガイドです。

## プロジェクト概要

Mountain Planner - 登山計画を管理するNext.jsアプリケーション

## 開発環境

```bash
# 依存関係インストール
npm install

# 開発サーバー起動（Next.js 15を使用）
npm run dev

# 注意: Next.js 16はTurbopack WASMの問題があるため、Next.js 15にダウングレードして使用
npm install next@15 react@18 react-dom@18 --force
```

## データ構造

### 計画 (plans.json)
```typescript
interface Plan {
  id: string;
  title: string;
  mountainId: string;
  date: string; // YYYY-MM-DD
  access?: AccessItem[]; // アクセス情報
  schedule: PlanScheduleItem[]; // タイムスケジュール
  equipmentIds: string[]; // 装備IDリスト
  memo: string;
  links?: ReferenceLink[]; // 参考リンク
}
```

### 山情報 (mountains.json)
```typescript
interface Mountain {
  id: string;
  name: string;
  elevation: number;
  difficulty: '初級' | '中級' | '上級';
  accessUrl?: string; // アクセス参考URL
  referenceUrl?: string; // 山情報参考URL
}
```

### 装備 (equipment.json)
```typescript
interface EquipmentItem {
  id: string;
  name: string;
  category: '服装' | 'ギア' | '食料・水' | '緊急用品' | 'その他';
  requirementLevel: '必須' | 'あると便利';
  forWinter: boolean;
}
```

## 旅程作成の手順

### 1. 山情報を調査して追加

```
ユーザー: 「○○山に登りたい」
```

1. WebSearchで山の情報を調査（標高、難易度、コースタイム、アクセス等）
2. `src/data/mountains.json` に山情報を追加
3. `referenceUrl` と `accessUrl` を設定

### 2. 計画を作成

1. 日程を確認
2. アクセス情報を調査（電車・バスの時刻、運賃）
3. タイムスケジュールを作成
4. 必要な装備を選定
5. `src/data/plans.json` に計画を追加

### 3. アクセス情報の調査

```
ユーザー: 「○○駅から△△までの行き方を調べて」
```

1. WebSearchで電車・バスの時刻表を調査
2. 乗換案内サイト（NAVITIME、ジョルダン等）を参照
3. `access` 配列に以下を追加:
   - time: 時刻
   - activity: 行動内容
   - transport: 交通手段
   - transportUrl: 時刻表等のURL（リンク埋め込み用）
   - cost: 運賃

### 4. 装備リストの調整

```
ユーザー: 「○○は不要」「△△を追加して」
```

- 不要な装備: `equipmentIds` から該当IDを削除
- 追加する装備: `equipment.json` に装備を追加し、`equipmentIds` にIDを追加
- 分類変更: `requirementLevel` を「必須」または「あると便利」に変更

### 5. 参考リンクの追加

調査に使用したURLは `links` 配列に追加して、いつでもアクセスできるようにする:

```json
"links": [
  { "title": "バス時刻表", "url": "https://..." },
  { "title": "山小屋情報", "url": "https://..." }
]
```

## よく使うコマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lint
npm run lint
```

## ファイル構成

```
src/
├── app/                    # ページコンポーネント
│   ├── plans/[id]/page.tsx # 計画詳細ページ
│   ├── mountains/[id]/page.tsx # 山詳細ページ
│   └── equipment/page.tsx  # 装備管理ページ
├── data/                   # JSONデータ
│   ├── plans.json          # 計画データ
│   ├── mountains.json      # 山情報
│   └── equipment.json      # 装備リスト
└── types/index.ts          # 型定義
```
