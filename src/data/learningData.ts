/**
 * 勉強会 / 教育コンテンツ管理
 *
 * 目的：「理解・実践」のための教育活動を管理する
 * 研究（リサーチログ）とは独立して管理する
 *
 * 重要な考え方：
 * 研究内容はそのまま勉強会には使えない。
 * 研究は「深さ・網羅性」を追求するが、教育は「わかりやすさ・実践性」を追求する。
 * 研究→教育への変換には、以下のプロセスが必要：
 *   1. 簡略化（専門用語・複雑な概念を平易に）
 *   2. 再構成（学習者の文脈に合わせて順序・構成を変える）
 *   3. 実践化（「知る」→「できる」に変換するワーク・演習の設計）
 *   4. 段階化（レベルに応じた提供範囲の調整）
 */

export type CourseStatus = '企画中' | '準備中' | '募集中' | '開講中' | '終了' | '休止中';
export type SessionFormat = 'オンライン' | 'オフライン' | 'ハイブリッド' | '動画配信';
export type DifficultyLevel = '入門' | '基礎' | '実践' | '応用' | '上級';

export interface CurriculumSession {
  sessionNumber: number;
  title: string;
  description: string;
  /** 学習目標：このセッションで何ができるようになるか */
  learningGoals: string[];
  /** 元となる研究ノートID（紐付けがある場合） */
  sourceResearchIds?: string[];
  /** 研究→教育で行った変換の内容 */
  adaptationNote?: string;
  /** 所要時間（分） */
  durationMinutes?: number;
}

export interface Course {
  id: string;
  /** コース名 */
  title: string;
  /** サブタイトル */
  subtitle: string;
  /** コースの概要 */
  description: string;
  /** ステータス */
  status: CourseStatus;
  /** 難易度 */
  difficulty: DifficultyLevel;
  /** 対象者 */
  targetAudience: string[];
  /** 前提条件 */
  prerequisites: string[];
  /** 実施形式 */
  format: SessionFormat;
  /** カリキュラム */
  sessions: CurriculumSession[];
  /** 講師名 */
  instructor: string;
  /** 定員 */
  capacity?: number;
  /** 料金 */
  price?: string;
  /** 関連するサイトページのパス */
  sitePagePath?: string;
  /** 作成日 */
  createdAt: string;
  /** 更新日 */
  updatedAt: string;
}

/**
 * 研究→教育 変換レコード
 * 研究ノートを教育コンテンツに変換する際のプロセスを記録する
 */
export interface ResearchToLearningConversion {
  id: string;
  /** 元の研究ノートID */
  researchNoteId: string;
  /** 変換先のコースID */
  targetCourseId: string;
  /** 変換先のセッション番号 */
  targetSessionNumber?: number;
  /** 変換の種類 */
  conversionType: '簡略化' | '再構成' | '実践化' | '段階化';
  /** 変換時に行った工夫・判断 */
  conversionNote: string;
  /** 変換ステータス */
  status: '未着手' | '変換中' | '完了' | '見送り';
  /** 見送り理由（教育不適の場合） */
  skipReason?: string;
  /** 作成日 */
  createdAt: string;
}

/**
 * コースデータ
 * 既存のSuperVibeCodingとVibeCodingLabを構造化
 */
