import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';

export default function AdminPage() {
  return (
    <div>
      <PageHeader
        title="管理画面"
        description="データの追加・編集方法を確認できます"
        icon="⚙️"
      />

      <div className="space-y-6">
        {/* 概要 */}
        <Card>
          <h2 className="font-bold text-lg text-night-blue mb-4">📖 データ管理について</h2>
          <p className="text-mountain-dark mb-4">
            このアプリのデータはJSONファイルで管理されています。
            新しい山情報や計画を追加する場合は、以下のファイルを直接編集してください。
          </p>
          <div className="bg-glacier/50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              💡 データファイルの場所：<code className="bg-white px-2 py-1 rounded text-deep-blue">src/data/</code>
            </p>
          </div>
        </Card>

        {/* 山情報 */}
        <Card>
          <h2 className="font-bold text-lg text-night-blue mb-4">⛰️ 山情報の追加</h2>
          <p className="text-sm text-gray-600 mb-4">
            ファイル：<code className="bg-glacier px-2 py-1 rounded text-deep-blue">src/data/mountains.json</code>
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400">
{`{
  "id": "mt-fuji",           // ユニークなID（英数字とハイフン）
  "name": "富士山",           // 山名
  "nameKana": "ふじさん",      // 読み仮名
  "elevation": 3776,          // 標高（メートル）
  "location": "山梨県・静岡県", // 所在地
  "difficulty": "中級",        // 初級・中級・上級
  "courseTime": "10〜12時間",  // コースタイム
  "bestSeason": ["7月", "8月", "9月"], // おすすめ時期
  "access": "富士スバルライン五合目まで車・バス",
  "features": ["日本百名山", "最高峰", "世界遺産"],
  "description": "日本最高峰。夏の登山シーズンは多くの登山者で賑わう。",
  "notes": "高山病に注意。防寒具必携。"
}`}
            </pre>
          </div>
        </Card>

        {/* 装備 */}
        <Card>
          <h2 className="font-bold text-lg text-night-blue mb-4">🎒 装備の追加</h2>
          <p className="text-sm text-gray-600 mb-4">
            ファイル：<code className="bg-glacier px-2 py-1 rounded text-deep-blue">src/data/equipment.json</code>
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400">
{`{
  "id": "eq-new-item",        // ユニークなID
  "name": "アイテム名",        // 装備名
  "category": "ギア",         // 服装・ギア・食料/水・緊急用品・その他
  "description": "説明文",    // 説明（省略可）
  "required": true,           // 必須かどうか
  "forWinter": false          // 冬山用かどうか
}`}
            </pre>
          </div>
          <div className="mt-4 p-3 bg-sky-50 border border-sky-200 rounded-lg">
            <p className="text-sm text-deep-blue">
              <strong>カテゴリ一覧：</strong>服装、ギア、食料・水、緊急用品、その他
            </p>
          </div>
        </Card>

        {/* 計画 */}
        <Card>
          <h2 className="font-bold text-lg text-night-blue mb-4">📋 計画の追加</h2>
          <p className="text-sm text-gray-600 mb-4">
            ファイル：<code className="bg-glacier px-2 py-1 rounded text-deep-blue">src/data/plans.json</code>
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400">
{`{
  "id": "plan-unique-id",     // ユニークなID
  "title": "計画タイトル",
  "mountainId": "mt-fuji",    // 山のID（mountains.jsonのid）
  "date": "2026-07-15",       // 日付（YYYY-MM-DD形式）
  "schedule": [
    { "time": "05:00", "activity": "出発", "location": "五合目" },
    { "time": "10:00", "activity": "山頂到着", "location": "山頂" }
  ],
  "equipmentIds": ["eq-base-layer", "eq-rain-jacket"],
  "memo": "メモ・備考",
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-01-01T00:00:00Z"
}`}
            </pre>
          </div>
        </Card>

        {/* テンプレート */}
        <Card>
          <h2 className="font-bold text-lg text-night-blue mb-4">📝 装備テンプレートの追加</h2>
          <p className="text-sm text-gray-600 mb-4">
            ファイル：<code className="bg-glacier px-2 py-1 rounded text-deep-blue">src/data/equipment-templates.json</code>
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400">
{`{
  "id": "tpl-new-template",
  "name": "テンプレート名",
  "tripType": "日帰り",       // 日帰り・小屋泊・テント泊・冬山
  "items": [                  // equipment.jsonのid配列
    "eq-base-layer",
    "eq-rain-jacket"
  ]
}`}
            </pre>
          </div>
        </Card>

        {/* ヒント */}
        <Card className="border-l-4 border-l-winter-sky">
          <h2 className="font-bold text-lg text-winter-sky mb-4">💡 ヒント</h2>
          <ul className="space-y-2 text-mountain-dark">
            <li className="flex items-start gap-2">
              <span className="text-winter-sky">•</span>
              <span>IDは英数字とハイフンで構成し、ファイル内でユニークにしてください</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-winter-sky">•</span>
              <span>JSONの文法エラーに注意（カンマの有無、引用符など）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-winter-sky">•</span>
              <span>ファイルを保存後、アプリを再起動または再ビルドで反映されます</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-winter-sky">•</span>
              <span>開発サーバー実行中は、ファイル保存で自動的に反映されます</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
