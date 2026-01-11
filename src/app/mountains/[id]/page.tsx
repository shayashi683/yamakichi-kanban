import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import mountains from '@/data/mountains.json';
import { Mountain, Difficulty } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MountainDetailPage({ params }: Props) {
  const { id } = await params;
  const mountain = (mountains as Mountain[]).find((m) => m.id === id);

  if (!mountain) {
    notFound();
  }

  return (
    <div>
      {/* 戻るリンク */}
      <Link
        href="/mountains"
        className="inline-flex items-center gap-1 text-winter-sky hover:text-deep-blue mb-4"
      >
        ← 山情報一覧に戻る
      </Link>

      <PageHeader title={mountain.name} icon="⛰️" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* メイン情報 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 基本情報カード */}
          <Card>
            <h2 className="font-bold text-lg text-night-blue mb-4">基本情報</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-sm text-gray-500">所在地</p>
                  <p className="font-medium text-mountain-dark">{mountain.location}</p>
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
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="text-sm text-gray-500">コースタイム</p>
                  <p className="font-medium text-mountain-dark">{mountain.courseTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="text-sm text-gray-500">難易度</p>
                  <Badge variant="difficulty" difficulty={mountain.difficulty as Difficulty} />
                </div>
              </div>
            </div>
          </Card>

          {/* 説明カード */}
          <Card>
            <h2 className="font-bold text-lg text-night-blue mb-4">概要</h2>
            <p className="text-mountain-dark leading-relaxed">{mountain.description}</p>
          </Card>

          {/* アクセスカード */}
          <Card>
            <h2 className="font-bold text-lg text-night-blue mb-4">🚃 アクセス</h2>
            <p className="text-mountain-dark leading-relaxed">{mountain.access}</p>
            {mountain.accessUrl && (
              <a
                href={mountain.accessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-winter-sky hover:text-deep-blue"
              >
                詳細を見る ↗
              </a>
            )}
          </Card>

          {/* 注意事項カード */}
          {mountain.notes && (
            <Card className="border-l-4 border-l-amber-400 bg-amber-50/50">
              <h2 className="font-bold text-lg text-amber-700 mb-4">⚠️ 注意事項</h2>
              <p className="text-amber-900 leading-relaxed">{mountain.notes}</p>
            </Card>
          )}
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* ベストシーズン */}
          <Card>
            <h2 className="font-bold text-lg text-night-blue mb-4">🗓️ ベストシーズン</h2>
            <div className="flex flex-wrap gap-2">
              {mountain.bestSeason.map((month) => (
                <span
                  key={month}
                  className="px-3 py-1 bg-sky-light text-deep-blue rounded-full text-sm font-medium"
                >
                  {month}
                </span>
              ))}
            </div>
          </Card>

          {/* 特徴タグ */}
          <Card>
            <h2 className="font-bold text-lg text-night-blue mb-4">🏷️ 特徴</h2>
            <div className="flex flex-wrap gap-2">
              {mountain.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 bg-glacier text-deep-blue rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </Card>

          {/* 参考リンク */}
          {mountain.referenceUrl && (
            <Card>
              <h2 className="font-bold text-lg text-night-blue mb-4">🔗 参考情報</h2>
              <a
                href={mountain.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-winter-sky hover:text-deep-blue transition-colors"
              >
                <span className="text-gray-400">→</span>
                <span className="text-sm underline">山と溪谷オンライン ↗</span>
              </a>
            </Card>
          )}

          {/* アクションボタン */}
          <Card>
            <Link
              href={`/plans?mountainId=${mountain.id}`}
              className="btn-primary w-full text-center block"
            >
              この山の計画を作成
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

// 静的パラメータの生成
export async function generateStaticParams() {
  return (mountains as Mountain[]).map((mountain) => ({
    id: mountain.id,
  }));
}
