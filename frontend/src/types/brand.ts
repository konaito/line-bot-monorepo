export type BrandProfile = {
  id: string;
  accountId: string;             // テナント/LINE公式アカウント
  name: string;                  // 会社名/ブランド名
  company: {
    legalName?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    businessHours?: string;      // 営業時間（シンプル文字列でOK、将来構造化も可）
  };
  voice: {
    tone: "formal" | "friendly" | "casual" | "polite";
    personaNotes?: string;       // 口調のメモ（語尾や敬語レベル、NGワード）
    lengthPreference?: "short" | "medium" | "long";
    emojiAllowed?: boolean;
  };
  rules: {
    mustSay?: string[];          // 必ず含めたい文言（例: 会社名/営業時間明記など）
    mustNotSay?: string[];       // 禁止表現（確約/医療効能/値引き断定 等）
    sensitiveTopics?: string[];  // 取り扱い注意トピック（価格/返金/法務 等）
    escalationPolicy?: string;   // 人手エスカレーション方針（条件/窓口）
  };
  formatting: {
    signOff?: string;            // 署名（例: "— ○○サポート"）
    prefix?: string;             // 定型の書き出し
    suffix?: string;             // 末尾の定型文（個人情報注意/問い合わせ誘導等）
  };
  glossary?: Array<{            // 用語集：言い換え/統一名称
    term: string;
    preferred: string;
    aliases?: string[];
  }>;
  createdAt: string;
  updatedAt: string;
};

// ブランド一覧表示用
export type BrandSummary = {
  id: string;
  name: string;
  accountId: string;
  tone: string;
  updatedAt: string;
};

// 口調タイプのラベル
export const TONE_LABELS: Record<BrandProfile['voice']['tone'], string> = {
  formal: "丁寧",
  friendly: "親しみやすい", 
  casual: "カジュアル",
  polite: "礼儀正しい"
};

// 文章の長さ設定のラベル
export const LENGTH_LABELS: Record<NonNullable<BrandProfile['voice']['lengthPreference']>, string> = {
  short: "簡潔",
  medium: "標準",
  long: "詳細"
};