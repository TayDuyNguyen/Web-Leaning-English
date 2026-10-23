# Kế hoạch 180 ngày: Mất gốc → A0 → A1 → A2 → B1

Tài liệu này là bản **audit + thiết kế lại** cho `English_Roadmap_From_Zero.xlsx` (17 sheet, 81.606 byte,
đo bằng script `scripts/` ngày 2026-10-05). Mọi con số dưới đây là số đếm được từ file, không phải ước lượng.

Yêu cầu gốc của user: file này **đóng vai theo dõi tiến độ** và trả lời được **hôm nay học được những gì**.

---

## 1. File hiện tại: cái gì ĐÃ có (không làm lại)

| # | Sheet | Số dòng thật | Vai trò | Trạng thái dùng được |
| --- | --- | --- | --- | --- |
| 1 | README | 13 | Hướng dẫn | Mô tả 6/17 sheet |
| 2 | DASHBOARD | 17 | Tổng kết | 9 công thức, chỉ tính từ PROGRESS |
| 3 | CEFR_ROADMAP | 6 | A0→C1 chuẩn CEFR | Có 2 cấp thừa (B2, C1) |
| 4 | VOCAB_MASTER | 63 | Kho từ | 48 từ thuộc A0–B1; **cả 63/63 câu ví dụ là chữ máy móc** "I use X in a simple sentence."; Phát âm sai kiểu "/I/", Collocation "use I" |
| 5 | GRAMMAR_MASTER | 18 | Kho grammar | 13 điểm A0–B1 + 5 điểm B2/C1 |
| 6 | EXERCISES | 12 | Bài tập | Chỉ 8 câu thuộc A0–B1 |
| 7 | SPACED_REPETITION | 100 | Lịch ôn (Leitner 1-1-2-4-7-14) | **1/100 dòng có nội dung**, 100/100 dòng bị đóng đinh level A1 |
| 8 | RESOURCE_MAP | 5 | Nguồn học | Trùng RESOURCE |
| 9 | WEEKLY_PLAN | 70 | Lịch tuần | 70 tuần = 490 ngày; riêng A0→B1 đã 34 tuần = 238 ngày ≠ 180 |
| 10 | ROADMAP | 4 | A0→B1 mục tiêu | Đúng phạm vi, dùng làm gốc |
| 11 | CURRICULUM | 35 | Bản đồ chủ đề A0-001…B1-035 | Đầy đủ, nhưng **không sheet nào tham chiếu tới 35 ID này** |
| 12 | DAILY_PLAN | 180 | Lịch ngày | Có 26 block tuần × tên; **không có cột Date**, không có Curriculum ID, không có mã từ |
| 13 | VOCABULARY | 15 | Từ vựng (bản thật) | Ví dụ + IPA chuẩn, nhưng trùng 14/16 từ với VOCAB_MASTER |
| 14 | GRAMMAR_TRACKER | 13 | Grammar (bản theo dõi) | **Xung đột ID**: G003 = "There is/are" ở sheet này nhưng = "Questions" ở GRAMMAR_MASTER |
| 15 | RESOURCE | 5 | Nguồn học | 5 nguồn, có URL |
| 16 | PROGRESS | 180 | Tiến độ | Cột Date trống 0/180; Level + Lesson trống; chỉ có Day 1→180 |
| 17 | REVIEW_QUEUE | 5 | Danh sách cần ôn | 5 dòng mẫu, không có ngày, không có nội dung |

Lịch mức độ trong DAILY_PLAN (đo từ cột C): **A0 = ngày 1–28, A1 = 29–70, A2 = 71–112, B1 = 113–180.**
Mỗi tuần 7 ngày, 6 ngày học theo vòng lặp cố định (New concept → Guided practice → Listening + shadowing →
Speaking drill → Reading + vocabulary → Writing + correction) + ngày 7 Weekly review. 180/180 ngày đều ghi 30 phút.

---

