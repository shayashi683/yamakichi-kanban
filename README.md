# 🏔️ Mountain Planner - 登山計画アプリ

安全で楽しい登山をサポートする計画アプリです。

![Snow Mountain Theme](https://img.shields.io/badge/theme-snow%20mountain-38BDF8)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8)

## ✨ 機能

### ⛰️ 山情報
- 山の基本情報（標高、難易度、コースタイム等）
- ベストシーズン・アクセス情報
- 注意事項の確認

### 🎒 装備管理
- カテゴリ別の装備チェックリスト
- 進捗バーで準備状況を可視化
- テンプレート機能（日帰り・小屋泊・冬山等）
- チェック状態はブラウザに自動保存

### 📋 計画閲覧
- 登山計画の一覧・詳細表示
- タイムスケジュールの確認
- 必要装備リストの確認

## 🚀 始め方

### 開発サーバーの起動

```bash
cd mountain-planner
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

### 本番ビルド

```bash
npm run build
npm start
```

## 📁 プロジェクト構成

```
mountain-planner/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # ホームページ
│   │   ├── mountains/         # 山情報ページ
│   │   ├── equipment/         # 装備管理ページ
│   │   ├── plans/             # 計画ページ
│   │   └── admin/             # 管理画面
│   ├── components/            # 共通コンポーネント
│   ├── data/                  # JSONデータファイル
│   │   ├── mountains.json     # 山情報
│   │   ├── equipment.json     # 装備リスト
│   │   ├── equipment-templates.json  # 装備テンプレート
│   │   └── plans.json         # 登山計画
│   └── types/                 # TypeScript型定義
└── ...
```

## 🤖 Claude Code で旅程を作成する

Claude Code を使って、対話形式で登山計画を作成できます。

### 基本的な流れ

```
1. 「○月○日に○○山に登りたい」と伝える
2. Claude が山情報を調査して追加
3. 「○○駅からのアクセスを調べて」でアクセス情報を追加
4. 「山頂○時のプランにして」で時間調整
5. 「○○は不要」「△△を追加」で装備を調整
```

### 使用例

```
ユーザー: 1/18に北横岳に登るので、その情報を調査して追加して
Claude: (WebSearchで情報を調査し、mountains.jsonとplans.jsonに追加)

ユーザー: 五反田駅から北八ヶ岳ロープウェイまでの行き方も調べて
Claude: (電車・バスの時刻を調査し、アクセス情報を追加)

ユーザー: 装備リストからレインウェアは不要
Claude: (equipmentIdsから該当装備を削除)

ユーザー: ニット帽は必須で追加して
Claude: (equipment.jsonに装備を追加し、計画に紐付け)
```

### 参考リンクの自動追加

調査に使用したURL（時刻表、山小屋サイト等）は自動的に計画の「参考リンク」セクションに追加され、いつでもアクセスできます。

詳細は `CLAUDE.md` を参照してください。

## 📝 データの追加方法（手動）

データはJSONファイルで管理されています。詳細は管理画面（`/admin`）を参照してください。

### 山情報の追加（`src/data/mountains.json`）

```json
{
  "id": "mt-fuji",
  "name": "富士山",
  "nameKana": "ふじさん",
  "elevation": 3776,
  "location": "山梨県・静岡県",
  "difficulty": "中級",
  "courseTime": "10〜12時間",
  "bestSeason": ["7月", "8月", "9月"],
  "access": "富士スバルライン五合目まで車・バス",
  "features": ["日本百名山", "最高峰"],
  "description": "日本最高峰。",
  "notes": "高山病に注意。"
}
```

### 難易度の種類
- `初級` - 初心者向け
- `中級` - 経験者向け
- `上級` - 熟練者向け

### 装備カテゴリ
- `服装`
- `ギア`
- `食料・水`
- `緊急用品`
- `その他`

## 🎨 デザイン

雪山をイメージした白・青・水色系のカラーテーマを採用。
モバイルファーストのレスポンシブデザインで、スマートフォンでも快適に使用できます。

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **スタイリング**: Tailwind CSS 4
- **言語**: TypeScript
- **データ管理**: JSON ファイル（将来的にDB移行可能）

## 📱 対応環境

- モダンブラウザ（Chrome, Firefox, Safari, Edge）
- モバイル対応（iOS Safari, Android Chrome）

## 📄 ライセンス

MIT
