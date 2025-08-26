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
    notes?: string;              // 備考（追加の会社情報）
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
  };
  formatting: {
    signOff?: string;            // 署名（例: "— ○○サポート"）
    prefix?: string;             // 定型の書き出し
    suffix?: string;             // 末尾の定型文（個人情報注意/問い合わせ誘導等）
  };
  createdAt: string;
  updatedAt: string;
};

// 設定項目のメニュー
export type BrandSettingCategory = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export const BRAND_SETTING_CATEGORIES: BrandSettingCategory[] = [
  {
    id: "company",
    title: "会社情報", 
    description: "会社の正式名称、住所、連絡先の設定"
  },
  {
    id: "voice",
    title: "コミュニケーション",
    description: "口調、文章の長さ、絵文字使用の設定"
  },
  {
    id: "rules",
    title: "対応ルール",
    description: "必須文言、禁止表現の設定"
  },
  {
    id: "formatting",
    title: "フォーマット",
    description: "署名、定型文、書き出しの設定"
  }
];