## 2. Vì sao file chưa trả lời được "hôm nay học được những gì"

Ba lỗ hổng chặn trực tiếp, theo thứ tự nghiêm trọng:

1. **Không có ngày trên lịch.** DAILY_PLAN có 15 cột A→O nhưng không cột nào là Date. PROGRESS có cột Date
   nhưng trống 0/180. Vì vậy không tồn tại phép nối "hôm nay (TODAY) = ngày thứ bao nhiêu".
2. **Mọi ngày giống hệt nhau.** 180/180 dòng đều ghi "5–15 words + example sentences", "20–30 min targeted
   practice"… Ngày 37 và ngày 38 khác nhau ở đúng một ô chữ (New concept / Guided practice). Không thể biết
   *hôm nay học từ nào, grammar nào*.
3. **Ba bản sao của cùng một kiến thức, mỗi bản một kiểu.** Từ vựng nằm ở VOCAB_MASTER (63) + VOCABULARY (15),
   grammar ở GRAMMAR_MASTER (18) + GRAMMAR_TRACKER (13), nguồn học ở RESOURCE (5) + RESOURCE_MAP (5). Ngày ôn
   được tính ở 4 nơi khác nhau: VOCAB_MASTER `Next Review`, VOCABULARY `Review Date`, GRAMMAR_* `Next review`,
   và sheet SPACED_REPETITION. Sửa một nơi, ba nơi kia sai mà không ai biết.

Hai mâu thuẫn số bên trong file:

- **30 phút/ngày là không đủ cho chính nhiệm vụ file ghi.** Cộng các mục cột F→K: từ vựng + grammar 20–30
  + nghe 10–20 + nói 10–15 + đọc 10–20 + viết = **70–105 phút**, nhưng cột M đóng đinh 30.
- **180 ngày ≠ 238 ngày.** ROADMAP/CEFR_ROADMAP nói A0 4 tuần, A1 8, A2 10, B1 12 (=34 tuần = 238 ngày);
  DAILY_PLAN nén vào 26 tuần = 180 ngày.

Khoảng trống nội dung (phải nạp thêm, không tự sinh ra được):

| Hạng | Cần để tới B1 | Đang có (A0–B1, từ thật) | Thiếu |
| --- | --- | --- | --- |
| Từ vựng | 2.500–3.500 (≈ 14 từ/ngày × 180) | 48 từ trong file, cả 48 ví dụ là chữ máy móc + 74 từ có ví dụ thật trong app `src/content/vocabulary/` (a1 26, a2 24, b1 24, **không có A0**) | ≈ 2.400 từ; **A0 gần như trống** |
| Grammar | 13–16 điểm | 13 điểm (2 bản trùng, lệch ID) | 0 về số lượng, thiếu bài tập |
| Bài tập / test | 180 ngày + 26 bài test tuần | 8 câu A0–B1; **không có đề test tuần nào** dù WEEKLY_PLAN cột J bắt "70%+" | ≈ 150 câu + 26 đề |
| Nguồn nghe | 180 phiên | 0 (chỉ 5 URL chung chung) | liên kết từng tuần |

---

## 3. Thiết kế lại: 17 sheet → 10 sheet, một nguồn duy nhất

Nguyên tắc: **mỗi loại kiến thức chỉ có MỘT nơi chỉnh sửa**; mọi thứ khác là công thức đọc từ nơi đó.
Sheet nào chỉ để tham chiếu thì không được dùng để nhập liệu.

