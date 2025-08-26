import { BrandProfile, BrandSummary } from "@/types/brand";

export class BrandModel {
  private static instance: BrandModel;
  private brands: Map<string, BrandProfile> = new Map();
  private listeners: Set<() => void> = new Set();

  private constructor() {
    this.initializeMockData();
  }

  static getInstance(): BrandModel {
    if (!BrandModel.instance) {
      BrandModel.instance = new BrandModel();
    }
    return BrandModel.instance;
  }

  // リスナー管理
  addListener(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // 初期データ生成
  private initializeMockData(): void {
    const mockBrands: BrandProfile[] = [
      {
        id: "brand_001",
        accountId: "line_account_001",
        name: "株式会社サンプル",
        company: {
          legalName: "株式会社サンプル",
          address: "東京都渋谷区1-1-1",
          phone: "03-1234-5678",
          email: "info@sample.co.jp",
          website: "https://sample.co.jp",
          businessHours: "平日 9:00-18:00",
          notes: "創業50年の老舗企業です。お客様第一をモットーに事業を展開しています。"
        },
        voice: {
          tone: "polite",
          personaNotes: "丁寧語を基本とし、敬語を適切に使用。親しみやすさも演出。",
          lengthPreference: "medium",
          emojiAllowed: false
        },
        rules: {
          mustSay: ["お客様", "ありがとうございます"],
          mustNotSay: ["絶対", "必ず", "確実に"],
        },
        formatting: {
          signOff: "— サンプルサポートチーム",
          prefix: "いつもお世話になっております。",
          suffix: "ご不明な点がございましたら、お気軽にお声がけください。"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "brand_002", 
        accountId: "line_account_002",
        name: "フレンドリーカフェ",
        company: {
          legalName: "株式会社フレンドリー",
          address: "大阪府大阪市北区2-2-2",
          phone: "06-9876-5432",
          email: "hello@friendly-cafe.jp",
          website: "https://friendly-cafe.jp",
          businessHours: "毎日 8:00-22:00",
          notes: "地域密着型のコミュニティカフェです。オーガニック食材にこだわっています。"
        },
        voice: {
          tone: "friendly",
          personaNotes: "親しみやすく、カジュアルな敬語。絵文字も適度に使用。",
          lengthPreference: "short",
          emojiAllowed: true
        },
        rules: {
          mustSay: ["ありがとうございます", "フレンドリーカフェ"],
          mustNotSay: ["申し訳ございません（多用禁止）"],
        },
        formatting: {
          signOff: "☕ フレンドリーカフェスタッフ",
          prefix: "こんにちは！",
          suffix: "今日も素敵な一日をお過ごしください ☕"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    mockBrands.forEach(brand => {
      this.brands.set(brand.id, brand);
    });
  }

  // ブランド取得系
  getAllBrands(): BrandProfile[] {
    return Array.from(this.brands.values()).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  getAllBrandSummaries(): BrandSummary[] {
    return this.getAllBrands().map(brand => ({
      id: brand.id,
      name: brand.name,
      accountId: brand.accountId,
      tone: brand.voice.tone,
      updatedAt: brand.updatedAt
    }));
  }

  getBrandById(id: string): BrandProfile | undefined {
    return this.brands.get(id);
  }

  getBrandsByAccountId(accountId: string): BrandProfile[] {
    return this.getAllBrands().filter(brand => brand.accountId === accountId);
  }

  // ブランド作成・更新・削除
  createBrand(data: Omit<BrandProfile, 'id' | 'createdAt' | 'updatedAt'>): BrandProfile {
    const now = new Date().toISOString();
    const newBrand: BrandProfile = {
      ...data,
      id: `brand_${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };

    this.brands.set(newBrand.id, newBrand);
    this.notifyListeners();
    return newBrand;
  }

  updateBrand(id: string, updates: Partial<Omit<BrandProfile, 'id' | 'createdAt' | 'updatedAt'>>): BrandProfile | undefined {
    const brand = this.brands.get(id);
    if (!brand) return undefined;

    const updatedBrand: BrandProfile = {
      ...brand,
      ...updates,
      // ネストしたオブジェクトのマージ
      company: updates.company ? { ...brand.company, ...updates.company } : brand.company,
      voice: updates.voice ? { ...brand.voice, ...updates.voice } : brand.voice,
      rules: updates.rules ? { ...brand.rules, ...updates.rules } : brand.rules,
      formatting: updates.formatting ? { ...brand.formatting, ...updates.formatting } : brand.formatting,
      updatedAt: new Date().toISOString()
    };

    this.brands.set(id, updatedBrand);
    this.notifyListeners();
    return updatedBrand;
  }

  deleteBrand(id: string): boolean {
    const deleted = this.brands.delete(id);
    if (deleted) {
      this.notifyListeners();
    }
    return deleted;
  }
}