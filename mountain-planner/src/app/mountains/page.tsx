import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import mountains from '@/data/mountains.json';
import { Mountain, Difficulty } from '@/types';

export default function MountainsPage() {
  return (
    <div>
      <PageHeader
        title="山情報"
        description="登山対象の山の詳細情報を確認できます"
        icon="⛰️"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(mountains as Mountain[]).map((mountain) => (
          <Link key={mountain.id} href={`/mountains/${mountain.id}`}>
            <Card hover className="h-full">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-bold text-lg text-mountain-dark">
                    {mountain.name}
                  </h2>
                  <p className="text-sm text-gray-500">{mountain.nameKana}</p>
                </div>
                <Badge variant="difficulty" difficulty={mountain.difficulty as Difficulty} />
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-winter-sky">📍</span>
                  <span>{mountain.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-winter-sky">📏</span>
                  <span>{mountain.elevation.toLocaleString()}m</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-winter-sky">⏱️</span>
                  <span>{mountain.courseTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {mountain.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-2 py-1 bg-glacier text-deep-blue rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {mountain.features.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-glacier text-deep-blue rounded-full">
                    +{mountain.features.length - 3}
                  </span>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {mountains.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">まだ山情報が登録されていません</p>
          <Link href="/admin" className="btn-primary inline-block">
            山を追加する
          </Link>
        </Card>
      )}
    </div>
  );
}
