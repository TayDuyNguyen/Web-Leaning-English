# Grammax

Game học từ vựng tiếng Anh cho người Việt. Từ rơi xuống, bạn gõ đúng để hạ nó; hạ xong sẽ thấy
nghĩa tiếng Việt. Chạy hoàn toàn trên máy — không cần tài khoản, không cần `.env`.

[![CI](https://github.com/TayDuyNguyen/Web-Leaning-English/actions/workflows/ci.yml/badge.svg)](https://github.com/TayDuyNguyen/Web-Leaning-English/actions/workflows/ci.yml)

## Chạy thử

Yêu cầu Node `^20.19.0`, `^22.13.0` hoặc `>=24.0.0` (Node 23 không được hỗ trợ).

```bash
npm ci        # dùng npm ci, đừng dùng npm install (xem ghi chú bên dưới)
npm run dev   # http://localhost:5173
```

> `npm install` trên Windows sẽ sửa `package-lock.json` và làm hỏng `npm ci` trên CI Linux.
> Nếu `git status` thấy lockfile thay đổi sau khi chạy npm, hãy hoàn tác trước khi commit.

## Cách chơi

- Từ tiếng Anh rơi từ trên xuống. Gõ **chữ cái đầu** để khoá mục tiêu, gõ tiếp phần còn lại để hạ từ.
- Hạ được từ: footer hiện `từ — nghĩa` trong 2,6 giây.
- Từ chạm đáy: mất một mạng.
- Hết mạng hoặc hạ hết số từ: ván kết thúc, hiện bảng kết quả và danh sách từ cần ôn.
- `Esc` hoặc nút **Tạm dừng** để dừng; chuyển sang tab khác cũng tự tạm dừng.

| Độ khó | Số từ | Mạng |
| --- | --- | --- |
| Dễ | 6 | 4 |
| Thường | 10 | 3 |
| Khó | 16 | 2 |

Không có đồng hồ đếm ngược: áp lực đến từ tốc độ rơi, tăng dần theo từng mốc.

## Nạp từ riêng

Ở sảnh, mục **Nạp từ** nhận mỗi dòng một từ, dạng `word = nghĩa` (`:` hoặc tab cũng được):

```
wallet = cái ví
check-in = nhận phòng
```

- Lưu trong `localStorage` (`grammax.customWords.v1`), tối đa 300 từ, không gửi đi đâu.
- Từ thuộc đúng mức đang chọn (A1–C1) và được dùng chung cho mọi ván, kể cả khi bật Ôn tập.
- Xoá được từng từ hoặc xoá cả mức. Dòng sai (thiếu nghĩa, có dấu cách, ký tự lạ) sẽ bị báo
  kèm số dòng chứ không bị bỏ qua im lặng.

## Ôn tập

Bật **Ôn tập** để thu hẹp bộ từ còn 12 từ hay sai nhất, thiếu thì bù bằng từ mới cùng mức.
Tiến độ lưu ở `localStorage`; nếu cấu hình Supabase thì chuyển sang tài khoản đám mây.

## Nội dung

74 từ đã soạn: A1 (26 từ: `daily-life`, `travel`), A2 (24 từ: `daily-activities`,
`describing-places`), B1 (24 từ: `work-study`, `opinions-abstract`). B2 và C1 chưa có nội dung;
sảnh ghi "chưa có" thay vì ẩn đi.

## Giao diện

[`DESIGN.md`](DESIGN.md) là hợp đồng thị giác: monochrome editorial, nền `#F8F8F8`, mực `#222222`,
một màu cam tín hiệu, Inter Tight, nhịp 8px, phân tầng bằng tông màu chứ không bằng bóng đổ.

Hợp đồng này được máy kiểm: `test/design-tokens.test.js` đối chiếu token trong DESIGN.md với
`src/app/styles.css` theo cả hai chiều, đồng thời chặn bóng đổ, màu lạ, màu xanh "đúng" ngoài
danh sách ôn tập và cam tín hiệu làm nền.

## Cấu trúc

```
src/
  app/        App, Arena (chạy một ván), Lobby, WordImport, styles.css
  core/       rng, scoring, selection, schema — thuần JS, không React
  content/    bộ từ theo mức + bộ nạp từ cục bộ
  games/      registry.js (sinh tự động) + typing-game/{manifest,logic,index}
  player/     localStorage / Supabase
test/         node --test, không cần framework
```

## Lệnh

| Lệnh | Việc |
| --- | --- |
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production vào `dist/` |
| `npm run preview` | Chạy thử bản build |
| `npm run lint` | ESLint |
| `npm test` | 116 test bằng Node test runner |
| `npm run registry` | Sinh lại danh sách game từ `manifest.json` |
| `npm run registry:check` | Báo lỗi nếu danh sách lệch với thư mục game |
| `npm run size` | Báo cáo kích thước bundle |

## Thêm game mới

Tạo `src/games/<id>/` gồm `manifest.json`, `logic.js` (thuần JS, export `createRound` và
`gradeRound`) và `index.jsx`, thêm vào `src/games/index.js`, rồi chạy `npm run registry`.

## Kiểm thử

`npm test` chạy 116 test: luật chơi, chấm điểm, chọn từ, xác thực nội dung, registry, hợp đồng
DESIGN.md, player store. Chưa có test trình duyệt — kiểm tra giao diện vẫn phải làm tay.

## Giới hạn hiện tại

- Đường Supabase mới viết, chưa đăng nhập/ghi thật vì chưa có project.
- Chưa deploy; Vercel chỉ tạo preview cho từng branch.
- Seed của ván không nằm trong URL, nên reload là chơi ván mới.
- Chỉ có một game: Typing Game.

## Tài liệu thêm

- Kế hoạch 180 ngày + workbook: [`docs/english-180-plan.md`](docs/english-180-plan.md)
  (`npm run roadmap` để sinh lại).

## Giấy phép

Chưa chỉ định.
