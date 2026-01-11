import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import plans from '@/data/plans.json';
import mountains from '@/data/mountains.json';
import { Plan, Mountain } from '@/types';

// 難易度に応じたグラデーション
const getGradient = (difficulty: string, isWinter: boolean) => {
  if (isWinter) {
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
  }
  switch (difficulty) {
    case '初級':
      return 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
    case '中級':
      return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    case '上級':
      return 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)';
    default:
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
};

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPlans.map((plan) => {
            const mountain = (mountains as Mountain[]).find(
              (m) => m.id === plan.mountainId
            );
            const planDate = new Date(plan.date);
            const isUpcoming = planDate >= new Date();
            const month = planDate.getMonth() + 1;
            const isWinter = month === 12 || month === 1 || month === 2 || month === 3;

            return (
              <Link key={plan.id} href={`/plans/${plan.id}`}>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* 背景グラデーション */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: getGradient(mountain?.difficulty || '', isWinter),
                    }}
                  />

                  {/* 山のシルエット装飾 */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20">
                    <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="w-full h-full">
                      <path
                        d="M0,100 L0,60 L50,30 L100,50 L150,20 L200,45 L250,15 L300,40 L350,25 L400,50 L400,100 Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  {/* コンテンツ */}
                  <div className="relative p-6 h-56 flex flex-col justify-between text-white">
                    {/* 上部：日付とステータス */}
                    <div className="flex justify-between items-start">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                        <div className="text-3xl font-bold">{planDate.getDate()}</div>
                        <div className="text-sm opacity-90">
                          {planDate.toLocaleDateString('ja-JP', {
                            month: 'short',
                          })}
                        </div>
                      </div>
                      {isUpcoming && (
                        <span className="bg-white/90 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                          予定
                        </span>
                      )}
                      {!isUpcoming && (
                        <span className="bg-white/60 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                          完了
                        </span>
                      )}
                    </div>

                    {/* 下部：山情報 */}
                    <div>
                      <h2 className="font-bold text-xl mb-2 drop-shadow-md">
                        {plan.title}
                      </h2>
                      {mountain && (
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                            <span>⛰️</span>
                            {mountain.elevation.toLocaleString()}m
                          </span>
                          <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                            {mountain.difficulty}
                          </span>
                          {isWinter && (
                            <span className="bg-white/30 backdrop-blur-sm rounded-full px-2 py-1">
                              ❄️
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ホバー時のオーバーレイ */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
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
