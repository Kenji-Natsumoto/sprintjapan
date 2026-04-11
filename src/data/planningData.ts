/**
 * 全テーマの計画データ
 * 2025年4月11日 策定
 *
 * 4つの戦略テーマとその現状・計画を管理する
 */

export type ThemeStatus = '構想中' | '計画中' | '進行中' | '見直し中' | '完了';
export type Priority = '最優先' | '高' | '中' | '低';

export interface ActionItem {
  action: string;
  deadline?: string;
  status: ThemeStatus;
  note?: string;
}

export interface StrategicTheme {
  id: string;
  title: string;
  subtitle: string;
  status: ThemeStatus;
  priority: Priority;
  background: string;
  currentState: string;
  challenge: string;
  direction: string;
  actionItems: ActionItem[];
  updatedAt: string;
}

export const strategicThemes: StrategicTheme[] = [
  {
    id: 'research-learning-separation',
    title: '研究と教育の分離管理',
    subtitle: 'AIカンパニーの研究活動と勉強会コンテンツの分離',
    status: '進行中',
    priority: '最優先',
    background:
      'AI関連の研究で得た知見をそのまま勉強会に使おうとすると、深さと粒度が合わない。' +
      '研究は「発見・検証」が目的、教育は「理解・実践」が目的であり、変換プロセスが必要。',
    currentState:
      'サイト上ではSuperVibeCoding（10回講座）、VibeCodingLab（第0期）が教育コンテンツとして存在。' +
      'テックトレンド速報が研究アウトプットの一部として存在。' +
      'しかし両者の管理が混在しており、研究→教育への変換プロセスが不明確。',
    challenge:
      '研究内容がそのまま勉強会に使えない。研究の深さ・専門性と、教育のわかりやすさ・実践性のギャップを埋める仕組みが必要。',
    direction:
      '研究ノート（リサーチログ）と勉強会カリキュラムを別々のデータ構造で管理し、' +
      '研究→教育への「変換ステータス」を追跡できるようにする。',
    actionItems: [
      {
        action: '研究ノート用のデータ構造を設計・実装',
        status: '進行中',
      },
      {
        action: '勉強会カリキュラム用のデータ構造を設計・実装',
        status: '進行中',
      },
      {
        action: '研究→教育の変換プロセスを定義',
        status: '計画中',
      },
      {
        action: '既存コンテンツ（テックトレンド速報、SuperVibeCoding）を新構造に整理',
        status: '構想中',
      },
    ],
    updatedAt: '2025-04-11',
  },
  {
    id: 'viberush-redesign',
    title: 'VibeRush計画再設計',
    subtitle: '現状を踏まえた計画の再構築',
    status: '見直し中',
    priority: '高',
    background:
      'VibeRushの当初計画と現状にギャップが生じている。現実に即した再設計が必要。',
    currentState:
      'サイト上にVibeRush関連のページ・コンテンツは未実装。計画の再検討段階。',
    challenge:
      '当初の想定と市場・技術環境の変化を踏まえ、計画を現実的に再設計する必要がある。',
    direction:
      '現状分析を行い、実現可能なスコープで計画を再定義する。',
    actionItems: [
      {
        action: 'VibeRushの現状と課題を整理',
        status: '計画中',
      },
      {
        action: '再設計した計画を文書化',
        status: '構想中',
      },
      {
        action: 'サイトへの反映（必要に応じて）',
        status: '構想中',
      },
    ],
    updatedAt: '2025-04-11',
  },
  {
    id: 'claude-code-agent-team',
    title: 'ClaudeCode Agent-Team移行',
    subtitle: 'Claude CodeのAgent-Teamアーキテクチャへの移行',
    status: '構想中',
    priority: '中',
    background:
      'Claude Codeの活用をAgent-Team体制へ移行させ、開発・運用の効率化を図る。',
    currentState:
      '現在はClaude Codeを個別利用。チーム的な活用やエージェント間連携は未整備。',
    challenge:
      'Agent-Teamの構成・役割分担・ワークフローの設計が必要。',
    direction:
      'Agent-Teamの構成を設計し、段階的に移行する。',
    actionItems: [
      {
        action: 'Agent-Teamのアーキテクチャ調査',
        status: '計画中',
      },
      {
        action: 'チーム構成と役割の定義',
        status: '構想中',
      },
      {
        action: '試験運用の開始',
        status: '構想中',
      },
    ],
    updatedAt: '2025-04-11',
  },
  {
    id: 'openclaw-restart',
    title: 'OpenClaw再起動',
    subtitle: 'OpenClawの再起動と生成AI再設定',
    status: '計画中',
    priority: '高',
    background:
      'OpenClawプロジェクトを再起動し、生成AIの設定を見直す。',
    currentState:
      'OpenClawは停止中。サイト上にOpenClaw関連のページ・コンテンツは未実装。',
    challenge:
      '生成AIの再設定と、プロジェクトの再起動に必要なリソース・優先度の調整。',
    direction:
      '生成AIを再設定し、OpenClawを段階的に再起動させる。',
    actionItems: [
      {
        action: 'OpenClawの現状確認と再起動計画策定',
        status: '計画中',
      },
      {
        action: '生成AIの再設定',
        status: '構想中',
      },
      {
        action: 'テスト運用の開始',
        status: '構想中',
      },
    ],
    updatedAt: '2025-04-11',
  },
];
