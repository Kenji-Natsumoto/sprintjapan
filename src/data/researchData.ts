/**
 * 研究ノート / リサーチログ
 *
 * 目的：「発見・検証」のための研究活動を管理する
 * 教育（勉強会）とは独立して管理し、教育への転用は変換プロセスを経て行う
 */

export type ResearchStatus = '探索中' | '検証中' | '確立済み' | '保留';
export type TeachabilityLevel = '未評価' | '変換不要' | '要簡略化' | '要再構成' | '教育不適';

export interface ResearchNote {
  id: string;
  /** 研究テーマ */
  title: string;
  /** 研究カテゴリ */
  category: ResearchCategory;
  /** 研究の概要 */
  summary: string;
  /** 詳細な知見・発見内容 */
  findings: string[];
  /** 研究ステータス */
  status: ResearchStatus;
  /** 教育転用可能性の評価 */
  teachability: TeachabilityLevel;
  /** 教育転用時のメモ（何が難しいか、どう変換すべきか） */
  teachabilityNote?: string;
  /** 関連する勉強会カリキュラムID（変換済みの場合） */
  linkedCurriculumIds?: string[];
  /** 参考情報源 */
  sources?: string[];
  /** タグ */
  tags: string[];
  /** 作成日 */
  createdAt: string;
  /** 更新日 */
  updatedAt: string;
}

export type ResearchCategory =
  | 'バイブコーディング'
  | 'AI駆動開発'
  | 'LLM・生成AI'
  | 'エージェント'
  | 'プラットフォーム'
  | 'ビジネスモデル'
  | 'ツール・インフラ'
  | 'その他';

/**
 * 研究ノートのサンプルデータ
 * 既存のテックトレンド速報の内容を研究ノートとして整理
 */
export const researchNotes: ResearchNote[] = [
  {
    id: 'research-vibe-coding-maturity',
    title: 'バイブコーディングの成熟化動向',
    category: 'バイブコーディング',
    summary:
      '2025年後半、バイブコーディングは「実験」から「実用化・収益化」フェーズへ移行。' +
      '検索数6,700%増、Product Huntトップ7中6製品が収益化。ハネムーン期は終了し、成熟化が鍵。',
    findings: [
      'バイブコーディング検索数が3ヶ月で6,700%増加',
      'Product Hunt トップ7のうち6製品が収益化フェーズへ',
      '「ハネムーン期間は終わった」：6ヶ月後の現実と成熟化の課題',
      '米国では「AI実験の時代」→「AI実用化と収益化の時代」へ移行',
      '"Vibe Coding"が英語辞典の2025年の言葉に選定',
    ],
    status: '確立済み',
    teachability: '要簡略化',
    teachabilityNote:
      '市場データや統計は勉強会向けに要約が必要。実践者目線での「だから何をすべきか」という文脈が教育では重要。',
    linkedCurriculumIds: [],
    sources: [
      'テックトレンド速報 #1〜#5 (2025年10月〜12月)',
    ],
    tags: ['バイブコーディング', 'トレンド', '市場分析'],
    createdAt: '2025-10-16',
    updatedAt: '2025-12-05',
  },
  {
    id: 'research-vibe-coding-platforms',
    title: 'バイブコーディングプラットフォーム比較',
    category: 'バイブコーディング',
    summary:
      '主要8プラットフォームのベンチマーク。各ツールの強み・弱み・適用シーンを検証。',
    findings: [
      'Lovable：UI重視のプロトタイピングに強い',
      'bolt.new：高速なフルスタック開発',
      'v0：コンポーネント単位の生成に特化',
      'Claude Sonnet：コード品質と理解力で優位',
      'CLI型AIコーディングエージェントが2025年のヒット商品に',
    ],
    status: '検証中',
    teachability: '要再構成',
    teachabilityNote:
      '研究ではベンチマーク結果を網羅的に比較するが、勉強会では「どれを選ぶべきか」という判断基準に再構成する必要がある。' +
      '初心者には選択肢が多すぎるため、レベル別の推奨パスに変換すべき。',
    linkedCurriculumIds: [],
    sources: [
      'テックトレンド速報 #4 (2025年11月25日)',
    ],
    tags: ['バイブコーディング', 'ツール比較', 'ベンチマーク'],
    createdAt: '2025-11-25',
    updatedAt: '2025-11-25',
  },
  {
    id: 'research-ai-agent-infra',
    title: 'AIエージェント向けインフラの動向',
    category: 'エージェント',
    summary:
      'AIエージェントの実用化に向けたインフラ整備が急速に進行。開発者の働き方が根本から変化。',
    findings: [
      'CLI型AIコーディングエージェントがメインストリームに',
      'AIエージェント向けインフラが急速に整備',
      '開発者の働き方が根本から変化しつつある',
      'AIは国家規模のインフラに',
    ],
    status: '探索中',
    teachability: '要再構成',
    teachabilityNote:
      'インフラ・アーキテクチャレベルの話は勉強会参加者には抽象的すぎる。' +
      '「何ができるようになるか」「自分の仕事がどう変わるか」に変換が必要。',
    linkedCurriculumIds: [],
    sources: [
      'テックトレンド速報 #3, #5',
    ],
    tags: ['エージェント', 'インフラ', 'トレンド'],
    createdAt: '2025-11-15',
    updatedAt: '2025-12-05',
  },
  {
    id: 'research-claude-code-agent-team',
    title: 'Claude Code Agent-Teamアーキテクチャ',
    category: 'エージェント',
    summary:
      'Claude Codeを複数エージェントのチームとして構成し、開発・運用を効率化する手法の研究。',
    findings: [
      'Agent-Team構成による並列タスク処理の可能性',
      '役割分担（コードレビュー、テスト、実装等）のパターン',
    ],
    status: '探索中',
    teachability: '未評価',
    teachabilityNote: undefined,
    linkedCurriculumIds: [],
    sources: [],
    tags: ['Claude Code', 'エージェント', 'チーム構成'],
    createdAt: '2025-04-11',
    updatedAt: '2025-04-11',
  },
  {
    id: 'research-openclaw-generative-ai',
    title: 'OpenClaw 生成AI設定の再構築',
    category: 'LLM・生成AI',
    summary:
      'OpenClawプロジェクトにおける生成AIの設定見直しと再構築の研究。',
    findings: [],
    status: '探索中',
    teachability: '未評価',
    teachabilityNote: undefined,
    linkedCurriculumIds: [],
    sources: [],
    tags: ['OpenClaw', '生成AI', '設定'],
    createdAt: '2025-04-11',
    updatedAt: '2025-04-11',
  },
];

/**
 * 研究カテゴリ一覧（表示用）
 */
export const researchCategories: ResearchCategory[] = [
  'バイブコーディング',
  'AI駆動開発',
  'LLM・生成AI',
  'エージェント',
  'プラットフォーム',
  'ビジネスモデル',
  'ツール・インフラ',
  'その他',
];
