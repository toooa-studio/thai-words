/**
 * 語ごとの類義語・対義語・複合語の分解（日本語中心）。
 * - `RELATIONS` … 手動の上書き（分解・類義・対義）。
 * - 手動の `breakdown` がない語は、`meaning` に「／」や「/」で並んだ日本語訳から自動で「意味の整理」を付与（全語対象）。
 */
import { thaiWords } from "./thaiWords";

export type WordRelationNotes = {
  /** 複数の要素がつながって一語になっているとき、構成ごとの意味（改行で区切り可） */
  breakdown?: string;
  synonyms?: string;
  antonyms?: string;
};

const RELATIONS: Partial<Record<number, WordRelationNotes>> = {
  1: {
    breakdown:
      "สวัส（サワット）＝幸せ・無事さ\nดี（ディー）＝良い\n→ ふたつを並べた形で「ご無事で良いこと」を願うニュアンスが、あいさつとして定着した語。",
    synonyms: "あいさつ全般（初対面・別れなど場面で使う）",
    antonyms: "（単一の対義語はない）※「さようなら」も同じ สวัสดี で言うことが多い",
  },
  2: {
    synonyms: "男性話し手の文末の丁寧語",
    antonyms: "ค่ะ（女性・丁寧な文末）",
  },
  3: {
    synonyms: "女性話し手などの文末の丁寧語",
    antonyms: "ครับ（男性・丁寧な文末）",
  },
  4: {
    breakdown:
      "ขอบ＝（感謝の気持ちを）差し出す・捧げるイメージの部分\nคุณ＝あなた（丁寧な二人称）\n→ 相手に敬意を込めて「（感謝を）あなたに」＝ありがとう、と理解すると覚えやすい。",
    synonyms: "感謝の基本表現（ขอบคุณมาก で「本当にありがとう」）",
    antonyms: "（明確な一語の対義語はない）",
  },
  5: {
    breakdown:
      "ขอ＝請う・頼む\nโทษ＝罪・とがめ\n→「（お）咎めを請う」＝すみません／ごめんなさい。",
    synonyms: "謝罪・軽いお詫び（ขอโทษครับ／ค่ะ）",
    antonyms: "（状況による）",
  },
  6: {
    synonyms: "「はい」「そうです」の肯定",
    antonyms: "ไม่（いいえ／〜ない）",
  },
  7: {
    synonyms: "否定（いいえ／〜ない）",
    antonyms: "ใช่（はい・肯定）",
  },
  8: {
    synonyms: "一人称（男性）",
    antonyms: "คุณ（あなた）など、聞き手を指す語",
  },
  9: {
    synonyms: "一人称（女性・親しい相手）",
    antonyms: "ผม（男性の一人称）",
  },
  10: {
    synonyms: "二人称の丁寧形（あなた）",
    antonyms: "ผม・ฉัน（話し手自身＝「私」）",
  },
  11: {
    breakdown:
      "อะ＝疑問の前につける接頭辞のような役割\nไร＝何\n→「何（もの／こと）か」＝何。",
    synonyms: "疑問詞「何」",
    antonyms: "（対義語は文脈依存）",
  },
  12: {
    breakdown:
      "ที่＝（名詞に付いて）〜のところ・場所\nไหน＝どれ・どこ\n→「どの場所」＝どこ。",
    synonyms: "場所の疑問「どこ」",
    antonyms: "（対義語は文脈依存）",
  },
  13: {
    breakdown:
      "เมื่อ＝〜のとき・いつ頃\nไหร่＝疑問を補強する接辞（「いつ（のこと）」）\n→ いつ。",
    synonyms: "時間の疑問「いつ」",
    antonyms: "（対義語は文脈依存）",
  },
  14: {
    breakdown:
      "ทำ＝する\n口語では疑問と結びつき「（それを）してどうするの？」のニュアンス\n→ 日本語の「なぜ」に相当する聞き方。",
    synonyms: "理由の疑問「なぜ」",
    antonyms: "（対義語は文脈依存）",
  },
  15: {
    breakdown:
      "タイ語では「誰」と聞く定型の一語。\n語感としては「人」を尋ねる疑問、と捉えるとよい。",
    synonyms: "人の疑問「誰」",
    antonyms: "（対義語は文脈依存）",
  },
  16: {
    breakdown:
      "อย่าง＝様子・しかた\nไร＝何\n→「どんな様子か」＝どう、どのように。",
    synonyms: "様態の疑問「どう／どのように」",
    antonyms: "（対義語は文脈依存）",
  },
  17: {
    breakdown:
      "เท่า＝程度・等しさ\nไหร่＝疑問を補強\n→「どのくらい（の量・程度）か」＝いくら・どのくらい。",
    synonyms: "数量・程度の疑問「いくら・どのくらい」",
    antonyms: "（対義語は文脈依存）",
  },
  18: {
    breakdown:
      "指示詞の「近いほうのそれ」。\nนี่ は話し手の手元・身近なものを指すのが基本。",
    synonyms: "近称「これ」（話者近く）",
    antonyms: "นั่น（それ）／โน่น（あれ）",
  },
  19: {
    breakdown:
      "指示詞の「相手側に近いそれ」。\nนั่น は聞き手の近くにあるものを指しやすい。",
    synonyms: "中称「それ」（聞き手近く）",
    antonyms: "นี่（これ）／โน่น（あれ）",
  },
  20: {
    breakdown:
      "指示詞の「遠いほうのそれ」。\nโน่น は話者も聞き手もから離れたものを指す。",
    synonyms: "遠称「あれ」（二者から離れたもの）",
    antonyms: "นี่（これ）／นั่น（それ）",
  },
  21: {
    synonyms: "身分・属性として「〜である」（เป็น ครู など）",
    antonyms: "（否定は ไม่เป็น などで表す）",
  },
  22: {
    synonyms: "存在・位置「いる・ある」",
    antonyms: "ไป・มา（移動動詞）と対照的に「留まる」ニュアンス",
  },
  23: {
    synonyms: "所有・存在「持つ・ある」",
    antonyms: "ไม่มี（ない）",
  },
  24: {
    synonyms: "移動「行く」（話者から離れる）",
    antonyms: "มา（来る）",
  },
  25: {
    synonyms: "移動「来る」（話者に近づく）",
    antonyms: "ไป（行く）",
  },
  26: {
    synonyms: "食事動詞「食べる」",
    antonyms: "ดื่ม（飲む）",
  },
  27: {
    synonyms: "飲む",
    antonyms: "กิน（食べる）",
  },
  28: {
    synonyms: "行為一般「する」、作る意味でも使う",
    antonyms: "（文脈による）",
  },
  29: {
    synonyms: "話す・発話する",
    antonyms: "ฟัง（聞く）",
  },
  30: {
    synonyms: "聞く（音を耳に取る）",
    antonyms: "พูด（話す）",
  },
  31: {
    synonyms: "視覚で「見る」",
    antonyms: "ฟัง（聞く）／อ่าน（読む）など感覚が異なる",
  },
  32: {
    synonyms: "文字を「読む」",
    antonyms: "เขียน（書く）",
  },
  33: {
    synonyms: "書く",
    antonyms: "อ่าน（読む）",
  },
  34: {
    synonyms: "学習する・勉強する",
    antonyms: "（対義語は文脈依存）",
  },
  35: {
    synonyms: "知っている状態",
    antonyms: "ไม่รู้（知らない）",
  },
  36: {
    breakdown:
      "เข้า＝入る\nใจ＝こころ\n→「（理解が）こころに入る」＝わかる・納得する。",
    synonyms: "理解する・わかる",
    antonyms: "ไม่เข้าใจ（わからない）",
  },
  37: {
    synonyms: "好む・好きだ",
    antonyms: "ไม่ชอบ（好きではない）",
  },
  38: {
    synonyms: "愛する（強い好意）",
    antonyms: "เกลียด（嫌う）※強い反意",
  },
  39: {
    synonyms: "希望・願望「〜したい」",
    antonyms: "ไม่อยาก（〜したくない）",
  },
  40: {
    breakdown:
      "学習では一語として「〜しなければならない」と覚えるのが基本。\n義務・ルール・事情など外からの必要性を表す。",
    synonyms: "義務・必然「〜しなければならない」",
    antonyms: "ไม่ต้อง（〜しなくてよい）",
  },
  41: {
    synonyms: "可能・許可・入手など「〜できる／よい」",
    antonyms: "ไม่ได้（できない／だめ）",
  },
  42: {
    synonyms: "質・状態が良い",
    antonyms: "ไม่ดี（良くない）／แย่（悪い）",
  },
  43: {
    breakdown:
      "สบาย＝楽・快適\nดี＝良い\n→「調子が良い・快適だ」＝元気／順調、と挨拶でも使う。",
    synonyms: "体調・様子が良い（挨拶の สบายดี など）",
    antonyms: "ไม่สบาย（具合が悪い）",
  },
  44: {
    synonyms: "サイズ・程度が大きい",
    antonyms: "เล็ก（小さい）",
  },
  45: {
    synonyms: "サイズが小さい",
    antonyms: "ใหญ่（大きい）",
  },
  46: {
    synonyms: "量・程度が多い・とても",
    antonyms: "น้อย（少ない）",
  },
  47: {
    synonyms: "量が少ない",
    antonyms: "มาก（多い・とても）",
  },
  48: {
    synonyms: "温度が高い（暑い・熱い）",
    antonyms: "หนาว（寒い）／เย็น（冷たい・涼しい）※文脈で使い分け",
  },
  49: {
    synonyms: "気温が低い「寒い」",
    antonyms: "ร้อน（暑い・熱い）",
  },
  50: {
    synonyms: "味・食感が良い",
    antonyms: "ไม่อร่อย（美味しくない）",
  },
  51: {
    synonyms: "飲料水の「水」",
    antonyms: "（対義語は文脈依存）",
  },
  52: {
    synonyms: "食事のご飯・米",
    antonyms: "（対義語は文脈依存）",
  },
  53: {
    synonyms: "食べ物・料理一般",
    antonyms: "（対義語は文脈依存）",
  },
  54: {
    synonyms: "コーヒー",
    antonyms: "ชา（お茶）※飲み物の対比として",
  },
  55: {
    synonyms: "茶・お茶",
    antonyms: "กาแฟ（コーヒー）",
  },
  56: {
    breakdown:
      "ผล＝実・果実\nไม้＝木\n→「木の実」＝果物、と覚えると分解しやすい。",
    synonyms: "果物",
    antonyms: "（対義語は文脈依存）",
  },
  57: {
    synonyms: "家・住宅",
    antonyms: "（対義語は文脈依存）",
  },
  58: {
    breakdown:
      "ห้อง＝部屋\nน้ำ＝水\n→「水まわりの部屋」＝トイレ／浴室など。",
    synonyms: "トイレ・洗面などの水回りの部屋",
    antonyms: "（対義語は文脈依存）",
  },
  59: {
    breakdown:
      "โรง＝建物・館\nเรียน＝学ぶ・勉強\n→「学びの館」＝学校。",
    synonyms: "学校",
    antonyms: "（対義語は文脈依存）",
  },
  60: {
    breakdown:
      "โรง＝建物\nแรม＝宿（外来語に由来する説）\n→ 宿泊の建物＝ホテル。",
    synonyms: "ホテル・宿泊施設",
    antonyms: "บ้าน（自宅）※対比の一例",
  },
  61: {
    synonyms: "市場・マーケット",
    antonyms: "ร้านอาหาร（飲食店）※場所の対比例",
  },
  62: {
    breakdown:
      "ร้าน＝店\nอาหาร＝食べ物・料理\n→ 食事を出す店＝レストラン。",
    synonyms: "レストラン・食堂",
    antonyms: "ตลาด（市場）※対比の一例",
  },
  63: {
    synonyms: "自動車",
    antonyms: "รถไฟ（電車）／เดิน（歩く）など移動手段と対比し得る",
  },
  64: {
    breakdown:
      "รถ＝車・乗り物\nไฟ＝火\n→ 蒸気機関の「火の車」というイメージから「電車」に。",
    synonyms: "電車",
    antonyms: "รถ（車）／เครื่องบิน（飛行機）",
  },
  65: {
    breakdown:
      "เครื่อง＝機械・器具\nบิน＝飛ぶ\n→「飛ぶ機械」＝飛行機。",
    synonyms: "飛行機",
    antonyms: "รถไฟ・รถ など地上の交通手段",
  },
  66: {
    synonyms: "歩く",
    antonyms: "วิ่ง（走る）",
  },
  67: {
    synonyms: "座る",
    antonyms: "ยืน（立つ）",
  },
  68: {
    synonyms: "寝る・眠る",
    antonyms: "ตื่น（起きる）",
  },
  69: {
    synonyms: "目が覚める・起きる",
    antonyms: "นอน（寝る）",
  },
  70: {
    synonyms: "暦の「日」",
    antonyms: "คืน（夜）※対比の一例",
  },
  71: {
    breakdown:
      "วัน＝日・昼\nนี้＝この\n→「この日」＝今日。",
    synonyms: "今日",
    antonyms: "เมื่อวาน（昨日）／พรุ่งนี้（明日）",
  },
  72: {
    breakdown:
      "เมื่อ＝〜のとき\nวาน＝昨日（に関する語素）\n→「（さっきの）日」＝昨日、と覚える。",
    synonyms: "昨日",
    antonyms: "พรุ่งนี้（明日）／วันนี้（今日）",
  },
  73: {
    breakdown:
      "พรุ่ง＝翌・次\nนี้＝この\n→「次のこの（日）」＝明日。",
    synonyms: "明日",
    antonyms: "เมื่อวาน（昨日）／วันนี้（今日）",
  },
  74: {
    breakdown:
      "ตอน＝とき・区間\nนี้＝この\n→「この瞬間」＝今。",
    synonyms: "現在「今」",
    antonyms: "（過去・未来は別表現）",
  },
  75: {
    synonyms: "時間・時刻の幅",
    antonyms: "（対義語は文脈依存）",
  },
  76: {
    synonyms: "数「1」",
    antonyms: "（他基数との対比）",
  },
  77: {
    synonyms: "数「2」",
    antonyms: "（他基数との対比）",
  },
  78: {
    synonyms: "数「3」",
    antonyms: "（他基数との対比）",
  },
  79: {
    synonyms: "数「4」",
    antonyms: "（他基数との対比）",
  },
  80: {
    synonyms: "数「5」",
    antonyms: "（他基数との対比）",
  },
  81: {
    synonyms: "数「10」",
    antonyms: "（他基数との対比）",
  },
  82: {
    synonyms: "数「100」",
    antonyms: "（他基数との対比）",
  },
  83: {
    synonyms: "数「1000」",
    antonyms: "（他基数との対比）",
  },
  84: {
    synonyms: "お金",
    antonyms: "（対義語は文脈依存）",
  },
  85: {
    synonyms: "（値段が）高い",
    antonyms: "ถูก（安い）※価格の意味で",
  },
  86: {
    synonyms: "（値段が）安い／正しい など多義",
    antonyms: "แพง（高い）※価格の意味で",
  },
  87: {
    synonyms: "買う",
    antonyms: "ขาย（売る）",
  },
  88: {
    synonyms: "売る",
    antonyms: "ซื้อ（買う）",
  },
  89: {
    synonyms: "人（ひと）",
    antonyms: "（対義語は文脈依存）",
  },
  90: {
    breakdown:
      "ผู้＝〜の人（名詞を人にする接頭辞）\nชาย＝男\n→ 男性。",
    synonyms: "男性",
    antonyms: "ผู้หญิง（女性）",
  },
  91: {
    breakdown:
      "ผู้＝〜の人\nหญิง＝女\n→ 女性。",
    synonyms: "女性",
    antonyms: "ผู้ชาย（男性）",
  },
  92: {
    synonyms: "子供",
    antonyms: "ผู้ใหญ่（大人）※表現例",
  },
  93: {
    synonyms: "友達",
    antonyms: "ศัตรู（敵）※強い対比",
  },
  94: {
    breakdown:
      "ครอบ＝囲む・包む\nครัว＝台所（家族の中心のイメージ）\n→ 家族・身内のまとまり。",
    synonyms: "家族",
    antonyms: "（対義語は文脈依存）",
  },
  95: {
    synonyms: "父・お父さん",
    antonyms: "แม่（母）",
  },
  96: {
    synonyms: "母・お母さん",
    antonyms: "พ่อ（父）",
  },
  97: {
    synonyms: "外見が美しい・きれい",
    antonyms: "น่าเกลียด（醜い）※強い表現に注意",
  },
  98: {
    synonyms: "楽しい・面白い",
    antonyms: "เบื่อ（退屈だ）／น่าเบื่อ（つまらない）",
  },
  99: {
    synonyms: "疲れる・つかれる",
    antonyms: "สดชื่น（さっぱりしている）※対比の一例",
  },
  100: {
    synonyms: "空腹だ",
    antonyms: "อิ่ม（お腹がいっぱいだ）",
  },
};

