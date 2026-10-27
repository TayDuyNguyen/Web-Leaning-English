# Skills của dự án grammax

Danh sách skill đang dùng cho repo này, sau khi đã dọn các skill không liên quan.
Tổng: **14** — 1 skill của dự án, 13 skill global.

## Cách gọi

- **Tự động**: cứ mô tả việc cần làm, OpenCode tự chọn skill có `description` khớp.
  Ví dụ "làm animation cho từ vỡ ra" → `grammax-ui`.
- **Gọi đích danh**: gõ `@grammax-ui`, `@break-ui`… trong prompt.
- **Trong hội thoại**: yêu cầu trực tiếp "dùng skill review-animations rà giúp tôi".

Skill chỉ nạp phần hướng dẫn, không chạy code. File `SKILL.md` nằm trong
`~/.agents/skills/<id>/` (global) hoặc `.opencode/skills/<id>/` (dự án).

## 1. Skill của dự án

| Skill | Cách dùng | Tác dụng |
| --- | --- | --- |
| `grammax-ui` | `@grammax-ui`, hoặc tự động khi sửa component/CSS/motion | Biến `DESIGN.md` thành quy tắc thao tác: token nào được dùng, feedback bằng fill chứ không shake, motion bao nhiêu ms, checklist a11y, định dạng review Before/After. Đây là skill **mặc định** cho mọi việc giao diện trong repo |

## 2. Thiết kế & chuyển động (từ `emilkowalski/skills`)

| Skill | Cách dùng | Tác dụng |
| --- | --- | --- |
| `emil-design-eng` | `@emil-design-eng` khi cần "gu" thiết kế | Bộ nguyên tắc gốc: khi nào nên animate, easing/duration, chi tiết nhỏ làm UI "đắt". Là tài liệu nền, `grammax-ui` đã lọc lại theo DESIGN.md |
| `animate` | `@animate` + mô tả hiệu ứng | Dựng animation từ đầu và viết code: chọn property, curve, thời lượng, cách thoát |
| `review-animations` | `@review-animations` khi muốn soi motion | Chấm animation hiện có theo chuẩn cao, chỉ ra chỗ chưa đạt (hiện có `typing-fall`) |
| `improve-animations` | `@improve-animations` | Audit toàn bộ motion của app, xuất kế hoạch sửa theo thứ tự ưu tiên (không tự sửa) |
| `animation-performance` | `@animation-performance` khi animation giật | Tìm nguyên nhân drop frame, chọn property rẻ hơn, xử lý `will-change`, CSS vs WAAPI vs rAF |
| `break-ui` | `@break-ui` + tên màn hình | Test dữ liệu xấu: từ dài, nghĩa tiếng Việt dài, danh sách rỗng, số rất lớn — rồi báo cái gì vỡ và cách sửa |
| `mobile-native` | `@mobile-native` khi làm/soát mobile | Sửa các lỗi "web trên điện thoại": hover dính, input zoom, 100vh, safe area, tap chậm |

## 3. Kỹ thuật & quy trình

| Skill | Cách dùng | Tác dụng |
| --- | --- | --- |
| `frontend-a11y` | `@frontend-a11y` khi làm form/modal/keyboard | Semantic HTML, ARIA, `aria-live`, focus management, bẫy focus — áp cho `WordImport` và sân khấu game |
| `react-patterns` | `@react-patterns` khi viết/review component | Kỷ luật hooks, chọn nơi đặt state, Suspense/Error Boundary, tránh effect thừa |
| `requesting-code-review` | `@requesting-code-review` trước khi mở PR | Tự rà diff theo template review, phân loại Critical/Important/Minor trước khi nhờ người |
| `receiving-code-review` | `@receiving-code-review` khi nhận feedback | Quy tắc phản hồi review: xác minh trước khi sửa, phản biện có lý, không đồng ý cho có |
| `reverse-engineer-anything` | `@reverse-engineer-anything` khi phân tích `Repo/` | Dùng REA để mổ Parroto/bundle, đọc hành vi runtime, so sánh phiên bản |
| `find-skills` | `@find-skills` khi muốn thêm năng lực mới | Tìm và cài skill từ marketplace (`npx skills find/add`) |

## Đã gỡ (không có ích cho dự án)

| Skill | Lý do gỡ |
| --- | --- |
| `write-swift` | Dự án web, không có Swift |
| `animate-expo` | React Native/Expo, không dùng |
| `ask-sonner` | Không dùng thư viện toast Sonner (feedback là inline `aria-live`) |
| `apple-design` | Hướng Apple (spring, translucent) xung đột với hệ editorial phẳng |
| `pick-ui-library` | Dự án tối giản dependency, không cần gợi ý thư viện |
| `animation-vocabulary` | Chỉ là từ điển gọi tên hiệu ứng, không dùng để làm việc |
| `prototype` | Dựng nhiều biến thể UI — thiết kế đã chốt trong DESIGN.md |
| `find-animation-opportunities` | Đề xuất thêm motion, dễ trái quy tắc "một thứ ồn ào mỗi màn hình" |

Cài lại bất cứ skill nào ở trên:

```bash
npx skills add emilkowalski/skills@<tên-skill> -g -y
```

## Kiểm tra trạng thái

```bash
npx skills list -g        # skill global
npx skills remove <id> -g # gỡ
```

Skill của dự án nằm trong git (`.opencode/skills/grammax-ui/`). Skill global nằm ở
`~/.agents/skills/` và **không** đi theo repo — máy khác cần cài lại.