| # | Sheet | Từ đâu ra | Vai trò | Bạn gõ gì ở đó |
| --- | --- | --- | --- | --- |
| 1 | README | viết lại | 10 sheet + 5 bước dùng mỗi ngày | Không |
| 2 | **TODAY** | mới | Thẻ "hôm nay": tra `TODAY()` ra dòng của PLAN_180, tự hiện chủ đề, ngữ pháp, 4 kỹ năng, 14 từ mới, 12 từ đến hạn và 5 số tổng kết | Không |
| 3 | PLAN_180 | DAILY_PLAN + CURRICULUM + weeks.json | 180 dòng: Ngày, **Ngày lịch**, Tuần, Level, Giai đoạn, Dạng bài, CurriculumID, Chủ đề, Ngữ pháp, **danh sách ID từ**, Số từ, Nghe/Nói/Đọc/Viết, Bài tập, Phút, Test, Trạng thái, Nguồn từ | Không (chỉ Trạng thái là công thức đọc từ PROGRESS) |
| 4 | VOCAB | VOCAB_MASTER + VOCABULARY + 74 từ của app, đã xoá chữ máy móc | 1 nguồn từ: ID, Level, Nhóm, Chủ đề, Từ, Nghĩa, IPA, Ví dụ, Collocation, Nguồn dữ liệu, Ngày học | Không |
| 5 | DUE | SPACED_REPETITION viết lại và nối vào VOCAB | Sổ ôn 1-1-2-4-7-14: Từ/Nghĩa/Ví dụ là công thức VLOOKUP; bạn gõ Mastery, số lần đúng, ngày vừa ôn | Mastery, Số lần đúng, Ngày ôn gần nhất, Ghi chú |
| 6 | GRAMMAR | GRAMMAR_MASTER + GRAMMAR_TRACKER gộp, đánh số lại GA01…GB15 | 25 điểm ngữ pháp A0→B1 + lịch ôn + số ngày xuất hiện trong lịch | Mastery, Ngày học gần nhất |
| 7 | CURRICULUM | giữ | 35 chủ đề + số ngày trong lịch + số ngày đã xong (đếm từ PROGRESS) | Không |
| 8 | EXERCISES | giữ (10 câu A0–B1) | Câu hỏi gắn CurriculumID | Không |
| 9 | RESOURCES | RESOURCE + RESOURCE_MAP gộp | 5 nguồn, chỉ hàng A0–B1 | Không |
| 10 | PROGRESS | giữ, nối lại | Sổ duy nhất mỗi ngày: Ngày/Level/Chủ đề là công thức lấy từ PLAN_180 | Hoàn thành (Yes/No), 6 điểm kỹ năng, Overall tự tính, Ghi chú |

Bỏ hẳn: CEFR_ROADMAP dòng B2/C1, WEEKLY_PLAN tuần 27–70, VOCAB_MASTER 15 từ B2/C1, GRAMMAR_MASTER 5 điểm B2/C1,
sheet REVIEW_QUEUE (chồng với DUE), DASHBOARD (gộp vào TODAY). Tổng: **17 → 10 sheet**.

Vì sao PROGRESS mới là nơi gõ, không phải PLAN_180: bản cũ có tới hai chỗ ghi tiến độ một ngày
(DAILY_PLAN `Status` và PROGRESS `Completed?`), nên cùng một ngày có thể vừa "Done" vừa "trống".
Bây giờ mỗi ngày chỉ có **một** ô nhập, PLAN_180 đọc lại ô đó bằng công thức.

Công thức lõi (không macro, không cần Excel 365):

- `TODAY!B4 = IFERROR(MATCH(TODAY(),PLAN_180!$B$2:$B$181,0),"—")` → hôm nay là ngày thứ mấy.
- `TODAY!B9 = IFERROR(INDEX(PLAN_180!$H$2:$H$181,$B$4),"")` → chủ đề của ngày đó; các dòng khác làm tương tự.
- `VOCAB!L2 = IF($K2="","",IF($K2=TODAY(),COUNTIF($K$2:$K2,TODAY()),""))` → xếp thứ tự từ của hôm nay để TODAY gọi ra.
- `DUE!H2 = IF($G2="","",$G2+IF($E2=0,1,IF($E2=1,1,IF($E2=2,2,IF($E2=3,4,IF($E2=4,7,14))))))` → ngày ôn tới theo Mastery.
- `PROGRESS!L2 = IF(COUNT($F2:$K2)=0,"",ROUND(AVERAGE($F2:$K2),0))` → điểm tổng của ngày.