export const courses: Course[] = [
  {
    id: 'super-vibe-coding',
    title: '超バイブコーディング講座',
    subtitle: '未来を創る！全10回の実践講座',
    description:
      'アイデアを形に、プロダクトを収益に。プログラミング経験ゼロからアプリ開発・収益化までを10セッションで学ぶ。',
    status: '準備中',
    difficulty: '入門',
    targetAudience: [
      'アイデアはあるけど、形にできていない方',
      '何か新しいことを始めたい方',
      '新規事業やスタートアップに興味がある方',
      '自分のプロダクトで収益を得たい方',
      'AIを使った開発に興味がある方',
      '「作る側」になりたいと思っている方',
    ],
    prerequisites: [
      'インターネットに接続できるパソコン（Windows/Mac）',
      'プログラミング経験不要',
    ],
    format: 'オンライン',
    sessions: [
      {
        sessionNumber: 1,
        title: '自分の立ち位置と素質を知る',
        description: '自己分析を通じて、あなたの強みと可能性を発見します',
        learningGoals: [
          '自分の強みとバイブコーディングとの相性を理解する',
          '目標設定の方法を学ぶ',
        ],
      },
      {
        sessionNumber: 2,
        title: '「未来の記憶」をイメージする',
        description: '実現したい未来を具体的にビジュアライズします',
        learningGoals: [
          '作りたいプロダクトのビジョンを言語化できる',
          'ユーザーストーリーを書ける',
        ],
      },
      {
        sessionNumber: 3,
        title: 'アプリを設計する',
        description: 'アイデアを形にするための設計手法を学びます',
        learningGoals: [
          '画面設計（ワイヤーフレーム）を作成できる',
          'データの流れを理解できる',
        ],
        sourceResearchIds: ['research-vibe-coding-platforms'],
        adaptationNote:
          '研究ではプラットフォーム比較を網羅的に行うが、このセッションでは「初心者が最初に使うべきツール」に絞って紹介。選択に迷わせない。',
      },
      {
        sessionNumber: 4,
        title: 'アプリを創る（前編）',
        description: 'バイブコーディングで実際にアプリ開発を始めます',
        learningGoals: [
          'バイブコーディングツールの基本操作ができる',
          'AIにプロンプトを出してコードを生成できる',
        ],
        sourceResearchIds: ['research-vibe-coding-platforms'],
        adaptationNote:
          '研究のベンチマーク結果ではなく、「手を動かして学ぶ」形式に変換。1つのツールに集中して体験させる。',
      },
      {
        sessionNumber: 5,
        title: 'アプリを創る（後編）',
        description: 'アプリを完成させ、動くプロダクトに仕上げます',
        learningGoals: [
          '機能を追加・改善できる',
          'デプロイして公開できる',
        ],
      },
      {
        sessionNumber: 6,
        title: 'ビルディング・イン・パブリックに挑戦する',
        description: '開発過程を公開し、コミュニティと繋がります',
        learningGoals: [
          '開発過程をSNSで発信できる',
          'フィードバックを集める方法を理解する',
        ],
      },
      {
        sessionNumber: 7,
        title: '最初の顧客を見つける',
        description: 'プロダクトを必要とする人を見つけ、届けます',
        learningGoals: [
          'ターゲットユーザーを特定できる',
          '初期ユーザーへのアプローチ方法を実践できる',
        ],
      },
      {
        sessionNumber: 8,
        title: '課金システムを創る（前編）',
        description: 'マネタイズの仕組みを設計します',
        learningGoals: [
          '収益モデルを設計できる',
          '決済サービスの選定と基本設定ができる',
        ],
      },
      {
        sessionNumber: 9,
        title: '課金システムを創る（後編）',
        description: '決済機能を実装し、ビジネスを完成させます',
        learningGoals: [
          '決済機能を実装できる',
          '実際に課金テストを完了できる',
        ],
      },
      {
        sessionNumber: 10,
        title: '未来を創る',
        description: '継続的な成長と次のステップへ',
        learningGoals: [
          '成長戦略を立てられる',
          '次のプロダクトや事業展開を構想できる',
        ],
        sourceResearchIds: ['research-vibe-coding-maturity'],
        adaptationNote:
          '市場の成熟化データは「あなたが今後どうポジショニングすべきか」という個人の戦略に変換。',
      },
    ],
    instructor: '夏本 健司',
    sitePagePath: '/super-vibe-coding',
    createdAt: '2025-04-11',
    updatedAt: '2025-04-11',
  },
  {
    id: 'super-vibe-coding-premium',
    title: '超バイブコーディング講座（プレミアム）',
    subtitle: '湯川塾向け集中コース',
    description:
      '少人数制の集中講座。6ヶ月で15アプリを開発した実績をベースに、短期間で成果を出す。',
    status: '準備中',
    difficulty: '実践',
    targetAudience: [
      '湯川塾の参加者',
      '短期間で成果を出したいビジネスパーソン',
    ],
    prerequisites: [
      'ビジネス経験があること',
      'パソコンの基本操作ができること',
    ],
    format: 'オンライン',
    sessions: [],
    instructor: '夏本 健司',
    capacity: 10,
    price: '¥300,000',
    sitePagePath: '/super-vibe-coding-full',
    createdAt: '2025-04-11',
    updatedAt: '2025-04-11',
  },
  {
    id: 'vibe-coding-lab',
    title: 'Vibe Coding Lab',
    subtitle: '第0期 - コミュニティ駆動型学習',
    description:
      '1ヶ月間のコラボレーション型プロダクト開発。仲間と一緒にアイデアを形にする。',
    status: '企画中',
    difficulty: '基礎',
    targetAudience: [
      'コミュニティで学びたい方',
      '仲間と一緒にプロダクトを作りたい方',
    ],
    prerequisites: [
      '作りたいものがあること',
    ],
    format: 'オンライン',
    sessions: [],
    instructor: '夏本 健司',
    sitePagePath: '/vibe-coding-lab',
    createdAt: '2025-04-11',
    updatedAt: '2025-04-11',
  },
];

/**
 * 研究→教育 変換レコード
 * 現在確認できている変換の記録
 */
export const conversions: ResearchToLearningConversion[] = [
  {
    id: 'conv-001',
    researchNoteId: 'research-vibe-coding-platforms',
    targetCourseId: 'super-vibe-coding',
    targetSessionNumber: 3,
    conversionType: '簡略化',
    conversionNote:
      '8プラットフォームの網羅的比較→初心者向けに1〜2ツールに絞った紹介に簡略化。' +
      '判断基準よりも「まずこれを使え」というガイダンスに変換。',
    status: '変換中',
    createdAt: '2025-04-11',
  },
  {
    id: 'conv-002',
    researchNoteId: 'research-vibe-coding-platforms',
    targetCourseId: 'super-vibe-coding',
    targetSessionNumber: 4,
    conversionType: '実践化',
    conversionNote:
      'ベンチマーク結果（知識）→ハンズオン演習（体験）に変換。' +
      '比較分析ではなく、1つのツールを使い込む体験に集中。',
    status: '変換中',
    createdAt: '2025-04-11',
  },
  {
    id: 'conv-003',
    researchNoteId: 'research-vibe-coding-maturity',
    targetCourseId: 'super-vibe-coding',
    targetSessionNumber: 10,
    conversionType: '再構成',
    conversionNote:
      '市場全体の成熟化動向データ→個人の今後の戦略・ポジショニングに再構成。' +
      '「市場がこうだから、あなたはこう動くべき」という文脈に変換。',
    status: '未着手',
    createdAt: '2025-04-11',
  },
  {
    id: 'conv-004',
    researchNoteId: 'research-ai-agent-infra',
    targetCourseId: 'super-vibe-coding',
    conversionType: '段階化',
    conversionNote:
      'AIエージェントのインフラ動向は上級者向けコンテンツ。入門コースでは概念紹介のみに留め、' +
      '応用コースを別途設計する際に活用。',
    status: '見送り',
    skipReason: '入門コースの範囲外。応用コース設計時に再検討。',
    createdAt: '2025-04-11',
  },
];
