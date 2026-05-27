import { Link } from 'react-router-dom';
import { HubShell, HubHeader, HubFooter, StatusChip, usePageMeta } from './shared';

export interface WorksheetProps {
  title: string;
  eyebrow: string;
  h1: string;
  body: string;
  checklist: string[];
}

const Worksheet = ({ title, eyebrow, h1, body, checklist }: WorksheetProps) => {
  usePageMeta(title);
  return (
    <HubShell>
      <HubHeader subtitle="Worksheet Placeholder" />
      <main className="container mx-auto max-w-3xl px-5 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#ea580c]">
            {eyebrow}
          </div>
          <StatusChip status="準備中" />
        </div>
        <h1 className="serif-jp text-4xl md:text-5xl leading-[1.3] font-semibold text-[#1a1409] mb-8">
          {h1}
        </h1>
        <div className="backdrop-blur-sm bg-white/75 border border-white/80 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <p className="text-[16px] leading-[2] text-[#3a3225]">{body}</p>
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

export const Session2 = () => (
  <Worksheet
    title="第2回ワークシート | AIでやりたいこと発見コミュニティ v4.0"
    eyebrow="Session 02"
    h1="To-Be策定とGAP算定"
    body="第2回の参加者向け詳細ワークシートページです。現在はプレースホルダーで、今後このページに正式版ワークシートを掲載していきます。"
    checklist={['MTP の理解', 'TRAITH で To-Be を言語化', 'As-Is との GAP 算定']}
  />
);
export const Session3 = () => (
  <Worksheet
    title="第3回ワークシート | AIでやりたいこと発見コミュニティ v4.0"
    eyebrow="Session 03"
    h1="GAP設計と基礎ハーネス"
    body="第3回では、最優先 GAP を埋める最小ワークフローと、それを支えるフォルダ構造やテンプレートを整えます。正式版は後日掲載予定です。"
    checklist={['Workflow Spec', 'AI Working Spec', '基礎ハーネス構築']}
  />
);
export const Session4 = () => (
  <Worksheet
    title="第4回ワークシート | AIでやりたいこと発見コミュニティ v4.0"
    eyebrow="Session 04"
    h1="習慣ワークフロー実行"
    body="第4回では、朝のブリーフや会議前準備など、日次・週次の習慣ワークフローを実際に回して観察します。正式版は後日追加予定です。"
    checklist={['日次・週次ワークフロー', '実行ログ', '観察と改善']}
  />
);
export const Session5 = () => (
  <Worksheet
    title="第5回ワークシート | AIでやりたいこと発見コミュニティ v4.0"
    eyebrow="Session 05"
    h1="検証と定期見回り設計"
    body="第5回では、効果検証を行い、定期見回りや自動化に向く部分を見極めます。詳細ワークシートは後日掲載予定です。"
    checklist={['効果検証', '定期見回り候補', '自動化候補']}
  />
);
export const Session6 = () => (
  <Worksheet
    title="第6回ワークシート | AIでやりたいこと発見コミュニティ v4.0"
    eyebrow="Session 06"
    h1="定着と90日運用計画"
    body="第6回では、仕事ワークフローを完成させ、部分自動化の仕様と90日運用計画を作ります。正式版ワークシートは後日追加予定です。"
    checklist={['運用標準', '部分自動化仕様', '90日計画']}
  />
);

export default Worksheet;
