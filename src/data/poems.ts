export interface Poem {
  id: number;
  title: string;
  titleHindi?: string;
  poet: string;
  poetHindi?: string;
  excerpt: string;
  category: string;
  likes: number;
  views?: number;
  isFeatured?: boolean;
}

export const poemOfTheDay: Poem = {
  id: 18,
  title: "सपनों की उड़ान",
  poet: "Sumitranandan Pant",
  poetHindi: "सुमित्रानंदन पंत",
  excerpt: `सपनों की उड़ान भरूँ मैं,
आसमान को छू लूँ मैं।
कोई रोके न मुझे राहों में,
मंजिल को पा लूँ मैं।

जीवन है एक संघर्ष यारो,
हर पल नया सवेरा है।
जो हार नहीं मानते कभी,
उन्हीं का जहाँ है यह मेरा।`,
  category: "Life",
  likes: 2400,
};

export const featuredPoem: Poem = {
  id: 1,
  title: "अग्निपथ",
  poet: "Harivansh Rai Bachchan",
  poetHindi: "हरिवंश राय बच्चन",
  excerpt: "वृक्ष हों भले खड़े, हों घने, हों बड़े, एक पत्र छाँह भी माँग मत, माँग मत, माँग मत! अग्निपथ! अग्निपथ! अग्निपथ!",
  category: "Life",
  likes: 2100,
};

export const trendingPoems: Poem[] = [
  {
    id: 2,
    title: "कोशिश करने वालों की",
    poet: "Harivansh Rai Bachchan",
    excerpt: "लहरों से डर कर नौका पार नहीं होती, कोशिश करने वालों की कभी हार नहीं होती...",
    category: "Life",
    likes: 4200,
  },
  {
    id: 3,
    title: "Still I Rise",
    poet: "Maya Angelou",
    excerpt: "You may write me down in history with your bitter, twisted lies...",
    category: "Inspiration",
    likes: 3450,
  },
  {
    id: 1,
    title: "अग्निपथ",
    poet: "Harivansh Rai Bachchan",
    excerpt: "वृक्ष हों भले खड़े, हों घने, हों बड़े, एक पत्र छाँह भी माँग मत...",
    category: "Life",
    likes: 2100,
  },
  {
    id: 5,
    title: "माँ",
    poet: "Mahadevi Verma",
    excerpt: "माँ की ममता अनमोल है, उसका प्यार अटूट है...",
    category: "Love",
    likes: 3890,
  },
];

export const collectionPoem = {
  title: "मधुशाला",
  titleHindi: "मधुशाला",
  poet: "हरिवंश राय बच्चन",
  excerpt: `मदिरालय जाने को घर से चलता है पीनेवाला,
किस पथ से जाऊँ असमंजस में है वह भोलाभाला,
अलग-अलग पथ बतलाते सब पर मैं यह बतलाता हूँ,
राह पकड़ तू एक चला चल, पा जाएगा मधुशाला।`,
  id: 4,
};

export const recentPoems: Poem[] = [
  {
    id: 6,
    title: "सूर्योदय",
    poet: "Ramdhari Singh Dinkar",
    excerpt: "लाली लाली आसमान में, सुनहरी किरणें फैली जहान में...",
    category: "Nature",
    likes: 1123,
  },
  {
    id: 7,
    title: "Hope is the Thing",
    poet: "Emily Dickinson",
    excerpt: "Hope is the thing with feathers that perches in the soul...",
    category: "Spirituality",
    likes: 2345,
  },
  {
    id: 8,
    title: "वसंत की प्रथम किरण",
    poet: "Sumitranandan Pant",
    excerpt: "वसंत की प्रथम किरण ने आकर, द्वार खोला मन का बंद था जो...",
    category: "Nature",
    likes: 765,
  },
  {
    id: 9,
    title: "The Road Not Taken",
    poet: "Robert Frost",
    excerpt: "Two roads diverged in a yellow wood, and sorry I could not travel both...",
    category: "Life",
    likes: 2890,
  },
];

export const lovePoems: Poem[] = [
  {
    id: 10,
    title: "तू कौन?",
    poet: "Mahadevi Verma",
    excerpt: "तू कौन है, क्या नाम तेरा? मैं कैसे पाऊँ तुझको सवेरा?",
    category: "Love",
    likes: 1567,
  },
  {
    id: 11,
    title: "Love Sonnet XVII",
    poet: "Pablo Neruda",
    excerpt: "I do not love you as if you were salt-rose, or topaz...",
    category: "Romance",
    likes: 3200,
  },
  {
    id: 19,
    title: "प्रेम का पाठ",
    poet: "Mirza Ghalib",
    excerpt: "प्रेम का पाठ पढ़ाया किसने, दिल को यूं बहलाया किसने...",
    category: "Romance",
    likes: 1890,
  },
];

export const editorPicks: Poem[] = [
  {
    id: 12,
    title: "Invictus",
    poet: "William Ernest Henley",
    excerpt: "Out of the night that covers me, Black as the pit from pole to pole, I thank whatever gods may be For my unconquerable soul...",
    category: "Inspiration",
    likes: 3200,
    views: 28400,
  },
  {
    id: 13,
    title: "जीवन संघर्ष",
    poet: "Ramdhari Singh Dinkar",
    excerpt: "संघर्ष में ही जीवन है, हार मानना पाप है। जो लड़ता है वही जीतता, यही सच्चा न्याय है...",
    category: "Life",
    likes: 2890,
    views: 21300,
  },
  {
    id: 14,
    title: "Phenomenal Woman",
    poet: "Maya Angelou",
    excerpt: "Pretty women wonder where my secret lies. I'm not cute or built to suit a fashion model's size...",
    category: "Empowerment",
    likes: 4100,
    views: 35700,
  },
  {
    id: 15,
    title: "कविता की शक्ति",
    poet: "Sumitranandan Pant",
    excerpt: "कविता वह शक्ति है जो, मन को छू जाती है। शब्दों में बसा जादू, आत्मा तक पहुंच जाती है...",
    category: "Poetry",
    likes: 1670,
    views: 14200,
  },
  {
    id: 16,
    title: "The Raven",
    poet: "Edgar Allan Poe",
    excerpt: "Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume...",
    category: "Classic",
    likes: 2340,
    views: 19800,
  },
  {
    id: 17,
    title: "मातृभूमि",
    poet: "Maithili Sharan Gupt",
    excerpt: "यह मेरी मातृभूमि है, मैं इसका बेटा हूँ। इस धरती की खातिर, सब कुछ करने को तत्पर खड़ा हूँ...",
    category: "Patriotic",
    likes: 2980,
    views: 24100,
  },
];

export const categories = [
  "Love", "Nature", "Life", "Friendship", "Spirituality",
  "Patriotic", "Romance", "Philosophy", "Social", "Modern",
];
