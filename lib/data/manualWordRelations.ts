export type WordRelationNotes = {
  breakdown?: string;
  synonyms?: string;
  antonyms?: string;
};

const MANUAL_RELATIONS: Partial<Record<number, WordRelationNotes>> = {
  101: {
    synonyms: "すでに・もう（完了のニュアンス）",
    antonyms: "ยัง（まだ）",
    breakdown: "文末に置いて「もう〜した」を作る頻出語。",
  },
  102: {
    synonyms: "未完了・継続「まだ」",
    antonyms: "แล้ว（もう・すでに）",
    breakdown: "否定と組み合わせて ยังไม่〜（まだ〜ない）で多用。",
  },
  103: {
    synonyms: "ร่วมกับ（〜と共に）",
    antonyms: "แยกจาก（〜から離れて）※文脈対比",
    breakdown: "前置詞的に「〜と／〜と一緒に」。",
  },
  104: {
    synonyms: "หรือไม่（〜かどうか）",
    antonyms: "และ（そして）※接続の対比",
    breakdown: "選択・疑問の接続語「または／〜か」。",
  },
  105: {
    synonyms: "อย่างไรก็ตาม（しかしながら）",
    antonyms: "เพราะฉะนั้น（だから）※逆接/順接の対比",
    breakdown: "逆接「でも・しかし」を示す接続語。",
  },
  106: {
    synonyms: "เนื่องจาก（〜なので）",
    antonyms: "แม้ว่า（〜なのに）※理由/逆接対比",
    breakdown: "理由導入「なぜなら〜」。",
  },
  107: {
    synonyms: "หาก（もし）",
    antonyms: "แน่นอนว่า（確実に）※仮定/断定対比",
    breakdown: "条件節の導入「もし〜なら」。",
  },
  108: {
    synonyms: "ตอน（〜の時）",
    antonyms: "ขณะนี้（今この瞬間）※時制対比",
    breakdown: "時間導入「〜のとき」。",
  },
  109: {
    synonyms: "ด้วย（〜も）",
    antonyms: "เท่านั้น（だけ）",
    breakdown: "添加・話題継続の小辞。",
  },
  110: {
    synonyms: "อยู่ในระหว่าง〜（進行中）",
    antonyms: "เสร็จแล้ว（完了）",
    breakdown: "กำลัง + 動詞 で現在進行。",
  },
  111: {
    synonyms: "กำลังจะ（まさに〜する）",
    antonyms: "เคย（過去経験）※未来/経験対比",
    breakdown: "未来・意志を示す助動的語。",
  },
  112: {
    synonyms: "มีประสบการณ์ว่า〜したことがある",
    antonyms: "ไม่เคย（一度もない）",
    breakdown: "経験相を表す語（เคย + 動詞）。",
  },
  113: {
    synonyms: "ห้องพัก（部屋）",
    antonyms: "ที่โล่งแจ้ง（屋外）※場所対比",
    breakdown: "室内空間の一般名詞。",
  },
  114: {
    synonyms: "ห้องพักผ่อน（寝る部屋）",
    antonyms: "ห้องนั่งเล่น（居間）※機能対比",
    breakdown: "ห้อง＝部屋 + นอน＝寝る → 寝室。",
  },
  115: {
    synonyms: "ครัว（台所）",
    antonyms: "ห้องนอน（寝室）※用途対比",
    breakdown: "ห้อง＝部屋 + ครัว＝台所 → キッチン。",
  },
  116: {
    synonyms: "บริเวณ〜（〜の場所で）",
    antonyms: "จาก（〜から）※場所起点対比",
    breakdown: "場所・関係節マーカーとして多機能。",
  },
  117: {
    synonyms: "ภายใน（内部）",
    antonyms: "นอก（外）",
    breakdown: "内側方向「〜の中に」。",
  },
  118: {
    synonyms: "ภายนอก（外側）",
    antonyms: "ใน（中）",
    breakdown: "外側位置「〜の外に」。",
  },
  119: {
    synonyms: "ด้านบน（上側）",
    antonyms: "ล่าง（下）",
    breakdown: "上面位置「〜の上に」。",
  },
  120: {
    synonyms: "ด้านล่าง（下側）",
    antonyms: "บน（上）",
    breakdown: "低い位置・下方を示す語。",
  },
  121: {
    synonyms: "ด้านข้าง（横側）",
    antonyms: "ตรงกลาง（中央）※位置対比",
    breakdown: "側面・となり位置を示す語。",
  },
  122: {
    synonyms: "ใกล้เคียง（近接）",
    antonyms: "ไกล（遠い）",
    breakdown: "距離が短いことを表す形容。",
  },
  123: {
    synonyms: "ห่าง（離れている）",
    antonyms: "ใกล้（近い）",
    breakdown: "距離が長いことを表す形容。",
  },
  124: {
    synonyms: "ด้านหน้า（前方）",
    antonyms: "หลัง（後ろ）",
    breakdown: "「顔／前面」の多義語。",
  },
  125: {
    synonyms: "ด้านหลัง（後方）",
    antonyms: "หน้า（前）",
    breakdown: "「背中／後方」の多義語。",
  },
  126: {
    synonyms: "ทางซ้าย（左側）",
    antonyms: "ขวา（右）",
    breakdown: "方角・位置の「左」。",
  },
  127: {
    synonyms: "ทางขวา（右側）",
    antonyms: "ซ้าย（左）",
    breakdown: "方角・位置の「右」。",
  },
  128: {
    synonyms: "ไปตรงๆ（直進）",
    antonyms: "เลี้ยว（曲がる）",
    breakdown: "方向指示「まっすぐ」。",
  },
  129: {
    synonyms: "ศีรษะ（頭部）",
    antonyms: "เท้า（足元）※身体位置対比",
    breakdown: "身体部位「頭」。",
  },
  130: {
    synonyms: "ดวงตา（眼）",
    antonyms: "ตาบอด（盲）※状態対比",
    breakdown: "視覚器官「目」。",
  },
  131: {
    synonyms: "ใบหู（耳）",
    antonyms: "หูหนวก（難聴）※状態対比",
    breakdown: "聴覚器官「耳」。",
  },
  132: {
    synonyms: "นาสิก（鼻）",
    antonyms: "คัดจมูก（鼻づまり）※状態対比",
    breakdown: "嗅覚器官「鼻」。",
  },
  133: {
    synonyms: "ปากช่อง（口元）",
    antonyms: "ปิดปาก（閉口）※動作対比",
    breakdown: "発話・摂食器官「口」。",
  },
  134: {
    synonyms: "เขี้ยว/ฟัน（歯）",
    antonyms: "ไร้ฟัน（歯がない）※状態対比",
    breakdown: "口内器官「歯」。",
  },
  135: {
    synonyms: "ฝ่ามือ（手のひら）",
    antonyms: "เท้า（足）※部位対比",
    breakdown: "上肢末端「手」。",
  },
  136: {
    synonyms: "เท้า（足部）",
    antonyms: "มือ（手）※機能対比",
    breakdown: "歩行の部位「足」。",
  },
  137: {
    synonyms: "เรียวขา（脚）",
    antonyms: "แขน（腕）※部位対比",
    breakdown: "下肢「脚」。",
  },
  138: {
    synonyms: "ท่อนแขน（腕）",
    antonyms: "ขา（脚）※部位対比",
    breakdown: "上肢「腕」。",
  },
  139: {
    synonyms: "จิตใจ（心）",
    antonyms: "ไร้ใจ（思いやりがない）※性質対比",
    breakdown: "感情・意志の中心「心」。",
  },
  140: {
    synonyms: "ผิวหนัง（皮膚）",
    antonyms: "กระดูก（骨）※層の対比",
    breakdown: "身体表面「肌」。",
  },
  141: {
    synonyms: "โลหิต（血液）",
    antonyms: "โลหิตจาง（貧血）※状態対比",
    breakdown: "体液「血」。",
  },
  142: {
    synonyms: "โครงกระดูก（骨格）",
    antonyms: "เนื้อ（肉）※組織対比",
    breakdown: "身体支持組織「骨」。",
  },
  143: {
    synonyms: "สุนัข（犬）",
    antonyms: "แมว（猫）※代表的対比",
    breakdown: "日常語の「犬」。",
  },
  144: {
    synonyms: "แมวบ้าน（猫）",
    antonyms: "หมา（犬）※代表的対比",
    breakdown: "日常語の「猫」。",
  },
  145: {
    synonyms: "วิหค（鳥）",
    antonyms: "ปลา（魚）※生息域対比",
    breakdown: "飛ぶ動物の総称「鳥」。",
  },
  146: {
    synonyms: "มัจฉา（魚）",
    antonyms: "นก（鳥）※生息域対比",
    breakdown: "水生動物「魚」。",
  },
  147: {
    synonyms: "ไก่บ้าน（ニワトリ）",
    antonyms: "เป็ด（アヒル）※家禽対比",
    breakdown: "家禽としての「鶏」。",
  },
  148: {
    synonyms: "สุกร（豚）",
    antonyms: "วัว（牛）※家畜対比",
    breakdown: "家畜としての「豚」。",
  },
  149: {
    synonyms: "โค（牛）",
    antonyms: "หมู（豚）※家畜対比",
    breakdown: "家畜としての「牛」。",
  },
  150: {
    synonyms: "ช้างไทย（象）",
    antonyms: "หนู（ネズミ）※大小対比",
    breakdown: "大型哺乳類「象」。",
  },
  151: {
    synonyms: "พยัคฆ์（虎）",
    antonyms: "เหยื่อ（獲物）※捕食関係対比",
    breakdown: "猛獣「トラ」。",
  },
  152: {
    synonyms: "วานร（猿）",
    antonyms: "มนุษย์（人間）※種別対比",
    breakdown: "霊長類「猿」。",
  },
  153: {
    synonyms: "ผีเสื้อกลางวัน（蝶）",
    antonyms: "ผีเสื้อกลางคืน（蛾）※分類対比",
    breakdown: "ผี + เสื้อ の連結で定着した語形（慣用的に「蝶」）。",
  },
  154: {
    synonyms: "แมลงต่างๆ（昆虫）",
    antonyms: "สัตว์ใหญ่（大型動物）※分類対比",
    breakdown: "小型節足動物の総称「虫」。",
  },
  155: {
    synonyms: "บุปผา（花）",
    antonyms: "ใบ（葉）※部位対比",
    breakdown: "ดอก＝花 + ไม้＝木 → 花。",
  },
  156: {
    synonyms: "พฤกษา（樹木）",
    antonyms: "ดอกไม้（花）※部位/対象対比",
    breakdown: "ต้น＝幹・本体 + ไม้＝木 → 木。",
  },
  157: {
    synonyms: "ใบไม้（葉）",
    antonyms: "ราก（根）※部位対比",
    breakdown: "植物の葉／助数詞「〜枚」。",
  },
  158: {
    synonyms: "ผักสด（野菜）",
    antonyms: "เนื้อสัตว์（肉類）※食材対比",
    breakdown: "可食植物「野菜」。",
  },
  159: {
    synonyms: "มะม่วงสุก/ดิบ（マンゴー）",
    antonyms: "（対義語は文脈依存）",
    breakdown: "果物名「マンゴー」。",
  },
  160: {
    synonyms: "กล้วยหอม/กล้วยน้ำว้า（バナナ）",
    antonyms: "（対義語は文脈依存）",
    breakdown: "果物名「バナナ」。",
  },
  161: {
    synonyms: "ส้มเขียวหวาน/ส้ม（オレンジ類）",
    antonyms: "มะนาว（ライム）※柑橘内対比",
    breakdown: "果物としての「オレンジ／みかん」。",
  },
  162: {
    synonyms: "ผลแอปเปิ้ล（りんご）",
    antonyms: "（対義語は文脈依存）",
    breakdown: "外来語由来の果物名。",
  },
  163: {
    synonyms: "ผลองุ่น（ぶどう）",
    antonyms: "（対義語は文脈依存）",
    breakdown: "果物名「ぶどう」。",
  },
  164: {
    synonyms: "แตงโมแดง（スイカ）",
    antonyms: "（対義語は文脈依存）",
    breakdown: "แตง（瓜）+ โม（語形成要素）で定着した果物名。",
  },
  165: {
    synonyms: "มะพร้าวอ่อน（ココナッツ）",
    antonyms: "（対義語は文脈依存）",
    breakdown: "果実と飲料を指す「ココナッツ」。",
  },
  166: {
    synonyms: "ราชาแห่งผลไม้（ドリアン）",
    antonyms: "（対義語は文脈依存）",
    breakdown: "果物名「ドリアン」。",
  },
  167: {
    synonyms: "ราชินีแห่งผลไม้（マンゴスチン）",
    antonyms: "（対義語は文脈依存）",
    breakdown: "果物名「マンゴスチン」。",
  },
  168: {
    synonyms: "ขนมปอนด์/ปัง（パン）",
    antonyms: "ข้าว（米飯）※主食対比",
    breakdown: "ขนม＝軽食/菓子 + ปัง（パン）→ パン。",
  },
  169: {
    synonyms: "ของหวาน（菓子）",
    antonyms: "อาหารคาว（主菜・塩味料理）",
    breakdown: "甘味・軽食全般「お菓子」。",
  },
  170: {
    synonyms: "น้ำตาลทราย（砂糖）",
    antonyms: "ไม่หวาน（甘くない）※味対比",
    breakdown: "น้ำ＝液/抽出 + ตาล＝糖源語素 → 砂糖。",
  },
  171: {
    synonyms: "เกลือแกง（食塩）",
    antonyms: "น้ำตาล（砂糖）※調味対比",
    breakdown: "基本調味料「塩」。",
  },
  172: {
    synonyms: "พริกสด/พริกแห้ง（唐辛子）",
    antonyms: "ไม่เผ็ด（辛くない）",
    breakdown: "辛味の中心素材「唐辛子」。",
  },
  173: {
    synonyms: "ไข่ไก่/ไข่เป็ด（卵）",
    antonyms: "ฟองเปล่า（中身なし）※状態対比",
    breakdown: "鳥類の卵一般。",
  },
  174: {
    synonyms: "น้ำนม（ミルク）",
    antonyms: "น้ำเปล่า（水）※飲料対比",
    breakdown: "乳飲料としての「牛乳」。",
  },
  175: {
    synonyms: "เนื้อสัตว์（肉）",
    antonyms: "ผัก（野菜）※食材対比",
    breakdown: "動物性食材「肉」。",
  },
  176: {
    synonyms: "คั่ว/ผัด（炒める）",
    antonyms: "ต้ม（煮る）",
    breakdown: "高温油で加熱する調理法。",
  },
  177: {
    synonyms: "เคี่ยว/ต้ม（煮る）",
    antonyms: "ทอด（揚げる）",
    breakdown: "液体で加熱する調理法。",
  },
  178: {
    synonyms: "เจียว/ทอด（揚げる）",
    antonyms: "ต้ม（煮る）",
    breakdown: "油で加熱する調理法。",
  },
  179: {
    synonyms: "ปิ้ง/ย่าง（焼く）",
    antonyms: "ต้ม（煮る）",
    breakdown: "直火・熱で焼く調理法。",
  },
  180: {
    synonyms: "ผัดเส้นไทย（パッタイ）",
    antonyms: "ก๋วยเตี๋ยวน้ำ（汁麺）※料理対比",
    breakdown: "ผัด＝炒める + ไทย＝タイ式 → パッタイ。",
  },
  181: {
    synonyms: "เส้นก๋วยเตี๋ยว（タイ麺料理）",
    antonyms: "ข้าวผัด（米料理）※主材対比",
    breakdown: "タイ式麺料理の総称。",
  },
  182: {
    synonyms: "ยำมะละกอ（ソムタム）",
    antonyms: "อาหารไม่เผ็ด（辛くない料理）",
    breakdown: "ส้ม（酸味）+ ตำ（つく/和える）→ ソムタム。",
  },
  183: {
    synonyms: "ต้มยำกุ้ง（トムヤム系）",
    antonyms: "ซุปจืด（あっさりスープ）※味対比",
    breakdown: "ต้ม＝煮る + ยำ＝和える風味 → トムヤム。",
  },
  184: {
    synonyms: "แกงไทย（タイカレー）",
    antonyms: "อาหารแห้ง（汁なし料理）※料理形態対比",
    breakdown: "汁気のある煮込み料理群。",
  },
  185: {
    synonyms: "ข้าวผัดไข่/หมู（炒飯）",
    antonyms: "ก๋วยเตี๋ยว（麺料理）※主材対比",
    breakdown: "ข้าว＝ご飯 + ผัด＝炒める → チャーハン。",
  },
  186: {
    synonyms: "เสื้อผ้า（衣類）",
    antonyms: "กางเกง（ズボン）※衣類部位対比",
    breakdown: "上半身の衣類「シャツ・服」。",
  },
  187: {
    synonyms: "กางเกงขายาว（ズボン）",
    antonyms: "เสื้อ（上衣）",
    breakdown: "下半身衣類「ズボン」。",
  },
  188: {
    synonyms: "เกือก/รองเท้า（靴）",
    antonyms: "เท้าเปล่า（裸足）",
    breakdown: "รอง＝รองรับする + เท้า＝足 → 靴。",
  },
  189: {
    synonyms: "หมวกกันแดด（帽子）",
    antonyms: "ไม่สวมหมวก（無帽）",
    breakdown: "頭部を覆う装身具。",
  },
  190: {
    synonyms: "กระเป๋าถือ（バッグ）",
    antonyms: "มือเปล่า（手ぶら）",
    breakdown: "携行品を入れる袋・バッグ。",
  },
  191: {
    synonyms: "แว่น（眼鏡）",
    antonyms: "ไม่ใส่แว่น（裸眼）",
    breakdown: "แว่น＝レンズ枠 + ตา＝目 → メガネ。",
  },
  192: {
    synonyms: "นาฬิกาข้อมือ/ผนัง（時計）",
    antonyms: "ไร้นาฬิกา（時計なし）",
    breakdown: "時刻を示す装置「時計」。",
  },
  193: {
    synonyms: "โทรศัพท์บ้าน（電話）",
    antonyms: "ไม่ติดต่อ（連絡しない）",
    breakdown: "遠隔連絡の基本語「電話」。",
  },
  194: {
    synonyms: "โทรศัพท์มือถือ（携帯）",
    antonyms: "โทรศัพท์บ้าน（固定電話）",
    breakdown: "มือ＝手 + ถือ＝持つ → 手で持つ電話。",
  },
  195: {
    synonyms: "พีซี/คอม（コンピューター）",
    antonyms: "เขียนมือ（手書き作業）※手段対比",
    breakdown: "外来語ベースのIT語。",
  },
  196: {
    synonyms: "ทีวี（テレビ）",
    antonyms: "วิทยุ（ラジオ）※映像/音声対比",
    breakdown: "映像受信機「テレビ」。",
  },
  197: {
    synonyms: "สถานีวิทยุ（ラジオ）",
    antonyms: "โทรทัศน์（テレビ）",
    breakdown: "音声放送媒体「ラジオ」。",
  },
  198: {
    synonyms: "ตำรา/หนังสือเล่ม（本）",
    antonyms: "สื่อเสียง（音声媒体）※媒体対比",
    breakdown: "読む媒体としての「本」。",
  },
  199: {
    synonyms: "ปากกาเขียน（ペン）",
    antonyms: "ดินสอ（鉛筆）※筆記具対比",
    breakdown: "ปาก＝先端 + กา（書字語素）の定着語。",
  },
  200: {
    synonyms: "ดินสอไม้（鉛筆）",
    antonyms: "ปากกา（ペン）",
    breakdown: "ดิน＝黒鉛由来語素 + สอ＝筆記具語素の定着語。",
  },
};

export function getWordRelations(wordId: number): WordRelationNotes {
  return MANUAL_RELATIONS[wordId] ?? {};
}

export function getRelationsFromJapaneseGlosses(
  _meaning: string
): WordRelationNotes {
  return {};
}
