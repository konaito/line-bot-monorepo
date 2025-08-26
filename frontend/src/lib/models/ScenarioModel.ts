import { Scenario, ScenarioSummary, Attitude } from "@/types/scenario";

export class ScenarioModel {
  private static instance: ScenarioModel;
  private scenarios: Map<string, Scenario> = new Map();
  private listeners: Set<() => void> = new Set();

  private constructor() {
    this.initializeMockData();
  }

  static getInstance(): ScenarioModel {
    if (!ScenarioModel.instance) {
      ScenarioModel.instance = new ScenarioModel();
    }
    return ScenarioModel.instance;
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
    const mockScenarios: Scenario[] = [
      {
        id: "scn_yes_001",
        attitude: "POSITIVE",
        title: "対応可能",
        description: "依頼や要望に応じられる場合の定型的な態度",
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "scn_yes_002", 
        attitude: "POSITIVE",
        title: "積極的サポート",
        description: "積極的にサポートを提供する場合",
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "scn_no_001",
        attitude: "NEGATIVE", 
        title: "対応困難",
        description: "技術的制約等で対応が困難な場合",
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "scn_no_002",
        attitude: "NEGATIVE",
        title: "ガイドライン違反",
        description: "安全性やガイドライン違反により対応できない場合",
        enabled: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "scn_other_001",
        attitude: "OTHER",
        title: "要確認",
        description: "詳細確認が必要な場合",
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    mockScenarios.forEach(scenario => {
      this.scenarios.set(scenario.id, scenario);
    });
  }

  // シナリオ取得系
  getAllScenarios(): Scenario[] {
    return Array.from(this.scenarios.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getAllScenarioSummaries(): ScenarioSummary[] {
    return this.getAllScenarios().map(scenario => ({
      id: scenario.id,
      title: scenario.title,
      attitude: scenario.attitude,
      enabled: scenario.enabled
    }));
  }

  getScenarioById(id: string): Scenario | undefined {
    return this.scenarios.get(id);
  }

  getScenariosByAttitude(attitude: Attitude): Scenario[] {
    return this.getAllScenarios().filter(scenario => scenario.attitude === attitude);
  }

  getEnabledScenarios(): Scenario[] {
    return this.getAllScenarios().filter(scenario => scenario.enabled);
  }

  // シナリオ作成・更新・削除
  createScenario(data: {
    attitude: Attitude;
    title: string;
    description?: string;
    enabled?: boolean;
  }): Scenario {
    const now = new Date().toISOString();
    const newScenario: Scenario = {
      id: `scn_${Date.now()}`,
      attitude: data.attitude,
      title: data.title,
      description: data.description,
      enabled: data.enabled ?? true,
      createdAt: now,
      updatedAt: now
    };

    this.scenarios.set(newScenario.id, newScenario);
    this.notifyListeners();
    return newScenario;
  }

  updateScenario(id: string, updates: Partial<Pick<Scenario, 'attitude' | 'title' | 'description' | 'enabled'>>): Scenario | undefined {
    const scenario = this.scenarios.get(id);
    if (!scenario) return undefined;

    const updatedScenario: Scenario = {
      ...scenario,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.scenarios.set(id, updatedScenario);
    this.notifyListeners();
    return updatedScenario;
  }

  deleteScenario(id: string): boolean {
    const deleted = this.scenarios.delete(id);
    if (deleted) {
      this.notifyListeners();
    }
    return deleted;
  }

  toggleScenario(id: string): Scenario | undefined {
    const scenario = this.scenarios.get(id);
    if (!scenario) return undefined;

    return this.updateScenario(id, { enabled: !scenario.enabled });
  }
}