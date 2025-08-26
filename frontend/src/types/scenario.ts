// 態度カテゴリ
export type Attitude = "POSITIVE" | "NEGATIVE" | "OTHER";

// シナリオ定義
export type Scenario = {
  id: string;
  attitude: Attitude;       // 態度（肯定/否定/その他）
  title: string;            // UIに出す短い名前（例: "対応可能"）
  description?: string;     // 運用者が理解しやすい補足
  enabled: boolean;         // 有効/無効
  createdAt: string;
  updatedAt: string;
};

// シナリオサマリー（リスト表示用）
export type ScenarioSummary = {
  id: string;
  title: string;
  attitude: Attitude;
  enabled: boolean;
};

// 態度のラベル表示用
export const ATTITUDE_LABELS: Record<Attitude, string> = {
  POSITIVE: "肯定的",
  NEGATIVE: "否定的", 
  OTHER: "その他"
};

// 態度の色分け用
export const ATTITUDE_COLORS: Record<Attitude, string> = {
  POSITIVE: "bg-green-100 text-green-800",
  NEGATIVE: "bg-red-100 text-red-800",
  OTHER: "bg-gray-100 text-gray-800"
};