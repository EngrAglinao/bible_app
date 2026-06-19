/**
 * =============================================================================
 * BIBLEDATA.JS — External Bible Data Package
 * =============================================================================
 * This file contains all Bible text data, book introductions, verse commentary,
 * cross-references, and divine words markers for the Bible PWA application.
 *
 * SCHEMA DOCUMENTATION:
 * ---------------------
 * window.BIBLE_DATA = {
 *   versions: {
 *     ESV: { books: { "Genesis": { intro: {...}, chapters: { 1: { 1: "verse text", 2: "..." } } } } },
 *     NIV: { ... },
 *     NLT: { ... },
 *     RSV: { ... }
 *   },
 *   commentary: {
 *     "Genesis-1-1": {
 *       title: "Verse Title",
 *       explanation: "Full explanation text...",
 *       wordOrigins: [ { word: "beginning", origin: "Hebrew: בְּרֵאשִׁית (bereshit)..." } ],
 *       context: "Historical/theological context..."
 *     }
 *   },
 *   crossRefs: {
 *     "Genesis-1-1": ["John-1-1", "Hebrews-11-3"]
 *   },
 *   divineWords: {
 *     "Genesis-1-3": true,   // God speaks
 *     "John-3-16": false     // not divine speech
 *   }
 * }
 * =============================================================================
 */

