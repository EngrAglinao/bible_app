/**
 * ============================================================
 *  BIBLE DATA JS — External Scripture Data File
 *  BibleVault PWA | bibleData.js
 * ============================================================
 *
 *  SCHEMA OVERVIEW:
 *  ----------------
 *  window.BIBLE_DATA = {
 *    versions: {
 *      ESV: { books: { "Genesis": { intro: {...}, chapters: { 1: [ {v:1, t:"In the beginning..."}, ... ] } } } },
 *      NIV: { ... },
 *      NLT: { ... },
 *      RSV: { ... }
 *    },
 *    commentary: {
 *      "Genesis-1-1": {
 *        title: "Verse Title",
 *        explanation: "Full commentary text...",
 *        wordOrigins: [ { word: "beginning", origin: "Hebrew: בְּרֵאשִׁית (bereshit)..." } ],
 *        crossRefs: [ { ref: "John 1:1", text: "In the beginning was the Word..." } ]
 *      }
 *    },
 *    verseOfTheDay: [ { ref: "John 3:16", text: "...", reflection: "..." }, ... ],
 *    divineWords: { "John": { 3: [16], 14: [6] }, "Matthew": { 5: [3,4,5] } }
 *  }
 *
 *  HOW IT INTEGRATES:
 *  ------------------
 *  1. Load via: <script src="bibleData.js"></script> before index.html app scripts.
 *  2. The reader engine calls: window.BIBLE_DATA.versions[currentVersion].books[book].chapters[chapter]
 *  3. Commentary engine calls: window.BIBLE_DATA.commentary[`${book}-${chapter}-${verse}`]
 *  4. Divine words check: window.BIBLE_DATA.divineWords[book]?.[chapter]?.includes(verse)
 * ============================================================
 */

