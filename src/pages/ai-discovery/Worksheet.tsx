import { Link } from 'react-router-dom';
import { HubShell, HubHeader, HubFooter, StatusChip, usePageMeta } from './shared';

export interface WorksheetProps {
  title: string;
  eyebrow: string;
  h1: string;
  body: string;
  checklist: string[];
  status?: '公開中' | '準備中';
  slideUrl?: string;
  slideLabel?: string;
}

const Worksheet = ({ title, eyebrow, h1, body, checklist, status = '準備中', slideUrl, slideLabel }: WorksheetProps) => {
  usePageMeta(title);
  return (
    <HubShell>
      <HubHeader subtitle="Worksheet" />
      <main className="container mx-auto max-w-3xl px-5 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#ea580c]">
            {eyebrow}
          </div>
          <StatusChip status={status} />
        </div>
        <h1 className="serif-jp text-4xl md:text-5xl leading-[1.3] font-semibold text-[#1a1409] mb-8">
          {h1}
        </h1>
        <div className="backdrop-blur-sm bg-white/75 border border-white/80 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <p className="text-[16px] leading-[2] text-[#3a3225] whitespace-pre-line">{body}</p>

          {slideUrl && (
            <a
              href={slideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 group inline-flex items-center gap-4 p-4 rounded-2xl bg-white/70 border border-[#e8dfc9] hover:bg-white hover:border-[#ea580c]/40 hover:-translate-y-0.5 transition-all w-full"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[#fef3df] to-[#fde4cf] border border-[#e8dfc9] grid place-items-center text-xl">
                📊
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] tracking-[0.15em] uppercase text-[#ea580c] font-semibold">Google Slides ↗</div>
                <div className="serif-jp text-[15px] font-semibold text-[#1a1409] mt-0.5">{slideLabel}</div>
              </div>
              <span className="text-[#ea580c] text-xl group-hover:translate-x-1 transition-transform">→</span>
            </a>
          )}

          <div className="mt-8 pt-8 border-t border-[#e8dfc9]">
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#0a8a7a] mb-4">
              Checklist
            </div>
            <ul className="space-y-3">
              {checklist.map((c) => (
                <li key={c} className="flex gap-3 items-start text-[15px] text-[#3a3225]">
                  <span className="mt-0.5 w-5 h-5 rounded-md border-2 border-[#d4a84c] flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <Link
            to="/ai-discovery-community"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-medium shadow-lg shadow-[#ea580c]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
      <HubFooter />
    </HubShell>
  );
};

const SLIDE_S1 = 'https://docs.google.com/presentation/d/144nki5XFti3qBUjxyW3MgIKfqWgwCCtq/edit?usp=sharing&ouid=114095741537537337376&rtpof=true&sd=true';
const SLIDE_S2 = 'https://docs.google.com/presentation/d/1PLRXl-DmiaHedDhGf8cNs8f9fngV6PiP/edit?usp=sharing&ouid=114095741537537337376&rtpof=true&sd=true';

export const Session1 = () => (
  <Worksheet
    title="第1回ワークシート | AIでやりたいこと発見コミュニティ"
    eyebrow="Session 01"
    h1="As-Is（現在地）を可視化する"
    body="第1回では、Soul Seasons Guide を使って自分の現在地（As-Is）を可視化します。出力された統合プロンプトやメモを、第2回以降の北極星（MTPと目標）の言語化に持ち込みます。"
    checklist={[
      'Soul Seasons Guide で As-Is を可視化した',
      '統合プロンプト／メモ／スクリーンショットを保存した',
      '第2回に As-Is の結果を持参する準備ができた',
    ]}
    slideUrl={SLIDE_S1}
    slideLabel="第1回のスライドを見る"
  />
);

export const Session2 = () => (
  <Worksheet
    title="第2回ワークシート | AIでやりたいこと発見コミュニティ"
    eyebrow="Session 02"
    h1="To-Be策定（北極星：MTPと目標）"
    body={'第2回でやること：\n① フォルダ構成を決める（個人／プロジェクト／仕事）\n② 自分専用の AI人格（persona.md）を作る\n③ TRAITH-P で北極星（MTPと目標）を言語化し traith.md に保存\n④ ロードマップ／マイルストーンを軽く出力'}
    checklist={[
      'フォルダ構成を決めた（個人／プロジェクト／仕事）',
      'AI人格 persona.md を作った',
      'TRAITH-P で北極星（MTPと目標）を言語化した',
      'traith.md（As-Is＋To-Be＋ロードマップ）をローカル保存した',
    ]}
    slideUrl={SLIDE_S2}
    slideLabel="第2回のスライドを見る"
  />
);

export const Session3 = () => (
  <Worksheet
    title="第3回ワークシート | AIでやりたいこと発見コミュニティ"
    eyebrow="Session 03"
    h1="GAP（AIマップ）→ Plan"
    body="第3回では、AIマップでギャップを「緊急度×重要度＋AIでどう解決するか」に整理し、最初の一歩を1つ選びます。その一歩を「動く計画（最小ワークフロー）」へ設計します。正式版ワークシートは後日掲載予定です。"
    checklist={['AIマップでギャップを整理', '最初の一歩を1つ選択', '最小ワークフローを設計']}
  />
);

export const Session4 = () => (
  <Worksheet
    title="第4回ワークシート | AIでやりたいこと発見コミュニティ"
    eyebrow="Session 04"
    h1="Do（習慣ワークフローを回す）"
    body="第4回では、設計した最小ワークフローを実際に回し、観察サイクルを始めます。正式版ワークシートは後日掲載予定です。"
    checklist={['日次または週次ワークフロー', '実行ログ', '観察と気づき']}
  />
);

export const Session5 = () => (
  <Worksheet
    title="第5回ワークシート | AIでやりたいこと発見コミュニティ"
    eyebrow="Session 05"
    h1="Check（検証と自動化候補の特定）"
    body="第5回では、回した結果を検証し、AIに任せられる自動化候補を洗い出します。正式版ワークシートは後日掲載予定です。"
    checklist={['検証レポート', '自動化候補の洗い出し']}
  />
);

export const Session6 = () => (
  <Worksheet
    title="第6回ワークシート | AIでやりたいこと発見コミュニティ"
    eyebrow="Session 06"
    h1="Act（定着と90日運用計画）"
    body="第6回では、運用標準を確定し、90日で“続く仕組み”に着地させてクロージングします。仕事のワークフローを完成させ、部分自動化の仕様を整理します。正式版ワークシートは後日掲載予定です。"
    checklist={['運用標準の確定', '部分自動化の仕様', '90日運用計画']}
  />
);

export default Worksheet;