---

## 4. Lịch trình 180 ngày (26 tuần, bám sát 35 chủ đề đã có trong CURRICULUM)

Giữ nguyên khung đã đo được (A0 1–28, A1 29–70, A2 71–112, B1 113–180) và gắn CurriculumID vào từng tuần.
Nhịp mỗi tuần: ngày 1 khái niệm mới → ngày 2–5 luyện có hướng dẫn → ngày 6 dùng thật → ngày 7 test + ôn.

| Tuần | Ngày | Level | CurriculumID | Học gì (từ file) | Từ mới/ngày | Grammar |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1–7 | A0 | A0-001, A0-002, A0-004 | Alphabet, nguyên/phụ âm, chào hỏi | 8 | BE (G01) |
| 2 | 8–14 | A0 | A0-003, A0-005 | Số & giờ, đại từ + BE | 8 | BE, đại từ (G01–G02) |
| 3 | 15–21 | A0 | A0-006, A0-007 | This/that, There is/are, gia đình | 8 | There is/are (G03) |
| 4 | 22–28 | A0 | A0-008, A0-009, A0-010 | Đồ ăn, câu hỏi wh- + **test A0** | 8 | Câu hỏi (G04) |
| 5 | 29–35 | A1 | A1-011 | Hiện tại đơn, thói quen | 10 | Present Simple (G05) |
| 6 | 36–42 | A1 | A1-012 | Hiện tại tiếp diễn | 10 | Pres. Cont. (G06) |
| 7 | 43–49 | A1 | A1-013 | Quá khứ đơn, kể chuyện | 10 | Past Simple (G07) |
| 8 | 50–56 | A1 | A1-014 | Tương lai going to, kế hoạch | 10 | Future (G08) |
| 9 | 57–63 | A1 | A1-015, A1-016 | Can/can't, đếm được, mua sắm | 10 | Can, some/any (G09) |
| 10 | 64–70 | A1 | A1-017, A1-018, A1-019 | So sánh, du lịch, sức khoẻ + **test A1** | 10 | Comparatives (G10) |
| 11 | 71–77 | A2 | A2-020 | Hiện tại hoàn thành, trải nghiệm | 12 | Present Perfect (G11) |
| 12 | 78–84 | A2 | A2-021 | Quá khứ tiếp diễn, storytelling | 12 | Past Cont. (G12) |
| 13 | 85–91 | A2 | A2-022 | Will vs going to | 12 | Future forms (G13) |
| 14 | 92–98 | A2 | A2-023, A2-024 | Câu điều kiện loại 1, should/must | 12 | Conditional 1 (G14) |
| 15 | 99–105 | A2 | A2-025 | Bị động cơ bản | 12 | Passive (G15) |
| 16 | 106–112 | A2 | A2-026, A2-027, A2-028 | Quan điểm, công việc, công nghệ + **test A2** | 12 | Liên từ (G16) |
| 17 | 113–119 | B1 | B1-029 | Mệnh đề quan hệ | 14 | Relative (G17) |
| 18 | 120–126 | B1 | B1-030 | Câu gián tiếp | 14 | Reported (G18) |
| 19 | 127–133 | B1 | B1-031, B1-032 | Điều kiện loại 2/3, V-ing/to-V | 14 | Conditional 2 (G19) |
| 20 | 134–140 | B1 | B1-033 | Thuyết trình 2 phút | 14 | Linking |
| 21 | 141–147 | B1 | ôn 17–20 | **Test giữa B1** + sửa lỗi | 10 ôn | — |
| 22 | 148–154 | B1 | B1-034 | Email trang trọng 120–180 từ | 14 | — |
| 23 | 155–161 | B1 | A2-026, B1-035 | Nghe/nói cường độ, bày tỏ ý kiến | 14 | — |
| 24 | 162–168 | B1 | B1-035 | Đọc/viết cường độ, paragraph 150 từ | 14 | — |
| 25 | 169–175 | B1 | toàn bộ | Ôn tổng hợp theo DUE (không thêm từ mới) | 0 mới | tất cả 25 |
| 26 | 176–180 | B1 | — | **Mock test 4 kỹ năng + chốt B1** | 0 mới | — |

