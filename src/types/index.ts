// 山情報の型定義
export type Difficulty = '初級' | '中級' | '上級';

export interface Mountain {
  id: string;
  name: string;
  nameKana: string;
  elevation: number; // メートル
  location: string; // 都道府県・山域
  difficulty: Difficulty;
  courseTime: string; // 目安所要時間
  bestSeason: string[]; // おすすめ時期
  access: string; // アクセス方法
  accessUrl?: string; // アクセス参考URL（オプション）
  features: string[]; // 特徴タグ
  description: string; // 説明
  notes: string; // 注意事項
  referenceUrl?: string; // 参考URL（オプション）
  imageUrl?: string; // 画像URL（オプション）
}

// 装備アイテムの型定義
export type EquipmentCategory =
  | '服装'
  | 'ギア'
  | '食料・水'
  | '緊急用品'
  | 'その他';

export type RequirementLevel = '必須' | 'あると便利';

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  description?: string;
  requirementLevel: RequirementLevel; // 必須レベル
  forWinter: boolean; // 冬山用
}

// 装備テンプレートの型定義
export type TripType = '日帰り' | '小屋泊' | 'テント泊' | '冬山';

export interface EquipmentTemplate {
  id: string;
  name: string;
  tripType: TripType;
  items: string[]; // EquipmentItem の id 配列
}

// 計画の型定義
export interface PlanScheduleItem {
  time: string;
  activity: string;
  location?: string;
}

export interface AccessItem {
  time: string;
  activity: string;
  transport: string; // 交通手段
  transportUrl?: string; // 交通手段の参考URL（任意）
  cost?: string; // 運賃（任意）
}

export interface ReferenceLink {
  title: string;
  url: string;
}

export interface Plan {
  id: string;
  title: string;
  mountainId: string; // Mountain の id
  date: string; // ISO形式の日付
  access?: AccessItem[]; // アクセス情報（任意）
  schedule: PlanScheduleItem[];
  equipmentIds: string[]; // 選択した装備のid配列
  memo: string;
  links?: ReferenceLink[]; // 参考リンク（任意）
  createdAt: string;
  updatedAt: string;
}

// ユーザーの装備チェック状態
export interface EquipmentCheckState {
  planId: string;
  checkedItems: string[]; // チェック済みの EquipmentItem id 配列
}
