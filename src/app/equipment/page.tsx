'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import equipment from '@/data/equipment.json';
import templates from '@/data/equipment-templates.json';
import { EquipmentItem, EquipmentCategory, EquipmentTemplate } from '@/types';

const categoryIcons: Record<EquipmentCategory, string> = {
  '服装': '👕',
  'ギア': '🧰',
  '食料・水': '🍙',
  '緊急用品': '🆘',
  'その他': '📦',
};

const categoryOrder: EquipmentCategory[] = ['服装', 'ギア', '食料・水', '緊急用品', 'その他'];

export default function EquipmentPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [showWinterOnly, setShowWinterOnly] = useState(false);

  // ローカルストレージから読み込み（初回マウント時のみ）
  useEffect(() => {
    const saved = localStorage.getItem('equipment-checked');
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage初期化は正当なユースケース
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  // ローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('equipment-checked', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const applyTemplate = (templateId: string) => {
    const template = (templates as EquipmentTemplate[]).find((t) => t.id === templateId);
    if (template) {
      setCheckedItems([]);
      setSelectedTemplate(templateId);
    }
  };

  const clearAll = () => {
    setCheckedItems([]);
  };

  const checkAll = () => {
    const allIds = (equipment as EquipmentItem[]).map((item) => item.id);
    setCheckedItems(allIds);
  };

  // フィルタリング
  const filteredEquipment = (equipment as EquipmentItem[]).filter((item) => {
    if (showWinterOnly && !item.forWinter) return false;
    return true;
  });

  // カテゴリ別にグループ化
  const groupedEquipment = categoryOrder.reduce((acc, category) => {
    acc[category] = filteredEquipment.filter((item) => item.category === category);
    return acc;
  }, {} as Record<EquipmentCategory, EquipmentItem[]>);

  // 選択中のテンプレートのアイテムリスト
  const templateItems = selectedTemplate
    ? (templates as EquipmentTemplate[]).find((t) => t.id === selectedTemplate)?.items || []
    : [];

  const totalItems = filteredEquipment.length;
  const checkedCount = checkedItems.filter((id) =>
    filteredEquipment.some((item) => item.id === id)
  ).length;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <div>
      <PageHeader
        title="装備管理"
        description="登山に必要な装備をチェックリストで管理できます"
        icon="🎒"
      />

      {/* テンプレート選択 */}
      <Card className="mb-6">
        <h2 className="font-bold text-lg text-night-blue mb-4">📝 テンプレートから選択</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {(templates as EquipmentTemplate[]).map((template) => (
            <button
              key={template.id}
              onClick={() => applyTemplate(template.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTemplate === template.id
                  ? 'bg-night-blue text-white'
                  : 'bg-glacier text-mountain-dark hover:bg-sky-light'
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>
        {selectedTemplate && (
          <p className="text-sm text-gray-600">
            選択中のテンプレートには {templateItems.length} アイテムが含まれています
          </p>
        )}
      </Card>

      {/* 進捗バー */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-mountain-dark">準備進捗</span>
          <span className="text-winter-sky font-bold">
            {checkedCount} / {totalItems} 完了
          </span>
        </div>
        <div className="h-3 bg-glacier rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-winter-sky to-deep-blue transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={checkAll}
            className="px-3 py-1 text-sm bg-sky-light text-deep-blue rounded-lg hover:bg-sky transition-colors"
          >
            すべてチェック
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1 text-sm bg-glacier text-mountain-dark rounded-lg hover:bg-sky-light transition-colors"
          >
            すべてクリア
          </button>
          <label className="flex items-center gap-2 ml-auto">
            <input
              type="checkbox"
              checked={showWinterOnly}
              onChange={(e) => setShowWinterOnly(e.target.checked)}
              className="checkbox-snow w-4 h-4"
            />
            <span className="text-sm text-mountain-dark">冬山装備のみ</span>
          </label>
        </div>
      </Card>

      {/* 装備リスト */}
      <div className="space-y-6">
        {categoryOrder.map((category) => {
          const items = groupedEquipment[category];
          if (items.length === 0) return null;

          return (
            <Card key={category}>
              <h2 className="font-bold text-lg text-night-blue mb-4 flex items-center gap-2">
                <span>{categoryIcons[category]}</span>
                {category}
                <span className="text-sm font-normal text-gray-500">
                  ({items.filter((item) => checkedItems.includes(item.id)).length}/{items.length})
                </span>
              </h2>
              <div className="space-y-2">
                {items.map((item) => {
                  const isChecked = checkedItems.includes(item.id);
                  const isInTemplate = templateItems.includes(item.id);

                  return (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-green-50 border border-green-200'
                          : isInTemplate
                          ? 'bg-sky-50 border border-sky-200'
                          : 'bg-glacier/50 border border-transparent hover:bg-glacier'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                        className="checkbox-snow w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`font-medium ${
                              isChecked ? 'line-through text-gray-400' : 'text-mountain-dark'
                            }`}
                          >
                            {item.name}
                          </span>
                          {item.requirementLevel === '必須' ? (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                              必須
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                              あると便利
                            </span>
                          )}
                          {item.forWinter && (
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                              ❄️ 冬山
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
