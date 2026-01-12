import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import plans from '@/data/plans.json';
import mountains from '@/data/mountains.json';
import equipment from '@/data/equipment.json';
import { Plan, Mountain, EquipmentItem, Difficulty, EquipmentCategory, AccessItem, ReferenceLink } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

const categoryOrder: EquipmentCategory[] = ['服装', 'ギア', '食料・水', '緊急用品', 'その他'];

const categoryIcons: Record<EquipmentCategory, string> = {
  '服装': '👕',
  'ギア': '🧰',
  '食料・水': '🍙',
  '緊急用品': '🆘',
  'その他': '📦',
};

// 交通費を計算する関数
function calculateTotalTransportCost(accessItems: AccessItem[]): number {
  return accessItems.reduce((total, item) => {
    if (!item.cost) return total;
    // "4,130円" -> 4130 のように変換
    const costNumber = parseInt(item.cost.replace(/[,円]/g, ''), 10);
    return total + (isNaN(costNumber) ? 0 : costNumber);
  }, 0);
}

export default async function PlanDetailPage({ params }: Props) {
  const { id } = await params;
  const plan = (plans as Plan[]).find((p) => p.id === id);

  if (!plan) {
    notFound();
  }

  const mountain = (mountains as Mountain[]).find((m) => m.id === plan.mountainId);
  const planEquipment = (equipment as EquipmentItem[]).filter((e) =>
    plan.equipmentIds.includes(e.id)
  );
  
  // 交通費の合計を計算
  const totalTransportCost = plan.access ? calculateTotalTransportCost(plan.access as AccessItem[]) : 0;

  // 装備をカテゴリ別にグループ化（必須を先に）
  const groupedEquipment = categoryOrder.reduce((acc, category) => {
    const items = planEquipment.filter((item) => item.category === category);
    // 必須を先にソート
    items.sort((a, b) => {
      if (a.requirementLevel === '必須' && b.requirementLevel !== '必須') return -1;
      if (a.requirementLevel !== '必須' && b.requirementLevel === '必須') return 1;
      return 0;
    });
    acc[category] = items;
    return acc;
  }, {} as Record<EquipmentCategory, EquipmentItem[]>);

  const planDate = new Date(plan.date);

  return (
    <div>
      {/* 戻るリンク */}
      <Link
        href="/plans"
        className="inline-flex items-center gap-1 text-winter-sky hover:text-deep-blue mb-4"
      >
        ← 計画一覧に戻る
      </Link>

      <PageHeader title={plan.title} icon="📋" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* メイン情報 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 基本情報カード */}
          <Card>
            <h2 className="font-bold text-lg text-night-blue mb-4">📅 基本情報</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📆</span>
                <div>
                  <p className="text-sm text-gray-500">日程</p>
                  <p className="font-medium text-mountain-dark">
                    {planDate.toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long',
                    })}
                  </p>
                </div>
              </div>
              {mountain && (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⛰️</span>
                    <div>
                      <p className="text-sm text-gray-500">目的地</p>
                      <Link
                        href={`/mountains/${mountain.id}`}
                        className="font-medium text-winter-sky hover:text-deep-blue"
                      >
                        {mountain.name}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📏</span>
                    <div>
                      <p className="text-sm text-gray-500">標高</p>
                      <p className="font-medium text-mountain-dark">
                        {mountain.elevation.toLocaleString()}m
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="text-sm text-gray-500">難易度</p>
                      <Badge variant="difficulty" difficulty={mountain.difficulty as Difficulty} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* アクセス */}
          {plan.access && plan.access.length > 0 && (
            <Card>
              <h2 className="font-bold text-lg text-night-blue mb-4">🚃 アクセス</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-glacier" />
                <div className="space-y-3">
                  {(plan.access as AccessItem[]).map((item, index) => (
                    <div key={index} className="flex gap-4 relative">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-deep-blue text-white flex items-center justify-center text-xs font-bold z-10">
                        {index + 1}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-bold text-night-blue">{item.time}</span>
                          {item.transportUrl ? (
                            <a
                              href={item.transportUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2 py-0.5 bg-sky-light text-deep-blue rounded-full hover:bg-winter-sky hover:text-white transition-colors"
                            >
                              {item.transport} ↗
                            </a>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-sky-light text-deep-blue rounded-full">
                              {item.transport}
                            </span>
                          )}
                          {item.cost && (
                            <span className="text-xs text-gray-500">({item.cost})</span>
                          )}
                        </div>
                        <p className="text-mountain-dark text-sm">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {totalTransportCost > 0 && (
                <div className="mt-4 pt-3 border-t border-glacier">
                  <p className="text-sm font-medium text-mountain-dark">
                    💰 交通費合計: {totalTransportCost.toLocaleString()}円（片道）
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* タイムスケジュール */}
          <Card>
            <h2 className="font-bold text-lg text-night-blue mb-4">⏱️ タイムスケジュール</h2>
            <div className="relative">
              {/* タイムライン */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-glacier" />
              
              <div className="space-y-4">
                {plan.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4 relative">
                    {/* タイムラインドット */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-winter-sky text-white flex items-center justify-center text-sm font-bold z-10">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-night-blue">{item.time}</span>
                        {item.location && (
                          <span className="text-sm text-gray-500">@ {item.location}</span>
                        )}
                      </div>
                      <p className="text-mountain-dark">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* メモ */}
          {plan.memo && (
            <Card>
              <h2 className="font-bold text-lg text-night-blue mb-4">📝 メモ</h2>
              <p className="text-mountain-dark whitespace-pre-wrap">{plan.memo}</p>
            </Card>
          )}
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* 装備リスト */}
          <Card>
            <h2 className="font-bold text-lg text-night-blue mb-4">
              🎒 装備リスト
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({planEquipment.length}点)
              </span>
            </h2>
            <div className="space-y-4">
              {categoryOrder.map((category) => {
                const items = groupedEquipment[category];
                if (items.length === 0) return null;

                return (
                  <div key={category}>
                    <h3 className="text-sm font-medium mb-2 text-night-blue flex items-center gap-1">
                      <span>{categoryIcons[category]}</span>
                      {category}
                      <span className="ml-1 text-xs text-gray-500">({items.length}点)</span>
                    </h3>
                    <ul className="space-y-1">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center gap-2 text-sm text-mountain-dark flex-wrap"
                        >
                          <span className={item.requirementLevel === '必須' ? 'text-red-500' : 'text-yellow-500'}>✓</span>
                          <span>{item.name}</span>
                          {item.requirementLevel === '必須' ? (
                            <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-700 rounded">必須</span>
                          ) : (
                            <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded">便利</span>
                          )}
                          {item.forWinter && (
                            <span className="text-xs text-blue-500">❄️</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-glacier">
              <Link
                href="/equipment"
                className="text-winter-sky hover:text-deep-blue text-sm font-medium"
              >
                装備チェックリストへ →
              </Link>
            </div>
          </Card>

          {/* 山情報リンク */}
          {mountain && (
            <Card>
              <h2 className="font-bold text-lg text-night-blue mb-4">⛰️ 山情報</h2>
              <p className="text-sm text-gray-600 mb-4">{mountain.description}</p>
              <Link
                href={`/mountains/${mountain.id}`}
                className="btn-primary w-full text-center block"
              >
                詳細を見る
              </Link>
            </Card>
          )}
        </div>
      </div>

      {/* 参考リンク（ページ最下部） */}
      {plan.links && plan.links.length > 0 && (
        <Card className="mt-6">
          <h2 className="font-bold text-lg text-night-blue mb-4">🔗 参考リンク</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {(plan.links as ReferenceLink[]).map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-glacier transition-colors text-winter-sky hover:text-deep-blue"
              >
                <span className="text-gray-400">→</span>
                <span className="text-sm underline">{link.title}</span>
              </a>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// 静的パラメータの生成
export async function generateStaticParams() {
  return (plans as Plan[]).map((plan) => ({
    id: plan.id,
  }));
}