Số thật khi script sinh lịch (đo bằng `npm run roadmap`, không tính tay): 8 từ × ngày A0 + 10 × A1 + 12 × A2 +
14 × B1 = **1.572 chỗ từ mới**; 25 điểm ngữ pháp; 26 ngày có test; 4 test chốt level (cuối tuần 4, 10, 16, 26).
Pool từ hiện có 248 từ thật (A0 167, A1 29, A2 26, B1 26) nên lịch phủ tới ngày 114, **hụt từ ngày 24 và cần
thêm 1.324 từ** để kín 180 ngày — xem §7.
Thời lượng đã chốt: **60 phút/ngày** (file cũ ghi 30 nhưng nhiệm vụ của nó cộng ra 70–105).

---

## 5. Bắt đầu từ đâu — 3 quyết định đã chốt (2026-10-06)

| # | Việc | Chi tiết dễ hiểu |
| --- | --- | --- |
| 1 | Chốt 3 quyết định | Ngày 1 = **2026-10-05** (ngày 180 = 2027-04-02) · **60 phút/ngày** · nguồn là JSON trong repo, Excel do script sinh |
| 2 | Sửa cấu trúc file (17 → 10 sheet) | **Đã làm** — xem §7 |
| 3 | Nạp nội dung thật cho 4 tuần đầu | **Một phần**: đã có 248 từ thật (167 từ A0 mới viết lại IPA + ví dụ), phủ ngày 1–24; tuần 4 trở đi vẫn thiếu, số đo ở §7 |
| 4 | Chạy ngày đầu tiên và kiểm | **Đã kiểm bằng Excel thật**: mở sheet TODAY máy ra ngày 06/10/2026 = ngày 2, chủ đề "Alphabet & spelling", đúng 8 từ của ngày 2 (say, English, ship, sheep, man, men, bad, bed) |

Phần còn chờ user quyết: nạp tiếp ~1.324 từ lấy từ đâu (tự viết dần, hay nhập danh sách từ vựng theo cấp độ),
và có đưa A0 vào app Grammax hay không (`src/core/contentSchema.js` đang chỉ nhận A1→C1).

---

## 6. Cách triển khai (phương án A, đã làm)

Repo này **không có thư viện đọc/ghi Excel nào** (`node_modules` không có `xlsx`, không có `exceljs`), và
`package-lock.json` ở repo rất nhạy: phải dùng `npm ci`, còn `npm install` trên Windows âm thầm phá mục
`@emnapi/*` làm hỏng CI trên Linux. Nên bộ sinh tự viết OOXML + ZIP bằng `node:zlib`, không thêm dependency.

```
data/roadmap/config.json      ngày bắt đầu, số phút, cấp độ, luật chốt level
data/roadmap/weeks.json       26 tuần: ngày nào thuộc level nào, học chủ đề nào, mấy từ/ngày
data/roadmap/curriculum.json  35 chủ đề A0-001…B1-035 (nội dung lấy từ sheet CURRICULUM cũ)
data/roadmap/grammar.json     25 điểm ngữ pháp GA01…GB15 (gộp 2 sheet grammar, đánh số lại)
data/roadmap/vocabulary/*.json 167 từ A0 + 12 từ curated (có IPA + ví dụ thật)
src/content/vocabulary/**     74 từ của app — gộp thẳng vào pool, không chép ra file thứ hai
data/roadmap/exercises.json   10 câu A0–B1 (gỡ 2 câu B2/C1 ra khỏi phạm vi)
data/roadmap/resources.json   5 nguồn học
scripts/roadmap-data.mjs      ghép nguồn → 180 dòng + validate cross-reference
scripts/build-roadmap.mjs     sinh English_Roadmap_From_Zero.xlsx (10 sheet, có công thức)
test/roadmap.test.js          19 test: ngày, level, ID, từ trùng, thứ tự ô, vòng lặp zip↔xlsx
```