(function () {
  'use strict';

  // ============================================================
  //  ALL 66 BOOKS — Metadata, Introductions, and Chapter Counts
  // ============================================================
  const BOOK_META = {
    // OLD TESTAMENT
    "Genesis":       { abbr:"Gen",  testament:"OT", category:"Law",          chapters:50, author:"Moses (traditionally)",           date:"c. 1446–1406 BC", intro:"Genesis, meaning 'origin' or 'beginning,' is the foundational book of Scripture. It narrates creation, the fall of humanity, God's covenant with Abraham, the lives of the patriarchs Isaac, Jacob, and Joseph, and Israel's early history in Egypt. Written by Moses under divine inspiration, it establishes the theological framework—Creator God, sinful humanity, and redemptive promise—upon which all other Scripture is built." },
    "Exodus":        { abbr:"Exo",  testament:"OT", category:"Law",          chapters:40, author:"Moses",                           date:"c. 1446–1406 BC", intro:"Exodus records God's miraculous deliverance of Israel from Egyptian slavery through Moses. It encompasses the ten plagues, the Passover, crossing the Red Sea, God's covenant at Sinai, the giving of the Ten Commandments, and detailed instructions for the Tabernacle. The book reveals God as Redeemer, Holy Lawgiver, and Covenant Keeper." },
    "Leviticus":     { abbr:"Lev",  testament:"OT", category:"Law",          chapters:27, author:"Moses",                           date:"c. 1446–1406 BC", intro:"Leviticus is God's detailed instruction to Israel about holy living, worship, and priestly duties. It outlines sacrificial systems, purity laws, feasts, and the concept of atonement—all pointing forward to the ultimate sacrifice of Jesus Christ. Central to Leviticus is the refrain: 'Be holy, for I the LORD your God am holy.'" },
    "Numbers":       { abbr:"Num",  testament:"OT", category:"Law",          chapters:36, author:"Moses",                           date:"c. 1446–1406 BC", intro:"Numbers chronicles Israel's 40 years of wilderness wandering between Sinai and the plains of Moab. It records two censuses (hence the name), Israel's repeated faithlessness, divine judgments, and God's faithfulness. Key episodes include the twelve spies, Korah's rebellion, and the bronze serpent—a type of Christ lifted up for healing." },
    "Deuteronomy":   { abbr:"Deu",  testament:"OT", category:"Law",          chapters:34, author:"Moses",                           date:"c. 1406 BC",      intro:"Deuteronomy ('second law') consists of Moses' farewell sermons to Israel before they enter Canaan. He recaps the Exodus, reiterates the Law, and calls the nation to covenant faithfulness. The famous Shema ('Hear, O Israel') and the promised blessings and curses are key passages. Moses dies at the book's end, sight of Canaan in view." },
    "Joshua":        { abbr:"Jos",  testament:"OT", category:"History",      chapters:24, author:"Joshua / Phinehas",               date:"c. 1400–1370 BC", intro:"Joshua records the fulfillment of God's promise as Israel, under Joshua's leadership, conquers and settles Canaan. Key events include crossing the Jordan, the fall of Jericho, military campaigns, and the distribution of land among the twelve tribes. It demonstrates God's faithfulness to every promise He makes." },
    "Judges":        { abbr:"Jdg",  testament:"OT", category:"History",      chapters:21, author:"Samuel (traditionally)",          date:"c. 1045–1000 BC", intro:"Judges reveals a tragic cycle: Israel sins, suffers oppression, cries out, and God raises a judge-deliverer. Figures like Deborah, Gideon, and Samson illustrate both God's patience and the spiritual chaos when 'everyone did what was right in their own eyes.' It underscores humanity's deep need for a King—ultimately Christ." },
    "Ruth":          { abbr:"Rth",  testament:"OT", category:"History",      chapters:4,  author:"Unknown (Samuel traditionally)",  date:"c. 1100–1000 BC", intro:"Ruth is a beautiful story of loyalty, redemption, and providence set in the days of the Judges. A Moabite widow, Ruth clings to her Israelite mother-in-law Naomi and finds favor with Boaz, a kinsman-redeemer. This story foreshadows Christ as our Kinsman-Redeemer and includes Ruth in the messianic lineage." },
    "1 Samuel":      { abbr:"1Sa",  testament:"OT", category:"History",      chapters:31, author:"Samuel / Nathan / Gad",           date:"c. 1000–900 BC",  intro:"1 Samuel covers the transition from judges to monarchy. Samuel is Israel's last judge and first prophet of the new era. The book narrates Saul's rise and failure as king, and God's choosing of young David—a man after His own heart. It explores themes of obedience, leadership, and divine sovereignty." },
    "2 Samuel":      { abbr:"2Sa",  testament:"OT", category:"History",      chapters:24, author:"Nathan / Gad",                   date:"c. 1000–900 BC",  intro:"2 Samuel records David's reign over Israel—his triumphs, worship, covenant with God (2 Sam 7), and his devastating sins with Bathsheba and Uriah. Despite failures, God's covenant grace with David points directly to the messianic King who will reign forever." },
    "1 Kings":       { abbr:"1Ki",  testament:"OT", category:"History",      chapters:22, author:"Jeremiah (traditionally)",        date:"c. 560–540 BC",   intro:"1 Kings documents Israel under Solomon's glory—temple construction, wisdom, and wealth—followed by tragic apostasy and the kingdom's division into Israel (north) and Judah (south). The prophet Elijah's dramatic ministry to corrupt King Ahab anchors the latter half of the book." },
    "2 Kings":       { abbr:"2Ki",  testament:"OT", category:"History",      chapters:25, author:"Jeremiah (traditionally)",        date:"c. 560–540 BC",   intro:"2 Kings continues the history of divided Israel, charting the ministries of Elisha and numerous kings—mostly evil. It culminates in Assyria's conquest of northern Israel (722 BC) and Babylon's destruction of Jerusalem and the Temple (586 BC). Despite judgment, glimmers of hope remain in God's covenant promises." },
    "1 Chronicles":  { abbr:"1Ch",  testament:"OT", category:"History",      chapters:29, author:"Ezra (traditionally)",            date:"c. 450–425 BC",   intro:"1 Chronicles, written for returning exiles, traces Israel's genealogy from Adam to David and recounts David's reign with emphasis on his religious reforms and preparations for the Temple. It offers a theological history focused on worship and the importance of seeking God." },
    "2 Chronicles":  { abbr:"2Ch",  testament:"OT", category:"History",      chapters:36, author:"Ezra (traditionally)",            date:"c. 450–425 BC",   intro:"2 Chronicles covers Solomon's Temple construction and the kings of Judah through Jerusalem's fall. It emphasizes worship, covenant faithfulness, and the consequences of apostasy. Significantly, it ends with Cyrus' decree to rebuild the Temple—pointing to restoration and hope." },
    "Ezra":          { abbr:"Ezr",  testament:"OT", category:"History",      chapters:10, author:"Ezra",                            date:"c. 456–444 BC",   intro:"Ezra records the return of Jewish exiles to Jerusalem in two waves—first under Zerubbabel (temple rebuilding) and then under Ezra himself (spiritual reformation). It highlights God's sovereign use of pagan kings and Ezra's passion for God's Word and covenant renewal." },
    "Nehemiah":      { abbr:"Neh",  testament:"OT", category:"History",      chapters:13, author:"Nehemiah",                        date:"c. 445–420 BC",   intro:"Nehemiah is a masterclass in leadership, prayer, and perseverance. Nehemiah leads the rebuilding of Jerusalem's walls in 52 days despite fierce opposition. Alongside Ezra, he orchestrates national covenant renewal and community reformation, modeling a life of prayer-saturated service." },
    "Esther":        { abbr:"Est",  testament:"OT", category:"History",      chapters:10, author:"Mordecai / Unknown",              date:"c. 484–465 BC",   intro:"Esther is a remarkable account of divine providence—God's name never appears, yet His fingerprints are everywhere. Queen Esther risks her life to save the Jewish people from Haman's genocide. It celebrates courage, identity, and God's hidden but faithful orchestration of history for His people's deliverance." },
    "Job":           { abbr:"Job",  testament:"OT", category:"Poetry",       chapters:42, author:"Unknown (Job himself possibly)",  date:"Unknown (Patriarchal era?)", intro:"Job confronts the profound mystery of suffering. A righteous man experiences catastrophic loss, wrestles with his friends' false theology, and ultimately encounters God in the whirlwind. Job teaches that suffering is not always punishment, that God is sovereignly wise even in silence, and that true faith perseveres through darkness." },
    "Psalms":        { abbr:"Psa",  testament:"OT", category:"Poetry",       chapters:150,author:"David, Asaph, Sons of Korah, others",date:"c. 1440–400 BC","intro":"The Psalms are Israel's hymnbook—150 songs covering the full range of human emotion: praise, lament, confession, trust, and thanksgiving. Attributed largely to David, they illuminate Christ in remarkable prophetic detail (Ps 22, 110) and remain the church's greatest treasury of devotional prayer and worship literature." },
    "Proverbs":      { abbr:"Pro",  testament:"OT", category:"Poetry",       chapters:31, author:"Solomon / Agur / Lemuel",         date:"c. 970–700 BC",   intro:"Proverbs is a collection of practical wisdom for righteous living. It begins with the fear of the LORD as wisdom's foundation and offers guidance on relationships, work, speech, money, and character. Its famous portrayal of Wisdom personified (Prov 8) points to Christ as the embodiment of divine wisdom." },
    "Ecclesiastes":  { abbr:"Ecc",  testament:"OT", category:"Poetry",       chapters:12, author:"Qohelet / Solomon (traditionally)",date:"c. 935–931 BC",  intro:"Ecclesiastes wrestles honestly with life's meaning 'under the sun.' The Preacher explores work, pleasure, wisdom, and death, repeatedly concluding 'vanity of vanities.' Yet the book arrives at a profound conclusion: fear God and keep His commandments, for this is the whole duty of humanity." },
    "Song of Songs": { abbr:"Sng",  testament:"OT", category:"Poetry",       chapters:8,  author:"Solomon",                        date:"c. 965 BC",       intro:"Song of Songs is a celebration of love, desire, and marital intimacy. Read literally, it honors human romance as God's gift. Allegorically, it portrays the love between God and Israel, and Christ and His church. It stands as Scripture's most lyrical affirmation that love—in its purity—is sacred." },
    "Isaiah":        { abbr:"Isa",  testament:"OT", category:"Prophecy",     chapters:66, author:"Isaiah",                         date:"c. 740–700 BC",   intro:"Isaiah is the 'evangelical prophet'—his 66 chapters mirror the Bible's 66 books. He pronounces judgment on Judah and nations while unveiling breathtaking visions of the coming Messiah: the virgin birth (7:14), the Servant Songs (42–53), and the glorious new creation (65–66). Isaiah 53 is arguably the clearest prophetic portrait of the crucified Christ." },
    "Jeremiah":      { abbr:"Jer",  testament:"OT", category:"Prophecy",     chapters:52, author:"Jeremiah",                       date:"c. 626–585 BC",   intro:"Jeremiah, the weeping prophet, ministers during Judah's darkest hour—the Babylonian crisis. He delivers God's call to repentance, witnesses Jerusalem's fall, and suffers personal anguish for his message. Yet he proclaims the New Covenant (31:31–34), a promise fulfilled in Christ, making him one of Scripture's most important prophetic voices." },
    "Lamentations":  { abbr:"Lam",  testament:"OT", category:"Prophecy",     chapters:5,  author:"Jeremiah",                       date:"c. 586 BC",       intro:"Lamentations is five acrostic poems of grief over Jerusalem's destruction. Written by Jeremiah, they express profound communal sorrow, honest confession of sin, and yet—in the book's center—an extraordinary declaration of hope: 'His mercies are new every morning; great is Your faithfulness' (3:22–23)." },
    "Ezekiel":       { abbr:"Eze",  testament:"OT", category:"Prophecy",     chapters:48, author:"Ezekiel",                        date:"c. 593–571 BC",   intro:"Ezekiel, a priest-prophet in Babylonian exile, receives extraordinary visions—the living creatures, the valley of dry bones, and the restored Temple. He diagnoses Israel's spiritual adultery, announces God's departing and returning glory, and envisions a future where God gives His people new hearts and His Spirit dwells among them." },
    "Daniel":        { abbr:"Dan",  testament:"OT", category:"Prophecy",     chapters:12, author:"Daniel",                         date:"c. 605–535 BC",   intro:"Daniel combines historical narrative and apocalyptic prophecy. A Jewish exile in Babylon, Daniel and his friends demonstrate courageous faith (lions' den, fiery furnace). His visions—the statue of world empires, the seventy weeks, and the Son of Man—are among Scripture's most significant prophetic frameworks, pointing to Christ's kingdom." },
    "Hosea":         { abbr:"Hos",  testament:"OT", category:"Prophecy",     chapters:14, author:"Hosea",                          date:"c. 753–715 BC",   intro:"Hosea's personal tragedy—his marriage to an unfaithful wife—becomes a living parable of God's covenantal love for unfaithful Israel. Despite Israel's spiritual adultery with Baals, God pursues His people with relentless love. Hosea's message: divine love does not abandon; it redeems and restores." },
    "Joel":          { abbr:"Jol",  testament:"OT", category:"Prophecy",     chapters:3,  author:"Joel",                           date:"c. 835–796 BC",   intro:"Joel interprets a devastating locust plague as a harbinger of the Day of the LORD—a call to national repentance. His most celebrated prophecy (2:28–32) announces God's Spirit poured out on all people, quoted by Peter at Pentecost as its fulfillment." },
    "Amos":          { abbr:"Amo",  testament:"OT", category:"Prophecy",     chapters:9,  author:"Amos",                           date:"c. 760–750 BC",   intro:"Amos, a shepherd-turned-prophet, thunders against Israel's social injustice, religious hypocrisy, and complacency. His call for justice to 'roll on like a river' (5:24) remains one of Scripture's most powerful ethical imperatives. He warns of the Day of the LORD as darkness, not light, for the unrepentant." },
    "Obadiah":       { abbr:"Oba",  testament:"OT", category:"Prophecy",     chapters:1,  author:"Obadiah",                        date:"c. 586 BC",       intro:"Obadiah, the Bible's shortest book, pronounces judgment on Edom for betraying Judah at Jerusalem's fall. It warns against pride and violence against God's people, affirming that 'the Day of the LORD is near for all nations' and that ultimate deliverance belongs to God's kingdom." },
    "Jonah":         { abbr:"Jon",  testament:"OT", category:"Prophecy",     chapters:4,  author:"Jonah",                          date:"c. 785–760 BC",   intro:"Jonah is the story of a reluctant prophet, a great fish, and God's scandalous mercy extended to Israel's enemies in Nineveh. Jonah's disobedience, prayer from the deep, and resentment at God's grace expose narrow nationalism. Jesus cited Jonah's three days in the fish as a sign of His own death and resurrection." },
    "Micah":         { abbr:"Mic",  testament:"OT", category:"Prophecy",     chapters:7,  author:"Micah",                          date:"c. 735–700 BC",   intro:"Micah speaks truth to power—condemning corrupt leaders, false prophets, and social injustice in Israel and Judah. He predicts Jerusalem's fall and the Messiah's birth in Bethlehem (5:2). His summary of true religion stands timeless: 'Act justly, love mercy, and walk humbly with your God' (6:8)." },
    "Nahum":         { abbr:"Nah",  testament:"OT", category:"Prophecy",     chapters:3,  author:"Nahum",                          date:"c. 663–612 BC",   intro:"Nahum announces Nineveh's fall as divine justice—roughly 150 years after Jonah's successful mission. God's patience with Nineveh's renewed wickedness has ended. The book powerfully declares God's sovereignty over nations and His ultimate justice against all that opposes His righteousness." },
    "Habakkuk":      { abbr:"Hab",  testament:"OT", category:"Prophecy",     chapters:3,  author:"Habakkuk",                       date:"c. 612–589 BC",   intro:"Habakkuk dares to wrestle with God about injustice and divine silence. Why do the wicked prosper? Why does God use Babylon to judge Judah? God's answer: 'the righteous shall live by his faith' (2:4)—a verse that ignited the Reformation through Luther's rediscovery of justification by faith alone." },
    "Zephaniah":     { abbr:"Zep",  testament:"OT", category:"Prophecy",     chapters:3,  author:"Zephaniah",                      date:"c. 640–621 BC",   intro:"Zephaniah announces the coming Day of the LORD with terrifying force, calling Judah to repentance before judgment falls. Yet the book ends with one of Scripture's most tender promises: God rejoicing over His people with singing (3:17)—a picture of divine delight in His redeemed remnant." },
    "Haggai":        { abbr:"Hag",  testament:"OT", category:"Prophecy",     chapters:2,  author:"Haggai",                         date:"c. 520 BC",       intro:"Haggai delivers four short messages to returning exiles who have neglected rebuilding the Temple while building their own houses. He challenges misplaced priorities and encourages Zerubbabel with the promise that the latter glory of God's house will surpass the former—pointing to Christ's presence as the true Temple." },
    "Zechariah":     { abbr:"Zec",  testament:"OT", category:"Prophecy",     chapters:14, author:"Zechariah",                      date:"c. 520–480 BC",   intro:"Zechariah is the most messianic of the minor prophets. Eight night visions, prophetic oracles, and apocalyptic imagery all converge on the coming King who enters Jerusalem on a donkey (9:9), is betrayed for thirty pieces of silver (11:12), is pierced (12:10), and whose feet stand on the Mount of Olives (14:4)." },
    "Malachi":       { abbr:"Mal",  testament:"OT", category:"Prophecy",     chapters:4,  author:"Malachi",                        date:"c. 430 BC",       intro:"Malachi, the last OT prophet, confronts post-exilic Israel's spiritual apathy, corrupt worship, and covenant unfaithfulness. He promises a coming messenger to prepare God's way (3:1—fulfilled by John the Baptist) and the Sun of Righteousness rising with healing (4:2—fulfilled in Christ)." },

    // NEW TESTAMENT
    "Matthew":       { abbr:"Mat",  testament:"NT", category:"Gospel",       chapters:28, author:"Matthew (Levi)",                 date:"c. AD 50–70",     intro:"Matthew's Gospel presents Jesus as the promised Messiah-King, writing primarily for a Jewish audience. He structures his account around five great discourses, intentionally mirroring the Pentateuch. From the Sermon on the Mount to the Great Commission, Matthew demonstrates how Jesus fulfills every OT promise, launching the Kingdom of God." },
    "Mark":          { abbr:"Mrk",  testament:"NT", category:"Gospel",       chapters:16, author:"Mark (John Mark)",              date:"c. AD 55–65",     intro:"Mark is the shortest, fastest-paced Gospel—the word 'immediately' appears over 40 times. Written for a Roman audience, Mark emphasizes Jesus as the Suffering Servant whose authority over demons, disease, and death reveals His divine identity. The cross stands at the center, and discipleship means taking up one's own cross." },
    "Luke":          { abbr:"Luk",  testament:"NT", category:"Gospel",       chapters:24, author:"Luke (the physician)",           date:"c. AD 60–62",     intro:"Luke, a meticulous historian and physician, writes the most comprehensive Gospel narrative. He highlights Jesus' compassion for the poor, women, Samaritans, and sinners. Key uniquely Lukan parables—the Prodigal Son, the Good Samaritan, the Pharisee and Tax Collector—reveal God's inclusive, seeking grace." },
    "John":          { abbr:"Jhn",  testament:"NT", category:"Gospel",       chapters:21, author:"John (the Apostle)",             date:"c. AD 85–95",     intro:"John's Gospel is the most theological of the four, written so 'you may believe that Jesus is the Christ, the Son of God' (20:31). Seven 'I AM' declarations and seven miraculous signs structure the book. John's prologue (1:1–18) is among the most profound statements of Christ's divine nature in all of Scripture." },
    "Acts":          { abbr:"Act",  testament:"NT", category:"History",      chapters:28, author:"Luke",                          date:"c. AD 62",        intro:"Acts of the Apostles is the sequel to Luke's Gospel, chronicling the Holy Spirit's explosive expansion of the early church from Jerusalem to Rome. Pentecost, Peter's preaching, Paul's missionary journeys, and the church's multicultural growth demonstrate that the risen Christ is actively building His kingdom through the Spirit-empowered church." },
    "Romans":        { abbr:"Rom",  testament:"NT", category:"Epistle",      chapters:16, author:"Paul",                          date:"c. AD 57",        intro:"Romans is Paul's magnum opus—the most systematic presentation of the gospel in Scripture. It covers humanity's universal sinfulness, justification by faith alone, sanctification, election, and the future of Israel. Martin Luther called it 'the masterpiece of the New Testament,' and its rediscovery sparked the Protestant Reformation." },
    "1 Corinthians": { abbr:"1Co",  testament:"NT", category:"Epistle",      chapters:16, author:"Paul",                          date:"c. AD 55",        intro:"Paul addresses a fractured, worldly church in cosmopolitan Corinth, tackling divisions, sexual immorality, lawsuits, spiritual gifts, and the resurrection. Chapter 13's hymn to love and chapter 15's resurrection defense are among the most celebrated passages in the NT, showing the gospel's power to transform community." },
    "2 Corinthians": { abbr:"2Co",  testament:"NT", category:"Epistle",      chapters:13, author:"Paul",                          date:"c. AD 55–56",     intro:"2 Corinthians is Paul's most personal letter—a defense of his apostolic ministry amid severe opposition. He reveals his sufferings, his theology of weakness and grace ('My grace is sufficient for you'), and his vision of ministry as carrying the treasure of the gospel in fragile clay jars." },
    "Galatians":     { abbr:"Gal",  testament:"NT", category:"Epistle",      chapters:6,  author:"Paul",                          date:"c. AD 48–55",     intro:"Galatians is the Magna Carta of Christian liberty. Paul confronts the Judaizers who added circumcision to faith and declares: 'a person is not justified by works of the law but through faith in Jesus Christ' (2:16). It powerfully contrasts law and grace, slavery and freedom, flesh and Spirit." },
    "Ephesians":     { abbr:"Eph",  testament:"NT", category:"Epistle",      chapters:6,  author:"Paul",                          date:"c. AD 60–62",     intro:"Ephesians soars with the heights of Christian privilege and identity. Paul unfolds the mystery of the church as Christ's body, called from every nation. Chapters 1–3 celebrate spiritual blessings in Christ; chapters 4–6 call believers to walk worthy—in unity, purity, love, and spiritual warfare." },
    "Philippians":   { abbr:"Php",  testament:"NT", category:"Epistle",      chapters:4,  author:"Paul",                          date:"c. AD 61–62",     intro:"Philippians is Paul's letter of joy, written from prison. 'Rejoice in the Lord always' is its heartbeat (4:4). The Christ-hymn of chapter 2 (the kenosis passage) and the call to 'think on whatever is true, noble, right, pure, lovely, and admirable' (4:8) make this one of the most beloved of Paul's letters." },
    "Colossians":    { abbr:"Col",  testament:"NT", category:"Epistle",      chapters:4,  author:"Paul",                          date:"c. AD 60–62",     intro:"Colossians exalts the supremacy and all-sufficiency of Jesus Christ against syncretistic philosophy that diminished Him. The Christ-hymn of 1:15–20—'He is the image of the invisible God, the firstborn of all creation'—is the NT's most exalted statement of Christ's cosmic lordship and creative preeminence." },
    "1 Thessalonians":{ abbr:"1Th", testament:"NT", category:"Epistle",      chapters:5,  author:"Paul",                          date:"c. AD 51",        intro:"1 Thessalonians is likely Paul's earliest surviving letter, commending a young church for their faith under persecution. It addresses concerns about believers who have died before Christ's return and provides the clearest NT passage on the rapture (4:13–18). 'Give thanks in all circumstances' (5:18) is its practical climax." },
    "2 Thessalonians":{ abbr:"2Th", testament:"NT", category:"Epistle",      chapters:3,  author:"Paul",                          date:"c. AD 51–52",     intro:"2 Thessalonians corrects misunderstandings about the Day of the Lord—some had stopped working, believing it had already come. Paul clarifies signs preceding Christ's return, including the 'man of lawlessness,' and calls believers to steadfast faithfulness and disciplined work while waiting." },
    "1 Timothy":     { abbr:"1Ti",  testament:"NT", category:"Epistle",      chapters:6,  author:"Paul",                          date:"c. AD 62–64",     intro:"1 Timothy is Paul's pastoral manual to his young protégé leading the Ephesian church. It addresses sound doctrine, public worship, qualifications for elders and deacons, and the proper handling of various groups within the congregation. The famous statement 'Christ Jesus came into the world to save sinners' (1:15) anchors the whole." },
    "2 Timothy":     { abbr:"2Ti",  testament:"NT", category:"Epistle",      chapters:4,  author:"Paul",                          date:"c. AD 67",        intro:"2 Timothy is Paul's final letter—a moving farewell from death row in Rome. He charges Timothy to guard the gospel, endure hardship, preach the Word, and finish strong. The call to 'fan into flame the gift of God' and the great declaration 'I have fought the good fight' (4:7) make this letter deeply personal and eternally relevant." },
    "Titus":         { abbr:"Tit",  testament:"NT", category:"Epistle",      chapters:3,  author:"Paul",                          date:"c. AD 63–65",     intro:"Titus addresses the young church leader on Crete, a morally challenging context. Paul emphasizes sound doctrine that produces godly living, qualifications for elders, and the transforming grace of God that 'trains us to renounce ungodliness and worldly passions' (2:12)." },
    "Philemon":      { abbr:"Phm",  testament:"NT", category:"Epistle",      chapters:1,  author:"Paul",                          date:"c. AD 60–62",     intro:"Philemon is Paul's shortest letter—a personal appeal to accept back the runaway slave Onesimus as 'a dear brother.' This intimate letter demonstrates the gospel's power to transform social relationships and models Christian advocacy, forgiveness, and the radical equality that faith in Christ creates." },
    "Hebrews":       { abbr:"Heb",  testament:"NT", category:"Epistle",      chapters:13, author:"Unknown (Paul, Apollos, Priscilla?)", date:"c. AD 60–70", intro:"Hebrews is a masterful theological argument for Christ's absolute superiority—over angels, Moses, Aaron, the Levitical priesthood, and the old covenant. Its Hall of Faith (chapter 11) celebrates OT heroes, while 'fixing our eyes on Jesus' (12:2) calls believers to patient endurance. The warning passages are among the NT's most sobering." },
    "James":         { abbr:"Jas",  testament:"NT", category:"Epistle",      chapters:5,  author:"James (brother of Jesus)",      date:"c. AD 44–49",     intro:"James is the NT's most practical book—'faith without works is dead' (2:26). Written for Jewish believers under persecution, it addresses trials, temptation, speech control, favoritism, and prayer. Its wisdom tradition echoes Proverbs while grounding ethics firmly in the 'royal law'—love your neighbor as yourself." },
    "1 Peter":       { abbr:"1Pe",  testament:"NT", category:"Epistle",      chapters:5,  author:"Peter (the Apostle)",           date:"c. AD 60–65",     intro:"1 Peter is a letter of hope for suffering believers scattered across the Roman Empire. Peter calls Christians 'a chosen people, a royal priesthood, a holy nation' and calls them to holy living, respect for authority, Christlike suffering, and firm resistance to the devil. It is the NT's premier theology of suffering." },
    "2 Peter":       { abbr:"2Pe",  testament:"NT", category:"Epistle",      chapters:3,  author:"Peter (the Apostle)",           date:"c. AD 64–68",     intro:"2 Peter warns urgently against false teachers who deny Christ's return and promote licentiousness. Peter grounds assurance in the eyewitness testimony of the Transfiguration and the prophetic Word. His promise that God is 'not wishing that any should perish' (3:9) reveals the heart of divine patience." },
    "1 John":        { abbr:"1Jn",  testament:"NT", category:"Epistle",      chapters:5,  author:"John (the Apostle)",            date:"c. AD 85–95",     intro:"1 John tests genuine faith through three criteria: doctrinal (confessing Christ came in the flesh), moral (walking in light, not sin), and relational (loving one another). The book's declaration 'God is love' (4:8, 16) and its assurance verses (5:13) make it a foundational text for Christian confidence and community." },
    "2 John":        { abbr:"2Jn",  testament:"NT", category:"Epistle",      chapters:1,  author:"John (the Apostle)",            date:"c. AD 85–95",     intro:"2 John, addressed to 'the elect lady and her children,' warns against receiving false teachers who deny the Incarnation. Its call to 'walk in love' while maintaining doctrinal boundaries reflects the essential NT balance between grace and truth." },
    "3 John":        { abbr:"3Jn",  testament:"NT", category:"Epistle",      chapters:1,  author:"John (the Apostle)",            date:"c. AD 85–95",     intro:"3 John commends Gaius for his hospitality to traveling missionaries and confronts Diotrephes who loves preeminence and refuses apostolic authority. It illustrates early church dynamics and the importance of supporting gospel workers financially and practically." },
    "Jude":          { abbr:"Jud",  testament:"NT", category:"Epistle",      chapters:1,  author:"Jude (brother of Jesus)",       date:"c. AD 65–80",     intro:"Jude is a passionate call to 'contend earnestly for the faith' against ungodly infiltrators who pervert grace into license. Drawing on Jewish apocalyptic tradition, Jude uses vivid imagery to warn against apostasy. Its doxology—'to him who is able to keep you from stumbling' (v.24–25)—is one of Scripture's most beloved benedictions." },
    "Revelation":    { abbr:"Rev",  testament:"NT", category:"Prophecy",     chapters:22, author:"John (the Apostle)",            date:"c. AD 95",        intro:"Revelation is the NT's great apocalyptic drama—a letter from the exiled Apostle John to seven persecuted churches. Through symbol-saturated visions, it unveils Christ as the triumphant Lamb, exposes the beast-empires of history, and culminates in the new heaven and new earth where God dwells with His people. 'Behold, I am making all things new' (21:5)." }
  };

  // ============================================================
  //  VERSE OF THE DAY DATA
  // ============================================================
  const VERSE_OF_THE_DAY = [
    { ref:"John 3:16",      version:"ESV", text:"For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.", reflection:"This verse is the gospel in miniature. God's love is not abstract—it is sacrificial and specific. He gave. The question for us is: do we believe?" },
    { ref:"Jeremiah 29:11", version:"ESV", text:"For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.", reflection:"Spoken to exiles in Babylon, this promise reminds us that even in our darkest seasons, God is writing a story of hope—not harm—for our lives." },
    { ref:"Romans 8:28",    version:"ESV", text:"And we know that for those who love God all things work together for good, for those who are called according to his purpose.", reflection:"Not all things are good, but God works all things—even our deepest wounds—toward an ultimate good we may only see in eternity." },
    { ref:"Philippians 4:13",version:"ESV",text:"I can do all things through him who strengthens me.", reflection:"Paul wrote this from prison. The 'all things' means enduring any circumstance—abundance or need—through Christ's empowering presence." },
    { ref:"Psalm 23:1",     version:"ESV", text:"The LORD is my shepherd; I shall not want.", reflection:"David, once a literal shepherd, knew exactly what it meant to have a good shepherd. And he found that God was better than the best shepherd he'd ever been." },
    { ref:"Isaiah 40:31",   version:"ESV", text:"But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.", reflection:"Waiting is not passive—it is the active, faith-filled posture of trusting God's timing over our own. In that waiting, supernatural strength is given." },
    { ref:"Matthew 11:28",  version:"ESV", text:"Come to me, all who labor and are heavy laden, and I will give you rest.", reflection:"Jesus' invitation is unconditional—not to the strong or religious, but to the weary and burdened. The rest He offers is not escape, but His presence." },
    { ref:"Proverbs 3:5-6", version:"ESV", text:"Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.", reflection:"Total trust is not naive—it is the wisest posture before an omniscient God who sees every path, every pitfall, and every perfect outcome." },
    { ref:"2 Timothy 3:16", version:"ESV", text:"All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.", reflection:"Every word you read in this app carries divine breath. Scripture is not merely ancient wisdom—it is God speaking to you, today, now." },
    { ref:"Hebrews 11:1",   version:"ESV", text:"Now faith is the assurance of things hoped for, the conviction of things not seen.", reflection:"Faith is not wishful thinking—it is the substance-giving confidence that what God has promised is as real as what we see with our eyes." }
  ];

  // ============================================================
  //  READING PLANS
  // ============================================================
  const READING_PLANS = [
    {
      id: "nt90",
      name: "New Testament in 90 Days",
      description: "Read through the entire New Testament in 90 days, about 3 chapters per day.",
      totalDays: 90,
      books: ["Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"]
    },
    {
      id: "bible365",
      name: "Bible in a Year",
      description: "Read through the entire Bible in 365 days, about 3-4 chapters per day.",
      totalDays: 365,
      books: Object.keys(BOOK_META)
    },
    {
      id: "psalms30",
      name: "Psalms & Proverbs in 30 Days",
      description: "Journey through the wisdom books in one month.",
      totalDays: 30,
      books: ["Psalms","Proverbs"]
    },
    {
      id: "gospels28",
      name: "The Four Gospels in 28 Days",
      description: "Read through Matthew, Mark, Luke and John in four weeks.",
      totalDays: 28,
      books: ["Matthew","Mark","Luke","John"]
    }
  ];

  // ============================================================
  //  DIVINE WORDS INDEX
  //  Maps book → chapter → [verse numbers] spoken by God/Jesus
  // ============================================================
  const DIVINE_WORDS = {
    "John": {
      3:  [16,17,18],
      8:  [12,31,32,34,36,51,58],
      10: [7,9,10,11,14,27,28,29,30],
      11: [25,26],
      14: [1,2,3,6,7,13,14,15,21,23,27],
      15: [1,4,5,7,9,10,12,13,16],
      17: [1,2,3,4,5,6,9,11,13,17,20,21,22,23,24,25,26]
    },
    "Matthew": {
      5:  [3,4,5,6,7,8,9,10,11,12,17,18,19,20,21,22],
      6:  [9,10,11,12,13,19,20,21,24,25,26,27,28,29,30,31,32,33,34],
      11: [28,29,30],
      16: [18,19],
      22: [37,38,39,40],
      25: [34,35,36,40],
      28: [18,19,20]
    },
    "Mark": {
      16: [15,16]
    },
    "Luke": {
      4:  [18,19],
      15: [4,5,6,7],
      19: [10]
    },
    "Revelation": {
      1:  [8,17,18],
      2:  [1,8,12,18],
      21: [5,6,7],
      22: [12,13,16]
    },
    "Genesis": {
      1:  [3,6,9,11,14,20,24,26,28,29,30],
      2:  [16,17,18]
    },
    "Exodus": {
      3:  [14,15],
      20: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
    }
  };

  // ============================================================
  //  COMMENTARY DATA
  //  Key: "BookName-Chapter-Verse"
  // ============================================================
  const COMMENTARY = {
    "John-3-16": {
      title: "The Gospel in One Verse",
      explanation: "This is perhaps the most recognized verse in all of Scripture—often called 'the gospel in miniature.' John 3:16 encapsulates the entire redemptive story: divine motivation (love), divine action (gave), divine scope (the world), divine provision (his only Son), divine condition (believes), and dual outcome (not perish / eternal life). Jesus is speaking to Nicodemus, a Pharisee who came by night—ironically, this most public of all gospel statements was first spoken in private.",
      wordOrigins: [
        { word: "so loved", origin: "Greek: οὕτως ἠγάπησεν (houtōs ēgapēsen) — 'loved in this way/manner.' The emphasis is not on the degree but the manner of love, demonstrated by what God actually did." },
        { word: "world", origin: "Greek: κόσμον (kosmon) — 'the ordered world system including all humanity.' Not merely Israel but the entire human race is in view." },
        { word: "only Son", origin: "Greek: μονογενῆ (monogenē) — 'one of a kind, unique.' Not merely that Jesus is the only begotten, but that He is utterly incomparable in His divine nature." },
        { word: "perish", origin: "Greek: ἀπόληται (apolētai) — 'to be destroyed, ruined completely.' Used of utter and final destruction, contrasting with the fullness of eternal life." }
      ],
      crossRefs: [
        { ref: "Romans 5:8", text: "God shows his love for us in that while we were still sinners, Christ died for us." },
        { ref: "1 John 4:9", text: "In this the love of God was made manifest among us, that God sent his only Son into the world, so that we might live through him." },
        { ref: "John 1:14", text: "And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth." }
      ]
    },
    "Genesis-1-1": {
      title: "In the Beginning",
      explanation: "The opening statement of the entire Bible establishes three foundational theological pillars in seven Hebrew words (בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ). First, time had a beginning—God is not bound by it. Second, creation is ex nihilo ('out of nothing')—matter is not eternal. Third, the Creator is personal—Elohim, a plural noun used with a singular verb, hinting at the Trinitarian nature later fully revealed. John 1:1 deliberately echoes this verse to present Jesus as the divine Agent of creation.",
      wordOrigins: [
        { word: "In the beginning", origin: "Hebrew: בְּרֵאשִׁית (bereshit) — The first word of the Hebrew Bible. 'Reshit' denotes the very start of a sequence, the absolute origin point." },
        { word: "created", origin: "Hebrew: בָּרָא (bara) — Used exclusively of divine creative action in the OT. Only God 'bara's. Humans make things from existing material; God creates from nothing." },
        { word: "God", origin: "Hebrew: אֱלֹהִים (Elohim) — A plural form used with a singular verb ('created'), suggesting a divine fullness or plurality within the Godhead—a hint of the Trinity." },
        { word: "heavens and the earth", origin: "Hebrew: הַשָּׁמַיִם וְאֵת הָאָרֶץ (hashamayim ve'et ha'aretz) — A Hebrew merism for the totality of the created order—everything that exists." }
      ],
      crossRefs: [
        { ref: "John 1:1", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
        { ref: "Colossians 1:16", text: "For by him all things were created, in heaven and on earth, visible and invisible..." },
        { ref: "Hebrews 11:3", text: "By faith we understand that the universe was created by the word of God..." }
      ]
    },
    "Romans-8-28": {
      title: "All Things Working for Good",
      explanation: "Paul's extraordinary promise is not a naive optimism but a bedrock theological conviction rooted in God's sovereign purpose. 'All things' includes suffering, loss, betrayal, illness, and death—not just pleasant circumstances. The promise is not that all things are good, but that God works IN all things toward good. The qualifier is crucial: 'for those who love God, who are called according to his purpose.' This is a covenant promise to the redeemed, not a universal guarantee. The 'good' is defined in the next verse (v.29): conformity to the image of Christ.",
      wordOrigins: [
        { word: "work together", origin: "Greek: συνεργεῖ (synergei) — 'to work together cooperatively.' The prefix syn- means 'with/together,' giving us our word 'synergy.' God orchestrates even disparate, painful events toward a unified, purposeful outcome." },
        { word: "good", origin: "Greek: ἀγαθόν (agathon) — Moral, ultimate goodness—not merely pleasant outcomes. The 'good' is defined contextually as Christlikeness (v.29), not comfort." },
        { word: "called", origin: "Greek: κλητοῖς (klētois) — 'effectively called,' implying divine initiation. This is not merely an invitation accepted, but God's sovereign drawing of His own." }
      ],
      crossRefs: [
        { ref: "Romans 8:29", text: "For those whom he foreknew he also predestined to be conformed to the image of his Son..." },
        { ref: "Genesis 50:20", text: "As for you, you meant evil against me, but God meant it for good..." },
        { ref: "Philippians 1:6", text: "He who began a good work in you will bring it to completion at the day of Jesus Christ." }
      ]
    },
    "Psalm-23-1": {
      title: "The Lord is My Shepherd",
      explanation: "Psalm 23 is arguably the most beloved chapter in all of Scripture, and it begins with a profoundly personal declaration: not 'the Lord is a shepherd' but 'MY shepherd.' David, who spent his youth tending sheep on Bethlehem's hills, knew exactly what a good shepherd provided. Using that intimate knowledge, he paints God as the One who ensures absolute provision ('I shall not want'). The entire psalm is framed by personal possessives and trust—'my shepherd,' 'He makes me,' 'He leads me,' 'Your rod and Your staff.' The psalm ends not with death but with dwelling in God's house forever.",
      wordOrigins: [
        { word: "LORD", origin: "Hebrew: יְהוָה (YHWH/Yahweh) — The personal covenant name of God, often rendered LORD in small capitals. It speaks of God's self-existent, eternal, and personally committed nature to His covenant people." },
        { word: "shepherd", origin: "Hebrew: רֹעִי (ro'i) — 'my shepherd.' In ancient Near East, the shepherd was protector, guide, provider, and rescuer. The image was used of kings who were to shepherd their people—and ultimately of the Messianic King." },
        { word: "want", origin: "Hebrew: אֶחְסָר (echsar) — 'to lack, be without.' The declaration is not that life is without hardship but that under God's care, nothing essential is lacking." }
      ],
      crossRefs: [
        { ref: "John 10:11", text: "I am the good shepherd. The good shepherd lays down his life for the sheep." },
        { ref: "Psalm 23:4", text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me..." },
        { ref: "Revelation 7:17", text: "For the Lamb in the midst of the throne will be their shepherd, and he will guide them to springs of living water..." }
      ]
    },
    "Matthew-5-3": {
      title: "Blessed are the Poor in Spirit",
      explanation: "The Beatitudes open the Sermon on the Mount—Jesus' most extended teaching. 'Blessed' translates the Greek makarios, which ancient Greeks used of the gods who lived in carefree bliss beyond human worry. Jesus radically redefines blessedness: it is not prosperity, power, or social standing but a specific spiritual posture. 'Poor in spirit' is the antithesis of spiritual self-sufficiency and pride—it means recognizing total spiritual bankruptcy before God. This is the foundational beatitude; all others flow from it. The kingdom of heaven belongs not to the self-made but to those who come with empty hands.",
      wordOrigins: [
        { word: "Blessed", origin: "Greek: μακάριοι (makarioi) — 'supremely happy, to be congratulated.' Not a wish but a declaration. It describes the person who is in a state of divine favor and wellbeing." },
        { word: "poor in spirit", origin: "Greek: πτωχοὶ τῷ πνεύματι (ptōchoi tō pneumati) — 'ptōchos' describes a beggar who crouches in total destitution, not merely someone who is poor. 'In spirit' qualifies the realm—spiritual bankruptcy, complete dependence on God." }
      ],
      crossRefs: [
        { ref: "Isaiah 57:15", text: "I dwell in the high and holy place, and also with him who is of a contrite and lowly spirit..." },
        { ref: "Luke 6:20", text: "Blessed are you who are poor, for yours is the kingdom of God." },
        { ref: "James 4:6", text: "God opposes the proud but gives grace to the humble." }
      ]
    },
    "Philippians-4-13": {
      title: "Strength Through Christ",
      explanation: "Perhaps no verse is more frequently misapplied in modern Christianity. Philippians 4:13 is often quoted as a promise of unlimited achievement or athletic victory, but Paul's context is radically different. Writing from a Roman prison facing possible execution, Paul is talking about contentment—the ability to be at peace whether in abundance or in need (v.11-12). 'All things' refers to all circumstances of life—both prosperity and suffering. The strength Christ gives is not the ability to accomplish great feats but the supernatural contentment to endure any condition. This is courage theology, not prosperity theology.",
      wordOrigins: [
        { word: "I can do all things", origin: "Greek: πάντα ἰσχύω (panta ischyō) — 'I have strength for all things.' The word 'ischyō' conveys robust capability, but the context (v.11-12) defines its scope as the ability to handle any circumstance, not any task." },
        { word: "strengthens", origin: "Greek: ἐνδυναμοῦντί (endynamounti) — 'the one continuously empowering me.' Present participle—an ongoing, dynamic strengthening by Christ's indwelling power. The prefix en- means 'within,' pointing to Christ's internal, not external, enabling." }
      ],
      crossRefs: [
        { ref: "Philippians 4:11", text: "I have learned, in whatever situation I am, to be content." },
        { ref: "2 Corinthians 12:9", text: "My grace is sufficient for you, for my power is made perfect in weakness." },
        { ref: "Ephesians 3:16", text: "...that he may grant you to be strengthened with power through his Spirit in your inner being..." }
      ]
    },
    "Isaiah-53-5": {
      title: "He Was Pierced for Our Transgressions",
      explanation: "Isaiah 53 stands as one of the most remarkable prophetic passages in the entire Bible, written over 700 years before the crucifixion. Verse 5 is the theological center of substitutionary atonement in the Old Testament: 'he was pierced for OUR transgressions, he was crushed for OUR iniquities.' The preposition 'for' (Hebrew: מִן, min) carries the sense of 'because of' or 'in the place of.' The Servant's suffering was not accidental but purposive—He bore what we deserved. 'By his wounds we are healed' is quoted in 1 Peter 2:24 as explicitly fulfilled in the crucifixion of Jesus.",
      wordOrigins: [
        { word: "pierced", origin: "Hebrew: מְחֹלָל (mecholal) — 'pierced through, profaned.' The root can mean to bore through violently. The Septuagint uses a Greek term associated with mortal wounding." },
        { word: "transgressions", origin: "Hebrew: פְּשָׁעֵינוּ (pesh'aynu) — 'our rebellious acts.' Pesha is the strongest Hebrew word for sin—willful revolt against divine authority, not mere mistake." },
        { word: "healed", origin: "Hebrew: נִרְפָּא (nirpa) — 'healed, mended.' Used of physical and spiritual restoration. Peter applies it to spiritual healing from sin (1 Pet 2:24)." }
      ],
      crossRefs: [
        { ref: "1 Peter 2:24", text: "He himself bore our sins in his body on the tree, that we might die to sin and live to righteousness. By his wounds you have been healed." },
        { ref: "2 Corinthians 5:21", text: "For our sake he made him to be sin who knew no sin, so that in him we might become the righteousness of God." },
        { ref: "Galatians 3:13", text: "Christ redeemed us from the curse of the law by becoming a curse for us..." }
      ]
    }
  };

  // ============================================================
  //  SAMPLE BIBLE TEXT DATA
  //  Full production deployment: populate all 66 books × all chapters × all versions
  //  This sample provides Genesis 1 (ESV) and John 3 (ESV/NIV) as template
  // ============================================================
  const VERSIONS = {
    ESV: {
      label: "English Standard Version",
      books: {
        "Genesis": {
          intro: BOOK_META["Genesis"],
          chapters: {
            1: [
              {v:1,  t:"In the beginning, God created the heavens and the earth."},
              {v:2,  t:"The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters."},
              {v:3,  t:"And God said, \"Let there be light,\" and there was light."},
              {v:4,  t:"And God saw that the light was good. And God separated the light from the darkness."},
              {v:5,  t:"God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day."},
              {v:6,  t:"And God said, \"Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.\""},
              {v:7,  t:"And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so."},
              {v:8,  t:"And God called the expanse Heaven. And there was evening and there was morning, the second day."},
              {v:9,  t:"And God said, \"Let the waters under the heavens be gathered together into one place, and let the dry land appear.\" And it was so."},
              {v:10, t:"God called the dry land Earth, and the waters that were gathered together he called Seas. And God saw that it was good."},
              {v:11, t:"And God said, \"Let the earth sprout vegetation, plants yielding seed, and fruit trees bearing fruit in which is their seed, each according to its kind, on the earth.\" And it was so."},
              {v:12, t:"The earth brought forth vegetation, plants yielding seed according to their own kinds, and trees bearing fruit in which is their seed, each according to its kind. And God saw that it was good."},
              {v:13, t:"And there was evening and there was morning, the third day."},
              {v:14, t:"And God said, \"Let there be lights in the expanse of the heavens to separate the day from the night. And let them be for signs and for seasons, and for days and years,\""},
              {v:15, t:"\"and let them be lights in the expanse of the heavens to give light upon the earth.\" And it was so."},
              {v:16, t:"And God made the two great lights—the greater light to rule the day and the lesser light to rule the night—and the stars."},
              {v:17, t:"And God set them in the expanse of the heavens to give light on the earth,"},
              {v:18, t:"to rule over the day and over the night, and to separate the light from the darkness. And God saw that it was good."},
              {v:19, t:"And there was evening and there was morning, the fourth day."},
              {v:20, t:"And God said, \"Let the waters swarm with swarms of living creatures, and let birds fly above the earth across the expanse of the heavens.\""},
              {v:21, t:"So God created the great sea creatures and every living creature that moves, with which the waters swarm, according to their kinds, and every winged bird according to its kind. And God saw that it was good."},
              {v:22, t:"And God blessed them, saying, \"Be fruitful and multiply and fill the waters in the seas, and let birds multiply on the earth.\""},
              {v:23, t:"And there was evening and there was morning, the fifth day."},
              {v:24, t:"And God said, \"Let the earth bring forth living creatures according to their kinds—livestock and creeping things and beasts of the earth according to their kinds.\" And it was so."},
              {v:25, t:"And God made the beasts of the earth according to their kinds and the livestock according to their kinds, and everything that creeps on the ground according to its kind. And God saw that it was good."},
              {v:26, t:"Then God said, \"Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.\""},
              {v:27, t:"So God created man in his own image, in the image of God he created him; male and female he created them."},
              {v:28, t:"And God blessed them. And God said to them, \"Be fruitful and multiply and fill the earth and subdue it, and have dominion over the fish of the sea and over the birds of the heavens and over every living thing that moves on the earth.\""},
              {v:29, t:"And God said, \"Behold, I have given you every plant yielding seed that is on the face of all the earth, and every tree with seed in its fruit. You shall have them for food.\""},
              {v:30, t:"\"And to every beast of the earth and to every bird of the heavens and to everything that creeps on the earth, everything that has the breath of life, I have given every green plant for food.\" And it was so."},
              {v:31, t:"And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, the sixth day."}
            ],
            2: [
              {v:1,  t:"Thus the heavens and the earth were finished, and all the host of them."},
              {v:2,  t:"And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done."},
              {v:3,  t:"So God blessed the seventh day and made it holy, because on it God rested from all his work that he had done in creation."},
              {v:4,  t:"These are the generations of the heavens and the earth when they were created, in the day that the LORD God made the earth and the heavens."},
              {v:5,  t:"When no bush of the field was yet in the land and no small plant of the field had yet sprung up—for the LORD God had not yet caused it to rain on the land, and there was no man to work the ground,"},
              {v:6,  t:"and a mist was going up from the land and was watering the whole face of the ground—"},
              {v:7,  t:"then the LORD God formed the man of dust from the ground and breathed into his nostrils the breath of life, and the man became a living creature."},
              {v:8,  t:"And the LORD God planted a garden in Eden, in the east, and there he put the man whom he had formed."},
              {v:9,  t:"And out of the ground the LORD God made to spring up every tree that is pleasant to the sight and good for food. The tree of life was in the midst of the garden, and the tree of the knowledge of good and evil."},
              {v:10, t:"A river flowed out of Eden to water the garden, and there it divided and became four rivers."},
              {v:11, t:"The name of the first is the Pishon. It is the one that flowed around the whole land of Havilah, where there is gold."},
              {v:12, t:"And the gold of that land is good; bdellium and onyx stone are there."},
              {v:13, t:"The name of the second river is the Gihon. It is the one that flowed around the whole land of Cush."},
              {v:14, t:"And the name of the third river is the Tigris, which flows east of Assyria. And the fourth river is the Euphrates."},
              {v:15, t:"The LORD God took the man and put him in the garden of Eden to work it and keep it."},
              {v:16, t:"And the LORD God commanded the man, saying, \"You may surely eat of every tree of the garden,\""},
              {v:17, t:"\"but of the tree of the knowledge of good and evil you shall not eat, for in the day that you eat of it you shall surely die.\""},
              {v:18, t:"Then the LORD God said, \"It is not good that the man should be alone; I will make him a helper fit for him.\""},
              {v:19, t:"Now out of the ground the LORD God had formed every beast of the field and every bird of the heavens and brought them to the man to see what he would call them. And whatever the man called every living creature, that was its name."},
              {v:20, t:"The man gave names to all livestock and to the birds of the heavens and to every beast of the field. But for Adam there was not found a helper fit for him."},
              {v:21, t:"So the LORD God caused a deep sleep to fall upon the man, and while he slept took one of his ribs and closed up its place with flesh."},
              {v:22, t:"And the rib that the LORD God had taken from the man he made into a woman and brought her to the man."},
              {v:23, t:"Then the man said, \"This at last is bone of my bones and flesh of my flesh; she shall be called Woman, because she was taken out of Man.\""},
              {v:24, t:"Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh."},
              {v:25, t:"And the man and his wife were both naked and were not ashamed."}
            ]
          }
        },
        "John": {
          intro: BOOK_META["John"],
          chapters: {
            1: [
              {v:1,  t:"In the beginning was the Word, and the Word was with God, and the Word was God."},
              {v:2,  t:"He was in the beginning with God."},
              {v:3,  t:"All things were made through him, and without him was not any thing made that was made."},
              {v:4,  t:"In him was life, and the life was the light of men."},
              {v:5,  t:"The light shines in the darkness, and the darkness has not overcome it."},
              {v:6,  t:"There was a man sent from God, whose name was John."},
              {v:7,  t:"He came as a witness, to bear witness about the light, that all might believe through him."},
              {v:8,  t:"He was not the light, but came to bear witness about the light."},
              {v:9,  t:"The true light, which gives light to everyone, was coming into the world."},
              {v:10, t:"He was in the world, and the world was made through him, yet the world did not know him."},
              {v:11, t:"He came to his own, and his own people did not receive him."},
              {v:12, t:"But to all who did receive him, who believed in his name, he gave the right to become children of God,"},
              {v:13, t:"who were born, not of blood nor of the will of the flesh nor of the will of man, but of God."},
              {v:14, t:"And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth."},
              {v:15, t:"(John bore witness about him, and cried out, \"This was he of whom I said, 'He who comes after me ranks before me, because he was before me.'\")"},
              {v:16, t:"For from his fullness we have all received, grace upon grace."},
              {v:17, t:"For the law was given through Moses; grace and truth came through Jesus Christ."},
              {v:18, t:"No one has ever seen God; the only God, who is at the Father's side, he has made him known."}
            ],
            3: [
              {v:1,  t:"Now there was a man of the Pharisees named Nicodemus, a ruler of the Jews."},
              {v:2,  t:"This man came to Jesus by night and said to him, \"Rabbi, we know that you are a teacher come from God, for no one can do these signs that you do unless God is with him.\""},
              {v:3,  t:"Jesus answered him, \"Truly, truly, I say to you, unless one is born again he cannot see the kingdom of God.\""},
              {v:4,  t:"Nicodemus said to him, \"How can a man be born when he is old? Can he enter a second time into his mother's womb and be born?\""},
              {v:5,  t:"Jesus answered, \"Truly, truly, I say to you, unless one is born of water and the Spirit, he cannot enter the kingdom of God.\""},
              {v:6,  t:"\"That which is born of the flesh is flesh, and that which is born of the Spirit is spirit.\""},
              {v:7,  t:"\"Do not marvel that I said to you, 'You must be born again.'\""},
              {v:8,  t:"\"The wind blows where it wishes, and you hear its sound, but you do not know where it comes from or where it goes. So it is with everyone who is born of the Spirit.\""},
              {v:9,  t:"Nicodemus said to him, \"How can these things be?\""},
              {v:10, t:"Jesus answered him, \"Are you the teacher of Israel and yet you do not understand these things?\""},
              {v:11, t:"\"Truly, truly, I say to you, we speak of what we know, and bear witness to what we have seen, but you do not receive our testimony.\""},
              {v:12, t:"\"If I have told you earthly things and you do not believe, how can you believe if I tell you heavenly things?\""},
              {v:13, t:"\"No one has ascended into heaven except he who descended from heaven, the Son of Man.\""},
              {v:14, t:"\"And as Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up,\""},
              {v:15, t:"\"that whoever believes in him may have eternal life.\""},
              {v:16, t:"\"For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.\""},
              {v:17, t:"\"For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.\""},
              {v:18, t:"\"Whoever believes in him is not condemned, but whoever does not believe is condemned already, because he has not believed in the name of the only Son of God.\""},
              {v:19, t:"\"And this is the judgment: the light has come into the world, and people loved the darkness rather than the light because their works were evil.\""},
              {v:20, t:"\"For everyone who does wicked things hates the light and does not come to the light, lest his works should be exposed.\""},
              {v:21, t:"\"But whoever does what is true comes to the light, so that it may be clearly seen that his works have been carried out in God.\""},
              {v:22, t:"After this Jesus and his disciples went into the Judean countryside, and he remained there with them and was baptizing."},
              {v:23, t:"John also was baptizing at Aenon near Salim, because water was plentiful there, and people were coming and being baptized"},
              {v:24, t:"(for John had not yet been put in prison)."},
              {v:25, t:"Now a discussion arose between some of John's disciples and a Jew over purification."},
              {v:26, t:"And they came to John and said to him, \"Rabbi, he who was with you across the Jordan, to whom you bore witness—look, he is baptizing, and all are going to him.\""},
              {v:27, t:"John answered, \"A person cannot receive even one thing unless it is given him from heaven.\""},
              {v:28, t:"\"You yourselves bear me witness, that I said, 'I am not the Christ, but I have been sent before him.'\""},
              {v:29, t:"\"The one who has the bride is the bridegroom. The friend of the bridegroom, who stands and hears him, rejoices greatly at the bridegroom's voice. Therefore this joy of mine is now complete.\""},
              {v:30, t:"\"He must increase, but I must decrease.\""},
              {v:31, t:"He who comes from above is above all. He who is of the earth belongs to the earth and speaks in an earthly way. He who comes from heaven is above all."},
              {v:32, t:"He bears witness to what he has seen and heard, yet no one receives his testimony."},
              {v:33, t:"Whoever receives his testimony sets his seal to this, that God is true."},
              {v:34, t:"For he whom God has sent utters the words of God, for he gives the Spirit without measure."},
              {v:35, t:"The Father loves the Son and has given all things into his hand."},
              {v:36, t:"Whoever believes in the Son has eternal life; whoever does not obey the Son shall not see life, but the wrath of God remains on him."}
            ]
          }
        },
        "Psalms": {
          intro: BOOK_META["Psalms"],
          chapters: {
            23: [
              {v:1, t:"The LORD is my shepherd; I shall not want."},
              {v:2, t:"He makes me lie down in green pastures. He leads me beside still waters."},
              {v:3, t:"He restores my soul. He leads me in paths of righteousness for his name's sake."},
              {v:4, t:"Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me."},
              {v:5, t:"You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows."},
              {v:6, t:"Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the LORD forever."}
            ]
          }
        },
        "Romans": {
          intro: BOOK_META["Romans"],
          chapters: {
            8: [
              {v:1,  t:"There is therefore now no condemnation for those who are in Christ Jesus."},
              {v:2,  t:"For the law of the Spirit of life has set you free in Christ Jesus from the law of sin and death."},
              {v:3,  t:"For God has done what the law, weakened by the flesh, could not do. By sending his own Son in the likeness of sinful flesh and for sin, he condemned sin in the flesh,"},
              {v:4,  t:"in order that the righteous requirement of the law might be fulfilled in us, who walk not according to the flesh but according to the Spirit."},
              {v:5,  t:"For those who live according to the flesh set their minds on the things of the flesh, but those who live according to the Spirit set their minds on the things of the Spirit."},
              {v:6,  t:"For to set the mind on the flesh is death, but to set the mind on the Spirit is life and peace."},
              {v:7,  t:"For the mind that is set on the flesh is hostile to God, for it does not submit to God's law; indeed, it cannot."},
              {v:8,  t:"Those who are in the flesh cannot please God."},
              {v:9,  t:"You, however, are not in the flesh but in the Spirit, if in fact the Spirit of God dwells in you. Anyone who does not have the Spirit of Christ does not belong to him."},
              {v:10, t:"But if Christ is in you, although the body is dead because of sin, the Spirit is life because of righteousness."},
              {v:11, t:"If the Spirit of him who raised Jesus from the dead dwells in you, he who raised Christ Jesus from the dead will also give life to your mortal bodies through his Spirit who dwells in you."},
              {v:12, t:"So then, brothers, we are debtors, not to the flesh, to live according to the flesh."},
              {v:13, t:"For if you live according to the flesh you will die, but if by the Spirit you put to death the deeds of the body, you will live."},
              {v:14, t:"For all who are led by the Spirit of God are sons of God."},
              {v:15, t:"For you did not receive the spirit of slavery to fall back into fear, but you have received the Spirit of adoption as sons, by whom we cry, \"Abba! Father!\""},
              {v:16, t:"The Spirit himself bears witness with our spirit that we are children of God,"},
              {v:17, t:"and if children, then heirs—heirs of God and fellow heirs with Christ, provided we suffer with him in order that we may also be glorified with him."},
              {v:18, t:"For I consider that the sufferings of this present time are not worth comparing with the glory that is to be revealed to us."},
              {v:19, t:"For the creation waits with eager longing for the revealing of the sons of God."},
              {v:20, t:"For the creation was subjected to futility, not willingly, but because of him who subjected it, in hope"},
              {v:21, t:"that the creation itself will be set free from its bondage to corruption and obtain the freedom of the glory of the children of God."},
              {v:22, t:"For we know that the whole creation has been groaning together in the pains of childbirth until now."},
              {v:23, t:"And not only the creation, but we ourselves, who have the firstfruits of the Spirit, groan inwardly as we wait eagerly for adoption as sons, the redemption of our bodies."},
              {v:24, t:"For in this hope we were saved. Now hope that is seen is not hope. For who hopes for what he sees?"},
              {v:25, t:"But if we hope for what we do not see, we wait for it with patience."},
              {v:26, t:"Likewise the Spirit helps us in our weakness. For we do not know what to pray for as we ought, but the Spirit himself intercedes for us with groanings too deep for words."},
              {v:27, t:"And he who searches hearts knows what is the mind of the Spirit, because the Spirit intercedes for the saints according to the will of God."},
              {v:28, t:"And we know that for those who love God all things work together for good, for those who are called according to his purpose."},
              {v:29, t:"For those whom he foreknew he also predestined to be conformed to the image of his Son, in order that he might be the firstborn among many brothers."},
              {v:30, t:"And those whom he predestined he also called, and those whom he called he also justified, and those whom he justified he also glorified."},
              {v:31, t:"What then shall we say to these things? If God is for us, who can be against us?"},
              {v:32, t:"He who did not spare his own Son but gave him up for us all, how will he not also with him graciously give us all things?"},
              {v:33, t:"Who shall bring any charge against God's elect? It is God who justifies."},
              {v:34, t:"Who is to condemn? Christ Jesus is the one who died—more than that, who was raised—who is at the right hand of God, who indeed is interceding for us."},
              {v:35, t:"Who shall separate us from the love of Christ? Shall tribulation, or distress, or persecution, or famine, or nakedness, or danger, or sword?"},
              {v:36, t:"As it is written, \"For your sake we are being killed all the day long; we are regarded as sheep to be slaughtered.\""},
              {v:37, t:"No, in all these things we are more than conquerors through him who loved us."},
              {v:38, t:"For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers,"},
              {v:39, t:"nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord."}
            ]
          }
        },
        "Matthew": {
          intro: BOOK_META["Matthew"],
          chapters: {
            5: [
              {v:1,  t:"Seeing the crowds, he went up on the mountain, and when he sat down, his disciples came to him."},
              {v:2,  t:"And he opened his mouth and taught them, saying:"},
              {v:3,  t:"\"Blessed are the poor in spirit, for theirs is the kingdom of heaven.\""},
              {v:4,  t:"\"Blessed are those who mourn, for they shall be comforted.\""},
              {v:5,  t:"\"Blessed are the meek, for they shall inherit the earth.\""},
              {v:6,  t:"\"Blessed are those who hunger and thirst for righteousness, for they shall be satisfied.\""},
              {v:7,  t:"\"Blessed are the merciful, for they shall receive mercy.\""},
              {v:8,  t:"\"Blessed are the pure in heart, for they shall see God.\""},
              {v:9,  t:"\"Blessed are the peacemakers, for they shall be called sons of God.\""},
              {v:10, t:"\"Blessed are those who are persecuted for righteousness' sake, for theirs is the kingdom of heaven.\""},
              {v:11, t:"\"Blessed are you when others revile you and persecute you and utter all kinds of evil against you falsely on my account.\""},
              {v:12, t:"\"Rejoice and be glad, for your reward is great in heaven, for so they persecuted the prophets who were before you.\""},
              {v:13, t:"\"You are the salt of the earth, but if salt has lost its taste, how shall its saltiness be restored? It is no longer good for anything except to be thrown out and trampled under people's feet.\""},
              {v:14, t:"\"You are the light of the world. A city set on a hill cannot be hidden.\""},
              {v:15, t:"\"Nor do people light a lamp and put it under a basket, but on a stand, and it gives light to all in the house.\""},
              {v:16, t:"\"In the same way, let your light shine before others, so that they may see your good works and give glory to your Father who is in heaven.\""},
              {v:17, t:"\"Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfill them.\""},
              {v:18, t:"\"For truly, I say to you, until heaven and earth pass away, not an iota, not a dot, will pass from the Law until all is accomplished.\""},
              {v:19, t:"\"Therefore whoever relaxes one of the least of these commandments and teaches others to do the same will be called least in the kingdom of heaven, but whoever does them and teaches them will be called great in the kingdom of heaven.\""},
              {v:20, t:"\"For I tell you, unless your righteousness exceeds that of the scribes and Pharisees, you will never enter the kingdom of heaven.\""}
            ]
          }
        }
      }
    },
    NIV: {
      label: "New International Version",
      books: {
        "Genesis": {
          intro: BOOK_META["Genesis"],
          chapters: {
            1: [
              {v:1,  t:"In the beginning God created the heavens and the earth."},
              {v:2,  t:"Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters."},
              {v:3,  t:"And God said, \"Let there be light,\" and there was light."},
              {v:4,  t:"God saw that the light was good, and he separated the light from the darkness."},
              {v:5,  t:"God called the light \"day,\" and the darkness he called \"night.\" And there was evening, and there was morning—the first day."},
              {v:6,  t:"And God said, \"Let there be a vault between the waters to separate water from water.\""},
              {v:7,  t:"So God made the vault and separated the water under the vault from the water above it. And it was so."},
              {v:8,  t:"God called the vault \"sky.\" And there was evening, and there was morning—the second day."},
              {v:9,  t:"And God said, \"Let the water under the sky be gathered to one place, and let dry ground appear.\" And it was so."},
              {v:10, t:"God called the dry ground \"land,\" and the gathered waters he called \"seas.\" And God saw that it was good."},
              {v:11, t:"Then God said, \"Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds.\" And it was so."},
              {v:12, t:"The land produced vegetation: plants bearing seed according to their kinds and trees bearing fruit with seed in it according to their kinds. And God saw that it was good."},
              {v:13, t:"And there was evening, and there was morning—the third day."},
              {v:14, t:"And God said, \"Let there be lights in the vault of the sky to separate the day from the night, and let them serve as signs to mark sacred times, and days and years,\""},
              {v:15, t:"\"and let them be lights in the vault of the sky to give light on the earth.\" And it was so."},
              {v:16, t:"God made two great lights—the greater light to govern the day and the lesser light to govern the night. He also made the stars."},
              {v:17, t:"God set them in the vault of the sky to give light on the earth,"},
              {v:18, t:"to govern the day and the night, and to separate light from darkness. And God saw that it was good."},
              {v:19, t:"And there was evening, and there was morning—the fourth day."},
              {v:20, t:"And God said, \"Let the water teem with living creatures, and let birds fly above the earth across the vault of the sky.\""},
              {v:21, t:"So God created the great creatures of the sea and every living thing with which the water teems and that moves about in it, according to their kinds, and every winged bird according to its kind. And God saw that it was good."},
              {v:22, t:"God blessed them and said, \"Be fruitful and increase in number and fill the water in the seas, and let the birds increase on the earth.\""},
              {v:23, t:"And there was evening, and there was morning—the fifth day."},
              {v:24, t:"And God said, \"Let the land produce living creatures according to their kinds: the livestock, the creatures that move along the ground, and the wild animals, each according to its kind.\" And it was so."},
              {v:25, t:"God made the wild animals according to their kinds, the livestock according to their kinds, and all the creatures that move along the ground according to their kinds. And God saw that it was good."},
              {v:26, t:"Then God said, \"Let us make mankind in our image, in our likeness, so that they may rule over the fish in the sea and the birds in the sky, over the livestock and all the wild animals, and over all the creatures that move along the ground.\""},
              {v:27, t:"So God created mankind in his own image, in the image of God he created them; male and female he created them."},
              {v:28, t:"God blessed them and said to them, \"Be fruitful and increase in number; fill the earth and subdue it. Rule over the fish in the sea and the birds in the sky and over every living creature that moves on the ground.\""},
              {v:29, t:"Then God said, \"I give you every seed-bearing plant on the face of the whole earth and every tree that has fruit with seed in it. They will be yours for food.\""},
              {v:30, t:"\"And to all the beasts of the earth and all the birds in the sky and all the creatures that move along the ground—everything that has the breath of life in it—I give every green plant for food.\" And it was so."},
              {v:31, t:"God saw all that he had made, and it was very good. And there was evening, and there was morning—the sixth day."}
            ]
          }
        },
        "John": {
          intro: BOOK_META["John"],
          chapters: {
            3: [
              {v:1,  t:"Now there was a Pharisee, a man named Nicodemus who was a member of the Jewish ruling council."},
              {v:2,  t:"He came to Jesus at night and said, \"Rabbi, we know that you are a teacher who has come from God. For no one could perform the signs you are doing if God were not with him.\""},
              {v:3,  t:"Jesus replied, \"Very truly I tell you, no one can see the kingdom of God unless they are born again.\""},
              {v:4,  t:"\"How can someone be born when they are old?\" Nicodemus asked. \"Surely they cannot enter a second time into their mother's womb to be born!\""},
              {v:5,  t:"Jesus answered, \"Very truly I tell you, no one can enter the kingdom of God unless they are born of water and the Spirit.\""},
              {v:6,  t:"\"Flesh gives birth to flesh, but the Spirit gives birth to spirit.\""},
              {v:7,  t:"\"You should not be surprised at my saying, 'You must be born again.'\""},
              {v:8,  t:"\"The wind blows wherever it pleases. You hear its sound, but you cannot tell where it comes from or where it is going. So it is with everyone born of the Spirit.\""},
              {v:14, t:"\"Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up,\""},
              {v:15, t:"\"that everyone who believes may have eternal life in him.\""},
              {v:16, t:"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."},
              {v:17, t:"For God did not send his Son into the world to condemn the world, but to save the world through him."},
              {v:30, t:"He must become greater; I must become less."}
            ]
          }
        }
      }
    },
    NLT: {
      label: "New Living Translation",
      books: {
        "Genesis": {
          intro: BOOK_META["Genesis"],
          chapters: {
            1: [
              {v:1,  t:"In the beginning God created the heavens and the earth."},
              {v:2,  t:"The earth was formless and empty, and darkness covered the deep waters. And the Spirit of God was hovering over the surface of the waters."},
              {v:3,  t:"Then God said, \"Let there be light,\" and there was light."},
              {v:4,  t:"And God saw that the light was good. Then he separated the light from the darkness."},
              {v:5,  t:"God called the light \"day\" and the darkness \"night.\" And evening passed and morning came, marking the first day."},
              {v:26, t:"Then God said, \"Let us make human beings in our image, to be like us. They will reign over the fish in the sea, the birds in the sky, the livestock, all the wild animals on the earth, and the small animals that scurry along the ground.\""},
              {v:27, t:"So God created human beings in his own image. In the image of God he created them; male and female he created them."},
              {v:28, t:"Then God blessed them and said, \"Be fruitful and multiply. Fill the earth and govern it. Reign over the fish in the sea, the birds in the sky, and all the animals that scurry along the ground.\""},
              {v:31, t:"Then God looked over all he had made, and he saw that it was very good! And evening passed and morning came, marking the sixth day."}
            ]
          }
        },
        "John": {
          intro: BOOK_META["John"],
          chapters: {
            3: [
              {v:16, t:"\"For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.\""},
              {v:17, t:"\"God sent his Son into the world not to judge the world, but to save the world through him.\""},
              {v:30, t:"\"He must become greater and greater, and I must become less and less.\""}
            ]
          }
        }
      }
    },
    RSV: {
      label: "Revised Standard Version",
      books: {
        "Genesis": {
          intro: BOOK_META["Genesis"],
          chapters: {
            1: [
              {v:1,  t:"In the beginning God created the heavens and the earth."},
              {v:2,  t:"The earth was without form and void, and darkness was upon the face of the deep; and the Spirit of God was moving over the face of the waters."},
              {v:3,  t:"And God said, \"Let there be light\"; and there was light."},
              {v:4,  t:"And God saw that the light was good; and God separated the light from the darkness."},
              {v:5,  t:"God called the light Day, and the darkness he called Night. And there was evening and there was morning, one day."},
              {v:26, t:"Then God said, \"Let us make man in our image, after our likeness; and let them have dominion over the fish of the sea, and over the birds of the air, and over the cattle, and over all the earth, and over every creeping thing that creeps upon the earth.\""},
              {v:27, t:"So God created man in his own image, in the image of God he created him; male and female he created them."},
              {v:31, t:"And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, a sixth day."}
            ]
          }
        },
        "John": {
          intro: BOOK_META["John"],
          chapters: {
            3: [
              {v:16, t:"For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life."},
              {v:17, t:"For God sent the Son into the world, not to condemn the world, but that the world might be saved through him."},
              {v:30, t:"He must increase, but I must decrease."}
            ]
          }
        }
      }
    }
  };

  // ============================================================
  //  PROFANITY FILTER LIST
  // ============================================================
  const PROFANITY_LIST = [
    "damn","hell","ass","bastard","crap","shit","fuck","bitch","dick","piss","cunt","cock","whore","slut","fag","nigger","nigga","retard","idiot"
  ];

  // ============================================================
  //  EXPORT TO WINDOW
  // ============================================================
  window.BIBLE_DATA = {
    bookMeta:       BOOK_META,
    versions:       VERSIONS,
    commentary:     COMMENTARY,
    verseOfTheDay:  VERSE_OF_THE_DAY,
    readingPlans:   READING_PLANS,
    divineWords:    DIVINE_WORDS,
    profanityList:  PROFANITY_LIST,
    allBooks:       Object.keys(BOOK_META),
    otBooks:        Object.keys(BOOK_META).filter(b => BOOK_META[b].testament === "OT"),
    ntBooks:        Object.keys(BOOK_META).filter(b => BOOK_META[b].testament === "NT")
  };

  console.log('[BibleVault] bibleData.js loaded — ' + Object.keys(BOOK_META).length + ' books, ' + Object.keys(VERSIONS).length + ' versions ready.');
})();
