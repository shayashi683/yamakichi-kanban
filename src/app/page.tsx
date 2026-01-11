import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import plans from '@/data/plans.json';
import mountains from '@/data/mountains.json';
import { Plan, Mountain, Difficulty } from '@/types';

export default function Home() {
  // 日付でソート（新しい順）
  const sortedPlans = [...(plans as Plan[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <PageHeader
        title="登山計画"
        description="登山計画の一覧と詳細を確認できます"
        icon="📋"
      />

      {sortedPlans.length > 0 ? (
        <div className="space-y-4">
          {sortedPlans.map((plan) => {
            const mountain = (mountains as Mountain[]).find(
              (m) => m.id === plan.mountainId
            );
            const planDate = new Date(plan.date);
            const isUpcoming = planDate >= new Date();
            const isPast = planDate < new Date();

            return (
              <Link key={plan.id} href={`/plans/${plan.id}`}>
                <Card hover>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* 日付 */}
                    <div className="flex-shrink-0 text-center sm:text-left">
                      <div
                        className={`inline-block px-4 py-2 rounded-lg ${
                          isUpcoming
                            ? 'bg-winter-sky text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        <div className="text-2xl font-bold">
                          {planDate.getDate()}
                        </div>
                        <div className="text-sm">
                          {planDate.toLocaleDateString('ja-JP', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>

                    {/* 計画情報 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h2 className="font-bold text-lg text-mountain-dark truncate">
                          {plan.title}
                        </h2>
                        {isUpcoming && (
                          <span className="flex-shrink-0 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            予定
                          </span>
                        )}
                        {isPast && (
                          <span className="flex-shrink-0 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            完了
                          </span>
                        )}
                      </div>

                      {mountain && (
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <span>⛰️</span>
                            {mountain.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <span>📏</span>
                            {mountain.elevation.toLocaleString()}m
                          </span>
                          <Badge
                            variant="difficulty"
                            difficulty={mountain.difficulty as Difficulty}
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <span>📍</span>
                          {plan.schedule.length} ポイント
                        </span>
                        <span className="flex items-center gap-1">
                          <span>🎒</span>
                          {plan.equipmentIds.length} 装備
                        </span>
                      </div>
                    </div>

                    {/* 矢印 */}
                    <div className="hidden sm:block text-gray-400">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">まだ計画が登録されていません</p>
          <Link href="/admin" className="btn-primary inline-block">
            計画を追加する
          </Link>
        </Card>
      )}
    </div>
  );
}