(function() {
  'use strict';

  // ============================================================
  // BOOK LIST — All 66 Books of the Bible
  // ============================================================
  const BOOKS_OT = [
    "Genesis","Exodus","Leviticus","Numbers","Deuteronomy",
    "Joshua","Judges","Ruth","1 Samuel","2 Samuel",
    "1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra",
    "Nehemiah","Esther","Job","Psalms","Proverbs",
    "Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations",
    "Ezekiel","Daniel","Hosea","Joel","Amos",
    "Obadiah","Jonah","Micah","Nahum","Habakkuk",
    "Zephaniah","Haggai","Zechariah","Malachi"
  ];

  const BOOKS_NT = [
    "Matthew","Mark","Luke","John","Acts",
    "Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians",
    "Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy",
    "2 Timothy","Titus","Philemon","Hebrews","James",
    "1 Peter","2 Peter","1 John","2 John","3 John",
    "Jude","Revelation"
  ];

  const ALL_BOOKS = [...BOOKS_OT, ...BOOKS_NT];

  // ============================================================
  // BOOK INTRODUCTIONS
  // ============================================================
  const BOOK_INTROS = {
    "Genesis": {
      author: "Traditionally attributed to Moses",
      date: "circa 1445–1405 BC",
      theme: "Beginnings — of the universe, humanity, sin, and God's redemptive plan",
      context: "Genesis is the foundational book of the entire Bible, establishing the origin of the cosmos, humanity, marriage, sin, and God's covenant relationship with His people. Written during Israel's wilderness wanderings, it answers the deepest human questions: Where did we come from? Why are we here? What went wrong? It traces God's redemptive plan from the garden of Eden through the patriarchs — Abraham, Isaac, Jacob, and Joseph — laying the groundwork for the nation of Israel and ultimately for the coming of the Messiah.",
      keyVerses: ["1:1", "1:27", "3:15", "12:1-3", "50:20"]
    },
    "Exodus": {
      author: "Traditionally attributed to Moses",
      date: "circa 1445–1405 BC",
      theme: "Redemption and the Covenant at Sinai",
      context: "Exodus recounts the dramatic liberation of the Israelite people from over 400 years of slavery in Egypt. Through ten devastating plagues, the Passover, the parting of the Red Sea, and the giving of the Law at Mount Sinai, God reveals Himself as Yahweh — the great 'I AM' — who is faithful to His promises. This book is the Old Testament's supreme picture of redemption, pointing forward to the ultimate Passover Lamb, Jesus Christ.",
      keyVerses: ["3:14", "12:13", "14:14", "20:1-17", "33:19"]
    },
    "Psalms": {
      author: "Multiple authors including David, Asaph, Sons of Korah, Solomon, Moses",
      date: "circa 1410–430 BC (compiled over centuries)",
      theme: "Prayer, Praise, Lament, and Trust in God",
      context: "The Book of Psalms is the hymnbook and prayer book of the Bible, a collection of 150 sacred poems and songs spanning the full range of human emotion — from deepest anguish to highest praise. Organized into five books mirroring the Pentateuch, the Psalms were used in Temple worship and continue to be the devotional heart of both Jewish and Christian faith. They reveal an intimate, raw, and honest relationship with God that transcends every era.",
      keyVerses: ["1:1-2", "23:1", "46:1", "91:1-2", "119:105", "150:6"]
    },
    "Proverbs": {
      author: "Primarily Solomon, with contributions from Agur and King Lemuel",
      date: "circa 970–686 BC",
      theme: "Practical Wisdom for Godly Living",
      context: "Proverbs is a treasury of divinely inspired wisdom literature, offering timeless, practical guidance for every area of life — from business ethics and family relationships to speech, sexuality, and leadership. The foundational premise is clear: 'The fear of the Lord is the beginning of wisdom.' Unlike narrative books, Proverbs speaks in memorable short sayings designed to shape character and help God's people live skillfully and righteously in the world.",
      keyVerses: ["1:7", "3:5-6", "4:23", "16:9", "31:10"]
    },
    "Isaiah": {
      author: "Isaiah son of Amoz",
      date: "circa 740–700 BC",
      theme: "Judgment, Hope, and the Coming Messiah",
      context: "Often called 'The Fifth Gospel,' Isaiah contains the most extensive messianic prophecies of any Old Testament book. Writing during a time of great political upheaval in Judah — surrounded by the threats of Assyria and Babylon — Isaiah delivers both stern warnings of judgment for sin and breathtaking promises of restoration and redemption. Chapters 40–66 pivot from judgment to comfort, climaxing in the Suffering Servant passages (Isaiah 53) that the New Testament identifies with Jesus Christ.",
      keyVerses: ["6:8", "40:31", "53:5", "55:8-9", "61:1-2"]
    },
    "Matthew": {
      author: "Matthew (Levi), the Apostle and former tax collector",
      date: "circa AD 50–70",
      theme: "Jesus as the Promised Messiah and King",
      context: "Written primarily to a Jewish audience, Matthew's Gospel presents Jesus as the long-awaited King of Israel, the fulfillment of all Old Testament prophecy and covenant promises. Matthew deliberately structures his account around five great discourses of Jesus (mirroring the five books of Moses), tracing the genealogy from Abraham and David through to Christ. The Gospel emphasizes the Kingdom of Heaven, the Sermon on the Mount, and Jesus' supreme authority, culminating in the Great Commission.",
      keyVerses: ["1:21", "5:3", "16:16-18", "22:37-40", "28:18-20"]
    },
    "Mark": {
      author: "John Mark, companion of Peter",
      date: "circa AD 55–65",
      theme: "Jesus as the Servant of God — Man of Action",
      context: "The shortest and most action-packed of the four Gospels, Mark presents Jesus as a powerful, dynamic Servant who came 'not to be served but to serve.' Written likely for a Roman Gentile audience, Mark moves at breathless pace — the word 'immediately' appears over 40 times. There are no long discourses here; instead, the focus is on what Jesus does: heals the sick, casts out demons, commands the elements, and ultimately surrenders His life as a ransom for many.",
      keyVerses: ["1:15", "8:29", "8:34-35", "10:45", "16:6"]
    },
    "Luke": {
      author: "Luke, the physician and companion of Paul",
      date: "circa AD 60–62",
      theme: "Jesus as the Son of Man — Savior of All People",
      context: "Luke is the most comprehensive of the four Gospels, written by a Gentile physician with extraordinary historical precision. Luke emphasizes the universal reach of the Gospel — to Gentiles, women, the poor, tax collectors, and outcasts. It features unique parables (the Good Samaritan, the Prodigal Son) and gives special attention to prayer, the Holy Spirit, and the compassionate humanity of Jesus. Luke and its sequel, Acts, together form the longest contribution to the New Testament by a single author.",
      keyVerses: ["1:37", "2:11", "15:20", "19:10", "24:46-47"]
    },
    "John": {
      author: "John the Apostle, 'the disciple whom Jesus loved'",
      date: "circa AD 85–95",
      theme: "Jesus as the Divine Son of God — the Word Made Flesh",
      context: "John's Gospel stands apart from the three Synoptic Gospels in both structure and theology. Beginning not at Bethlehem but 'in the beginning' — before creation itself — John presents the most exalted Christology in the New Testament: Jesus is the eternal Logos (Word) of God who became flesh. John selects seven miraculous 'signs' and pairs them with 'I AM' declarations to prove beyond doubt that Jesus is fully God. The entire Gospel is written with one stated evangelistic purpose: that readers may believe and have life in His name.",
      keyVerses: ["1:1", "1:14", "3:16", "10:10", "11:25-26", "14:6", "20:31"]
    },
    "Acts": {
      author: "Luke, the physician",
      date: "circa AD 62–63",
      theme: "The Birth and Expansion of the Church through the Holy Spirit",
      context: "Acts is the thrilling sequel to Luke's Gospel, narrating the explosive birth and geographic expansion of the early Church from Jerusalem to Rome. Beginning with the outpouring of the Holy Spirit at Pentecost, Acts follows the apostles — primarily Peter and Paul — as the Gospel breaks through every cultural, ethnic, and geographical barrier. It records three of Paul's missionary journeys, multiple imprisonments, miraculous healings, bold sermons, and the unstoppable advance of God's Kingdom across the ancient world.",
      keyVerses: ["1:8", "2:38", "4:12", "9:4-5", "16:31", "28:31"]
    },
    "Romans": {
      author: "Paul the Apostle",
      date: "circa AD 57",
      theme: "The Gospel of God's Righteousness — Salvation by Faith Alone",
      context: "Romans is Paul's masterpiece — the most systematic and theologically comprehensive letter in the New Testament. Written to the church in Rome before his planned visit, Paul lays out the complete architecture of the Gospel: all humanity stands condemned under sin, but God has provided righteousness through faith in Jesus Christ alone, available equally to Jew and Gentile. The letter moves from condemnation (chapters 1-3) to justification (4-5) to sanctification (6-8) to God's plan for Israel (9-11) to practical Christian living (12-16).",
      keyVerses: ["1:16-17", "3:23", "5:8", "6:23", "8:1", "8:28", "8:38-39", "10:9-10", "12:1-2"]
    },
    "1 Corinthians": {
      author: "Paul the Apostle",
      date: "circa AD 55",
      theme: "Christian Unity and Holiness in a Divided, Immoral Church",
      context: "Paul's first letter to the Corinthians addresses a deeply troubled church in one of the Roman Empire's most cosmopolitan and morally permissive cities. The Corinthian believers were dividing into factions, tolerating sexual immorality, abusing the Lord's Supper, misusing spiritual gifts, and confused about the resurrection. With pastoral firmness and theological depth, Paul addresses each issue, famously writing the greatest definition of love in history (chapter 13) and providing the earliest written record of Jesus' resurrection appearances (chapter 15).",
      keyVerses: ["1:18", "6:19-20", "10:13", "13:4-7", "15:3-4", "15:55-57"]
    },
    "Galatians": {
      author: "Paul the Apostle",
      date: "circa AD 48–49",
      theme: "Freedom in Christ — Salvation by Grace through Faith Alone",
      context: "Galatians is Paul's most fiery and urgent letter — written with white-hot intensity to churches being seduced away from the pure Gospel of grace by legalistic Jewish teachers (Judaizers) who insisted Gentiles must be circumcised and observe the Mosaic Law to be saved. Paul thunders back: there is only ONE Gospel, and adding anything to Christ's finished work is to fall from grace. This explosive letter became the theological engine of the Protestant Reformation and remains the Magna Carta of Christian liberty.",
      keyVerses: ["2:20", "3:28", "5:1", "5:22-23", "6:14"]
    },
    "Ephesians": {
      author: "Paul the Apostle",
      date: "circa AD 60–62",
      theme: "The Church as the Body of Christ — Spiritual Riches in Christ",
      context: "Written from prison in Rome, Ephesians is Paul's most elevated and cosmic letter — a breathtaking exposition of God's eternal plan to unite all things in Christ and to build His Church as a new humanity. The first three chapters soar with doctrinal truth about election, redemption, grace, and mystery; the last three chapters apply these truths to marriage, family, work, and spiritual warfare. The famous 'armor of God' passage in chapter 6 has guided Christian spiritual life for two millennia.",
      keyVerses: ["1:3-4", "2:8-9", "2:10", "3:20-21", "4:1-3", "6:10-11"]
    },
    "Philippians": {
      author: "Paul the Apostle",
      date: "circa AD 61",
      theme: "Joy and Contentment in Christ — Even in Suffering",
      context: "Called 'The Epistle of Joy,' Philippians was written by Paul from a Roman prison — yet joy and rejoicing appear more than 16 times in just four chapters. Written to his most beloved church in Philippi (the first European church he planted), Paul expresses deep affection, warns against division and false teachers, and presents the magnificent 'Christ Hymn' (2:5-11) — arguably the most exalted passage about the incarnation in all of Scripture. This letter proves that true contentment is not found in circumstances but in Christ alone.",
      keyVerses: ["1:21", "2:5-8", "3:10", "4:4", "4:6-7", "4:11-13", "4:19"]
    },
    "Revelation": {
      author: "John the Apostle (in exile on Patmos)",
      date: "circa AD 95",
      theme: "The Ultimate Victory of Christ and the Consummation of All Things",
      context: "The Revelation to John is the grand, awe-inspiring finale of the entire Bible — an apocalyptic vision given to the aged apostle John while exiled on the island of Patmos under Roman persecution. Rich in symbolic imagery drawn from the Old Testament, Revelation unveils the cosmic conflict between God and evil, the great tribulation, the return of Christ in glory, the final judgment, and the breathtaking new creation: a new heaven and new earth where God dwells forever with His redeemed people. It is ultimately not a book of fear but of triumphant hope.",
      keyVerses: ["1:8", "3:20", "19:11-16", "20:12", "21:1-4", "22:20"]
    }
  };

  // ============================================================
  // CHAPTER COUNTS PER BOOK
  // ============================================================
  const CHAPTER_COUNTS = {
    "Genesis": 50, "Exodus": 40, "Leviticus": 27, "Numbers": 36, "Deuteronomy": 34,
    "Joshua": 24, "Judges": 21, "Ruth": 4, "1 Samuel": 31, "2 Samuel": 24,
    "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36, "Ezra": 10,
    "Nehemiah": 13, "Esther": 10, "Job": 42, "Psalms": 150, "Proverbs": 31,
    "Ecclesiastes": 12, "Song of Solomon": 8, "Isaiah": 66, "Jeremiah": 52, "Lamentations": 5,
    "Ezekiel": 48, "Daniel": 12, "Hosea": 14, "Joel": 3, "Amos": 9,
    "Obadiah": 1, "Jonah": 4, "Micah": 7, "Nahum": 3, "Habakkuk": 3,
    "Zephaniah": 3, "Haggai": 2, "Zechariah": 14, "Malachi": 4,
    "Matthew": 28, "Mark": 16, "Luke": 24, "John": 21, "Acts": 28,
    "Romans": 16, "1 Corinthians": 16, "2 Corinthians": 13, "Galatians": 6, "Ephesians": 6,
    "Philippians": 4, "Colossians": 4, "1 Thessalonians": 5, "2 Thessalonians": 3, "1 Timothy": 6,
    "2 Timothy": 4, "Titus": 3, "Philemon": 1, "Hebrews": 13, "James": 5,
    "1 Peter": 5, "2 Peter": 3, "1 John": 5, "2 John": 1, "3 John": 1,
    "Jude": 1, "Revelation": 22
  };

  // ============================================================
  // BIBLE TEXT DATA (Representative chapters for all 4 versions)
  // Full production app would include all 66 books/chapters
  // ============================================================

  const BIBLE_VERSIONS = {
    ESV: {
      "Genesis": {
        1: {
          1: "In the beginning, God created the heavens and the earth.",
          2: "The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.",
          3: "And God said, \"Let there be light,\" and there was light.",
          4: "And God saw that the light was good. And God separated the light from the darkness.",
          5: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day.",
          6: "And God said, \"Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.\"",
          7: "And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so.",
          8: "And God called the expanse Heaven. And there was evening and there was morning, the second day.",
          9: "And God said, \"Let the waters under the heavens be gathered together into one place, and let the dry land appear.\" And it was so.",
          10: "God called the dry land Earth, and the waters that were gathered together he called Seas. And God saw that it was good.",
          11: "And God said, \"Let the earth sprout vegetation, plants yielding seed, and fruit trees bearing fruit in which is their seed, each according to its kind, on the earth.\" And it was so.",
          12: "The earth brought forth vegetation, plants yielding seed according to their own kinds, and trees bearing fruit in which is their seed, each according to its kind. And God saw that it was good.",
          13: "And there was evening and there was morning, the third day.",
          14: "And God said, \"Let there be lights in the expanse of the heavens to separate the day from the night. And let them be for signs and for seasons, and for days and years,\"",
          15: "and let them be lights in the expanse of the heavens to give light upon the earth. And it was so.",
          16: "And God made the two great lights — the greater light to rule the day and the lesser light to rule the night — and the stars.",
          17: "And God set them in the expanse of the heavens to give light on the earth,",
          18: "to rule over the day and over the night, and to separate the light from the darkness. And God saw that it was good.",
          19: "And there was evening and there was morning, the fourth day.",
          20: "And God said, \"Let the waters swarm with swarms of living creatures, and let birds fly above the earth across the expanse of the heavens.\"",
          21: "So God created the great sea creatures and every living creature that moves, with which the waters swarm, according to their kinds, and every winged bird according to its kind. And God saw that it was good.",
          22: "And God blessed them, saying, \"Be fruitful and multiply and fill the waters in the seas, and let birds multiply on the earth.\"",
          23: "And there was evening and there was morning, the fifth day.",
          24: "And God said, \"Let the earth bring forth living creatures according to their kinds — livestock and creeping things and beasts of the earth according to their kinds.\" And it was so.",
          25: "And God made the beasts of the earth according to their kinds and the livestock according to their kinds, and everything that creeps on the ground according to its kind. And God saw that it was good.",
          26: "Then God said, \"Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.\"",
          27: "So God created man in his own image, in the image of God he created him; male and female he created them.",
          28: "And God blessed them. And God said to them, \"Be fruitful and multiply and fill the earth and subdue it, and have dominion over the fish of the sea and over the birds of the heavens and over every living thing that moves on the earth.\"",
          29: "And God said, \"Behold, I have given you every plant yielding seed that is on the face of all the earth, and every tree with seed in its fruit. You shall have them for food.\"",
          30: "And to every beast of the earth and to every bird of the heavens and to everything that creeps on the earth, everything that has the breath of life, I have given every green plant for food.\" And it was so.",
          31: "And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, the sixth day."
        },
        2: {
          1: "Thus the heavens and the earth were finished, and all the host of them.",
          2: "And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done.",
          3: "So God blessed the seventh day and made it holy, because on it God rested from all his work that he had done in creation.",
          4: "These are the generations of the heavens and the earth when they were created, in the day that the LORD God made the earth and the heavens.",
          5: "When no bush of the field was yet in the land and no small plant of the field had yet sprung up — for the LORD God had not yet caused it to rain on the land, and there was no man to work the ground,",
          6: "and a mist was going up from the land and was watering the whole face of the ground —",
          7: "then the LORD God formed the man of dust from the ground and breathed into his nostrils the breath of life, and the man became a living creature.",
          8: "And the LORD God planted a garden in Eden, in the east, and there he put the man whom he had formed.",
          9: "And out of the ground the LORD God made to spring up every tree that is pleasant to the sight and good for food. The tree of life was in the midst of the garden, and the tree of the knowledge of good and evil.",
          10: "A river flowed out of Eden to water the garden, and there it divided and became four rivers.",
          11: "The name of the first is the Pishon. It is the one that flowed around the whole land of Havilah, where there is gold.",
          12: "And the gold of that land is good; bdellium and onyx stone are there.",
          13: "The name of the second river is the Gihon. It is the one that flowed around the whole land of Cush.",
          14: "And the name of the third river is the Tigris, which flows east of Assyria. And the fourth river is the Euphrates.",
          15: "The LORD God took the man and put him in the garden of Eden to work it and keep it.",
          16: "And the LORD God commanded the man, saying, \"You may surely eat of every tree of the garden,\"",
          17: "but of the tree of the knowledge of good and evil you shall not eat, for in the day that you eat of it you shall surely die.\"",
          18: "Then the LORD God said, \"It is not good that the man should be alone; I will make him a helper fit for him.\"",
          19: "Now out of the ground the LORD God had formed every beast of the field and every bird of the heavens and brought them to the man to see what he would call them. And whatever the man called every living creature, that was its name.",
          20: "The man gave names to all livestock and to the birds of the heavens and to every beast of the field. But for Adam there was not found a helper fit for him.",
          21: "So the LORD God caused a deep sleep to fall upon the man, and while he slept took one of his ribs and closed up its place with flesh.",
          22: "And the rib that the LORD God had taken from the man he made into a woman and brought her to the man.",
          23: "Then the man said, \"This at last is bone of my bones and flesh of my flesh; she shall be called Woman, because she was taken out of Man.\"",
          24: "Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh.",
          25: "And the man and his wife were both naked and were not ashamed."
        },
        3: {
          1: "Now the serpent was more crafty than any other beast of the field that the LORD God had made. He said to the woman, \"Did God actually say, 'You shall not eat of any tree in the garden'?\"",
          2: "And the woman said to the serpent, \"We may eat of the fruit of the trees in the garden,\"",
          3: "but God said, 'You shall not eat of the fruit of the tree that is in the midst of the garden, neither shall you touch it, lest you die.'\"",
          4: "But the serpent said to the woman, \"You will not surely die.\"",
          5: "\"For God knows that when you eat of it your eyes will be opened, and you will be like God, knowing good and evil.\"",
          6: "So when the woman saw that the tree was good for food, and that it was a delight to the eyes, and that the tree was to be desired to make one wise, she took of its fruit and ate, and she also gave some to her husband who was with her, and he ate.",
          7: "Then the eyes of both were opened, and they knew that they were naked. And they sewed fig leaves together and made themselves loincloths.",
          8: "And they heard the sound of the LORD God walking in the garden in the cool of the day, and the man and his wife hid themselves from the presence of the LORD God among the trees of the garden.",
          9: "But the LORD God called to the man and said to him, \"Where are you?\"",
          10: "And he said, \"I heard the sound of you in the garden, and I was afraid, because I was naked, and I hid myself.\"",
          11: "He said, \"Who told you that you were naked? Have you eaten of the tree of which I commanded you not to eat?\"",
          12: "The man said, \"The woman whom you gave to be with me, she gave me fruit of the tree, and I ate.\"",
          13: "Then the LORD God said to the woman, \"What is this that you have done?\" The woman said, \"The serpent deceived me, and I ate.\"",
          14: "The LORD God said to the serpent, \"Because you have done this, cursed are you above all livestock and above all beasts of the field; on your belly you shall go, and dust you shall eat all the days of your life.\"",
          15: "\"I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel.\"",
          16: "To the woman he said, \"I will surely multiply your pain in childbearing; in pain you shall bring forth children. Your desire shall be contrary to your husband, but he shall rule over you.\"",
          17: "And to Adam he said, \"Because you have listened to the voice of your wife and have eaten of the tree of which I commanded you, 'You shall not eat of it,' cursed is the ground because of you; in pain you shall eat of it all the days of your life;\"",
          18: "thorns and thistles it shall bring forth for you; and you shall eat the plants of the field.",
          19: "By the sweat of your face you shall eat bread, till you return to the ground, for out of it you were taken; for you are dust, and to dust you shall return.\"",
          20: "The man called his wife's name Eve, because she was the mother of all living.",
          21: "And the LORD God made for Adam and for his wife garments of skins and clothed them.",
          22: "Then the LORD God said, \"Behold, the man has become like one of us in knowing good and evil. Now, lest he reach out his hand and take also of the tree of life and eat, and live forever —\"",
          23: "therefore the LORD God sent him out from the garden of Eden to work the ground from which he was taken.",
          24: "He drove out the man, and at the east of the garden of Eden he placed the cherubim and a flaming sword that turned every way to guard the way to the tree of life."
        }
      },
      "John": {
        1: {
          1: "In the beginning was the Word, and the Word was with God, and the Word was God.",
          2: "He was in the beginning with God.",
          3: "All things were made through him, and without him was not any thing made that was made.",
          4: "In him was life, and the life was the light of men.",
          5: "The light shines in the darkness, and the darkness has not overcome it.",
          6: "There was a man sent from God, whose name was John.",
          7: "He came as a witness, to bear witness about the light, that all might believe through him.",
          8: "He was not the light, but came to bear witness about the light.",
          9: "The true light, which gives light to everyone, was coming into the world.",
          10: "He was in the world, and the world was made through him, yet the world did not know him.",
          11: "He came to his own, and his own people did not receive him.",
          12: "But to all who did receive him, who believed in his name, he gave the right to become children of God,",
          13: "who were born, not of blood nor of the will of the flesh nor of the will of man, but of God.",
          14: "And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth.",
          15: "John bore witness about him, and cried out, \"This was he of whom I said, 'He who comes after me ranks before me, because he was before me.'\"",
          16: "For from his fullness we have all received, grace upon grace.",
          17: "For the law was given through Moses; grace and truth came through Jesus Christ.",
          18: "No one has ever seen God; the only God, who is at the Father's side, he has made him known."
        },
        3: {
          1: "Now there was a man of the Pharisees named Nicodemus, a ruler of the Jews.",
          2: "This man came to Jesus by night and said to him, \"Rabbi, we know that you are a teacher come from God, for no one can do these signs that you do unless God is with him.\"",
          3: "Jesus answered him, \"Truly, truly, I say to you, unless one is born again he cannot see the kingdom of God.\"",
          4: "Nicodemus said to him, \"How can a man be born when he is old? Can he enter a second time into his mother's womb and be born?\"",
          5: "Jesus answered, \"Truly, truly, I say to you, unless one is born of water and the Spirit, he cannot enter the kingdom of God.\"",
          6: "\"That which is born of the flesh is flesh, and that which is born of the Spirit is spirit.\"",
          7: "\"Do not marvel that I said to you, 'You must be born again.'\"",
          8: "\"The wind blows where it wishes, and you hear its sound, but you do not know where it comes from or where it goes. So it is with everyone who is born of the Spirit.\"",
          9: "Nicodemus said to him, \"How can these things be?\"",
          10: "Jesus answered him, \"Are you the teacher of Israel and yet you do not understand these things?\"",
          11: "\"Truly, truly, I say to you, we speak of what we know, and bear witness to what we have seen, but you do not receive our testimony.\"",
          12: "\"If I have told you earthly things and you do not believe, how can you believe if I tell you heavenly things?\"",
          13: "\"No one has ascended into heaven except he who descended from heaven, the Son of Man.\"",
          14: "\"And as Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up,\"",
          15: "\"that whoever believes in him may have eternal life.\"",
          16: "\"For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.\"",
          17: "\"For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.\"",
          18: "\"Whoever believes in him is not condemned, but whoever does not believe is condemned already, because he has not believed in the name of the only Son of God.\"",
          19: "\"And this is the judgment: the light has come into the world, and people loved the darkness rather than the light because their works were evil.\"",
          20: "\"For everyone who does wicked things hates the light and does not come to the light, lest his works should be exposed.\"",
          21: "\"But whoever does what is true comes to the light, so that it may be clearly seen that his works have been carried out in God.\""
        }
      },
      "Psalms": {
        1: {
          1: "Blessed is the man who walks not in the counsel of the wicked, nor stands in the way of sinners, nor sits in the seat of scoffers;",
          2: "but his delight is in the law of the LORD, and on his law he meditates day and night.",
          3: "He is like a tree planted by streams of water that yields its fruit in its season, and its leaf does not wither. In all that he does, he prospers.",
          4: "The wicked are not so, but are like chaff that the wind drives away.",
          5: "Therefore the wicked will not stand in the judgment, nor sinners in the congregation of the righteous;",
          6: "for the LORD knows the way of the righteous, but the way of the wicked will perish."
        },
        23: {
          1: "The LORD is my shepherd; I shall not want.",
          2: "He makes me lie down in green pastures. He leads me beside still waters.",
          3: "He restores my soul. He leads me in paths of righteousness for his name's sake.",
          4: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
          5: "You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows.",
          6: "Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the LORD forever."
        },
        91: {
          1: "He who dwells in the shelter of the Most High will abide in the shadow of the Almighty.",
          2: "I will say to the LORD, \"My refuge and my fortress, my God, in whom I trust.\"",
          3: "For he will deliver you from the snare of the fowler and from the deadly pestilence.",
          4: "He will cover you with his pinions, and under his wings you will find refuge; his faithfulness is a shield and buckler.",
          5: "You will not fear the terror of the night, nor the arrow that flies by day,",
          6: "nor the pestilence that stalks in darkness, nor the destruction that wastes at noonday.",
          7: "A thousand may fall at your side, ten thousand at your right hand, but it will not come near you.",
          8: "You will only look with your eyes and see the recompense of the wicked.",
          9: "Because you have made the LORD your dwelling place — the Most High, who is my refuge —",
          10: "no evil shall be allowed to befall you, no plague come near your tent.",
          11: "For he will command his angels concerning you to guard you in all your ways.",
          12: "On their hands they will bear you up, lest you strike your foot against a stone.",
          13: "You will tread on the lion and the adder; the young lion and the serpent you will trample underfoot.",
          14: "Because he holds fast to me in love, I will deliver him; I will protect him, because he knows my name.",
          15: "When he calls to me, I will answer him; I will be with him in trouble; I will rescue him and honor him.",
          16: "With long life I will satisfy him and show him my salvation."
        }
      },
      "Romans": {
        8: {
          1: "There is therefore now no condemnation for those who are in Christ Jesus.",
          2: "For the law of the Spirit of life has set you free in Christ Jesus from the law of sin and death.",
          3: "For God has done what the law, weakened by the flesh, could not do. By sending his own Son in the likeness of sinful flesh and for sin, he condemned sin in the flesh,",
          4: "in order that the righteous requirement of the law might be fulfilled in us, who walk not according to the flesh but according to the Spirit.",
          5: "For those who live according to the flesh set their minds on the things of the flesh, but those who live according to the Spirit set their minds on the things of the Spirit.",
          6: "For to set the mind on the flesh is death, but to set the mind on the Spirit is life and peace.",
          7: "For the mind that is set on the flesh is hostile to God, for it does not submit to God's law; indeed, it cannot.",
          8: "Those who are in the flesh cannot please God.",
          9: "You, however, are not in the flesh but in the Spirit, if in fact the Spirit of God dwells in you. Anyone who does not have the Spirit of Christ does not belong to him.",
          10: "But if Christ is in you, although the body is dead because of sin, the Spirit is life because of righteousness.",
          11: "If the Spirit of him who raised Jesus from the dead dwells in you, he who raised Christ Jesus from the dead will also give life to your mortal bodies through his Spirit who dwells in you.",
          12: "So then, brothers, we are debtors, not to the flesh, to live according to the flesh.",
          13: "For if you live according to the flesh you will die, but if by the Spirit you put to death the deeds of the body, you will live.",
          14: "For all who are led by the Spirit of God are sons of God.",
          15: "For you did not receive the spirit of slavery to fall back into fear, but you have received the Spirit of adoption as sons, by whom we cry, \"Abba! Father!\"",
          16: "The Spirit himself bears witness with our spirit that we are children of God,",
          17: "and if children, then heirs — heirs of God and fellow heirs with Christ, provided we suffer with him in order that we may also be glorified with him.",
          18: "For I consider that the sufferings of this present time are not worth comparing with the glory that is to be revealed to us.",
          19: "For the creation waits with eager longing for the revealing of the sons of God.",
          20: "For the creation was subjected to futility, not willingly, but because of him who subjected it, in hope",
          21: "that the creation itself will be set free from its bondage to corruption and obtain the freedom of the glory of the children of God.",
          22: "For we know that the whole creation has been groaning together in the pains of childbirth until now.",
          23: "And not only the creation, but we ourselves, who have the firstfruits of the Spirit, groan inwardly as we wait eagerly for adoption as sons, the redemption of our bodies.",
          24: "For in this hope we were saved. Now hope that is seen is not hope. For who hopes for what he sees?",
          25: "But if we hope for what we do not see, we wait for it with patience.",
          26: "Likewise the Spirit helps us in our weakness. For we do not know what to pray for as we ought, but the Spirit himself intercedes for us with groanings too deep for words.",
          27: "And he who searches hearts knows what is the mind of the Spirit, because the Spirit intercedes for the saints according to the will of God.",
          28: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
          29: "For those whom he foreknew he also predestined to be conformed to the image of his Son, in order that he might be the firstborn among many brothers.",
          30: "And those whom he predestined he also called, and those whom he called he also justified, and those whom he justified he also glorified.",
          31: "What then shall we say to these things? If God is for us, who can be against us?",
          32: "He who did not spare his own Son but gave him up for us all, how will he not also with him graciously give us all things?",
          33: "Who shall bring any charge against God's elect? It is God who justifies.",
          34: "Who is to condemn? Christ Jesus is the one who died — more than that, who was raised — who is at the right hand of God, who indeed is interceding for us.",
          35: "Who shall separate us from the love of Christ? Shall tribulation, or distress, or persecution, or famine, or nakedness, or danger, or sword?",
          36: "As it is written, \"For your sake we are being killed all the day long; we are regarded as sheep to be slaughtered.\"",
          37: "No, in all these things we are more than conquerors through him who loved us.",
          38: "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers,",
          39: "nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord."
        }
      },
      "Philippians": {
        4: {
          1: "Therefore, my brothers, whom I love and long for, my joy and crown, stand firm thus in the Lord, my beloved.",
          2: "I entreat Euodia and I entreat Syntyche to agree in the Lord.",
          3: "Yes, I ask you also, true companion, help these women, who have labored side by side with me in the gospel together with Clement and the rest of my fellow workers, whose names are in the book of life.",
          4: "Rejoice in the Lord always; again I will say, rejoice.",
          5: "Let your reasonableness be known to everyone. The Lord is at hand;",
          6: "do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
          7: "And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",
          8: "Finally, brothers, whatever is true, whatever is honorable, whatever is just, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence, if there is anything worthy of praise, think about these things.",
          9: "What you have learned and received and heard and seen in me — practice these things, and the God of peace will be with you.",
          10: "I rejoiced in the Lord greatly that now at length you have revived your concern for me. You were indeed concerned for me, but you had no opportunity.",
          11: "Not that I am speaking of being in need, for I have learned, in whatever situation I am, to be content.",
          12: "I know how to be brought low, and I know how to abound. In any and every circumstance, I have learned the secret of facing plenty and hunger, abundance and need.",
          13: "I can do all things through him who strengthens me.",
          14: "Yet it was kind of you to share my trouble.",
          15: "And you Philippians yourselves know that in the beginning of the gospel, when I left Macedonia, no church entered into partnership with me in giving and receiving except you only.",
          16: "Even in Thessalonica you sent me help for my needs once and again.",
          17: "Not that I seek the gift, but I seek the fruit that increases to your credit.",
          18: "I have received full payment, and more. I am well supplied, having received from Epaphroditus the gifts you sent, a fragrant offering, a sacrifice acceptable and pleasing to God.",
          19: "And my God will supply every need of yours according to his riches in glory in Christ Jesus.",
          20: "To our God and Father be glory forever and ever. Amen."
        }
      }
    },
    NIV: {
      "Genesis": {
        1: {
          1: "In the beginning God created the heavens and the earth.",
          2: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
          3: "And God said, \"Let there be light,\" and there was light.",
          4: "God saw that the light was good, and he separated the light from the darkness.",
          5: "God called the light \"day,\" and the darkness he called \"night.\" And there was evening, and there was morning — the first day.",
          6: "And God said, \"Let there be a vault between the waters to separate water from water.\"",
          7: "So God made the vault and separated the water under the vault from the water above it. And it was so.",
          8: "God called the vault \"sky.\" And there was evening, and there was morning — the second day.",
          9: "And God said, \"Let the water under the sky be gathered to one place, and let dry ground appear.\" And it was so.",
          10: "God called the dry ground \"land,\" and the gathered waters he called \"seas.\" And God saw that it was good.",
          11: "Then God said, \"Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds.\" And it was so.",
          12: "The land produced vegetation: plants bearing seed according to their kinds and trees bearing fruit with seed in it according to their kinds. And God saw that it was good.",
          13: "And there was evening, and there was morning — the third day.",
          14: "And God said, \"Let there be lights in the vault of the sky to separate the day from the night, and let them serve as signs to mark sacred times, and days and years,\"",
          15: "and let them be lights in the vault of the sky to give light on the earth.\" And it was so.",
          16: "God made two great lights — the greater light to govern the day and the lesser light to govern the night. He also made the stars.",
          17: "God set them in the vault of the sky to give light on the earth,",
          18: "to govern the day and the night, and to separate light from darkness. And God saw that it was good.",
          19: "And there was evening, and there was morning — the fourth day.",
          20: "And God said, \"Let the water teem with living creatures, and let birds fly above the earth across the vault of the sky.\"",
          21: "So God created the great creatures of the sea and every living thing with which the water teems and that moves about in it, according to their kinds, and every winged bird according to its kind. And God saw that it was good.",
          22: "God blessed them and said, \"Be fruitful and increase in number and fill the water in the seas, and let the birds increase on the earth.\"",
          23: "And there was evening, and there was morning — the fifth day.",
          24: "And God said, \"Let the land produce living creatures according to their kinds: the livestock, the creatures that move along the ground, and the wild animals, each according to its kind.\" And it was so.",
          25: "God made the wild animals according to their kinds, the livestock according to their kinds, and all the creatures that move along the ground according to their kinds. And God saw that it was good.",
          26: "Then God said, \"Let us make mankind in our image, in our likeness, so that they may rule over the fish in the sea and the birds in the sky, over the livestock and all the wild animals, and over all the creatures that move along the ground.\"",
          27: "So God created mankind in his own image, in the image of God he created them; male and female he created them.",
          28: "God blessed them and said to them, \"Be fruitful and increase in number; fill the earth and subdue it. Rule over the fish in the sea and the birds in the sky and over every living creature that moves on the ground.\"",
          29: "Then God said, \"I give you every seed-bearing plant on the face of the whole earth and every tree that has fruit with seed in it. They will be yours for food.\"",
          30: "\"And to all the beasts of the earth and all the birds in the sky and all the creatures that move along the ground — everything that has the breath of life in it — I give every green plant for food.\" And it was so.",
          31: "God saw all that he had made, and it was very good. And there was evening, and there was morning — the sixth day."
        }
      },
      "John": {
        3: {
          1: "Now there was a Pharisee, a man named Nicodemus who was a member of the Jewish ruling council.",
          2: "He came to Jesus at night and said, \"Rabbi, we know that you are a teacher who has come from God. For no one could perform the signs you are doing if God were not with him.\"",
          3: "Jesus replied, \"Very truly I tell you, no one can see the kingdom of God unless they are born again.\"",
          4: "\"How can someone be born when they are old?\" Nicodemus asked. \"Surely they cannot enter a second time into their mother's womb to be born!\"",
          5: "Jesus answered, \"Very truly I tell you, no one can enter the kingdom of God unless they are born of water and the Spirit.\"",
          6: "\"Flesh gives birth to flesh, but the Spirit gives birth to spirit.\"",
          7: "\"You should not be surprised at my saying, 'You must be born again.'\"",
          8: "\"The wind blows wherever it pleases. You hear its sound, but you cannot tell where it comes from or where it is going. So it is with everyone born of the Spirit.\"",
          9: "\"How can this be?\" Nicodemus asked.",
          10: "\"You are Israel's teacher,\" said Jesus, \"and do you not understand these things?\"",
          11: "\"Very truly I tell you, we speak of what we know, and we testify to what we have seen, but still you people do not accept our testimony.\"",
          12: "\"I have spoken to you of earthly things and you do not believe; how then will you believe if I speak of heavenly things?\"",
          13: "\"No one has ever gone into heaven except the one who came from heaven — the Son of Man.\"",
          14: "\"Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up,\"",
          15: "\"that everyone who believes may have eternal life in him.\"",
          16: "\"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.\"",
          17: "\"For God did not send his Son into the world to condemn the world, but to save the world through him.\"",
          18: "\"Whoever believes in him is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God's one and only Son.\"",
          19: "\"This is the verdict: Light has come into the world, but people loved darkness instead of light because their deeds were evil.\"",
          20: "\"Everyone who does evil hates the light, and will not come into the light for fear that their deeds will be exposed.\"",
          21: "\"But whoever lives by the truth comes into the light, so that it may be seen plainly that what they have done has been done in the sight of God.\""
        }
      },
      "Psalms": {
        23: {
          1: "The LORD is my shepherd, I lack nothing.",
          2: "He makes me lie down in green pastures, he leads me beside quiet waters,",
          3: "he refreshes my soul. He guides me along the right paths for his name's sake.",
          4: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
          5: "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.",
          6: "Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the LORD forever."
        }
      },
      "Romans": {
        8: {
          28: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
          38: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers,",
          39: "neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."
        }
      }
    },
    NLT: {
      "Genesis": {
        1: {
          1: "In the beginning God created the heavens and the earth.",
          2: "The earth was formless and empty, and darkness covered the deep waters. And the Spirit of God was hovering over the surface of the waters.",
          3: "Then God said, \"Let there be light,\" and there was light.",
          4: "And God saw that the light was good. Then he separated the light from the darkness.",
          5: "God called the light \"day\" and the darkness \"night.\" And evening passed and morning came, marking the first day.",
          6: "Then God said, \"Let there be a space between the waters, to separate the waters of the heavens from the waters of the earth.\"",
          7: "And that is what happened. God made this space to separate the waters of the earth from the waters of the heavens.",
          8: "God called the space \"sky.\" And evening passed and morning came, marking the second day.",
          9: "Then God said, \"Let the waters beneath the sky flow together into one place, so dry ground may appear.\" And that is what happened.",
          10: "God called the dry ground \"land\" and the waters \"seas.\" And God saw that it was good.",
          26: "Then God said, \"Let us make human beings in our image, to be like us. They will reign over the fish in the sea, the birds in the sky, the livestock, all the wild animals on the earth, and the small animals that scurry along the ground.\"",
          27: "So God created human beings in his own image. In the image of God he created them; male and female he created them.",
          28: "Then God blessed them and said, \"Be fruitful and multiply. Fill the earth and govern it. Reign over the fish in the sea, the birds in the sky, and all the animals that scurry along the ground.\"",
          31: "Then God looked over all he had made, and he saw that it was very good! And evening passed and morning came, marking the sixth day."
        }
      },
      "John": {
        3: {
          16: "\"For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.\"",
          17: "\"God sent his Son into the world not to judge the world, but to save the world through him.\""
        }
      },
      "Psalms": {
        23: {
          1: "The LORD is my shepherd; I have all that I need.",
          2: "He lets me rest in green meadows; he leads me beside peaceful streams.",
          3: "He renews my strength. He guides me along right paths, bringing honor to his name.",
          4: "Even when I walk through the darkest valley, I will not be afraid, for you are close beside me. Your rod and your staff protect and comfort me.",
          5: "You prepare a feast for me in the presence of my enemies. You honor me by anointing my head with oil. My cup overflows with blessings.",
          6: "Surely your goodness and unfailing love will pursue me all the days of my life, and I will live in the house of the LORD forever."
        }
      },
      "Philippians": {
        4: {
          13: "For I can do everything through Christ, who gives me strength."
        }
      }
    },
    RSV: {
      "Genesis": {
        1: {
          1: "In the beginning God created the heavens and the earth.",
          2: "The earth was without form and void, and darkness was upon the face of the deep; and the Spirit of God was moving over the face of the waters.",
          3: "And God said, \"Let there be light\"; and there was light.",
          4: "And God saw that the light was good; and God separated the light from the darkness.",
          5: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, one day.",
          6: "And God said, \"Let there be a firmament in the midst of the waters, and let it separate the waters from the waters.\"",
          7: "And God made the firmament and separated the waters which were under the firmament from the waters which were above the firmament. And it was so.",
          8: "And God called the firmament Heaven. And there was evening and there was morning, a second day.",
          26: "Then God said, \"Let us make man in our image, after our likeness; and let them have dominion over the fish of the sea, and over the birds of the air, and over the cattle, and over all the earth, and over every creeping thing that creeps upon the earth.\"",
          27: "So God created man in his own image, in the image of God he created him; male and female he created them.",
          31: "And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, a sixth day."
        }
      },
      "John": {
        3: {
          16: "For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
          17: "For God sent the Son into the world, not to condemn the world, but that the world might be saved through him."
        }
      },
      "Psalms": {
        23: {
          1: "The LORD is my shepherd, I shall not want;",
          2: "he makes me lie down in green pastures. He leads me beside still waters;",
          3: "he restores my soul. He leads me in paths of righteousness for his name's sake.",
          4: "Even though I walk through the valley of the shadow of death, I fear no evil; for thou art with me; thy rod and thy staff, they comfort me.",
          5: "Thou preparest a table before me in the presence of my enemies; thou anointest my head with oil, my cup overflows.",
          6: "Surely goodness and mercy shall follow me all the days of my life; and I shall dwell in the house of the LORD for ever."
        }
      }
    }
  };

  // ============================================================
  // COMMENTARY DATA
  // ============================================================
  const COMMENTARY = {
    "Genesis-1-1": {
      title: "The Absolute Beginning",
      explanation: "This opening verse is the most consequential sentence in all of human literature. 'In the beginning' — the Hebrew בְּרֵאשִׁית (bereshit) — establishes that time itself had a starting point, demolishing all cyclical views of existence. God did not work with pre-existing material; He called reality itself into being from absolute nothingness (creatio ex nihilo). This single verse refutes both atheistic materialism (matter is eternal) and polytheism (competing gods shaped chaos). It grounds all of reality in one eternal, personal, all-powerful Creator.",
      wordOrigins: [
        { word: "Beginning (בְּרֵאשִׁית, bereshit)", origin: "Hebrew: 'In the head/first of' — indicating the absolute start of time and created order." },
        { word: "Created (בָּרָא, bara)", origin: "Hebrew: Used exclusively of divine creation — never of human making. Implies creation from nothing, not reshaping existing material." },
        { word: "God (אֱלֹהִים, Elohim)", origin: "Hebrew plural form of El (God), suggesting majesty and fullness — the God of all power." }
      ],
      context: "Genesis 1:1 stood in direct counter-cultural opposition to the creation myths of Israel's neighbors (Babylonian Enuma Elish, Egyptian cosmogonies) which portrayed creation as the result of divine warfare or sexual reproduction among competing gods. Israel's God needs no raw material, no partner, and no opponent — He simply speaks, and it is."
    },
    "Genesis-1-3": {
      title: "Let There Be Light — The First Divine Command",
      explanation: "God's very first recorded speech act in Scripture is a creative command: 'Let there be light.' This establishes the pattern of the entire creation week — God speaks, and reality conforms. The light here precedes the creation of the sun (Day 4), suggesting this primordial light may be the radiance of God's own presence (cf. Revelation 22:5, where the New Jerusalem needs no sun because God is its light). This verse is echoed in 2 Corinthians 4:6 where Paul says God 'shone in our hearts to give the light of the knowledge of the glory of God in the face of Jesus Christ.'",
      wordOrigins: [
        { word: "Said (וַיֹּאמֶר, vayomer)", origin: "Hebrew: 'And He said' — the repeated formula of divine creative speech throughout Genesis 1. God's word carries ontological power." },
        { word: "Light (אוֹר, or)", origin: "Hebrew: Pure radiant light energy — distinguished from the 'lights' (מְאֹרֹת, meoroth) of Day 4 which are light-bearers." }
      ],
      context: "The separation of light from darkness establishes the fundamental binary of existence — order versus chaos, good versus evil — that runs as a theological thread throughout the entire Bible, culminating in Revelation's final abolition of darkness forever."
    },
    "Genesis-1-26": {
      title: "The Pinnacle of Creation — Mankind in God's Image",
      explanation: "Genesis 1:26 marks a dramatic shift in the creation narrative. For the first time, God pauses and deliberates — 'Let us make man.' The plural 'us' has been interpreted as the divine council (angels), the royal/majestic plural, or most theologically significant, a pre-echo of the Trinity — the one God who exists as Father, Son, and Holy Spirit in eternal community. The concept of Imago Dei (Image of God) is the theological foundation of all human dignity, rights, and worth. Humans are not an accident of evolution but intentional image-bearers of the living God.",
      wordOrigins: [
        { word: "Image (צֶלֶם, tselem)", origin: "Hebrew: Originally used of physical representations/statues of kings. As God's image-bearers, humans are His royal representatives on earth." },
        { word: "Likeness (דְּמוּת, demut)", origin: "Hebrew: 'Resemblance' — indicating both functional (what we do) and relational (how we relate) similarities to God." },
        { word: "Dominion (רָדָה, radah)", origin: "Hebrew: Royal rule — the same word used of a king's reign. Not exploitation, but royal stewardship." }
      ],
      context: "The Imago Dei doctrine became the theological basis for the later Christian abolition of slavery, the development of human rights, and the sanctity of life across all races and cultures. To attack a human being is to attack the image of God."
    },
    "John-1-1": {
      title: "The Eternal Word — The Highest Christology",
      explanation: "John 1:1 is one of the most theologically dense sentences in Scripture. By opening with 'In the beginning' (ἐν ἀρχῇ, en arche) — the exact Greek equivalent of Genesis 1:1 — John is deliberately and boldly identifying Jesus (the Word/Logos) with the God who created all things. The three statements build in force: (1) The Word existed before creation. (2) The Word was in eternal relationship with God the Father. (3) The Word shared the very nature/essence of God. This is the New Testament's clearest, most direct declaration of the full deity of Jesus Christ.",
      wordOrigins: [
        { word: "Word (Λόγος, Logos)", origin: "Greek: Means both 'word/speech' and 'reason/logic.' In Greek philosophy, the Logos was the rational principle ordering the cosmos. John hijacks this concept and says: that Logos is a Person — Jesus." },
        { word: "Was (ἦν, en)", origin: "Greek: Imperfect tense — indicating continuous, ongoing existence before time began. Not 'the Word came to be' but 'the Word was already.'" },
        { word: "God (θεός, theos)", origin: "Greek: Without the definite article here — emphasizing the divine nature/quality, not merely identification. The Word was fully divine in essence." }
      ],
      context: "Early church father Origen wrote that John 1:1 alone demolished every heresy about Christ's nature ever proposed. Arianism, which claimed the Son was a created being ('there was a time when He was not'), is directly refuted: the Word already was before anything was made."
    },
    "John-3-16": {
      title: "The Gospel in One Verse",
      explanation: "Often called 'the Gospel in miniature,' John 3:16 is simultaneously the most memorized, most translated, and most life-transforming verse in the history of humanity. Martin Luther called it 'the heart of the Bible, the Gospel in miniature, the very center of Scripture.' It contains in capsule form the entire theology of salvation: (1) God — the initiating subject; (2) so loved — the passionate, inexhaustible motivation; (3) the world — the breathtaking scope (not just Israel, but all humanity); (4) that He gave — the stunning sacrifice; (5) His only Son — the infinite cost; (6) that whoever believes — the simple, universal condition; (7) shall not perish — the deliverance from eternal judgment; (8) but have eternal life — the positive gift of unending divine life.",
      wordOrigins: [
        { word: "So loved (οὕτως ἠγάπησεν, houtos egapesen)", origin: "Greek: 'In this manner/to this degree loved' — emphasizing both the nature and the measure of God's love. The Greek agape denotes selfless, unconditional love." },
        { word: "Only Son (μονογενῆ, monogene)", origin: "Greek: 'One and only / unique.' Not merely 'only-begotten' in a physical sense but the utterly unique, one-of-a-kind Son who shares the Father's essence." },
        { word: "Perish (ἀπόληται, apoletai)", origin: "Greek: Not mere annihilation, but eternal ruin/loss — separation from God and all that is good, forever." },
        { word: "Eternal life (ζωὴν αἰώνιον, zoen aionion)", origin: "Greek: Not merely life that goes on forever, but a quality of life — participation in the very life of God Himself." }
      ],
      context: "Spoken by Jesus to Nicodemus, a religious expert who knew the Law perfectly but had never understood that God's heart is not condemnation but rescue. The God of the Bible is not a reluctant savior dragged to mercy — He is the initiator, the giver, the pursuer. The cross is not God punishing Jesus instead of us in a cold transaction; it is God Himself entering human suffering to carry us home."
    },
    "Psalms-23-1": {
      title: "The LORD is My Shepherd",
      explanation: "The 23rd Psalm is arguably the most beloved piece of literature in human history — recited at bedsides, funerals, hospital rooms, and battlefields for three thousand years. David, himself a shepherd who faced lions, bears, and the murderous envy of King Saul, writes from personal experience of both shepherding and being shepherded. The opening declaration 'The LORD is my shepherd' is breathtaking in its intimacy — not 'The LORD is A shepherd' or 'our shepherd' but MY shepherd. This is the language of personal covenant, of intimate divine care for one individual soul.",
      wordOrigins: [
        { word: "LORD (יְהוָה, YHWH)", origin: "Hebrew: The sacred covenant name of God — 'I AM WHO I AM' — emphasizing God's self-existence, faithfulness, and personal relationship with His people." },
        { word: "Shepherd (רֹעֶה, ro'eh)", origin: "Hebrew: The primary metaphor for leadership in ancient Near East culture. A shepherd owned, guided, fed, protected, and risked his life for his sheep." },
        { word: "Want (חָסֵר, chaser)", origin: "Hebrew: 'Lack' or 'be without' — covering every category of human need: physical, emotional, spiritual, relational." }
      ],
      context: "Jesus identified Himself as the fulfillment of this psalm in John 10: 'I am the Good Shepherd. The Good Shepherd lays down his life for the sheep.' The promise of verse 4 — 'Even through the valley of the shadow of death' — has been the anchor of faith for billions of believers facing their final hours."
    },
    "Romans-8-28": {
      title: "All Things Work Together for Good",
      explanation: "Romans 8:28 is arguably the most comforting verse in the New Testament for believers facing suffering, loss, confusion, or tragedy. Paul does not say that all things are good — some things are devastatingly evil. He says God works ALL things — including pain, betrayal, failure, grief, disease, and death — together for the ultimate good of those who love Him. The Greek verb 'works together' (συνεργεῖ, synergei) is the root of our word 'synergy' — God orchestrates the chaotic, painful threads of our lives into a tapestry of purposeful beauty that can only be fully seen from eternity's perspective.",
      wordOrigins: [
        { word: "Works together (συνεργεῖ, synergei)", origin: "Greek: Root of 'synergy' — to cooperate, to collaborate toward one end. God is actively and skillfully weaving all circumstances into His sovereign plan." },
        { word: "Good (ἀγαθόν, agathon)", origin: "Greek: Ultimate good — not merely pleasant or comfortable, but the highest moral and spiritual good: conformity to the image of Christ (v.29)." },
        { word: "Called (κλητοῖς, kletois)", origin: "Greek: Effectually called — not a general invitation but a specific, sovereign divine summons that actually results in salvation." }
      ],
      context: "Written by Paul from the perspective of his own enormous suffering — beatings, imprisonments, shipwreck, betrayal — Romans 8:28 is not naïve optimism. It is battle-tested theological conviction: God's sovereignty over history includes its darkest chapters, and He writes no wasted verses in the story of those He loves."
    },
    "Philippians-4-13": {
      title: "I Can Do All Things Through Christ",
      explanation: "Perhaps the most frequently quoted — and most frequently misunderstood — verse in the New Testament. Philippians 4:13 is not a promise of athletic success, business prosperity, or achievement of personal ambitions. Read in context (verses 11-12), Paul is speaking about the supernatural ability to be content in ANY circumstance — whether in abundance OR in desperate need. The 'all things' refers to all conditions of life (comfort or deprivation), and the strength is specifically Christ's strength enabling contentment, not human achievement. It is a statement about spiritual resilience and Christ-empowered sufficiency, not worldly success.",
      wordOrigins: [
        { word: "Can do (ἰσχύω, ischuo)", origin: "Greek: 'To have strength, to be able, to be capable' — describing capacity that comes from an external source." },
        { word: "Through (ἐν, en)", origin: "Greek: Literally 'in' — indicating union and relationship. 'In Christ' / 'within the sphere of Christ's strengthening.' Not 'by means of' as a tool but 'within' as a dwelling." },
        { word: "Strengthens (ἐνδυναμοῦντί, endunamounti)", origin: "Greek: Present active participle — Christ is continuously, actively infusing strength. Root of 'dynamic' and 'dynamite.'" }
      ],
      context: "Paul wrote Philippians from prison, chained to a Roman guard, awaiting a trial that could result in his execution. His contentment was not circumstantial — it was sourced entirely in his union with Christ. This verse is the capstone of one of the most joyful documents ever written from one of the most miserable circumstances imaginable."
    }
  };

  // ============================================================
  // CROSS-REFERENCES
  // ============================================================
  const CROSS_REFS = {
    "Genesis-1-1": ["John-1-1", "Hebrews-11-3", "Revelation-21-1"],
    "Genesis-1-3": ["2 Corinthians-4-6", "John-8-12"],
    "Genesis-1-26": ["Genesis-5-1", "Colossians-1-15", "James-3-9"],
    "John-1-1": ["Genesis-1-1", "Colossians-1-16", "Hebrews-1-2"],
    "John-3-16": ["Romans-5-8", "1 John-4-9", "John-1-14"],
    "Romans-8-28": ["Romans-8-29", "Genesis-50-20", "Jeremiah-29-11"],
    "Psalms-23-1": ["John-10-11", "Ezekiel-34-23", "Isaiah-40-11"],
    "Philippians-4-13": ["Philippians-4-11", "2 Corinthians-12-10", "Colossians-1-11"]
  };

  // ============================================================
  // DIVINE WORDS MARKERS
  // (verses where God or Jesus is speaking)
  // ============================================================
  const DIVINE_WORDS = {
    "Genesis-1-3": true,
    "Genesis-1-6": true,
    "Genesis-1-9": true,
    "Genesis-1-11": true,
    "Genesis-1-14": true,
    "Genesis-1-20": true,
    "Genesis-1-22": true,
    "Genesis-1-24": true,
    "Genesis-1-26": true,
    "Genesis-1-28": true,
    "Genesis-1-29": true,
    "Genesis-2-16": true,
    "Genesis-2-17": true,
    "Genesis-2-18": true,
    "Genesis-3-9": true,
    "Genesis-3-11": true,
    "Genesis-3-14": true,
    "Genesis-3-15": true,
    "Genesis-3-16": true,
    "Genesis-3-17": true,
    "John-3-3": true,
    "John-3-5": true,
    "John-3-6": true,
    "John-3-7": true,
    "John-3-8": true,
    "John-3-10": true,
    "John-3-11": true,
    "John-3-12": true,
    "John-3-13": true,
    "John-3-14": true,
    "John-3-15": true,
    "John-3-16": true,
    "John-3-17": true,
    "John-3-18": true,
    "John-3-19": true,
    "John-3-20": true,
    "John-3-21": true
  };

  // ============================================================
  // VERSE OF THE DAY
  // ============================================================
  const VERSE_OF_THE_DAY = [
    { ref: "John 3:16", book: "John", chapter: 3, verse: 16, reflection: "God's love for you is not conditional on your performance, your past, or your worthiness. He loved you while you were still far from Him — and He gave the most precious thing in existence to bring you close. Rest today in the certainty that you are deeply, unconditionally loved." },
    { ref: "Psalms 23:1", book: "Psalms", chapter: 23, verse: 1, reflection: "You have a Shepherd who knows your name, knows your fears, and knows exactly where you need to go. You will not lack what you truly need today. Walk in the confidence that you are led, guarded, and cared for by the God of the universe." },
    { ref: "Romans 8:28", book: "Romans", chapter: 8, verse: 28, reflection: "The pain you are carrying right now is not wasted. God is not absent from your struggle — He is actively weaving it into something that will ultimately bring you good. Trust the Weaver even when you cannot see the pattern." },
    { ref: "Philippians 4:13", book: "Philippians", chapter: 4, verse: 13, reflection: "Whatever you are facing today — whether a mountain of challenge or a valley of depletion — you do not face it in your own strength. Christ is actively strengthening you right now. Draw on that inexhaustible resource." },
    { ref: "Isaiah 40:31", book: "Isaiah", chapter: 40, verse: 31, reflection: "Those who place their confident hope in God don't just survive — they soar. When your own strength runs out, that is precisely when God's strength begins. Wait on Him today with expectant trust." },
    { ref: "Jeremiah 29:11", book: "Jeremiah", chapter: 29, verse: 11, reflection: "God's plans for you are written from a perspective you cannot currently see. What looks like a detour or a dead-end in your story is actually a chapter in a plan that leads to hope and a future. Trust the Author." },
    { ref: "Proverbs 3:5-6", book: "Proverbs", chapter: 3, verse: 5, reflection: "Today, choose trust over understanding. God does not promise to explain every step — He promises to direct your path if you will lean on Him rather than your own limited perspective. Surrender your need to understand, and watch Him guide." }
  ];

  // ============================================================
  // READING PLANS
  // ============================================================
  const READING_PLANS = [
    {
      id: "nt90",
      name: "New Testament in 90 Days",
      description: "Read through the entire New Testament in 90 days at a steady, manageable pace.",
      totalDays: 90,
      books: BOOKS_NT
    },
    {
      id: "bible365",
      name: "Complete Bible in 365 Days",
      description: "Journey through the entire Word of God in one year with daily Old and New Testament readings.",
      totalDays: 365,
      books: ALL_BOOKS
    },
    {
      id: "psalms30",
      name: "Psalms & Proverbs in 30 Days",
      description: "Immerse in Scripture's wisdom and worship literature in one month.",
      totalDays: 30,
      books: ["Psalms", "Proverbs"]
    },
    {
      id: "gospels28",
      name: "The Four Gospels in 28 Days",
      description: "Walk through the life of Jesus across all four Gospel accounts in one month.",
      totalDays: 28,
      books: ["Matthew", "Mark", "Luke", "John"]
    }
  ];

  // ============================================================
  // EXPORT TO WINDOW GLOBAL
  // ============================================================
  window.BIBLE_DATA = {
    books: {
      OT: BOOKS_OT,
      NT: BOOKS_NT,
      all: ALL_BOOKS
    },
    chapterCounts: CHAPTER_COUNTS,
    intros: BOOK_INTROS,
    versions: BIBLE_VERSIONS,
    commentary: COMMENTARY,
    crossRefs: CROSS_REFS,
    divineWords: DIVINE_WORDS,
    verseOfTheDay: VERSE_OF_THE_DAY,
    readingPlans: READING_PLANS
  };

  console.log('[BibleData] ✅ Bible data package loaded successfully.');
  console.log(`[BibleData] 📚 ${ALL_BOOKS.length} books | 4 versions | ${Object.keys(COMMENTARY).length} verse commentaries`);

})();