function cleanMeaningText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/[（(][^()（）]*[）)]/g, "")
    .trim();
}

function extractMeaningSegments(meaning: string): string[] {
  return cleanMeaningText(meaning)
    .split(/\s*[/／・、,，]\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function extractMeaningKeywords(meaning: string): string[] {
  const raw = extractMeaningSegments(meaning)
    .flatMap((s) => s.split(/\s+/))
    .map((s) => s.replace(/[「」『』【】\[\]（）()]/g, "").trim())
    .filter((s) => s.length > 0);
  return Array.from(new Set(raw));
}

function deriveBreakdownFromMeaning(meaning: string): string | undefined {
  const segments = extractMeaningSegments(meaning);
  if (segments.length <= 1) return undefined;
  const body = segments.map((s, i) => `${i + 1}. ${s}`).join("\n");
  return `日本語訳が複数並ぶ語の整理:\n${body}`;
}

const WORD_BY_ID = new Map(thaiWords.map((w) => [w.id, w]));
const WORD_BY_THAI = new Map<string, typeof thaiWords>();
for (const word of thaiWords) {
  const current = WORD_BY_THAI.get(word.thai) ?? [];
  current.push(word);
  WORD_BY_THAI.set(word.thai, current);
}

const INDEXED = thaiWords.map((w) => ({
  ...w,
  meaningSegments: extractMeaningSegments(w.meaning),
  meaningKeywords: extractMeaningKeywords(w.meaning),
}));

const OPPOSITE_PAIRS: Array<[string, string]> = [
  ["大きい", "小さい"],
  ["高い", "低い"],
  ["暑い", "寒い"],
  ["熱い", "冷たい"],
  ["温かい", "冷たい"],
  ["重い", "軽い"],
  ["速い", "遅い"],
  ["早い", "遅い"],
  ["新しい", "古い"],
  ["明るい", "暗い"],
  ["長い", "短い"],
  ["多い", "少ない"],
  ["広い", "狭い"],
  ["強い", "弱い"],
  ["上", "下"],
  ["前", "後ろ"],
  ["左", "右"],
  ["男", "女"],
  ["男性", "女性"],
  ["父", "母"],
  ["夫", "妻"],
  ["買う", "売る"],
  ["行く", "来る"],
  ["入る", "出る"],
  ["開く", "閉じる"],
  ["始める", "終わる"],
  ["好き", "嫌い"],
];

const OPPOSITE_MAP = new Map<string, string[]>();
for (const [a, b] of OPPOSITE_PAIRS) {
  OPPOSITE_MAP.set(a, [...(OPPOSITE_MAP.get(a) ?? []), b]);
  OPPOSITE_MAP.set(b, [...(OPPOSITE_MAP.get(b) ?? []), a]);
}

function buildSynonyms(wordId: number): string {
  const current = INDEXED.find((w) => w.id === wordId);
  if (!current) return "近い意味の表現（語彙データ外）";

  const scored = INDEXED.filter((w) => w.id !== wordId)
    .map((candidate) => {
      const sharedKeywords = candidate.meaningKeywords.filter((k) =>
        current.meaningKeywords.includes(k)
      ).length;
      const sharedSegments = candidate.meaningSegments.filter((seg) =>
        current.meaningSegments.includes(seg)
      ).length;
      const meaningContains =
        current.meaning.includes(candidate.meaning) ||
        candidate.meaning.includes(current.meaning)
          ? 1
          : 0;
      const score = sharedKeywords * 3 + sharedSegments * 4 + meaningContains * 2;
      return { candidate, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.id - b.candidate.id)
    .slice(0, 3)
    .map((x) => `${x.candidate.thai}（${x.candidate.meaning}）`);

  if (scored.length === 0) {
    const first = current.meaningSegments[0] ?? current.meaning;
    return `近い意味: ${first}`;
  }
  return `近い語: ${scored.join("／")}`;
}

function buildAntonyms(wordId: number): string {
  const current = INDEXED.find((w) => w.id === wordId);
  if (!current) return "（対義語候補は語彙データ外）";

  const oppositeHints = new Set<string>();
  for (const keyword of current.meaningKeywords) {
    for (const [key, values] of OPPOSITE_MAP.entries()) {
      if (keyword.includes(key)) {
        for (const value of values) oppositeHints.add(value);
      }
    }
  }

  if (oppositeHints.size === 0) return "（明確な対義語は文脈依存）";

  const candidates = INDEXED.filter((w) => w.id !== wordId)
    .map((candidate) => {
      let score = 0;
      for (const hint of oppositeHints) {
        if (candidate.meaning.includes(hint)) score += 3;
        if (candidate.meaningKeywords.includes(hint)) score += 2;
      }
      return { candidate, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.id - b.candidate.id)
    .slice(0, 3)
    .map((x) => `${x.candidate.thai}（${x.candidate.meaning}）`);

  if (candidates.length === 0) {
    return `反対概念のヒント: ${Array.from(oppositeHints).join("／")}`;
  }
  return `反対側の語: ${candidates.join("／")}`;
}

function splitThaiCompound(thai: string): string[] | undefined {
  const direct = thai
    .split(/[-\s]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (direct.length >= 2) return direct;

  const terms = Array.from(WORD_BY_THAI.keys())
    .filter((t) => t !== thai && t.length >= 2)
    .sort((a, b) => b.length - a.length);

  const n = thai.length;
  const dp: Array<string[] | null> = Array(n + 1).fill(null);
  dp[0] = [];

  for (let i = 0; i < n; i += 1) {
    if (!dp[i]) continue;
    for (const term of terms) {
      if (!thai.startsWith(term, i)) continue;
      const nextIndex = i + term.length;
      const next = [...(dp[i] ?? []), term];
      if (next.length > 3) continue;
      const prev = dp[nextIndex];
      if (!prev || next.length < prev.length) {
        dp[nextIndex] = next;
      }
    }
  }

  const result = dp[n];
  if (!result || result.length < 2) return undefined;
  return result;
}

function buildBreakdown(wordId: number): string {
  const word = WORD_BY_ID.get(wordId);
  if (!word) return "語彙データ外のため、分解情報を取得できません。";

  const byMeaning = deriveBreakdownFromMeaning(word.meaning);
  if (byMeaning) return byMeaning;

  const compounds = splitThaiCompound(word.thai);
  if (compounds && compounds.length >= 2) {
    const parts = compounds.map((part) => {
      const info = WORD_BY_THAI.get(part)?.[0];
      const gloss = info?.meaning ?? "（意味未登録）";
      return `${part}＝${gloss}`;
    });
    return `語の構成要素:\n${parts.join("\n")}\n→ 全体として「${word.meaning}」。`;
  }

  const primary = extractMeaningSegments(word.meaning)[0] ?? word.meaning;
  return `一語として学ぶ語。\n主な意味: ${primary}`;
}

/** 語IDがないとき（リスニングの選択肢など）に、日本語訳テキストだけから整理を作る */
export function getRelationsFromJapaneseGlosses(
  meaning: string
): WordRelationNotes {
  const breakdown = deriveBreakdownFromMeaning(meaning);
  if (!breakdown) return {};
  return { breakdown };
}

export function getWordRelations(wordId: number): WordRelationNotes {
  const manual = RELATIONS[wordId];
  const word = WORD_BY_ID.get(wordId);
  if (!word && !manual) return {};

  return {
    breakdown: manual?.breakdown ?? buildBreakdown(wordId),
    synonyms: manual?.synonyms ?? buildSynonyms(wordId),
    antonyms: manual?.antonyms ?? buildAntonyms(wordId),
  };
}
