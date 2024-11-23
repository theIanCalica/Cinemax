import { Filter } from "bad-words"; // Named import
const filter = new Filter();

const customBadWords = [
  "Gago",
  "g4g0",
  "g@go",
  "G4go",
  "Tanga",
  "t@ng@",
  "t4ng4",
  "tAng@",
  "Bobo",
  "b0b0",
  "b0b0o",
  "b0bO",
  "Putang Ina",
  "pUtan9 In@",
  "pUt4ng 1n@",
  "pUt@ng1n@",
  "Punyeta",
  "pUnY3t@",
  "pUnY3t4",
  "Bwisit",
  "bw!s1t",
  "bW!s!t",
  "Landi",
  "L4nd1",
  "L@nd1",
  "L@nd!",
  "Leche",
  "l3ch3",
  "l3ch@",
  "Salbahe",
  "S@lb@h3",
  "s@lB@h3",
  "Kupal",
  "kUp@l",
  "kUp4l",
  "Hudas",
  "hUd@s",
  "Pangit",
  "p@ng!t",
  "T*ngin",
  "t*ng!n",
  "Baho",
  "b4h0",
  "Kupal",
  "Kup@l",
  "Buwisit",
  "Paksyet",
  "p@ks13t",
  "Tangina",
  "T4ng1n@",
  "Siraulo",
  "Abnoy",
  "Bastos",
  "Kalbo",
  "chupa",
  "Matigas ang ulo",
  "Gaga",
  "Mamatay ka",
  "Bilog ang ulo",
  "Halimaw",
  "Pota",
  "Utos ng utos",
  "Makatawid",
  "Sungit",
  "Gugol",
  "Ibo",
  "Buwisit",
  "Bayot",
  "Walang hiya",
  "Tirador",
  "Pucha",
  "Yawa",
  "Panget",
  "Tigas ng ulo",
  "Bangkang",
  "Tits",
  "Sablay",
  "Yuck",
  "Masahe",
  "Pagtawanan",
  "ahole",
  "anus",
  "ash0le",
  "ass",
  "Ass Monkey",
  "Assface",
  "assh0le",
  "assh0lez",
  "asshole",
  "assholes",
  "assholz",
  "asswipe",
  "azzhole",
  "bassterds",
  "bastard",
  "bastards",
  "bastardz",
  "basterds",
  "Biatch",
  "bitch",
  "bitches",
  "Blow Job",
  "boffing",
  "butthole",
  "buttwipe",
  "c0ck",
  "c0cks",
  "c0k",
  "Carpet Muncher",
  "cawk",
  "cawks",
  "Clit",
  "cnts",
  "cntz",
  "cock",
  "cockhead",
  "cock-sucker",
  "crap",
  "cum",
  "cunt",
  "cunts",
  "dick",
  "dild0",
  "dild0s",
  "dildo",
  "dildos",
  "dilld0",
  "dominatrix",
  "dyke",
  "enema",
  "f u c k",
  "f u c k e r",
  "fag",
  "fag1t",
  "faget",
  "fagg1t",
  "faggit",
  "faggot",
  "fagit",
  "fags",
  "fagz",
  "faig",
  "faigs",
  "fart",
  "flipping the bird",
  "fuck",
  "fucker",
  "fucking",
  "fucks",
  "Fudge Packer",
  "fuk",
  "Fukah",
  "Fuken",
  "fuker",
  "Fukin",
  "Fukk",
  "Fukkah",
  "Fukken",
  "g00k",
  "gay",
  "gayboy",
  "gaygirl",
  "gays",
  "gayz",
  "God-damned",
  "h00r",
  "h0ar",
  "h0re",
  "hells",
  "hoar",
  "hoor",
  "jackoff",
  "jap",
  "japs",
  "jerk-off",
  "jisim",
  "jiss",
  "jizm",
  "jizz",
  "knob",
  "knobs",
  "knobz",
  "kunt",
  "kunts",
  "kuntz",
  "Lesbian",
  "Lezzian",
  "Lipshits",
  "Lipshitz",
  "masochist",
  "masokist",
  "massterbait",
  "masstrbait",
  "masturbator",
  "masterbaiter",
  "masterbates",
  "Motha Fucker",
  "Motha Fuker",
  "Mother Fucker",
  "Mother Fukah",
  "Mother Fuker",
  "Mother Fukkah",
  "Mutha Fucker",
  "Mutha Fukah",
  "Mutha Fuker",
  "Mutha Fukkah",
  "Mutha Fukker",
  "n1gr",
  "nigger",
  "nigur",
  "niiger",
  "niigr",
  "orafis",
  "orgasim",
  "orgasm",
  "orgasum",
  "orifice",
  "pecker",
  "peeenus",
  "pen1s",
  "penis",
  "penis-breath",
  "Phuc",
  "Phuck",
  "Phuk",
  "polac",
  "polack",
  "polak",
  "Poonani",
  "pr1c",
  "pr1ck",
  "pr1k",
  "pusse",
  "pussy",
  "puuke",
  "puuker",
  "queer",
  "queers",
  "queerz",
  "recktum",
  "rectum",
  "retard",
  "sadist",
  "scank",
  "schlong",
  "screwing",
  "semen",
  "sex",
  "sexy",
  "Sh!t",
  "sh1t",
  "shit",
  "shits",
  "shitter",
  "Shitty",
  "Shity",
  "shitz",
  "Shyt",
  "Shyte",
  "Shytty",
  "skank",
  "skankee",
  "skankey",
  "skanks",
  "Slutty",
  "Slutz",
  "son-of-a-bitch",
  "tit",
  "turd",
  "va1jina",
  "vag1na",
  "vagiina",
  "vagina",
  "vaj1na",
  "vajina",
  "vullva",
  "vulva",
  "wh00r",
  "wh0re",
  "tngina",
  "whore",
  "xrated",
  "xxx",
  "b!+ch",
  "bitch",
  "blowjob",
  "clit",
  "fuck",
  "shit",
  "ass",
  "asshole",
  "b!tch",
  "b17ch",
  "b1tch",
  "bastard",
  "bi+ch",
  "boiolas",
  "buceta",
  "c0ck",
  "cawk",
  "chink",
  "cipa",
  "clits",
  "cock",
  "cum",
  "cunt",
  "dildo",
  "dirsa",
  "ejakulate",
  "fatass",
  "fcuk",
  "fuk",
  "fux0r",
  "hoer",
  "hore",
  "jism",
  "kawk",
  "l3itch",
  "lesbian",
  "masturbate",
  "motherfucker",
  "mofo",
  "nutsack",
  "pimpis",
  "scrotum",
  "shi+",
  "shemale",
  "slut",
  "smut",
  "teets",
  "tits",
  "boobs",
  "b00bs",
  "teez",
  "testicle",
  "titt",
  "w00se",
  "wank",
  "whoar",
  "whore",
];

customBadWords.forEach((word) => {
  filter.addWords(word); // Adding custom words to the filter
});

export default filter;
