import Link from 'next/link';
import Card from '@/components/Card';
import mountains from '@/data/mountains.json';
import plans from '@/data/plans.json';

export default function Home() {
  const upcomingPlans = plans.slice(0, 3);
  const featuredMountains = mountains.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* ヒーローセクション */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-night-blue via-deep-blue to-winter-sky p-8 sm:p-12 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            🏔️ Mountain Planner
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-6">
            安全で楽しい登山をサポートする計画アプリ
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/plans" className="btn-primary bg-white/20 hover:bg-white/30">
              計画を見る
            </Link>
            <Link href="/mountains" className="btn-primary bg-white/20 hover:bg-white/30">
              山を探す
            </Link>
          </div>
        </div>
      </div>

      {/* クイックアクセス */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/plans" className="card p-4 text-center hover:scale-105 transition-transform">
          <span className="text-3xl mb-2 block">📋</span>
          <span className="font-medium text-mountain-dark">計画</span>
        </Link>
        <Link href="/mountains" className="card p-4 text-center hover:scale-105 transition-transform">
          <span className="text-3xl mb-2 block">⛰️</span>
          <span className="font-medium text-mountain-dark">山情報</span>
        </Link>
        <Link href="/equipment" className="card p-4 text-center hover:scale-105 transition-transform">
          <span className="text-3xl mb-2 block">🎒</span>
          <span className="font-medium text-mountain-dark">装備</span>
        </Link>
        <Link href="/admin" className="card p-4 text-center hover:scale-105 transition-transform">
          <span className="text-3xl mb-2 block">⚙️</span>
          <span className="font-medium text-mountain-dark">管理</span>
        </Link>
      </div>

      {/* 直近の計画 */}
      {upcomingPlans.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-night-blue">📅 直近の計画</h2>
            <Link href="/plans" className="text-winter-sky hover:text-deep-blue text-sm font-medium">
              すべて見る →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingPlans.map((plan) => {
              const mountain = mountains.find(m => m.id === plan.mountainId);
              return (
                <Link key={plan.id} href={`/plans/${plan.id}`}>
                  <Card hover className="h-full">
                    <div className="text-sm text-winter-sky font-medium mb-1">
                      {new Date(plan.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <h3 className="font-bold text-mountain-dark mb-2">{plan.title}</h3>
                    {mountain && (
                      <div className="text-sm text-gray-600">
                        <span className="inline-flex items-center gap-1">
                          <span>⛰️</span>
                          {mountain.name} ({mountain.elevation}m)
                        </span>
                      </div>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 山情報 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-night-blue">⛰️ 山情報</h2>
          <Link href="/mountains" className="text-winter-sky hover:text-deep-blue text-sm font-medium">
            すべて見る →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredMountains.map((mountain) => (
            <Link key={mountain.id} href={`/mountains/${mountain.id}`}>
              <Card hover className="h-full">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-mountain-dark">{mountain.name}</h3>
                  <span className={`badge ${
                    mountain.difficulty === '初級' ? 'badge-beginner' :
                    mountain.difficulty === '中級' ? 'badge-intermediate' :
                    'badge-advanced'
                  }`}>
                    {mountain.difficulty}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>📍 {mountain.location}</div>
                  <div>📏 {mountain.elevation}m</div>
                  <div>⏱️ {mountain.courseTime}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
