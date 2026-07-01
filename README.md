# Portfolio Dự Án WordPress

Trang portfolio tĩnh (HTML/CSS/JS thuần, không cần build tool) tổng hợp các website WordPress đã thực hiện, chia theo nhóm ngành, có hỗ trợ giao diện sáng/tối và song ngữ Việt/Anh.

**Xem trực tiếp:** https://nguyentu268.github.io/projects/

## Tính năng

- **3 nhóm dự án** theo ngành: Web Review Sạch, Web Review Tài Chính, Web Review Casino (đang tạm ẩn), cộng thêm khối **Dự Án Chủ Lực** ghim 3 dự án quan trọng nhất lên đầu trang.
- **Accordion theo scroll**: cuộn tới nhóm nào, nhóm đó tự mở ra và các nhóm khác tự thu lại — đỡ phải cuộn nhiều. Có thể bấm trực tiếp vào tiêu đề hoặc nav-pill để nhảy nhanh.
- **Theme sáng/tối** (cam + trắng / cam + đen), lưu lựa chọn vào `localStorage`.
- **Song ngữ Việt/Anh**, đổi toàn bộ nội dung trang ngay lập tức, không load lại trang.
- Mỗi card hiển thị ảnh/logo dự án, tên, và mô tả ngắn khi hover; nền card (đen/trắng) được chọn tự động theo màu logo để logo luôn nổi rõ.
- Hiệu ứng tilt 3D + glow bám con trỏ khi hover, animation xuất hiện khi cuộn tới.

## Cấu trúc file

```
index.html      Khung trang, header, các điểm gắn (mount point) cho JS render
style.css       Toàn bộ giao diện: theme sáng/tối, accordion, card, animation
projects.js     Dữ liệu: danh sách dự án, tên nhóm, mô tả — sửa nội dung tại đây
script.js       Logic: render section/card, accordion, theme toggle, language toggle
images/         Ảnh/logo từng dự án, chia theo nhóm (fresh/finance/casino)
favicon.ico, images/favicon.svg, images/apple-touch-icon.png   Icon trang
```

## Thêm/sửa/xoá dự án

Mở [projects.js](projects.js):

- Mỗi nhóm dự án nằm trong `RAW_PROJECTS`, dạng `[Tên hiển thị, tên file ảnh, nền thẻ ("light"/"dark"), link website]`.
- `nền thẻ`: `"dark"` nếu logo màu trắng/sáng (cần nền đen để nổi lên), `"light"` nếu logo màu đen/tối (cần nền trắng).
- Muốn đưa dự án lên khối "Dự Án Chủ Lực": thêm entry vào `FEATURED_OVERRIDES` với tên khớp đúng tên hiển thị, kèm `featured: true`.
- Muốn tạm ẩn cả 1 nhóm (như Casino hiện tại): comment lại object tương ứng trong `SECTIONS_META`, `FOLDER_DEFAULTS`, và mảng trong `RAW_PROJECTS` — dữ liệu vẫn còn, chỉ cần bỏ comment để hiện lại.
- Mô tả (`description`) và tên nhóm (`title`/`subtitle`) có thể để string thường (chỉ tiếng Việt) hoặc `{ vi: "...", en: "..." }` nếu muốn dịch riêng cho tiếng Anh.

## Chạy thử ở máy local

Đây là site tĩnh, chỉ cần một server tĩnh bất kỳ, ví dụ:

```
npx serve .
```

rồi mở địa chỉ được in ra (không mở trực tiếp file `index.html` bằng `file://` vì `fetch`/module script có thể bị chặn bởi CORS ở một số trình duyệt).

## Deploy

Site được host bằng **GitHub Pages**, build từ nhánh `main`, thư mục gốc. Mỗi lần `git push` lên `main`, GitHub tự build lại (mất khoảng 30-60 giây).
