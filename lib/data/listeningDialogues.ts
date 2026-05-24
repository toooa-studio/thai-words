export type DialogueSpeaker = "man" | "woman";

export type DialogueLine = {
  speaker: DialogueSpeaker;
  thai: string;
  romanization: string;
  meaning: string;
};

export type DialogueOption = {
  thai: string;
  romanization: string;
  meaning: string;
};

export type ListeningDialogue = {
  id: number;
  topic: string;
  dialogue: DialogueLine[];
  question: {
    thai: string;
    romanization: string;
    meaning: string;
  };
  options: [DialogueOption, DialogueOption, DialogueOption, DialogueOption];
  correctIndex: 0 | 1 | 2 | 3;
};

export const listeningDialogues: ListeningDialogue[] = [
  {
    id: 1,
    topic: "自己紹介",
    dialogue: [
      {
        speaker: "man",
        thai: "สวัสดีครับ คุณชื่ออะไรครับ",
        romanization: "sa-wàt-dii khráp, khun chûue arai khráp",
        meaning: "こんにちは、お名前は何ですか?",
      },
      {
        speaker: "woman",
        thai: "สวัสดีค่ะ ดิฉันชื่อมาลีค่ะ",
        romanization: "sa-wàt-dii khâ, di-chǎn chûue maa-lii khâ",
        meaning: "こんにちは、私の名前はマリーです。",
      },
      {
        speaker: "man",
        thai: "คุณเป็นคนไทยหรือครับ",
        romanization: "khun pen khon thai rǔue khráp",
        meaning: "あなたはタイ人ですか?",
      },
      {
        speaker: "woman",
        thai: "ใช่ค่ะ ดิฉันเป็นคนไทยค่ะ",
        romanization: "châi khâ, di-chǎn pen khon thai khâ",
        meaning: "はい、私はタイ人です。",
      },
    ],
    question: {
      thai: "ผู้หญิงชื่ออะไร",
      romanization: "phûu-yǐng chûue arai",
      meaning: "女性の名前は何ですか?",
    },
    options: [
      { thai: "มานี", romanization: "maa-nii", meaning: "マーニー" },
      { thai: "มาลี", romanization: "maa-lii", meaning: "マリー" },
      { thai: "มารี", romanization: "maa-rii", meaning: "マーリー" },
      { thai: "มาลา", romanization: "maa-laa", meaning: "マラー" },
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    topic: "学校・時間",
    dialogue: [
      {
        speaker: "woman",
        thai: "วันนี้คุณไปไหนคะ",
        romanization: "wan-níi khun pai nǎi khá",
        meaning: "今日はどこへ行きますか?",
      },
      {
        speaker: "man",
        thai: "ผมไปโรงเรียนครับ",
        romanization: "phǒm pai roong-rian khráp",
        meaning: "私は学校へ行きます。",
      },
      {
        speaker: "woman",
        thai: "ไปกี่โมงคะ",
        romanization: "pai kìi moong khá",
        meaning: "何時に行きますか?",
      },
      {
        speaker: "man",
        thai: "ไปเจ็ดโมงครึ่งครับ",
        romanization: "pai jèt moong khrûeng khráp",
        meaning: "7時半に行きます。",
      },
    ],
    question: {
      thai: "ผู้ชายไปโรงเรียนกี่โมง",
      romanization: "phûu-chaai pai roong-rian kìi moong",
      meaning: "男性は何時に学校へ行きますか?",
    },
    options: [
      { thai: "เจ็ดโมง", romanization: "jèt moong", meaning: "7時" },
      { thai: "เจ็ดโมงครึ่ง", romanization: "jèt moong khrûeng", meaning: "7時半" },
      { thai: "แปดโมง", romanization: "pàet moong", meaning: "8時" },
      { thai: "แปดโมงครึ่ง", romanization: "pàet moong khrûeng", meaning: "8時半" },
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    topic: "食べ物・飲み物",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณชอบกินอะไรครับ",
        romanization: "khun chɔ̂ɔp kin arai khráp",
        meaning: "何を食べるのが好きですか?",
      },
      {
        speaker: "woman",
        thai: "ฉันชอบกินข้าวผัดค่ะ",
        romanization: "chǎn chɔ̂ɔp kin khâao-phàt khâ",
        meaning: "私はチャーハンを食べるのが好きです。",
      },
      {
        speaker: "man",
        thai: "แล้วคุณชอบดื่มอะไรครับ",
        romanization: "lɛ́ɛo khun chɔ̂ɔp dùuem arai khráp",
        meaning: "では何を飲むのが好きですか?",
      },
      {
        speaker: "woman",
        thai: "ชอบดื่มน้ำส้มค่ะ",
        romanization: "chɔ̂ɔp dùuem nám-sôm khâ",
        meaning: "オレンジジュースを飲むのが好きです。",
      },
    ],
    question: {
      thai: "ผู้หญิงชอบดื่มอะไร",
      romanization: "phûu-yǐng chɔ̂ɔp dùuem arai",
      meaning: "女性は何を飲むのが好きですか?",
    },
    options: [
      { thai: "น้ำเปล่า", romanization: "nám-plàao", meaning: "水" },
      { thai: "กาแฟ", romanization: "kaa-fɛɛ", meaning: "コーヒー" },
      { thai: "น้ำส้ม", romanization: "nám-sôm", meaning: "オレンジジュース" },
      { thai: "ชาเย็น", romanization: "chaa-yen", meaning: "アイスティー" },
    ],
    correctIndex: 2,
  },
  {
    id: 4,
    topic: "買い物・値段",
    dialogue: [
      {
        speaker: "woman",
        thai: "เสื้อสีแดงตัวนี้ราคาเท่าไรคะ",
        romanization: "sûuea sǐi-dɛɛng tua níi raa-khaa thâo-rài khá",
        meaning: "この赤いシャツはいくらですか?",
      },
      {
        speaker: "man",
        thai: "สองร้อยบาทครับ",
        romanization: "sɔ̌ɔng-rɔ́ɔi bàat khráp",
        meaning: "200バーツです。",
      },
      {
        speaker: "woman",
        thai: "แพงไหมคะ",
        romanization: "phɛɛng mǎi khá",
        meaning: "高いですか?",
      },
      {
        speaker: "man",
        thai: "ไม่แพงครับ",
        romanization: "mâi phɛɛng khráp",
        meaning: "高くありません。",
      },
    ],
    question: {
      thai: "เสื้อสีแดงราคาเท่าไร",
      romanization: "sûuea sǐi-dɛɛng raa-khaa thâo-rài",
      meaning: "赤いシャツはいくらですか?",
    },
    options: [
      { thai: "หนึ่งร้อยบาท", romanization: "nùeng-rɔ́ɔi bàat", meaning: "100バーツ" },
      { thai: "สองร้อยบาท", romanization: "sɔ̌ɔng-rɔ́ɔi bàat", meaning: "200バーツ" },
      { thai: "สามร้อยบาท", romanization: "sǎam-rɔ́ɔi bàat", meaning: "300バーツ" },
      { thai: "สี่ร้อยบาท", romanization: "sìi-rɔ́ɔi bàat", meaning: "400バーツ" },
    ],
    correctIndex: 1,
  },
  {
    id: 5,
    topic: "場所・道",
    dialogue: [
      {
        speaker: "man",
        thai: "บ้านคุณอยู่ที่ไหนครับ",
        romanization: "bâan khun yùu thîi-nǎi khráp",
        meaning: "あなたの家はどこにありますか?",
      },
      {
        speaker: "woman",
        thai: "บ้านฉันอยู่ใกล้สถานีรถไฟค่ะ",
        romanization: "bâan chǎn yùu klâi sa-thǎa-nii rót-fai khâ",
        meaning: "私の家は駅の近くにあります。",
      },
      {
        speaker: "man",
        thai: "เดินไปสถานีได้ไหมครับ",
        romanization: "dəən pai sa-thǎa-nii dâai mǎi khráp",
        meaning: "駅まで歩いて行けますか?",
      },
      {
        speaker: "woman",
        thai: "ได้ค่ะ ใช้เวลาประมาณห้านาที",
        romanization: "dâai khâ, chái wee-laa pra-maan hâa naa-thii",
        meaning: "行けます。だいたい5分かかります。",
      },
    ],
    question: {
      thai: "บ้านของผู้หญิงอยู่ที่ไหน",
      romanization: "bâan khɔ̌ɔng phûu-yǐng yùu thîi-nǎi",
      meaning: "女性の家はどこにありますか?",
    },
    options: [
      { thai: "ใกล้โรงเรียน", romanization: "klâi roong-rian", meaning: "学校の近く" },
      { thai: "ใกล้ตลาด", romanization: "klâi ta-làat", meaning: "市場の近く" },
      { thai: "ใกล้สถานีรถไฟ", romanization: "klâi sa-thǎa-nii rót-fai", meaning: "駅の近く" },
      { thai: "ใกล้โรงพยาบาล", romanization: "klâi roong-pha-yaa-baan", meaning: "病院の近く" },
    ],
    correctIndex: 2,
  },
  {
    id: 6,
    topic: "家族",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณมีพี่น้องกี่คนครับ",
        romanization: "khun mii phîi-nɔ́ɔng kìi khon khráp",
        meaning: "兄弟は何人いますか?",
      },
      {
        speaker: "woman",
        thai: "ฉันมีพี่ชายหนึ่งคนค่ะ",
        romanization: "chǎn mii phîi-chaai nùeng khon khâ",
        meaning: "私には兄が1人います。",
      },
      {
        speaker: "man",
        thai: "พี่ชายอายุเท่าไรครับ",
        romanization: "phîi-chaai aa-yú thâo-rài khráp",
        meaning: "お兄さんは何歳ですか?",
      },
      {
        speaker: "woman",
        thai: "อายุสามสิบปีค่ะ",
        romanization: "aa-yú sǎam-sìp pii khâ",
        meaning: "30歳です。",
      },
    ],
    question: {
      thai: "ผู้หญิงมีพี่น้องกี่คน",
      romanization: "phûu-yǐng mii phîi-nɔ́ɔng kìi khon",
      meaning: "女性には兄弟が何人いますか?",
    },
    options: [
      { thai: "ไม่มี", romanization: "mâi mii", meaning: "いない" },
      { thai: "หนึ่งคน", romanization: "nùeng khon", meaning: "1人" },
      { thai: "สองคน", romanization: "sɔ̌ɔng khon", meaning: "2人" },
      { thai: "สามคน", romanization: "sǎam khon", meaning: "3人" },
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    topic: "天気",
    dialogue: [
      {
        speaker: "woman",
        thai: "วันนี้อากาศเป็นอย่างไรคะ",
        romanization: "wan-níi aa-kàat pen yàang-rai khá",
        meaning: "今日の天気はどうですか?",
      },
      {
        speaker: "man",
        thai: "วันนี้อากาศร้อนมากครับ",
        romanization: "wan-níi aa-kàat rɔ́ɔn mâak khráp",
        meaning: "今日はとても暑いです。",
      },
      {
        speaker: "woman",
        thai: "ฝนจะตกไหมคะ",
        romanization: "fǒn jà tòk mǎi khá",
        meaning: "雨は降りますか?",
      },
      {
        speaker: "man",
        thai: "ผมว่าไม่ตกครับ",
        romanization: "phǒm wâa mâi tòk khráp",
        meaning: "降らないと思います。",
      },
    ],
    question: {
      thai: "วันนี้อากาศเป็นอย่างไร",
      romanization: "wan-níi aa-kàat pen yàang-rai",
      meaning: "今日の天気はどうですか?",
    },
    options: [
      { thai: "หนาว", romanization: "nǎao", meaning: "寒い" },
      { thai: "เย็น", romanization: "yen", meaning: "涼しい" },
      { thai: "ร้อน", romanization: "rɔ́ɔn", meaning: "暑い" },
      { thai: "สบาย", romanization: "sa-baai", meaning: "快適" },
    ],
    correctIndex: 2,
  },
  {
    id: 8,
    topic: "レストラン",
    dialogue: [
      {
        speaker: "woman",
        thai: "รับอะไรดีคะ",
        romanization: "ráp arai dii khá",
        meaning: "ご注文は何になさいますか?",
      },
      {
        speaker: "man",
        thai: "ขอข้าวผัดกุ้งหนึ่งจานครับ",
        romanization: "khɔ̌ɔ khâao-phàt kûng nùeng jaan khráp",
        meaning: "エビチャーハンを1皿ください。",
      },
      {
        speaker: "woman",
        thai: "รับเครื่องดื่มไหมคะ",
        romanization: "ráp khrûeang-dùuem mǎi khá",
        meaning: "お飲み物はいかがですか?",
      },
      {
        speaker: "man",
        thai: "ขอน้ำเปล่าหนึ่งขวดครับ",
        romanization: "khɔ̌ɔ nám-plàao nùeng khùuat khráp",
        meaning: "水を1本ください。",
      },
    ],
    question: {
      thai: "ผู้ชายสั่งอะไร",
      romanization: "phûu-chaai sàng arai",
      meaning: "男性は何を注文しましたか?",
    },
    options: [
      { thai: "ข้าวผัดหมู", romanization: "khâao-phàt mǔu", meaning: "豚肉チャーハン" },
      { thai: "ข้าวผัดไก่", romanization: "khâao-phàt kài", meaning: "鶏肉チャーハン" },
      { thai: "ข้าวผัดกุ้ง", romanization: "khâao-phàt kûng", meaning: "エビチャーハン" },
      { thai: "ข้าวผัดปู", romanization: "khâao-phàt puu", meaning: "カニチャーハン" },
    ],
    correctIndex: 2,
  },
  {
    id: 9,
    topic: "趣味",
    dialogue: [
      {
        speaker: "woman",
        thai: "เวลาว่างคุณทำอะไรคะ",
        romanization: "wee-laa wâang khun tham arai khá",
        meaning: "暇な時、何をしますか?",
      },
      {
        speaker: "man",
        thai: "ผมชอบฟังเพลงครับ",
        romanization: "phǒm chɔ̂ɔp fang phleeng khráp",
        meaning: "私は音楽を聴くのが好きです。",
      },
      {
        speaker: "woman",
        thai: "ชอบเพลงแบบไหนคะ",
        romanization: "chɔ̂ɔp phleeng bɛ̀ɛp nǎi khá",
        meaning: "どんな音楽が好きですか?",
      },
      {
        speaker: "man",
        thai: "ผมชอบเพลงไทยครับ",
        romanization: "phǒm chɔ̂ɔp phleeng thai khráp",
        meaning: "私はタイの音楽が好きです。",
      },
    ],
    question: {
      thai: "ผู้ชายชอบทำอะไรเวลาว่าง",
      romanization: "phûu-chaai chɔ̂ɔp tham arai wee-laa wâang",
      meaning: "男性は暇な時、何をするのが好きですか?",
    },
    options: [
      { thai: "ดูหนัง", romanization: "duu nǎng", meaning: "映画を観る" },
      { thai: "อ่านหนังสือ", romanization: "àan nǎng-sǔue", meaning: "本を読む" },
      { thai: "ฟังเพลง", romanization: "fang phleeng", meaning: "音楽を聴く" },
      { thai: "เล่นกีฬา", romanization: "lên kii-laa", meaning: "スポーツをする" },
    ],
    correctIndex: 2,
  },
  {
    id: 10,
    topic: "外出",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณจะไปไหนครับ",
        romanization: "khun jà pai nǎi khráp",
        meaning: "どこへ行きますか?",
      },
      {
        speaker: "woman",
        thai: "ฉันจะไปตลาดค่ะ",
        romanization: "chǎn jà pai ta-làat khâ",
        meaning: "私は市場へ行きます。",
      },
      {
        speaker: "man",
        thai: "ไปกับใครครับ",
        romanization: "pai kàp khrai khráp",
        meaning: "誰と行きますか?",
      },
      {
        speaker: "woman",
        thai: "ไปคนเดียวค่ะ",
        romanization: "pai khon diao khâ",
        meaning: "1人で行きます。",
      },
    ],
    question: {
      thai: "ผู้หญิงจะไปไหน",
      romanization: "phûu-yǐng jà pai nǎi",
      meaning: "女性はどこへ行きますか?",
    },
    options: [
      { thai: "ไปทำงาน", romanization: "pai tham-ngaan", meaning: "仕事に行く" },
      { thai: "ไปตลาด", romanization: "pai ta-làat", meaning: "市場に行く" },
      { thai: "ไปโรงเรียน", romanization: "pai roong-rian", meaning: "学校に行く" },
      { thai: "ไปบ้านเพื่อน", romanization: "pai bâan phûuean", meaning: "友達の家に行く" },
    ],
    correctIndex: 1,
  },
  {
    id: 11,
    topic: "果物・買い物",
    dialogue: [
      {
        speaker: "woman",
        thai: "มะม่วงกิโลละเท่าไรคะ",
        romanization: "ma-mûang ki-loo lá thâo-rài khá",
        meaning: "マンゴーは1キロいくらですか?",
      },
      {
        speaker: "man",
        thai: "กิโลละแปดสิบบาทครับ",
        romanization: "ki-loo lá pàet-sìp bàat khráp",
        meaning: "1キロ80バーツです。",
      },
      {
        speaker: "woman",
        thai: "ขอสองกิโลค่ะ",
        romanization: "khɔ̌ɔ sɔ̌ɔng ki-loo khâ",
        meaning: "2キロください。",
      },
      {
        speaker: "man",
        thai: "ทั้งหมดหนึ่งร้อยหกสิบบาทครับ",
        romanization: "tháng-mòt nùeng-rɔ́ɔi hòk-sìp bàat khráp",
        meaning: "全部で160バーツです。",
      },
    ],
    question: {
      thai: "ผู้หญิงต้องจ่ายเงินกี่บาท",
      romanization: "phûu-yǐng tɔ̂ng jàai ngən kìi bàat",
      meaning: "女性はいくら払う必要がありますか?",
    },
    options: [
      { thai: "แปดสิบบาท", romanization: "pàet-sìp bàat", meaning: "80バーツ" },
      { thai: "หนึ่งร้อยบาท", romanization: "nùeng-rɔ́ɔi bàat", meaning: "100バーツ" },
      { thai: "หนึ่งร้อยหกสิบบาท", romanization: "nùeng-rɔ́ɔi hòk-sìp bàat", meaning: "160バーツ" },
      { thai: "สองร้อยบาท", romanization: "sɔ̌ɔng-rɔ́ɔi bàat", meaning: "200バーツ" },
    ],
    correctIndex: 2,
  },
  {
    id: 12,
    topic: "仕事",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณทำงานอะไรครับ",
        romanization: "khun tham-ngaan arai khráp",
        meaning: "お仕事は何ですか?",
      },
      {
        speaker: "woman",
        thai: "ฉันเป็นครูค่ะ",
        romanization: "chǎn pen khruu khâ",
        meaning: "私は教師です。",
      },
      {
        speaker: "man",
        thai: "สอนวิชาอะไรครับ",
        romanization: "sɔ̌ɔn wí-chaa arai khráp",
        meaning: "何の科目を教えていますか?",
      },
      {
        speaker: "woman",
        thai: "สอนภาษาอังกฤษค่ะ",
        romanization: "sɔ̌ɔn phaa-sǎa ang-krìt khâ",
        meaning: "英語を教えています。",
      },
    ],
    question: {
      thai: "ผู้หญิงทำงานอะไร",
      romanization: "phûu-yǐng tham-ngaan arai",
      meaning: "女性は何の仕事をしていますか?",
    },
    options: [
      { thai: "หมอ", romanization: "mɔ̌ɔ", meaning: "医者" },
      { thai: "ครู", romanization: "khruu", meaning: "教師" },
      { thai: "พนักงาน", romanization: "pha-nák-ngaan", meaning: "会社員" },
      { thai: "นักเรียน", romanization: "nák-rian", meaning: "学生" },
    ],
    correctIndex: 1,
  },
  {
    id: 13,
    topic: "年齢",
    dialogue: [
      {
        speaker: "woman",
        thai: "คุณอายุเท่าไรคะ",
        romanization: "khun aa-yú thâo-rài khá",
        meaning: "何歳ですか?",
      },
      {
        speaker: "man",
        thai: "ผมอายุยี่สิบห้าปีครับ",
        romanization: "phǒm aa-yú yîi-sìp-hâa pii khráp",
        meaning: "私は25歳です。",
      },
      {
        speaker: "woman",
        thai: "เกิดเดือนอะไรคะ",
        romanization: "kə̀ət duuean arai khá",
        meaning: "何月生まれですか?",
      },
      {
        speaker: "man",
        thai: "เกิดเดือนมีนาคมครับ",
        romanization: "kə̀ət duuean mii-naa-khom khráp",
        meaning: "3月生まれです。",
      },
    ],
    question: {
      thai: "ผู้ชายอายุเท่าไร",
      romanization: "phûu-chaai aa-yú thâo-rài",
      meaning: "男性は何歳ですか?",
    },
    options: [
      { thai: "ยี่สิบปี", romanization: "yîi-sìp pii", meaning: "20歳" },
      { thai: "ยี่สิบห้าปี", romanization: "yîi-sìp-hâa pii", meaning: "25歳" },
      { thai: "สามสิบปี", romanization: "sǎam-sìp pii", meaning: "30歳" },
      { thai: "สามสิบห้าปี", romanization: "sǎam-sìp-hâa pii", meaning: "35歳" },
    ],
    correctIndex: 1,
  },
  {
    id: 14,
    topic: "旅行",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณเคยไปเชียงใหม่ไหมครับ",
        romanization: "khun khəəi pai chiang-mài mǎi khráp",
        meaning: "チェンマイに行ったことがありますか?",
      },
      {
        speaker: "woman",
        thai: "เคยค่ะ ฉันไปเมื่อปีที่แล้ว",
        romanization: "khəəi khâ, chǎn pai mûuea pii thîi lɛ́ɛo",
        meaning: "あります。去年行きました。",
      },
      {
        speaker: "man",
        thai: "สนุกไหมครับ",
        romanization: "sa-nùk mǎi khráp",
        meaning: "楽しかったですか?",
      },
      {
        speaker: "woman",
        thai: "สนุกมากค่ะ อาหารอร่อยด้วย",
        romanization: "sa-nùk mâak khâ, aa-hǎan a-rɔ̀i dûai",
        meaning: "とても楽しかったです。料理も美味しかったです。",
      },
    ],
    question: {
      thai: "ผู้หญิงไปเชียงใหม่เมื่อไร",
      romanization: "phûu-yǐng pai chiang-mài mûuea-rài",
      meaning: "女性はいつチェンマイに行きましたか?",
    },
    options: [
      { thai: "เมื่อสัปดาห์ที่แล้ว", romanization: "mûuea sàp-daa thîi lɛ́ɛo", meaning: "先週" },
      { thai: "เมื่อเดือนที่แล้ว", romanization: "mûuea duuean thîi lɛ́ɛo", meaning: "先月" },
      { thai: "เมื่อปีที่แล้ว", romanization: "mûuea pii thîi lɛ́ɛo", meaning: "去年" },
      { thai: "เมื่อสามปีที่แล้ว", romanization: "mûuea sǎam pii thîi lɛ́ɛo", meaning: "3年前" },
    ],
    correctIndex: 2,
  },
  {
    id: 15,
    topic: "ホテル",
    dialogue: [
      {
        speaker: "man",
        thai: "ผมต้องการจองห้องพักครับ",
        romanization: "phǒm tɔ̂ng-kaan jɔɔng hɔ̂ng-phák khráp",
        meaning: "部屋を予約したいのですが。",
      },
      {
        speaker: "woman",
        thai: "กี่คืนคะ",
        romanization: "kìi khuuen khá",
        meaning: "何泊ですか?",
      },
      {
        speaker: "man",
        thai: "สามคืนครับ",
        romanization: "sǎam khuuen khráp",
        meaning: "3泊です。",
      },
      {
        speaker: "woman",
        thai: "เตียงเดี่ยวหรือเตียงคู่คะ",
        romanization: "tiang dìao rǔue tiang khûu khá",
        meaning: "シングルベッドかダブルベッドか?",
      },
    ],
    question: {
      thai: "ผู้ชายจะพักกี่คืน",
      romanization: "phûu-chaai jà phák kìi khuuen",
      meaning: "男性は何泊しますか?",
    },
    options: [
      { thai: "หนึ่งคืน", romanization: "nùeng khuuen", meaning: "1泊" },
      { thai: "สองคืน", romanization: "sɔ̌ɔng khuuen", meaning: "2泊" },
      { thai: "สามคืน", romanization: "sǎam khuuen", meaning: "3泊" },
      { thai: "สี่คืน", romanization: "sìi khuuen", meaning: "4泊" },
    ],
    correctIndex: 2,
  },
  {
    id: 16,
    topic: "病院",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณเป็นอะไรครับ",
        romanization: "khun pen arai khráp",
        meaning: "どうしましたか?",
      },
      {
        speaker: "woman",
        thai: "ฉันปวดหัวค่ะ",
        romanization: "chǎn pùuat hǔa khâ",
        meaning: "頭が痛いです。",
      },
      {
        speaker: "man",
        thai: "เริ่มเป็นเมื่อไรครับ",
        romanization: "rə̂əm pen mûuea-rài khráp",
        meaning: "いつから痛みますか?",
      },
      {
        speaker: "woman",
        thai: "เริ่มเป็นเมื่อเช้านี้ค่ะ",
        romanization: "rə̂əm pen mûuea cháao níi khâ",
        meaning: "今朝からです。",
      },
    ],
    question: {
      thai: "ผู้หญิงเป็นอะไร",
      romanization: "phûu-yǐng pen arai",
      meaning: "女性はどこが悪いですか?",
    },
    options: [
      { thai: "ปวดท้อง", romanization: "pùuat thɔ́ɔng", meaning: "腹痛" },
      { thai: "ปวดหัว", romanization: "pùuat hǔa", meaning: "頭痛" },
      { thai: "ปวดฟัน", romanization: "pùuat fan", meaning: "歯痛" },
      { thai: "ปวดหลัง", romanization: "pùuat lǎng", meaning: "腰痛" },
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    topic: "曜日",
    dialogue: [
      {
        speaker: "woman",
        thai: "วันนี้วันอะไรคะ",
        romanization: "wan-níi wan arai khá",
        meaning: "今日は何曜日ですか?",
      },
      {
        speaker: "man",
        thai: "วันนี้วันพุธครับ",
        romanization: "wan-níi wan-phút khráp",
        meaning: "今日は水曜日です。",
      },
      {
        speaker: "woman",
        thai: "พรุ่งนี้คุณว่างไหมคะ",
        romanization: "phrûng-níi khun wâang mǎi khá",
        meaning: "明日は時間がありますか?",
      },
      {
        speaker: "man",
        thai: "ผมว่างครับ",
        romanization: "phǒm wâang khráp",
        meaning: "私は空いています。",
      },
    ],
    question: {
      thai: "วันนี้วันอะไร",
      romanization: "wan-níi wan arai",
      meaning: "今日は何曜日ですか?",
    },
    options: [
      { thai: "วันจันทร์", romanization: "wan-jan", meaning: "月曜日" },
      { thai: "วันอังคาร", romanization: "wan-ang-khaan", meaning: "火曜日" },
      { thai: "วันพุธ", romanization: "wan-phút", meaning: "水曜日" },
      { thai: "วันพฤหัสบดี", romanization: "wan-phá-rúe-hàt-sa-bɔɔ-dii", meaning: "木曜日" },
    ],
    correctIndex: 2,
  },
  {
    id: 18,
    topic: "交通",
    dialogue: [
      {
        speaker: "woman",
        thai: "คุณมาทำงานยังไงคะ",
        romanization: "khun maa tham-ngaan yang-ngai khá",
        meaning: "どうやって仕事に来ていますか?",
      },
      {
        speaker: "man",
        thai: "ผมนั่งรถไฟฟ้ามาครับ",
        romanization: "phǒm nâng rót-fai-fáa maa khráp",
        meaning: "私はBTSに乗って来ています。",
      },
      {
        speaker: "woman",
        thai: "ใช้เวลานานไหมคะ",
        romanization: "chái wee-laa naan mǎi khá",
        meaning: "時間はかかりますか?",
      },
      {
        speaker: "man",
        thai: "ประมาณสามสิบนาทีครับ",
        romanization: "pra-maan sǎam-sìp naa-thii khráp",
        meaning: "だいたい30分です。",
      },
    ],
    question: {
      thai: "ผู้ชายมาทำงานด้วยอะไร",
      romanization: "phûu-chaai maa tham-ngaan dûai arai",
      meaning: "男性は何で通勤していますか?",
    },
    options: [
      { thai: "รถยนต์", romanization: "rót-yon", meaning: "自動車" },
      { thai: "รถเมล์", romanization: "rót-mee", meaning: "バス" },
      { thai: "รถไฟฟ้า", romanization: "rót-fai-fáa", meaning: "BTS(高架鉄道)" },
      { thai: "แท็กซี่", romanization: "thɛ́k-sîi", meaning: "タクシー" },
    ],
    correctIndex: 2,
  },
  {
    id: 19,
    topic: "ペット",
    dialogue: [
      {
        speaker: "woman",
        thai: "คุณเลี้ยงสัตว์อะไรไหมคะ",
        romanization: "khun líang sàt arai mǎi khá",
        meaning: "何かペットを飼っていますか?",
      },
      {
        speaker: "man",
        thai: "ผมเลี้ยงหมาครับ",
        romanization: "phǒm líang mǎa khráp",
        meaning: "私は犬を飼っています。",
      },
      {
        speaker: "woman",
        thai: "หมากี่ตัวคะ",
        romanization: "mǎa kìi tua khá",
        meaning: "犬は何匹ですか?",
      },
      {
        speaker: "man",
        thai: "สองตัวครับ",
        romanization: "sɔ̌ɔng tua khráp",
        meaning: "2匹です。",
      },
    ],
    question: {
      thai: "ผู้ชายเลี้ยงหมากี่ตัว",
      romanization: "phûu-chaai líang mǎa kìi tua",
      meaning: "男性は犬を何匹飼っていますか?",
    },
    options: [
      { thai: "หนึ่งตัว", romanization: "nùeng tua", meaning: "1匹" },
      { thai: "สองตัว", romanization: "sɔ̌ɔng tua", meaning: "2匹" },
      { thai: "สามตัว", romanization: "sǎam tua", meaning: "3匹" },
      { thai: "สี่ตัว", romanization: "sìi tua", meaning: "4匹" },
    ],
    correctIndex: 1,
  },
  {
    id: 20,
    topic: "退社時間",
    dialogue: [
      {
        speaker: "woman",
        thai: "เลิกงานกี่โมงคะ",
        romanization: "lə̂ək ngaan kìi moong khá",
        meaning: "何時に仕事が終わりますか?",
      },
      {
        speaker: "man",
        thai: "เลิกห้าโมงเย็นครับ",
        romanization: "lə̂ək hâa moong yen khráp",
        meaning: "夕方5時に終わります。",
      },
      {
        speaker: "woman",
        thai: "กลับบ้านยังไงคะ",
        romanization: "klàp bâan yang-ngai khá",
        meaning: "どうやって家に帰りますか?",
      },
      {
        speaker: "man",
        thai: "นั่งรถเมล์กลับครับ",
        romanization: "nâng rót-mee klàp khráp",
        meaning: "バスに乗って帰ります。",
      },
    ],
    question: {
      thai: "ผู้ชายเลิกงานกี่โมง",
      romanization: "phûu-chaai lə̂ək ngaan kìi moong",
      meaning: "男性は何時に仕事が終わりますか?",
    },
    options: [
      { thai: "สี่โมงเย็น", romanization: "sìi moong yen", meaning: "夕方4時" },
      { thai: "ห้าโมงเย็น", romanization: "hâa moong yen", meaning: "夕方5時" },
      { thai: "หกโมงเย็น", romanization: "hòk moong yen", meaning: "夕方6時" },
      { thai: "เจ็ดโมงเย็น", romanization: "jèt moong yen", meaning: "夕方7時" },
    ],
    correctIndex: 1,
  },
  {
    id: 21,
    topic: "国籍",
    dialogue: [
      {
        speaker: "woman",
        thai: "คุณเป็นคนชาติอะไรคะ",
        romanization: "khun pen khon châat arai khá",
        meaning: "あなたはどこの国の人ですか?",
      },
      {
        speaker: "man",
        thai: "ผมเป็นคนญี่ปุ่นครับ",
        romanization: "phǒm pen khon yîi-pùn khráp",
        meaning: "私は日本人です。",
      },
      {
        speaker: "woman",
        thai: "มาจากเมืองไหนคะ",
        romanization: "maa jàak muueang nǎi khá",
        meaning: "どの街から来ましたか?",
      },
      {
        speaker: "man",
        thai: "มาจากโตเกียวครับ",
        romanization: "maa jàak too-kiao khráp",
        meaning: "東京から来ました。",
      },
    ],
    question: {
      thai: "ผู้ชายมาจากเมืองอะไร",
      romanization: "phûu-chaai maa jàak muueang arai",
      meaning: "男性はどの街から来ましたか?",
    },
    options: [
      { thai: "โอซาก้า", romanization: "oo-saa-kâa", meaning: "大阪" },
      { thai: "โตเกียว", romanization: "too-kiao", meaning: "東京" },
      { thai: "ฟุกุโอกะ", romanization: "fú-kú-oo-kà", meaning: "福岡" },
      { thai: "นาโกย่า", romanization: "naa-koo-yâa", meaning: "名古屋" },
    ],
    correctIndex: 1,
  },
  {
    id: 22,
    topic: "待ち合わせ",
    dialogue: [
      {
        speaker: "man",
        thai: "พรุ่งนี้เราเจอกันที่ไหนดีครับ",
        romanization: "phrûng-níi rao jəə kan thîi-nǎi dii khráp",
        meaning: "明日はどこで待ち合わせしましょうか?",
      },
      {
        speaker: "woman",
        thai: "เจอกันที่ร้านกาแฟดีไหมคะ",
        romanization: "jəə kan thîi ráan kaa-fɛɛ dii mǎi khá",
        meaning: "カフェで会うのはどうですか?",
      },
      {
        speaker: "man",
        thai: "ดีครับ กี่โมงครับ",
        romanization: "dii khráp, kìi moong khráp",
        meaning: "いいですね、何時にしますか?",
      },
      {
        speaker: "woman",
        thai: "บ่ายสองโมงค่ะ",
        romanization: "bàai sɔ̌ɔng moong khâ",
        meaning: "午後2時です。",
      },
    ],
    question: {
      thai: "พวกเขาจะเจอกันกี่โมง",
      romanization: "phûuak khǎo jà jəə kan kìi moong",
      meaning: "彼らは何時に会いますか?",
    },
    options: [
      { thai: "บ่ายโมง", romanization: "bàai moong", meaning: "午後1時" },
      { thai: "บ่ายสองโมง", romanization: "bàai sɔ̌ɔng moong", meaning: "午後2時" },
      { thai: "บ่ายสามโมง", romanization: "bàai sǎam moong", meaning: "午後3時" },
      { thai: "บ่ายสี่โมง", romanization: "bàai sìi moong", meaning: "午後4時" },
    ],
    correctIndex: 1,
  },
  {
    id: 23,
    topic: "誕生日プレゼント",
    dialogue: [
      {
        speaker: "woman",
        thai: "วันเกิดของคุณ คุณอยากได้อะไรคะ",
        romanization: "wan-kə̀ət khɔ̌ɔng khun, khun yàak dâai arai khá",
        meaning: "お誕生日に何が欲しいですか?",
      },
      {
        speaker: "man",
        thai: "ผมอยากได้นาฬิกาใหม่ครับ",
        romanization: "phǒm yàak dâai naa-lí-kaa mài khráp",
        meaning: "新しい時計が欲しいです。",
      },
      {
        speaker: "woman",
        thai: "นาฬิกาแบบไหนคะ",
        romanization: "naa-lí-kaa bɛ̀ɛp nǎi khá",
        meaning: "どんな時計ですか?",
      },
      {
        speaker: "man",
        thai: "นาฬิกาข้อมือครับ",
        romanization: "naa-lí-kaa khɔ̂ɔ-muue khráp",
        meaning: "腕時計です。",
      },
    ],
    question: {
      thai: "ผู้ชายอยากได้อะไรเป็นของขวัญ",
      romanization: "phûu-chaai yàak dâai arai pen khɔ̌ɔng-khwǎn",
      meaning: "男性は何を誕生日プレゼントに欲しいですか?",
    },
    options: [
      { thai: "โทรศัพท์", romanization: "thoo-rá-sàp", meaning: "電話" },
      { thai: "นาฬิกา", romanization: "naa-lí-kaa", meaning: "時計" },
      { thai: "กระเป๋า", romanization: "kra-pǎo", meaning: "カバン" },
      { thai: "หนังสือ", romanization: "nǎng-sǔue", meaning: "本" },
    ],
    correctIndex: 1,
  },
  {
    id: 24,
    topic: "休暇旅行",
    dialogue: [
      {
        speaker: "man",
        thai: "ปีใหม่นี้คุณจะไปไหนครับ",
        romanization: "pii-mài níi khun jà pai nǎi khráp",
        meaning: "今年の正月はどこへ行きますか?",
      },
      {
        speaker: "woman",
        thai: "ฉันจะไปเที่ยวภูเก็ตค่ะ",
        romanization: "chǎn jà pai thîao phuu-kèt khâ",
        meaning: "プーケットへ旅行に行きます。",
      },
      {
        speaker: "man",
        thai: "ไปกี่วันครับ",
        romanization: "pai kìi wan khráp",
        meaning: "何日間行きますか?",
      },
      {
        speaker: "woman",
        thai: "ไปห้าวันค่ะ",
        romanization: "pai hâa wan khâ",
        meaning: "5日間行きます。",
      },
    ],
    question: {
      thai: "ผู้หญิงจะไปเที่ยวที่ไหน",
      romanization: "phûu-yǐng jà pai thîao thîi-nǎi",
      meaning: "女性はどこへ旅行に行きますか?",
    },
    options: [
      { thai: "เชียงใหม่", romanization: "chiang-mài", meaning: "チェンマイ" },
      { thai: "ภูเก็ต", romanization: "phuu-kèt", meaning: "プーケット" },
      { thai: "หัวหิน", romanization: "hǔa-hǐn", meaning: "ホアヒン" },
      { thai: "พัทยา", romanization: "phát-tha-yaa", meaning: "パタヤ" },
    ],
    correctIndex: 1,
  },
  {
    id: 25,
    topic: "言語",
    dialogue: [
      {
        speaker: "woman",
        thai: "คุณพูดภาษาอะไรได้บ้างคะ",
        romanization: "khun phûut phaa-sǎa arai dâai bâang khá",
        meaning: "どんな言語が話せますか?",
      },
      {
        speaker: "man",
        thai: "ผมพูดภาษาอังกฤษกับภาษาไทยได้ครับ",
        romanization: "phǒm phûut phaa-sǎa ang-krìt kàp phaa-sǎa thai dâai khráp",
        meaning: "英語とタイ語が話せます。",
      },
      {
        speaker: "woman",
        thai: "ภาษาอะไรเก่งกว่ากันคะ",
        romanization: "phaa-sǎa arai kèng kwàa kan khá",
        meaning: "どちらの言語が得意ですか?",
      },
      {
        speaker: "man",
        thai: "ภาษาอังกฤษเก่งกว่าครับ",
        romanization: "phaa-sǎa ang-krìt kèng kwàa khráp",
        meaning: "英語のほうが得意です。",
      },
    ],
    question: {
      thai: "ผู้ชายพูดภาษาอะไรเก่งที่สุด",
      romanization: "phûu-chaai phûut phaa-sǎa arai kèng thîi-sùt",
      meaning: "男性が一番得意な言語は何ですか?",
    },
    options: [
      { thai: "ภาษาไทย", romanization: "phaa-sǎa thai", meaning: "タイ語" },
      { thai: "ภาษาญี่ปุ่น", romanization: "phaa-sǎa yîi-pùn", meaning: "日本語" },
      { thai: "ภาษาอังกฤษ", romanization: "phaa-sǎa ang-krìt", meaning: "英語" },
      { thai: "ภาษาจีน", romanization: "phaa-sǎa jiin", meaning: "中国語" },
    ],
    correctIndex: 2,
  },
  {
    id: 26,
    topic: "タイ語学習",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณเรียนภาษาไทยมานานเท่าไรครับ",
        romanization: "khun rian phaa-sǎa thai maa naan thâo-rài khráp",
        meaning: "タイ語をどのくらい勉強していますか?",
      },
      {
        speaker: "woman",
        thai: "เรียนมาประมาณหนึ่งปีค่ะ",
        romanization: "rian maa pra-maan nùeng pii khâ",
        meaning: "だいたい1年勉強しています。",
      },
      {
        speaker: "man",
        thai: "เรียนที่ไหนครับ",
        romanization: "rian thîi-nǎi khráp",
        meaning: "どこで勉強していますか?",
      },
      {
        speaker: "woman",
        thai: "เรียนที่โรงเรียนภาษาในกรุงเทพค่ะ",
        romanization: "rian thîi roong-rian phaa-sǎa nai krung-thêep khâ",
        meaning: "バンコクの語学学校で勉強しています。",
      },
    ],
    question: {
      thai: "ผู้หญิงเรียนภาษาไทยมานานเท่าไร",
      romanization: "phûu-yǐng rian phaa-sǎa thai maa naan thâo-rài",
      meaning: "女性はタイ語をどのくらい勉強していますか?",
    },
    options: [
      { thai: "หกเดือน", romanization: "hòk duuean", meaning: "6か月" },
      { thai: "หนึ่งปี", romanization: "nùeng pii", meaning: "1年" },
      { thai: "สองปี", romanization: "sɔ̌ɔng pii", meaning: "2年" },
      { thai: "สามปี", romanization: "sǎam pii", meaning: "3年" },
    ],
    correctIndex: 1,
  },
  {
    id: 27,
    topic: "スポーツ",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณชอบกีฬาอะไรครับ",
        romanization: "khun chɔ̂ɔp kii-laa arai khráp",
        meaning: "どんなスポーツが好きですか?",
      },
      {
        speaker: "woman",
        thai: "ฉันชอบเล่นแบดมินตันค่ะ",
        romanization: "chǎn chɔ̂ɔp lên bɛ̀ɛt-min-tân khâ",
        meaning: "バドミントンが好きです。",
      },
      {
        speaker: "man",
        thai: "เล่นกับใครครับ",
        romanization: "lên kàp khrai khráp",
        meaning: "誰とプレーしますか?",
      },
      {
        speaker: "woman",
        thai: "เล่นกับเพื่อนค่ะ",
        romanization: "lên kàp phûuean khâ",
        meaning: "友達とプレーします。",
      },
    ],
    question: {
      thai: "ผู้หญิงชอบเล่นกีฬาอะไร",
      romanization: "phûu-yǐng chɔ̂ɔp lên kii-laa arai",
      meaning: "女性はどんなスポーツが好きですか?",
    },
    options: [
      { thai: "ฟุตบอล", romanization: "fút-bɔɔn", meaning: "サッカー" },
      { thai: "แบดมินตัน", romanization: "bɛ̀ɛt-min-tân", meaning: "バドミントン" },
      { thai: "เทนนิส", romanization: "then-nít", meaning: "テニス" },
      { thai: "ว่ายน้ำ", romanization: "wâai-náam", meaning: "水泳" },
    ],
    correctIndex: 1,
  },
  {
    id: 28,
    topic: "映画",
    dialogue: [
      {
        speaker: "woman",
        thai: "เมื่อคืนคุณดูหนังอะไรคะ",
        romanization: "mûuea-khuuen khun duu nǎng arai khá",
        meaning: "昨夜はどんな映画を観ましたか?",
      },
      {
        speaker: "man",
        thai: "ผมดูหนังการ์ตูนครับ",
        romanization: "phǒm duu nǎng kaa-tuun khráp",
        meaning: "アニメ映画を観ました。",
      },
      {
        speaker: "woman",
        thai: "สนุกไหมคะ",
        romanization: "sa-nùk mǎi khá",
        meaning: "楽しかったですか?",
      },
      {
        speaker: "man",
        thai: "สนุกมากครับ",
        romanization: "sa-nùk mâak khráp",
        meaning: "とても楽しかったです。",
      },
    ],
    question: {
      thai: "เมื่อคืนผู้ชายดูหนังประเภทอะไร",
      romanization: "mûuea-khuuen phûu-chaai duu nǎng pra-phêet arai",
      meaning: "昨夜、男性はどんなジャンルの映画を観ましたか?",
    },
    options: [
      { thai: "หนังรัก", romanization: "nǎng rák", meaning: "恋愛映画" },
      { thai: "หนังสยองขวัญ", romanization: "nǎng sa-yɔ̌ɔng-khwǎn", meaning: "ホラー映画" },
      { thai: "หนังการ์ตูน", romanization: "nǎng kaa-tuun", meaning: "アニメ映画" },
      { thai: "หนังแอ็คชั่น", romanization: "nǎng ɛ́k-chân", meaning: "アクション映画" },
    ],
    correctIndex: 2,
  },
  {
    id: 29,
    topic: "読書",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณอ่านหนังสืออะไรอยู่ครับ",
        romanization: "khun àan nǎng-sǔue arai yùu khráp",
        meaning: "今何の本を読んでいますか?",
      },
      {
        speaker: "woman",
        thai: "ฉันอ่านนิยายค่ะ",
        romanization: "chǎn àan ní-yaai khâ",
        meaning: "私は小説を読んでいます。",
      },
      {
        speaker: "man",
        thai: "เป็นภาษาอะไรครับ",
        romanization: "pen phaa-sǎa arai khráp",
        meaning: "何語ですか?",
      },
      {
        speaker: "woman",
        thai: "ภาษาญี่ปุ่นค่ะ",
        romanization: "phaa-sǎa yîi-pùn khâ",
        meaning: "日本語です。",
      },
    ],
    question: {
      thai: "ผู้หญิงอ่านนิยายภาษาอะไร",
      romanization: "phûu-yǐng àan ní-yaai phaa-sǎa arai",
      meaning: "女性は何語の小説を読んでいますか?",
    },
    options: [
      { thai: "ภาษาไทย", romanization: "phaa-sǎa thai", meaning: "タイ語" },
      { thai: "ภาษาอังกฤษ", romanization: "phaa-sǎa ang-krìt", meaning: "英語" },
      { thai: "ภาษาญี่ปุ่น", romanization: "phaa-sǎa yîi-pùn", meaning: "日本語" },
      { thai: "ภาษาจีน", romanization: "phaa-sǎa jiin", meaning: "中国語" },
    ],
    correctIndex: 2,
  },
  {
    id: 30,
    topic: "好きな色",
    dialogue: [
      {
        speaker: "woman",
        thai: "คุณชอบสีอะไรคะ",
        romanization: "khun chɔ̂ɔp sǐi arai khá",
        meaning: "何色が好きですか?",
      },
      {
        speaker: "man",
        thai: "ผมชอบสีฟ้าครับ",
        romanization: "phǒm chɔ̂ɔp sǐi-fáa khráp",
        meaning: "私は水色が好きです。",
      },
      {
        speaker: "woman",
        thai: "ทำไมถึงชอบคะ",
        romanization: "tham-mai thǔeng chɔ̂ɔp khá",
        meaning: "どうして好きなのですか?",
      },
      {
        speaker: "man",
        thai: "เพราะดูสบายตาครับ",
        romanization: "phrɔ́ duu sa-baai taa khráp",
        meaning: "目に優しいからです。",
      },
    ],
    question: {
      thai: "ผู้ชายชอบสีอะไร",
      romanization: "phûu-chaai chɔ̂ɔp sǐi arai",
      meaning: "男性は何色が好きですか?",
    },
    options: [
      { thai: "สีแดง", romanization: "sǐi-dɛɛng", meaning: "赤" },
      { thai: "สีฟ้า", romanization: "sǐi-fáa", meaning: "水色" },
      { thai: "สีเขียว", romanization: "sǐi-khǐao", meaning: "緑" },
      { thai: "สีเหลือง", romanization: "sǐi-lǔueang", meaning: "黄色" },
    ],
    correctIndex: 1,
  },
  {
    id: 31,
    topic: "体調",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณรู้สึกยังไงบ้างครับ",
        romanization: "khun rúu-sùek yang-ngai bâang khráp",
        meaning: "気分はいかがですか?",
      },
      {
        speaker: "woman",
        thai: "ไม่ค่อยสบายค่ะ",
        romanization: "mâi khɔ̂i sa-baai khâ",
        meaning: "あまり調子がよくないです。",
      },
      {
        speaker: "man",
        thai: "เป็นไข้ไหมครับ",
        romanization: "pen khâi mǎi khráp",
        meaning: "熱はありますか?",
      },
      {
        speaker: "woman",
        thai: "ไม่เป็นไข้ค่ะ แต่ปวดท้อง",
        romanization: "mâi pen khâi khâ, tɛ̀ɛ pùuat thɔ́ɔng",
        meaning: "熱はありませんが、お腹が痛いです。",
      },
    ],
    question: {
      thai: "ผู้หญิงเป็นอะไร",
      romanization: "phûu-yǐng pen arai",
      meaning: "女性はどこが悪いですか?",
    },
    options: [
      { thai: "ปวดหัว", romanization: "pùuat hǔa", meaning: "頭痛" },
      { thai: "ปวดท้อง", romanization: "pùuat thɔ́ɔng", meaning: "腹痛" },
      { thai: "เป็นไข้", romanization: "pen khâi", meaning: "発熱" },
      { thai: "เป็นหวัด", romanization: "pen wàt", meaning: "風邪" },
    ],
    correctIndex: 1,
  },
  {
    id: 32,
    topic: "予約",
    dialogue: [
      {
        speaker: "woman",
        thai: "ขอจองโต๊ะวันเสาร์ค่ะ",
        romanization: "khɔ̌ɔ jɔɔng tó wan-sǎo khâ",
        meaning: "土曜日の席を予約したいです。",
      },
      {
        speaker: "man",
        thai: "กี่ท่านครับ",
        romanization: "kìi thâan khráp",
        meaning: "何名様ですか?",
      },
      {
        speaker: "woman",
        thai: "สี่คนค่ะ",
        romanization: "sìi khon khâ",
        meaning: "4人です。",
      },
      {
        speaker: "man",
        thai: "เวลาเท่าไรครับ",
        romanization: "wee-laa thâo-rài khráp",
        meaning: "何時にしますか?",
      },
    ],
    question: {
      thai: "ผู้หญิงจะมาทานข้าวกี่คน",
      romanization: "phûu-yǐng jà maa thaan khâao kìi khon",
      meaning: "女性は何人で食事に来ますか?",
    },
    options: [
      { thai: "สองคน", romanization: "sɔ̌ɔng khon", meaning: "2人" },
      { thai: "สามคน", romanization: "sǎam khon", meaning: "3人" },
      { thai: "สี่คน", romanization: "sìi khon", meaning: "4人" },
      { thai: "ห้าคน", romanization: "hâa khon", meaning: "5人" },
    ],
    correctIndex: 2,
  },
  {
    id: 33,
    topic: "勉強時間",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณเรียนวันละกี่ชั่วโมงครับ",
        romanization: "khun rian wan lá kìi chûua-moong khráp",
        meaning: "1日に何時間勉強しますか?",
      },
      {
        speaker: "woman",
        thai: "ประมาณสามชั่วโมงค่ะ",
        romanization: "pra-maan sǎam chûua-moong khâ",
        meaning: "だいたい3時間です。",
      },
      {
        speaker: "man",
        thai: "เรียนที่ไหนครับ",
        romanization: "rian thîi-nǎi khráp",
        meaning: "どこで勉強しますか?",
      },
      {
        speaker: "woman",
        thai: "เรียนที่บ้านค่ะ",
        romanization: "rian thîi bâan khâ",
        meaning: "家で勉強します。",
      },
    ],
    question: {
      thai: "ผู้หญิงเรียนวันละกี่ชั่วโมง",
      romanization: "phûu-yǐng rian wan lá kìi chûua-moong",
      meaning: "女性は1日に何時間勉強しますか?",
    },
    options: [
      { thai: "หนึ่งชั่วโมง", romanization: "nùeng chûua-moong", meaning: "1時間" },
      { thai: "สองชั่วโมง", romanization: "sɔ̌ɔng chûua-moong", meaning: "2時間" },
      { thai: "สามชั่วโมง", romanization: "sǎam chûua-moong", meaning: "3時間" },
      { thai: "สี่ชั่วโมง", romanization: "sìi chûua-moong", meaning: "4時間" },
    ],
    correctIndex: 2,
  },
  {
    id: 34,
    topic: "両替",
    dialogue: [
      {
        speaker: "man",
        thai: "ขอแลกเงินดอลลาร์เป็นเงินบาทครับ",
        romanization: "khɔ̌ɔ lɛ̂ɛk ngən dɔɔn-lâa pen ngən bàat khráp",
        meaning: "ドルをバーツに両替したいのですが。",
      },
      {
        speaker: "woman",
        thai: "เท่าไรคะ",
        romanization: "thâo-rài khá",
        meaning: "いくらですか?",
      },
      {
        speaker: "man",
        thai: "หนึ่งร้อยดอลลาร์ครับ",
        romanization: "nùeng-rɔ́ɔi dɔɔn-lâa khráp",
        meaning: "100ドルです。",
      },
      {
        speaker: "woman",
        thai: "ได้สามพันห้าร้อยบาทค่ะ",
        romanization: "dâai sǎam-phan-hâa-rɔ́ɔi bàat khâ",
        meaning: "3,500バーツになります。",
      },
    ],
    question: {
      thai: "ผู้ชายแลกเงินกี่ดอลลาร์",
      romanization: "phûu-chaai lɛ̂ɛk ngən kìi dɔɔn-lâa",
      meaning: "男性は何ドル両替しますか?",
    },
    options: [
      { thai: "ห้าสิบดอลลาร์", romanization: "hâa-sìp dɔɔn-lâa", meaning: "50ドル" },
      { thai: "หนึ่งร้อยดอลลาร์", romanization: "nùeng-rɔ́ɔi dɔɔn-lâa", meaning: "100ドル" },
      { thai: "สองร้อยดอลลาร์", romanization: "sɔ̌ɔng-rɔ́ɔi dɔɔn-lâa", meaning: "200ドル" },
      { thai: "ห้าร้อยดอลลาร์", romanization: "hâa-rɔ́ɔi dɔɔn-lâa", meaning: "500ドル" },
    ],
    correctIndex: 1,
  },
  {
    id: 35,
    topic: "電話番号",
    dialogue: [
      {
        speaker: "man",
        thai: "ขอเบอร์โทรศัพท์คุณหน่อยครับ",
        romanization: "khɔ̌ɔ bəə thoo-rá-sàp khun nɔ̀i khráp",
        meaning: "電話番号を教えてください。",
      },
      {
        speaker: "woman",
        thai: "ศูนย์แปดเก้าหนึ่งสองสามค่ะ",
        romanization: "sǔun pàet kâo nùeng sɔ̌ɔng sǎam khâ",
        meaning: "0-8-9-1-2-3 です。",
      },
      {
        speaker: "man",
        thai: "ขอย้ำอีกครั้งครับ",
        romanization: "khɔ̌ɔ yám ìik khráng khráp",
        meaning: "もう一度お願いします。",
      },
      {
        speaker: "woman",
        thai: "ศูนย์แปดเก้าหนึ่งสองสามค่ะ",
        romanization: "sǔun pàet kâo nùeng sɔ̌ɔng sǎam khâ",
        meaning: "0-8-9-1-2-3 です。",
      },
    ],
    question: {
      thai: "เบอร์โทรของผู้หญิงเริ่มต้นด้วยอะไร",
      romanization: "bəə thoo khɔ̌ɔng phûu-yǐng rə̂əm-tôn dûai arai",
      meaning: "女性の電話番号は何で始まりますか?",
    },
    options: [
      { thai: "ศูนย์เก้า", romanization: "sǔun kâo", meaning: "0-9" },
      { thai: "ศูนย์แปด", romanization: "sǔun pàet", meaning: "0-8" },
      { thai: "ศูนย์เจ็ด", romanization: "sǔun jèt", meaning: "0-7" },
      { thai: "ศูนย์หก", romanization: "sǔun hòk", meaning: "0-6" },
    ],
    correctIndex: 1,
  },
  {
    id: 36,
    topic: "朝食",
    dialogue: [
      {
        speaker: "woman",
        thai: "ตอนเช้าคุณกินอะไรคะ",
        romanization: "tɔɔn cháao khun kin arai khá",
        meaning: "朝は何を食べますか?",
      },
      {
        speaker: "man",
        thai: "ผมกินขนมปังกับไข่ครับ",
        romanization: "phǒm kin kha-nǒm-pang kàp khài khráp",
        meaning: "私はパンと卵を食べます。",
      },
      {
        speaker: "woman",
        thai: "ดื่มอะไรคะ",
        romanization: "dùuem arai khá",
        meaning: "何を飲みますか?",
      },
      {
        speaker: "man",
        thai: "ดื่มกาแฟครับ",
        romanization: "dùuem kaa-fɛɛ khráp",
        meaning: "コーヒーを飲みます。",
      },
    ],
    question: {
      thai: "ตอนเช้าผู้ชายดื่มอะไร",
      romanization: "tɔɔn cháao phûu-chaai dùuem arai",
      meaning: "男性は朝何を飲みますか?",
    },
    options: [
      { thai: "น้ำส้ม", romanization: "nám-sôm", meaning: "オレンジジュース" },
      { thai: "นม", romanization: "nom", meaning: "牛乳" },
      { thai: "กาแฟ", romanization: "kaa-fɛɛ", meaning: "コーヒー" },
      { thai: "ชา", romanization: "chaa", meaning: "お茶" },
    ],
    correctIndex: 2,
  },
  {
    id: 37,
    topic: "通学",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณไปโรงเรียนยังไงครับ",
        romanization: "khun pai roong-rian yang-ngai khráp",
        meaning: "学校までどうやって行きますか?",
      },
      {
        speaker: "woman",
        thai: "ฉันขี่จักรยานไปค่ะ",
        romanization: "chǎn khìi jàk-kra-yaan pai khâ",
        meaning: "自転車で行きます。",
      },
      {
        speaker: "man",
        thai: "ใช้เวลานานไหมครับ",
        romanization: "chái wee-laa naan mǎi khráp",
        meaning: "時間はかかりますか?",
      },
      {
        speaker: "woman",
        thai: "ประมาณสิบห้านาทีค่ะ",
        romanization: "pra-maan sìp-hâa naa-thii khâ",
        meaning: "だいたい15分です。",
      },
    ],
    question: {
      thai: "ผู้หญิงไปโรงเรียนด้วยอะไร",
      romanization: "phûu-yǐng pai roong-rian dûai arai",
      meaning: "女性は何で学校に行きますか?",
    },
    options: [
      { thai: "รถเมล์", romanization: "rót-mee", meaning: "バス" },
      { thai: "จักรยาน", romanization: "jàk-kra-yaan", meaning: "自転車" },
      { thai: "มอเตอร์ไซค์", romanization: "mɔɔ-tə̂ə-sai", meaning: "バイク" },
      { thai: "เดิน", romanization: "dəən", meaning: "徒歩" },
    ],
    correctIndex: 1,
  },
  {
    id: 38,
    topic: "季節",
    dialogue: [
      {
        speaker: "woman",
        thai: "คุณชอบฤดูอะไรคะ",
        romanization: "khun chɔ̂ɔp rúe-duu arai khá",
        meaning: "どの季節が好きですか?",
      },
      {
        speaker: "man",
        thai: "ผมชอบฤดูหนาวครับ",
        romanization: "phǒm chɔ̂ɔp rúe-duu nǎao khráp",
        meaning: "私は冬が好きです。",
      },
      {
        speaker: "woman",
        thai: "ทำไมคะ",
        romanization: "tham-mai khá",
        meaning: "どうしてですか?",
      },
      {
        speaker: "man",
        thai: "เพราะอากาศเย็นสบายครับ",
        romanization: "phrɔ́ aa-kàat yen sa-baai khráp",
        meaning: "涼しくて快適だからです。",
      },
    ],
    question: {
      thai: "ผู้ชายชอบฤดูอะไร",
      romanization: "phûu-chaai chɔ̂ɔp rúe-duu arai",
      meaning: "男性はどの季節が好きですか?",
    },
    options: [
      { thai: "ฤดูร้อน", romanization: "rúe-duu rɔ́ɔn", meaning: "夏" },
      { thai: "ฤดูฝน", romanization: "rúe-duu fǒn", meaning: "雨季" },
      { thai: "ฤดูหนาว", romanization: "rúe-duu nǎao", meaning: "冬" },
      { thai: "ฤดูใบไม้ผลิ", romanization: "rúe-duu bai-máai-phlì", meaning: "春" },
    ],
    correctIndex: 2,
  },
  {
    id: 39,
    topic: "週末の予定",
    dialogue: [
      {
        speaker: "man",
        thai: "เสาร์อาทิตย์นี้คุณจะทำอะไรครับ",
        romanization: "sǎo aa-thít níi khun jà tham arai khráp",
        meaning: "今週末は何をしますか?",
      },
      {
        speaker: "woman",
        thai: "ฉันจะไปทะเลกับครอบครัวค่ะ",
        romanization: "chǎn jà pai tha-lee kàp khrɔ̂ɔp-khrua khâ",
        meaning: "家族と海に行きます。",
      },
      {
        speaker: "man",
        thai: "ไปที่ไหนครับ",
        romanization: "pai thîi-nǎi khráp",
        meaning: "どこへ行きますか?",
      },
      {
        speaker: "woman",
        thai: "ไปพัทยาค่ะ",
        romanization: "pai phát-tha-yaa khâ",
        meaning: "パタヤへ行きます。",
      },
    ],
    question: {
      thai: "ผู้หญิงจะไปที่ไหนเสาร์อาทิตย์นี้",
      romanization: "phûu-yǐng jà pai thîi-nǎi sǎo aa-thít níi",
      meaning: "女性は今週末どこへ行きますか?",
    },
    options: [
      { thai: "ภูเก็ต", romanization: "phuu-kèt", meaning: "プーケット" },
      { thai: "หัวหิน", romanization: "hǔa-hǐn", meaning: "ホアヒン" },
      { thai: "พัทยา", romanization: "phát-tha-yaa", meaning: "パタヤ" },
      { thai: "เกาะสมุย", romanization: "kɔ̀ sa-mǔi", meaning: "サムイ島" },
    ],
    correctIndex: 2,
  },
  {
    id: 40,
    topic: "タクシー",
    dialogue: [
      {
        speaker: "man",
        thai: "ไปไหนครับ",
        romanization: "pai nǎi khráp",
        meaning: "どこへ行きますか?",
      },
      {
        speaker: "woman",
        thai: "ไปสนามบินค่ะ ใช้เวลานานไหมคะ",
        romanization: "pai sa-nǎam-bin khâ, chái wee-laa naan mǎi khá",
        meaning: "空港まで。時間はかかりますか?",
      },
      {
        speaker: "man",
        thai: "ประมาณสี่สิบห้านาทีครับ",
        romanization: "pra-maan sìi-sìp-hâa naa-thii khráp",
        meaning: "だいたい45分です。",
      },
      {
        speaker: "woman",
        thai: "ค่ารถเท่าไรคะ",
        romanization: "khâa rót thâo-rài khá",
        meaning: "料金はいくらですか?",
      },
    ],
    question: {
      thai: "ผู้หญิงจะไปไหน",
      romanization: "phûu-yǐng jà pai nǎi",
      meaning: "女性はどこへ行きますか?",
    },
    options: [
      { thai: "สถานีรถไฟ", romanization: "sa-thǎa-nii rót-fai", meaning: "鉄道駅" },
      { thai: "ห้างสรรพสินค้า", romanization: "hâang sàp-pha-sǐn-kháa", meaning: "デパート" },
      { thai: "โรงพยาบาล", romanization: "roong-pha-yaa-baan", meaning: "病院" },
      { thai: "สนามบิน", romanization: "sa-nǎam-bin", meaning: "空港" },
    ],
    correctIndex: 3,
  },
  {
    id: 41,
    topic: "病院・風邪",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณเป็นอะไรครับ",
        romanization: "khun pen arai khráp",
        meaning: "どうしましたか?",
      },
      {
        speaker: "woman",
        thai: "ฉันเป็นหวัดค่ะ",
        romanization: "chǎn pen wàt khâ",
        meaning: "風邪をひきました。",
      },
      {
        speaker: "man",
        thai: "เป็นมาแล้วกี่วันครับ",
        romanization: "pen maa lɛ́ɛo kìi wan khráp",
        meaning: "何日前からですか?",
      },
      {
        speaker: "woman",
        thai: "เป็นมาแล้วสามวันค่ะ",
        romanization: "pen maa lɛ́ɛo sǎam wan khâ",
        meaning: "3日前からです。",
      },
    ],
    question: {
      thai: "ผู้หญิงเป็นหวัดมาแล้วกี่วัน",
      romanization: "phûu-yǐng pen wàt maa lɛ́ɛo kìi wan",
      meaning: "女性は何日前から風邪をひいていますか?",
    },
    options: [
      { thai: "หนึ่งวัน", romanization: "nùeng wan", meaning: "1日" },
      { thai: "สองวัน", romanization: "sɔ̌ɔng wan", meaning: "2日" },
      { thai: "สามวัน", romanization: "sǎam wan", meaning: "3日" },
      { thai: "ห้าวัน", romanization: "hâa wan", meaning: "5日" },
    ],
    correctIndex: 2,
  },
  {
    id: 42,
    topic: "職場",
    dialogue: [
      {
        speaker: "woman",
        thai: "คุณทำงานที่ไหนคะ",
        romanization: "khun tham-ngaan thîi-nǎi khá",
        meaning: "どこで働いていますか?",
      },
      {
        speaker: "man",
        thai: "ผมทำงานที่ธนาคารครับ",
        romanization: "phǒm tham-ngaan thîi tha-naa-khaan khráp",
        meaning: "私は銀行で働いています。",
      },
      {
        speaker: "woman",
        thai: "ธนาคารอยู่ที่ไหนคะ",
        romanization: "tha-naa-khaan yùu thîi-nǎi khá",
        meaning: "銀行はどこにありますか?",
      },
      {
        speaker: "man",
        thai: "อยู่ใจกลางเมืองครับ",
        romanization: "yùu jai-klaang muueang khráp",
        meaning: "街の中心にあります。",
      },
    ],
    question: {
      thai: "ผู้ชายทำงานที่ไหน",
      romanization: "phûu-chaai tham-ngaan thîi-nǎi",
      meaning: "男性はどこで働いていますか?",
    },
    options: [
      { thai: "โรงแรม", romanization: "roong-rɛɛm", meaning: "ホテル" },
      { thai: "ธนาคาร", romanization: "tha-naa-khaan", meaning: "銀行" },
      { thai: "โรงเรียน", romanization: "roong-rian", meaning: "学校" },
      { thai: "ร้านอาหาร", romanization: "ráan aa-hǎan", meaning: "レストラン" },
    ],
    correctIndex: 1,
  },
  {
    id: 43,
    topic: "出身地",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณเป็นคนที่ไหนครับ",
        romanization: "khun pen khon thîi-nǎi khráp",
        meaning: "どこの出身ですか?",
      },
      {
        speaker: "woman",
        thai: "ฉันเป็นคนเชียงรายค่ะ",
        romanization: "chǎn pen khon chiang-raai khâ",
        meaning: "私はチェンライの出身です。",
      },
      {
        speaker: "man",
        thai: "มาอยู่กรุงเทพนานหรือยังครับ",
        romanization: "maa yùu krung-thêep naan rǔue yang khráp",
        meaning: "バンコクに来てもう長いですか?",
      },
      {
        speaker: "woman",
        thai: "มาอยู่ห้าปีแล้วค่ะ",
        romanization: "maa yùu hâa pii lɛ́ɛo khâ",
        meaning: "もう5年住んでいます。",
      },
    ],
    question: {
      thai: "ผู้หญิงเป็นคนที่ไหน",
      romanization: "phûu-yǐng pen khon thîi-nǎi",
      meaning: "女性はどこの出身ですか?",
    },
    options: [
      { thai: "เชียงใหม่", romanization: "chiang-mài", meaning: "チェンマイ" },
      { thai: "เชียงราย", romanization: "chiang-raai", meaning: "チェンライ" },
      { thai: "ขอนแก่น", romanization: "khɔ̌ɔn-kɛ̀ɛn", meaning: "コンケン" },
      { thai: "นครราชสีมา", romanization: "ná-khɔɔn-râat-cha-sǐi-maa", meaning: "ナコーンラーチャシーマー" },
    ],
    correctIndex: 1,
  },
  {
    id: 44,
    topic: "写真",
    dialogue: [
      {
        speaker: "woman",
        thai: "ขอถ่ายรูปด้วยได้ไหมคะ",
        romanization: "khɔ̌ɔ thàai rûup dûai dâai mǎi khá",
        meaning: "一緒に写真を撮ってもいいですか?",
      },
      {
        speaker: "man",
        thai: "ได้ครับ ที่ไหนดีครับ",
        romanization: "dâai khráp, thîi-nǎi dii khráp",
        meaning: "いいですよ、どこがいいですか?",
      },
      {
        speaker: "woman",
        thai: "ที่หน้าวัดค่ะ",
        romanization: "thîi nâa wát khâ",
        meaning: "お寺の前で。",
      },
      {
        speaker: "man",
        thai: "ตกลงครับ",
        romanization: "tòk-long khráp",
        meaning: "わかりました。",
      },
    ],
    question: {
      thai: "ผู้หญิงอยากถ่ายรูปที่ไหน",
      romanization: "phûu-yǐng yàak thàai rûup thîi-nǎi",
      meaning: "女性はどこで写真を撮りたいですか?",
    },
    options: [
      { thai: "หน้าโรงแรม", romanization: "nâa roong-rɛɛm", meaning: "ホテルの前" },
      { thai: "หน้าวัด", romanization: "nâa wát", meaning: "お寺の前" },
      { thai: "หน้าตลาด", romanization: "nâa ta-làat", meaning: "市場の前" },
      { thai: "หน้าสวนสาธารณะ", romanization: "nâa sǔuan sǎa-thaa-rá-ná", meaning: "公園の前" },
    ],
    correctIndex: 1,
  },
  {
    id: 45,
    topic: "ショッピング",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณซื้ออะไรที่ห้างครับ",
        romanization: "khun súue arai thîi hâang khráp",
        meaning: "デパートで何を買いましたか?",
      },
      {
        speaker: "woman",
        thai: "ฉันซื้อรองเท้าใหม่ค่ะ",
        romanization: "chǎn súue rɔɔng-tháao mài khâ",
        meaning: "新しい靴を買いました。",
      },
      {
        speaker: "man",
        thai: "ราคาเท่าไรครับ",
        romanization: "raa-khaa thâo-rài khráp",
        meaning: "値段はいくらですか?",
      },
      {
        speaker: "woman",
        thai: "หนึ่งพันห้าร้อยบาทค่ะ",
        romanization: "nùeng-phan-hâa-rɔ́ɔi bàat khâ",
        meaning: "1,500バーツです。",
      },
    ],
    question: {
      thai: "ผู้หญิงซื้ออะไร",
      romanization: "phûu-yǐng súue arai",
      meaning: "女性は何を買いましたか?",
    },
    options: [
      { thai: "กระเป๋า", romanization: "kra-pǎo", meaning: "カバン" },
      { thai: "เสื้อ", romanization: "sûuea", meaning: "シャツ" },
      { thai: "รองเท้า", romanization: "rɔɔng-tháao", meaning: "靴" },
      { thai: "หมวก", romanization: "mùuak", meaning: "帽子" },
    ],
    correctIndex: 2,
  },
  {
    id: 46,
    topic: "カフェ注文",
    dialogue: [
      {
        speaker: "woman",
        thai: "รับเครื่องดื่มอะไรดีคะ",
        romanization: "ráp khrûueang-dùuem arai dii khá",
        meaning: "お飲み物は何になさいますか?",
      },
      {
        speaker: "man",
        thai: "ขอกาแฟเย็นแก้วใหญ่ครับ",
        romanization: "khɔ̌ɔ kaa-fɛɛ yen kɛ̂ɛo yài khráp",
        meaning: "アイスコーヒーのLサイズをください。",
      },
      {
        speaker: "woman",
        thai: "หวานปกติไหมคะ",
        romanization: "wǎan pà-kà-tì mǎi khá",
        meaning: "甘さは普通でいいですか?",
      },
      {
        speaker: "man",
        thai: "ขอหวานน้อยครับ",
        romanization: "khɔ̌ɔ wǎan nɔ́ɔi khráp",
        meaning: "甘さ控えめでお願いします。",
      },
    ],
    question: {
      thai: "ผู้ชายสั่งกาแฟแบบไหน",
      romanization: "phûu-chaai sàng kaa-fɛɛ bɛ̀ɛp nǎi",
      meaning: "男性はどんなコーヒーを注文しましたか?",
    },
    options: [
      { thai: "กาแฟร้อน", romanization: "kaa-fɛɛ rɔ́ɔn", meaning: "ホットコーヒー" },
      { thai: "กาแฟเย็น", romanization: "kaa-fɛɛ yen", meaning: "アイスコーヒー" },
      { thai: "กาแฟปั่น", romanization: "kaa-fɛɛ pàn", meaning: "フローズンコーヒー" },
      { thai: "กาแฟนม", romanization: "kaa-fɛɛ nom", meaning: "ミルクコーヒー" },
    ],
    correctIndex: 1,
  },
  {
    id: 47,
    topic: "歌",
    dialogue: [
      {
        speaker: "man",
        thai: "คุณร้องเพลงเก่งไหมครับ",
        romanization: "khun rɔ́ɔng phleeng kèng mǎi khráp",
        meaning: "歌は得意ですか?",
      },
      {
        speaker: "woman",
        thai: "เก่งนิดหน่อยค่ะ",
        romanization: "kèng nít-nɔ̀i khâ",
        meaning: "少しだけ得意です。",
      },
      {
        speaker: "man",
        thai: "ชอบเพลงของใครครับ",
        romanization: "chɔ̂ɔp phleeng khɔ̌ɔng khrai khráp",
        meaning: "誰の歌が好きですか?",
      },
      {
        speaker: "woman",
        thai: "ชอบเพลงของบอย พีซเมเกอร์ค่ะ",
        romanization: "chɔ̂ɔp phleeng khɔ̌ɔng bɔɔi phíis-mee-kə̂ə khâ",
        meaning: "Boy Peacemakerの歌が好きです。",
      },
    ],
    question: {
      thai: "ผู้หญิงชอบเพลงของใคร",
      romanization: "phûu-yǐng chɔ̂ɔp phleeng khɔ̌ɔng khrai",
      meaning: "女性は誰の歌が好きですか?",
    },
    options: [
      { thai: "บอย พีซเมเกอร์", romanization: "bɔɔi phíis-mee-kə̂ə", meaning: "Boy Peacemaker" },
      { thai: "ปาล์มมี่", romanization: "paam-mîi", meaning: "Palmy" },
      { thai: "ดา เอ็นโดรฟิน", romanization: "daa en-doo-fin", meaning: "Da Endorphine" },
      { thai: "แสตมป์", romanization: "sa-tɛ́m", meaning: "Stamp" },
    ],
    correctIndex: 0,
  },
  {
    id: 48,
    topic: "起床時間",
    dialogue: [
      {
        speaker: "woman",
        thai: "ปกติคุณตื่นกี่โมงคะ",
        romanization: "pà-kà-tì khun tùuen kìi moong khá",
        meaning: "普段は何時に起きますか?",
      },
      {
        speaker: "man",
        thai: "ผมตื่นหกโมงเช้าครับ",
        romanization: "phǒm tùuen hòk moong cháao khráp",
        meaning: "朝6時に起きます。",
      },
      {
        speaker: "woman",
        thai: "ตื่นเร็วจังเลยนะคะ",
        romanization: "tùuen reo jang ləəi ná khá",
        meaning: "ずいぶん早く起きるんですね。",
      },
      {
        speaker: "man",
        thai: "ผมต้องไปทำงานครับ",
        romanization: "phǒm tɔ̂ng pai tham-ngaan khráp",
        meaning: "仕事に行かなければならないので。",
      },
    ],
    question: {
      thai: "ปกติผู้ชายตื่นกี่โมง",
      romanization: "pà-kà-tì phûu-chaai tùuen kìi moong",
      meaning: "男性は普段何時に起きますか?",
    },
    options: [
      { thai: "ห้าโมงเช้า", romanization: "hâa moong cháao", meaning: "朝5時" },
      { thai: "หกโมงเช้า", romanization: "hòk moong cháao", meaning: "朝6時" },
      { thai: "เจ็ดโมงเช้า", romanization: "jèt moong cháao", meaning: "朝7時" },
      { thai: "แปดโมงเช้า", romanization: "pàet moong cháao", meaning: "朝8時" },
    ],
    correctIndex: 1,
  },
  {
    id: 49,
    topic: "パーティー",
    dialogue: [
      {
        speaker: "man",
        thai: "เสาร์นี้มาปาร์ตี้ที่บ้านผมไหมครับ",
        romanization: "sǎo níi maa paa-tîi thîi bâan phǒm mǎi khráp",
        meaning: "今週土曜日に私の家でパーティーをしますが、来ますか?",
      },
      {
        speaker: "woman",
        thai: "ดีค่ะ จะมีใครมาบ้างคะ",
        romanization: "dii khâ, jà mii khrai maa bâang khá",
        meaning: "いいですね。誰が来ますか?",
      },
      {
        speaker: "man",
        thai: "เพื่อน ๆ ประมาณสิบคนครับ",
        romanization: "phûuean phûuean pra-maan sìp khon khráp",
        meaning: "友達がだいたい10人くらい来ます。",
      },
      {
        speaker: "woman",
        thai: "สนุกแน่ ๆ ค่ะ",
        romanization: "sa-nùk nɛ̂ɛ nɛ̂ɛ khâ",
        meaning: "きっと楽しいですね。",
      },
    ],
    question: {
      thai: "ปาร์ตี้นี้จะมีคนมากี่คน",
      romanization: "paa-tîi níi jà mii khon maa kìi khon",
      meaning: "このパーティーには何人来ますか?",
    },
    options: [
      { thai: "ห้าคน", romanization: "hâa khon", meaning: "5人" },
      { thai: "แปดคน", romanization: "pàet khon", meaning: "8人" },
      { thai: "สิบคน", romanization: "sìp khon", meaning: "10人" },
      { thai: "สิบห้าคน", romanization: "sìp-hâa khon", meaning: "15人" },
    ],
    correctIndex: 2,
  },
  {
    id: 50,
    topic: "デザート",
    dialogue: [
      {
        speaker: "woman",
        thai: "คุณชอบกินขนมหวานอะไรคะ",
        romanization: "khun chɔ̂ɔp kin kha-nǒm-wǎan arai khá",
        meaning: "どんなデザートが好きですか?",
      },
      {
        speaker: "man",
        thai: "ผมชอบกินไอศกรีมครับ",
        romanization: "phǒm chɔ̂ɔp kin ai-sa-kriim khráp",
        meaning: "私はアイスクリームが好きです。",
      },
      {
        speaker: "woman",
        thai: "รสอะไรคะ",
        romanization: "rót arai khá",
        meaning: "どの味ですか?",
      },
      {
        speaker: "man",
        thai: "รสช็อกโกแลตครับ",
        romanization: "rót chɔ́k-koo-lɛ̀ɛt khráp",
        meaning: "チョコレート味です。",
      },
    ],
    question: {
      thai: "ผู้ชายชอบไอศกรีมรสอะไร",
      romanization: "phûu-chaai chɔ̂ɔp ai-sa-kriim rót arai",
      meaning: "男性はどの味のアイスクリームが好きですか?",
    },
    options: [
      { thai: "วานิลลา", romanization: "waa-ní-laa", meaning: "バニラ" },
      { thai: "สตรอว์เบอร์รี่", romanization: "sa-trɔɔ-bəə-rîi", meaning: "ストロベリー" },
      { thai: "ช็อกโกแลต", romanization: "chɔ́k-koo-lɛ̀ɛt", meaning: "チョコレート" },
      { thai: "ชาเขียว", romanization: "chaa-khǐao", meaning: "抹茶" },
    ],
    correctIndex: 2,
  },
];