Lệnh:

| Lệnh | Dùng khi |
| --- | --- |
| `npm run roadmap` | Sửa JSON xong sinh lại file Excel |
| `npm run roadmap:check` | Kiểm file Excel trong repo có khớp JSON không (CI) |
| `npm test` | 128 test, gồm 19 test của lộ trình |

Quy tắc nhập liệu: **không sửa tay ô dữ liệu trong Excel** — lần chạy sau sẽ ghi đè. Chỉ gõ vào ô nền vàng
(PROGRESS: Hoàn thành + 6 điểm; DUE: Mastery, Số lần đúng, Ngày ôn gần nhất; GRAMMAR: Mastery, Ngày học).

## 7. Số đo sau khi sinh (2026-10-06)

| Hạng | Số thật |
| --- | --- |
| Sheet | 17 → 10. Bỏ: VOCAB_MASTER, VOCABULARY (gộp thành VOCAB), GRAMMAR_MASTER, GRAMMAR_TRACKER (gộp thành GRAMMAR), RESOURCE_MAP (gộp vào RESOURCES), WEEKLY_PLAN (gộp vào PLAN_180), SPACED_REPETITION + REVIEW_QUEUE (gộp thành DUE), DASHBOARD (gộp vào TODAY), ROADMAP + CEFR_ROADMAP (số liệu chuyển vào config.json) |
| Dòng lịch | 180, ngày 1 = 05/10/2026, ngày 180 = 02/04/2027 |
| Từ vựng dùng được | 248 từ thật (A0 167 · A1 29 · A2 26 · B1 26), 0 từ trùng, 0 ví dụ máy móc |
| Phủ lịch | Đủ từ tới ngày 114; hụt từ **ngày 24**; cần thêm **1.324 từ** để kín 180 ngày |
| Ngữ pháp | 25 điểm, tất cả đều có chủ đề dạy và có mặt trong lịch (điểm GA01 xuất hiện 5 ngày) |
| Chủ đề | 35/35 đều được xếp lịch; tuần 21, 25, 26 là tuần ôn |
| Test | 26 ngày có test; 4 test chốt level A0/A1/A2/B1 cuối tuần 4/10/16/26 |
| Bài tập | 10 câu A0–B1 — **26 đề test tuần vẫn chưa có nội dung** |
| Kiểm bằng Excel thật | Mở file OK (10 sheet, không sửa chữa gì); TODAY ra ngày 2 · level A0 · 8 từ đúng của ngày 2; gõ Yes + 6 điểm vào PROGRESS thì PLAN_180 chuyển "Xong", TODAY báo 2 ngày xong · 1% · trung bình 70; đặt ngày ôn quá khứ thì từ nhảy vào danh sách "ĐẾN HẠN" trên TODAY |
| Dung lượng file | 96.299 byte (bản cũ 81.606 byte nhưng chứa 63 từ ví dụ giả) |

Còn thiếu, theo thứ tự đáng làm:

1. **1.324 từ** cho ngày 24→180 (không tự sinh được; cần nguồn danh sách theo cấp độ hoặc viết dần).
2. **26 đề test tuần** — lịch đã có chỗ, nội dung chưa có.
3. **Nguồn nghe cho từng tuần** — sheet RESOURCES mới có 5 URL chung.
4. **A0 chưa vào app**: `src/core/contentSchema.js` chỉ nhận A1→C1, nên 167 từ A0 chưa chơi được trong game
   (thêm A0 là sửa LEVELS + Lobby, riêng một CR).
5. IPA cho 74 từ của app (VOCAB sheet để trống cột IPA với các từ đó).
