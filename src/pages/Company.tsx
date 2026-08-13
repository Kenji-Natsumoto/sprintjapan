import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SjShell from '@/components/SjShell';

const history: { year: string; text: string; now?: boolean }[] = [
  { year: '2017', text: 'デザインスプリントのワークショップを開始' },
  { year: '2019', text: 'デザインスプリントの研修会社として法人設立' },
  { year: '2020', text: 'オンラインプログラムの提供開始' },
  { year: '2022', text: '国内30社への導入実績を達成' },
  { year: '2023', text: '顧客開発モデルをベースにコンサルティング事業を開始' },
  { year: '2024', text: '国内60社への導入実績を達成' },
  { year: '2025', text: 'AIドリブン企業へビジネスモデル転換を宣言' },
  { year: '2026', text: 'AIネイティブカンパニー経営を実践。FDE（Forward Deployed Engineering）事業を開始', now: true },
];

const Company = () => {
  useEffect(() => {
    document.title = '会社情報｜スプリントジャパン株式会社';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'スプリントジャパン株式会社の会社情報。日本国内でAIネイティブカンパニーを当たり前にし、日本の経済界・産業界を世界レベルへと押し上げることを目的に、企業向けAI実装（FDE）・経営者向けAIコーチング・AI実践教育を提供しています。'
      );
    }
  }, []);

  return (
    <SjShell>
      <div className="sj-native">
        <div className="phero">
          <div className="wrap">
            <span className="label">Company</span>
            <h1>会社情報</h1>
          </div>
        </div>

        <section className="mtp">
          <div className="wrap">
            <span className="label">Our Purpose</span>
            <p className="statement">
              日本国内でAIネイティブカンパニーを当たり前にして、日本の経済界・産業界を世界レベルへと押し上げる。
            </p>
            <p className="note">
              私たちはこの目的のために、自らがAIネイティブカンパニーの最初の実例となり、そこで得た実装知を企業の現場へ届けています。
            </p>
          </div>
        </section>

        <section className="msg">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Message</span>
              <h2>代表メッセージ</h2>
            </div>

            <p>
              AIの波は、すべての業界に来ています。私たちは9年間、事業開発と組織開発の現場に立ち続けてきました。その現場の感覚と、経営の視点を、AIでつなぐこと——それが SPRINT Japan の仕事です。
            </p>
            <p>
              コンサルティングするだけでなく、自ら変わることで、この波の乗り方を示したいと考えました。私たち自身がAIネイティブな経営を毎日実践し、うまくいったことも、つまずいたことも、過程ごと公開しています。
            </p>
            <p className="strong">
              「変わるべきは、いつ？ 変わるべきは、誰？」この問いは、自他に本質的な気づきを与えてくれます。
            </p>

            <p className="sign">代表取締役<b>夏本 健司</b></p>

            <div className="links">
              <Link to="/profile/kenji_natsumoto">代表プロフィールを見る →</Link>
              <Link to="/ai-native-company/">AIネイティブ経営の論文を読む →</Link>
            </div>
          </div>
        </section>

        <section className="facts">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">Corporate Profile</span>
              <h2>会社概要</h2>
            </div>

            <table>
              <tbody>
                <tr><th>会社名</th><td>スプリントジャパン株式会社</td></tr>
                <tr><th>設立</th><td>2019年9月15日</td></tr>
                <tr><th>代表者</th><td>夏本 健司</td></tr>
                <tr><th>資本金</th><td>10,000,000円</td></tr>
                <tr><th>所在地</th><td>東京都渋谷区代々木1-36-6 929</td></tr>
                <tr><th>事業内容</th><td>企業向けAI実装（FDE）／経営者向けAIコーチング／AI実践教育</td></tr>
                <tr>
                  <th>主要顧客</th>
                  <td>
                    大企業・中堅企業60社以上、大学6校<br />
                    中堅企業数社、スモールビジネス・スタートアップ企業数社
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="hist">
          <div className="wrap">
            <div className="sec-head">
              <span className="label">History</span>
              <h2>沿革</h2>
            </div>

            <ol>
              {history.map((h) => (
                <li key={h.year} className={h.now ? 'now' : undefined}>
                  <time>{h.year}</time>
                  <span>{h.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sj-contact">
          <div className="wrap">
            <h2>まずは、いまの経営課題を<br />お聞かせください。</h2>
            <p>ご紹介・情報交換からのご連絡も歓迎です。</p>
            <Link to="/contact" className="btn btn-primary">お問い合わせ</Link>
          </div>
        </section>
      </div>
    </SjShell>
  );
};

export default Company;
